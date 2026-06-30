import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";

// Handles the link in the password-reset email. Supabase redirects here with a
// one-time `code`; we exchange it for a session (stored in cookies) and then
// send the user to the page named in `next` (the new-password form).
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const nextParam = searchParams.get("next");

  // Only allow same-site relative redirects (no open-redirect via ?next=).
  const next =
    nextParam && nextParam.startsWith("/") && !nextParam.startsWith("//")
      ? nextParam
      : "/update-password";

  if (code) {
    const supabase = await createServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
    console.error("Auth callback code exchange failed:", error.message);
  }

  return NextResponse.redirect(`${origin}/forgot-password?error=link_invalid`);
}
