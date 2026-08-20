"use client";

import { useState, type ReactNode } from "react";

const accentChip: Record<string, string> = {
  teal: "bg-teal/15 text-teal-light",
  amber: "bg-amber/15 text-amber",
  sky: "bg-sky/15 text-sky",
  violet: "bg-violet/15 text-violet-light",
  coral: "bg-coral/15 text-coral-light",
};

interface ExpandableProps {
  title: string;
  /** Optional heroicon-style single-path SVG `d` string for the accent chip. */
  iconPath?: string;
  accent?: "teal" | "amber" | "sky" | "violet" | "coral";
  /** A smaller, quieter surface for nested "bubbles". */
  compact?: boolean;
  defaultOpen?: boolean;
  children: ReactNode;
}

// A frosted-glass bar that expands to reveal its content — the shared pattern
// behind the KF "Start Here" and "Call & Playback Info" sections (mirrors the
// NHG Start Here expandables). Used at two sizes: full bars and nested bubbles.
export default function Expandable({
  title,
  iconPath,
  accent = "teal",
  compact = false,
  defaultOpen = false,
  children,
}: ExpandableProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className={`overflow-hidden rounded-2xl border backdrop-blur-sm ${
        compact ? "border-white/10 bg-white/[0.04]" : "border-white/12 bg-white/[0.06]"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className={`group flex w-full items-center justify-between gap-3 text-left transition-colors hover:bg-white/[0.03] ${
          compact ? "px-5 py-4" : "px-6 py-5"
        }`}
      >
        <span className="flex items-center gap-3">
          {iconPath && (
            <span
              className={`flex shrink-0 items-center justify-center rounded-xl ${
                compact ? "h-8 w-8" : "h-9 w-9"
              } ${accentChip[accent]}`}
            >
              <svg className={compact ? "h-4 w-4" : "h-5 w-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={iconPath} />
              </svg>
            </span>
          )}
          <span className={`font-serif text-white ${compact ? "text-base" : "text-lg sm:text-xl"}`}>{title}</span>
        </span>
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
          <div className={compact ? "px-5 pb-5" : "px-6 pb-6"}>{children}</div>
        </div>
      </div>
    </div>
  );
}
