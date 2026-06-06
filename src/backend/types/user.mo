module {
  // ── Auth account ────────────────────────────────────────────────────
  public type UserAccount = {
    principal    : Principal;
    username     : Text;
    email        : Text;
    passwordHash : Text;
    emailVerified : Bool;
    createdAt    : Int;
  };

  // ── Email verification token ─────────────────────────────────────────
  public type EmailVerificationToken = {
    token          : Text;
    userPrincipal  : Principal;
    email          : Text;
    createdAt      : Int;
    used           : Bool;
  };

  // ── Password reset token ─────────────────────────────────────────────
  public type PasswordResetToken = {
    token     : Text;
    email     : Text;
    createdAt : Int;
    used      : Bool;
  };

  // ── Public profile (returned by API) ────────────────────────────────
  public type UserProfile = {
    principal      : Principal;
    username       : Text;
    email          : Text;
    emailVerified  : Bool;
    createdAt      : Int;
    totalWorkouts   : Nat;
    totalCalories   : Nat;
    totalRepsPerSuit : {
      hearts   : Nat;
      spades   : Nat;
      clubs    : Nat;
      diamonds : Nat;
    };
    currentStreak       : Nat;
    longestStreak       : Nat;
    lastWorkoutDate     : ?Int;
    // Achievement-related counters
    totalReps           : Nat;
    kingCardsDrawn      : Nat;
    aceCardsDrawn       : Nat;
    jokerCardsDrawn     : Nat;
    fullDecksCompleted  : Nat;
    unlockedAchievements : [(Text, Int)];  // (achievementId, unlockedTimestamp)
  };

  public type WorkoutHistoryEntry = {
    id              : Text;
    userId          : Principal;
    completedAt     : Int;
    durationSeconds : Nat;
    caloriesBurned  : Nat;
    cardsCompleted  : Nat;
    totalReps       : Nat;
    repsBySuit      : {
      hearts   : Nat;
      spades   : Nat;
      clubs    : Nat;
      diamonds : Nat;
    };
    deckId          : Text;
    kingCardsDrawn  : Nat;   // King cards drawn this session
    aceCardsDrawn   : Nat;   // Ace cards drawn this session
    jokerCardsDrawn : Nat;   // Joker cards drawn this session
  };
};
