import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-dark text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="grain relative flex min-h-screen w-full items-center justify-center overflow-hidden">
        <Image src="/hero.jpg" alt="Hands nurturing a growing plant" fill className="object-cover scale-105" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-dark/50 via-slate-dark/30 to-slate-dark" />
        <div className="relative z-10 mx-auto max-w-5xl px-8 text-center">
          <h1 className="animate-fade-up font-serif text-6xl font-semibold leading-[1.05] tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl">
            Karis Fellowships
          </h1>
          <p className="animate-fade-up-delay mx-auto mt-8 max-w-xl text-lg font-light tracking-wide text-teal-light/80 sm:text-xl">
            Empowering Christians to fulfill their true glory.
          </p>
          <div className="animate-fade-up-delay-2 mt-14 flex flex-wrap items-center justify-center gap-5">
            <Link
              href="/register"
              className="group inline-flex items-center gap-3 rounded-xl bg-white/[0.08] px-8 py-4 text-[13px] font-medium tracking-widest text-white uppercase backdrop-blur-sm border border-white/[0.08] transition-all duration-500 hover:bg-white/[0.14] hover:border-white/[0.15]"
            >
              Get Started
              <svg className="h-3.5 w-3.5 opacity-50 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
            </Link>
            <a
              href="#what-we-do"
              className="inline-flex items-center px-8 py-4 text-[13px] font-medium tracking-widest text-white/40 uppercase transition-colors duration-500 hover:text-white/70"
            >
              Learn More
            </a>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-slate-dark to-transparent" />
      </section>

      {/* What We Do */}
      <section id="what-we-do" className="scroll-mt-20 px-8 py-36 sm:py-44">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-teal-light/50">What We Do</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
              What We Do &amp; Why
            </h2>
            <p className="mt-6 text-base leading-[1.8] text-white/45">
              We train, educate, and support Christians to grow into the people
              God created them to be and to walk in authentic relationship with
              their Creator. Discontent with mere theory, we teach not only the
              why but the how &mdash; step by mindful step.
            </p>
          </div>

          <div className="mt-24 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Mature", color: "bg-teal", desc: "Our standard for spirituality and growth is the Fruit of the Spirit evident in our lives (Galatians 5:22-23). We dig for the roots of our sickness unto death and learn to respond to life out of new principles of thinking, feeling, and acting." },
              { title: "Love", color: "bg-coral", desc: "Love is the goal of our instruction (I Timothy 1:3-7). Without love we are nothing and can do nothing (1 Corinthians 13). We are training to become the love of God in the world\u2014actually living it, not just talking about it." },
              { title: "Truth", color: "bg-sky", desc: "Truth is the cornerstone of Karis Fellowships. We learn to admit the truth about who we are without shame and condemnation (Psalm 15:2, Romans 8:1, John 8:31-32). We learn to give up our illusions about ourselves, others, the world, and God." },
              { title: "Freedom", color: "bg-violet", desc: "With its many commands of \u2018do not fear,\u2019 the Bible makes it clear that we have a problem with fear. Our greatest deliverance is from the bondage to the \u2018fear of death\u2019 (Hebrews 2:14-18). Mature love casts out all fear, and our goal is to have no fear but the fear of God (1 John 4:18)." },
            ].map(({ title, color, desc }) => (
              <div key={title} className="group rounded-3xl border border-white/[0.06] bg-white/[0.02] p-8 transition-all duration-500 hover:bg-white/[0.05] hover:border-white/[0.1]">
                <div className={`mb-6 h-px w-8 ${color} opacity-60 transition-all duration-500 group-hover:w-14 group-hover:opacity-100`} />
                <h3 className="font-serif text-2xl font-semibold text-white">{title}</h3>
                <p className="mt-4 text-sm leading-[1.8] text-white/35">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="grain relative overflow-hidden px-8 py-36 sm:py-44">
        <div className="absolute inset-0">
          <Image src="/ship-sailing.jpg" alt="Ship sailing toward the horizon" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-dark/95 via-slate-dark/85 to-slate-dark/50" />
        </div>
        <div className="relative mx-auto max-w-6xl">
          <div className="max-w-xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-teal-light/50">How It Works</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-white sm:text-5xl">How It Works</h2>
            <div className="mt-14 space-y-10">
              {[
                { step: "01", title: "NHG Book Study", desc: "It starts with a conference call-based book study to help you discover where you are now\u2013exactly how you are enslaved to pride, fear, and illusion." },
                { step: "02", title: "Join Karis Fellowships", desc: "After you complete this book study, you may join Karis Fellowships, a one-year training program designed to equip and support you for recovery from a life based on pride to one based on Biblical love." },
                { step: "03", title: "Weekly Meetings", desc: "Our KF members attend small, weekly meetings via conference call for grounding and re-centering, encouragement, confession, sharing, Bible teaching, training, healing, and prayer." },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex gap-6">
                  <span className="mt-1 font-serif text-3xl font-light text-teal-light/30">{step}</span>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-[1.8] text-white/45">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-12 text-sm text-white/25 italic">All of our programs are online, so you can attend from anywhere in the world.</p>
          </div>
        </div>
      </section>

      {/* Membership Cards */}
      <section className="px-8 py-36 sm:py-44">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-teal-light/50">Get Started</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-white sm:text-5xl">How to Get Started</h2>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            <Link href="/register" className="group relative block overflow-hidden rounded-3xl transition-all duration-700 hover:-translate-y-1">
              <div className="relative aspect-[3/4] sm:aspect-[4/5]">
                <Image src="/forest-light.jpg" alt="Light breaking through a forest" fill className="object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-dark via-slate-dark/30 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-10">
                <span className="inline-block rounded-lg bg-white/[0.08] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-white/60 backdrop-blur-sm border border-white/[0.06]">Step 1 &middot; Open to All</span>
                <h3 className="mt-4 font-serif text-3xl font-semibold text-white">NHG Book Study</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/50">Your first step is to participate in the Neurosis and Human Growth (NHG) book study.</p>
                <span className="mt-6 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.15em] text-white/40 transition-all duration-500 group-hover:text-teal-light group-hover:tracking-[0.2em]">
                  Register for NHG
                  <svg className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
                </span>
              </div>
            </Link>
            <Link href="/login" className="group relative block overflow-hidden rounded-3xl transition-all duration-700 hover:-translate-y-1">
              <div className="relative aspect-[3/4] sm:aspect-[4/5]">
                <Image src="/butterfly-transform.jpg" alt="Transformation in nature" fill className="object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-dark via-slate-dark/30 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-10">
                <span className="inline-block rounded-lg bg-white/[0.08] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-white/60 backdrop-blur-sm border border-white/[0.06]">Step 2 &middot; By Invitation</span>
                <h3 className="mt-4 font-serif text-3xl font-semibold text-white">Karis Fellowships</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/50">A one-year training program of Bible teaching, practical tools, support, and healing.</p>
                <span className="mt-6 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.15em] text-white/40 transition-all duration-500 group-hover:text-teal-light group-hover:tracking-[0.2em]">
                  Member Login
                  <svg className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-8 py-36 sm:py-44">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/20">Testimonials</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-white sm:text-5xl">What Members Say</h2>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { quote: "Karis Fellowships entails much work, but it is so much more work to stay miserable, holding on to pain, suffering, and anger. This program gave me real steps to freedom.", author: "Woman in Christian ministry for over 40 years" },
              { quote: "Joining KF has helped me envision a true and glorious life in Christ. Before KF, being a Christian seemed pretty bleak. Now, I see hope in this life, not just the next.", author: "Peace Corps volunteer" },
              { quote: "My Karis Fellowship group is the single most supportive, practical, genuinely helpful small group I've ever been in. And I've been in a lot during my years in the church.", author: "Young married woman" },
              { quote: "KF has made our marriage. We couldn't be more grateful. You have blessed our marriage enormously. We could talk for hours about how much it's helped us foster compassion, honesty, and love.", author: "MPC (Masters in Professional Counseling)" },
              { quote: "The life of peace and calm that I truly never believed would ever be possible for me is with each day being realized more and more. I am amazed at all the ways God has set me free.", author: "Graduate student" },
              { quote: "Anxiety. Guilt. Fear. If I could describe my life prior to Karis Fellowships, those would be the words. Now, after training for just over a year, I have a sense of hope for the very first time.", author: "Young professional" },
            ].map(({ quote, author }, i) => (
              <div key={i} className="flex flex-col rounded-3xl border border-white/[0.06] bg-white/[0.02] p-8 transition-all duration-500 hover:bg-white/[0.04]">
                <span className="font-serif text-4xl leading-none text-teal-light/20">&ldquo;</span>
                <p className="mt-2 flex-1 text-[15px] leading-[1.8] text-white/45">{quote}</p>
                <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.2em] text-white/20">&mdash; {author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="grain relative overflow-hidden px-8 py-36 sm:py-44">
        <div className="absolute inset-0">
          <Image src="/mountain-dawn.jpg" alt="Dawn breaking over mountain peaks" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-l from-slate-dark/95 via-slate-dark/80 to-slate-dark/40" />
        </div>
        <div className="relative mx-auto max-w-6xl">
          <div className="ml-auto max-w-xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/30">Who We Are</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-white sm:text-5xl">Who We Are</h2>

            <div className="mt-10 space-y-5">
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.04] p-7 backdrop-blur-md">
                <h3 className="font-serif text-lg font-semibold text-white">Nancy Diven, Founder</h3>
                <p className="mt-3 text-sm leading-[1.8] text-white/40">
                  Nancy earned a BA in classical culture from the University of Oklahoma. She is forever grateful for the guidance of two Oxford trained professors whom she met there and for the years of Bible study in the evangelical church. Karis Fellowships training is the result of God&apos;s work in her life and His clear call to offer to others this ministry of invitation.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.04] p-7 backdrop-blur-md">
                <h3 className="font-serif text-lg font-semibold text-white">Alison Tunnell Diven, Co-Founder</h3>
                <p className="mt-3 text-sm leading-[1.8] text-white/40">
                  Alison is the co-founder of Karis Fellowships, Intl. In 2010, she helped Nancy make the move to an on-line ministry. She also helped develop the original KF training materials and created the first KF website.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.04] p-7 backdrop-blur-md">
                <h3 className="font-serif text-lg font-semibold text-white">Volunteers</h3>
                <p className="mt-3 text-sm leading-[1.8] text-white/40">
                  We are volunteers offering our time, energy, and abilities in gratitude for our own transformation. We are Christians who not only recognize how messed up we are, but choose a path of healing and reorienting to God. On this path, we train hard and rejoice in the tangible evidence of our growth.
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/about" className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.15em] text-white/60 backdrop-blur-sm transition-all duration-500 hover:bg-white/[0.08] hover:text-white">About Us</Link>
              <Link href="/contact" className="inline-flex items-center px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.15em] text-white/30 transition-colors duration-500 hover:text-white/60">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="grain relative overflow-hidden px-8 py-36 sm:py-44">
        <div className="absolute inset-0">
          <Image src="/starry-mountain.jpg" alt="Stars over mountains" fill className="object-cover" />
          <div className="absolute inset-0 bg-teal-deep/85" />
        </div>
        <div className="relative mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-4xl font-semibold text-white sm:text-5xl md:text-6xl">Ready to Begin?</h2>
          <p className="mx-auto mt-6 max-w-lg text-base leading-[1.8] text-white/50">Your first step is to participate in the Neurosis and Human Growth (NHG) book study. You may register any time and study at your own pace.</p>
          <Link href="/register" className="mt-12 inline-flex items-center gap-3 rounded-xl border border-white/20 bg-white/[0.08] px-10 py-4 text-[13px] font-medium tracking-widest text-white uppercase backdrop-blur-sm transition-all duration-500 hover:bg-white/[0.15] hover:border-white/30">
            Register for NHG
            <svg className="h-3.5 w-3.5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
