import PageHeader from "@/components/PageHeader";

export default function CalendarPage() {
  return (
    <>
      <PageHeader
        title="Calendar"
        subtitle="Upcoming dates, meetings, and events for Karis Fellowships."
        accent="gold"
      />
      <section className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-xl bg-gold-light/50 p-6">
            <p className="text-foreground/70">
              Please refer to the Calendar on the Karis Fellowships website to
              find the dates, times, and call-in numbers of this season&apos;s
              mega-meetings and other events.
            </p>
          </div>

          <div className="mt-8 space-y-3">
            {[
              { label: "KF Weekly Meetings", detail: "Sundays — check Call Info for times", color: "bg-sage" },
              { label: "NHG Book Study", detail: "January – March annually", color: "bg-terracotta" },
              { label: "Romans Bible Study", detail: "October – December", color: "bg-sky" },
              { label: "HPKP Study", detail: "April – May", color: "bg-plum" },
            ].map(({ label, detail, color }) => (
              <div key={label} className="flex items-center gap-4 rounded-xl border border-border/40 bg-white p-4">
                <span className={`h-3 w-3 rounded-full ${color}`} />
                <div>
                  <h3 className="text-sm font-bold text-foreground">{label}</h3>
                  <p className="text-xs text-foreground/50">{detail}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-sm text-foreground/50 italic">
            A full interactive calendar will be integrated once event data is connected.
          </p>
        </div>
      </section>
    </>
  );
}
