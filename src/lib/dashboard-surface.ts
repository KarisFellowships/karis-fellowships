// Shared frosted-glass surface styles for the KF DASHBOARD. Keeps the dashboard's
// existing dark-slate identity and its per-section accent colors (teal / amber /
// sky / violet) — this only makes the old solid #1e293b boxes into translucent,
// blurred glass panels with a soft edge, so the page reads a touch frostier
// (closer to the NHG feel) without changing the color scheme. Tune here once.

// Standard card surface — a translucent slate glass over the #4a5568 page base.
export const dashCard =
  "rounded-2xl border border-white/12 bg-slate-dark/55 backdrop-blur-md";

// Same surface plus a gentle lift + brighten, for cards that are themselves links.
export const dashCardHover =
  "transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-slate-dark/70";
