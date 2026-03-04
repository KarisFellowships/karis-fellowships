import PageHeader from "@/components/PageHeader";
import ContentCard from "@/components/ContentCard";
import Image from "next/image";

export default function OtherStudiesPage() {
  return (
    <>
      <PageHeader
        title="Other Studies"
        subtitle="Additional studies and resources beyond the weekly KF meetings."
        accent="violet"
      />
      <section className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          {/* Visual header */}
          <div className="relative mb-10 overflow-hidden rounded-2xl shadow-lg">
            <div className="relative h-40">
              <Image src="/starry-mountain.jpg" alt="Stars over mountains" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-dark/70 to-slate-dark/30" />
            </div>
            <div className="absolute bottom-5 left-6 right-6">
              <p className="text-lg font-bold text-white">Go deeper.</p>
              <p className="mt-1 text-sm text-white/70">Supplemental studies to enrich your journey.</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <ContentCard
              title="Romans Bible Study"
              description="A study through the book of Romans, typically offered October through December."
              href="/other-studies"
              accent="teal"
            />
            <ContentCard
              title="Honor, Patronage, Kinship & Purity"
              description="The HPKP book study exploring cultural context of the Bible, typically offered April through May."
              href="/other-studies"
              accent="amber"
            />
            <ContentCard
              title="Mindfulness Month"
              description="Mindfulness resources and training materials."
              href="/other-studies"
              accent="sky"
            />
          </div>

          <p className="mt-8 text-sm text-slate italic">
            Individual study pages and materials will be built out as content is provided.
          </p>
        </div>
      </section>
    </>
  );
}
