import Map "mo:core/Map";
import UserTypes "../types/user";
import AchievementTypes "../types/achievement";
import AchievementsLib "../lib/achievements";

mixin (
  profiles : Map.Map<Principal, UserTypes.UserProfile>,
) {
  /// Returns all 30 achievements for the caller, with unlockedAt populated
  /// for any achievement IDs stored in the caller's profile.
  public shared query ({ caller }) func getAchievements() : async [AchievementTypes.Achievement] {
    let base = AchievementsLib.allAchievements();
    switch (profiles.get(caller)) {
      case null { base };
      case (?profile) {
        base.map<AchievementTypes.Achievement, AchievementTypes.Achievement>(
          func(a) {
            // Look for a matching unlock entry
            var ts : ?Int = null;
            for ((aid, t) in profile.unlockedAchievements.values()) {
              if (aid == a.id) { ts := ?t };
            };
            { a with unlockedAt = ts };
          }
        );
      };
    };
  };

  /// Returns only the unlocked achievement IDs and their timestamps.
  public shared query ({ caller }) func getUserAchievements() : async [(Text, Int)] {
    switch (profiles.get(caller)) {
      case null { [] };
      case (?profile) { profile.unlockedAchievements };
    };
  };
};
