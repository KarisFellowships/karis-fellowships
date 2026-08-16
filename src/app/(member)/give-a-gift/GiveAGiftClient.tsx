"use client";

import { useState } from "react";
import Image from "next/image";

const PRESETS = [1000, 2500, 5000, 10000];

const volunteerOpportunities = [
  "Managing Karis Conversations",
  "NHG book study facilitators",
  "KF meeting facilitators",
  "Editors and proofreaders",
  "Website maintenance help",
  "Technology expertise",
  "Administrative help",
  "Join the rotating admin team",
  "Legal & accounting expertise",
];

// Frosted editorial card, in the calm "Pray As You Go" style.
const card =
  "flex flex-col rounded-2xl border border-white/12 bg-white/[0.06] p-6 backdrop-blur-sm sm:p-7";
const iconChip =
  "flex h-11 w-11 items-center justify-center rounded-xl bg-teal/15";
const cardTitle = "mt-4 font-serif text-2xl font-medium text-white";
const cardBody = "mt-2 text-sm leading-relaxed text-white/65";

export default function GiveAGiftClient({
  userId,
  userEmail,
}: {
  userId: string;
  userEmail: string;
}) {
  const [mode, setMode] = useState<"onetime" | "monthly">("onetime");
  const [selected, setSelected] = useState<number | null>(2500);
  const [custom, setCustom] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const amountCents =
    selected ?? (custom ? Math.round(parseFloat(custom) * 100) : 0);

  async function handleDonate() {
    if (amountCents < 100) {
      setError("Minimum donation is $1.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: mode === "monthly" ? "gift_recurring" : "gift_onetime",
          amount: amountCents,
          userId,
          userEmail,
        }),
      });
      const { url, error: checkoutError } = await res.json();
      if (checkoutError || !url) {
        setError("Unable to process. Please try again.");
        setLoading(false);
        return;
      }
      window.location.href = url;
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    if (params.get("status") === "success" && !success) {
      setSuccess(true);
    }
  }

  return (
    <div className="min-h-screen bg-[#4a5568]">
      {/* Header — image runs behind the navbar and fades into the page */}
      <div className="relative z-10">
        <div className="absolute inset-0">
          <Image src="/sunlight-nature.jpg" alt="Sunlight through nature" fill priority className="object-cover object-center brightness-105" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#4a5568] sm:from-black/45 sm:via-black/25" />
        </div>
        <div className="relative px-6 pb-14 pt-32 sm:pb-16 sm:pt-44">
          <div className="mx-auto max-w-6xl">
            <h1 className="font-serif text-4xl font-medium leading-[1.03] text-white drop-shadow-xl sm:text-5xl lg:text-6xl" style={{ textShadow: "0 2px 24px rgba(0,0,0,0.55)" }}>Give a Gift</h1>
            <p className="mt-4 max-w-xl text-base font-medium leading-relaxed text-white/80 drop-shadow sm:text-lg">We appreciate your participation in the karis relationship by supporting Karis Fellowships!</p>
          </div>
        </div>
      </div>

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-6xl space-y-4">
          {/* Success Banner */}
          {success && (
            <div className="rounded-2xl border border-teal/30 bg-teal/15 p-6 text-center backdrop-blur-sm">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal/20">
                <svg className="h-6 w-6 text-teal-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="mt-3 text-lg font-bold text-white">Thank you for your generous gift!</p>
              <p className="mt-1 text-sm text-white/50">Your donation has been received.</p>
            </div>
          )}

          <div className="grid gap-4 lg:grid-cols-3 lg:items-stretch">
            {/* 1 — Give a Gift (financial) */}
            <div className={card}>
              <span className={iconChip}>
                <svg className="h-6 w-6 text-teal-light" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </span>
              <h2 className={cardTitle}>Contribute Financially</h2>
              <p className={cardBody}>
                Your financial gifts keep this website running, allow us to explore technology options, and pay for legal and accounting services. We do not pay ourselves salaries; we are volunteers.
              </p>

              <div className="mt-auto pt-6">
                {/* One-time / Monthly toggle */}
                <div className="inline-flex rounded-lg bg-white/5 p-1">
                  <button
                    onClick={() => setMode("onetime")}
                    className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${mode === "onetime" ? "bg-teal text-white shadow-sm" : "text-white/50 hover:text-white"}`}
                  >
                    One-Time
                  </button>
                  <button
                    onClick={() => setMode("monthly")}
                    className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${mode === "monthly" ? "bg-teal text-white shadow-sm" : "text-white/50 hover:text-white"}`}
                  >
                    Monthly
                  </button>
                </div>

                {/* Preset amounts */}
                <div className="mt-4 grid grid-cols-2 gap-2.5">
                  {PRESETS.map((cents) => (
                    <button
                      key={cents}
                      onClick={() => { setSelected(cents); setCustom(""); }}
                      className={`rounded-xl py-3 text-sm font-bold transition-all ${selected === cents ? "bg-teal text-white ring-2 ring-teal/40" : "bg-white/5 text-white/70 ring-1 ring-white/10 hover:bg-white/10"}`}
                    >
                      ${cents / 100}
                    </button>
                  ))}
                </div>

                {/* Custom amount */}
                <div className="mt-2.5 relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-white/40">$</span>
                  <input
                    type="number"
                    min="1"
                    step="0.01"
                    value={custom}
                    onChange={(e) => { setCustom(e.target.value); setSelected(null); }}
                    placeholder="Other amount"
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-8 pr-4 text-sm text-white outline-none transition-colors focus:border-teal/40 focus:ring-2 focus:ring-teal/20 placeholder:text-white/30"
                  />
                </div>

                {error && (
                  <p className="mt-3 rounded-lg bg-coral/15 px-4 py-2 text-sm text-coral">{error}</p>
                )}

                <button
                  onClick={handleDonate}
                  disabled={loading || amountCents < 100}
                  className="mt-4 w-full rounded-xl bg-teal px-6 py-4 text-sm font-bold text-white transition-all hover:bg-teal-hover hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading
                    ? "Redirecting to payment…"
                    : `Donate $${(amountCents / 100).toFixed(2)}${mode === "monthly" ? " / month" : ""}`}
                </button>

                <p className="mt-3 text-center text-xs text-white/30">Secure payment processed by Stripe.</p>
              </div>
            </div>

            {/* 2 — Facilitate an NHG Meeting */}
            <div className={card}>
              <span className={iconChip}>
                <svg className="h-6 w-6 text-teal-light" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </span>
              <h2 className={cardTitle}>Facilitate an Upcoming NHG Meeting</h2>
              <p className={cardBody}>
                Sign up to facilitate one or two upcoming NHG book study meetings. Just click the link and follow the simple instructions. You will even receive automatic email reminders 1 week, 1 day, and 1 hour before your meeting.
              </p>
              <div className="mt-auto pt-6">
                <a
                  href="https://calendly.com/karisfellowships"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal px-6 py-4 text-sm font-bold text-white transition-all hover:bg-teal-hover hover:-translate-y-0.5"
                >
                  Sign Up on Calendly
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </a>
                <p className="mt-3 text-center text-xs text-white/30">calendly.com/karisfellowships</p>
              </div>
            </div>

            {/* 3 — Contribute Your Gifts */}
            <div className={card}>
              <span className={iconChip}>
                <svg className="h-6 w-6 text-teal-light" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg>
              </span>
              <h2 className={cardTitle}>Contribute Your Gifts</h2>
              <p className={cardBody}>
                You can support Karis Fellowships with your time, energy, and abilities in many ways. We are always on the lookout for:
              </p>
              <ul className="mt-4 space-y-2">
                {volunteerOpportunities.map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <svg className="h-4 w-4 shrink-0 text-teal-light" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span className="text-sm text-white/70">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-6 text-sm text-white/55">
                If you have these or other skills and would like to offer a gift, email us at{" "}
                <a href="mailto:admin@karisfellowships.com" className="text-teal-light underline decoration-teal-light/40 underline-offset-2 transition-colors hover:text-white">admin@karisfellowships.com</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
