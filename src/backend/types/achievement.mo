module {
  /// Unique string identifier for each achievement
  public type AchievementId = Text;

  /// Rarity tier
  public type AchievementRarity = {
    #Common;
    #Uncommon;
    #Rare;
    #Epic;
    #Legendary;
  };

  /// A single achievement definition, optionally with an unlock timestamp
  public type Achievement = {
    id          : AchievementId;
    name        : Text;
    description : Text;
    rarity      : AchievementRarity;
    unlockedAt  : ?Int;  // null = locked
  };

  /// Trigger conditions (informational, used in checkAchievements logic)
  public type AchievementTrigger = {
    #CardDrawn       : Nat;                                               // nth card in a session
    #FullDeckCompleted : Nat;                                             // nth full deck total
    #SpecialCardDrawn  : { #King; #Ace; #Joker };                         // first of type
    #SpecialCardCount  : ({ #King; #Ace; #Joker }, Nat);                  // nth of type total
    #TotalReps         : Nat;                                             // total reps
    #SessionCompleted  : Nat;                                             // nth session
    #StreakDays        : Nat;                                             // streak length
  };
};
