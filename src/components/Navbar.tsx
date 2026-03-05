"use client";

import Link from "next/link";
import { useState } from "react";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/register", label: "Register" },
  { href: "/contact", label: "Contact" },
];

const memberLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/nhg", label: "NHG" },
  { href: "/kf", label: "KF Weekly" },
  { href: "/toolbox", label: "Toolbox" },
  { href: "/other-studies", label: "Other Studies" },
  { href: "/calendar", label: "Calendar" },
];

export default function Navbar({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = isLoggedIn ? memberLinks : publicLinks;

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/[0.06] bg-slate-dark/90 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-5">
        <Link
          href={isLoggedIn ? "/dashboard" : "/"}
          className="font-serif text-xl font-semibold tracking-wide text-white transition-opacity hover:opacity-70"
        >
          Karis Fellowships
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="px-4 py-2 text-[13px] tracking-wide text-white/50 transition-colors hover:text-white"
              >
                {label}
              </Link>
            </li>
          ))}
          <li className="ml-4">
            {isLoggedIn ? (
              <Link href="/login" className="rounded-xl border border-white/10 px-5 py-2 text-[13px] tracking-wide text-white/50 transition-all hover:border-white/25 hover:text-white">
                Log Out
              </Link>
            ) : (
              <Link href="/login" className="rounded-xl border border-teal/40 bg-teal/10 px-6 py-2 text-[13px] font-medium tracking-wide text-teal-light transition-all hover:bg-teal/20 hover:border-teal/60">
                Login
              </Link>
            )}
          </li>
        </ul>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl transition-colors hover:bg-white/5 md:hidden"
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-1.5">
            <span className={`block h-px w-5 bg-white/70 transition-all duration-300 ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`block h-px w-5 bg-white/70 transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block h-px w-5 bg-white/70 transition-all duration-300 ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </div>
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/[0.06] bg-slate-dark/95 px-8 py-4 backdrop-blur-2xl md:hidden">
          <ul className="flex flex-col gap-1">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} onClick={() => setMobileOpen(false)} className="block rounded-xl px-4 py-3 text-sm tracking-wide text-white/50 transition-colors hover:bg-white/5 hover:text-white">
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
