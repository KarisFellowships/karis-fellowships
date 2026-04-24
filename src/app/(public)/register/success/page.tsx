import PageHeader from "@/components/PageHeader";
import Link from "next/link";

export default function RegisterSuccessPage() {
  return (
    <>
      <PageHeader
        title="Registration Complete"
        subtitle="Thank you for registering and for your generous gift!"
        accent="teal"
        image="/forest-light.jpg"
        imageAlt="Light breaking through the forest"
      />
      <section className="px-8 py-20 sm:py-28">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal/15">
            <svg className="h-8 w-8 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="mt-6 font-serif text-2xl font-semibold text-foreground">
            You&apos;re all set!
          </h2>
          <p className="mt-4 leading-relaxed text-slate">
            Check your email to confirm your account. Once confirmed, you can log in to access your NHG Book Study materials.
          </p>
          <Link
            href="/login"
            className="mt-8 inline-block rounded-xl bg-teal px-8 py-4 text-[13px] font-medium uppercase tracking-[0.15em] text-white transition-all hover:bg-teal-hover"
          >
            Go to Login
          </Link>
        </div>
      </section>
    </>
  );
}
