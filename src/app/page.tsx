import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-cream text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
        <Image
          src="/hero.jpg"
          alt="Hands nurturing a growing plant"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/65" />
        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          <p className="animate-fade-up text-sm font-semibold uppercase tracking-[0.25em] text-gold-light">
            An invitation to mutual generosity
          </p>
          <h1 className="animate-fade-up-delay mt-5 text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
            Karis Fellowships
          </h1>
          <p className="animate-fade-up-delay-2 mx-auto mt-6 max-w-2xl text-lg text-white/85 sm:text-xl">
            Empowering Christians to fulfill their true glory.
          </p>
          <div className="animate-fade-up-delay-3 mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/register"
              className="group inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-bold text-white shadow-lg shadow-gold/25 transition-all hover:bg-gold-hover hover:shadow-xl hover:shadow-gold/30 hover:-translate-y-0.5"
            >
              Get Started
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
            </Link>
            <a
              href="#what-we-do"
              className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              Learn More
            </a>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent" />
      </section>

      {/* What We Do */}
      <section id="what-we-do" className="scroll-mt-20 px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-sage">
              What We Do
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Training for Real Transformation
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-foreground/70">
              We train, educate, and support Christians to grow into the people
              God created them to be and to walk in authentic relationship with
              their Creator. Discontent with mere theory, we teach not only the
              why but the how &mdash; step by mindful step.
            </p>
          </div>

          <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Mature",
                gradient: "from-sage to-sage-hover",
                desc: "Visibly mature in the Fruit of the Spirit. We dig for the roots of our sickness and learn to respond to life out of new principles of thinking, feeling, and acting.",
              },
              {
                title: "Love",
                gradient: "from-terracotta to-terracotta/80",
                desc: "Love is the goal of our instruction. We are training to become the love of God in the world — actually living it, not just talking about it.",
              },
              {
                title: "Truth",
                gradient: "from-sky to-sky/80",
                desc: "Truth is the cornerstone of Karis Fellowships. We learn to admit the truth about who we are without shame and condemnation.",
              },
              {
                title: "Freedom",
                gradient: "from-gold to-gold-hover",
                desc: "With its many commands of 'do not fear,' the Bible makes it clear that we have a problem with fear. Mature love casts out all fear.",
              },
            ].map(({ title, gradient, desc }) => (
              <div
                key={title}
                className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm ring-1 ring-border/50 transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div className={`mb-5 h-1.5 w-12 rounded-full bg-gradient-to-r ${gradient}`} />
                <h3 className="text-xl font-bold text-foreground">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/65">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works — with image */}
      <section className="overflow-hidden bg-white px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl">
                <Image
                  src="/path-nature.jpg"
                  alt="A peaceful path through nature"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-3xl bg-sage-muted" />
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold">
                How It Works
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Your Path to Growth
              </h2>

              <div className="mt-10 space-y-8">
                {[
                  {
                    step: "1",
                    title: "NHG Book Study",
                    color: "bg-sage text-white",
                    line: "bg-sage/20",
                    desc: "It starts with a book study to help you discover where you are now — exactly how you are enslaved to pride, fear, and illusion.",
                  },
                  {
                    step: "2",
                    title: "Join Karis Fellowships",
                    color: "bg-terracotta text-white",
                    line: "bg-terracotta/20",
                    desc: "After you complete the book study, you may join Karis Fellowships, a one-year training program designed to equip and support you.",
                  },
                  {
                    step: "3",
                    title: "Weekly Training & Healing",
                    color: "bg-gold text-white",
                    line: "bg-transparent",
                    desc: "Members attend small, weekly meetings for grounding, encouragement, confession, Bible teaching, training, healing, and prayer.",
                  },
                ].map(({ step, title, color, line, desc }) => (
                  <div key={step} className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${color} text-sm font-bold shadow-sm`}>
                        {step}
                      </span>
                      <div className={`mt-2 h-full w-0.5 ${line}`} />
                    </div>
                    <div className="pb-2">
                      <h3 className="text-lg font-bold text-foreground">{title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-foreground/65">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-8 text-sm font-medium text-foreground/50 italic">
                All programs are online — attend from anywhere in the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Cards */}
      <section className="px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-terracotta">
              Get Started
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Begin Your Journey
            </h2>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {/* NHG Card */}
            <div className="group relative overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-border/50 transition-all hover:shadow-xl">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/sunlight-nature.jpg"
                  alt="Warm sunlight through nature"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                <span className="absolute left-6 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-sage shadow-sm backdrop-blur-sm">
                  Step 1 &middot; Open to All
                </span>
              </div>
              <div className="p-8 pt-4">
                <h3 className="text-2xl font-bold text-foreground">
                  NHG Book Study
                </h3>
                <p className="mt-3 leading-relaxed text-foreground/70">
                  Your first step is to participate in the Neurosis and Human
                  Growth (NHG) book study. You read the first 11 chapters,
                  complete a study guide, and attend live conference calls.
                </p>
                <Link
                  href="/register"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-sage px-6 py-4 text-sm font-bold text-white shadow-sm transition-all hover:bg-sage-hover hover:shadow-md hover:-translate-y-0.5"
                >
                  Register for NHG
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </div>

            {/* KF Card */}
            <div className="group relative overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-border/50 transition-all hover:shadow-xl">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/community.jpg"
                  alt="Community and fellowship"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                <span className="absolute left-6 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-gold-hover shadow-sm backdrop-blur-sm">
                  Step 2 &middot; By Invitation
                </span>
              </div>
              <div className="p-8 pt-4">
                <h3 className="text-2xl font-bold text-foreground">
                  Karis Fellowships
                </h3>
                <p className="mt-3 leading-relaxed text-foreground/70">
                  After completing the NHG book study and with board acceptance,
                  you are eligible to join our one-year training program of
                  Bible teaching, practical tools, support, and healing.
                </p>
                <Link
                  href="/login"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-gold bg-transparent px-6 py-4 text-sm font-bold text-gold-hover transition-all hover:bg-gold-light hover:-translate-y-0.5"
                >
                  Member Login
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative overflow-hidden bg-white px-6 py-24 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-sage-muted/30 via-transparent to-gold-light/20" />
        <div className="relative mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-plum">
              Testimonials
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              What Members Say
            </h2>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                quote: "Karis Fellowships entails much work, but it is so much more work to stay miserable, holding on to pain, suffering, and anger. This program gave me real steps to freedom.",
                author: "Woman in Christian ministry for over 40 years",
                accent: "bg-sage",
              },
              {
                quote: "Joining KF has helped me envision a true and glorious life in Christ. Before KF, being a Christian seemed pretty bleak. Now, I see hope in this life, not just the next.",
                author: "Peace Corps volunteer",
                accent: "bg-gold",
              },
              {
                quote: "My Karis Fellowship group is the single most supportive, practical, genuinely helpful small group I've ever been in. And I've been in a lot during my years in the church.",
                author: "Young married woman",
                accent: "bg-terracotta",
              },
              {
                quote: "KF has made our marriage. We couldn't be more grateful. You have blessed our marriage enormously. We could talk for hours about how much it's helped us foster compassion, honesty, and love.",
                author: "MPC (Masters in Professional Counseling)",
                accent: "bg-sky",
              },
              {
                quote: "The life of peace and calm that I truly never believed would ever be possible for me is with each day being realized more and more. I am amazed at all the ways God has set me free.",
                author: "Graduate student",
                accent: "bg-plum",
              },
              {
                quote: "Anxiety. Guilt. Fear. If I could describe my life prior to Karis Fellowships, those would be the words. Now, after training for just over a year, I have a sense of hope for the very first time.",
                author: "Young professional",
                accent: "bg-sage",
              },
            ].map(({ quote, author, accent }, i) => (
              <div
                key={i}
                className="flex flex-col rounded-3xl bg-white p-7 shadow-sm ring-1 ring-border/30 transition-shadow hover:shadow-md"
              >
                <div className={`mb-4 h-1 w-8 rounded-full ${accent}`} />
                <p className="flex-1 text-sm leading-relaxed text-foreground/75">
                  &ldquo;{quote}&rdquo;
                </p>
                <p className="mt-5 text-xs font-bold uppercase tracking-wide text-foreground/40">
                  &mdash; {author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are — with image */}
      <section className="px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky">
                Who We Are
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                A Volunteer Community
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-foreground/70">
                Founded by Nancy Diven with Alison Tunnell Diven, we are
                volunteers offering our time, energy, and abilities in gratitude
                for our own transformation. We are Christians who not only
                recognize how messed up we are, but choose a path of healing and
                reorienting to God.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-foreground/70">
                On this path, we train hard and rejoice in the tangible evidence
                of our growth.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-2xl bg-sky px-7 py-3.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-sky/90 hover:-translate-y-0.5"
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-2xl border-2 border-sky px-7 py-3.5 text-sm font-bold text-sky transition-colors hover:bg-sky-light"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl">
                <Image
                  src="/nature-mountain.jpg"
                  alt="Peaceful mountain landscape"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 -z-10 h-full w-full rounded-3xl bg-sky-light" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden px-6 py-20 sm:py-24">
        <div className="absolute inset-0">
          <Image
            src="/waterfall.jpg"
            alt="Serene waterfall"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-sage/85 backdrop-blur-sm" />
        </div>
        <div className="relative mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to Begin?
          </h2>
          <p className="mt-5 text-lg text-white/80">
            Your first step is to participate in the NHG book study.
            Register any time and study at your own pace.
          </p>
          <Link
            href="/register"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-gold px-10 py-4 text-sm font-bold text-white shadow-lg shadow-gold/30 transition-all hover:bg-gold-hover hover:shadow-xl hover:-translate-y-0.5"
          >
            Register for NHG
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
