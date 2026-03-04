import PageHeader from "@/components/PageHeader";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <>
      <PageHeader
        title="Register for NHG Book Study"
        subtitle="Your first step is to participate in the Neurosis and Human Growth (NHG) book study."
        accent="gold"
      />

      <section className="px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl">
          {/* How it works */}
          <div className="rounded-2xl bg-gradient-to-br from-gold-light/50 to-cream p-8">
            <h2 className="text-xl font-bold text-foreground">How to Get Started</h2>
            <p className="mt-4 leading-relaxed text-foreground/80">
              For a big picture look at the book study and how it fits into Karis
              Fellowships,{" "}
              <Link href="/about" className="font-medium text-sage underline underline-offset-2 hover:text-sage-hover">
                click here
              </Link>.
            </p>
          </div>

          {/* Curriculum */}
          <div className="mt-10">
            <h2 className="text-xl font-bold text-foreground">Curriculum</h2>
            <p className="mt-2 text-foreground/70">It&apos;s simple.</p>
            <ol className="mt-4 space-y-3">
              {[
                "You read the first 11 chapters of Karen Horney's Neurosis and Human Growth.",
                "You complete a study guide for each chapter as you go.",
                "You attend live conference calls to hear additional material, check your answers, and ask questions.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <p className="pt-1 text-foreground/80">{item}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Format */}
          <div className="mt-10">
            <h2 className="text-xl font-bold text-foreground">Format</h2>
            <p className="mt-2 text-foreground/70">We offer 3 options:</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {[
                {
                  title: "Flex Study",
                  color: "border-t-sage",
                  desc: "Begin any time and study at your own pace until the next round of live calls. You can then attend weekly calls or wait for the Weekend Intensive calls.",
                },
                {
                  title: "Weekend Intensive",
                  color: "border-t-terracotta",
                  desc: "An 8-week study with only email support until a single weekend of 6 two-hour conference calls at the end.",
                },
                {
                  title: "Weekly Study",
                  color: "border-t-gold",
                  desc: "An 8-week study with weekly 1.5-2 hour conference calls.",
                },
              ].map(({ title, color, desc }) => (
                <div key={title} className={`rounded-xl border border-border/60 border-t-4 ${color} bg-white p-5`}>
                  <h3 className="font-bold text-foreground">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/70">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* After the study */}
          <div className="mt-10 rounded-xl bg-sage-muted/50 p-6">
            <h3 className="font-bold text-foreground">After the Study</h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground/70">
              If you attend the NHG conference calls, complete your reading
              guides, and your registration is accepted by the KF board, you are
              eligible to join Karis Fellowships, our one-year training program
              of Bible teaching, practical tools, support, and healing.
            </p>
          </div>

          {/* Calendar */}
          <div className="mt-10">
            <h3 className="font-bold text-foreground">Calendar</h3>
            <p className="mt-2 text-foreground/70">
              We offer the Weekly Study and Weekend Intensive Study formats,
              both 8 weeks in length, once a year beginning in January and
              ending in March. Please contact your Karis Link for exact dates
              and times.
            </p>
            <p className="mt-3 text-sm text-foreground/60 italic">
              You may also register any time and study at your own pace until
              the next conference calls begin in January.
            </p>
          </div>

          {/* Registration Form Placeholder */}
          <div className="mt-14 rounded-2xl border-2 border-gold/30 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground">Register</h2>
            <p className="mt-2 text-foreground/70">
              Registration form coming soon. In the meantime, email us
              at{" "}
              <a href="mailto:admin@karisfellowships.com" className="font-medium text-sage underline underline-offset-2 hover:text-sage-hover">
                admin@karisfellowships.com
              </a>
            </p>
            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground/70">Full Name</label>
                <input type="text" className="mt-1 w-full rounded-lg border border-border bg-cream px-4 py-3 text-sm outline-none transition-colors focus:border-sage focus:ring-1 focus:ring-sage" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/70">Email Address</label>
                <input type="email" className="mt-1 w-full rounded-lg border border-border bg-cream px-4 py-3 text-sm outline-none transition-colors focus:border-sage focus:ring-1 focus:ring-sage" placeholder="you@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/70">How did you hear about us?</label>
                <textarea className="mt-1 w-full rounded-lg border border-border bg-cream px-4 py-3 text-sm outline-none transition-colors focus:border-sage focus:ring-1 focus:ring-sage" rows={3} placeholder="Who invited you or how did you find us?" />
              </div>
              <button className="w-full rounded-full bg-gold px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-gold-hover hover:-translate-y-0.5">
                Submit Registration
              </button>
            </div>
            <p className="mt-4 text-xs text-foreground/50">
              Still have questions? Ask the person who invited you or email us
              at admin@karisfellowships.com.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
