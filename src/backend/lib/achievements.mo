import AchievementTypes "../types/achievement";
import Time "mo:core/Time";

module {
  /// Convenience aliases
  type Achievement   = AchievementTypes.Achievement;
  type AchievementId = AchievementTypes.AchievementId;
  type Rarity        = AchievementTypes.AchievementRarity;

  /// Stats derived from UserProfile fields passed in by caller
  public type UserStats = {
    totalWorkouts      : Nat;
    currentStreak      : Nat;
    totalReps          : Nat;
    kingCardsDrawn     : Nat;
    aceCardsDrawn      : Nat;
    jokerCardsDrawn    : Nat;
    fullDecksCompleted : Nat;
  };

  /// Stats for the just-completed session
  public type SessionStats = {
    cardsDrawnThisSession : Nat;
    isFullDeck            : Bool;
  };

  // ── Internal catalogue ────────────────────────────────────────────────
  // All 30 achievements, locked (unlockedAt = null)
  func catalogue() : [Achievement] {
    [
      // ── CARD DRAW ───────────────────────────────────────────────────
      { id = "first_draw";      name = "First Draw";        description = "You drew your very first card";                      rarity = #Common;    unlockedAt = null },
      { id = "on_a_roll";       name = "On a Roll";         description = "Drew 10 cards in a single session";                   rarity = #Common;    unlockedAt = null },
      { id = "half_the_deck";   name = "Half the Deck";     description = "Made it halfway through";                             rarity = #Uncommon;  unlockedAt = null },
      { id = "full_deck";       name = "Full Deck";         description = "Completed an entire 52-card deck";                   rarity = #Rare;      unlockedAt = null },
      { id = "deck_destroyer";  name = "Deck Destroyer";    description = "Completed 10 full decks across all sessions";        rarity = #Epic;      unlockedAt = null },
      { id = "card_shark";      name = "Card Shark";        description = "Completed 50 full decks across all sessions";        rarity = #Legendary; unlockedAt = null },
      // ── SPECIAL CARDS ───────────────────────────────────────────────
      { id = "double_or_nothing";   name = "Double or Nothing";   description = "Drew your first King card";                    rarity = #Uncommon;  unlockedAt = null },
      { id = "cut_in_half";         name = "Cut in Half";         description = "Drew your first Ace card";                     rarity = #Uncommon;  unlockedAt = null },
      { id = "wild_card";           name = "Wild Card";           description = "Drew your first Joker challenge card";          rarity = #Uncommon;  unlockedAt = null },
      { id = "kings_court";         name = "King's Court";        description = "Drew 10 King cards across all sessions";        rarity = #Rare;      unlockedAt = null },
      { id = "ace_up_your_sleeve";  name = "Ace Up Your Sleeve";  description = "Drew 10 Ace cards across all sessions";         rarity = #Rare;      unlockedAt = null },
      { id = "jokers_wild";         name = "Joker's Wild";        description = "Drew 10 Joker cards across all sessions";       rarity = #Rare;      unlockedAt = null },
      // ── REPS ────────────────────────────────────────────────────────
      { id = "first_blood";  name = "First Blood";  description = "Completed your first rep";           rarity = #Common;    unlockedAt = null },
      { id = "century";      name = "Century";      description = "Completed 100 total reps";            rarity = #Common;    unlockedAt = null },
      { id = "grinder";      name = "Grinder";      description = "Completed 1,000 total reps";          rarity = #Uncommon;  unlockedAt = null },
      { id = "iron_will";    name = "Iron Will";    description = "Completed 10,000 total reps";         rarity = #Rare;      unlockedAt = null },
      { id = "unstoppable";  name = "Unstoppable";  description = "Completed 50,000 total reps";         rarity = #Epic;      unlockedAt = null },
      { id = "legend";       name = "Legend";       description = "Completed 100,000 total reps";        rarity = #Legendary; unlockedAt = null },
      // ── STREAKS ─────────────────────────────────────────────────────
      { id = "just_getting_started"; name = "Just Getting Started"; description = "Completed a 3-day streak";   rarity = #Common;    unlockedAt = null },
      { id = "week_warrior";         name = "Week Warrior";         description = "Completed a 7-day streak";   rarity = #Uncommon;  unlockedAt = null },
      { id = "two_week_grind";       name = "Two Week Grind";       description = "Completed a 14-day streak";  rarity = #Uncommon;  unlockedAt = null },
      { id = "monthly_warrior";      name = "Monthly Warrior";      description = "Completed a 30-day streak";  rarity = #Rare;      unlockedAt = null },
      { id = "dedicated";            name = "Dedicated";            description = "Completed a 60-day streak";  rarity = #Epic;      unlockedAt = null },
      { id = "obsessed";             name = "Obsessed";             description = "Completed a 90-day streak";  rarity = #Legendary; unlockedAt = null },
      // ── SESSIONS ────────────────────────────────────────────────────
      { id = "rookie";        name = "Rookie";          description = "Completed your first session";    rarity = #Common;    unlockedAt = null },
      { id = "getting_serious"; name = "Getting Serious"; description = "Completed 10 sessions";         rarity = #Common;    unlockedAt = null },
      { id = "committed";     name = "Committed";       description = "Completed 25 sessions";           rarity = #Uncommon;  unlockedAt = null },
      { id = "veteran";       name = "Veteran";         description = "Completed 50 sessions";           rarity = #Rare;      unlockedAt = null },
      { id = "elite";         name = "Elite";           description = "Completed 100 sessions";          rarity = #Epic;      unlockedAt = null },
      { id = "hall_of_fame";  name = "Hall of Fame";    description = "Completed 250 sessions";          rarity = #Legendary; unlockedAt = null },
    ];
  };

  // ── Public API ───────────────────────────────────────────────────────

  /// Returns the full catalogue of 30 achievements (all locked — no unlockedAt).
  public func allAchievements() : [Achievement] {
    catalogue();
  };

  /// Returns achievement IDs that are newly unlocked given the provided stats.
  /// Caller is responsible for filtering out already-unlocked IDs before persisting.
  public func checkAchievements(
    userStats    : UserStats,
    sessionStats : SessionStats,
  ) : [AchievementId] {
    var newlyUnlocked : [AchievementId] = [];

    func add(id : AchievementId) {
      newlyUnlocked := Array.tabulate(
        newlyUnlocked.size() + 1,
        func(i) { if (i < newlyUnlocked.size()) newlyUnlocked[i] else id },
      );
    };

    // ── Card draw ────────────────────────────────────────────────────
    // We track total cards drawn as sum across all suits' king/ace/joker counts
    // plus regular cards — but we don't have that directly. We approximate via
    // totalWorkouts and sessionStats for session-level thresholds.
    let cards = sessionStats.cardsDrawnThisSession;
    if (cards >= 1)  add("first_draw");
    if (cards >= 10) add("on_a_roll");
    if (cards >= 26) add("half_the_deck");

    // Full deck milestones
    let fd = userStats.fullDecksCompleted;
    if (sessionStats.isFullDeck) {
      add("full_deck");  // any full deck earns base; caller deduplicates if already owned
    };
    if (fd >= 10) add("deck_destroyer");
    if (fd >= 50) add("card_shark");

    // ── Special cards ────────────────────────────────────────────────
    if (userStats.kingCardsDrawn >= 1)  add("double_or_nothing");
    if (userStats.aceCardsDrawn  >= 1)  add("cut_in_half");
    if (userStats.jokerCardsDrawn >= 1) add("wild_card");
    if (userStats.kingCardsDrawn  >= 10) add("kings_court");
    if (userStats.aceCardsDrawn   >= 10) add("ace_up_your_sleeve");
    if (userStats.jokerCardsDrawn >= 10) add("jokers_wild");

    // ── Reps ─────────────────────────────────────────────────────────
    let r = userStats.totalReps;
    if (r >= 1)       add("first_blood");
    if (r >= 100)     add("century");
    if (r >= 1_000)   add("grinder");
    if (r >= 10_000)  add("iron_will");
    if (r >= 50_000)  add("unstoppable");
    if (r >= 100_000) add("legend");

    // ── Streaks ──────────────────────────────────────────────────────
    let s = userStats.currentStreak;
    if (s >= 3)  add("just_getting_started");
    if (s >= 7)  add("week_warrior");
    if (s >= 14) add("two_week_grind");
    if (s >= 30) add("monthly_warrior");
    if (s >= 60) add("dedicated");
    if (s >= 90) add("obsessed");

    // ── Sessions ─────────────────────────────────────────────────────
    let w = userStats.totalWorkouts;
    if (w >= 1)   add("rookie");
    if (w >= 10)  add("getting_serious");
    if (w >= 25)  add("committed");
    if (w >= 50)  add("veteran");
    if (w >= 100) add("elite");
    if (w >= 250) add("hall_of_fame");

    newlyUnlocked;
  };
};
