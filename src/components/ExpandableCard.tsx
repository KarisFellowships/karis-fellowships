"use client";

import { useState } from "react";

interface ExpandableCardProps {
  title: string;
  color: string;
  desc: string;
  expanded: string[];
}

export default function ExpandableCard({ title, color, desc, expanded }: ExpandableCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="group rounded-xl border border-border/50 bg-white p-8 transition-all duration-500 hover:shadow-lg hover:shadow-black/5">
      <div className={`mb-6 h-0.5 w-8 rounded-full ${color} transition-all duration-500 group-hover:w-14`} />
      <h3 className="font-serif text-2xl font-semibold text-foreground">{title}</h3>
      <p className="mt-4 text-sm leading-[1.8] text-slate">{desc}</p>

      {expanded.length > 0 && (
        <>
          <div
            className={`grid transition-all duration-500 ease-in-out ${
              open ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="space-y-4">
                {expanded.map((para, i) => (
                  <p key={i} className="text-sm leading-[1.8] text-slate">{para}</p>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="mt-6 group/btn inline-flex items-center gap-2 font-serif text-sm italic text-teal transition-all duration-300 hover:gap-3 hover:text-teal-dark"
          >
            <span className={`inline-block h-px w-4 bg-teal/50 transition-all duration-300 group-hover/btn:w-6 group-hover/btn:bg-teal-dark/50`} />
            {open ? "Less" : "Continue reading"}
            <svg
              className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
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
        </>
      )}
    </div>
  );
}
