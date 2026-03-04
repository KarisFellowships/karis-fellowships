import PageHeader from "@/components/PageHeader";
import Link from "next/link";

const categoryInfo: Record<string, { title: string; accent: "teal" | "coral" | "sky" | "violet" | "amber" }> = {
  worksheets: { title: "Worksheets", accent: "teal" },
  "healing-integration": { title: "Healing / Integration", accent: "coral" },
  "prayers-bible-readings": { title: "Prayers & Bible Readings", accent: "amber" },
  meditation: { title: "Meditation", accent: "sky" },
  "neurotic-types": { title: "Neurotic Types", accent: "violet" },
  "mini-meetings": { title: "Mini-Meetings", accent: "teal" },
  "core-meetings": { title: "CORE Meetings", accent: "coral" },
  "additional-recordings": { title: "Additional Recordings", accent: "amber" },
};

interface Props {
  params: Promise<{ category: string }>;
}

export default async function ToolboxCategoryPage({ params }: Props) {
  const { category } = await params;
  const info = categoryInfo[category] || { title: category, accent: "teal" as const };

  return (
    <>
      <PageHeader title={info.title} subtitle={`KF Toolbox — ${info.title}`} accent={info.accent} />
      <section className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-xl bg-slate-light/50 p-6">
            <p className="text-slate">
              Documents and resources for {info.title.toLowerCase()} will appear here
              once your toolbox materials are uploaded.
            </p>
          </div>
          <div className="mt-6">
            <Link href="/toolbox" className="text-sm font-medium text-teal hover:text-teal-hover transition-colors">
              &larr; Back to Toolbox
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
