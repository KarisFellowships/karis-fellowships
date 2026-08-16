// Shared styling for the KF lesson resource cards. Imported by the lesson page
// AND CallInfoRow so the cards can never drift apart (they were hand-duplicated
// before). On mobile each card is a short horizontal "tab" (icon + label on one
// row) so the stack stays compact and the meeting teaching just below is easy to
// reach; from sm+ they expand into the centered editorial boxes. Sized to fit six
// across on desktop, with labels that wrap to a reserved two-line block so every
// card keeps the same height and its icon stays aligned.
export const cardClass =
  "group flex flex-row items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/[0.14] px-3 py-3 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/45 hover:bg-white/[0.22] hover:shadow-lg hover:shadow-black/20 sm:flex-col sm:gap-0 sm:py-5";

export const iconClass =
  "h-6 w-6 shrink-0 transition-transform duration-300 group-hover:scale-110";

export const labelClass =
  "font-serif text-lg leading-tight text-white/90 transition-colors group-hover:text-white sm:mt-2.5 sm:block sm:min-h-[2.5em] sm:text-xl";

export const hintClass =
  "text-[13px] font-medium uppercase tracking-[0.2em] text-white/35 sm:mt-1";
