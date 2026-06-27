"use client";

import { useState } from "react";

interface KFRegisterClientProps {
  userName: string;
  userEmail: string;
  isReturning: boolean;
}

const VOLUNTEER_OPTIONS = [
  "Admin Team",
  "Web and Technology",
  "Facilitating",
  "Gatherings",
  "Other",
];

export default function KFRegisterClient({
  userName,
  userEmail,
  isReturning,
}: KFRegisterClientProps) {
  const [name, setName] = useState(userName);
  const [nhgCompletedDate, setNhgCompletedDate] = useState("");
  const [volunteerInterests, setVolunteerInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function toggleVolunteer(option: string) {
    setVolunteerInterests((prev) =>
      prev.includes(option) ? prev.filter((v) => v !== option) : [...prev, option]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/kf-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(nhgCompletedDate ? { nhg_completed_date: nhgCompletedDate } : {}),
          ...(volunteerInterests.length > 0
            ? { volunteer_interest: volunteerInterests.join(", ") }
            : {}),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Registration failed. Please try again.");
        setLoading(false);
        return;
      }

      setSuccess(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="mx-auto max-w-xl text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal/15">
          <svg className="h-8 w-8 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="mt-6 font-serif text-2xl font-semibold text-white/95">
          Welcome to Karis Fellowships!
        </h2>
        <p className="mt-4 leading-relaxed text-white/60">
          Your registration is complete. You now have access to all KF materials and resources.
        </p>
        <a
          href="/kf"
          className="mt-8 inline-block rounded-xl bg-teal px-8 py-4 text-[13px] font-medium uppercase tracking-[0.15em] text-white transition-all hover:bg-teal-hover"
        >
          Go to KF Dashboard
        </a>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg">
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm sm:p-10">
        <h2 className="font-serif text-2xl font-semibold text-white/95">
          {isReturning ? "Re-Register for Karis Fellowships" : "Register for Karis Fellowships"}
        </h2>
        <p className="mt-2 text-sm text-white/50">
          {isReturning
            ? "Confirm your participation for the upcoming year."
            : "Complete your registration to begin the KF training program."}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="block text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
              Name <span className="text-coral">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.06] px-5 py-3 text-sm text-white outline-none transition-all focus:border-teal/40 focus:ring-2 focus:ring-teal/10 placeholder:text-white/20"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
              Email
            </label>
            <p className="mt-1.5 rounded-xl border border-white/5 bg-white/[0.03] px-5 py-3 text-sm text-white/50">
              {userEmail}
            </p>
          </div>

          {!isReturning && (
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                When did you complete NHG?
              </label>
              <input
                type="month"
                value={nhgCompletedDate}
                onChange={(e) => setNhgCompletedDate(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.06] px-5 py-3 text-sm text-white outline-none transition-all focus:border-teal/40 focus:ring-2 focus:ring-teal/10"
              />
            </div>
          )}

          {isReturning && (
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                Interested in volunteering?
              </label>
              <p className="mt-1 text-xs text-white/30">Select any areas you&apos;d like to help with.</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {VOLUNTEER_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggleVolunteer(option)}
                    className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition-all ${
                      volunteerInterests.includes(option)
                        ? "border-teal bg-teal/15 text-teal-light"
                        : "border-white/10 text-white/50 hover:border-teal/30 hover:text-white/70"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {error && (
            <p className="rounded-lg bg-coral/10 px-4 py-3 text-sm text-coral">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-teal px-6 py-3.5 text-[13px] font-medium uppercase tracking-[0.15em] text-white transition-all duration-500 hover:bg-teal-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Submitting..." : isReturning ? "Confirm Registration" : "Register for KF"}
          </button>
        </form>
      </div>
    </div>
  );
}
