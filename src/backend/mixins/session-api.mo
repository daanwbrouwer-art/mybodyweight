import Map "mo:core/Map";
import CommonTypes "../types/common";
import DeckTypes "../types/deck";
import SessionTypes "../types/session";
import DeckLib "../lib/deck";
import SessionLib "../lib/session";

mixin (
  sessions : Map.Map<CommonTypes.SessionId, SessionTypes.WorkoutSession>,
  cards    : Map.Map<CommonTypes.CardId, DeckTypes.Card>,
  decks    : Map.Map<CommonTypes.DeckId, DeckTypes.Deck>,
  state    : { var nextSessionId : Nat },
) {
  /// Create a new shuffled workout session.
  public shared func createWorkoutSession(
    deckId    : CommonTypes.DeckId,
    cardCount : SessionTypes.CardCount,
  ) : async CommonTypes.SessionId {
    let cardIds = DeckLib.getCardIdsForDeck(deckId, cards);
    SessionLib.createWorkoutSession(deckId, cardCount, cardIds, sessions, state);
  };

  /// Return the current state of a session.
  public query func getWorkoutSession(
    sessionId : CommonTypes.SessionId,
  ) : async ?SessionTypes.WorkoutSessionView {
    SessionLib.getSessionView(sessionId, sessions);
  };

  /// Draw the next card in a session.
  public shared func nextCard(
    sessionId : CommonTypes.SessionId,
  ) : async ?SessionTypes.SessionCard {
    SessionLib.nextCard(sessionId, sessions, cards);
  };

  /// Complete a workout session and receive a summary.
  public shared func completeWorkout(
    sessionId : CommonTypes.SessionId,
  ) : async ?SessionTypes.WorkoutSummary {
    SessionLib.completeWorkout(sessionId, sessions);
  };
};
