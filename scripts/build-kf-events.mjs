/**
 * Build src/data/kf-events.json from the KF Date Projection Excel file.
 *
 * This captures the fixed studies/events (not the weekly KF lesson schedule) for
 * every projected year, so the Calendar page can always show the NEXT upcoming
 * occurrence of each and roll forward on its own as dates pass. Dates trace to
 * content/KF Date Projection.xlsx (the source of truth per project rule 2).
 *
 * Re-run whenever the Excel changes:  node scripts/build-kf-events.mjs
 */
import XLSX from "xlsx";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { writeFileSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function serialToISO(serial) {
  if (typeof serial !== "number") return null;
  const d = new Date(Math.round((serial - 25569) * 86400 * 1000));
  const iso = d.toISOString().split("T")[0];
  const year = Number(iso.slice(0, 4));
  return year >= 2021 ? iso : null; // filter helper/garbage rows (1899/1900/1905…)
}

function addDaysISO(iso, days) {
  const d = new Date(iso + "T12:00:00Z");
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().split("T")[0];
}

const wb = XLSX.readFile(join(__dirname, "..", "content", "KF Date Projection.xlsx"));
const ws = wb.Sheets[wb.SheetNames[0]];
const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

// Header row with the year columns.
const headerRow = data.find((r) => Array.isArray(r) && r.some((c) => typeof c === "number" && c >= 2021 && c <= 2150));
const yearCols = [];
for (let col = 2; col < headerRow.length; col++) {
  const y = headerRow[col];
  if (typeof y === "number" && y >= 2025 && y <= 2150) yearCols.push({ col, year: y });
}

// Section headers that group the study rows below them.
const SECTIONS = { "NHG Study": "nhgStudy", "Weekend Intensive": "weekendIntensive", "HPKP Study": "hpkp", Romans: "romans" };
// Rows to ignore inside sections (helper/calc/notes, not sessions).
const IGNORE = new Set(["Thanksgiving", "29 or 30 weeks", "Back 1 day to be Saturday"]);

// Per-year collectors.
const byYear = {}; // year -> { nhgStudy:[iso...], weekendIntensive:[...], hpkp:[...], romans:[...], kf0, kf40, kf41 }
for (const { year } of yearCols) byYear[year] = { nhgStudy: [], weekendIntensive: [], hpkp: [], romans: [] };

let section = null;
for (const row of data) {
  if (!Array.isArray(row)) continue;
  const label = String(row[0] ?? "").trim();
  if (!label) continue;

  if (SECTIONS[label]) { section = SECTIONS[label]; continue; }

  const kfMatch = label.match(/^KF(\d+)$/);
  if (kfMatch) {
    // KF lesson rows also act as section boundaries (KF0 sits between the
    // Weekend Intensive rows and HPKP). Capture the ones we need, end the section.
    const n = Number(kfMatch[1]);
    section = null;
    if (n === 0 || n === 40 || n === 41) {
      for (const { col, year } of yearCols) {
        const iso = serialToISO(row[col]);
        if (iso) byYear[year][`kf${n}`] = iso;
      }
    }
    continue;
  }

  if (!section || IGNORE.has(label)) continue;

  for (const { col, year } of yearCols) {
    const iso = serialToISO(row[col]);
    if (iso) byYear[year][section].push(iso);
  }
}

// Assemble the event occurrences.
const events = [];
for (const { year } of yearCols) {
  const y = byYear[year];
  const range = (arr) => (arr.length ? { startDate: arr[0], endDate: arr[arr.length - 1] } : null);

  // NHG Registration opens Oct 1 each year (a fixed policy date, not in the sheet).
  events.push({ type: "nhgRegistration", title: "NHG Registration Opens", date: `${year}-10-01`, sortDate: `${year}-10-01` });

  const romans = range(y.romans);
  if (romans) events.push({ type: "romans", title: "Romans Study", note: "Saturdays, 9 am CST", ...romans, sortDate: romans.startDate });

  // NHG Huddle Meeting — not in the sheet; derived as the Thursday (−3 days)
  // before the first December KF Mega Meeting (KF40, a Sunday). Confirm each year.
  if (y.kf40) {
    const huddle = addDaysISO(y.kf40, -3);
    events.push({ type: "nhgHuddle", title: "NHG Huddle Meeting", note: "7:30 – 9:00 pm CST", date: huddle, sortDate: huddle, derived: true });
  }
  if (y.kf40) events.push({ type: "kfMega", title: "KF Mega Meeting", note: "8:00 am CST · No other meetings this week", date: y.kf40, sortDate: y.kf40 });
  if (y.kf41) events.push({ type: "kfMega", title: "KF Mega Meeting", note: "8:00 am CST · No other meetings this week", date: y.kf41, sortDate: y.kf41 });

  const nhg = range(y.nhgStudy);
  if (nhg) events.push({ type: "nhgStudy", title: "NHG Weekly Book Study", note: "Saturdays, 9 am CST", ...nhg, sortDate: nhg.startDate });

  const wi = y.weekendIntensive;
  if (wi.length) events.push({ type: "weekendIntensive", title: "NHG Weekend Intensive Book Study", dates: wi, sortDate: wi[0], endDate: wi[wi.length - 1] });

  const hpkp = range(y.hpkp);
  if (hpkp) events.push({ type: "hpkp", title: "Honor, Patronage, Kinship, & Purity Book Study", note: "Saturdays, 9 am CST", ...hpkp, sortDate: hpkp.startDate });

  if (y.kf0) events.push({ type: "kfIntro", title: "KF Introductory Meeting", note: "Saturday, 9 am", date: y.kf0, sortDate: y.kf0, cycleYear: year });
}

events.sort((a, b) => (a.sortDate < b.sortDate ? -1 : a.sortDate > b.sortDate ? 1 : 0));

const out = {
  generatedFrom: "content/KF Date Projection.xlsx",
  note: "Rebuild with: node scripts/build-kf-events.mjs. nhgRegistration is a fixed Oct 1 policy date; nhgHuddle is derived (Thursday before the first December Mega Meeting) — confirm each year.",
  events,
};

const outPath = join(__dirname, "..", "src", "data", "kf-events.json");
writeFileSync(outPath, JSON.stringify(out, null, 2) + "\n");
console.log(`Wrote ${events.length} events (${yearCols[0].year}–${yearCols[yearCols.length - 1].year}) to src/data/kf-events.json`);
// Spot-check the current upcoming few.
const today = new Date().toISOString().split("T")[0];
console.log(`\nToday: ${today}. Next 10 upcoming:`);
events.filter((e) => (e.endDate || e.date) >= today).slice(0, 10).forEach((e) =>
  console.log(`  ${e.sortDate}  ${e.title}${e.endDate && e.endDate !== e.date ? ` (→ ${e.endDate})` : ""}${e.derived ? "  [derived]" : ""}`)
);
