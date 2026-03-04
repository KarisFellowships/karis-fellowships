import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-white/70">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sage text-xs font-bold text-white">
                K
              </span>
              <span className="text-lg font-bold text-white">Karis Fellowships</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/50">
              An invitation to a relationship based on mutual generosity.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/40">Links</h4>
            <ul className="mt-3 flex flex-col gap-2">
              {[
                { href: "/about", label: "About" },
                { href: "/register", label: "Register for NHG" },
                { href: "/contact", label: "Contact" },
                { href: "/login", label: "Member Login" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-white/50 transition-colors hover:text-gold-light">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/40">Connect</h4>
            <p className="mt-3 text-sm text-white/50">
              Questions? Reach out through our{" "}
              <Link href="/contact" className="text-gold-light underline underline-offset-2 hover:text-gold">
                contact page
              </Link>
              {" "}or email{" "}
              <a href="mailto:admin@karisfellowships.com" className="text-gold-light underline underline-offset-2 hover:text-gold">
                admin@karisfellowships.com
              </a>
            </p>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/30">
          &copy; {year} Nancy Diven &middot; karisfellowships.com
        </div>
      </div>
    </footer>
  );
}
