import Image from "next/image";
import ContentCard from "@/components/ContentCard";

const categories = [
  {
    slug: "worksheets",
    title: "Worksheets",
    desc: "Practical worksheets for your training.",
    accent: "teal" as const,
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
  },
  {
    slug: "healing-integration",
    title: "Healing / Integration",
    desc: "Tools for healing and integration work.",
    accent: "coral" as const,
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  },
  {
    slug: "mini-meetings",
    title: "Mini Meetings + CORE Meetings",
    desc: "Mini meeting guides for each lesson and CORE meeting resources.",
    accent: "amber" as const,
    icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
  },
  {
    slug: "archived",
    title: "Archived",
    desc: "Mindfulness Month, Neurotic Types, and additional recordings.",
    accent: "violet" as const,
    icon: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4",
  },
];

export default function ToolboxPage() {
  return (
    <div className="relative min-h-screen bg-[#4a5568]">
      {/* Header image pulled up behind the nav and faded into the page behind the cards */}
      <div className="absolute inset-x-0 top-0 h-[38rem]">
        <Image src="/butterfly-transform.jpg" alt="Transformation" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-[#4a5568] sm:from-black/45 sm:via-black/25" />
      </div>

      <div className="relative z-10">
        <section className="px-6 pt-32 sm:pt-44">
          <div className="mx-auto max-w-7xl">
            <h1 className="font-serif text-3xl font-semibold text-white drop-shadow-lg sm:text-4xl">KF Toolbox</h1>
            <p className="mt-2 max-w-2xl text-sm font-medium text-white/85 drop-shadow sm:text-base">
              Worksheets, healing tools, prayers, meditations, and more to support your training.
            </p>
          </div>
        </section>

        <section className="px-6 pb-16 pt-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-4 sm:grid-cols-2">
              {categories.map(({ slug, title, desc, accent, icon }) => (
                <ContentCard key={slug} title={title} description={desc} href={`/toolbox/${slug}`} accent={accent} icon={icon} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
