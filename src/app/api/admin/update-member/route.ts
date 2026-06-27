import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";

export async function POST(request: Request) {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { data: caller } = await supabase
    .from("users")
    .select("tier")
    .eq("id", user.id)
    .single();

  if (caller?.tier !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { userId, updates } = body as {
    userId: string;
    updates: {
      tier?: string;
      active?: boolean;
      kf_invited?: boolean;
      nhg_completed_date?: string;
      kf_registered_year?: number;
      kf_first_year?: number;
      volunteer_interest?: string;
    };
  };

  if (!userId || !updates) {
    return NextResponse.json({ error: "Missing userId or updates" }, { status: 400 });
  }

  const allowed: Record<string, unknown> = {};
  if (updates.tier && ["nhg", "kf", "admin"].includes(updates.tier)) {
    allowed.tier = updates.tier;
  }
  if (typeof updates.active === "boolean") {
    allowed.active = updates.active;
  }
  if (typeof updates.kf_invited === "boolean") {
    allowed.kf_invited = updates.kf_invited;
  }
  if (updates.nhg_completed_date) {
    allowed.nhg_completed_date = updates.nhg_completed_date;
  }
  if (updates.kf_registered_year) {
    allowed.kf_registered_year = updates.kf_registered_year;
  }
  if (updates.kf_first_year) {
    allowed.kf_first_year = updates.kf_first_year;
  }
  if (updates.volunteer_interest !== undefined) {
    allowed.volunteer_interest = updates.volunteer_interest;
  }

  if (Object.keys(allowed).length === 0) {
    return NextResponse.json({ error: "No valid updates" }, { status: 400 });
  }

  const admin = createAdminClient();
  const { error } = await admin
    .from("users")
    .update(allowed)
    .eq("id", userId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
