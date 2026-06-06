/**
 * exerciseAssets.ts
 * Maps exercise names to illustration paths and defines suit config
 * for the premium workout card deck.
 */

export type SuitKey = "Hearts" | "Spades" | "Clubs" | "Diamonds" | "Joker";

export interface SuitConfig {
  symbol: string;
  label: string;
  accent: string;
  glowColor: string;
  gradientFrom: string;
  gradientTo: string;
}

export const SUIT_CONFIG: Record<string, SuitConfig> = {
  Hearts: {
    symbol: "\u2665",
    label: "PUSH UPS",
    accent: "oklch(0.65 0.22 25)",
    glowColor: "oklch(0.65 0.22 25 / 0.35)",
    gradientFrom: "oklch(0.09 0.015 310)",
    gradientTo: "oklch(0.12 0.01 20)",
  },
  Spades: {
    symbol: "\u2660",
    label: "PULL UPS",
    accent: "oklch(0.72 0.04 240)",
    glowColor: "oklch(0.72 0.04 240 / 0.30)",
    gradientFrom: "oklch(0.09 0.02 240)",
    gradientTo: "oklch(0.12 0.015 250)",
  },
  Clubs: {
    symbol: "\u2663",
    label: "ROWS",
    accent: "oklch(0.72 0.19 145)",
    glowColor: "oklch(0.72 0.19 145 / 0.30)",
    gradientFrom: "oklch(0.09 0.02 150)",
    gradientTo: "oklch(0.11 0.025 145)",
  },
  Diamonds: {
    symbol: "\u2666",
    label: "DIPS",
    accent: "oklch(0.65 0.18 250)",
    glowColor: "oklch(0.65 0.18 250 / 0.30)",
    gradientFrom: "oklch(0.09 0.02 250)",
    gradientTo: "oklch(0.12 0.025 255)",
  },
  Joker: {
    symbol: "\u2605",
    label: "WILD",
    accent: "oklch(0.68 0.25 180)",
    glowColor: "oklch(0.68 0.25 180 / 0.40)",
    gradientFrom: "oklch(0.08 0.02 260)",
    gradientTo: "oklch(0.08 0.025 255)",
  },
};

/** Normalizes an exercise name to a lowercase key for matching. */
function normalizeKey(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .trim();
}

/**
 * Maps exercise name keywords to local illustration paths.
 * Listed most-specific first so the first match wins.
 */
const EXERCISE_ILLUSTRATION_MAP: Array<[string[], string]> = [
  // Push Ups — Hearts
  [
    ["diamond push", "diamond pushup", "diamond push up"],
    "/assets/exercises/diamond_pushup.png",
  ],
  [
    [
      "close grip push",
      "close-grip push",
      "close grip push up",
      "closegrip push",
    ],
    "/assets/exercises/wide_pushup.png",
  ],
  [
    ["wide push", "wide pushup", "wide push up"],
    "/assets/exercises/wide_pushup.png",
  ],
  [
    [
      "normal push",
      "normal pushup",
      "normal push up",
      "push up",
      "pushup",
      "push ups",
    ],
    "/assets/exercises/normal_pushup.png",
  ],

  // Rows — Clubs (must come BEFORE "chin up" pull-up entry to avoid false match)
  [
    [
      "chin up row",
      "chin-up row",
      "chinup row",
      "chin rows",
      "chin up rows",
      "chin-up rows",
      "chinup rows",
    ],
    // Horizontal pulling movement with underhand grip (bodyweight row under a bar)
    "/assets/exercises/chinup_rows.png",
  ],

  // Pull Ups — Spades
  [
    [
      "close grip pull",
      "close-grip pull",
      "closegrip pull",
      "chin up pull",
      "chin-up pull",
    ],
    "/assets/exercises/closegrip_pullups.png",
  ],
  [
    ["chin up", "chin-up", "chinup", "chin ups"],
    "/assets/exercises/chinup_pullup.png",
  ],
  [
    ["wide pull", "wide pullup", "wide pull up"],
    "/assets/exercises/wide_pullup.png",
  ],
  [
    [
      "normal pull",
      "normal pullup",
      "normal pull up",
      "pull up",
      "pullup",
      "pull ups",
    ],
    "/assets/exercises/normal_pullup.png",
  ],
  [
    ["normal row", "normal rows", "rows", "row"],
    "/assets/exercises/normal_rows.png",
  ],

  // Dips — Diamonds
  [["dip", "dips"], "/assets/exercises/dips.png"],

  // Joker challenges
  [["dead hang", "deadhang", "hang"], "/assets/exercises/normal_pullup.png"],
];

/**
 * Returns the best matching illustration path for an exercise name.
 * Falls back to normal_pushup.png if nothing matches.
 */
export function resolveExerciseIllustration(exerciseName: string): string {
  const key = normalizeKey(exerciseName);
  for (const [keywords, path] of EXERCISE_ILLUSTRATION_MAP) {
    for (const kw of keywords) {
      if (key.includes(kw)) return path;
    }
  }
  return "/assets/exercises/normal_pushup.png";
}

/** Returns the suit config for a given suit string. */
export function getSuitConfig(suit: string): SuitConfig {
  return SUIT_CONFIG[suit] ?? SUIT_CONFIG.Hearts;
}
