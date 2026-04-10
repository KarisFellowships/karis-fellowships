/**
 * Seed kf_schedule from the KF Date Projection Excel file.
 * Run with: node scripts/seed-schedule.mjs
 */

import { createClient } from "@supabase/supabase-js";
import XLSX from "xlsx";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SUPABASE_URL = "https://afeaatpzvpdlttqyspdd.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmZWFhdHB6dnBkbHR0cXlzcGRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1NjEyNjQsImV4cCI6MjA4ODEzNzI2NH0.QZCP3BwRbk5iDCGKBlY_0ewNLH0mMBnA4VLjlfyvOT0";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function excelSerialToDate(serial) {
  return new Date(Math.round((serial - 25569) * 86400 * 1000));
}

function toDateString(date) {
  return date.toISOString().split("T")[0];
}

function addDays(dateStr, days) {
  const d = new Date(dateStr + "T12:00:00Z");
  d.setUTCDate(d.getUTCDate() + days);
  return toDateString(d);
}

async function seed() {
  const excelPath = join(__dirname, "..", "content", "KF Date Projection.xlsx");
  const wb = XLSX.readFile(excelPath);
  const ws = wb.Sheets[wb.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

  // Row 3 (0-indexed) is the header with "Event", "Weekday", 2021, 2022, ...
  const headerRow = data[3];
  const yearColumns = [];
  for (let col = 2; col < headerRow.length; col++) {
    const year = headerRow[col];
    if (typeof year === "number" && year >= 2021 && year <= 2150) {
      yearColumns.push({ col, year });
    }
  }

  console.log(`Found ${yearColumns.length} year columns (${yearColumns[0].year}–${yearColumns[yearColumns.length - 1].year})`);

  const rows = [];

  for (const dataRow of data) {
    const label = String(dataRow[0] || "");
    // Match KF1 through KF52 (and KF0) — skip non-lesson rows
    const match = label.match(/^KF(\d+)$/);
    if (!match) continue;

    const lessonNumber = parseInt(match[1], 10);
    if (lessonNumber < 0 || lessonNumber > 52) continue;

    for (const { col, year } of yearColumns) {
      const serial = dataRow[col];
      if (!serial || typeof serial !== "number") continue;

      const startDate = toDateString(excelSerialToDate(serial));
      const endDate = addDays(startDate, 6);

      rows.push({
        lesson_number: lessonNumber,
        year,
        start_date: startDate,
        end_date: endDate,
      });
    }
  }

  // Deduplicate: keep only one row per (lesson_number, year) — the last one wins
  const seen = new Map();
  for (const row of rows) {
    const key = `${row.lesson_number}-${row.year}`;
    seen.set(key, row);
  }
  const dedupedRows = Array.from(seen.values());

  console.log(`Seeding ${dedupedRows.length} rows into kf_schedule...`);

  const batchSize = 500;
  for (let i = 0; i < dedupedRows.length; i += batchSize) {
    const batch = dedupedRows.slice(i, i + batchSize);
    const { error } = await supabase.from("kf_schedule").insert(batch);
    if (error) {
      console.error(`Error at batch ${i}:`, error.message);
      process.exit(1);
    }
    process.stdout.write(
      `\rInserted ${Math.min(i + batchSize, dedupedRows.length)} / ${dedupedRows.length}`
    );
  }

  // Quick sanity check: what does this week show?
  const today = new Date().toISOString().split("T")[0];
  const { data: thisWeek } = await supabase
    .from("kf_schedule")
    .select("lesson_number, start_date, end_date")
    .lte("start_date", today)
    .gte("end_date", today)
    .single();

  console.log(`\n\nSanity check — today (${today}):`, thisWeek);
  console.log("Done!");
}

seed().catch(console.error);
