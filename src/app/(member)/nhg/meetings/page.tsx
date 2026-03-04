import PageHeader from "@/components/PageHeader";

export default function NHGMeetingsPage() {
  return (
    <>
      <PageHeader title="Attend NHG Meetings" subtitle="Conference call information and meeting details." accent="teal" />
      <section className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-xl bg-teal-muted/50 p-6">
            <h2 className="font-bold text-foreground">Meeting Information</h2>
            <p className="mt-2 text-slate">
              All of our programs are online, so you can attend from anywhere in the world.
              Conference call details and instructions will be provided here.
            </p>
          </div>
          <p className="mt-6 text-sm text-slate italic">
            Meeting details and call-in information will be populated from your NHG materials.
          </p>
        </div>
      </section>
    </>
  );
}
