import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-dark px-6 text-center">
      <p className="text-6xl font-bold text-teal">404</p>
      <h1 className="mt-4 font-serif text-2xl font-semibold text-white sm:text-3xl">
        Page Not Found
      </h1>
      <p className="mt-3 max-w-md text-white/60">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-xl bg-teal px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-hover"
      >
        Back to Home
      </Link>
    </div>
  );
}
