import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import CommonTypes "../types/common";
import DeckTypes "../types/deck";
import Nat "mo:core/Nat";

module {
  // Convert exercise name to a URL-friendly slug
  func slugify(name : Text) : Text {
    name.toLower().replace(#text " ", "-");
  };

  /// Seed the initial Upper Body Deck into the provided maps.
  public func seedInitialData(
    decks : Map.Map<CommonTypes.DeckId, DeckTypes.Deck>,
    cards : Map.Map<CommonTypes.CardId, DeckTypes.Card>,
    state : { var nextDeckId : Nat; var nextCardId : Nat },
  ) {
    // Idempotent — only seed once
    if (not decks.isEmpty()) return;

    let deckId = state.nextDeckId;
    state.nextDeckId += 1;

    let deck : DeckTypes.Deck = {
      id          = deckId;
      name        = "Upper Body Deck";
      description = "52 cards plus 2 Jokers covering Push Ups, Pull Ups, Rows and Dips. A full calisthenics upper-body challenge.";
      isAvailable = true;
      cardCount   = 52;
    };
    decks.add(deckId, deck);

    // Helper to add one card
    let addC = func(
      suit     : DeckTypes.Suit,
      rank     : DeckTypes.Rank,
      exercise : Text,
      repSpec  : DeckTypes.RepSpec,
    ) {
      let cardId = state.nextCardId;
      state.nextCardId += 1;
      let slug = slugify(exercise);
      let card : DeckTypes.Card = {
        id       = cardId;
        deckId;
        suit;
        rank;
        exercise;
        repSpec;
        imageUrl = "https://placeholder.mybodyweight.app/images/" # slug # ".jpg";
        videoUrl = "https://www.youtube.com/results?search_query=" # slug;
      };
      cards.add(cardId, card);
    };

    // ── PUSH UPS (Hearts) ──────────────────────────────────────────────
    addC(#Hearts, #Two,   "Diamond Push Ups",   #Fixed 2);
    addC(#Hearts, #Three, "Normal Push Ups",     #Fixed 3);
    addC(#Hearts, #Four,  "Close Grip Push Ups", #Fixed 4);
    addC(#Hearts, #Five,  "Diamond Push Ups",    #Fixed 5);
    addC(#Hearts, #Six,   "Normal Push Ups",     #Fixed 6);
    addC(#Hearts, #Seven, "Close Grip Push Ups", #Fixed 7);
    addC(#Hearts, #Eight, "Diamond Push Ups",    #Fixed 8);
    addC(#Hearts, #Nine,  "Normal Push Ups",     #Fixed 9);
    addC(#Hearts, #Ten,   "Close Grip Push Ups", #Fixed 10);
    addC(#Hearts, #Jack,  "Diamond Push Ups",    #Fixed 11);
    addC(#Hearts, #Queen, "Normal Push Ups",     #Fixed 12);
    addC(#Hearts, #Ace,   "Push Ups (x2)",       #Double);
    addC(#Hearts, #King,  "Push Ups (half)",     #Half);

    // ── PULL UPS (Spades) ─────────────────────────────────────────────
    addC(#Spades, #Two,   "Chin Ups",            #Fixed 2);
    addC(#Spades, #Three, "Close Grip Pull Ups", #Fixed 3);
    addC(#Spades, #Four,  "Normal Pull Ups",     #Fixed 4);
    addC(#Spades, #Five,  "Chin Ups",            #Fixed 5);
    addC(#Spades, #Six,   "Close Grip Pull Ups", #Fixed 6);
    addC(#Spades, #Seven, "Normal Pull Ups",     #Fixed 7);
    addC(#Spades, #Eight, "Chin Ups",            #Fixed 8);
    addC(#Spades, #Nine,  "Close Grip Pull Ups", #Fixed 9);
    addC(#Spades, #Ten,   "Normal Pull Ups",     #Fixed 10);
    addC(#Spades, #Jack,  "Chin Ups",            #Fixed 11);
    addC(#Spades, #Queen, "Normal Pull Ups",     #Fixed 12);
    addC(#Spades, #Ace,   "Pull Ups (x2)",       #Double);
    addC(#Spades, #King,  "Pull Ups (half)",     #Half);

    // ── ROWS (Diamonds) ───────────────────────────────────────────────
    addC(#Diamonds, #Two,   "Normal Rows",   #Fixed 2);
    addC(#Diamonds, #Three, "Chin Up Rows",  #Fixed 3);
    addC(#Diamonds, #Four,  "Normal Rows",   #Fixed 4);
    addC(#Diamonds, #Five,  "Chin Up Rows",  #Fixed 5);
    addC(#Diamonds, #Six,   "Normal Rows",   #Fixed 6);
    addC(#Diamonds, #Seven, "Chin Up Rows",  #Fixed 7);
    addC(#Diamonds, #Eight, "Normal Rows",   #Fixed 8);
    addC(#Diamonds, #Nine,  "Chin Up Rows",  #Fixed 9);
    addC(#Diamonds, #Ten,   "Normal Rows",   #Fixed 10);
    addC(#Diamonds, #Jack,  "Chin Up Rows",  #Fixed 11);
    addC(#Diamonds, #Queen, "Normal Rows",   #Fixed 12);
    addC(#Diamonds, #Ace,   "Rows (x2)",     #Double);
    addC(#Diamonds, #King,  "Rows (half)",   #Half);

    // ── DIPS (Clubs) ──────────────────────────────────────────────────
    addC(#Clubs, #Two,   "Dips",        #Fixed 2);
    addC(#Clubs, #Three, "Dips",        #Fixed 3);
    addC(#Clubs, #Four,  "Dips",        #Fixed 4);
    addC(#Clubs, #Five,  "Dips",        #Fixed 5);
    addC(#Clubs, #Six,   "Dips",        #Fixed 6);
    addC(#Clubs, #Seven, "Dips",        #Fixed 7);
    addC(#Clubs, #Eight, "Dips",        #Fixed 8);
    addC(#Clubs, #Nine,  "Dips",        #Fixed 9);
    addC(#Clubs, #Ten,   "Dips",        #Fixed 10);
    addC(#Clubs, #Jack,  "Dips",        #Fixed 11);
    addC(#Clubs, #Queen, "Dips",        #Fixed 12);
    addC(#Clubs, #Ace,   "Dips (x2)",   #Double);
    addC(#Clubs, #King,  "Dips (half)", #Half);

    // ── JOKERS (2 special challenge cards) ───────────────────────────
    addC(#Joker, #Joker, "Joker Challenge", #JokerChallenge);
    addC(#Joker, #Joker, "Joker Challenge", #JokerChallenge);
  };

  /// Return all decks as an array.
  public func listDecks(
    decks : Map.Map<CommonTypes.DeckId, DeckTypes.Deck>,
  ) : [DeckTypes.Deck] {
    decks.values() |> _.toArray<DeckTypes.Deck>();
  };

  /// Return a single deck with all its cards, or null if not found.
  public func getDeckWithCards(
    deckId : CommonTypes.DeckId,
    decks  : Map.Map<CommonTypes.DeckId, DeckTypes.Deck>,
    cards  : Map.Map<CommonTypes.CardId, DeckTypes.Card>,
  ) : ?DeckTypes.DeckWithCards {
    switch (decks.get(deckId)) {
      case null null;
      case (?deck) {
        let deckCards = cards.values()
          |> _.filter(func(c) { c.deckId == deckId })
          |> _.toArray();
        ?{ deck; cards = deckCards };
      };
    };
  };

  /// Add a new deck. Returns the new deck id.
  public func addDeck(
    name        : Text,
    description : Text,
    isAvailable : Bool,
    decks       : Map.Map<CommonTypes.DeckId, DeckTypes.Deck>,
    state       : { var nextDeckId : Nat },
  ) : CommonTypes.DeckId {
    let id = state.nextDeckId;
    state.nextDeckId += 1;
    let deck : DeckTypes.Deck = { id; name; description; isAvailable; cardCount = 0 };
    decks.add(id, deck);
    id;
  };

  /// Add a card to a deck. Returns the new card id.
  public func addCard(
    deckId   : CommonTypes.DeckId,
    suit     : DeckTypes.Suit,
    rank     : DeckTypes.Rank,
    exercise : Text,
    repSpec  : DeckTypes.RepSpec,
    imageUrl : Text,
    videoUrl : Text,
    cards    : Map.Map<CommonTypes.CardId, DeckTypes.Card>,
    decks    : Map.Map<CommonTypes.DeckId, DeckTypes.Deck>,
    state    : { var nextCardId : Nat },
  ) : CommonTypes.CardId {
    let id = state.nextCardId;
    state.nextCardId += 1;
    let card : DeckTypes.Card = { id; deckId; suit; rank; exercise; repSpec; imageUrl; videoUrl };
    cards.add(id, card);
    // Increment deck.cardCount
    switch (decks.get(deckId)) {
      case (?deck) { decks.add(deckId, { deck with cardCount = deck.cardCount + 1 }) };
      case null {};
    };
    id;
  };

  /// Update an existing card's fields. Traps if not found.
  public func updateCard(
    cardId   : CommonTypes.CardId,
    exercise : Text,
    repSpec  : DeckTypes.RepSpec,
    imageUrl : Text,
    videoUrl : Text,
    cards    : Map.Map<CommonTypes.CardId, DeckTypes.Card>,
  ) {
    switch (cards.get(cardId)) {
      case null { Runtime.trap("Card not found: " # cardId.toText()) };
      case (?card) {
        cards.add(cardId, { card with exercise; repSpec; imageUrl; videoUrl });
      };
    };
  };

  /// Delete a deck and all its cards.
  public func deleteDeck(
    deckId : CommonTypes.DeckId,
    decks  : Map.Map<CommonTypes.DeckId, DeckTypes.Deck>,
    cards  : Map.Map<CommonTypes.CardId, DeckTypes.Card>,
  ) {
    decks.remove(deckId);
    let toRemove = cards.entries()
      |> _.filter(func((_, c)) { c.deckId == deckId })
      |> _.map(func((k, _)) { k })
      |> _.toArray();
    for (id in toRemove.values()) {
      cards.remove(id);
    };
  };

  /// Return all card ids belonging to a deck, in map iteration order.
  public func getCardIdsForDeck(
    deckId : CommonTypes.DeckId,
    cards  : Map.Map<CommonTypes.CardId, DeckTypes.Card>,
  ) : [CommonTypes.CardId] {
    cards.entries()
      |> _.filter(func((_, c)) { c.deckId == deckId })
      |> _.map(func((k, _)) { k })
      |> _.toArray<CommonTypes.CardId>();
  };
};
