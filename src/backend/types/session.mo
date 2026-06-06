import CommonTypes "common";
import DeckTypes "deck";

module {
  /// Allowed workout sizes
  public type CardCount = {
    #Ten;         // 10 cards
    #Twenty;      // 20 cards
    #FullDeck;    // 52 cards
  };

  /// A resolved card as presented during a session (with computed reps)
  public type SessionCard = {
    card     : DeckTypes.Card;
    reps     : Nat;                        // computed rep count for this draw
    isMod    : Bool;                       // true for Ace/King
    challenge : ?DeckTypes.JokerChallenge; // set for Joker cards
  };

  /// Status of a workout session
  public type SessionStatus = {
    #Active;
    #Completed;
  };

  /// Workout session (internal — contains mutable fields)
  public type WorkoutSession = {
    id              : CommonTypes.SessionId;
    deckId          : CommonTypes.DeckId;
    cardCount       : Nat;                    // 10 / 20 / 52
    shuffledCardIds : [CommonTypes.CardId];   // shuffled order
    var currentIndex : Nat;                   // 0-based pointer
    startTime       : CommonTypes.Timestamp;
    var elapsedSeconds : Nat;
    var estimatedCalories : Nat;
    var status      : SessionStatus;
    var lastReps    : Nat;                    // used by Ace/King logic
  };

  /// Public (shared) session state returned to frontend
  public type WorkoutSessionView = {
    id               : CommonTypes.SessionId;
    deckId           : CommonTypes.DeckId;
    cardCount        : Nat;
    currentIndex     : Nat;
    startTime        : CommonTypes.Timestamp;
    elapsedSeconds   : Nat;
    estimatedCalories : Nat;
    status           : SessionStatus;
    totalCards       : Nat;   // number of cards selected for this session
    remainingCards   : Nat;
  };

  /// Workout summary returned on completion
  public type WorkoutSummary = {
    sessionId         : CommonTypes.SessionId;
    completedCards    : Nat;
    totalCards        : Nat;
    durationSeconds   : Nat;
    estimatedCalories : Nat;
    startTime         : CommonTypes.Timestamp;
  };
};
