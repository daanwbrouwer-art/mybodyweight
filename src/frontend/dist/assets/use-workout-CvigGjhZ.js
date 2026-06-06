import { C as CardCount } from "./backend-Bt8BEzt7.js";
import { a as useWorkoutStore, u as useNavigate, r as reactExports } from "./index-DqGOMkPn.js";
const SUIT_CONFIG = {
  Hearts: {
    symbol: "♥",
    label: "PUSH UPS",
    accent: "oklch(0.65 0.22 25)",
    glowColor: "oklch(0.65 0.22 25 / 0.35)",
    gradientFrom: "oklch(0.09 0.015 310)",
    gradientTo: "oklch(0.12 0.01 20)"
  },
  Spades: {
    symbol: "♠",
    label: "PULL UPS",
    accent: "oklch(0.72 0.04 240)",
    glowColor: "oklch(0.72 0.04 240 / 0.30)",
    gradientFrom: "oklch(0.09 0.02 240)",
    gradientTo: "oklch(0.12 0.015 250)"
  },
  Clubs: {
    symbol: "♣",
    label: "ROWS",
    accent: "oklch(0.72 0.19 145)",
    glowColor: "oklch(0.72 0.19 145 / 0.30)",
    gradientFrom: "oklch(0.09 0.02 150)",
    gradientTo: "oklch(0.11 0.025 145)"
  },
  Diamonds: {
    symbol: "♦",
    label: "DIPS",
    accent: "oklch(0.65 0.18 250)",
    glowColor: "oklch(0.65 0.18 250 / 0.30)",
    gradientFrom: "oklch(0.09 0.02 250)",
    gradientTo: "oklch(0.12 0.025 255)"
  },
  Joker: {
    symbol: "★",
    label: "WILD",
    accent: "oklch(0.68 0.25 180)",
    glowColor: "oklch(0.68 0.25 180 / 0.40)",
    gradientFrom: "oklch(0.08 0.02 260)",
    gradientTo: "oklch(0.08 0.025 255)"
  }
};
function normalizeKey(name) {
  return name.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim();
}
const EXERCISE_ILLUSTRATION_MAP = [
  // Push Ups — Hearts
  [
    ["diamond push", "diamond pushup", "diamond push up"],
    "/assets/exercises/diamond_pushup.png"
  ],
  [
    [
      "close grip push",
      "close-grip push",
      "close grip push up",
      "closegrip push"
    ],
    "/assets/exercises/wide_pushup.png"
  ],
  [
    ["wide push", "wide pushup", "wide push up"],
    "/assets/exercises/wide_pushup.png"
  ],
  [
    [
      "normal push",
      "normal pushup",
      "normal push up",
      "push up",
      "pushup",
      "push ups"
    ],
    "/assets/exercises/normal_pushup.png"
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
      "chinup rows"
    ],
    // Horizontal pulling movement with underhand grip (bodyweight row under a bar)
    "/assets/exercises/chinup_rows.png"
  ],
  // Pull Ups — Spades
  [
    [
      "close grip pull",
      "close-grip pull",
      "closegrip pull",
      "chin up pull",
      "chin-up pull"
    ],
    "/assets/exercises/closegrip_pullups.png"
  ],
  [
    ["chin up", "chin-up", "chinup", "chin ups"],
    "/assets/exercises/chinup_pullup.png"
  ],
  [
    ["wide pull", "wide pullup", "wide pull up"],
    "/assets/exercises/wide_pullup.png"
  ],
  [
    [
      "normal pull",
      "normal pullup",
      "normal pull up",
      "pull up",
      "pullup",
      "pull ups"
    ],
    "/assets/exercises/normal_pullup.png"
  ],
  [
    ["normal row", "normal rows", "rows", "row"],
    "/assets/exercises/normal_rows.png"
  ],
  // Dips — Diamonds
  [["dip", "dips"], "/assets/exercises/dips.png"],
  // Joker challenges
  [["dead hang", "deadhang", "hang"], "/assets/exercises/normal_pullup.png"]
];
function resolveExerciseIllustration(exerciseName) {
  const key = normalizeKey(exerciseName);
  for (const [keywords, path] of EXERCISE_ILLUSTRATION_MAP) {
    for (const kw of keywords) {
      if (key.includes(kw)) return path;
    }
  }
  return "/assets/exercises/normal_pushup.png";
}
function getSuitConfig(suit) {
  return SUIT_CONFIG[suit] ?? SUIT_CONFIG.Hearts;
}
function randChallenge() {
  return "DeadHang30";
}
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
  "King"
];
const SUIT_EXERCISE_MAP = {
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
    King: ""
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
    King: ""
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
    King: ""
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
    King: ""
  }
};
function buildFullDeck() {
  const suits = ["Hearts", "Spades", "Clubs", "Diamonds"];
  const suitsWithAceKing = ["Hearts", "Spades"];
  const cards = [];
  for (const suit of suits) {
    for (const rank of RANKS) {
      const isAce = rank === "Ace";
      const isKing = rank === "King";
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
        isKing
      });
    }
  }
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
      challenge
    });
  }
  return cards;
}
function fisherYatesShuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function cardCountToNumber(cc) {
  if (cc === CardCount.Ten) return 10;
  if (cc === CardCount.Twenty) return 20;
  return 52;
}
function ensureNoConsecutiveExercises(deck) {
  if (deck.length < 2) return deck;
  const effective = [];
  for (let i = 0; i < deck.length; i++) {
    const card = deck[i];
    if (card.isAce || card.isKing) {
      let prev = "";
      for (let j = i - 1; j >= 0; j--) {
        if (!deck[j].isAce && !deck[j].isKing) {
          prev = deck[j].exerciseName;
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
        let swapIdx = -1;
        for (let j = i + 2; j < deck.length; j++) {
          const cardJ = deck[j];
          const effJ = cardJ.isAce || cardJ.isKing ? effective[j] : cardJ.exerciseName;
          if (effJ !== effective[i]) {
            swapIdx = j;
            break;
          }
        }
        if (swapIdx === -1) {
          for (let j = deck.length - 1; j > i + 1; j--) {
            const cardJ = deck[j];
            const effJ = cardJ.isAce || cardJ.isKing ? effective[j] : cardJ.exerciseName;
            if (effJ !== effective[i]) {
              swapIdx = j;
              break;
            }
          }
        }
        if (swapIdx > i + 1) {
          const temp = deck[i + 1];
          deck[i + 1] = deck[swapIdx];
          deck[swapIdx] = temp;
          for (let k = i; k < deck.length; k++) {
            const card = deck[k];
            if (card.isAce || card.isKing) {
              let prev = "";
              for (let j = k - 1; j >= 0; j--) {
                if (!deck[j].isAce && !deck[j].isKing) {
                  prev = deck[j].exerciseName;
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
function buildLocalDeck(_deckId, cardCount) {
  var _a, _b;
  let full = fisherYatesShuffle(buildFullDeck());
  if (full.length > 0 && (((_a = full[0]) == null ? void 0 : _a.isAce) || ((_b = full[0]) == null ? void 0 : _b.isKing))) {
    const swapIdx = full.findIndex((c, i) => i > 0 && !c.isAce && !c.isKing);
    if (swapIdx > 0) {
      const temp = full[0];
      full[0] = full[swapIdx];
      full[swapIdx] = temp;
    }
  }
  full = ensureNoConsecutiveExercises(full);
  const deck = full.slice(0, cardCount);
  setTimeout(() => {
    const seen = /* @__PURE__ */ new Set();
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
function useWorkout() {
  const store = useWorkoutStore();
  const navigate = useNavigate();
  const startWorkout = reactExports.useCallback(
    async (customCount) => {
      const { selectedDeck, selectedCardCount } = store;
      if (!selectedDeck) return;
      if (!customCount && !selectedCardCount) return;
      const cardCount = customCount ?? cardCountToNumber(selectedCardCount);
      store.setIsShuffling(true);
      await new Promise((r) => setTimeout(r, 1200));
      const deck = buildLocalDeck(String(selectedDeck.id), cardCount);
      store.setShuffledDeck(deck, cardCount);
      store.setWorkoutStartTime(Date.now());
      store.advanceDeck();
      store.setIsShuffling(false);
      navigate({ to: "/workout/session" });
    },
    [store, navigate]
  );
  const drawNextCard = reactExports.useCallback(() => {
    store.setIsFlipping(true);
    setTimeout(() => {
      store.advanceDeck();
      store.setIsFlipping(false);
    }, 400);
  }, [store]);
  const goBackCard = reactExports.useCallback(() => {
    store.setIsFlipping(true);
    setTimeout(() => {
      store.goBackCard();
      store.setIsFlipping(false);
    }, 300);
  }, [store]);
  const markSummary = reactExports.useCallback(() => {
    store.setIsSummary(true);
  }, [store]);
  const dismissJoker = reactExports.useCallback(() => {
    store.setJokerActive(false);
    store.setJokerChallenge(null);
  }, [store]);
  const resetWorkout = reactExports.useCallback(() => {
    store.reset();
  }, [store]);
  const getWorkoutStats = reactExports.useCallback(() => {
    const { workoutStartTime, deckIndex, totalCards } = store;
    const elapsedSeconds = workoutStartTime ? Math.floor((Date.now() - workoutStartTime) / 1e3) : 0;
    const completedCards = Math.max(0, deckIndex + 1);
    const remainingCards = Math.max(0, totalCards - deckIndex - 1);
    const estimatedCalories = Math.round(completedCards * 3.5);
    return {
      elapsedSeconds,
      completedCards,
      remainingCards,
      estimatedCalories
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
    store
  };
}
export {
  SUIT_CONFIG as S,
  getSuitConfig as g,
  resolveExerciseIllustration as r,
  useWorkout as u
};
