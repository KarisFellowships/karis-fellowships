import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";

async function verifyAdmin() {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: profile } = await supabase
    .from("users")
    .select("tier")
    .eq("id", user.id)
    .single();
  return profile?.tier === "admin" ? user : null;
}

export async function GET() {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const client = createAdminClient();
  const { data, error } = await client
    .from("registrations")
    .select(
      "id, email, name, country, state, city, phone, meeting_choice, karis_link, hope_to_gain, registered_before, questions_comments, created_at"
    )
    .order("created_at", { ascending: false });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ rows: data ?? [] });
}
