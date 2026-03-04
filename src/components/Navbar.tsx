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
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-slate-dark/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link
          href={isLoggedIn ? "/dashboard" : "/"}
          className="text-lg font-bold tracking-tight text-white transition-colors hover:text-teal-light"
        >
          Karis Fellowships
        </Link>

        <ul className="hidden items-center gap-0.5 md:flex">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="rounded-lg px-3.5 py-2 text-[13px] font-medium text-white/65 transition-all hover:bg-white/10 hover:text-white"
              >
                {label}
              </Link>
            </li>
          ))}
          <li className="ml-3">
            {isLoggedIn ? (
              <Link href="/login" className="rounded-lg bg-white/10 px-4 py-2 text-[13px] font-medium text-white/70 transition-colors hover:bg-coral/20 hover:text-coral-light">
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
          className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-white/10 md:hidden"
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-1.5">
            <span className={`block h-0.5 w-5 rounded-full bg-white transition-all duration-200 ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 rounded-full bg-white transition-all duration-200 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 rounded-full bg-white transition-all duration-200 ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-slate-dark px-6 py-3 md:hidden">
          <ul className="flex flex-col gap-0.5">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} onClick={() => setMobileOpen(false)} className="block rounded-lg px-4 py-3 text-sm font-medium text-white/65 transition-colors hover:bg-white/10 hover:text-white">
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
