"use client";

import { useState } from "react";
import { cardClass, iconClass, labelClass, hintClass } from "@/lib/lesson-card-styles";

interface Meeting {
  day: string;
  time: string;
  code: string;
}

// The 5 resource cards (passed as children) + a Call Info card sit in one row.
// Call Info is the LAST card, and its panel opens directly below the row — so on
// desktop it sits under the row, and on mobile (single column) it falls right
// under the Call Info button instead of below every other card.
export default function CallInfoRow({
  children,
  phone,
  meetings,
}: {
  children: React.ReactNode;
  phone: string;
  meetings: Meeting[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {children}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={cardClass}
        >
          <svg className={`${iconClass} text-teal/70`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
          <span className={labelClass}>Call Info</span>
          <span className={`${hintClass} flex items-center justify-center gap-1`}>
            Details
            <svg className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
          </span>
        </button>
      </div>

      {open && (
        <div className="animate-fade-up rounded-2xl border border-white/25 bg-white/[0.14] p-6 backdrop-blur-sm">
          <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/35">Phone</p>
              <p className="mt-0.5 text-lg font-bold text-teal-light">{phone}</p>
            </div>
            {meetings.map(({ day, time, code }) => (
              <div key={day}>
                <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/35">
                  {day}{time ? ` · ${time}` : ""}
                </p>
                <p className="mt-0.5 font-mono text-base font-bold text-teal-light/80">{code}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
