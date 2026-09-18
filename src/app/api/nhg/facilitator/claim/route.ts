import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createAdminClient } from "@/lib/supabase-admin";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendAdminAlert } from "@/lib/alerts";
import {
  getKFActor,
  formatSessionDate,
  formatTimeRange,
  slotRoleText,
} from "@/lib/facilitator";

const FROM = process.env.ALERT_FROM || "Karis Fellowships <noreply@karisfellowships.com>";

function siteOrigin(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "https://karis-fellowships.vercel.app";
}

// DRAFT email copy — plain functional wording; flag for Sarah's review.
function confirmationHtml(opts: {
  role: string; content: string; dateStr: string; timeStr: string; link: string;
}): string {
  return `
    <div style="font-family: -apple-system, Segoe UI, sans-serif; max-width: 520px; margin: 0 auto; color: #374151;">
      <h2 style="color: #0d9488; font-weight: 600;">You're signed up to facilitate</h2>
      <p style="line-height: 1.6;">Thank you for signing up to help facilitate the NHG book study. Here are your details:</p>
      <table style="border-collapse: collapse; margin: 16px 0;">
        <tr><td style="padding: 4px 12px 4px 0; font-weight: bold;">Role</td><td style="padding: 4px 0;">${opts.role}</td></tr>
        <tr><td style="padding: 4px 12px 4px 0; font-weight: bold;">Session</td><td style="padding: 4px 0;">${opts.content}</td></tr>
        <tr><td style="padding: 4px 12px 4px 0; font-weight: bold;">Date</td><td style="padding: 4px 0;">${opts.dateStr}</td></tr>
        <tr><td style="padding: 4px 12px 4px 0; font-weight: bold;">Time</td><td style="padding: 4px 0;">${opts.timeStr}</td></tr>
      </table>
      <p style="line-height: 1.6; font-size: 14px;">Need to make a change? You can release your slot on the
        <a href="${opts.link}" style="color: #0f766e;">facilitator sign-up page</a>.</p>
    </div>
  `;
}

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function POST(request: Request) {
  const actor = await getKFActor();
  if (!actor) return NextResponse.json({ error: "Not authorized" }, { status: 403 });

  if (!(await checkRateLimit(`fac-claim:${actor.userId}`, 20, 600))) {
    return NextResponse.json({ error: "Too many requests. Please slow down and try again shortly." }, { status: 429 });
  }

  let body: { slotId?: unknown; displayName?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const slotId = typeof body.slotId === "string" ? body.slotId : "";
  let displayName = typeof body.displayName === "string" ? body.displayName.trim().replace(/\s+/g, " ").slice(0, 60) : "";
  if (!slotId) return NextResponse.json({ error: "Missing slot" }, { status: 400 });
  if (!displayName) displayName = actor.name || "KF Member";

  const admin = createAdminClient();

  // Atomic claim: only succeeds if the slot is still open (user_id is null).
  // Concurrent claims serialize on the row; the loser matches 0 rows.
  const now = new Date().toISOString();
  const { data: claimed, error } = await admin
    .from("nhg_facilitator_slots")
    .update({ user_id: actor.userId, display_name: displayName, signed_up_at: now, updated_at: now })
    .eq("id", slotId)
    .is("user_id", null)
    .select("id, role_label, part, session_id")
    .maybeSingle();

  if (error) {
    console.error("[facilitator claim] update failed:", error.message);
    return NextResponse.json({ error: "Could not sign you up. Please try again." }, { status: 500 });
  }
  if (!claimed) {
    return NextResponse.json({ error: "That slot was just taken. Please choose another." }, { status: 409 });
  }

  // Confirmation email — best-effort; never fail the sign-up on a mail error.
  if (actor.email) {
    try {
      const { data: session } = await admin
        .from("nhg_facilitator_sessions")
        .select("content, session_date, start_time, end_time")
        .eq("id", claimed.session_id)
        .single();
      const key = process.env.RESEND_API_KEY;
      if (key && session) {
        const resend = new Resend(key);
        await resend.emails.send({
          from: FROM,
          to: actor.email,
          subject: `You're signed up to facilitate — ${session.content}`,
          html: confirmationHtml({
            role: esc(slotRoleText(claimed)),
            content: esc(session.content),
            dateStr: esc(formatSessionDate(session.session_date)),
            timeStr: esc(formatTimeRange(session.start_time, session.end_time)),
            link: `${siteOrigin()}/nhg/facilitator`,
          }),
        });
      } else if (!key) {
        console.error("[facilitator claim] RESEND_API_KEY not set; confirmation not sent.");
      }
    } catch (err) {
      console.error("[facilitator claim] confirmation email failed:", err);
      await sendAdminAlert("Facilitator sign-up confirmation email failed", [
        `Member: ${actor.email}`,
        `Error: ${err instanceof Error ? err.message : String(err)}`,
      ]);
    }
  }

  return NextResponse.json({ success: true });
}
