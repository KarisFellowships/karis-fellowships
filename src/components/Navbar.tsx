"use client";

import Link from "next/link";
import { useState } from "react";

export type NavTier = "nhg" | "kf" | "admin" | null;

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/register", label: "Register" },
  { href: "/contact", label: "Contact" },
];

const nhgLinks = [
  { href: "/nhg", label: "NHG Book Study" },
];

const kfLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/nhg", label: "NHG" },
  { href: "/kf", label: "KF Weekly Meetings" },
  { href: "/toolbox", label: "Toolbox" },
  { href: "/other-studies", label: "Other Studies" },
  { href: "/give-a-gift", label: "Give a Gift" },
  { href: "/calendar", label: "Calendar" },
];

function getLinks(tier: NavTier) {
  if (!tier) return publicLinks;
  if (tier === "nhg") return nhgLinks;
  return kfLinks;
}

function getHomeHref(_tier: NavTier) {
  return "/";
}

export default function Navbar({ isLoggedIn = false, tier = null }: { isLoggedIn?: boolean; tier?: NavTier }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeTier = isLoggedIn ? tier : null;
  const links = getLinks(activeTier);
  const homeHref = getHomeHref(activeTier);
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
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="whitespace-nowrap px-3 py-2 text-[13px] font-normal tracking-wide text-white/70 transition-colors hover:text-white"
              >
                {label}
              </Link>
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
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} onClick={() => setMobileOpen(false)} className="block rounded-lg px-4 py-3 text-sm tracking-wide text-white/70 transition-colors hover:bg-white/5 hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
