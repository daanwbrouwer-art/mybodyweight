import CommonTypes "common";

module {
  /// Suit of a playing card, including Joker
  public type Suit = {
    #Hearts;
    #Spades;
    #Diamonds;
    #Clubs;
    #Joker;
  };

  /// Rank of a playing card
  public type Rank = {
    #Two;
    #Three;
    #Four;
    #Five;
    #Six;
    #Seven;
    #Eight;
    #Nine;
    #Ten;
    #Jack;   // = 11
    #Queen;  // = 12
    #Ace;    // modifier: previous x2
    #King;   // modifier: previous /2
    #Joker;  // special challenge card
  };

  /// Modifier cards change reps based on previous card
  public type RepSpec = {
    #Fixed : Nat;          // a concrete rep count
    #Double;               // Ace: previous x2
    #Half;                 // King: previous /2
    #JokerChallenge;       // Joker: random challenge
  };

  /// Challenge type for Joker cards
  public type JokerChallenge = {
    #DeadHang30;
  };

  /// A single card in the deck
  public type Card = {
    id       : CommonTypes.CardId;
    deckId   : CommonTypes.DeckId;
    suit     : Suit;
    rank     : Rank;
    exercise : Text;         // e.g. "Diamond Push Ups"
    repSpec  : RepSpec;
    imageUrl : Text;         // placeholder image URL
    videoUrl : Text;         // placeholder YouTube URL
  };

  /// A deck of cards
  public type Deck = {
    id          : CommonTypes.DeckId;
    name        : Text;
    description : Text;
    isAvailable : Bool;
    cardCount   : Nat;
  };

  /// Deck with full card list (used by getDeck query)
  public type DeckWithCards = {
    deck  : Deck;
    cards : [Card];
  };
};
