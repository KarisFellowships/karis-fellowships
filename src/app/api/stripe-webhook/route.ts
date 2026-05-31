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
    const userId = session.metadata?.userId;
    const type = session.metadata?.type;
    const amount = session.amount_total ?? 0;

    if (!userId || !type) {
      console.error("Missing metadata on session:", session.id);
      return NextResponse.json({ received: true });
    }

    const supabase = createAdminClient();

    try {
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
