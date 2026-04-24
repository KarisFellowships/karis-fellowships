import Image from "next/image";
import ContentCard from "@/components/ContentCard";

const categories = [
  { slug: "worksheets", title: "Worksheets", desc: "Practical worksheets for your training.", accent: "teal" as const },
  { slug: "healing-integration", title: "Healing / Integration", desc: "Tools for healing and integration work.", accent: "coral" as const },
  { slug: "mini-meetings", title: "Mini Meetings + CORE Meetings", desc: "Mini meeting guides for each lesson and CORE meeting resources.", accent: "amber" as const },
  { slug: "archived", title: "Archived", desc: "Mindfulness Month, Neurotic Types, and additional recordings.", accent: "violet" as const },
];

export default function ToolboxPage() {
  return (
    <div className="min-h-screen bg-[#4a5568] pt-20">
      <section className="relative z-10">
        <div className="absolute inset-0">
          <Image src="/butterfly-transform.jpg" alt="Transformation" fill className="object-cover brightness-110 saturate-[1.15]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-[#4a5568]" />
        </div>
        <div className="relative px-6 pb-8 pt-14 sm:pt-16 sm:pb-10">
          <div className="mx-auto max-w-6xl">
            <h1 className="font-serif text-3xl font-semibold text-white drop-shadow-lg sm:text-4xl">KF Toolbox</h1>
            <p className="mt-1.5 text-sm font-medium text-white/80 drop-shadow">Worksheets, healing tools, prayers, meditations, and more to support your training.</p>
          </div>
        </div>
      </section>
      <section className="px-6 pb-12 pt-4">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-3 sm:grid-cols-2">
            {categories.map(({ slug, title, desc, accent }) => (
              <ContentCard key={slug} title={title} description={desc} href={`/toolbox/${slug}`} accent={accent} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
