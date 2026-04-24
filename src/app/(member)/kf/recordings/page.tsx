import PageHeader from "@/components/PageHeader";

export default function KFRecordingsPage() {
  return (
    <div className="min-h-screen bg-[#4a5568]">
      <PageHeader title="KF Recordings" subtitle="Listen to recordings from past KF weekly meetings." accent="sky" image="/ocean-horizon.jpg" imageAlt="Calm ocean horizon" />
      <section className="px-6 py-10 sm:py-12">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-xl bg-[#1e293b] p-6">
            <p className="text-white/50">
              Recordings from past KF meetings via StartMeeting will be linked here.
            </p>
          </div>
          <p className="mt-6 text-sm text-white/30 italic">
            Recordings will be linked here once StartMeeting URLs are provided.
          </p>
        </div>
      </section>
    </div>
  );
}
