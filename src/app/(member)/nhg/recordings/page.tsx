import PageHeader from "@/components/PageHeader";

export default function NHGRecordingsPage() {
  return (
    <>
      <PageHeader title="NHG Recordings" subtitle="Recordings from past NHG sessions for review and catch-up." accent="sky" />
      <section className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-xl bg-sky-light/50 p-6">
            <p className="text-slate">
              Listen to past NHG conference call recordings. Links to recordings from StartMeeting will appear here.
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
