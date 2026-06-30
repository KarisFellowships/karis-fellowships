import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createServerClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import type Stripe from "stripe";

const DONATION_TYPES = [
  "nhg_registration",
  "gift_onetime",
  "gift_recurring",
  "hpkp",
  "romans",
] as const;

type DonationType = (typeof DONATION_TYPES)[number];

const SUCCESS_URLS: Record<DonationType, string> = {
  nhg_registration: "/register/success",
  gift_onetime: "/give-a-gift?status=success",
  gift_recurring: "/give-a-gift?status=success",
  hpkp: "/other-studies/hpkp?donated=true",
  romans: "/other-studies/romans?donated=true",
};

const CANCEL_URLS: Record<DonationType, string> = {
  nhg_registration: "/register?payment=cancelled",
  gift_onetime: "/give-a-gift",
  gift_recurring: "/give-a-gift",
  hpkp: "/other-studies/hpkp",
  romans: "/other-studies/romans",
};

interface RegistrationData {
  email: string;
  password: string;
  name: string;
  country: string;
  state: string;
  city: string;
  phone: string;
  meeting_choice: string;
  karis_link: string;
  hope_to_gain: string;
  registered_before: string;
  questions_comments: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FIELD = 2000;

function validateRegistration(r: RegistrationData): string | null {
  if (!r || typeof r !== "object") return "Registration data is required.";
  if (!r.email || !EMAIL_RE.test(r.email.trim())) return "A valid email address is required.";
  if (!r.password || r.password.length < 8) return "Password must be at least 8 characters.";
  const required: [keyof RegistrationData, string][] = [
    ["name", "First name"],
    ["country", "Country"],
    ["phone", "Phone number"],
    ["meeting_choice", "Meeting choice"],
    ["karis_link", "Karis link"],
    ["hope_to_gain", "What you hope to gain"],
  ];
  for (const [key, label] of required) {
    const v = r[key];
    if (typeof v !== "string" || !v.trim()) return `${label} is required.`;
  }
  // Guard against absurdly large payloads.
  for (const v of Object.values(r)) {
    if (typeof v === "string" && v.length > MAX_FIELD) return "One of your answers is too long.";
  }
  return null;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, amount, userId, userEmail, registrationData } = body as {
      type: string;
      amount: number;
      userId?: string;
      userEmail?: string;
      registrationData?: RegistrationData;
    };

    if (!DONATION_TYPES.includes(type as DonationType)) {
      return NextResponse.json({ error: "Invalid payment type" }, { status: 400 });
    }
    if (!amount || typeof amount !== "number" || amount < 100) {
      return NextResponse.json({ error: "Minimum amount is $1" }, { status: 400 });
    }

    const donationType = type as DonationType;
    const isNewRegistration = donationType === "nhg_registration" && !!registrationData;

    // The userId/email used to build the checkout session and webhook metadata.
    let checkoutUserId = userId;
    let checkoutEmail = userEmail;

    if (isNewRegistration) {
      // New NHG registration: create the Supabase auth user server-side NOW.
      // The password travels browser -> our server (HTTPS) -> Supabase auth (hashed)
      // and is NEVER placed in Stripe metadata. Only the resulting userId goes to Stripe.
      const reg = registrationData as RegistrationData;
      const validationError = validateRegistration(reg);
      if (validationError) {
        return NextResponse.json({ error: validationError }, { status: 400 });
      }

      const admin = createAdminClient();
      const { data: created, error: createError } = await admin.auth.admin.createUser({
        email: reg.email.trim(),
        password: reg.password,
        email_confirm: true,
        user_metadata: {
          name: reg.name,
          country: reg.country,
          state: reg.state,
          city: reg.city,
          phone: reg.phone,
          meeting_choice: reg.meeting_choice,
          karis_link: reg.karis_link,
          hope_to_gain: reg.hope_to_gain,
          registered_before: reg.registered_before,
          questions_comments: reg.questions_comments,
        },
      });

      if (createError || !created?.user) {
        const msg = (createError?.message || "").toLowerCase();
        const status = (createError as { status?: number } | null)?.status;
        if (status === 422 || msg.includes("already") || msg.includes("registered") || msg.includes("exists")) {
          return NextResponse.json(
            { error: "An account with this email already exists. Please log in instead." },
            { status: 409 }
          );
        }
        console.error("Registration createUser failed:", createError);
        return NextResponse.json(
          { error: "Could not create your account. Please try again." },
          { status: 500 }
        );
      }

      // The handle_new_user trigger has already created the public.users profile row
      // (tier=nhg, active=true, nhg_paid=false). The webhook flips nhg_paid on payment.
      checkoutUserId = created.user.id;
      checkoutEmail = reg.email.trim();
    } else {
      // Existing-user flows (payment-required, gifts, study donations): require auth.
      if (!checkoutUserId) {
        return NextResponse.json({ error: "User ID required" }, { status: 400 });
      }
      const supabase = await createServerClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || user.id !== checkoutUserId) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
      }
    }

    const origin = request.nextUrl.origin;

    // Only non-sensitive identifiers go to Stripe.
    const metadata: Record<string, string> = { type: donationType };
    if (checkoutUserId) metadata.userId = checkoutUserId;

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ["card"],
      metadata,
      success_url: `${origin}${SUCCESS_URLS[donationType]}`,
      cancel_url: `${origin}${CANCEL_URLS[donationType]}`,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: getProductName(donationType),
            },
            unit_amount: amount,
            ...(donationType === "gift_recurring" ? { recurring: { interval: "month" } } : {}),
          },
          quantity: 1,
        },
      ],
      mode: donationType === "gift_recurring" ? "subscription" : "payment",
    };

    if (checkoutEmail) {
      sessionParams.customer_email = checkoutEmail;
    }

    if (sessionParams.mode === "payment" && checkoutEmail) {
      sessionParams.payment_intent_data = { receipt_email: checkoutEmail };
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}

function getProductName(type: DonationType): string {
  switch (type) {
    case "nhg_registration":
      return "NHG Book Study Registration";
    case "gift_onetime":
      return "Karis Fellowships — One-Time Gift";
    case "gift_recurring":
      return "Karis Fellowships — Monthly Gift";
    case "hpkp":
      return "HPKP Study Donation";
    case "romans":
      return "Romans Study Donation";
  }
}
