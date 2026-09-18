import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { checkRateLimit } from "@/lib/rate-limit";
import { getKFActor } from "@/lib/facilitator";

export async function POST(request: Request) {
  const actor = await getKFActor();
  if (!actor) return NextResponse.json({ error: "Not authorized" }, { status: 403 });

  if (!(await checkRateLimit(`fac-release:${actor.userId}`, 20, 600))) {
    return NextResponse.json({ error: "Too many requests. Please slow down and try again shortly." }, { status: 429 });
  }

  let body: { slotId?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const slotId = typeof body.slotId === "string" ? body.slotId : "";
  if (!slotId) return NextResponse.json({ error: "Missing slot" }, { status: 400 });

  const admin = createAdminClient();
  // Release only if it is the caller's own slot. Clearing the reminder flags
  // re-arms reminders if the slot is later re-claimed.
  const now = new Date().toISOString();
  const { data: released, error } = await admin
    .from("nhg_facilitator_slots")
    .update({
      user_id: null,
      display_name: null,
      signed_up_at: null,
      reminder_week_sent_at: null,
      reminder_day_sent_at: null,
      updated_at: now,
    })
    .eq("id", slotId)
    .eq("user_id", actor.userId)
    .select("id")
    .maybeSingle();

  if (error) {
    console.error("[facilitator release] update failed:", error.message);
    return NextResponse.json({ error: "Could not update your slot. Please try again." }, { status: 500 });
  }
  if (!released) {
    return NextResponse.json({ error: "That slot isn't yours to release." }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
