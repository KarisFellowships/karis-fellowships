import PageHeader from "@/components/PageHeader";
import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Karis Fellowships"
        subtitle="Founded by Nancy Diven with Alison Tunnell Diven, we are volunteers offering our time, energy, and abilities in gratitude for our own transformation."
        accent="teal"
      />

      <section className="px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="grid items-start gap-12 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-foreground">What We Do &amp; Why</h2>
              <p className="mt-4 leading-relaxed text-slate">
                We train, educate, and support Christians to grow into the people God
                created them to be and to walk in authentic relationship with their
                Creator. We do this through unique online book studies and support
                programs, Bible studies, training in practical tools, and healing
                gifts. Discontent with mere theory, we teach not only the why but the
                how &mdash; step by mindful step.
              </p>
            </div>
            <div className="relative lg:col-span-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lg">
                <Image src="/butterfly-transform.jpg" alt="Transformation in nature" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-3xl bg-teal-muted" />
            </div>
          </div>

          <div className="mt-20">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal">Our Vision</p>
            <h2 className="mt-2 text-2xl font-bold text-foreground">Our vision? To see you, dear Christian . . .</h2>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {[
                {
                  title: "Visibly Mature in the Fruit of the Spirit",
                  bar: "bg-teal",
                  text: "Our standard for spirituality and growth is the Fruit of the Spirit evident in our lives (Galatians 5:22-23). We dig for the roots of our sickness unto death and learn to respond to life out of new principles of thinking, feeling, and acting.",
                },
                {
                  title: "Pursue Love as Your Goal",
                  bar: "bg-coral",
                  text: "Love is the goal of our instruction (I Timothy 1:3-7). Without love we are nothing and can do nothing (1 Corinthians 13). We are training to become the love of God in the world — actually living it, not just talking about it.",
                },
                {
                  title: "Commit to Truth in All Things",
                  bar: "bg-sky",
                  text: "Truth is the cornerstone of Karis Fellowships. We learn to admit the truth about who we are without shame and condemnation (Psalm 15:2, Romans 8:1, John 8:31-32). We learn to give up our illusions about ourselves, others, the world, and God.",
                },
                {
                  title: "Experience Freedom from Fear",
                  bar: "bg-violet",
                  text: "Our greatest deliverance is from the bondage to the 'fear of death' (Hebrews 2:14-18). Mature love casts out all fear, and our goal is to have no fear but the fear of God (1 John 4:18).",
                },
              ].map(({ title, bar, text }) => (
                <div key={title} className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-border/30 transition-all hover:shadow-md">
                  <div className={`mb-4 h-1 w-10 rounded-full ${bar}`} />
                  <h3 className="font-bold text-foreground">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 overflow-hidden rounded-3xl bg-gradient-to-r from-teal-muted via-teal-muted/50 to-cream p-8 sm:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal">Express Your Unique</p>
            <h3 className="mt-1 text-2xl font-bold text-foreground">GLORY Here on Earth</h3>
            <p className="mt-4 max-w-3xl leading-relaxed text-slate">
              In our glory, we are expressing the character of God and our own
              unique qualities and work as His creatures. We come more and more
              into balance, living in correspondence and harmony within ourselves,
              with our community, and with the Creation. It is our designed nature
              to be in deep communion, correspondence, and harmony with God and His
              will. Through our glory we bring the will of God to Earth, as it is
              in Heaven.
            </p>
          </div>

          <div className="mt-20">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky">About Us</p>
            <h2 className="mt-2 text-2xl font-bold text-foreground">Who We Are</h2>
            <p className="mt-4 leading-relaxed text-slate">
              We are Christians who not only recognize how messed up we are, but
              choose a path of healing and reorienting to God. On this path, we
              train hard and rejoice in the tangible evidence of our growth.
            </p>

            <div className="mt-8 space-y-4">
              {[
                {
                  name: "Nancy Diven, Founder",
                  bar: "bg-teal",
                  bio: "Nancy earned a BA in classical culture from the University of Oklahoma. She is forever grateful for the guidance of two Oxford trained professors whom she met there and for the years of Bible study in the evangelical church. Karis Fellowships training is the result of God\u2019s work in her life and His clear call to offer to others this ministry of invitation.",
                },
                {
                  name: "Alison Tunnell Diven, Co-Founder",
                  bar: "bg-coral",
                  bio: "Alison is the co-founder of Karis Fellowships, Intl. In 2010, she helped Nancy make the move to an on-line ministry. She also helped develop the original KF training materials and created the first KF website. Alison lives in Oklahoma and continues to be a resource for the KF community.",
                },
                {
                  name: "Volunteers",
                  bar: "bg-violet",
                  bio: "We are blessed to receive karis gifts from many of our members. They facilitate book studies, help with administrative tasks, update the websites, edit teaching materials, and more. What a generous group of people!",
                },
              ].map(({ name, bar, bio }) => (
                <div key={name} className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-border/30">
                  <div className={`mb-3 h-1 w-8 rounded-full ${bar}`} />
                  <h3 className="font-bold text-foreground">{name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">{bio}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 rounded-2xl bg-slate-light p-7 text-sm leading-relaxed text-slate">
            Karis Fellowships International is a 501(c)(3) not-for-profit
            organization. We are 100% volunteer-run, which means we pay no
            salaries.
          </div>
        </div>
      </section>
    </>
  );
}
