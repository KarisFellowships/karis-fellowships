import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-dark text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
        <Image src="/hero.jpg" alt="Hands nurturing a growing plant" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-dark/60 via-slate-dark/45 to-slate-dark/70" />
        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          <h1 className="animate-fade-up text-5xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
            Karis Fellowships
          </h1>
          <p className="animate-fade-up-delay mx-auto mt-6 max-w-2xl text-lg font-semibold text-teal-light sm:text-xl md:text-2xl">
            Empowering Christians to fulfill their true glory.
          </p>
          <div className="animate-fade-up-delay-2 mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/register"
              className="group inline-flex items-center gap-2 rounded-full bg-teal px-8 py-4 text-sm font-bold text-white shadow-lg shadow-teal/25 transition-all duration-200 hover:bg-teal-hover hover:shadow-xl hover:shadow-teal/30 hover:-translate-y-0.5"
            >
              Get Started
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
            </Link>
            <a
              href="#what-we-do"
              className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:border-white/40"
            >
              Learn More
            </a>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-dark to-transparent" />
      </section>

      {/* What We Do */}
      <section id="what-we-do" className="scroll-mt-20 px-6 py-28 sm:py-36">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-light">What We Do</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              What We Do &amp; Why
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/60">
              We train, educate, and support Christians to grow into the people
              God created them to be and to walk in authentic relationship with
              their Creator. Discontent with mere theory, we teach not only the
              why but the how &mdash; step by mindful step.
            </p>
          </div>

          <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Mature", color: "bg-teal", desc: "Our standard for spirituality and growth is the Fruit of the Spirit evident in our lives (Galatians 5:22-23). We dig for the roots of our sickness unto death and learn to respond to life out of new principles of thinking, feeling, and acting." },
              { title: "Love", color: "bg-coral", desc: "Love is the goal of our instruction (I Timothy 1:3-7). Without love we are nothing and can do nothing (1 Corinthians 13). We are training to become the love of God in the world\u2014actually living it, not just talking about it." },
              { title: "Truth", color: "bg-sky", desc: "Truth is the cornerstone of Karis Fellowships. We learn to admit the truth about who we are without shame and condemnation (Psalm 15:2, Romans 8:1, John 8:31-32). We learn to give up our illusions about ourselves, others, the world, and God." },
              { title: "Freedom", color: "bg-violet", desc: "With its many commands of \u2018do not fear,\u2019 the Bible makes it clear that we have a problem with fear. Our greatest deliverance is from the bondage to the \u2018fear of death\u2019 (Hebrews 2:14-18). Mature love casts out all fear, and our goal is to have no fear but the fear of God (1 John 4:18)." },
            ].map(({ title, color, desc }) => (
              <div key={title} className="group rounded-2xl bg-white/5 p-7 ring-1 ring-white/10 transition-all duration-200 hover:bg-white/10 hover:-translate-y-1">
                <div className={`mb-5 h-1 w-10 rounded-full ${color} transition-all duration-200 group-hover:w-16`} />
                <h3 className="text-lg font-bold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/50">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works — editorial text-over-image */}
      <section className="relative overflow-hidden px-6 py-28 sm:py-36">
        <div className="absolute inset-0">
          <Image src="/ship-sailing.jpg" alt="Ship sailing toward the horizon" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-dark/95 via-slate-dark/85 to-slate-dark/60" />
        </div>
        <div className="relative mx-auto max-w-6xl">
          <div className="max-w-xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-light">How It Works</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">How It Works</h2>
            <div className="mt-10 space-y-8">
              {[
                { step: "1", title: "NHG Book Study", color: "bg-teal text-white", line: "bg-white/15", desc: "It starts with a conference call-based book study to help you discover where you are now\u2013exactly how you are enslaved to pride, fear, and illusion." },
                { step: "2", title: "Join Karis Fellowships", color: "bg-coral text-white", line: "bg-white/15", desc: "After you complete this book study, you may join Karis Fellowships, a one-year training program designed to equip and support you for recovery from a life based on pride to one based on Biblical love." },
                { step: "3", title: "Weekly Meetings", color: "bg-violet text-white", line: "bg-transparent", desc: "Our KF members attend small, weekly meetings via conference call for grounding and re-centering, encouragement, confession, sharing, Bible teaching, training, healing, and prayer." },
              ].map(({ step, title, color, line, desc }) => (
                <div key={step} className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${color} text-sm font-bold shadow-sm`}>{step}</span>
                    <div className={`mt-2 h-full w-px ${line}`} />
                  </div>
                  <div className="pb-2">
                    <h3 className="text-lg font-bold text-white">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-white/65">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm text-white/40 italic">All of our programs are online, so you can attend from anywhere in the world.</p>
          </div>
        </div>
      </section>

      {/* Membership Cards */}
      <section className="px-6 py-28 sm:py-36">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet">Get Started</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">How to Get Started</h2>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            <Link href="/register" className="group relative block overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative aspect-[3/4] sm:aspect-[4/5]">
                <Image src="/forest-light.jpg" alt="Light breaking through a forest" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-dark via-slate-dark/40 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-8">
                <span className="inline-block rounded-full bg-teal/90 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">Step 1 &middot; Open to All</span>
                <h3 className="mt-3 text-2xl font-bold text-white">NHG Book Study</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">Your first step is to participate in the Neurosis and Human Growth (NHG) book study.</p>
                <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2.5 text-sm font-bold text-white backdrop-blur-sm transition-all group-hover:bg-teal">
                  Register for NHG
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                </span>
              </div>
            </Link>
            <Link href="/login" className="group relative block overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative aspect-[3/4] sm:aspect-[4/5]">
                <Image src="/butterfly-transform.jpg" alt="Transformation in nature" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-dark via-slate-dark/40 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-8">
                <span className="inline-block rounded-full bg-violet/90 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">Step 2 &middot; By Invitation</span>
                <h3 className="mt-3 text-2xl font-bold text-white">Karis Fellowships</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">A one-year training program of Bible teaching, practical tools, support, and healing.</p>
                <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2.5 text-sm font-bold text-white backdrop-blur-sm transition-all group-hover:bg-violet">
                  Member Login
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-slate-dark/50 px-6 py-28 sm:py-36">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber">Testimonials</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">What Members Say</h2>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { quote: "Karis Fellowships entails much work, but it is so much more work to stay miserable, holding on to pain, suffering, and anger. This program gave me real steps to freedom.", author: "Woman in Christian ministry for over 40 years", color: "bg-teal" },
              { quote: "Joining KF has helped me envision a true and glorious life in Christ. Before KF, being a Christian seemed pretty bleak. Now, I see hope in this life, not just the next.", author: "Peace Corps volunteer", color: "bg-coral" },
              { quote: "My Karis Fellowship group is the single most supportive, practical, genuinely helpful small group I've ever been in. And I've been in a lot during my years in the church.", author: "Young married woman", color: "bg-sky" },
              { quote: "KF has made our marriage. We couldn't be more grateful. You have blessed our marriage enormously. We could talk for hours about how much it's helped us foster compassion, honesty, and love.", author: "MPC (Masters in Professional Counseling)", color: "bg-violet" },
              { quote: "The life of peace and calm that I truly never believed would ever be possible for me is with each day being realized more and more. I am amazed at all the ways God has set me free.", author: "Graduate student", color: "bg-amber" },
              { quote: "Anxiety. Guilt. Fear. If I could describe my life prior to Karis Fellowships, those would be the words. Now, after training for just over a year, I have a sense of hope for the very first time.", author: "Young professional", color: "bg-teal" },
            ].map(({ quote, author, color }, i) => (
              <div key={i} className="flex flex-col rounded-2xl bg-white/5 p-7 ring-1 ring-white/10 transition-all hover:bg-white/10">
                <div className={`mb-4 h-1 w-8 rounded-full ${color}`} />
                <p className="flex-1 text-sm leading-relaxed text-white/60">&ldquo;{quote}&rdquo;</p>
                <p className="mt-5 text-xs font-bold uppercase tracking-wide text-white/25">&mdash; {author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are — text overlapping image */}
      <section className="relative overflow-hidden px-6 py-28 sm:py-36">
        <div className="absolute inset-0">
          <Image src="/mountain-dawn.jpg" alt="Dawn breaking over mountain peaks" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-l from-slate-dark/95 via-slate-dark/80 to-slate-dark/50" />
        </div>
        <div className="relative mx-auto max-w-6xl">
          <div className="ml-auto max-w-xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky">Who We Are</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Who We Are</h2>

            <div className="mt-8 space-y-5">
              <div className="rounded-xl bg-white/5 p-5 ring-1 ring-white/10 backdrop-blur-sm">
                <div className="mb-2 h-0.5 w-8 rounded-full bg-teal" />
                <h3 className="font-bold text-white">Nancy Diven, Founder</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  Nancy earned a BA in classical culture from the University of Oklahoma. She is forever grateful for the guidance of two Oxford trained professors whom she met there and for the years of Bible study in the evangelical church. Karis Fellowships training is the result of God&apos;s work in her life and His clear call to offer to others this ministry of invitation.
                </p>
              </div>
              <div className="rounded-xl bg-white/5 p-5 ring-1 ring-white/10 backdrop-blur-sm">
                <div className="mb-2 h-0.5 w-8 rounded-full bg-coral" />
                <h3 className="font-bold text-white">Alison Tunnell Diven, Co-Founder</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  Alison is the co-founder of Karis Fellowships, Intl. In 2010, she helped Nancy make the move to an on-line ministry. She also helped develop the original KF training materials and created the first KF website.
                </p>
              </div>
              <div className="rounded-xl bg-white/5 p-5 ring-1 ring-white/10 backdrop-blur-sm">
                <div className="mb-2 h-0.5 w-8 rounded-full bg-violet" />
                <h3 className="font-bold text-white">Volunteers</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  We are volunteers offering our time, energy, and abilities in gratitude for our own transformation. We are Christians who not only recognize how messed up we are, but choose a path of healing and reorienting to God. On this path, we train hard and rejoice in the tangible evidence of our growth.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/about" className="inline-flex items-center gap-2 rounded-2xl bg-white/15 backdrop-blur-sm px-7 py-3.5 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-white/25 hover:-translate-y-0.5">About Us</Link>
              <Link href="/contact" className="inline-flex items-center rounded-2xl border border-white/30 px-7 py-3.5 text-sm font-bold text-white/80 transition-colors hover:bg-white/10">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden px-6 py-24 sm:py-28">
        <div className="absolute inset-0">
                <Image src="/starry-mountain.jpg" alt="Stars over mountains — infinite possibility" fill className="object-cover" />
          <div className="absolute inset-0 bg-teal-deep/90 backdrop-blur-[2px]" />
        </div>
        <div className="relative mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Ready to Begin?</h2>
          <p className="mt-5 text-lg text-white/75">Your first step is to participate in the Neurosis and Human Growth (NHG) book study. You may register any time and study at your own pace.</p>
          <Link href="/register" className="mt-9 inline-flex items-center gap-2 rounded-full bg-white px-10 py-4 text-sm font-bold text-teal-deep shadow-lg transition-all duration-200 hover:bg-teal-light hover:text-teal-deep hover:shadow-xl hover:-translate-y-0.5">
            Register for NHG
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
