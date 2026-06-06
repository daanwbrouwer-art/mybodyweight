import type { CardCount } from "@/backend";
import type { Deck } from "@/types/workout";
import type { JokerChallenge } from "@/types/workout";
import { create } from "zustand";

export interface LocalCard {
  id: string;
  rank: string;
  suit: string;
  exerciseName: string;
  reps: number;
  isJoker: boolean;
  isAce: boolean;
  isKing: boolean;
  videoUrl?: string;
  challenge?: JokerChallenge;
}

export interface LocalSessionCard {
  card: {
    id: string;
    rank: string;
    suit: string;
    exercise: string;
    videoUrl?: string;
  };
  reps: number;
  isMod?: boolean;
  challenge?: JokerChallenge;
}

interface WorkoutState {
  selectedDeck: Deck | null;
  selectedCardCount: CardCount | null;
  shuffledDeck: LocalCard[];
  deckIndex: number;
  workoutStartTime: number | null;
  currentCard: LocalSessionCard | null;
  previousCard: LocalSessionCard | null;
  cardHistory: LocalSessionCard[];
  isShuffling: boolean;
  isFlipping: boolean;
  jokerActive: boolean;
  jokerChallenge: JokerChallenge | null;
  isSummary: boolean;
  totalCards: number;
  guestMode: boolean;
}

interface WorkoutActions {
  setSelectedDeck: (deck: Deck | null) => void;
  setSelectedCardCount: (count: CardCount | null) => void;
  setShuffledDeck: (deck: LocalCard[], cardCount: number) => void;
  advanceDeck: () => void;
  goBackCard: () => void;
  setWorkoutStartTime: (t: number | null) => void;
  setIsShuffling: (v: boolean) => void;
  setIsFlipping: (v: boolean) => void;
  setJokerActive: (v: boolean) => void;
  setJokerChallenge: (c: JokerChallenge | null) => void;
  setIsSummary: (v: boolean) => void;
  setGuestMode: (v: boolean) => void;
  reset: () => void;
}

const initialState: WorkoutState = {
  selectedDeck: null,
  selectedCardCount: null,
  shuffledDeck: [],
  deckIndex: -1,
  workoutStartTime: null,
  currentCard: null,
  previousCard: null,
  cardHistory: [],
  isShuffling: false,
  isFlipping: false,
  jokerActive: false,
  jokerChallenge: null,
  isSummary: false,
  totalCards: 0,
  guestMode: false,
};

export const useWorkoutStore = create<WorkoutState & WorkoutActions>(
  (set, get) => ({
    ...initialState,

    setSelectedDeck: (deck) => set({ selectedDeck: deck }),
    setSelectedCardCount: (count) => set({ selectedCardCount: count }),

    setShuffledDeck: (deck, cardCount) =>
      set({
        shuffledDeck: deck,
        totalCards: cardCount,
        deckIndex: -1,
        currentCard: null,
        previousCard: null,
        cardHistory: [],
        isSummary: false,
      }),

    advanceDeck: () => {
      const { shuffledDeck, deckIndex, currentCard, totalCards } = get();
      const nextIndex = deckIndex + 1;
      if (nextIndex >= totalCards) {
        set({ isSummary: true });
        return;
      }
      const nextRaw = shuffledDeck[nextIndex];
      if (!nextRaw) return;

      // Resolve ACE / KING reps from previousCard
      let resolvedReps = nextRaw.reps;
      let resolvedExercise = nextRaw.exerciseName;
      if (nextRaw.isAce && currentCard) {
        resolvedReps = currentCard.reps * 2;
        resolvedExercise = currentCard.card.exercise;
      } else if (nextRaw.isKing && currentCard) {
        resolvedReps = Math.max(1, Math.ceil(currentCard.reps / 2));
        resolvedExercise = currentCard.card.exercise;
      }

      const nextCard: LocalSessionCard = {
        card: {
          id: nextRaw.id,
          rank: nextRaw.rank,
          suit: nextRaw.suit,
          exercise: resolvedExercise,
          videoUrl: nextRaw.videoUrl,
        },
        reps: resolvedReps,
        isMod: nextRaw.isAce || nextRaw.isKing,
        challenge: nextRaw.challenge,
      };

      const { cardHistory } = get();
      set({
        previousCard: currentCard,
        currentCard: nextCard,
        cardHistory: currentCard ? [...cardHistory, currentCard] : cardHistory,
        deckIndex: nextIndex,
        jokerActive: nextRaw.isJoker,
        jokerChallenge: nextRaw.isJoker ? (nextRaw.challenge ?? null) : null,
      });
    },

    goBackCard: () => {
      const { cardHistory, deckIndex } = get();
      if (cardHistory.length === 0) return;
      const history = [...cardHistory];
      const prevCard = history.pop()!;
      set({
        currentCard: prevCard,
        cardHistory: history,
        deckIndex: Math.max(0, deckIndex - 1),
        jokerActive: false,
        jokerChallenge: null,
      });
    },

    setWorkoutStartTime: (t) => set({ workoutStartTime: t }),
    setIsShuffling: (v) => set({ isShuffling: v }),
    setIsFlipping: (v) => set({ isFlipping: v }),
    setJokerActive: (v) => set({ jokerActive: v }),
    setJokerChallenge: (c) => set({ jokerChallenge: c }),
    setIsSummary: (v) => set({ isSummary: v }),
    setGuestMode: (v) => set({ guestMode: v }),
    reset: () => set({ ...initialState, guestMode: get().guestMode }),
  }),
);
