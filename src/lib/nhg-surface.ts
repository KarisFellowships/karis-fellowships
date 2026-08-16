// Shared "frosted editorial" surface styles for the NHG page and its sub-components
// (Start Here, FAQ, Weekend Intensive, Intro Meeting block). Replaces the old solid
// deep-purple boxes (#2b2150 / #241c46 / #3f3573→#352b64) with a clean frosted-glass
// look — calmer and more like the weekly-meetings pages — while NHG keeps its violet
// ACCENTS (icons, numbers, links, badges) for its own identity. Tune here once.

// Standard card surface (utility boxes, bars, link cards). A frosted VIOLET glass
// so NHG keeps its purple identity while reading clean and calm.
export const nhgCard =
  "rounded-2xl border border-violet/25 bg-violet/[0.14] backdrop-blur-sm";

// Slightly more present surface for the larger "section" containers
// (Weekly Schedule, KF Introductory Meeting block).
export const nhgFeatured =
  "rounded-2xl border border-violet/25 bg-violet/[0.18] backdrop-blur-sm";

// A quieter nested surface (e.g. the Start Here step cards that carry their own image).
export const nhgNested =
  "rounded-2xl border border-violet/20 bg-violet/[0.10] backdrop-blur-sm";

// Append to a card that is itself a link/button, for the same gentle lift + brighten
// hover used on the weekly-meetings cards.
export const nhgCardHover =
  "transition-all duration-300 hover:-translate-y-0.5 hover:border-violet/40 hover:bg-violet/[0.22]";

// A lighter, less-frosted surface — used for the Weekend Intensive + Recordings so
// the weekly meeting cards (and Week 9) read as clearly more frosted/violet.
export const nhgCardLight =
  "rounded-2xl border border-violet/15 bg-violet/[0.07] backdrop-blur-sm";
export const nhgCardLightHover =
  "transition-all duration-300 hover:-translate-y-0.5 hover:border-violet/25 hover:bg-violet/[0.12]";
