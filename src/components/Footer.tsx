import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-dark text-white/40">
      <div className="mx-auto max-w-6xl px-8 py-20">
        <div className="grid gap-12 sm:grid-cols-3">
          <div>
            <span className="font-serif text-2xl font-semibold tracking-wide text-white">
              Karis Fellowships
            </span>
            <p className="mt-4 text-sm leading-relaxed text-teal-light">
              Empowering Christians to fulfill their true glory.
            </p>
          </div>
          <div>
            <h4 className="text-[11px] font-medium uppercase tracking-[0.25em] text-white/40">Navigate</h4>
            <ul className="mt-5 flex flex-col gap-3">
              {[
                { href: "/about", label: "About" },
                { href: "/register", label: "Register for NHG" },
                { href: "/contact", label: "Contact" },
                { href: "/login", label: "Member Login" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-white/50 transition-colors hover:text-white/80">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] font-medium uppercase tracking-[0.25em] text-white/40">Connect</h4>
            <p className="mt-5 text-sm text-white/50">
              <a href="mailto:admin@karisfellowships.com" className="text-white/60 underline underline-offset-4 decoration-white/20 transition-colors hover:text-teal-light hover:decoration-teal-light/40">
                admin@karisfellowships.com
              </a>
            </p>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <p className="text-[11px] tracking-wide text-white/30">
              &copy; {year} Karis Fellowships International &middot; karisfellowships.com
            </p>
            <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {[
                { href: "/privacy", label: "Privacy" },
                { href: "/terms", label: "Terms" },
                { href: "/refund", label: "Refund Policy" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-[11px] tracking-wide text-white/40 transition-colors hover:text-white/70">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
