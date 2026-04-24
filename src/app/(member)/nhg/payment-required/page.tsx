"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-browser";

export default function NHGPaymentRequiredPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handlePayment() {
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setError("You must be logged in.");
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
          userId: user.id,
          userEmail: user.email,
        }),
      });
      const { url, error: checkoutError } = await res.json();
      if (checkoutError || !url) {
        setError("Unable to start payment. Please try again.");
        setLoading(false);
        return;
      }
      window.location.href = url;
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#4a5568] pt-20">
      <section className="flex items-center justify-center px-6 py-20">
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-coral/15">
            <svg className="h-8 w-8 text-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="mt-6 text-2xl font-bold text-white">Complete Your Registration</h1>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            A one-time donation of $30 is required to access the NHG Book Study materials. Your gift helps keep Karis Fellowships running.
          </p>

          {error && (
            <p className="mt-4 rounded-lg bg-coral/15 px-4 py-3 text-sm text-coral">{error}</p>
          )}

          <button
            onClick={handlePayment}
            disabled={loading}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-coral px-8 py-4 text-sm font-bold text-white transition-all hover:bg-coral/80 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Redirecting to payment…" : "Complete $30 Donation"}
          </button>

          <p className="mt-4 text-xs text-white/30">
            Secure payment processed by Stripe.
          </p>
        </div>
      </section>
    </div>
  );
}
