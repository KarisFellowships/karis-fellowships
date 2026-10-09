"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

// "Start Here" card for NEW KF members on the KF Dashboard. The page only
// renders it during a member's first 4 weeks in KF (users.kf_joined_at).
// Members can hide it sooner with ×, remembered per device.
// Copy is verbatim from /kf/start-here; the "Open" button label is new.
const DISMISSED_KEY = "kf-start-here-dismissed";

const listeners = new Set<() => void>();
function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSnapshot() {
  try {
    return !localStorage.getItem(DISMISSED_KEY);
  } catch {
    return true;
  }
}

export default function StartHereCard() {
  // Server render: hidden (no storage there); the client decides after hydration.
  const show = useSyncExternalStore(subscribe, getSnapshot, () => false);

  function dismiss() {
    try {
      localStorage.setItem(DISMISSED_KEY, "1");
    } catch {}
    listeners.forEach((cb) => cb());
  }

  if (!show) return null;

  return (
    <div className="relative flex flex-col gap-4 rounded-2xl border border-teal/40 bg-gradient-to-br from-teal/[0.22] via-teal/[0.12] to-teal/[0.05] p-6 pr-12 shadow-lg shadow-black/15 ring-1 ring-inset ring-white/10 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-teal-light">Start Here</p>
        <h2 className="mt-2 font-serif text-2xl font-semibold text-white">Welcome to Karis Fellowships!</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70">
          We are excited that you&rsquo;ve chosen to pursue your training and real potential after completing the
          book study. Here&rsquo;s a little guide to getting started in KF.
        </p>
      </div>
      <Link
        href="/kf/start-here"
        className="inline-flex shrink-0 items-center justify-center gap-1.5 self-start rounded-lg bg-teal px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-teal/30 transition-all hover:bg-teal-hover sm:self-center"
      >
        Open &rarr;
      </Link>
      <button
        onClick={dismiss}
        aria-label="Hide"
        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg text-white/50 transition-colors hover:bg-white/10 hover:text-white"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    </div>
  );
}
