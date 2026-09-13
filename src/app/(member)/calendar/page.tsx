import Image from "next/image";
import { todayCentral } from "@/lib/today-central";
import kfEvents from "@/data/kf-events.json";

// The dated studies/events come from src/data/kf-events.json, generated from
// content/KF Date Projection.xlsx (rebuild with `node scripts/build-kf-events.mjs`).
// The page shows the NEXT upcoming occurrence of each and rolls forward on its
// own as dates pass, so it never needs manual updating between cycles.

type KFEvent = {
  type: string;
  title: string;
  note?: string;
  date?: string;
  startDate?: string;
  endDate?: string;
  dates?: string[];
  sortDate: string;
  derived?: boolean;
  cycleYear?: number;
};

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const WEEKDAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

function d(iso: string) {
  return new Date(iso + "T12:00:00Z");
}
function longDate(iso: string, withWeekday = false): string {
  const dt = d(iso);
  const base = `${MONTHS[dt.getUTCMonth()]} ${dt.getUTCDate()}, ${dt.getUTCFullYear()}`;
  return withWeekday ? `${WEEKDAYS[dt.getUTCDay()]}, ${base}` : base;
}
function rangeDate(start: string, end: string): string {
  const s = d(start);
  const e = d(end);
  if (s.getUTCFullYear() === e.getUTCFullYear() && s.getUTCMonth() === e.getUTCMonth()) {
    return `${MONTHS[s.getUTCMonth()]} ${s.getUTCDate()} – ${e.getUTCDate()}, ${e.getUTCFullYear()}`;
  }
  if (s.getUTCFullYear() === e.getUTCFullYear()) {
    return `${MONTHS[s.getUTCMonth()]} ${s.getUTCDate()} – ${MONTHS[e.getUTCMonth()]} ${e.getUTCDate()}, ${e.getUTCFullYear()}`;
  }
  return `${longDate(start)} – ${longDate(end)}`;
}
function multiDay(dates: string[]): string {
  const first = d(dates[0]);
  const days = dates.map((x) => d(x).getUTCDate());
  const list = days.length > 1 ? `${days.slice(0, -1).join(", ")} & ${days[days.length - 1]}` : `${days[0]}`;
  return `${MONTHS[first.getUTCMonth()]} ${list}, ${first.getUTCFullYear()}`;
}

const WEEKDAY_TYPES = new Set(["kfMega", "nhgHuddle", "kfIntro"]);
function displayDate(e: KFEvent): string {
  if (e.dates) return multiDay(e.dates);
  if (e.startDate && e.endDate) return rangeDate(e.startDate, e.endDate);
  if (e.date) return longDate(e.date, WEEKDAY_TYPES.has(e.type));
  return "";
}

const ANNUAL_CALENDAR: { month: string; text: string; em?: string; inactive?: string }[] = [
  { month: "Monthly", text: "Neurotic Type Training (1st week of the month)", inactive: "Inactive" },
  { month: "January", text: "NHG Book Study begins (8 weeks)" },
  { month: "February", text: "NHG Book Study continues & Weekend Intensive" },
  { month: "March", text: "KF Training Cycle begins" },
  { month: "April", text: "KF Training Cycle continues" },
  { month: "April & May", text: " Book Study (4 weeks)", em: "Honor, Patronage, Kinship, & Purity" },
  { month: "June", text: "KF Training Cycle continues" },
  { month: "July", text: "KF Training Cycle continues" },
  { month: "August", text: "August Book Study — Discussion group for selected book (6 weeks)", inactive: "Currently Inactive" },
  { month: "September", text: "KF Training Cycle continues" },
  { month: "October", text: "Romans Bible Study begins (8 weeks) & NHG Registration opens" },
  { month: "November", text: "KF Training Cycle continues" },
  { month: "December", text: "KF Mega-Meetings during holidays" },
];

export default function CalendarPage() {
  const today = todayCentral();
  const all = kfEvents.events as KFEvent[];

  // Everything still upcoming (an event with an end date counts until it ends).
  const upcoming = all.filter((e) => (e.endDate ?? e.date ?? e.sortDate) >= today);
  // Show through the next KF Introductory Meeting — the start of the next training
  // cycle — so the list is one coherent, rolling cycle of events.
  const introIdx = upcoming.findIndex((e) => e.type === "kfIntro");
  const cycle = introIdx >= 0 ? upcoming.slice(0, introIdx + 1) : upcoming.slice(0, 8);

  const groups: { year: number; events: KFEvent[] }[] = [];
  for (const e of cycle) {
    const yr = d(e.sortDate).getUTCFullYear();
    const g = groups.find((x) => x.year === yr);
    if (g) g.events.push(e);
    else groups.push({ year: yr, events: [e] });
  }

  return (
    <div className="relative min-h-screen bg-[#4a5568]">
      {/* Header image pulled up behind the nav and faded into the page background */}
      <div className="absolute inset-x-0 top-0 h-[38rem]">
        <Image src="/sunrise-ocean.jpg" alt="New day dawning" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-[#4a5568] sm:from-black/45 sm:via-black/25" />
      </div>

      <div className="relative z-10">
        <section className="px-6 pt-32 sm:pt-44">
          <div className="mx-auto max-w-4xl">
            <h1 className="font-serif text-3xl font-semibold text-white drop-shadow-lg sm:text-4xl">Calendar</h1>
          </div>
        </section>

        <section className="px-6 pb-16 pt-10">
          <div className="mx-auto max-w-4xl space-y-12">
            {/* Upcoming Events & Studies */}
            <div>
              <h2 className="font-serif text-xl font-semibold text-white sm:text-2xl">Upcoming Events &amp; Studies</h2>
              <div className="mt-6 space-y-8">
                {groups.map(({ year, events }) => (
                  <div key={year}>
                    <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-teal-light/60">{year}</h3>
                    <div className="overflow-hidden rounded-2xl border border-white/12 bg-white/[0.06] backdrop-blur-sm">
                      {events.map((e, i) => (
                        <div key={`${e.type}-${e.sortDate}`}>
                          {e.type === "kfIntro" && e.cycleYear && (
                            <p className="border-t border-white/10 bg-white/[0.03] px-5 py-2 text-[11px] font-semibold uppercase tracking-widest text-teal-light/70">
                              Start of the Karis Fellowships {e.cycleYear} Training Cycle
                            </p>
                          )}
                          <div
                            className={`flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-baseline sm:gap-5 ${
                              i > 0 && !(e.type === "kfIntro" && e.cycleYear) ? "border-t border-white/10" : ""
                            }`}
                          >
                            <p className="shrink-0 text-sm font-semibold text-teal-light sm:w-56">{displayDate(e)}</p>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-white">{e.title}</p>
                              {e.note && <p className="mt-0.5 text-xs text-white/50">{e.note}</p>}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Our General Annual Calendar */}
            <div>
              <h2 className="font-serif text-xl font-semibold text-white sm:text-2xl">Our General Annual Calendar</h2>
              <div className="mt-6 overflow-hidden rounded-2xl border border-white/12 bg-white/[0.06] backdrop-blur-sm">
                {ANNUAL_CALENDAR.map((row, i) => (
                  <div
                    key={row.month}
                    className={`flex flex-col gap-1 px-5 py-3.5 sm:flex-row sm:items-baseline sm:gap-5 ${
                      i > 0 ? "border-t border-white/10" : ""
                    }`}
                  >
                    <p className="shrink-0 text-sm font-semibold text-amber sm:w-40">{row.month}</p>
                    <p className="min-w-0 text-sm text-white/70">
                      {row.em && <em>{row.em}</em>}
                      {row.text}
                      {row.inactive && (
                        <span className="ml-2 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/40">
                          {row.inactive}
                        </span>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
