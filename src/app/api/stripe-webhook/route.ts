import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase-admin";
import { sendAdminAlert } from "@/lib/alerts";
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

  const supabase = createAdminClient();

  // Idempotency: Stripe delivers events at least once. Skip any event we have
  // already fully processed. We record the event id ONLY after success (below),
  // so an event that fails mid-processing is left unrecorded and Stripe retries.
  const { data: alreadyProcessed, error: lookupError } = await supabase
    .from("stripe_events")
    .select("id")
    .eq("id", event.id)
    .maybeSingle();

  if (lookupError) {
    console.error("stripe_events lookup failed:", lookupError);
    // Transient: let Stripe retry rather than silently dropping the event.
    return NextResponse.json({ error: "Temporary error" }, { status: 500 });
  }
  if (alreadyProcessed) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const type = session.metadata?.type;
      const userId = session.metadata?.userId;
      const amount = session.amount_total ?? 0;

      // Missing metadata is a permanent (non-retryable) condition: log and let the
      // event be marked processed below so Stripe stops retrying it.
      if (!type) {
        console.error("Missing type metadata on session:", session.id);
        await sendAdminAlert("Payment received but could not be provisioned (missing type)", [
          `Stripe session: ${session.id}`,
          `Amount: ${amount}`,
          "Stripe will NOT retry this — investigate and provision manually.",
        ]);
      } else if (!userId) {
        console.error("Missing userId metadata on session:", session.id);
        await sendAdminAlert("Payment received but could not be provisioned (missing userId)", [
          `Stripe session: ${session.id}`,
          `Type: ${type}`,
          `Amount: ${amount}`,
          "Stripe will NOT retry this — investigate and provision manually.",
        ]);
      } else {
        // Idempotent: the partial unique index on stripe_session_id means a replayed
        // session cannot create a second donation row.
        const { error: insertError } = await supabase
          .from("donations")
          .upsert(
            { user_id: userId, amount, type, stripe_session_id: session.id },
            { onConflict: "stripe_session_id", ignoreDuplicates: true }
          );
        if (insertError) {
          throw new Error(`donation upsert failed: ${insertError.message}`);
        }

        // Idempotent flag flips (setting true again is a no-op).
        const flagUpdates: Record<string, boolean> = {};
        if (type === "nhg_registration") flagUpdates.nhg_paid = true;
        if (type === "hpkp") flagUpdates.hpkp_donated = true;
        if (type === "romans") flagUpdates.romans_donated = true;

        if (Object.keys(flagUpdates).length > 0) {
          const { error: updateError } = await supabase
            .from("users")
            .update(flagUpdates)
            .eq("id", userId);
          if (updateError) {
            throw new Error(`user flag update failed: ${updateError.message}`);
          }
        }
      }
    }

    // Mark processed ONLY after successful handling. Ignore a unique-violation
    // (23505) from a concurrent duplicate delivery — that just means another
    // invocation already recorded it.
    const { error: markError } = await supabase
      .from("stripe_events")
      .insert({ id: event.id, type: event.type });
    if (markError && (markError as { code?: string }).code !== "23505") {
      console.error("Failed to record processed stripe_event:", markError);
      // The payment was already recorded (and duplicate protection is also enforced
      // by the donations unique index), so this is a visibility gap, not a lost
      // payment — but alert so a silent recurrence gets noticed.
      await sendAdminAlert("Payment processed, but the event-log write failed", [
        `Event: ${event.id} (${event.type})`,
        `Error: ${markError.message}`,
        "Payment WAS recorded; duplicate protection still holds via the donations unique index.",
      ]);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    // Transient/server error: do NOT record the event. Returning 5xx tells Stripe
    // to retry; the side effects above are idempotent, so a retry is safe and the
    // customer's payment will not be silently lost (orphaned-payment fix).
    console.error("Webhook processing error (Stripe will retry):", err);
    await sendAdminAlert("Webhook processing failed (Stripe will retry)", [
      `Event: ${event.id} (${event.type})`,
      `Error: ${err instanceof Error ? err.message : String(err)}`,
      "Stripe retries with backoff; if this repeats, a payment may be stuck unprovisioned.",
    ]);
    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }
}
