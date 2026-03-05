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
            <p className="mt-4 text-sm leading-relaxed text-teal-light/70">
              Empowering Christians to fulfill their true glory.
            </p>
          </div>
          <div>
            <h4 className="text-[11px] font-medium uppercase tracking-[0.25em] text-white/20">Navigate</h4>
            <ul className="mt-5 flex flex-col gap-3">
              {[
                { href: "/about", label: "About" },
                { href: "/register", label: "Register for NHG" },
                { href: "/contact", label: "Contact" },
                { href: "/login", label: "Member Login" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-white/30 transition-colors hover:text-white/60">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] font-medium uppercase tracking-[0.25em] text-white/20">Connect</h4>
            <p className="mt-5 text-sm text-white/30">
              <a href="mailto:admin@karisfellowships.com" className="text-white/40 underline underline-offset-4 decoration-white/10 transition-colors hover:text-teal-light hover:decoration-teal-light/30">
                admin@karisfellowships.com
              </a>
            </p>
          </div>
        </div>
        <div className="mt-16 border-t border-white/[0.06] pt-8 text-center text-[11px] tracking-wide text-white/15">
          &copy; {year} Karis Fellowships International &middot; karisfellowships.com
        </div>
      </div>
    </footer>
  );
}
