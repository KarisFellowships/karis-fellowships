import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import { requireKF } from "@/lib/require-tier";

// "Getting Started in KF" — copy is verbatim from the current KF website (per
// Sarah's "getting started KF section" doc). The only edits are directional:
// references to where to find things now point to the new site's pages
// (Call-In Info, KF Weekly Meetings).
export default async function KFStartHerePage() {
  await requireKF();
  return (
    <div className="min-h-screen bg-[#4a5568]">
      <PageHeader title="Getting Started in KF" subtitle="Welcome to Karis Fellowships." accent="teal" image="/ocean-horizon.jpg" imageAlt="Vast ocean horizon" payg />
      <section className="px-6 py-10 sm:py-12">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="rounded-2xl border border-white/12 bg-white/[0.06] p-6 backdrop-blur-sm sm:p-8">
            <h2 className="font-serif text-2xl font-semibold text-white">Welcome to Karis Fellowships!</h2>
            <p className="mt-3 leading-relaxed text-white/70">
              We are excited that you&rsquo;ve chosen to pursue your training and real potential after completing the
              book study. Here&rsquo;s a little guide to getting started in KF.
            </p>
          </div>

          <div className="rounded-2xl border border-white/12 bg-white/[0.06] p-6 backdrop-blur-sm sm:p-8">
            <h3 className="font-serif text-xl font-semibold text-white">First Steps</h3>
            <ol className="mt-4 space-y-4 text-white/70">
              <li className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal/20 text-sm font-bold text-teal-light">1</span>
                <span className="leading-relaxed">
                  Find your meeting&rsquo;s phone number and access code on the{" "}
                  <Link href="/kf/call-info" className="font-semibold text-teal-light hover:underline">Call-In Info</Link>{" "}
                  page. Just as in the NHG book study, we use StartMeeting for our 1.5 hour meetings.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal/20 text-sm font-bold text-teal-light">2</span>
                <span className="leading-relaxed">
                  Download your 3 meeting guides on the{" "}
                  <Link href="/kf" className="font-semibold text-teal-light hover:underline">KF Weekly Meetings</Link>{" "}
                  page: the Meeting Schedule, the KF Meeting Prep Guide, and the Love or Pride? list.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal/20 text-sm font-bold text-teal-light">3</span>
                <span className="leading-relaxed">
                  With the guidance of the Love or Pride? list, gently try to fill out a KF Meeting Prep Guide.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal/20 text-sm font-bold text-teal-light">4</span>
                <span className="leading-relaxed">
                  Attend your first meeting! We invite you to follow your level of comfort and either observe your first
                  couple of meetings without sharing, or dive in and share immediately.
                </span>
              </li>
            </ol>
          </div>

          <div className="rounded-2xl border border-white/12 bg-white/[0.06] p-6 backdrop-blur-sm sm:p-8">
            <h3 className="font-serif text-xl font-semibold text-white">Tips for Getting the Most out of KF Right Away</h3>
            <div className="mt-5 space-y-5">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-teal-light">Review the KF Intro Meeting Notes</h4>
                <p className="mt-1.5 leading-relaxed text-white/70">
                  Whether or not you were able to attend an introductory meeting, we suggest that you read the notes from
                  that meeting to help orient you. (Visit the{" "}
                  <Link href="/kf" className="font-semibold text-teal-light hover:underline">KF Weekly Meetings</Link>{" "}
                  page to find the notes.) Our meetings follow an unusual format and flow, which become comfortable with a
                  little familiarity.
                </p>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-teal-light">When You Miss a Meeting</h4>
                <p className="mt-1.5 leading-relaxed text-white/70">
                  Because each week&rsquo;s teachings build on one another, it helps tremendously to either listen to the
                  playback recording of your missed meeting or attend a different meeting time that same week.
                </p>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-teal-light">Attend Any (and as Many) Meetings as You Wish</h4>
                <p className="mt-1.5 leading-relaxed text-white/70">
                  You can visit any of the other meeting times, and you can even attend multiple meetings in a week. Some
                  KF members appreciate this latter option in periods of great stress or challenge.
                </p>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-teal-light">Start a 3-Ring Binder</h4>
                <p className="mt-1.5 leading-relaxed text-white/70">
                  Have your tools accessible from the beginning by using a small 3-ring binder to hold printed copies of
                  your Meeting Schedule, Love or Pride?, and Meeting Prep Guides. You may wish to print several copies of
                  the prep guides so that they are ready and waiting for you. We suggest that you do the same as we
                  introduce new tools to you in the coming weeks. It&rsquo;s far easier to use them when you need them if
                  they&rsquo;re already printed and stored in a safe place.
                </p>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-teal-light">Revisit the Teachings Throughout the Week</h4>
                <p className="mt-1.5 leading-relaxed text-white/70">
                  So much information goes by in a meeting! You may wish to listen to the playback while exercising or
                  driving, or to download the teaching notes to review. You can keep the notes open in an Internet browser
                  window on your phone or computer to make it easy to re-read them in tiny 2-3 minute nibbles.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/12 bg-white/[0.06] p-6 backdrop-blur-sm sm:p-8">
            <h3 className="font-serif text-xl font-semibold text-white">What KF Is . . . and Isn&rsquo;t</h3>
            <p className="mt-3 leading-relaxed text-white/70">
              Karis Fellowships is an effort-based ministry, not a need-based ministry. You&rsquo;ve already worked hard to
              graduate from the book study. Bravo! Now, KF offers real training and support for recovering the person God
              created you to be. This does require more work. While we may be used to getting support and help based on our
              needs, in KF we show our commitment to the work by responding to the training.
            </p>
            <p className="mt-3 leading-relaxed text-white/70">
              The first tool in KF is the weekly meeting. Our first effort is just to show up. By showing up we offer
              evidence of our commitment to train in a healthier life which is more congruent with our faith and calling
              in Jesus.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
