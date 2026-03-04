import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      <div className="relative hidden w-1/2 lg:block">
        <Image
          src="/ocean-horizon.jpg"
          alt="Ship sailing toward the horizon"
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

      <div className="flex w-full items-center justify-center px-6 py-32 lg:w-1/2">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal to-teal-hover text-sm font-bold text-white shadow-sm">
              K
            </span>
            <span className="text-xl font-bold text-foreground">Karis Fellowships</span>
          </div>
          <h1 className="mt-8 text-2xl font-bold text-foreground">Welcome back</h1>
          <p className="mt-1 text-sm text-slate">Sign in to access your materials.</p>

          <div className="mt-8 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate/60">Email</label>
              <input type="email" className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition-all focus:border-teal focus:ring-2 focus:ring-teal/15" placeholder="you@email.com" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate/60">Password</label>
              <input type="password" className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition-all focus:border-teal focus:ring-2 focus:ring-teal/15" placeholder="Your password" />
            </div>
            <button className="w-full rounded-xl bg-teal px-6 py-3.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-teal-hover hover:-translate-y-px">
              Log In
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-slate">
            Not a member yet?{" "}
            <Link href="/register" className="font-semibold text-teal hover:text-teal-hover">
              Register for NHG
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
