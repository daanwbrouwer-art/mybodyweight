import type {
  Card,
  CardCount,
  Deck,
  JokerChallenge,
  Rank,
  RepSpec,
  SessionCard,
  Suit,
  WorkoutSessionView,
  WorkoutSummary,
} from "@/backend";

export type {
  Card,
  Deck,
  SessionCard,
  WorkoutSessionView,
  WorkoutSummary,
  JokerChallenge,
  CardCount,
  Suit,
  Rank,
  RepSpec,
};

export interface WorkoutState {
  selectedDeck: Deck | null;
  selectedCardCount: CardCount | null;
  sessionId: bigint | null;
  sessionView: WorkoutSessionView | null;
  currentCard: SessionCard | null;
  previousCard: SessionCard | null;
  summary: WorkoutSummary | null;
  isShuffling: boolean;
  isFlipping: boolean;
  jokerActive: boolean;
  jokerChallenge: JokerChallenge | null;
  playedCards: SessionCard[];
}

export type SuitSymbol = "♥" | "♠" | "♦" | "♣" | "🃏";
export type SuitColor = "red" | "black" | "joker";

export const SUIT_SYMBOL: Record<string, SuitSymbol> = {
  Hearts: "♥",
  Spades: "♠",
  Diamonds: "♦",
  Clubs: "♣",
  Joker: "🃏",
};

export const SUIT_COLOR: Record<string, SuitColor> = {
  Hearts: "red",
  Spades: "black",
  Diamonds: "red",
  Clubs: "black",
  Joker: "joker",
};

export const RANK_LABEL: Record<string, string> = {
  Two: "2",
  Three: "3",
  Four: "4",
  Five: "5",
  Six: "6",
  Seven: "7",
  Eight: "8",
  Nine: "9",
  Ten: "10",
  Jack: "J",
  Queen: "Q",
  King: "K",
  Ace: "A",
  Joker: "JOKER",
};

export const CARD_COUNT_LABEL: Record<string, string> = {
  Ten: "10 Cards",
  Twenty: "20 Cards",
  FullDeck: "52 Cards — Full Challenge",
};

export const JOKER_CHALLENGE_LABEL: Record<string, string> = {
  DeadHang30: "Dead Hang for 30 seconds",
};

export const JOKER_CHALLENGE_EMOJI: Record<string, string> = {
  DeadHang30: "🙌",
};
