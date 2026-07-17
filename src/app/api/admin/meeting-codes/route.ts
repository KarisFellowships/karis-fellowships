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
    .from("meeting_codes")
    .select("id, section, label, time_label, code, sort")
    .order("section", { ascending: true })
    .order("sort", { ascending: true });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ rows: data ?? [] });
}

export async function PUT(request: Request) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let body: { rows?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const rows = body.rows;
  if (!Array.isArray(rows)) {
    return NextResponse.json({ error: "Missing rows array" }, { status: 400 });
  }

  const client = createAdminClient();

  // Fetch each row's section so access codes can be validated strictly while the
  // general phone-number row keeps its own format. A malformed code (e.g. a
  // dropped trailing #) would otherwise be served to members as a dead dial-in.
  const ids = rows
    .map((r) => (r && typeof (r as { id?: unknown }).id === "string" ? (r as { id: string }).id : null))
    .filter((v): v is string => v !== null);
  const { data: existingRows } = await client.from("meeting_codes").select("id, section").in("id", ids);
  const sectionById = new Map<string, string>((existingRows ?? []).map((r) => [r.id as string, r.section as string]));
  const isValidCode = (code: string, section: string | undefined): boolean => {
    if (section === "general") return /^[\d\s()+.\-]{7,}$/.test(code); // phone-number row
    return /^\d{3}-\d{3}-\d{3}#$/.test(code); // dial-in access code, e.g. 548-008-425#
  };

  for (const raw of rows) {
    const r = raw as { id?: unknown; label?: unknown; time_label?: unknown; code?: unknown };
    if (typeof r.id !== "string") continue;

    const update: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (typeof r.code === "string") {
      const code = r.code.trim();
      if (!isValidCode(code, sectionById.get(r.id))) {
        return NextResponse.json(
          { error: `Invalid code "${code}". Access codes must look like 548-008-425# (three digit groups + a trailing #).` },
          { status: 400 }
        );
      }
      update.code = code;
    }
    if (typeof r.label === "string") update.label = r.label.trim();
    if (r.time_label === null) update.time_label = null;
    else if (typeof r.time_label === "string") {
      const t = r.time_label.trim();
      update.time_label = t === "" ? null : t;
    }

    const { error } = await client.from("meeting_codes").update(update).eq("id", r.id);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ success: true });
}
