import PageHeader from "@/components/PageHeader";

export default function NHGSchedulesPage() {
  return (
    <div className="bg-slate-dark">
      <PageHeader title="Schedules & Reading Guides" subtitle="Study schedules, chapter guides, and study plan options for the NHG book study." accent="amber" />
      <section className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-6">
            <p className="text-white/50">
              We offer the Weekly Study and Weekend Intensive Study formats,
              both 8 weeks in length, once a year beginning in January and
              ending in March.
            </p>
          </div>
          <div className="mt-8 space-y-4">
            <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-6">
              <h3 className="font-bold text-white">Reading Guides</h3>
              <p className="mt-2 text-sm text-white/40">Your NHG reading guide documents will be available here once uploaded.</p>
            </div>
            <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-6">
              <h3 className="font-bold text-white">Study Schedule</h3>
              <p className="mt-2 text-sm text-white/40">Current year schedule and dates will appear here.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
