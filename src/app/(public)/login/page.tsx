import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      <div className="relative hidden w-1/2 lg:block">
        <Image
          src="/ocean-horizon.jpg"
          alt="Vast ocean horizon"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-slate-dark/40" />
        <div className="absolute bottom-16 left-12 right-12">
          <span className="font-serif text-3xl font-light leading-snug text-white/80">
            &ldquo;On this path, we train hard and rejoice in the tangible
            evidence of our growth.&rdquo;
          </span>
        </div>
      </div>

      <div className="flex w-full items-center justify-center bg-slate-dark px-8 py-32 lg:w-1/2">
        <div className="w-full max-w-sm">
          <span className="font-serif text-2xl font-semibold tracking-wide text-white">Karis Fellowships</span>
          <h1 className="mt-10 font-serif text-3xl font-semibold text-white">Welcome back</h1>
          <p className="mt-2 text-sm text-white/60">Empowering Christians to fulfill their true glory.</p>

          <div className="mt-10 space-y-5">
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">Email</label>
              <input type="email" className="mt-2 w-full rounded-xl border border-white/15 bg-white/[0.05] px-5 py-3.5 text-sm text-white outline-none transition-all focus:border-teal/40 focus:ring-2 focus:ring-teal/10 placeholder:text-white/30" placeholder="you@email.com" />
            </div>
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">Password</label>
              <input type="password" className="mt-2 w-full rounded-xl border border-white/15 bg-white/[0.05] px-5 py-3.5 text-sm text-white outline-none transition-all focus:border-teal/40 focus:ring-2 focus:ring-teal/10 placeholder:text-white/30" placeholder="Your password" />
            </div>
            <button className="w-full rounded-xl bg-teal/90 px-6 py-4 text-[13px] font-medium uppercase tracking-[0.15em] text-white transition-all duration-500 hover:bg-teal">
              Log In
            </button>
          </div>

          <p className="mt-10 text-center text-sm text-white/50">
            Not a member yet?{" "}
            <Link href="/register" className="text-teal-light underline underline-offset-4 decoration-teal-light/30 hover:decoration-teal-light/60 transition-colors">
              Register for NHG
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
