/**
 * Build the NHG facilitator sign-up sessions + open role slots for one study cycle.
 *
 * STRUCTURE (sections, times, durations, chapter titles, role layout) is the
 * fixed template below — transcribed from the ministry's "NHG Book Study
 * Facilitator Signup" spreadsheet (NO member names are imported; every slot is
 * created OPEN). DATES come only from content/KF Date Projection.xlsx (project
 * rule 2 — never hardcoded), matched to the requested cycle year.
 *
 * Usage:
 *   node scripts/seed-facilitator-sessions.mjs --year 2027 --print
 *     -> prints the sessions+slots as JSON (no DB writes; use to review or to
 *        apply via the Supabase MCP).
 *   node scripts/seed-facilitator-sessions.mjs --year 2027
 *     -> upserts into Supabase (requires SUPABASE_SERVICE_ROLE_KEY).
 *
 * Re-run when the Excel changes or to open a new cycle. Idempotent by
 * (cycle_year, sort): existing sessions for the year are replaced.
 */
import "dotenv/config";
import XLSX from "xlsx";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const yearArg = process.argv.indexOf("--year");
const CYCLE_YEAR = yearArg >= 0 ? Number(process.argv[yearArg + 1]) : 2027;
const PRINT = process.argv.includes("--print");

// ---- read the projection sheet for authoritative dates ----------------------
function excelSerialToISO(serial) {
  const d = new Date(Math.round((serial - 25569) * 86400 * 1000));
  return d.toISOString().slice(0, 10);
}
function addDaysISO(iso, days) {
  const d = new Date(iso + "T12:00:00Z");
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}
const wb = XLSX.readFile(join(__dirname, "..", "content", "KF Date Projection.xlsx"));
const rows = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1 });
const headerRow = rows.find((r) => Array.isArray(r) && r.some((c) => typeof c === "number" && c >= 2021 && c <= 2150));
const yearCol = headerRow.findIndex((c) => c === CYCLE_YEAR);
if (yearCol < 0) throw new Error(`Year ${CYCLE_YEAR} not found in projection sheet`);
const prevYearCol = headerRow.findIndex((c) => c === CYCLE_YEAR - 1);

// Collect dates by walking the labelled sections in the projection.
function sectionDates(startLabel, count) {
  const startIdx = rows.findIndex((r) => String(r?.[0] ?? "").trim() === startLabel);
  const out = [];
  for (let i = startIdx + 1; out.length < count && i < rows.length; i++) {
    const serial = rows[i]?.[yearCol];
    if (typeof serial === "number") {
      const iso = excelSerialToISO(serial);
      if (Number(iso.slice(0, 4)) >= 2021) out.push(iso);
    }
  }
  return out;
}
const nhgDates = sectionDates("NHG Study", 9); // Intro Meeting .. Chap 11 (9 Saturdays)
const weekendDates = sectionDates("Weekend Intensive", 3); // Fri, Sat, Sun
const kf0Serial = (() => {
  // KF0 row that belongs to this study cycle sits right after the Weekend Intensive block.
  const wiIdx = rows.findIndex((r) => String(r?.[0] ?? "").trim() === "Weekend Intensive");
  for (let i = wiIdx + 1; i < rows.length; i++) {
    if (String(rows[i]?.[0] ?? "").trim() === "KF0") return rows[i][yearCol];
  }
  return null;
})();
// NHG Huddle is not in the projection; it is the Thursday (−3 days) before the
// first December KF Mega Meeting (KF40, a Sunday) of the PRIOR calendar year —
// the same derivation the public Calendar uses. Flagged as derived.
const kf40Prev = (() => {
  const idx = rows.findIndex((r) => String(r?.[0] ?? "").trim() === "KF40");
  const serial = idx >= 0 && prevYearCol >= 0 ? rows[idx][prevYearCol] : null;
  return typeof serial === "number" ? excelSerialToISO(serial) : null;
})();
const huddleDate = kf40Prev ? addDaysISO(kf40Prev, -3) : null;

// ---- the session/role template (structure only — NO names) ------------------
function meetingRoles(durationMin) {
  const roles = [
    { label: "Lead", part: "1st hour", slot_index: 1, sort: 1 },
    { label: "Support #1", part: "1st hour", slot_index: 1, sort: 2 },
    { label: "Support #2", part: "1st hour", slot_index: 1, sort: 3 },
  ];
  if (durationMin >= 120) {
    roles.push(
      { label: "Lead", part: "2nd hour", slot_index: 1, sort: 4 },
      { label: "Support #1", part: "2nd hour", slot_index: 1, sort: 5 },
      { label: "Support #2", part: "2nd hour", slot_index: 1, sort: 6 },
    );
  }
  return roles;
}

const SATURDAY = [
  { content: "NHG Intro Meeting", dur: 90 },
  { content: "Intro & Ch 1: Search for Glory", dur: 90 },
  { content: "Ch 2: Neurotic Claims & Ch 3: Tyranny of the Shoulds", dur: 120 },
  { content: "Ch 4: Neurotic Pride", dur: 90 },
  { content: "Ch 5: Self-Hate and Self-Contempt", dur: 90 },
  { content: "Ch 6: Alienation from Self", dur: 90 },
  { content: "Ch 7: General Measures & Ch 8: Expansive Solution", dur: 120 },
  { content: "Ch 9: Self-Effacing Solution & Ch 10: Morbid Dependency", dur: 120 },
  { content: "Ch 11: Resignation & Review", dur: 90 },
];
// Weekend Intensive: dayOffset 0/1/2 = Fri/Sat/Sun of the Weekend Intensive dates.
const WEEKEND = [
  { dayOffset: 0, time: "19:00", content: "Intro & Ch 1: Search for Glory & Ch 2: Neurotic Claims" },
  { dayOffset: 1, time: "08:00", content: "Ch 3: Tyranny of the Shoulds & Ch 4: Neurotic Pride" },
  { dayOffset: 1, time: "11:00", content: "Ch 5: Self-Hate and Self-Contempt & Ch 6: Alienation from Self" },
  { dayOffset: 1, time: "19:00", content: "Ch 7: General Measures & Ch 8: Expansive Solution" },
  { dayOffset: 2, time: "15:00", content: "Ch 9: Self-Effacing Solution & Ch 10: Morbid Dependency" },
  { dayOffset: 2, time: "19:00", content: "Ch 11: Resignation & Review" },
];

function endTime(start, durationMin) {
  const [h, m] = start.split(":").map(Number);
  const t = h * 60 + m + durationMin;
  return `${String(Math.floor(t / 60) % 24).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;
}

const sessions = [];
let sort = 0;

// 1) NHG Huddle (derived date)
if (huddleDate) {
  sessions.push({
    section: "NHG Huddle",
    content: "NHG Huddle",
    session_date: huddleDate,
    date_derived: true,
    start_time: "19:30",
    end_time: "21:00",
    duration_minutes: 90,
    sort: sort++,
    roles: [{ label: "Lead", part: null, slot_index: 1, sort: 1 }],
  });
}
// 2) Saturday Meetings (9) — dates from projection NHG Study
SATURDAY.forEach((s, i) => {
  const date = nhgDates[i];
  if (!date) return;
  sessions.push({
    section: "Saturday Meetings",
    content: s.content,
    session_date: date,
    start_time: "09:00",
    end_time: endTime("09:00", s.dur),
    duration_minutes: s.dur,
    sort: sort++,
    roles: meetingRoles(s.dur),
  });
});
// 3) Weekend Intensive (6) — dates from projection Weekend Intensive (Fri/Sat/Sun)
WEEKEND.forEach((s) => {
  const date = weekendDates[s.dayOffset];
  if (!date) return;
  sessions.push({
    section: "Weekend Intensive",
    content: s.content,
    session_date: date,
    start_time: s.time,
    end_time: endTime(s.time, 120),
    duration_minutes: 120,
    sort: sort++,
    roles: meetingRoles(120),
  });
});
// 4) KF 0 Introductory Meeting — date from projection KF0
if (typeof kf0Serial === "number") {
  sessions.push({
    section: "KF 0",
    content: "KF 0: Introductory Meeting",
    session_date: excelSerialToISO(kf0Serial),
    start_time: "09:00",
    end_time: "10:30",
    duration_minutes: 90,
    sort: sort++,
    roles: [
      { label: "Intro Facilitator", part: null, slot_index: 1, sort: 1 },
      { label: "Intro Meeting Support", part: null, slot_index: 1, sort: 2 },
      { label: "Intro Meeting Support", part: null, slot_index: 2, sort: 3 },
      { label: "Intro Meeting Support", part: null, slot_index: 3, sort: 4 },
    ],
  });
}

const payload = { cycle_year: CYCLE_YEAR, generated_from: "content/KF Date Projection.xlsx", sessions };

if (PRINT) {
  console.log(JSON.stringify(payload, null, 2));
} else {
  const { createClient } = await import("@supabase/supabase-js");
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to write, or pass --print.");
  const sb = createClient(url, key, { auth: { persistSession: false } });
  // Replace this cycle's sessions (cascade clears slots).
  await sb.from("nhg_facilitator_sessions").delete().eq("cycle_year", CYCLE_YEAR);
  for (const s of sessions) {
    const { roles, date_derived, ...sess } = s;
    const { data, error } = await sb
      .from("nhg_facilitator_sessions")
      .insert({ ...sess, cycle_year: CYCLE_YEAR })
      .select("id")
      .single();
    if (error) throw error;
    const slotRows = roles.map((r) => ({ session_id: data.id, role_label: r.label, part: r.part, slot_index: r.slot_index, sort: r.sort }));
    const { error: se } = await sb.from("nhg_facilitator_slots").insert(slotRows);
    if (se) throw se;
  }
  console.log(`Seeded ${sessions.length} sessions for cycle ${CYCLE_YEAR}.`);
}
