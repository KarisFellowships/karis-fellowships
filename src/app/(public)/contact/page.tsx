import PageHeader from "@/components/PageHeader";

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="Still have questions? Ask the person who invited you or email us at admin@karisfellowships.com."
        accent="sky"
      />

      <section className="px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border border-border/60 bg-white p-8 shadow-sm">
            <div className="mb-8 rounded-xl bg-sky-light/50 p-5">
              <p className="text-sm text-slate">
                You can reach us directly at{" "}
                <a
                  href="mailto:admin@karisfellowships.com"
                  className="font-bold text-teal underline underline-offset-2 hover:text-teal-hover"
                >
                  admin@karisfellowships.com
                </a>
              </p>
            </div>

            <h2 className="text-xl font-bold text-foreground">Send Us a Message</h2>
            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate">Name</label>
                <input type="text" className="mt-1 w-full rounded-lg border border-border bg-cream px-4 py-3 text-sm outline-none transition-colors focus:border-teal focus:ring-1 focus:ring-teal" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate">Email</label>
                <input type="email" className="mt-1 w-full rounded-lg border border-border bg-cream px-4 py-3 text-sm outline-none transition-colors focus:border-teal focus:ring-1 focus:ring-teal" placeholder="you@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate">Message</label>
                <textarea className="mt-1 w-full rounded-lg border border-border bg-cream px-4 py-3 text-sm outline-none transition-colors focus:border-teal focus:ring-1 focus:ring-teal" rows={5} placeholder="How can we help?" />
              </div>
              <button className="w-full rounded-full bg-teal px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-teal-hover hover:-translate-y-0.5">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
