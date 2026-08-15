"use client";

import { useState } from "react";
import { nhgCard } from "@/lib/nhg-surface";

interface WeekendDay {
  date: string; // e.g. "Friday, March 5, 2027"
  sessions: { label: string; time: string }[];
}

export default function WeekendIntensiveSchedule({
  accessCode,
  days,
}: {
  accessCode: string | null;
  days: WeekendDay[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`flex min-h-full flex-col justify-center overflow-hidden ${nhgCard}`}>
      <button
        onClick={() => setOpen(!open)}
        className="group flex w-full items-center gap-4 p-6 text-left transition-colors hover:bg-white/[0.06]"
      >
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-violet-light/15">
          <svg className="h-6 w-6 text-violet-light" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        </span>
        <div className="flex-1">
          <h3 className="font-serif text-lg text-white transition-colors group-hover:text-violet-light">Weekend Intensive Schedule</h3>
          <p className="mt-0.5 text-xs text-white/50">View intensive meeting dates</p>
        </div>
        <svg
          className={`h-4 w-4 shrink-0 text-white/40 transition-transform duration-500 ${open ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <div
        className={`grid transition-all duration-500 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-white/10 px-5 pb-5 pt-4">
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
              {accessCode && (
                <p className="text-sm text-white/70">
                  Access code{" "}
                  <span className="font-mono font-semibold text-teal-light">{accessCode}</span>
                </p>
              )}
              <p className="text-xs italic text-white/45">All times are in CST</p>
            </div>

            <div className="mt-4 space-y-4">
              {days.map((d) => (
                <div key={d.date}>
                  <p className="text-xs font-bold uppercase tracking-wider text-violet-light/70">{d.date}</p>
                  <div className="mt-1.5">
                    {d.sessions.map((s) => (
                      <div
                        key={s.label}
                        className="flex items-baseline justify-between gap-4 border-b border-white/[0.06] py-1.5 last:border-0"
                      >
                        <span className="text-sm text-white/85">{s.label}</span>
                        <span className="shrink-0 text-sm text-white/55">{s.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
