import { createAdminClient } from "./supabase-admin";

// Per-key fixed-window limiter backed by the Postgres rate_limit_check function.
// Fail-open: if the limiter itself errors, allow the request — abuse prevention
// must never lock out a legitimate user because of a transient DB issue.
export async function checkRateLimit(
  key: string,
  max: number,
  windowSeconds: number
): Promise<boolean> {
  try {
    const admin = createAdminClient();
    const { data, error } = await admin.rpc("rate_limit_check", {
      p_key: key,
      p_max: max,
      p_window_seconds: windowSeconds,
    });
    if (error) {
      console.error("[rate-limit] check failed; allowing request:", error.message);
      return true;
    }
    return data === true;
  } catch (err) {
    console.error("[rate-limit] unexpected error; allowing request:", err);
    return true;
  }
}

// Client IP for rate-limit keying. Use only IPs the platform sets, never the
// client-controllable leftmost X-Forwarded-For (a caller can spoof that to rotate
// keys and defeat the limit). x-real-ip is set by Vercel to the true peer IP; if
// falling back to X-Forwarded-For, take the RIGHTMOST entry (the one Vercel
// appended), not the leftmost.
export function clientIp(headers: Headers): string {
  const realIp = headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  const xff = headers.get("x-forwarded-for");
  if (xff) {
    const parts = xff.split(",").map((s) => s.trim()).filter(Boolean);
    if (parts.length > 0) return parts[parts.length - 1];
  }
  return "unknown";
}
