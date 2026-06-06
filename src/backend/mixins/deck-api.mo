import Map "mo:core/Map";
import CommonTypes "../types/common";
import DeckTypes "../types/deck";
import DeckLib "../lib/deck";

mixin (
  decks  : Map.Map<CommonTypes.DeckId, DeckTypes.Deck>,
  cards  : Map.Map<CommonTypes.CardId, DeckTypes.Card>,
  state  : { var nextDeckId : Nat; var nextCardId : Nat },
) {
  /// Return all available decks.
  public query func getDecks() : async [DeckTypes.Deck] {
    DeckLib.listDecks(decks);
  };

  /// Return a single deck with its full card list.
  public query func getDeck(id : CommonTypes.DeckId) : async ?DeckTypes.DeckWithCards {
    DeckLib.getDeckWithCards(id, decks, cards);
  };

  /// Admin: add a new deck.
  public shared func addDeck(
    name        : Text,
    description : Text,
    isAvailable : Bool,
  ) : async CommonTypes.DeckId {
    DeckLib.addDeck(name, description, isAvailable, decks, state);
  };

  /// Admin: add a card to an existing deck.
  public shared func addCard(
    deckId   : CommonTypes.DeckId,
    suit     : DeckTypes.Suit,
    rank     : DeckTypes.Rank,
    exercise : Text,
    repSpec  : DeckTypes.RepSpec,
    imageUrl : Text,
    videoUrl : Text,
  ) : async CommonTypes.CardId {
    DeckLib.addCard(deckId, suit, rank, exercise, repSpec, imageUrl, videoUrl, cards, decks, state);
  };

  /// Admin: update an existing card.
  public shared func updateCard(
    cardId   : CommonTypes.CardId,
    exercise : Text,
    repSpec  : DeckTypes.RepSpec,
    imageUrl : Text,
    videoUrl : Text,
  ) : async () {
    DeckLib.updateCard(cardId, exercise, repSpec, imageUrl, videoUrl, cards);
  };

  /// Admin: delete a deck and all its cards.
  public shared func deleteDeck(id : CommonTypes.DeckId) : async () {
    DeckLib.deleteDeck(id, decks, cards);
  };
};
