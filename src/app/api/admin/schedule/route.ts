import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { createServerClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";

export const runtime = "nodejs";

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

function excelSerialToDate(serial: number): Date {
  return new Date(Math.round((serial - 25569) * 86400 * 1000));
}
function toDateString(date: Date): string {
  return date.toISOString().split("T")[0];
}
function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr + "T12:00:00Z");
  d.setUTCDate(d.getUTCDate() + days);
  return toDateString(d);
}

export async function GET() {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const client = createAdminClient();
  const { count } = await client
    .from("kf_schedule")
    .select("*", { count: "exact", head: true });
  const { data: minRow } = await client
    .from("kf_schedule")
    .select("year")
    .order("year", { ascending: true })
    .limit(1)
    .single();
  const { data: maxRow } = await client
    .from("kf_schedule")
    .select("year")
    .order("year", { ascending: false })
    .limit(1)
    .single();
  return NextResponse.json({
    totalRows: count ?? 0,
    minYear: minRow?.year ?? null,
    maxYear: maxRow?.year ?? null,
  });
}

export async function POST(request: Request) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  let rows: { lesson_number: number; year: number; start_date: string; end_date: string }[];
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const wb = XLSX.read(buffer, { type: "buffer" });
    const ws = wb.Sheets[wb.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json<unknown[]>(ws, { header: 1 });

    // Row index 3 is the header: "Event", "Weekday", 2021, 2022, ...
    const headerRow = (data[3] ?? []) as unknown[];
    const yearColumns: { col: number; year: number }[] = [];
    for (let col = 2; col < headerRow.length; col++) {
      const year = headerRow[col];
      if (typeof year === "number" && year >= 2021 && year <= 2150) {
        yearColumns.push({ col, year });
      }
    }
    if (yearColumns.length === 0) {
      return NextResponse.json(
        { error: "Could not find year columns — is this the KF Date Projection.xlsx?" },
        { status: 400 }
      );
    }

    const parsed: typeof rows = [];
    for (const dataRow of data as unknown[][]) {
      const label = String(dataRow?.[0] ?? "");
      const match = label.match(/^KF(\d+)$/);
      if (!match) continue;
      const lessonNumber = parseInt(match[1], 10);
      if (lessonNumber < 0 || lessonNumber > 52) continue;

      for (const { col, year } of yearColumns) {
        const serial = dataRow[col];
        if (!serial || typeof serial !== "number") continue;
        const startDate = toDateString(excelSerialToDate(serial));
        parsed.push({
          lesson_number: lessonNumber,
          year,
          start_date: startDate,
          end_date: addDays(startDate, 6),
        });
      }
    }

    // Deduplicate by (lesson_number, year) — last one wins, matching the seed script.
    const seen = new Map<string, (typeof parsed)[number]>();
    for (const row of parsed) seen.set(`${row.lesson_number}-${row.year}`, row);
    rows = Array.from(seen.values());
  } catch (e) {
    return NextResponse.json(
      { error: `Could not read the spreadsheet: ${(e as Error).message}` },
      { status: 400 }
    );
  }

  if (rows.length === 0) {
    return NextResponse.json(
      { error: "No KF lesson rows (KF0–KF52) found in the spreadsheet." },
      { status: 400 }
    );
  }

  const client = createAdminClient();
  const batchSize = 500;
  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize);
    const { error } = await client
      .from("kf_schedule")
      .upsert(batch, { onConflict: "lesson_number,year" });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  const years = Array.from(new Set(rows.map((r) => r.year))).sort((a, b) => a - b);
  return NextResponse.json({
    success: true,
    rowsUpserted: rows.length,
    minYear: years[0],
    maxYear: years[years.length - 1],
  });
}
