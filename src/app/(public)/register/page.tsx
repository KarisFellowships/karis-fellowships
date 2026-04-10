"use client";

import PageHeader from "@/components/PageHeader";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase-browser";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [howHeard, setHowHeard] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, how_heard: howHeard },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    const userId = authData.user?.id;
    if (!userId) {
      setError("Registration failed. Please try again.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "nhg_registration",
          amount: 3000,
          userId,
          userEmail: email,
        }),
      });
      const { url, error: checkoutError } = await res.json();
      if (checkoutError || !url) {
        setError("Registration created but payment setup failed. You can pay later from your dashboard.");
        setSuccess(true);
        setLoading(false);
        return;
      }
      window.location.href = url;
    } catch {
      setError("Registration created but payment setup failed. You can pay later from your dashboard.");
      setSuccess(true);
      setLoading(false);
    }
  }

  return (
    <>
      <PageHeader
        title="Register for NHG Book Study"
        subtitle="Your first step is to participate in the Neurosis and Human Growth (NHG) book study."
        accent="coral"
      />

      <section className="px-8 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="rounded-3xl bg-gradient-to-br from-ivory to-cream p-10">
              <h2 className="font-serif text-2xl font-semibold text-foreground">How to Get Started</h2>
              <p className="mt-5 leading-[1.8] text-slate">
                For a big picture look at the book study and how it fits into Karis
                Fellowships,{" "}
                <Link href="/about" className="font-medium text-teal underline underline-offset-4 decoration-teal/30 hover:text-teal-hover hover:decoration-teal/60 transition-colors">
                  click here
                </Link>.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image src="/ship-sailing.jpg" alt="Ship sailing toward the horizon" fill className="object-cover" />
            </div>
          </div>

          <div className="mt-16">
            <h2 className="font-serif text-2xl font-semibold text-foreground">Curriculum</h2>
            <p className="mt-3 text-slate">It&apos;s simple.</p>
            <ol className="mt-6 space-y-4">
              {[
                "You read the first 11 chapters of Karen Horney's Neurosis and Human Growth.",
                "You complete a study guide for each chapter as you go.",
                "You attend live conference calls to hear additional material, check your answers, and ask questions.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-5">
                  <span className="mt-0.5 font-serif text-2xl font-light text-teal/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="pt-1.5 leading-[1.8] text-slate">{item}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-14">
            <h2 className="font-serif text-2xl font-semibold text-foreground">Format</h2>
            <p className="mt-3 text-slate">We offer 3 options:</p>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {[
                {
                  title: "Flex Study",
                  color: "border-t-teal/40",
                  desc: "Begin any time and study at your own pace until the next round of live calls. You can then attend weekly calls or wait for the Weekend Intensive calls.",
                },
                {
                  title: "Weekend Intensive",
                  color: "border-t-coral/40",
                  desc: "An 8-week study with only email support until a single weekend of 6 two-hour conference calls at the end.",
                },
                {
                  title: "Weekly Study",
                  color: "border-t-violet/40",
                  desc: "An 8-week study with weekly 1.5-2 hour conference calls.",
                },
              ].map(({ title, color, desc }) => (
                <div key={title} className={`rounded-2xl border border-border/40 border-t-2 ${color} bg-white p-7`}>
                  <h3 className="font-serif text-lg font-semibold text-foreground">{title}</h3>
                  <p className="mt-3 text-sm leading-[1.8] text-slate">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 rounded-3xl border border-border/30 bg-ivory/50 p-8">
            <h3 className="font-serif text-lg font-semibold text-foreground">After the Study</h3>
            <p className="mt-3 text-sm leading-[1.8] text-slate">
              If you attend the NHG conference calls, complete your reading
              guides, and your registration is accepted by the KF board, you are
              eligible to join Karis Fellowships, our one-year training program
              of Bible teaching, practical tools, support, and healing.
            </p>
          </div>

          <div className="mt-14">
            <h3 className="font-serif text-lg font-semibold text-foreground">Calendar</h3>
            <p className="mt-3 leading-[1.8] text-slate">
              We offer the Weekly Study and Weekend Intensive Study formats,
              both 8 weeks in length, once a year beginning in January and
              ending in March. Please contact your Karis Link for exact dates
              and times.
            </p>
            <p className="mt-4 text-sm text-slate/60 italic">
              You may also register any time and study at your own pace until
              the next conference calls begin in January.
            </p>
          </div>

          <div className="mt-20 rounded-3xl border border-border/40 bg-white p-10">
            <h2 className="font-serif text-3xl font-semibold text-foreground">Register</h2>

            {success ? (
              <div className="mt-6 rounded-xl bg-teal-muted px-6 py-5">
                <p className="font-medium text-teal">Registration submitted!</p>
                <p className="mt-1 text-sm text-slate">
                  Check your email to confirm your account. Once confirmed, you can{" "}
                  <Link href="/login" className="font-medium text-teal underline underline-offset-4">
                    log in
                  </Link>{" "}
                  to access your NHG materials.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="mt-8 space-y-5">
                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-[0.2em] text-slate/60">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="mt-2 w-full rounded-xl border border-border/50 bg-ivory/30 px-5 py-3.5 text-sm outline-none transition-all focus:border-teal/40 focus:ring-2 focus:ring-teal/10 placeholder:text-slate/30"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-[0.2em] text-slate/60">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-2 w-full rounded-xl border border-border/50 bg-ivory/30 px-5 py-3.5 text-sm outline-none transition-all focus:border-teal/40 focus:ring-2 focus:ring-teal/10 placeholder:text-slate/30"
                    placeholder="you@email.com"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-[0.2em] text-slate/60">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    className="mt-2 w-full rounded-xl border border-border/50 bg-ivory/30 px-5 py-3.5 text-sm outline-none transition-all focus:border-teal/40 focus:ring-2 focus:ring-teal/10 placeholder:text-slate/30"
                    placeholder="Minimum 8 characters"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-[0.2em] text-slate/60">How did you hear about us?</label>
                  <textarea
                    value={howHeard}
                    onChange={(e) => setHowHeard(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-border/50 bg-ivory/30 px-5 py-3.5 text-sm outline-none transition-all focus:border-teal/40 focus:ring-2 focus:ring-teal/10 placeholder:text-slate/30"
                    rows={3}
                    placeholder="Who invited you or how did you find us?"
                  />
                </div>

                {error && (
                  <p className="rounded-lg bg-coral-light px-4 py-3 text-sm text-coral">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-teal px-6 py-4 text-[13px] font-medium uppercase tracking-[0.15em] text-white transition-all duration-500 hover:bg-teal-hover disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Submitting…" : "Submit Registration"}
                </button>
              </form>
            )}

            <p className="mt-5 text-xs text-slate/40">
              Still have questions? Ask the person who invited you or email us
              at admin@karisfellowships.com.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
