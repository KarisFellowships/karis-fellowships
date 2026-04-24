import PageHeader from "@/components/PageHeader";

export default function NHGFacilitatorPage() {
  return (
    <div className="min-h-screen bg-[#4a5568]">
      <PageHeader title="NHG Facilitator Information" subtitle="Resources and guidelines for NHG discussion facilitators." accent="violet" image="/nature-mountain.jpg" imageAlt="Mountain landscape" />
      <section className="px-6 py-10 sm:py-12">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-xl bg-[#1e293b] p-6">
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
