import { CardCount } from "@/backend";
import { resolveExerciseIllustration } from "@/data/exerciseAssets";
import type { LocalCard } from "@/store/workout";
import { useWorkoutStore } from "@/store/workout";
import type { JokerChallenge } from "@/types/workout";
import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";

// ─── Card Deck Builder ────────────────────────────────────────────────────────

const _JOKER_CHALLENGES: JokerChallenge[] = ["DeadHang30" as JokerChallenge];

function randChallenge(): JokerChallenge {
  return "DeadHang30" as JokerChallenge;
}

type SuitKey = "Hearts" | "Spades" | "Clubs" | "Diamonds";

const RANKS = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "Ace",
  "King",
];

const SUIT_EXERCISE_MAP: Record<SuitKey, Record<string, string>> = {
  Hearts: {
    "2": "Diamond Push Ups",
    "3": "Normal Push Ups",
    "4": "Close Grip Push Ups",
    "5": "Diamond Push Ups",
    "6": "Normal Push Ups",
    "7": "Close Grip Push Ups",
    "8": "Diamond Push Ups",
    "9": "Normal Push Ups",
    "10": "Close Grip Push Ups",
    "11": "Diamond Push Ups",
    "12": "Normal Push Ups",
    Ace: "",
    King: "",
  },
  Spades: {
    "2": "Chin Ups",
    "3": "Close Grip Pull Ups",
    "4": "Normal Pull Ups",
    "5": "Chin Ups",
    "6": "Close Grip Pull Ups",
    "7": "Normal Pull Ups",
    "8": "Chin Ups",
    "9": "Close Grip Pull Ups",
    "10": "Normal Pull Ups",
    "11": "Chin Ups",
    "12": "Normal Pull Ups",
    Ace: "",
    King: "",
  },
  Clubs: {
    "2": "Normal Rows",
    "3": "Chin Up Rows",
    "4": "Normal Rows",
    "5": "Chin Up Rows",
    "6": "Normal Rows",
    "7": "Chin Up Rows",
    "8": "Normal Rows",
    "9": "Chin Up Rows",
    "10": "Normal Rows",
    "11": "Chin Up Rows",
    "12": "Normal Rows",
    Ace: "",
    King: "",
  },
  Diamonds: {
    "2": "Dips",
    "3": "Dips",
    "4": "Dips",
    "5": "Dips",
    "6": "Dips",
    "7": "Dips",
    "8": "Dips",
    "9": "Dips",
    "10": "Dips",
    "11": "Dips",
    "12": "Dips",
    Ace: "",
    King: "",
  },
};

function buildFullDeck(): LocalCard[] {
  const suits: SuitKey[] = ["Hearts", "Spades", "Clubs", "Diamonds"];
  const suitsWithAceKing: SuitKey[] = ["Hearts", "Spades"];
  const cards: LocalCard[] = [];

  for (const suit of suits) {
    for (const rank of RANKS) {
      const isAce = rank === "Ace";
      const isKing = rank === "King";
      // Only generate Ace and King for Hearts and Spades
      if ((isAce || isKing) && !suitsWithAceKing.includes(suit)) continue;
      const rankNum = isAce || isKing ? 0 : Number(rank);
      const exerciseName = SUIT_EXERCISE_MAP[suit][rank] ?? "";
      cards.push({
        id: `${suit}-${rank}`,
        rank,
        suit,
        exerciseName,
        reps: rankNum,
        isJoker: false,
        isAce,
        isKing,
      });
    }
  }

  // 2 Jokers
  for (let j = 0; j < 2; j++) {
    const challenge = randChallenge();
    cards.push({
      id: `Joker-${j}`,
      rank: "Joker",
      suit: "Joker",
      exerciseName: "Dead Hang",
      reps: 30,
      isJoker: true,
      isAce: false,
      isKing: false,
      challenge,
    });
  }

  return cards;
}

function fisherYatesShuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j] as T, a[i] as T];
  }
  return a;
}

function cardCountToNumber(cc: CardCount): number {
  if (cc === CardCount.Ten) return 10;
  if (cc === CardCount.Twenty) return 20;
  return 52;
}

function ensureNoConsecutiveExercises(deck: LocalCard[]): LocalCard[] {
  if (deck.length < 2) return deck;

  // Build effective exercise names for each position
  const effective: string[] = [];
  for (let i = 0; i < deck.length; i++) {
    const card = deck[i]!;
    if (card.isAce || card.isKing) {
      // Look back to find the previous non-modifier card
      let prev = "";
      for (let j = i - 1; j >= 0; j--) {
        if (!deck[j]!.isAce && !deck[j]!.isKing) {
          prev = deck[j]!.exerciseName;
          break;
        }
      }
      effective.push(prev);
    } else {
      effective.push(card.exerciseName);
    }
  }

  let changed = true;
  let iterations = 0;
  const maxIterations = deck.length * 2;

  while (changed && iterations < maxIterations) {
    changed = false;
    iterations++;

    for (let i = 0; i < deck.length - 1; i++) {
      if (effective[i] === effective[i + 1] && effective[i] !== "") {
        // Find next card with a different effective exercise
        let swapIdx = -1;
        for (let j = i + 2; j < deck.length; j++) {
          const cardJ = deck[j]!;
          const effJ =
            cardJ.isAce || cardJ.isKing ? effective[j] : cardJ.exerciseName;
          if (effJ !== effective[i]) {
            swapIdx = j;
            break;
          }
        }

        if (swapIdx === -1) {
          // Try searching from the end of the deck for any different exercise
          for (let j = deck.length - 1; j > i + 1; j--) {
            const cardJ = deck[j]!;
            const effJ =
              cardJ.isAce || cardJ.isKing ? effective[j] : cardJ.exerciseName;
            if (effJ !== effective[i]) {
              swapIdx = j;
              break;
            }
          }
        }

        if (swapIdx > i + 1) {
          // Swap positions i+1 and swapIdx
          const temp = deck[i + 1]!;
          deck[i + 1] = deck[swapIdx]!;
          deck[swapIdx] = temp;

          // Rebuild effective array from position i onward
          for (let k = i; k < deck.length; k++) {
            const card = deck[k]!;
            if (card.isAce || card.isKing) {
              let prev = "";
              for (let j = k - 1; j >= 0; j--) {
                if (!deck[j]!.isAce && !deck[j]!.isKing) {
                  prev = deck[j]!.exerciseName;
                  break;
                }
              }
              effective[k] = prev;
            } else {
              effective[k] = card.exerciseName;
            }
          }
          changed = true;
        }
      }
    }
  }

  return deck;
}

function buildLocalDeck(_deckId: string, cardCount: number): LocalCard[] {
  let full = fisherYatesShuffle(buildFullDeck());

  // Never start with King or Ace — swap with first non-modifier card
  if (full.length > 0 && (full[0]?.isAce || full[0]?.isKing)) {
    const swapIdx = full.findIndex((c, i) => i > 0 && !c.isAce && !c.isKing);
    if (swapIdx > 0) {
      const temp = full[0]!;
      full[0] = full[swapIdx]!;
      full[swapIdx] = temp;
    }
  }

  // Prevent consecutive same-exercise cards (including Ace/King inheriting previous exercise)
  full = ensureNoConsecutiveExercises(full);

  const deck = full.slice(0, cardCount);

  // Preload all exercise images for instant display during workout
  setTimeout(() => {
    const seen = new Set<string>();
    for (const card of deck) {
      const src = resolveExerciseIllustration(card.exerciseName);
      if (!seen.has(src)) {
        seen.add(src);
        const img = new Image();
        img.src = src;
      }
    }
  }, 0);

  return deck;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useWorkout() {
  const store = useWorkoutStore();
  const navigate = useNavigate();

  const startWorkout = useCallback(
    async (customCount?: number) => {
      const { selectedDeck, selectedCardCount } = store;
      if (!selectedDeck) return;
      if (!customCount && !selectedCardCount) return;

      const cardCount = customCount ?? cardCountToNumber(selectedCardCount!);
      store.setIsShuffling(true);

      // Shuffle animation delay
      await new Promise((r) => setTimeout(r, 1200));

      const deck = buildLocalDeck(String(selectedDeck.id), cardCount);
      store.setShuffledDeck(deck, cardCount);
      store.setWorkoutStartTime(Date.now());
      store.advanceDeck(); // Set first card
      store.setIsShuffling(false);

      navigate({ to: "/workout/session" });
    },
    [store, navigate],
  );

  const drawNextCard = useCallback(() => {
    store.setIsFlipping(true);
    setTimeout(() => {
      store.advanceDeck();
      store.setIsFlipping(false);
    }, 400);
  }, [store]);

  const goBackCard = useCallback(() => {
    store.setIsFlipping(true);
    setTimeout(() => {
      store.goBackCard();
      store.setIsFlipping(false);
    }, 300);
  }, [store]);

  const markSummary = useCallback(() => {
    store.setIsSummary(true);
  }, [store]);

  const dismissJoker = useCallback(() => {
    store.setJokerActive(false);
    store.setJokerChallenge(null);
  }, [store]);

  const resetWorkout = useCallback(() => {
    store.reset();
  }, [store]);

  const getWorkoutStats = useCallback(() => {
    const { workoutStartTime, deckIndex, totalCards } = store;
    const elapsedSeconds = workoutStartTime
      ? Math.floor((Date.now() - workoutStartTime) / 1000)
      : 0;
    const completedCards = Math.max(0, deckIndex + 1);
    const remainingCards = Math.max(0, totalCards - deckIndex - 1);
    const estimatedCalories = Math.round(completedCards * 3.5);
    return {
      elapsedSeconds,
      completedCards,
      remainingCards,
      estimatedCalories,
    };
  }, [store]);

  return {
    startWorkout,
    drawNextCard,
    goBackCard,
    cardHistoryLength: store.cardHistory.length,
    markSummary,
    dismissJoker,
    resetWorkout,
    getWorkoutStats,
    store,
  };
}
