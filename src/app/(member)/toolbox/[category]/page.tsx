import PageHeader from "@/components/PageHeader";
import Link from "next/link";

const categoryInfo: Record<string, { title: string; accent: "sage" | "gold" | "terracotta" | "sky" | "plum" }> = {
  worksheets: { title: "Worksheets", accent: "sage" },
  "healing-integration": { title: "Healing / Integration", accent: "terracotta" },
  "prayers-bible-readings": { title: "Prayers & Bible Readings", accent: "gold" },
  meditation: { title: "Meditation", accent: "sky" },
  "neurotic-types": { title: "Neurotic Types", accent: "plum" },
  "mini-meetings": { title: "Mini-Meetings", accent: "sage" },
  "core-meetings": { title: "CORE Meetings", accent: "terracotta" },
  "additional-recordings": { title: "Additional Recordings", accent: "gold" },
};

interface Props {
  params: Promise<{ category: string }>;
}

export default async function ToolboxCategoryPage({ params }: Props) {
  const { category } = await params;
  const info = categoryInfo[category] || { title: category, accent: "sage" as const };

  return (
    <>
      <PageHeader title={info.title} subtitle={`KF Toolbox — ${info.title}`} accent={info.accent} />
      <section className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-xl bg-cream-dark/50 p-6">
            <p className="text-foreground/70">
              Documents and resources for {info.title.toLowerCase()} will appear here
              once your toolbox materials are uploaded.
            </p>
          </div>
          <div className="mt-6">
            <Link href="/toolbox" className="text-sm font-medium text-sage hover:text-sage-hover transition-colors">
              &larr; Back to Toolbox
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
