import { NextResponse } from "next/server";
import { checkRateLimit, clientIp } from "@/lib/rate-limit";
import { sendAdminAlert } from "@/lib/alerts";

// Receives errors caught by the client error boundaries (error.tsx /
// global-error.tsx). Their console.error only lands in the visitor's browser
// console, invisible to admins — this route surfaces the same information in the
// server logs (Vercel) and sends a throttled admin alert so real breakage is
// noticed. Best-effort: the boundary never depends on this succeeding.
export async function POST(request: Request) {
  let body: { message?: string; digest?: string; path?: string; kind?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const ip = clientIp(request.headers);
  // Throttle hard: this only feeds server logs + an admin alert, so a handful per
  // half-hour per IP is plenty and stops an error loop from flooding the inbox.
  if (!(await checkRateLimit(`client-error:${ip}`, 3, 1800))) {
    return NextResponse.json({ ok: true });
  }

  // Cap length AND collapse control chars, so a caller can't forge extra log
  // lines (the fields flow into a single-line console.error and the alert subject).
  const trim = (s: unknown, n: number) =>
    typeof s === "string" ? s.replace(/[\r\n\t]+/g, " ").slice(0, n) : "";
  const message = trim(body.message, 500) || "(no message)";
  const digest = trim(body.digest, 100);
  const path = trim(body.path, 200);
  const kind = body.kind === "global" ? "global-error" : "error";

  // Server-side log → shows up in Vercel logs (the client console.error does not).
  console.error(
    `[client-error:${kind}] ${message} | digest=${digest || "none"} | path=${path || "unknown"} | ip=${ip}`
  );

  await sendAdminAlert(`Client error on ${path || "the site"}`, [
    `Boundary: ${kind}`,
    `Message: ${message}`,
    digest ? `Reference (digest): ${digest}` : "No digest",
    `Path: ${path || "unknown"}`,
  ]);

  return NextResponse.json({ ok: true });
}
