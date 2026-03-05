import PageHeader from "@/components/PageHeader";

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="Still have questions? Ask the person who invited you or email us at admin@karisfellowships.com."
        accent="sky"
      />

      <section className="px-8 py-20 sm:py-28">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-3xl border border-border/40 bg-white p-10">
            <div className="mb-10 rounded-2xl bg-ivory/60 p-6">
              <p className="text-sm text-slate">
                You can reach us directly at{" "}
                <a
                  href="mailto:admin@karisfellowships.com"
                  className="font-medium text-teal underline underline-offset-4 decoration-teal/30 hover:text-teal-hover transition-colors"
                >
                  admin@karisfellowships.com
                </a>
              </p>
            </div>

            <h2 className="font-serif text-2xl font-semibold text-foreground">Send Us a Message</h2>
            <div className="mt-8 space-y-5">
              <div>
                <label className="block text-[11px] font-medium uppercase tracking-[0.2em] text-slate/60">Name</label>
                <input type="text" className="mt-2 w-full rounded-xl border border-border/50 bg-ivory/30 px-5 py-3.5 text-sm outline-none transition-all focus:border-teal/40 focus:ring-2 focus:ring-teal/10 placeholder:text-slate/30" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-[11px] font-medium uppercase tracking-[0.2em] text-slate/60">Email</label>
                <input type="email" className="mt-2 w-full rounded-xl border border-border/50 bg-ivory/30 px-5 py-3.5 text-sm outline-none transition-all focus:border-teal/40 focus:ring-2 focus:ring-teal/10 placeholder:text-slate/30" placeholder="you@email.com" />
              </div>
              <div>
                <label className="block text-[11px] font-medium uppercase tracking-[0.2em] text-slate/60">Message</label>
                <textarea className="mt-2 w-full rounded-xl border border-border/50 bg-ivory/30 px-5 py-3.5 text-sm outline-none transition-all focus:border-teal/40 focus:ring-2 focus:ring-teal/10 placeholder:text-slate/30" rows={5} placeholder="How can we help?" />
              </div>
              <button className="w-full rounded-xl bg-teal px-6 py-4 text-[13px] font-medium uppercase tracking-[0.15em] text-white transition-all duration-500 hover:bg-teal-hover">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
