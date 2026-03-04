import PageHeader from "@/components/PageHeader";

export default function NHGFacilitatorPage() {
  return (
    <>
      <PageHeader title="NHG Facilitator Information" subtitle="Resources and guidelines for NHG discussion facilitators." accent="plum" />
      <section className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-xl bg-plum-light/50 p-6">
            <p className="text-foreground/70">
              Thank you for considering facilitating! Facilitator guides and materials will be available here.
            </p>
          </div>
          <p className="mt-6 text-sm text-foreground/50 italic">
            Facilitator documents will be populated from your NHG materials.
          </p>
        </div>
      </section>
    </>
  );
}
