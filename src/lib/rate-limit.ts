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

// Best-effort client IP from the proxy headers Vercel sets.
export function clientIp(headers: Headers): string {
  const xff = headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return headers.get("x-real-ip")?.trim() || "unknown";
}
