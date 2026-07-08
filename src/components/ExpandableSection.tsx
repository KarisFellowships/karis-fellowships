"use client";

import { useState, type ReactNode } from "react";

interface ExpandableSectionProps {
  children: ReactNode;
  label?: string;
  collapsedLabel?: string;
}

export default function ExpandableSection({
  children,
  label = "Less",
  collapsedLabel = "Continue reading",
}: ExpandableSectionProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className={`grid transition-all duration-500 ease-in-out ${
          open ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>

      <button
        onClick={() => setOpen(!open)}
        className="mt-4 group/btn inline-flex items-center gap-2 font-serif text-sm italic text-violet-light/70 transition-all duration-300 hover:gap-3 hover:text-violet-light"
      >
        <span className="inline-block h-px w-4 bg-violet-light/30 transition-all duration-300 group-hover/btn:w-6 group-hover/btn:bg-violet-light/50" />
        {open ? label : collapsedLabel}
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
  );
}
