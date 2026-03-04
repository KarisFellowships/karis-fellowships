import Link from "next/link";

interface ContentCardProps {
  title: string;
  description: string;
  href: string;
  accent?: "teal" | "coral" | "sky" | "violet" | "amber";
  badge?: string;
}

const accentBar = {
  teal: "bg-teal",
  coral: "bg-coral",
  sky: "bg-sky",
  violet: "bg-violet",
  amber: "bg-amber",
};

const badgeStyles = {
  teal: "bg-teal-muted text-teal",
  coral: "bg-coral-light text-coral",
  sky: "bg-sky-light text-sky",
  violet: "bg-violet-light text-violet",
  amber: "bg-amber-light text-amber",
};

export default function ContentCard({ title, description, href, accent = "teal", badge }: ContentCardProps) {
  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-border/40 transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
    >
      <div className={`h-1 ${accentBar[accent]}`} />
      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-bold text-foreground transition-colors group-hover:text-teal">{title}</h3>
          {badge && (
            <span className={`shrink-0 rounded-full px-3 py-0.5 text-xs font-bold ${badgeStyles[accent]}`}>{badge}</span>
          )}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-slate">{description}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-1">
          Open &rarr;
        </span>
      </div>
    </Link>
  );
}
