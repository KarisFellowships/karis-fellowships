"use client";

import { useState } from "react";

const meetings = [
  { day: "Sunday", time: "8:00 am CST", code: "548-008-425#" },
  { day: "Monday", time: "10:00 am CST", code: "591-492-083#" },
  { day: "Tuesday", time: "7:30 pm CST", code: "209-466-826#" },
];

export default function CallInfoToggle() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 rounded-lg bg-[#1e293b] px-4 py-2.5 text-sm font-medium text-white/70 transition-all hover:bg-[#243044] hover:text-white"
      >
        <svg className="h-4 w-4 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        Call Info
        <svg className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="mt-2 rounded-xl bg-[#1e293b] p-5 animate-fade-up">
          <p className="text-xs uppercase tracking-wide text-white/35">Phone</p>
          <p className="mt-0.5 text-lg font-bold text-teal-light">(701) 801-1220</p>
          <div className="mt-3 border-t border-white/10 pt-3 space-y-2">
            {meetings.map(({ day, time, code }) => (
              <div key={day} className="flex items-center justify-between">
                <span className="text-sm text-white/60">{day} &middot; {time}</span>
                <span className="font-mono text-sm font-bold text-teal-light/80">{code}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
