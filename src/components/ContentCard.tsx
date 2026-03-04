import Link from "next/link";

interface ContentCardProps {
  title: string;
  description: string;
  href: string;
  accent?: "sage" | "gold" | "terracotta" | "sky" | "plum";
  badge?: string;
}

const accentBar = {
  sage: "bg-sage",
  gold: "bg-gold",
  terracotta: "bg-terracotta",
  sky: "bg-sky",
  plum: "bg-plum",
};

const badgeStyles = {
  sage: "bg-sage-muted text-sage",
  gold: "bg-gold-light text-gold-hover",
  terracotta: "bg-terracotta-light text-terracotta",
  sky: "bg-sky-light text-sky",
  plum: "bg-plum-light text-plum",
};

export default function ContentCard({ title, description, href, accent = "sage", badge }: ContentCardProps) {
  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-border/40 transition-all hover:shadow-lg hover:-translate-y-1"
    >
      <div className={`h-1 ${accentBar[accent]}`} />
      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-bold text-foreground transition-colors group-hover:text-sage">{title}</h3>
          {badge && (
            <span className={`shrink-0 rounded-full px-3 py-0.5 text-xs font-bold ${badgeStyles[accent]}`}>
              {badge}
            </span>
          )}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-foreground/60">{description}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-sage opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1">
          Open &rarr;
        </span>
      </div>
    </Link>
  );
}
