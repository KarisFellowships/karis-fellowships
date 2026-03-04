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
    <nav className="fixed left-0 right-0 top-0 z-50 bg-white/80 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <Link
          href={isLoggedIn ? "/dashboard" : "/"}
          className="flex items-center gap-2.5 font-bold tracking-tight text-foreground transition-colors hover:text-sage"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sage to-sage-hover text-sm font-bold text-white shadow-sm">
            K
          </span>
          <span className="text-lg">Karis</span>
        </Link>

        {/* Desktop */}
        <ul className="hidden items-center gap-0.5 md:flex">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="rounded-xl px-3.5 py-2 text-[13px] font-medium text-foreground/70 transition-all hover:bg-sage-muted/60 hover:text-sage"
              >
                {label}
              </Link>
            </li>
          ))}
          <li className="ml-2">
            {isLoggedIn ? (
              <Link
                href="/login"
                className="rounded-xl bg-cream-dark px-4 py-2 text-[13px] font-medium text-foreground/60 transition-colors hover:text-terracotta"
              >
                Log Out
              </Link>
            ) : (
              <Link
                href="/login"
                className="rounded-xl bg-sage px-5 py-2 text-[13px] font-bold text-white shadow-sm transition-all hover:bg-sage-hover hover:-translate-y-px"
              >
                Login
              </Link>
            )}
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-xl transition-colors hover:bg-cream-dark md:hidden"
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-1.5">
            <span className={`block h-0.5 w-5 rounded-full bg-foreground transition-all ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 rounded-full bg-foreground transition-all ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 rounded-full bg-foreground transition-all ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border/50 bg-white/95 px-6 py-4 backdrop-blur-xl md:hidden">
          <ul className="flex flex-col gap-0.5">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-foreground/75 transition-colors hover:bg-sage-muted/50 hover:text-sage"
                >
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
