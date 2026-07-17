// The ministry's meetings run on Central time (CST/CDT). Compute "today" in
// America/Chicago rather than UTC so the current lesson/week does not flip a day
// early on Saturday evenings (Vercel serverless runs in UTC, ~5-6h ahead of CT).
// Returns a YYYY-MM-DD string to compare against DATE columns in Supabase.
export function todayCentral(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

// Central-time "now" as a date (YYYY-MM-DD) plus the hour (0-23). Used to decide
// whether a same-day, time-of-day cutoff has passed (e.g. "is today's Saturday
// meeting over yet?") using wall-clock comparison in Central, with no UTC-offset math.
export function centralNow(): { date: string; hour: number } {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  let hour = parseInt(get("hour"), 10);
  if (Number.isNaN(hour) || hour === 24) hour = 0;
  return { date: `${get("year")}-${get("month")}-${get("day")}`, hour };
}
