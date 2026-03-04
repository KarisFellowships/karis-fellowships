import PageHeader from "@/components/PageHeader";
import ContentCard from "@/components/ContentCard";

export default function OtherStudiesPage() {
  return (
    <>
      <PageHeader
        title="Other Studies"
        subtitle="Additional studies and resources beyond the weekly KF meetings."
        accent="plum"
      />
      <section className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-4 sm:grid-cols-2">
            <ContentCard
              title="Romans Bible Study"
              description="A study through the book of Romans, typically offered October through December."
              href="/other-studies"
              accent="sage"
            />
            <ContentCard
              title="Honor, Patronage, Kinship & Purity"
              description="The HPKP book study exploring cultural context of the Bible, typically offered April through May."
              href="/other-studies"
              accent="gold"
            />
            <ContentCard
              title="Mindfulness Month"
              description="Mindfulness resources and training materials."
              href="/other-studies"
              accent="sky"
            />
          </div>

          <p className="mt-8 text-sm text-foreground/50 italic">
            Individual study pages and materials will be built out as content is provided.
          </p>
        </div>
      </section>
    </>
  );
}
