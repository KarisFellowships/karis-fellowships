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
    <nav className="fixed left-0 right-0 top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border/50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link
          href={isLoggedIn ? "/dashboard" : "/"}
          className="flex items-center gap-2.5 font-bold tracking-tight text-foreground transition-colors hover:text-teal"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal to-teal-hover text-sm font-bold text-white shadow-sm">
            K
          </span>
          <span className="text-lg">Karis</span>
        </Link>

        <ul className="hidden items-center gap-0.5 md:flex">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="rounded-lg px-3.5 py-2 text-[13px] font-medium text-slate transition-all hover:bg-teal-muted hover:text-teal"
              >
                {label}
              </Link>
            </li>
          ))}
          <li className="ml-3">
            {isLoggedIn ? (
              <Link href="/login" className="rounded-lg bg-slate-light px-4 py-2 text-[13px] font-medium text-slate transition-colors hover:bg-coral-light hover:text-coral">
                Log Out
              </Link>
            ) : (
              <Link href="/login" className="rounded-lg bg-teal px-5 py-2 text-[13px] font-bold text-white shadow-sm transition-all hover:bg-teal-hover hover:-translate-y-px">
                Login
              </Link>
            )}
          </li>
        </ul>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-slate-light md:hidden"
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-1.5">
            <span className={`block h-0.5 w-5 rounded-full bg-foreground transition-all duration-200 ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 rounded-full bg-foreground transition-all duration-200 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 rounded-full bg-foreground transition-all duration-200 ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border/50 bg-white px-6 py-3 md:hidden">
          <ul className="flex flex-col gap-0.5">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} onClick={() => setMobileOpen(false)} className="block rounded-lg px-4 py-3 text-sm font-medium text-slate transition-colors hover:bg-teal-muted hover:text-teal">
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
