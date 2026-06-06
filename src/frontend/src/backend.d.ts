import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface OnboardingData {
    level: string;
    gender: string;
    hasCompletedOnboarding: boolean;
}
export type DeckId = bigint;
export type Timestamp = bigint;
export type CardId = bigint;
export interface Card {
    id: CardId;
    rank: Rank;
    suit: Suit;
    exercise: string;
    deckId: DeckId;
    imageUrl: string;
    repSpec: RepSpec;
    videoUrl: string;
}
export type RepSpec = {
    __kind__: "Half";
    Half: null;
} | {
    __kind__: "JokerChallenge";
    JokerChallenge: null;
} | {
    __kind__: "Double";
    Double: null;
} | {
    __kind__: "Fixed";
    Fixed: bigint;
};
export type SessionId = bigint;
export interface DeckWithCards {
    cards: Array<Card>;
    deck: Deck;
}
export interface AdminUserEntry {
    principal: Principal;
    tier: UserTier;
    email?: string;
    isIndefinite: boolean;
    tierExpiresAt?: bigint;
}
export type Result_1 = {
    __kind__: "ok";
    ok: Array<AdminUserEntry>;
} | {
    __kind__: "err";
    err: string;
};
export interface SessionCard {
    challenge?: JokerChallenge;
    card: Card;
    reps: bigint;
    isMod: boolean;
}
export interface Achievement {
    id: AchievementId;
    unlockedAt?: bigint;
    name: string;
    description: string;
    rarity: AchievementRarity;
}
export interface WorkoutSessionView {
    id: SessionId;
    currentIndex: bigint;
    startTime: Timestamp;
    status: SessionStatus;
    totalCards: bigint;
    deckId: DeckId;
    cardCount: bigint;
    elapsedSeconds: bigint;
    remainingCards: bigint;
    estimatedCalories: bigint;
}
export interface WorkoutSummary {
    startTime: Timestamp;
    totalCards: bigint;
    completedCards: bigint;
    durationSeconds: bigint;
    sessionId: SessionId;
    estimatedCalories: bigint;
}
export type Result = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: string;
};
export type AchievementId = string;
export interface Deck {
    id: DeckId;
    name: string;
    isAvailable: boolean;
    description: string;
    cardCount: bigint;
}
export interface WorkoutHistoryEntry {
    id: string;
    completedAt: bigint;
    aceCardsDrawn: bigint;
    userId: Principal;
    deckId: string;
    totalReps: bigint;
    kingCardsDrawn: bigint;
    durationSeconds: bigint;
    cardsCompleted: bigint;
    caloriesBurned: bigint;
    repsBySuit: {
        diamonds: bigint;
        clubs: bigint;
        spades: bigint;
        hearts: bigint;
    };
    jokerCardsDrawn: bigint;
}
export interface UserProfile {
    principal: Principal;
    aceCardsDrawn: bigint;
    emailVerified: boolean;
    username: string;
    unlockedAchievements: Array<[string, bigint]>;
    createdAt: bigint;
    totalWorkouts: bigint;
    totalReps: bigint;
    email: string;
    totalCalories: bigint;
    kingCardsDrawn: bigint;
    lastWorkoutDate?: bigint;
    totalRepsPerSuit: {
        diamonds: bigint;
        clubs: bigint;
        spades: bigint;
        hearts: bigint;
    };
    longestStreak: bigint;
    fullDecksCompleted: bigint;
    currentStreak: bigint;
    jokerCardsDrawn: bigint;
}
export enum AchievementRarity {
    Epic = "Epic",
    Rare = "Rare",
    Uncommon = "Uncommon",
    Legendary = "Legendary",
    Common = "Common"
}
export enum CardCount {
    Ten = "Ten",
    FullDeck = "FullDeck",
    Twenty = "Twenty"
}
export enum JokerChallenge {
    DeadHang30 = "DeadHang30"
}
export enum Rank {
    Ace = "Ace",
    Six = "Six",
    Ten = "Ten",
    Two = "Two",
    Eight = "Eight",
    Seven = "Seven",
    Five = "Five",
    Four = "Four",
    Jack = "Jack",
    King = "King",
    Nine = "Nine",
    Three = "Three",
    Joker = "Joker",
    Queen = "Queen"
}
export enum SessionStatus {
    Active = "Active",
    Completed = "Completed"
}
export enum Suit {
    Diamonds = "Diamonds",
    Hearts = "Hearts",
    Clubs = "Clubs",
    Joker = "Joker",
    Spades = "Spades"
}
export enum UserTier {
    Guest = "Guest",
    Subscriber = "Subscriber",
    Registered = "Registered"
}
export interface backendInterface {
    addCard(deckId: DeckId, suit: Suit, rank: Rank, exercise: string, repSpec: RepSpec, imageUrl: string, videoUrl: string): Promise<CardId>;
    addDeck(name: string, description: string, isAvailable: boolean): Promise<DeckId>;
    adminGrantSubscriber(targetPrincipal: Principal, expiresAt: bigint | null, isIndefinite: boolean): Promise<Result>;
    adminRevokeSubscriber(targetPrincipal: Principal): Promise<Result>;
    completeWorkout(sessionId: SessionId): Promise<WorkoutSummary | null>;
    createWorkoutSession(deckId: DeckId, cardCount: CardCount): Promise<SessionId>;
    deleteDeck(id: DeckId): Promise<void>;
    getAchievements(): Promise<Array<Achievement>>;
    getAdminUserList(): Promise<Result_1>;
    getDeck(id: DeckId): Promise<DeckWithCards | null>;
    getDecks(): Promise<Array<Deck>>;
    getMyProfile(): Promise<{
        __kind__: "ok";
        ok: UserProfile;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getMyWorkoutHistory(): Promise<{
        __kind__: "ok";
        ok: Array<WorkoutHistoryEntry>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getOnboarding(): Promise<OnboardingData | null>;
    getTier(userId: Principal): Promise<UserTier>;
    getUserAchievements(): Promise<Array<[string, bigint]>>;
    getWorkoutSession(sessionId: SessionId): Promise<WorkoutSessionView | null>;
    loginUser(email: string, passwordHash: string): Promise<{
        __kind__: "ok";
        ok: UserProfile;
    } | {
        __kind__: "err";
        err: string;
    }>;
    nextCard(sessionId: SessionId): Promise<SessionCard | null>;
    registerUser(username: string, email: string, passwordHash: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    requestPasswordReset(email: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    resendVerificationEmail(email: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    resetPassword(token: string, newPasswordHash: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    revokeTier(userId: Principal): Promise<Result>;
    saveOnboarding(gender: string, level: string): Promise<Result>;
    saveWorkoutHistory(entry: WorkoutHistoryEntry): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    setAdminPrincipal(newAdmin: Principal): Promise<Result>;
    setTier(userId: Principal, tier: UserTier, expiresAt: bigint | null, isIndefinite: boolean): Promise<Result>;
    updateCard(cardId: CardId, exercise: string, repSpec: RepSpec, imageUrl: string, videoUrl: string): Promise<void>;
    updateProfile(username: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    verifyEmail(token: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
}
