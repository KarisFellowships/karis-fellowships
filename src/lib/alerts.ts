import { Resend } from "resend";

// Where operational alerts go. Configurable via env; defaults to the KF admin
// mailbox (a role address, not a person). Mirrors the sender used by /api/contact.
const ALERT_TO = process.env.ALERT_EMAIL || "admin@karisfellowships.com";
const ALERT_FROM = process.env.ALERT_FROM || "Karis Fellowships <noreply@karisfellowships.com>";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Fire-and-forget admin alert. This function NEVER throws: a mail failure must not
// change the control flow of the caller (e.g. a Stripe webhook's 200/500 decision).
export async function sendAdminAlert(subject: string, lines: string[]): Promise<void> {
  try {
    const key = process.env.RESEND_API_KEY;
    if (!key) {
      console.error("[alert] RESEND_API_KEY not set; alert not sent:", subject, lines);
      return;
    }
    const resend = new Resend(key);
    const items = lines.map((l) => `<li>${escapeHtml(l)}</li>`).join("");
    const send = resend.emails.send({
      from: ALERT_FROM,
      to: ALERT_TO,
      subject: `[KF Alert] ${subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2 style="color: #b91c1c;">Karis Fellowships — action may be needed</h2>
          <p style="color: #374151; font-weight: bold;">${escapeHtml(subject)}</p>
          <ul style="color: #4b5563; line-height: 1.6;">${items}</ul>
          <p style="color: #9ca3af; font-size: 12px;">Automated alert from the Karis Fellowships app.</p>
        </div>
      `,
    });
    // Cap how long we wait so a slow/hung Resend can never delay the webhook
    // response past Stripe's delivery timeout (which would otherwise cause retries).
    const timeout = new Promise<void>((resolve) => setTimeout(resolve, 2500));
    await Promise.race([Promise.resolve(send).then(() => undefined), timeout]);
  } catch (err) {
    // Swallow: alerting is best-effort and must not affect the caller.
    console.error("[alert] failed to send admin alert:", subject, err);
  }
}
