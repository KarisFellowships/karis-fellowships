"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-dark px-6 text-center">
      <p className="text-6xl font-bold text-coral">Oops</p>
      <h1 className="mt-4 font-serif text-2xl font-semibold text-white sm:text-3xl">
        Something went wrong
      </h1>
      <p className="mt-3 max-w-md text-white/60">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={() => reset()}
        className="mt-8 rounded-xl bg-teal px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-hover"
      >
        Try Again
      </button>
    </div>
  );
}
