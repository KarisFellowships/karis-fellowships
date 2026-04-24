"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError("Invalid email or password. Please try again.");
      setLoading(false);
      return;
    }

    let destination = "/nhg";
    try {
      const { data: profile } = await supabase
        .from("users")
        .select("tier")
        .eq("id", authData.user.id)
        .single();

      if (profile?.tier && profile.tier !== "nhg") {
        destination = "/dashboard";
      }
    } catch {
      // Default to /nhg if profile fetch fails
    }

    router.push(destination);
    router.refresh();
  }

  return (
    <div className="flex min-h-screen">
      <div className="relative hidden w-1/2 lg:block">
        <Image
          src="/ocean-horizon.jpg"
          alt="Vast ocean horizon"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-slate-dark/40" />
        <div className="absolute inset-0 flex items-center justify-center px-12 pt-16">
          <span className="font-serif text-3xl font-light leading-snug text-white/80">
            &ldquo;Train hard, fight easy.&rdquo;
          </span>
        </div>
      </div>

      <div className="flex w-full items-center justify-center bg-slate-dark px-8 py-32 lg:w-1/2">
        <div className="w-full max-w-sm">
          <span className="font-serif text-2xl font-semibold tracking-wide text-white">Karis Fellowships</span>
          <h1 className="mt-10 font-serif text-3xl font-semibold text-white">Welcome back</h1>
          <p className="mt-2 text-sm text-white/60">Empowering Christians to fulfill their true glory.</p>

          <form onSubmit={handleLogin} className="mt-10 space-y-5">
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-2 w-full rounded-xl border border-white/15 bg-white/[0.05] px-5 py-3.5 text-sm text-white outline-none transition-all focus:border-teal/40 focus:ring-2 focus:ring-teal/10 placeholder:text-white/30"
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-2 w-full rounded-xl border border-white/15 bg-white/[0.05] px-5 py-3.5 text-sm text-white outline-none transition-all focus:border-teal/40 focus:ring-2 focus:ring-teal/10 placeholder:text-white/30"
                placeholder="Your password"
              />
            </div>

            {error && (
              <p className="rounded-lg bg-coral/10 px-4 py-3 text-sm text-coral">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-teal/90 px-6 py-4 text-[13px] font-medium uppercase tracking-[0.15em] text-white transition-all duration-500 hover:bg-teal disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in…" : "Log In"}
            </button>
          </form>

          <p className="mt-10 text-center text-sm text-white/50">
            Not a member yet?{" "}
            <Link href="/register" className="text-teal-light underline underline-offset-4 decoration-teal-light/30 hover:decoration-teal-light/60 transition-colors">
              Register for NHG
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
