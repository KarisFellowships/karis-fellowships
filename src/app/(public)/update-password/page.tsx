"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-browser";

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [hasSession, setHasSession] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  // The /auth/callback route exchanges the reset link for a recovery session
  // (stored in cookies). Confirm that session exists before showing the form.
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setHasSession(!!data.user);
      setChecking(false);
    });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setError(
        "Could not update your password. Your reset link may have expired — please request a new one."
      );
      setLoading(false);
      return;
    }
    setDone(true);
    setLoading(false);
  }

  return (
    <section className="px-8 py-20 sm:py-28">
      <div className="mx-auto max-w-md">
        <div className="rounded-2xl border border-border/40 bg-white p-8 sm:p-10">
          <h1 className="font-serif text-2xl font-semibold text-foreground">Set a new password</h1>

          {checking ? (
            <p className="mt-4 text-sm text-slate/60">Checking your reset link…</p>
          ) : done ? (
            <div className="mt-6 rounded-xl bg-teal-muted px-6 py-5">
              <p className="font-medium text-teal-hover">Password updated</p>
              <p className="mt-1 text-sm text-slate">
                Your password has been changed.{" "}
                <Link href="/login" className="font-medium text-teal-hover underline underline-offset-4">
                  Log in
                </Link>{" "}
                with your new password.
              </p>
            </div>
          ) : !hasSession ? (
            <div className="mt-6 rounded-xl bg-coral-light px-6 py-5">
              <p className="text-sm text-slate">
                This reset link is invalid or has expired.{" "}
                <Link href="/forgot-password" className="font-medium text-teal-hover underline underline-offset-4">
                  Request a new one
                </Link>
                .
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="new-password"
                  className="block text-[11px] font-medium uppercase tracking-[0.2em] text-slate/60"
                >
                  New Password
                </label>
                <input
                  id="new-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="mt-1.5 w-full rounded-xl border border-border/50 bg-ivory/30 px-5 py-3 text-sm outline-none transition-all focus:border-teal/40 focus:ring-2 focus:ring-teal/10 placeholder:text-slate/30"
                  placeholder="Minimum 8 characters"
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-[11px] font-medium uppercase tracking-[0.2em] text-slate/60"
                >
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                  minLength={8}
                  className="mt-1.5 w-full rounded-xl border border-border/50 bg-ivory/30 px-5 py-3 text-sm outline-none transition-all focus:border-teal/40 focus:ring-2 focus:ring-teal/10 placeholder:text-slate/30"
                  placeholder="Re-enter your new password"
                />
              </div>

              {error && <p className="rounded-lg bg-coral-light px-4 py-3 text-sm text-coral">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-teal px-6 py-3.5 text-[13px] font-medium uppercase tracking-[0.15em] text-white transition-all duration-500 hover:bg-teal-hover disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Updating…" : "Update password"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
