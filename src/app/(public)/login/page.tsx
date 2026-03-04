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
        <div className="absolute inset-0 bg-teal-deep/50" />
        <div className="absolute bottom-12 left-10 right-10">
          <p className="text-2xl font-bold text-white">
            &ldquo;On this path, we train hard and rejoice in the tangible
            evidence of our growth.&rdquo;
          </p>
        </div>
      </div>

      <div className="flex w-full items-center justify-center bg-slate-dark px-6 py-32 lg:w-1/2">
        <div className="w-full max-w-sm">
          <span className="text-xl font-bold text-white">Karis Fellowships</span>
          <h1 className="mt-8 text-2xl font-bold text-white">Welcome back</h1>
          <p className="mt-1 text-sm text-white/50">Empowering Christians to fulfill their true glory.</p>

          <div className="mt-8 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/40">Email</label>
              <input type="email" className="mt-1.5 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-all focus:border-teal focus:ring-2 focus:ring-teal/15 placeholder:text-white/25" placeholder="you@email.com" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/40">Password</label>
              <input type="password" className="mt-1.5 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-all focus:border-teal focus:ring-2 focus:ring-teal/15 placeholder:text-white/25" placeholder="Your password" />
            </div>
            <button className="w-full rounded-xl bg-teal px-6 py-3.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-teal-hover hover:-translate-y-px">
              Log In
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-white/40">
            Not a member yet?{" "}
            <Link href="/register" className="font-semibold text-teal-light hover:text-teal">
              Register for NHG
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
