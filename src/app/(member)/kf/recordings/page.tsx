import PageHeader from "@/components/PageHeader";

export default function KFRecordingsPage() {
  return (
    <>
      <PageHeader title="KF Recordings" subtitle="Listen to recordings from past KF weekly meetings." accent="sky" />
      <section className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-xl bg-sky-light/50 p-6">
            <p className="text-slate">
              Recordings from past KF meetings via StartMeeting will be linked here.
            </p>
          </div>
          <p className="mt-6 text-sm text-slate italic">
            Recordings will be linked here once StartMeeting URLs are provided.
          </p>
        </div>
      </section>
    </>
  );
}
