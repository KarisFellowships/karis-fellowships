import PageHeader from "@/components/PageHeader";

export default function KFFacilitatorPage() {
  return (
    <>
      <PageHeader title="KF Facilitator Information" subtitle="Resources and guidelines for KF meeting facilitators." accent="violet" />
      <section className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-xl bg-violet-light/50 p-6">
            <p className="text-slate">
              Thank you for considering facilitating! Facilitator guides and materials will be available here.
            </p>
          </div>
          <p className="mt-6 text-sm text-slate italic">
            Facilitator documents will be populated from your KF materials.
          </p>
        </div>
      </section>
    </>
  );
}
