import PageHeader from "@/components/PageHeader";

export default function NHGFacilitatorPage() {
  return (
    <div className="bg-slate-dark">
      <PageHeader title="NHG Facilitator Information" subtitle="Resources and guidelines for NHG discussion facilitators." accent="violet" />
      <section className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-6">
            <p className="text-white/50">
              Thank you for considering facilitating! Facilitator guides and materials will be available here.
            </p>
          </div>
          <p className="mt-6 text-sm text-white/30 italic">
            Facilitator documents will be populated from your NHG materials.
          </p>
        </div>
      </section>
    </div>
  );
}
