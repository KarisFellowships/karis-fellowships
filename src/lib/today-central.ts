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
