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

const CURRENT_YEAR = new Date().getFullYear();
// NHG-completion year options: current year back to 2010.
const NHG_YEARS = Array.from({ length: CURRENT_YEAR - 2010 + 1 }, (_, i) => CURRENT_YEAR - i);

const fieldClass =
  "mt-2 w-full rounded-xl border border-white/15 bg-white/[0.07] px-4 py-3 text-sm text-white outline-none transition-all focus:border-teal focus:ring-2 focus:ring-teal/20 placeholder:text-white/30";
const labelClass =
  "block text-xs font-semibold uppercase tracking-[0.15em] text-white/70";

export default function KFRegisterClient({
  userName,
  userEmail,
  isReturning,
}: KFRegisterClientProps) {
  const [name, setName] = useState(userName);
  const [nhgYear, setNhgYear] = useState("");
  const [volunteerInterests, setVolunteerInterests] = useState<string[]>([]);
  const [volunteerNote, setVolunteerNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
          // year-only: store as Jan 1 of that year in the date column
          ...(nhgYear ? { nhg_completed_date: `${nhgYear}-01-01` } : {}),
          ...(volunteerInterests.length > 0
            ? { volunteer_interest: volunteerInterests.join(", ") }
            : {}),
          ...(volunteerNote.trim() ? { volunteer_note: volunteerNote.trim() } : {}),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Registration failed. Please try again.");
        setLoading(false);
        return;
      }

      // Registration complete → go straight to the KF dashboard. Keep the button
      // in its loading state while the browser navigates.
      window.location.href = "/kf";
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-white/10 bg-white/[0.05] p-8 shadow-2xl shadow-black/20 sm:p-10">
      <h2 className="font-serif text-2xl font-semibold text-white">
        {isReturning ? "Re-Register for Karis Fellowships" : "Register for Karis Fellowships"}
      </h2>
      <p className="mt-2 text-sm text-white/60">
        {isReturning
          ? "Confirm your participation for the upcoming year."
          : "Complete your registration to begin the KF training program."}
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label className={labelClass}>
            Name <span className="text-coral">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={fieldClass}
            placeholder="Your name"
          />
        </div>

        <div>
          <label className={labelClass}>Email</label>
          <p className="mt-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/60">
            {userEmail}
          </p>
        </div>

        {!isReturning && (
          <div>
            <label className={labelClass}>When did you complete NHG?</label>
            <select
              value={nhgYear}
              onChange={(e) => setNhgYear(e.target.value)}
              className={`${fieldClass} appearance-none`}
            >
              <option value="" className="bg-slate-800">Select a year</option>
              {NHG_YEARS.map((y) => (
                <option key={y} value={y} className="bg-slate-800">
                  {y}
                </option>
              ))}
            </select>
          </div>
        )}

        {isReturning && (
          <div>
            <label className={labelClass}>Volunteering</label>
            <p className="mt-1.5 text-sm text-white/60">
              Select any area you are interested in helping with.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {VOLUNTEER_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => toggleVolunteer(option)}
                  className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition-all ${
                    volunteerInterests.includes(option)
                      ? "border-teal bg-teal/20 text-white"
                      : "border-white/15 text-white/65 hover:border-teal/40 hover:text-white/90"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <textarea
              value={volunteerNote}
              onChange={(e) => setVolunteerNote(e.target.value)}
              rows={3}
              className={`${fieldClass} mt-3 resize-none`}
              placeholder="Anything you'd like to add? (optional)"
            />
          </div>
        )}

        {error && (
          <p className="rounded-lg bg-coral/10 px-4 py-3 text-sm text-coral">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-teal px-6 py-3.5 text-[13px] font-medium uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-teal-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Submitting..." : isReturning ? "Confirm Registration" : "Register for KF"}
        </button>
      </form>
    </div>
  );
}
