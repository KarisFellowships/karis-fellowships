import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";

// Handles the link in the password-reset email and establishes a session (stored
// in cookies) before sending the user to the page named in `next` (the
// new-password form). Two link shapes are supported:
//  - token_hash + type: our self-sent Resend email (verifyOtp), the current path.
//  - code: the older Supabase PKCE link (exchangeCodeForSession), kept for
//    back-compat with any link already in flight.
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const nextParam = searchParams.get("next");

  // Only allow same-site relative redirects (no open-redirect via ?next=).
  const next =
    nextParam && nextParam.startsWith("/") && !nextParam.startsWith("//")
      ? nextParam
      : "/update-password";

  // Only 'recovery' links are issued (by /api/forgot-password); whitelisting the
  // type avoids trusting the query param and keeps the surface minimal.
  if (tokenHash && type === "recovery") {
    const supabase = await createServerClient();
    const { error } = await supabase.auth.verifyOtp({
      type: "recovery",
      token_hash: tokenHash,
    });
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
    console.error("Auth callback verifyOtp failed:", error.message);
    return NextResponse.redirect(`${origin}/forgot-password?error=link_invalid`);
  }

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
