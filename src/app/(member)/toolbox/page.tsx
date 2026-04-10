import PageHeader from "@/components/PageHeader";
import ContentCard from "@/components/ContentCard";
import Image from "next/image";

const categories = [
  { slug: "worksheets", title: "Worksheets", desc: "Practical worksheets for your training.", accent: "teal" as const },
  { slug: "healing-integration", title: "Healing / Integration", desc: "Tools for healing and integration work.", accent: "coral" as const },
  { slug: "mini-meetings", title: "Mini Meetings + CORE Meetings", desc: "Mini meeting guides for each lesson and CORE meeting resources.", accent: "amber" as const },
  { slug: "archived", title: "Archived", desc: "Mindfulness Month, Neurotic Types, and additional recordings.", accent: "violet" as const },
];

export default function ToolboxPage() {
  return (
    <div className="bg-slate-dark">
      <PageHeader
        title="KF Toolbox"
        subtitle="Worksheets, healing tools, prayers, meditations, and more to support your training."
        accent="amber"
      />
      <section className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="relative mb-10 overflow-hidden rounded-2xl shadow-lg">
            <div className="relative h-44">
              <Image src="/butterfly-transform.jpg" alt="Transformation" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-teal-deep/70 to-teal-deep/40" />
            </div>
            <div className="absolute bottom-5 left-6 right-6">
              <p className="text-lg font-bold text-white">Your toolkit for real transformation.</p>
              <p className="mt-1 text-sm text-white/60">Practical resources to support your daily training.</p>
            </div>
          </div>

          <div className="relative mb-8">
            <input
              type="text"
              placeholder="Search toolbox resources..."
              className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 pl-12 text-sm text-white outline-none transition-colors focus:border-teal focus:ring-2 focus:ring-teal/20 placeholder:text-white/30"
            />
            <svg className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {categories.map(({ slug, title, desc, accent }) => (
              <ContentCard key={slug} title={title} description={desc} href={`/toolbox/${slug}`} accent={accent} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
