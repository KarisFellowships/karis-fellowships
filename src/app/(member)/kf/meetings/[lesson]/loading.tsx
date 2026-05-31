export default function LessonLoading() {
  return (
    <div className="min-h-screen bg-[#4a5568] pt-20">
      <section className="relative z-10">
        <div className="h-40 animate-pulse bg-slate-dark/50" />
      </section>
      <section className="px-6 pb-12 pt-4">
        <div className="mx-auto max-w-4xl space-y-3">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 animate-pulse rounded-xl bg-[#1e293b]" />
            ))}
          </div>
          <div className="mt-6 space-y-4">
            <div className="h-6 w-1/3 animate-pulse rounded bg-white/5" />
            <div className="h-4 w-full animate-pulse rounded bg-white/5" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-white/5" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-white/5" />
          </div>
        </div>
      </section>
    </div>
  );
}
