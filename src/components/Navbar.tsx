"use client";

import Link from "next/link";
import { useState } from "react";

export type NavTier = "nhg" | "kf" | "admin" | null;

interface NavItem {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
}

const publicLinks: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/register", label: "Register" },
  { href: "/contact", label: "Contact" },
];

// NHG students see a single NHG tab (no dropdown).
const nhgLinks: NavItem[] = [
  { href: "/nhg", label: "NHG Book Study" },
];

// KF members / admin: each section can be reached directly (the top-level link)
// or via its dropdown of sub-sections, so there are several ways to navigate.
const kfLinks: NavItem[] = [
  {
    href: "/nhg",
    label: "NHG",
    children: [
      { href: "/nhg", label: "NHG Materials" },
      { href: "/nhg/facilitator", label: "NHG Facilitator Info" },
    ],
  },
  {
    href: "/kf",
    label: "KF Weekly Meetings",
    children: [
      { href: "/kf/start-here", label: "Start Here" },
      { href: "/kf/recordings", label: "Recordings" },
      { href: "/kf/call-info", label: "Call-In Info" },
    ],
  },
  {
    href: "/toolbox",
    label: "Toolbox",
    children: [
      { href: "/toolbox/worksheets", label: "Worksheets" },
      { href: "/toolbox/healing-integration", label: "Healing / Integration" },
      { href: "/toolbox/mini-meetings", label: "Mini Meetings + CORE Meetings" },
      { href: "/toolbox/archived", label: "Archived" },
    ],
  },
  {
    href: "/other-studies",
    label: "Other Studies",
    children: [
      { href: "/other-studies/romans", label: "Romans Bible Study" },
      { href: "/other-studies/hpkp", label: "Honor, Patronage, Kinship & Purity" },
      { href: "/other-studies/mindfulness", label: "Mindfulness Month" },
    ],
  },
  { href: "/give-a-gift", label: "Give a Gift" },
  { href: "/calendar", label: "Calendar" },
];

function getLinks(tier: NavTier): NavItem[] {
  if (!tier) return publicLinks;
  if (tier === "nhg") return nhgLinks;
  return kfLinks;
}

const chevron = (
  <svg className="h-3 w-3 opacity-50 transition-transform duration-200 group-hover:opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
);

export default function Navbar({ isLoggedIn = false, tier = null }: { isLoggedIn?: boolean; tier?: NavTier }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeTier = isLoggedIn ? tier : null;
  const links = getLinks(activeTier);
  const homeHref = "/";
  // The KF member nav has many items and needs more width before it fits on one
  // row, so it stays collapsed to the menu button until xl. Shorter navs (public,
  // NHG) fit easily and switch to the horizontal row at md.
  const wideNav = links.length >= 6;

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/[0.04] bg-slate-dark/50 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5">
        <Link
          href={homeHref}
          className="shrink-0 whitespace-nowrap font-serif text-xl font-semibold tracking-wide text-white/95 transition-opacity hover:opacity-70"
        >
          Karis Fellowships
        </Link>

        <ul className={`hidden items-center gap-0.5 ${wideNav ? "xl:flex" : "md:flex"}`}>
          {links.map((item) => (
            <li key={item.label} className="group relative">
              <Link
                href={item.href}
                className="flex items-center gap-1 whitespace-nowrap px-3 py-2 text-[13px] font-normal tracking-wide text-white/70 transition-colors hover:text-white"
              >
                {item.label}
                {item.children && chevron}
              </Link>
              {item.children && (
                // Bridge the gap with pt-2 (no dead margin) so moving the mouse
                // from the label into the menu keeps it open.
                <div className="invisible absolute left-0 top-full z-50 pt-2 opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="min-w-[13rem] rounded-xl border border-white/10 bg-slate-dark/95 p-1.5 shadow-xl shadow-black/40 backdrop-blur-xl">
                    {item.children.map((c) => (
                      <Link
                        key={`${c.href}-${c.label}`}
                        href={c.href}
                        className="block whitespace-nowrap rounded-lg px-3 py-2 text-[13px] tracking-wide text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
          <li className="ml-2 shrink-0">
            {isLoggedIn ? (
              <form action="/auth/logout" method="POST">
                <button type="submit" className="whitespace-nowrap rounded-lg border border-white/15 px-4 py-2 text-[13px] tracking-wide text-white/50 transition-all hover:border-white/30 hover:text-white">
                  Log Out
                </button>
              </form>
            ) : (
              <Link href="/login" className="whitespace-nowrap rounded-lg border border-teal/40 bg-teal/10 px-6 py-2 text-[13px] font-medium tracking-wide text-teal-light transition-all hover:bg-teal/20 hover:border-teal/60">
                Login
              </Link>
            )}
          </li>
        </ul>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-white/5 ${wideNav ? "xl:hidden" : "md:hidden"}`}
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-1.5">
            <span className={`block h-px w-5 bg-white/60 transition-all duration-300 ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`block h-px w-5 bg-white/60 transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block h-px w-5 bg-white/60 transition-all duration-300 ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </div>
        </button>
      </div>

      {mobileOpen && (
        <div className={`border-t border-white/[0.04] bg-slate-dark/80 px-6 py-4 backdrop-blur-xl ${wideNav ? "xl:hidden" : "md:hidden"}`}>
          <ul className="flex flex-col gap-1">
            {links.map((item) => (
              <li key={item.label}>
                <Link href={item.href} onClick={() => setMobileOpen(false)} className="block rounded-lg px-4 py-3 text-sm tracking-wide text-white/70 transition-colors hover:bg-white/5 hover:text-white">
                  {item.label}
                </Link>
                {item.children && (
                  <ul className="mb-1 ml-4 border-l border-white/10 pl-3">
                    {item.children.map((c) => (
                      <li key={`${c.href}-${c.label}`}>
                        <Link href={c.href} onClick={() => setMobileOpen(false)} className="block rounded-lg px-4 py-2 text-[13px] tracking-wide text-white/50 transition-colors hover:bg-white/5 hover:text-white">
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li className="mt-2 border-t border-white/10 pt-2">
              {isLoggedIn ? (
                <form action="/auth/logout" method="POST">
                  <button type="submit" className="block w-full rounded-lg px-4 py-3 text-left text-sm tracking-wide text-white/60 transition-colors hover:bg-white/5 hover:text-white">
                    Log Out
                  </button>
                </form>
              ) : (
                <Link href="/login" onClick={() => setMobileOpen(false)} className="block rounded-lg border border-teal/40 bg-teal/10 px-4 py-3 text-sm font-medium tracking-wide text-teal-light transition-colors hover:bg-teal/20 hover:border-teal/60">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
