"use client";

import { useEffect, useRef, useState } from "react";

// The NHG reading-guide "symbol" (the same book icon used across the weekly
// cards) that, when a Word version exists, opens a small chooser on hover / tap
// so the reader can pick PDF or Word. When only a PDF exists it stays a plain
// link, so nothing changes for guides without a typed doc yet.
//
// - variant "icon": the circular book icon + "Reading Guide" caption (weekly cards)
// - variant "pill": the larger "Open Reading Guide" call-to-action (featured card)

interface Props {
  pdf: string;
  doc?: string;
  variant?: "icon" | "pill";
  label?: string;
}

const fileIcon = (
  <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
);

function IconTrigger({ open }: { open: boolean }) {
  return (
    <span className="flex flex-col items-center gap-2 text-center">
      <span className={`flex h-12 w-12 items-center justify-center rounded-full bg-violet text-white shadow-lg shadow-violet/40 transition-transform duration-300 ${open ? "scale-105" : "group-hover:scale-105"}`}>
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
      </span>
      <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/60 transition-colors group-hover:text-white">Reading Guide</span>
    </span>
  );
}

function PillTrigger({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-lg bg-white/15 px-4 py-2.5 text-base font-semibold text-white backdrop-blur-sm transition-all group-hover:bg-white/25 sm:text-lg">
      {label} &rarr;
    </span>
  );
}

export default function ReadingGuideButton({ pdf, doc, variant = "icon", label = "Open Reading Guide" }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey); };
  }, [open]);

  // No typed Word version yet → behave exactly like the original single link.
  if (!doc) {
    if (variant === "pill") {
      return (
        <a href={pdf} target="_blank" rel="noopener noreferrer" className="group inline-flex" aria-label={label}>
          <PillTrigger label={label} />
        </a>
      );
    }
    return (
      <a href={pdf} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center" aria-label="Open Reading Guide">
        <IconTrigger open={false} />
      </a>
    );
  }

  const menu = (
    <div
      role="menu"
      className="absolute bottom-full left-1/2 z-30 mb-2 w-36 -translate-x-1/2 overflow-hidden rounded-xl border border-white/15 bg-slate-dark/95 p-1 shadow-xl shadow-black/40 backdrop-blur-md"
    >
      <a role="menuitem" href={pdf} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white">
        {fileIcon} PDF
      </a>
      <a role="menuitem" href={doc} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white">
        {fileIcon} Word
      </a>
    </div>
  );

  return (
    <div
      ref={ref}
      className="group relative flex flex-col items-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Reading Guide — choose PDF or Word"
        onClick={() => setOpen((o) => !o)}
        className="flex flex-col items-center outline-none"
      >
        {variant === "pill" ? <PillTrigger label={label} /> : <IconTrigger open={open} />}
      </button>
      {open && menu}
    </div>
  );
}
