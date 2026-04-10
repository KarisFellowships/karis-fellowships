/**
 * Seed nhg_schedule from the KF Date Projection Excel file (rows 63–75).
 * Run with: node scripts/seed-nhg-schedule.mjs
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

// NHG weekly study rows (Excel rows 63–71, 0-indexed in data array)
const NHG_WEEKLY_ROWS = [
  { excelRow: 63, weekNumber: 0, label: "Intro Meeting" },
  { excelRow: 64, weekNumber: 1, label: "Intro & Chapt 1" },
  { excelRow: 65, weekNumber: 2, label: "Chap 2 & 3" },
  { excelRow: 66, weekNumber: 3, label: "Chap 4" },
  { excelRow: 67, weekNumber: 4, label: "Chap 5" },
  { excelRow: 68, weekNumber: 5, label: "Chap 6" },
  { excelRow: 69, weekNumber: 6, label: "Chap 7 & 8" },
  { excelRow: 70, weekNumber: 7, label: "Chap 9 & 10" },
  { excelRow: 71, weekNumber: 8, label: "Chap 11" },
];

async function seed() {
  const excelPath = join(__dirname, "..", "content", "KF Date Projection.xlsx");
  const wb = XLSX.readFile(excelPath);
  const ws = wb.Sheets[wb.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

  const headerRow = data[3];
  const yearColumns = [];
  for (let col = 2; col < headerRow.length; col++) {
    const year = headerRow[col];
    if (typeof year === "number" && year >= 2021 && year <= 2150) {
      yearColumns.push({ col, year });
    }
  }

  console.log(`Found ${yearColumns.length} year columns`);

  const rows = [];

  for (const { excelRow, weekNumber, label } of NHG_WEEKLY_ROWS) {
    const dataRow = data[excelRow];
    if (!dataRow) continue;

    for (const { col, year } of yearColumns) {
      const serial = dataRow[col];
      if (!serial || typeof serial !== "number" || serial < 1000) continue;

      const startDate = toDateString(excelSerialToDate(serial));
      const endDate = addDays(startDate, 6);

      rows.push({
        week_number: weekNumber,
        label,
        year,
        start_date: startDate,
        end_date: endDate,
      });
    }
  }

  console.log(`Seeding ${rows.length} rows into nhg_schedule...`);

  const batchSize = 500;
  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize);
    const { error } = await supabase.from("nhg_schedule").insert(batch);
    if (error) {
      console.error(`Error at batch ${i}:`, error.message);
      process.exit(1);
    }
    process.stdout.write(`\rInserted ${Math.min(i + batchSize, rows.length)} / ${rows.length}`);
  }

  const today = new Date().toISOString().split("T")[0];
  const { data: thisWeek } = await supabase
    .from("nhg_schedule")
    .select("week_number, label, start_date, end_date")
    .lte("start_date", today)
    .gte("end_date", today)
    .single();

  const { data: nextStudy } = await supabase
    .from("nhg_schedule")
    .select("week_number, label, start_date, end_date")
    .gt("start_date", today)
    .order("start_date", { ascending: true })
    .limit(1)
    .single();

  console.log(`\n\nSanity check — today (${today}):`);
  console.log("This week:", thisWeek || "No active NHG week");
  console.log("Next upcoming:", nextStudy);
  console.log("Done!");
}

seed().catch(console.error);
