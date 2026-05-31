export default function MemberLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-dark">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-teal" />
        <p className="text-sm text-white/40">Loading...</p>
      </div>
    </div>
  );
}
