// Coordinates traced from the approved, unmodified 1672 × 941 IMAGE 01.
// These are boundaries of its existing photographic strips, not new shapes.
import { pageVisuals } from "@/content/page-visuals";
export const HERO_SOURCE = pageVisuals.home;

export const HERO_FRAGMENTS = [
  { id: "left", x: 601, y: 164, width: 99, height: 664, offset: -8 },
  { id: "recess", x: 703, y: 0, width: 108, height: 735, offset: 10 },
  { id: "seam", x: 814, y: 199, width: 69, height: 488, offset: -6 },
  { id: "core", x: 885, y: 0, width: 153, height: 810, offset: 0 },
  { id: "lower", x: 1039, y: 0, width: 99, height: 888, offset: 0 },
  { id: "right", x: 1141, y: 54, width: 97, height: 763, offset: 8 },
  { id: "outer", x: 1241, y: 137, width: 61, height: 598, offset: -10 },
] as const;

export const RESIDUE_FRAGMENTS = HERO_FRAGMENTS.filter((fragment) =>
  ["left", "core", "right"].includes(fragment.id),
);

