"use client";

import { useState, useEffect } from "react";

export default function StudyDonationBanner({
  studyName,
  type,
  hasDonated,
  userId,
  userEmail,
}: {
  studyName: string;
  type: "hpkp" | "romans";
  hasDonated: boolean;
  userId: string;
  userEmail: string;
}) {
  const [dismissed, setDismissed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const key = `donation_dismissed_${type}`;
      if (sessionStorage.getItem(key) === "true") {
        setDismissed(true);
      }
    }
  }, [type]);

  if (hasDonated || dismissed) return null;

  function handleDismiss() {
    sessionStorage.setItem(`donation_dismissed_${type}`, "true");
    setDismissed(true);
  }

  async function handleDonate() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, amount: 3000, userId, userEmail }),
      });
      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch {
      setLoading(false);
    }
  }

  return (
    <div className="mb-8 rounded-2xl bg-gradient-to-r from-amber/10 to-coral/10 ring-1 ring-amber/20 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold text-white">
            Support Karis Fellowships
          </p>
          <p className="mt-1 text-sm text-white/50">
            A $30 donation for the {studyName} study helps keep our programs running.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleDonate}
            disabled={loading}
            className="rounded-lg bg-coral px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-coral/80 hover:-translate-y-0.5 disabled:opacity-50"
          >
            {loading ? "Redirecting…" : "Donate $30"}
          </button>
          <button
            onClick={handleDismiss}
            className="text-xs text-white/30 hover:text-white/50 transition-colors"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
