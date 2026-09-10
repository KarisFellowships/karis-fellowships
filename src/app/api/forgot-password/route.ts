import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createAdminClient } from "@/lib/supabase-admin";
import { checkRateLimit, clientIp } from "@/lib/rate-limit";
import { sendAdminAlert } from "@/lib/alerts";

const FROM = process.env.ALERT_FROM || "Karis Fellowships <noreply@karisfellowships.com>";

// Server-trusted canonical origin for the reset link. This MUST NOT be derived
// from a client-supplied header (Origin/Host): a spoofed value would place an
// attacker-controlled link (carrying the recovery token) into the victim's
// inbox. Configure NEXT_PUBLIC_SITE_URL to the canonical domain; VERCEL_URL is a
// safe per-deployment fallback that Vercel sets server-side.
function siteOrigin(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, "");
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "https://karis-fellowships.vercel.app";
}

function isEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function resetEmailHtml(link: string): string {
  return `
    <div style="font-family: -apple-system, Segoe UI, sans-serif; max-width: 520px; margin: 0 auto; color: #374151;">
      <h2 style="color: #0d9488; font-weight: 600;">Reset your password</h2>
      <p style="line-height: 1.6;">
        We received a request to reset the password for your Karis Fellowships account.
        Click the button below to choose a new password. This link expires shortly, so
        please use it soon.
      </p>
      <p style="margin: 28px 0;">
        <a href="${link}" style="background: #0d9488; color: #ffffff; text-decoration: none; padding: 12px 22px; border-radius: 10px; font-weight: 600; display: inline-block;">
          Set a new password
        </a>
      </p>
      <p style="line-height: 1.6; font-size: 13px; color: #6b7280;">
        If the button doesn't work, copy and paste this link into your browser:<br />
        <a href="${link}" style="color: #0f766e; word-break: break-all;">${link}</a>
      </p>
      <p style="line-height: 1.6; font-size: 13px; color: #9ca3af;">
        If you didn't request this, you can safely ignore this email — your password
        won't change.
      </p>
    </div>
  `;
}

export async function POST(request: Request) {
  const ip = clientIp(request.headers);
  // Per-IP guard is generous: a congregation may share one egress IP, so this is
  // a coarse abuse cap. The per-address guard below is the real anti-bombing lever.
  if (!(await checkRateLimit(`forgot:${ip}`, 10, 600))) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  let email = "";
  try {
    const body = await request.json();
    email = typeof body?.email === "string" ? body.email.trim() : "";
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Always answer identically, whether or not the address has an account, so the
  // endpoint can't be used to enumerate which emails are registered.
  const genericOk = NextResponse.json({ success: true });

  if (!email || !isEmail(email)) return genericOk;

  // Per-address guard: stop reset-email bombing / inbox harassment of one victim,
  // even from rotating IPs. Return the SAME generic success when tripped so it
  // stays enumeration-safe (never reveal that a specific address was limited).
  if (!(await checkRateLimit(`forgot-email:${email.toLowerCase()}`, 3, 3600))) {
    return genericOk;
  }

  // Mint a single-use recovery token with the service-role client, then build a
  // link to our own callback (verifyOtp handles token_hash). We never touch
  // Supabase's built-in mailer — the email goes out through our own Resend setup.
  let actionLink = "";
  try {
    const admin = createAdminClient();
    const { data, error } = await admin.auth.admin.generateLink({
      type: "recovery",
      email,
    });
    if (error || !data?.properties?.hashed_token) {
      if (error) console.error("[forgot-password] generateLink:", error.message);
      return genericOk; // unknown email or transient error — stay silent
    }
    const tokenHash = data.properties.hashed_token;
    actionLink = `${siteOrigin()}/auth/callback?token_hash=${encodeURIComponent(
      tokenHash
    )}&type=recovery&next=/update-password`;
  } catch (err) {
    console.error("[forgot-password] generateLink threw:", err);
    return genericOk;
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("[forgot-password] RESEND_API_KEY not set; reset email NOT sent.");
    await sendAdminAlert("Password reset could not send (RESEND_API_KEY missing)", [
      "A member requested a password reset but the email service key is not configured.",
      "Set RESEND_API_KEY so reset emails can be delivered.",
    ]);
    return genericOk;
  }

  try {
    const resend = new Resend(key);
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: "Reset your Karis Fellowships password",
      html: resetEmailHtml(actionLink),
    });
  } catch (err) {
    console.error("[forgot-password] Resend send failed:", err);
    await sendAdminAlert("Password reset email failed to send", [
      `To: ${email}`,
      `Error: ${err instanceof Error ? err.message : String(err)}`,
      "The member will not receive a reset link — follow up if needed.",
    ]);
  }

  return genericOk;
}
