import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // One-time-ish action (KF tier promotion); bound it per user.
  if (!(await checkRateLimit(`kf-register:${user.id}`, 5, 600))) {
    return NextResponse.json(
      { error: "Too many attempts. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  const { data: profile } = await supabase
    .from("users")
    .select("kf_invited, kf_first_year")
    .eq("id", user.id)
    .single();

  if (!profile?.kf_invited) {
    return NextResponse.json({ error: "Not invited to KF" }, { status: 403 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { nhg_completed_date, volunteer_interest, volunteer_note } = body as {
    nhg_completed_date?: string;
    volunteer_interest?: string;
    volunteer_note?: string;
  };

  const currentYear = new Date().getFullYear();
  const updates: Record<string, unknown> = {
    tier: "kf",
    kf_registered_year: currentYear,
  };

  if (!profile.kf_first_year) {
    updates.kf_first_year = currentYear;
  }

  if (nhg_completed_date) {
    updates.nhg_completed_date = nhg_completed_date;
  }

  if (volunteer_interest) {
    updates.volunteer_interest = volunteer_interest;
  }

  if (typeof volunteer_note === "string" && volunteer_note.trim()) {
    updates.volunteer_note = volunteer_note.trim();
  }

  const admin = createAdminClient();
  const { error } = await admin
    .from("users")
    .update(updates)
    .eq("id", user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
