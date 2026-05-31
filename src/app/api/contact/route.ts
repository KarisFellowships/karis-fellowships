import { NextResponse } from "next/server";
import { Resend } from "resend";

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

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  const safeName = escapeHtml(name.trim());
  const safeEmail = escapeHtml(email.trim());
  const safeMessage = escapeHtml(message.trim());

  const resend = new Resend(process.env.RESEND_API_KEY);

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
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
