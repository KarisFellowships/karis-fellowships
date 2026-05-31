import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createServerClient } from "@/lib/supabase-server";
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, amount, userId, userEmail } = body as {
      type: string;
      amount: number;
      userId: string;
      userEmail?: string;
    };

    const supabase = await createServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || user.id !== userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    if (!DONATION_TYPES.includes(type as DonationType)) {
      return NextResponse.json({ error: "Invalid payment type" }, { status: 400 });
    }
    if (!amount || amount < 100) {
      return NextResponse.json({ error: "Minimum amount is $1" }, { status: 400 });
    }
    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

    const donationType = type as DonationType;
    const origin = request.nextUrl.origin;

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ["card"],
      metadata: { userId, type: donationType },
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

    if (userEmail) {
      sessionParams.customer_email = userEmail;
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
