import PageHeader from "@/components/PageHeader";
import ContentCard from "@/components/ContentCard";

const categories = [
  { slug: "worksheets", title: "Worksheets", desc: "Practical worksheets for your training.", accent: "sage" as const },
  { slug: "healing-integration", title: "Healing / Integration", desc: "Tools for healing and integration work.", accent: "terracotta" as const },
  { slug: "prayers-bible-readings", title: "Prayers & Bible Readings", desc: "Curated prayers and scripture passages.", accent: "gold" as const },
  { slug: "meditation", title: "Meditation", desc: "Meditation guides and techniques.", accent: "sky" as const },
  { slug: "neurotic-types", title: "Neurotic Types", desc: "Understanding the neurotic types from NHG.", accent: "plum" as const },
  { slug: "mini-meetings", title: "Mini-Meetings", desc: "Resources for shorter meeting formats.", accent: "sage" as const },
  { slug: "core-meetings", title: "CORE Meetings", desc: "Materials for CORE meeting sessions.", accent: "terracotta" as const },
  { slug: "additional-recordings", title: "Additional Recordings", desc: "Extra recordings and audio resources.", accent: "gold" as const },
];

export default function ToolboxPage() {
  return (
    <>
      <PageHeader
        title="KF Toolbox"
        subtitle="Worksheets, healing tools, prayers, meditations, and more to support your training."
        accent="gold"
      />
      <section className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          {/* Search */}
          <div className="relative mb-8">
            <input
              type="text"
              placeholder="Search toolbox resources..."
              className="w-full rounded-xl border border-border bg-white px-5 py-4 pl-12 text-sm shadow-sm outline-none transition-colors focus:border-sage focus:ring-2 focus:ring-sage/20"
            />
            <svg className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {categories.map(({ slug, title, desc, accent }) => (
              <ContentCard
                key={slug}
                title={title}
                description={desc}
                href={`/toolbox/${slug}`}
                accent={accent}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
