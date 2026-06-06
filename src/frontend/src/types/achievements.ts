export type AchievementRarity =
  | "common"
  | "uncommon"
  | "rare"
  | "epic"
  | "legendary";

export interface Achievement {
  id: string;
  name: string;
  description: string;
  rarity: AchievementRarity;
  category: AchievementCategory;
  unlockedAt?: number;
}

export type AchievementCategory =
  | "card-draw"
  | "special-cards"
  | "reps"
  | "streaks"
  | "sessions";

export const RARITY_CONFIG: Record<
  AchievementRarity,
  {
    label: string;
    glowColor: string;
    glowClass: string;
    animationType:
      | "pop"
      | "slide-shine"
      | "particle-burst"
      | "screen-flash"
      | "cinematic";
  }
> = {
  common: {
    label: "Common",
    glowColor: "#9ca3af",
    glowClass: "glow-common",
    animationType: "pop",
  },
  uncommon: {
    label: "Uncommon",
    glowColor: "#22c55e",
    glowClass: "glow-uncommon",
    animationType: "slide-shine",
  },
  rare: {
    label: "Rare",
    glowColor: "#3b82f6",
    glowClass: "glow-rare",
    animationType: "particle-burst",
  },
  epic: {
    label: "Epic",
    glowColor: "#a855f7",
    glowClass: "glow-epic",
    animationType: "screen-flash",
  },
  legendary: {
    label: "Legendary",
    glowColor: "#f59e0b",
    glowClass: "glow-legendary",
    animationType: "cinematic",
  },
};

export const CATEGORY_META: Record<
  AchievementCategory,
  { label: string; emoji: string }
> = {
  "card-draw": { label: "Card Draw", emoji: "🃏" },
  "special-cards": { label: "Special Cards", emoji: "👑" },
  reps: { label: "Reps", emoji: "💪" },
  streaks: { label: "Streaks", emoji: "🔥" },
  sessions: { label: "Sessions", emoji: "⏱" },
};

export const ALL_ACHIEVEMENTS: Achievement[] = [
  // Card Draw
  {
    id: "first_draw",
    name: "First Draw",
    description: "You drew your very first card",
    rarity: "common",
    category: "card-draw",
  },
  {
    id: "on_a_roll",
    name: "On a Roll",
    description: "Drew 10 cards in a single session",
    rarity: "common",
    category: "card-draw",
  },
  {
    id: "half_the_deck",
    name: "Half the Deck",
    description: "Made it halfway through",
    rarity: "uncommon",
    category: "card-draw",
  },
  {
    id: "full_deck",
    name: "Full Deck",
    description: "Completed an entire 52-card deck",
    rarity: "rare",
    category: "card-draw",
  },
  {
    id: "deck_destroyer",
    name: "Deck Destroyer",
    description: "Completed 10 full decks across all sessions",
    rarity: "epic",
    category: "card-draw",
  },
  {
    id: "card_shark",
    name: "Card Shark",
    description: "Completed 50 full decks across all sessions",
    rarity: "legendary",
    category: "card-draw",
  },

  // Special Cards
  {
    id: "double_or_nothing",
    name: "Double or Nothing",
    description: "Drew your first King card",
    rarity: "uncommon",
    category: "special-cards",
  },
  {
    id: "cut_in_half",
    name: "Cut in Half",
    description: "Drew your first Ace card",
    rarity: "uncommon",
    category: "special-cards",
  },
  {
    id: "wild_card",
    name: "Wild Card",
    description: "Drew your first Joker challenge card",
    rarity: "uncommon",
    category: "special-cards",
  },
  {
    id: "kings_court",
    name: "King's Court",
    description: "Drew 10 King cards across all sessions",
    rarity: "rare",
    category: "special-cards",
  },
  {
    id: "ace_up_your_sleeve",
    name: "Ace Up Your Sleeve",
    description: "Drew 10 Ace cards across all sessions",
    rarity: "rare",
    category: "special-cards",
  },
  {
    id: "jokers_wild",
    name: "Joker's Wild",
    description: "Drew 10 Joker cards across all sessions",
    rarity: "rare",
    category: "special-cards",
  },

  // Reps
  {
    id: "first_blood",
    name: "First Blood",
    description: "Completed your first rep",
    rarity: "common",
    category: "reps",
  },
  {
    id: "century",
    name: "Century",
    description: "Completed 100 total reps",
    rarity: "common",
    category: "reps",
  },
  {
    id: "grinder",
    name: "Grinder",
    description: "Completed 1,000 total reps",
    rarity: "uncommon",
    category: "reps",
  },
  {
    id: "iron_will",
    name: "Iron Will",
    description: "Completed 10,000 total reps",
    rarity: "rare",
    category: "reps",
  },
  {
    id: "unstoppable",
    name: "Unstoppable",
    description: "Completed 50,000 total reps",
    rarity: "epic",
    category: "reps",
  },
  {
    id: "legend",
    name: "Legend",
    description: "Completed 100,000 total reps",
    rarity: "legendary",
    category: "reps",
  },

  // Streaks
  {
    id: "just_getting_started",
    name: "Just Getting Started",
    description: "Completed a 3-day streak",
    rarity: "common",
    category: "streaks",
  },
  {
    id: "week_warrior",
    name: "Week Warrior",
    description: "Completed a 7-day streak",
    rarity: "uncommon",
    category: "streaks",
  },
  {
    id: "two_week_grind",
    name: "Two Week Grind",
    description: "Completed a 14-day streak",
    rarity: "uncommon",
    category: "streaks",
  },
  {
    id: "monthly_warrior",
    name: "Monthly Warrior",
    description: "Completed a 30-day streak",
    rarity: "rare",
    category: "streaks",
  },
  {
    id: "dedicated",
    name: "Dedicated",
    description: "Completed a 60-day streak",
    rarity: "epic",
    category: "streaks",
  },
  {
    id: "obsessed",
    name: "Obsessed",
    description: "Completed a 90-day streak",
    rarity: "legendary",
    category: "streaks",
  },

  // Sessions
  {
    id: "rookie",
    name: "Rookie",
    description: "Completed your first session",
    rarity: "common",
    category: "sessions",
  },
  {
    id: "getting_serious",
    name: "Getting Serious",
    description: "Completed 10 sessions",
    rarity: "common",
    category: "sessions",
  },
  {
    id: "committed",
    name: "Committed",
    description: "Completed 25 sessions",
    rarity: "uncommon",
    category: "sessions",
  },
  {
    id: "veteran",
    name: "Veteran",
    description: "Completed 50 sessions",
    rarity: "rare",
    category: "sessions",
  },
  {
    id: "elite",
    name: "Elite",
    description: "Completed 100 sessions",
    rarity: "epic",
    category: "sessions",
  },
  {
    id: "hall_of_fame",
    name: "Hall of Fame",
    description: "Completed 250 sessions",
    rarity: "legendary",
    category: "sessions",
  },
];
