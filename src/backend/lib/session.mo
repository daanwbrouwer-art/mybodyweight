import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import CommonTypes "../types/common";
import DeckTypes "../types/deck";
import SessionTypes "../types/session";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Array "mo:core/Array";

module {
  /// Fisher-Yates shuffle using Time.now() as an LCG seed.
  public func shuffle(ids : [CommonTypes.CardId]) : [CommonTypes.CardId] {
    let arr = ids.toVarArray<CommonTypes.CardId>();
    let n = arr.size();
    if (n <= 1) return ids;
    // LCG parameters (same as glibc)
    var seed : Nat = (Time.now() |> Int.abs(_) % 1_000_000_007);
    var i = n;
    label shuffle_loop while (i > 1) {
      // next pseudo-random in [0, i)
      seed := (seed * 1_664_525 + 1_013_904_223) % 4_294_967_296;
      let j = seed % i;
      i -= 1;
      // swap arr[i] and arr[j]
      let tmp = arr[i];
      arr[i] := arr[j];
      arr[j] := tmp;
    };
    arr.toArray<CommonTypes.CardId>();
  };

  /// Compute the rep count for a card given the last drawn reps.
  public func computeReps(
    card     : DeckTypes.Card,
    lastReps : Nat,
  ) : Nat {
    switch (card.repSpec) {
      case (#Fixed n)      { n };
      case (#Double)       { lastReps * 2 };
      case (#Half)         { if (lastReps == 0) 0 else Nat.max(1, lastReps / 2) };
      case (#JokerChallenge) { 0 };  // reps unused for joker; challenge handles it
    };
  };

  /// Pick a random JokerChallenge using Time.now().
  /// Returns the single Joker challenge: a 30-second dead hang.
  public func randomJokerChallenge() : DeckTypes.JokerChallenge {
    #DeadHang30;
  };

  /// Estimate calories burned: ~0.5 kcal per rep + 0.05 kcal per second.
  public func estimateCalories(totalReps : Nat, durationSeconds : Nat) : Nat {
    // Integer arithmetic: multiply by 100 then divide at end
    (totalReps * 50 + durationSeconds * 5) / 100;
  };

  /// Create a new shuffled workout session. Returns the new session id.
  public func createWorkoutSession(
    deckId    : CommonTypes.DeckId,
    cardCount : SessionTypes.CardCount,
    cardIds   : [CommonTypes.CardId],
    sessions  : Map.Map<CommonTypes.SessionId, SessionTypes.WorkoutSession>,
    state     : { var nextSessionId : Nat },
  ) : CommonTypes.SessionId {
    let count : Nat = switch (cardCount) {
      case (#Ten)      10;
      case (#Twenty)   20;
      case (#FullDeck) 52;
    };
    // Shuffle all available card ids, then take the requested count
    let shuffled = shuffle(cardIds);
    let selected : [CommonTypes.CardId] = if (shuffled.size() <= count) {
      shuffled;
    } else {
      shuffled.sliceToArray(0, count);
    };

    let id = state.nextSessionId;
    state.nextSessionId += 1;

    let session : SessionTypes.WorkoutSession = {
      id;
      deckId;
      cardCount           = selected.size();
      shuffledCardIds     = selected;
      var currentIndex    = 0;
      startTime           = Time.now();
      var elapsedSeconds  = 0;
      var estimatedCalories = 0;
      var status          = #Active;
      var lastReps        = 0;
    };
    sessions.add(id, session);
    id;
  };

  /// Return a session view (shared-safe projection), or null if not found.
  public func getSessionView(
    sessionId : CommonTypes.SessionId,
    sessions  : Map.Map<CommonTypes.SessionId, SessionTypes.WorkoutSession>,
  ) : ?SessionTypes.WorkoutSessionView {
    switch (sessions.get(sessionId)) {
      case null null;
      case (?s) {
        ?{
          id               = s.id;
          deckId           = s.deckId;
          cardCount        = s.cardCount;
          currentIndex     = s.currentIndex;
          startTime        = s.startTime;
          elapsedSeconds   = s.elapsedSeconds;
          estimatedCalories = s.estimatedCalories;
          status           = s.status;
          totalCards       = s.shuffledCardIds.size();
          remainingCards   = s.shuffledCardIds.size() - Nat.min(s.currentIndex, s.shuffledCardIds.size());
        };
      };
    };
  };

  /// Advance to the next card and return it with computed reps.
  /// Returns null when the session is complete or sessionId is unknown.
  public func nextCard(
    sessionId : CommonTypes.SessionId,
    sessions  : Map.Map<CommonTypes.SessionId, SessionTypes.WorkoutSession>,
    cards     : Map.Map<CommonTypes.CardId, DeckTypes.Card>,
  ) : ?SessionTypes.SessionCard {
    switch (sessions.get(sessionId)) {
      case null null;
      case (?session) {
        // Already completed or no cards left
        if (session.status == #Completed) return null;
        if (session.currentIndex >= session.shuffledCardIds.size()) return null;

        let cardId = session.shuffledCardIds[session.currentIndex];
        switch (cards.get(cardId)) {
          case null null;  // card data missing (shouldn't happen)
          case (?card) {
            let reps = computeReps(card, session.lastReps);
            let challenge : ?DeckTypes.JokerChallenge = switch (card.repSpec) {
              case (#JokerChallenge) ?randomJokerChallenge();
              case _ null;
            };
            let isMod = switch (card.repSpec) {
              case (#Double) true;
              case (#Half)   true;
              case _         false;
            };

            // Advance pointer and update running state
            session.currentIndex    += 1;
            let keepLastReps = isMod or (switch (card.repSpec) { case (#JokerChallenge) true; case _ false });
            session.lastReps        := if (keepLastReps) session.lastReps else reps;
            // Update elapsed time
            let nowSec : Nat = (Time.now() - session.startTime |> Int.abs(_)) / 1_000_000_000;
            session.elapsedSeconds  := nowSec;
            session.estimatedCalories := estimateCalories(session.currentIndex * 8, nowSec);

            // Auto-complete when all cards drawn
            if (session.currentIndex >= session.shuffledCardIds.size()) {
              session.status := #Completed;
            };

            ?{ card; reps; isMod; challenge };
          };
        };
      };
    };
  };

  /// Mark a session complete and return its summary.
  public func completeWorkout(
    sessionId : CommonTypes.SessionId,
    sessions  : Map.Map<CommonTypes.SessionId, SessionTypes.WorkoutSession>,
  ) : ?SessionTypes.WorkoutSummary {
    switch (sessions.get(sessionId)) {
      case null null;
      case (?session) {
        session.status := #Completed;
        let nowSec : Nat = (Time.now() - session.startTime |> Int.abs(_)) / 1_000_000_000;
        session.elapsedSeconds := nowSec;
        let completed = session.currentIndex;
        session.estimatedCalories := estimateCalories(completed * 8, nowSec);
        ?{
          sessionId         = session.id;
          completedCards    = completed;
          totalCards        = session.shuffledCardIds.size();
          durationSeconds   = nowSec;
          estimatedCalories = session.estimatedCalories;
          startTime         = session.startTime;
        };
      };
    };
  };
};
