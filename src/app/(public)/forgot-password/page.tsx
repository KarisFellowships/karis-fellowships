"use client";

import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase-browser";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/auth/callback?next=/update-password`,
    });

    // Always show the same confirmation, whether or not the email is registered,
    // so the form can't be used to discover which addresses have accounts.
    if (error) console.error("Password reset request failed:", error);
    setSent(true);
    setLoading(false);
  }

  return (
    <section className="px-8 py-20 sm:py-28">
      <div className="mx-auto max-w-md">
        <div className="rounded-2xl border border-border/40 bg-white p-8 sm:p-10">
          <h1 className="font-serif text-2xl font-semibold text-foreground">Reset your password</h1>

          {sent ? (
            <div className="mt-6 rounded-xl bg-teal-muted px-6 py-5">
              <p className="font-medium text-teal-hover">Check your email</p>
              <p className="mt-1 text-sm text-slate">
                If an account exists for that address, we&apos;ve sent a link to set a new
                password. The link expires shortly, so please use it soon.
              </p>
            </div>
          ) : (
            <>
              <p className="mt-2 text-sm text-slate/60">
                Enter your email and we&apos;ll send you a link to set a new password.
              </p>
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label
                    htmlFor="reset-email"
                    className="block text-[11px] font-medium uppercase tracking-[0.2em] text-slate/60"
                  >
                    Email Address
                  </label>
                  <input
                    id="reset-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1.5 w-full rounded-xl border border-border/50 bg-ivory/30 px-5 py-3 text-sm outline-none transition-all focus:border-teal/40 focus:ring-2 focus:ring-teal/10 placeholder:text-slate/30"
                    placeholder="you@email.com"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-teal px-6 py-3.5 text-[13px] font-medium uppercase tracking-[0.15em] text-white transition-all duration-500 hover:bg-teal-hover disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending…" : "Send reset link"}
                </button>
              </form>
            </>
          )}

          <p className="mt-6 text-center text-xs text-slate/40">
            Remembered it?{" "}
            <Link href="/login" className="text-teal underline underline-offset-2 hover:text-teal-hover transition-colors">
              Back to login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
