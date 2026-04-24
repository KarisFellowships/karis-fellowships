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
  teal: "bg-teal/20 text-teal-light",
  coral: "bg-coral/20 text-coral-light",
  sky: "bg-sky/20 text-sky-light",
  violet: "bg-violet/20 text-violet-light",
  amber: "bg-amber/20 text-amber-light",
};

export default function ContentCard({ title, description, href, accent = "teal", badge }: ContentCardProps) {
  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-xl bg-[#1e293b] transition-all duration-200 hover:bg-[#243044] hover:-translate-y-1"
    >
      <div className={`h-1 ${accentBar[accent]}`} />
      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-bold text-white transition-colors group-hover:text-teal-light">{title}</h3>
          {badge && (
            <span className={`shrink-0 rounded-full px-3 py-0.5 text-xs font-bold ${badgeStyles[accent]}`}>{badge}</span>
          )}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-white/45">{description}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal-light opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-1">
          Open &rarr;
        </span>
      </div>
    </Link>
  );
}
