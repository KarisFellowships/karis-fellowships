import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import type { NavTier } from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroVideo from "@/components/HeroVideo";
import ExpandableCard from "@/components/ExpandableCard";
import { createServerClient } from "@/lib/supabase-server";

export default async function Home() {
  // Reflect the visitor's login state in the header (the home page renders its
  // own Navbar, outside the (public) layout) so a logged-in member stays logged
  // in when they land here. The session is unaffected either way.
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  let tier: NavTier = null;
  if (user) {
    const { data: profile } = await supabase
      .from("users")
      .select("tier")
      .eq("id", user.id)
      .single();
    tier = (profile?.tier as NavTier) ?? "nhg";
  }

  return (
    <div className="min-h-screen text-foreground">
      <Navbar isLoggedIn={!!user} tier={tier} />

      <HeroVideo />

      {/* What We Do — LIGHT section */}
      <section id="what-we-do" className="scroll-mt-20 bg-ivory px-8 py-14 sm:py-18">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <svg className="mx-auto h-8 w-8 text-teal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22v-14" />
              <path d="M12 18c-4 0-7-3-6-7 4-.5 7 2.5 6 7" />
              <path d="M12 14c4 0 7-3 6-7-4-.5-7 2.5-6 7" />
              <path d="M12 10c-3.5 0-6-2.5-5-6 3.5-.5 6 2 5 6" />
            </svg>
            <h2 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              What We Do &amp; Why
            </h2>
            <p className="mt-6 text-base leading-[1.8] text-slate">
              We train, educate, and support Christians to grow into the people
              God created them to be and to be able to walk in authentic
              relationship with their Creator. We do this through unique online
              book studies and support programs, Bible exploration, training in
              practical tools, and healing gifts. We discover the purpose of our
              salvation and how to develop the Fruit of the Spirit in our lives.
              (Philippians 2:12, Galatians 5:22-23).
            </p>
          </div>

          <p className="mt-16 text-center font-serif text-2xl font-light text-charcoal sm:text-3xl">
            We train together to consistently experience and demonstrate:
          </p>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <ExpandableCard
              title="Fruit of the Spirit"
              color="bg-teal"
              desc="Our standard for spirituality and growth is the Fruit of the Spirit evident in our lives (Galatians 5:22-23). We dig for the roots of our sickness unto death and learn to respond to life out of new principles of thinking, feeling, and acting."
              expanded={[
                "The evidence of mature, developed spiritual connection and growth is the Fruit of the Holy Spirit demonstrated in our lives (Galatians 5:22-23).",
                "The Christian life of many believers might be compared to a Christmas tree, laden with the pretty ornaments of church attendance, religious activities, a spiritual vocabulary, the right theology and beliefs, Bible study, prayer, and a continual effort to say and do what is expected of a Christian. These ornaments might look good on the tree, but they are not produced by the tree because the tree itself is dead.",
                "Other Christian lives might be compared to a fruit tree planted by streams of water. This tree is not so pretty, but it is alive. The living tree is designed by God to produce fruit, and when it is rooted and unfettered, grounded and nurtured, it effortlessly yields that fruit.",
                "Our actively engaged lives encounter lots of difficulties which reveal the quality of our faith and maturity. People often withdraw from an active life to avoid encountering situations that reveal their fears and inadequacies. This is not the kind of life that Karis Fellowships envisions for you.",
                "Through KF training, we learn to welcome discoveries about our disconnection from the Spirit and engage in training that will replenish our capacity to produce fruit. We learn how we lost the connection to the Spirit and how to regain it.",
                "God intends that we be complete, mature, and fully equipped people in order to fulfill the purpose we were designed to achieve.",
                "To do so, we learn to respond to life with new principles for examining ourselves and our situations, and responding with authority, self-confidence, and even joy (James 1:2-4).",
              ]}
            />
            <ExpandableCard
              title="Love as the Goal"
              color="bg-coral"
              desc="Love is the goal of our instruction (I Timothy 1:3-7). Without love we are nothing and can do nothing (1 Corinthians 13). We are training to become the love of God in the world - actually living it, not just talking about it (1 John 5:1-4)."
              expanded={[
                "Many of us were taught to talk about the Christian life, but did not know how to live it or how to love. We learned to perform as Christians rather than becoming new creatures in Christ (2 Corinthians 5:16). In Karis Fellowships we are learning what it is to be a new creation.",
              ]}
            />
            <ExpandableCard
              title="Commitment to the Truth"
              color="bg-sky"
              desc="Truth is the cornerstone of Karis Fellowships. We learn to admit the truth about who we are without shame and condemnation (Psalm 15:2, Romans 8:1, John 8:31-32)."
              expanded={[
                "This gives us the security and starting point we need to grow into the people God created us to be. We are people who desire the truth in all things that we might be true people living real lives. We learn to give up our illusions about ourselves, others, the world, and God. We learn to respond, love, feel, and make choices based on real evidence.",
              ]}
            />
            <ExpandableCard
              title="Freedom from Fear"
              color="bg-violet"
              desc="We see in our lives that this work ultimately leads to more and more freedom. With its many commands of &quot;do not fear,&quot; the Bible makes it clear that we have a problem with fear. Our greatest deliverance is from the bondage to the &quot;fear of death&quot; (Hebrews 2:14-18)."
              expanded={[
                "Mature love casts out all fear, and our goal is to have no fear but the fear of God (1 John 4:18). This freedom then leads to expressing the unique qualities that each of us is actually designed to have, rather than what we imagine we should be in order to feel secure. We call this unique expression of our designed nature our \u201Cglory.\u201D",
              ]}
            />
          </div>

          <div className="group mx-auto mt-10 max-w-2xl rounded-xl border border-border/50 bg-white p-10 text-center transition-all duration-500 hover:shadow-lg hover:shadow-black/5">
            <div className="mx-auto mb-6 h-0.5 w-8 rounded-full bg-amber-400 transition-all duration-500 group-hover:w-14" />
            <h3 className="font-serif text-2xl font-semibold text-foreground">Your Unique Glory</h3>
            <p className="mt-4 text-sm leading-[1.8] text-slate">
              In our glory, we are expressing the character of God and our own unique qualities and work as His creatures. We come more and more into balance, living in correspondence and harmony within ourselves, with our community, and with the Creation. It is our designed nature to be in deep communion, correspondence, and harmony with God and His will. Through our glory we bring the will of God to Earth, as it is in Heaven.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works — DARK with image */}
      <section className="grain relative overflow-hidden bg-slate-dark px-8 py-28 sm:py-36">
        <div className="absolute inset-0">
          <Image src="/ship-voyage.jpg" alt="Sailboat heading out to open sea at golden hour" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-dark/95 via-slate-dark/80 to-slate-dark/50" />
        </div>
        <div className="relative mx-auto max-w-6xl">
          <div className="max-w-xl">
            <svg className="h-8 w-8 text-teal-light" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 3v4" /><path d="M12 17v4" /><path d="M3 12h4" /><path d="M17 12h4" /><path d="M12 12l3-5" /><path d="M12 12l-1.5 3" /><circle cx="12" cy="12" r="1.5" /></svg>
            <h2 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-white/95 sm:text-5xl">How It Works</h2>
            <div className="mt-14 space-y-10">
              <div className="flex gap-6">
                <span className="mt-1 font-serif text-3xl font-light text-teal-light/40">01</span>
                <div>
                  <Link href="/register" className="group/link font-serif text-xl font-semibold text-white/90 transition-colors duration-300 hover:text-teal-light">
                    NHG Book Study
                    <svg className="ml-2 inline-block h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover/link:translate-x-1 group-hover/link:opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
                  </Link>
                  <p className="mt-2 text-sm leading-[1.8] text-white/60">It starts with a conference call-based book study to help you discover where you are now–exactly how you are enslaved to pride, fear, and illusion.</p>
                </div>
              </div>
              {[
                { step: "02", title: "Join Karis Fellowships", desc: "After you complete this book study, you may join Karis Fellowships, a one-year training program designed to equip and support you for recovery from a life based on pride to one based on Biblical love." },
                { step: "03", title: "Weekly Meetings", desc: "Our KF members attend small, weekly meetings via conference call for grounding and re-centering, encouragement, confession, sharing, Bible teaching, training, healing, and prayer." },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex gap-6">
                  <span className="mt-1 font-serif text-3xl font-light text-teal-light/40">{step}</span>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-white/90">{title}</h3>
                    <p className="mt-2 text-sm leading-[1.8] text-white/60">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-12 text-sm text-white/40 italic">All of our programs are online, so you can attend from anywhere in the world.</p>
          </div>
        </div>
      </section>

      {/* Membership Cards — LIGHT section */}
      <section className="bg-cream px-8 py-28 sm:py-36">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <svg className="mx-auto h-8 w-8 text-teal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4c0 0 3-1 5-1s4 1 5 2c1-1 3-2 5-2s5 1 5 1v15c0 0-3-1-5-1s-4 1-5 2c-1-1-3-2-5-2s-5 1-5 1V4z" /><path d="M12 5v16" /></svg>
            <h2 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">How to Get Started</h2>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            <Link href="/register" className="group relative block overflow-hidden rounded-xl shadow-lg shadow-black/10 transition-all duration-700 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/15">
              <div className="relative aspect-[3/4] sm:aspect-[4/5]">
                <Image src="/forest-light.jpg" alt="Light breaking through a forest" fill className="object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-10">
                <span className="inline-block rounded-md bg-teal/90 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-white">Step 1 &middot; Open to All</span>
                <h3 className="mt-4 font-serif text-3xl font-semibold text-white">NHG Book Study</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/75">Your first step is to participate in the Neurosis and Human Growth (NHG) book study.</p>
                <span className="mt-6 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.15em] text-white/60 transition-all duration-500 group-hover:text-teal-light group-hover:tracking-[0.2em]">
                  Register for NHG
                  <svg className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
                </span>
              </div>
            </Link>
            <Link href="/login" className="group relative block overflow-hidden rounded-xl shadow-lg shadow-black/10 transition-all duration-700 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/15">
              <div className="relative aspect-[3/4] sm:aspect-[4/5]">
                <Image src="/butterfly-transform.jpg" alt="Transformation in nature" fill className="object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-10">
                <span className="inline-block rounded-md bg-violet/90 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-white">Step 2 &middot; By Invitation</span>
                <h3 className="mt-4 font-serif text-3xl font-semibold text-white">Karis Fellowships</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/75">A one-year training program of Bible teaching, practical tools, support, and healing.</p>
                <span className="mt-6 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.15em] text-white/60 transition-all duration-500 group-hover:text-teal-light group-hover:tracking-[0.2em]">
                  Member Login
                  <svg className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials — DARK section */}
      <section className="bg-slate-dark px-8 py-28 sm:py-36">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <svg className="mx-auto h-8 w-8 text-teal-light" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M10 8c0-2.5-2-4.5-4.5-4.5S1 5.5 1 8c0 3 4.5 6 4.5 6S10 11 10 8z" /><path d="M23 8c0-2.5-2-4.5-4.5-4.5S14 5.5 14 8c0 3 4.5 6 4.5 6S23 11 23 8z" /><path d="M5.5 17v3" /><path d="M18.5 17v3" /></svg>
            <h2 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-white/95 sm:text-5xl">What Members Say</h2>
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
              <div key={i} className="flex flex-col rounded-xl border border-white/[0.08] bg-white/[0.03] p-8 transition-all duration-500 hover:bg-white/[0.10] hover:border-teal-light/20 hover:shadow-lg hover:shadow-teal-light/5">
                <span className="font-serif text-4xl leading-none text-teal-light/30">&ldquo;</span>
                <p className="mt-2 flex-1 text-[15px] leading-[1.8] text-white/65">{quote}</p>
                <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.2em] text-white/35">&mdash; {author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are — LIGHT with image */}
      <section className="grain relative overflow-hidden px-8 py-28 sm:py-36">
        <div className="absolute inset-0">
          <Image src="/mountain-dawn.jpg" alt="Dawn breaking over mountain peaks" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-l from-slate-dark/90 via-slate-dark/70 to-slate-dark/30" />
        </div>
        <div className="relative mx-auto max-w-6xl">
          <div className="ml-auto max-w-xl">
            <svg className="h-8 w-8 text-teal-light" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="2" /><path d="M12 2c0 4-2 6-2 10" /><path d="M12 2c0 4 2 6 2 10" /><path d="M2 12c4 0 6-2 10-2" /><path d="M2 12c4 0 6 2 10 2" /><path d="M22 12c-4 0-6-2-10-2" /><path d="M22 12c-4 0-6 2-10 2" /><path d="M12 22c0-4-2-6-2-10" /><path d="M12 22c0-4 2-6 2-10" /></svg>
            <h2 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-white/95 sm:text-5xl">Who We Are</h2>

            <div className="mt-10 space-y-5">
              <div className="rounded-xl border border-white/[0.08] bg-slate-dark/60 p-7 backdrop-blur-lg">
                <h3 className="font-serif text-lg font-semibold text-white/90">Nancy Diven, Founder</h3>
                <p className="mt-3 text-sm leading-[1.8] text-white/60">
                  Nancy earned a BA in classical culture from the University of Oklahoma. She is forever grateful for the guidance of two Oxford trained professors whom she met there and for the years of Bible study in the evangelical church. Karis Fellowships training is the result of God&apos;s work in her life and His clear call to offer to others this ministry of invitation.
                </p>
              </div>
              <div className="rounded-xl border border-white/[0.08] bg-slate-dark/60 p-7 backdrop-blur-lg">
                <h3 className="font-serif text-lg font-semibold text-white/90">Alison Tunnell Diven, Co-Founder</h3>
                <p className="mt-3 text-sm leading-[1.8] text-white/60">
                  Alison is the co-founder of Karis Fellowships, Intl. In 2010, she helped Nancy make the move to an on-line ministry. She also helped develop the original KF training materials and created the first KF website.
                </p>
              </div>
              <div className="rounded-xl border border-white/[0.08] bg-slate-dark/60 p-7 backdrop-blur-lg">
                <h3 className="font-serif text-lg font-semibold text-white/90">Volunteers</h3>
                <p className="mt-3 text-sm leading-[1.8] text-white/60">
                  We are volunteers offering our time, energy, and abilities in gratitude for our own transformation. We are Christians who not only recognize how messed up we are, but choose a path of healing and reorienting to God. On this path, we train hard and rejoice in the tangible evidence of our growth.
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/about" className="inline-flex items-center gap-2 rounded-lg bg-teal px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.15em] text-white transition-all duration-500 hover:bg-teal-hover">About Us</Link>
              <Link href="/contact" className="inline-flex items-center rounded-lg border border-white/15 px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.15em] text-white/60 transition-all duration-500 hover:bg-white/10 hover:text-white">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA — deep accent with image */}
      <section className="grain relative overflow-hidden bg-teal-deep px-8 py-28 sm:py-36">
        <div className="absolute inset-0">
          <Image src="/starry-mountain.jpg" alt="Stars over mountains" fill className="object-cover opacity-30" />
        </div>
        <div className="relative mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-4xl font-semibold text-white/95 sm:text-5xl md:text-6xl">Ready to Begin?</h2>
          <p className="mx-auto mt-6 max-w-lg text-base leading-[1.8] text-white/60">Your first step is to participate in the Neurosis and Human Growth (NHG) book study. You may register any time and study at your own pace.</p>
          <Link href="/register" className="mt-12 inline-flex items-center gap-3 rounded-lg bg-white/85 backdrop-blur-sm px-10 py-4 text-[13px] font-medium tracking-widest text-teal-deep uppercase transition-all duration-500 hover:bg-white/95 hover:text-teal-deep">
            Register for NHG
            <svg className="h-3.5 w-3.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
