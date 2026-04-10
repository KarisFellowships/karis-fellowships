import PageHeader from "@/components/PageHeader";
import StudyDonationBanner from "@/components/StudyDonationBanner";
import Link from "next/link";
import { createServerClient } from "@/lib/supabase-server";

const studyGuides = [
  { label: "Chapter 1 Study Guide", href: "/docs/other-studies/romans/1-Chap.-Study-Guide-Romans-2014-v3n.docx", type: "docx" },
  { label: "Chapter 2 Study Guide", href: "/docs/other-studies/romans/2-Chap.-Study-guide-2013-v3n.doc", type: "doc" },
  { label: "Chapter 3 Study Guide", href: "/docs/other-studies/romans/3-Ch.-study-guide-Romans-2013.doc", type: "doc" },
  { label: "Chapter 4 Study Guide", href: "/docs/other-studies/romans/4_Ch.-study-guide-Romans-2014.docx", type: "docx" },
  { label: "Chapter 5 Study Guide", href: "/docs/other-studies/romans/5-Ch.-Study-Guide-Romans-2014.docx", type: "docx" },
  { label: "Chapter 6 Study Guide", href: "/docs/other-studies/romans/6-Ch.-Study-Guide-Romans-2013.doc.docx", type: "docx" },
  { label: "Chapter 7 Study Guide", href: "/docs/other-studies/romans/7-Ch.-Study-Guide-Romans-2013.docx", type: "docx" },
  { label: "Chapter 8 Study Guide", href: "/docs/other-studies/romans/8-Ch.-Study-Guide-Romans-2014.docx", type: "docx" },
  { label: "Chapter 9 Study Guide", href: "/docs/other-studies/romans/9-Ch.-Study-Guide-Romans-2014.docx", type: "docx" },
  { label: "Chapter 10 Study Guide", href: "/docs/other-studies/romans/10-Ch-Study-Guide-Romans-2014.docx", type: "docx" },
  { label: "Chapter 11 Study Guide", href: "/docs/other-studies/romans/11-Ch.-Study-Guide-Romans-2014.docx", type: "docx" },
  { label: "Chapter 12 Study Guide", href: "/docs/other-studies/romans/Rom-12-Study-Guide-2014.docx", type: "docx" },
];

const summaries = [
  { label: "Chapter 1 Summary", href: "/docs/other-studies/romans/Ch.-1-Summary-Romans.pdf" },
  { label: "Chapter 2 Summary", href: "/docs/other-studies/romans/Summary-Ch.-2.docx", type: "docx" },
  { label: "Chapter 3 Summary", href: "/docs/other-studies/romans/Summary-3.docx", type: "docx" },
  { label: "Chapter 4 Summary", href: "/docs/other-studies/romans/Summary-Ch.-4.docx", type: "docx" },
  { label: "Chapter 5 Summary", href: "/docs/other-studies/romans/Summary-Ch.-5-2014.docx", type: "docx" },
  { label: "Chapter 6 Summary", href: "/docs/other-studies/romans/Summary-of-Chapter-6.docx", type: "docx" },
  { label: "Chapter 7 Summary", href: "/docs/other-studies/romans/Summary-Chapter-7.docx", type: "docx" },
  { label: "Chapter 8 Summary", href: "/docs/other-studies/romans/Summary-Chapter-8.docx", type: "docx" },
  { label: "Chapter 9 Summary", href: "/docs/other-studies/romans/Summary-Ch.-9.docx", type: "docx" },
];

export default async function RomansPage() {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  let hasDonated = false;
  if (user) {
    const { data: profile } = await supabase
      .from("users")
      .select("romans_donated")
      .eq("id", user.id)
      .single();
    hasDonated = profile?.romans_donated ?? false;
  }

  return (
    <div className="bg-slate-dark">
      <PageHeader title="Romans Bible Study" subtitle="A study through the book of Romans" accent="teal" />
      <section className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <StudyDonationBanner
            studyName="Romans"
            type="romans"
            hasDonated={hasDonated}
            userId={user?.id ?? ""}
            userEmail={user?.email ?? ""}
          />
          {/* Overview */}
          <a
            href="/docs/other-studies/romans/2016-KF-Overview-of-Romans.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-2xl bg-teal/10 ring-1 ring-teal/20 p-6 transition-all hover:bg-teal/15 hover:-translate-y-0.5"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal/20">
              <svg className="h-5 w-5 text-teal-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </span>
            <div>
              <h3 className="font-bold text-white group-hover:text-teal-light transition-colors">KF Overview of Romans</h3>
              <p className="mt-0.5 text-xs text-white/40">PDF</p>
            </div>
          </a>

          {/* Study Guides */}
          <div className="mt-10">
            <h2 className="text-xl font-bold text-white">Chapter Study Guides</h2>
            <div className="mt-4 grid gap-2">
              {studyGuides.map(({ label, href, type }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-xl bg-white/5 ring-1 ring-white/10 p-4 transition-all hover:bg-white/10 hover:-translate-y-0.5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal/15">
                    <svg className="h-4 w-4 text-teal-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </span>
                  <span className="flex-1 text-sm font-medium text-white/80 group-hover:text-white transition-colors">{label}</span>
                  {type && (
                    <span className="rounded-md bg-white/10 px-2 py-0.5 text-xs text-white/40 uppercase">{type}</span>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Chapter Summaries */}
          <div className="mt-10">
            <h2 className="text-xl font-bold text-white">Chapter Summaries</h2>
            <div className="mt-4 grid gap-2">
              {summaries.map(({ label, href, type }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-xl bg-white/5 ring-1 ring-white/10 p-4 transition-all hover:bg-white/10 hover:-translate-y-0.5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber/15">
                    <svg className="h-4 w-4 text-amber" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </span>
                  <span className="flex-1 text-sm font-medium text-white/80 group-hover:text-white transition-colors">{label}</span>
                  {type && (
                    <span className="rounded-md bg-white/10 px-2 py-0.5 text-xs text-white/40 uppercase">{type}</span>
                  )}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <Link href="/other-studies" className="text-sm font-medium text-teal-light hover:text-teal transition-colors">
              &larr; Back to Other Studies
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
