import Link from "next/link";

interface ContentCardProps {
  title: string;
  description: string;
  href: string;
  accent?: "teal" | "coral" | "sky" | "violet" | "amber";
  badge?: string;
  /** Optional heroicon-style single-path SVG `d` string for the accent chip. */
  icon?: string;
}

// Frosted-glass "Pray As You Go" surface. Each card keeps a colored accent on its
// icon chip and hover border so pages stay visually distinct while reading calm.
const accentChip = {
  teal: "bg-teal/15 text-teal-light",
  coral: "bg-coral/15 text-coral-light",
  sky: "bg-sky/15 text-sky-light",
  violet: "bg-violet/15 text-violet-light",
  amber: "bg-amber/15 text-amber-light",
};

const accentBorderHover = {
  teal: "hover:border-teal/40",
  coral: "hover:border-coral/40",
  sky: "hover:border-sky/40",
  violet: "hover:border-violet/40",
  amber: "hover:border-amber/40",
};

const accentLink = {
  teal: "text-teal-light",
  coral: "text-coral-light",
  sky: "text-sky-light",
  violet: "text-violet-light",
  amber: "text-amber-light",
};

const badgeStyles = {
  teal: "bg-teal/20 text-teal-light",
  coral: "bg-coral/20 text-coral-light",
  sky: "bg-sky/20 text-sky-light",
  violet: "bg-violet/20 text-violet-light",
  amber: "bg-amber/20 text-amber-light",
};

// A calm document/clipboard glyph used when a card doesn't supply its own icon.
const defaultIcon =
  "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z";

export default function ContentCard({ title, description, href, accent = "teal", badge, icon }: ContentCardProps) {
  return (
    <Link
      href={href}
      className={`group flex flex-col rounded-2xl border border-white/12 bg-white/[0.06] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.10] ${accentBorderHover[accent]}`}
    >
      <div className="flex items-start justify-between gap-3">
        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${accentChip[accent]}`}>
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icon || defaultIcon} />
          </svg>
        </span>
        {badge && (
          <span className={`shrink-0 rounded-full px-3 py-0.5 text-xs font-bold ${badgeStyles[accent]}`}>{badge}</span>
        )}
      </div>
      <h3 className="mt-4 font-serif text-lg text-white sm:text-xl">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-white/55">{description}</p>
      <span
        className={`mt-4 inline-flex items-center gap-1 text-sm font-semibold ${accentLink[accent]} opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100`}
      >
        Open &rarr;
      </span>
    </Link>
  );
}
