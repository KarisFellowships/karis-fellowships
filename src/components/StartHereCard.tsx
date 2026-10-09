"use client";

import Link from "next/link";
import { useEffect, useSyncExternalStore } from "react";

// "Start Here" card for NEW KF members, shown on the KF Dashboard for their
// first few weeks. There's no KF-join date in the database (users.created_at is
// the NHG sign-up date, often months earlier), so the clock starts the first
// time this browser opens the dashboard. Members can also hide it with ×.
// Copy is verbatim from /kf/start-here; the "Open" button label is new.
const SHOW_DAYS = 28;
const FIRST_SEEN_KEY = "kf-start-here-first-seen";
const DISMISSED_KEY = "kf-start-here-dismissed";

const listeners = new Set<() => void>();
function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

// Whether the card should show. A missing first-seen date means this is the
// first visit (the effect below records it), so it shows.
function getSnapshot() {
  try {
    if (localStorage.getItem(DISMISSED_KEY)) return false;
    const firstSeen = Number(localStorage.getItem(FIRST_SEEN_KEY));
    return !firstSeen || Date.now() - firstSeen < SHOW_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    // Storage blocked (private mode etc.) — Start Here is still in the menu.
    return false;
  }
}

export default function StartHereCard() {
  // Server render: hidden (no storage there); the client decides after hydration.
  const show = useSyncExternalStore(subscribe, getSnapshot, () => false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(FIRST_SEEN_KEY)) localStorage.setItem(FIRST_SEEN_KEY, String(Date.now()));
    } catch {}
  }, []);

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
