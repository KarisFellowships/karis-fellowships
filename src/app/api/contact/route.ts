import { NextResponse } from "next/server";
import { Resend } from "resend";
import { checkRateLimit, clientIp } from "@/lib/rate-limit";
import { sendAdminAlert } from "@/lib/alerts";

const ADMIN_EMAIL = "admin@karisfellowships.com";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, message, website } = body as {
    name?: string;
    email?: string;
    message?: string;
    website?: string;
  };

  if (website) {
    return NextResponse.json({ success: true });
  }

  const ip = clientIp(request.headers);
  if (!(await checkRateLimit(`contact:${ip}`, 5, 600))) {
    return NextResponse.json(
      { error: "Too many messages. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  const safeName = escapeHtml(name.trim());
  const safeEmail = escapeHtml(email.trim());
  const safeMessage = escapeHtml(message.trim());

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("Contact form: RESEND_API_KEY is not set; message NOT delivered.");
    await sendAdminAlert("Contact form could not send (RESEND_API_KEY missing)", [
      `From: ${safeName} <${safeEmail}>`,
      "The email service key is not configured, so this inquiry was NOT delivered.",
    ]);
    return NextResponse.json(
      { error: "Messaging is temporarily unavailable. Please email admin@karisfellowships.com directly." },
      { status: 503 }
    );
  }
  const resend = new Resend(key);

  try {
    await resend.emails.send({
      from: "Karis Fellowships <noreply@karisfellowships.com>",
      to: ADMIN_EMAIL,
      replyTo: email.trim(),
      subject: `Contact Form: ${safeName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2 style="color: #0d9494;">New Contact Form Submission</h2>
          <table style="border-collapse: collapse; width: 100%; margin-top: 16px;">
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #374151; vertical-align: top;">Name</td>
              <td style="padding: 8px 12px; color: #4b5563;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #374151; vertical-align: top;">Email</td>
              <td style="padding: 8px 12px; color: #4b5563;"><a href="mailto:${safeEmail}">${safeEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #374151; vertical-align: top;">Message</td>
              <td style="padding: 8px 12px; color: #4b5563; white-space: pre-wrap;">${safeMessage}</td>
            </tr>
          </table>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send contact email:", error);
    await sendAdminAlert("Contact form email failed to send", [
      `From: ${safeName} <${safeEmail}>`,
      `Error: ${error instanceof Error ? error.message : String(error)}`,
      "A visitor's inquiry may have been lost — follow up if possible.",
    ]);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
