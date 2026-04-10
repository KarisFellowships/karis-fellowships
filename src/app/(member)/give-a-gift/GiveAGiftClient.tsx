"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";

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
    <div className="bg-slate-dark">
      <PageHeader
        title="Give a Gift"
        subtitle="We appreciate your participation in the karis relationship by supporting Karis Fellowships!"
        accent="coral"
      />
      <section className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl space-y-10">
          {/* Success Banner */}
          {success && (
            <div className="rounded-2xl bg-teal/15 ring-1 ring-teal/30 p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal/20">
                <svg className="h-6 w-6 text-teal-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="mt-3 text-lg font-bold text-white">Thank you for your generous gift!</p>
              <p className="mt-1 text-sm text-white/50">Your donation has been received.</p>
            </div>
          )}

          {/* Contribute Financially */}
          <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-8">
            <h2 className="text-xl font-bold text-white">Contribute Financially</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Your financial gifts keep this website running, allow us to explore technology options, and pay for legal and accounting services. We do not pay ourselves salaries; we are volunteers.
            </p>

            {/* One-time / Monthly toggle */}
            <div className="mt-6 inline-flex rounded-lg bg-white/5 p-1">
              <button
                onClick={() => setMode("onetime")}
                className={`rounded-md px-5 py-2 text-sm font-medium transition-all ${
                  mode === "onetime"
                    ? "bg-coral text-white shadow-sm"
                    : "text-white/50 hover:text-white"
                }`}
              >
                One-Time
              </button>
              <button
                onClick={() => setMode("monthly")}
                className={`rounded-md px-5 py-2 text-sm font-medium transition-all ${
                  mode === "monthly"
                    ? "bg-coral text-white shadow-sm"
                    : "text-white/50 hover:text-white"
                }`}
              >
                Monthly
              </button>
            </div>

            {/* Preset amounts */}
            <div className="mt-5 grid grid-cols-4 gap-3">
              {PRESETS.map((cents) => (
                <button
                  key={cents}
                  onClick={() => { setSelected(cents); setCustom(""); }}
                  className={`rounded-xl py-3 text-sm font-bold transition-all ${
                    selected === cents
                      ? "bg-coral text-white ring-2 ring-coral/40"
                      : "bg-white/5 text-white/70 ring-1 ring-white/10 hover:bg-white/10"
                  }`}
                >
                  ${cents / 100}
                </button>
              ))}
            </div>

            {/* Custom amount */}
            <div className="mt-3">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-white/40">$</span>
                <input
                  type="number"
                  min="1"
                  step="0.01"
                  value={custom}
                  onChange={(e) => { setCustom(e.target.value); setSelected(null); }}
                  placeholder="Other amount"
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-8 pr-4 text-sm text-white outline-none transition-colors focus:border-coral/40 focus:ring-2 focus:ring-coral/20 placeholder:text-white/30"
                />
              </div>
            </div>

            {error && (
              <p className="mt-3 rounded-lg bg-coral/15 px-4 py-2 text-sm text-coral">{error}</p>
            )}

            <button
              onClick={handleDonate}
              disabled={loading || amountCents < 100}
              className="mt-5 w-full rounded-xl bg-coral px-6 py-4 text-sm font-bold text-white transition-all hover:bg-coral/80 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Redirecting to payment…"
                : `Donate $${(amountCents / 100).toFixed(2)}${mode === "monthly" ? " / month" : ""}`}
            </button>

            <p className="mt-3 text-center text-xs text-white/30">
              Secure payment processed by Stripe.
            </p>
          </div>

          {/* AmazonSmile */}
          <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-8">
            <h2 className="text-xl font-bold text-white">AmazonSmile</h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-white/60">
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  When shopping on Amazon, type in your address bar{" "}
                  <a href="https://smile.amazon.com/" target="_blank" rel="noopener noreferrer" className="text-amber underline hover:text-amber/80">https://smile.amazon.com</a>
                  {" "}(rather than just www.amazon.com).
                </li>
                <li>Select Karis Fellowships International (Las Vegas, NV) as the charity (only has to be done once).</li>
                <li>That&apos;s it. Shop as usual. Eligible products will have a small note next to them.</li>
              </ol>
              <p>
                Make any Amazon.com purchase through the{" "}
                <a href="https://smile.amazon.com/" target="_blank" rel="noopener noreferrer" className="text-amber underline hover:text-amber/80">AmazonSmile</a>
                {" "}website using your already existing Amazon.com account and a small donation (0.5% of the purchase price) will be sent to Karis Fellowships. They will remember your selection, and then every eligible purchase you make at{" "}
                <a href="https://smile.amazon.com/" target="_blank" rel="noopener noreferrer" className="text-amber underline hover:text-amber/80">AmazonSmile</a>
                {" "}will result in a donation.
              </p>
            </div>
          </div>

          {/* Facilitate an NHG Meeting */}
          <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-8">
            <h2 className="text-xl font-bold text-white">Facilitate an Upcoming NHG Meeting</h2>
            <div className="mt-4 text-sm leading-relaxed text-white/60">
              <p>
                Sign up to facilitate one or two upcoming NHG book study meetings here:{" "}
                <a href="https://calendly.com/karisfellowships" target="_blank" rel="noopener noreferrer" className="text-teal-light underline hover:text-teal">https://calendly.com/karisfellowships</a>.
                {" "}Just click the link and follow the simple instructions. You will even receive automatic email reminders 1 week, 1 day, and 1 hour before your meeting!
              </p>
            </div>
            <div className="mt-6">
              <a
                href="https://calendly.com/karisfellowships"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-teal/20 px-6 py-3 text-sm font-bold text-teal-light transition-all hover:bg-teal/30 hover:-translate-y-0.5"
              >
                Sign Up on Calendly
              </a>
            </div>
          </div>

          {/* Contribute Your Gifts */}
          <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-8">
            <h2 className="text-xl font-bold text-white">Contribute Your Gifts</h2>
            <div className="mt-4 text-sm leading-relaxed text-white/60">
              <p>You can support Karis Fellowships with your time, energy, and abilities in many ways. We are always on the lookout for:</p>
            </div>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {volunteerOpportunities.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-xl bg-white/5 ring-1 ring-white/10 p-3"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-violet/15">
                    <svg className="h-3.5 w-3.5 text-violet-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-sm text-white/70">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-white/50">
              If you have these or other skills and would like to offer a gift, email us at{" "}
              <a href="mailto:admin@karisfellowships.com" className="text-coral underline hover:text-coral/80">admin@karisfellowships.com</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
