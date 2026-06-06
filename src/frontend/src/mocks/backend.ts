import { AdminUserEntry, OnboardingData, UserTier } from "../backend";
import type { 
  CardCount,
  CardId,
  Deck,
  DeckId,
  DeckWithCards,
  Rank,
  RepSpec,
  SessionCard,
  SessionId,
  Suit,
  UserProfile,
  WorkoutHistoryEntry,
  WorkoutSessionView,
  WorkoutSummary,
  backendInterface,
 } from "../backend";

const mockDeck: Deck = {
  id: BigInt(1),
  name: "Upper Body Deck",
  isAvailable: true,
  description: "A full upper body workout using classic calisthenics movements.",
  cardCount: BigInt(52),
};

const mockCard = {
  id: BigInt(1),
  rank: "Ten" as Rank,
  suit: "Hearts" as Suit,
  exercise: "Normal Push Ups",
  deckId: BigInt(1),
  imageUrl: "/assets/normal_pushup.png",
  repSpec: { __kind__: "Fixed", Fixed: BigInt(10) } as RepSpec,
  videoUrl: "https://www.youtube.com/watch?v=IODxDxX7oi4",
};

const mockSession: WorkoutSessionView = {
  id: BigInt(1),
  currentIndex: BigInt(0),
  startTime: BigInt(Date.now()),
  status: "Active" as any,
  totalCards: BigInt(10),
  deckId: BigInt(1),
  cardCount: BigInt(10),
  elapsedSeconds: BigInt(0),
  remainingCards: BigInt(10),
  estimatedCalories: BigInt(0),
};

const mockProfile: UserProfile = {
  principal: "aaaaa-aa" as any,
  emailVerified: true,
  username: "Athlete",
  createdAt: BigInt(Date.now()),
  totalWorkouts: BigInt(12),
  email: "athlete@example.com",
  totalCalories: BigInt(1540),
  lastWorkoutDate: BigInt(Date.now()),
  totalRepsPerSuit: {
    diamonds: BigInt(88),
    clubs: BigInt(72),
    spades: BigInt(54),
    hearts: BigInt(120),
  },
  aceCardsDrawn: BigInt(0),
  kingCardsDrawn: BigInt(0),
  jokerCardsDrawn: BigInt(0),
  unlockedAchievements: [],
  totalReps: BigInt(0),
  fullDecksCompleted: BigInt(0),
  longestStreak: BigInt(7),
  currentStreak: BigInt(3),
};

const mockHistoryEntry: WorkoutHistoryEntry = {
  id: "hist-1",
  completedAt: BigInt(Date.now() - 86400000),
  userId: "aaaaa-aa" as any,
  deckId: "1",
  totalReps: BigInt(115),
  durationSeconds: BigInt(1200),
  cardsCompleted: BigInt(10),
  caloriesBurned: BigInt(128),
  aceCardsDrawn: BigInt(0),
  kingCardsDrawn: BigInt(0),
  jokerCardsDrawn: BigInt(0),
  repsBySuit: {
    diamonds: BigInt(0),
    clubs: BigInt(0),
    spades: BigInt(0),
    hearts: BigInt(0),
  },
};

const mockPrincipal = "aaaaa-aa" as unknown as import("@icp-sdk/core/principal").Principal;

export const mockBackend: backendInterface = {
  addCard: async () => BigInt(1) as CardId,
  addDeck: async () => BigInt(1) as DeckId,
  completeWorkout: async (): Promise<WorkoutSummary | null> => ({
    startTime: BigInt(Date.now() - 1200000),
    totalCards: BigInt(10),
    completedCards: BigInt(10),
    durationSeconds: BigInt(1200),
    sessionId: BigInt(1),
    estimatedCalories: BigInt(128),
  }),
  createWorkoutSession: async () => BigInt(1) as SessionId,
  deleteDeck: async () => undefined,
  getDeck: async (): Promise<DeckWithCards | null> => ({
    deck: mockDeck,
    cards: [mockCard],
  }),
  getDecks: async (): Promise<Deck[]> => [mockDeck],
  getMyProfile: async () => ({ __kind__: "ok", ok: mockProfile }),
  getMyWorkoutHistory: async () => ({
    __kind__: "ok",
    ok: [mockHistoryEntry],
  }),
  getWorkoutSession: async (): Promise<WorkoutSessionView | null> => mockSession,
  loginUser: async () => ({ __kind__: "ok", ok: mockProfile }),
  nextCard: async (): Promise<SessionCard | null> => ({
    card: mockCard,
    reps: BigInt(10),
    isMod: false,
  }),
  registerUser: async () => ({ __kind__: "ok", ok: null }),
  requestPasswordReset: async () => ({ __kind__: "ok", ok: null }),
  resetPassword: async () => ({ __kind__: "ok", ok: null }),
  saveWorkoutHistory: async () => ({ __kind__: "ok", ok: null }),
  updateCard: async () => undefined,
  updateProfile: async () => ({ __kind__: "ok", ok: null }),
  verifyEmail: async () => ({ __kind__: "ok", ok: null }),
  getTier: async (): Promise<UserTier> => UserTier.Registered,
  saveOnboarding: async (): Promise<{ __kind__: "ok"; ok: null } | { __kind__: "err"; err: string }> => ({ __kind__: "ok", ok: null }),
  getOnboarding: async (): Promise<OnboardingData | null> => null,
  adminGrantSubscriber: async (): Promise<{ __kind__: "ok"; ok: null } | { __kind__: "err"; err: string }> => ({ __kind__: "ok", ok: null }),
  adminRevokeSubscriber: async (): Promise<{ __kind__: "ok"; ok: null } | { __kind__: "err"; err: string }> => ({ __kind__: "ok", ok: null }),
  getAdminUserList: async (): Promise<{ __kind__: "ok"; ok: AdminUserEntry[] } | { __kind__: "err"; err: string }> => ({ __kind__: "ok", ok: [] }),
  setAdminPrincipal: async (): Promise<{ __kind__: "ok"; ok: null } | { __kind__: "err"; err: string }> => ({ __kind__: "ok", ok: null }),
  setTier: async (): Promise<{ __kind__: "ok"; ok: null } | { __kind__: "err"; err: string }> => ({ __kind__: "ok", ok: null }),
  revokeTier: async (_principal: typeof mockPrincipal) => ({ __kind__: "ok", ok: null }),
  getAchievements: async () => [],
  getUserAchievements: async () => [],
  resendVerificationEmail: async () => ({ __kind__: "ok", ok: null }),
};
