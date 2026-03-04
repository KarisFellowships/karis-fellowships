import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-dark text-white/60">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal text-xs font-bold text-white">K</span>
              <span className="text-lg font-bold text-white">Karis Fellowships</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/40">
              An invitation to a relationship based on mutual generosity.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/30">Links</h4>
            <ul className="mt-3 flex flex-col gap-2">
              {[
                { href: "/about", label: "About" },
                { href: "/register", label: "Register for NHG" },
                { href: "/contact", label: "Contact" },
                { href: "/login", label: "Member Login" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-white/45 transition-colors hover:text-teal-light">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/30">Connect</h4>
            <p className="mt-3 text-sm text-white/45">
              Questions?{" "}
              <a href="mailto:admin@karisfellowships.com" className="text-teal-light underline underline-offset-2 hover:text-teal">
                admin@karisfellowships.com
              </a>
            </p>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/25">
          &copy; {year} Nancy Diven &middot; karisfellowships.com
        </div>
      </div>
    </footer>
  );
}
