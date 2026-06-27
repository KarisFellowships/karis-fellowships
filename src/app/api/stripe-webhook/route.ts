import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase-admin";
import type Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const type = session.metadata?.type;
    const amount = session.amount_total ?? 0;

    if (!type) {
      console.error("Missing type metadata on session:", session.id);
      return NextResponse.json({ received: true });
    }

    const supabase = createAdminClient();

    try {
      let userId = session.metadata?.userId;

      if (type === "nhg_registration" && session.metadata?.registration_data) {
        const regData = JSON.parse(session.metadata.registration_data);

        const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
          email: regData.email,
          password: regData.password,
          email_confirm: true,
          user_metadata: {
            name: regData.name,
            country: regData.country,
            state: regData.state,
            city: regData.city,
            phone: regData.phone,
            meeting_choice: regData.meeting_choice,
            karis_link: regData.karis_link,
            hope_to_gain: regData.hope_to_gain,
            registered_before: regData.registered_before,
            questions_comments: regData.questions_comments,
          },
        });

        if (createError) {
          console.error("Failed to create user account:", createError);
          return NextResponse.json({ received: true });
        }

        userId = newUser.user.id;

        const { error: profileError } = await supabase.from("users").upsert({
          id: userId,
          email: regData.email,
          name: regData.name,
          tier: "nhg",
          active: true,
          nhg_paid: true,
        }, { onConflict: "id" });
        if (profileError) console.error("Failed to create user profile:", profileError);
      }

      if (!userId) {
        console.error("Missing userId on session:", session.id);
        return NextResponse.json({ received: true });
      }

      const { error: insertError } = await supabase.from("donations").insert({
        user_id: userId,
        amount,
        type,
        stripe_session_id: session.id,
      });
      if (insertError) console.error("Failed to insert donation:", insertError);

      const flagUpdates: Record<string, boolean> = {};
      if (type === "nhg_registration") flagUpdates.nhg_paid = true;
      if (type === "hpkp") flagUpdates.hpkp_donated = true;
      if (type === "romans") flagUpdates.romans_donated = true;

      if (Object.keys(flagUpdates).length > 0) {
        const { error: updateError } = await supabase
          .from("users")
          .update(flagUpdates)
          .eq("id", userId);
        if (updateError) console.error("Failed to update user flags:", updateError);
      }
    } catch (dbError) {
      console.error("Database error in webhook:", dbError);
    }
  }

  return NextResponse.json({ received: true });
}
