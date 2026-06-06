import Map "mo:core/Map";
import CommonTypes "types/common";
import DeckTypes "types/deck";
import SessionTypes "types/session";
import DeckLib "lib/deck";
import DeckApi "mixins/deck-api";
import SessionApi "mixins/session-api";
import UserTypes "types/user";
import UserApi "mixins/user-api";
import TiersTypes "types/tiers";
import TiersApi "mixins/tiers-api";
import AchievementsApi "mixins/achievements-api";





actor {
  // ── Shared mutable counters ────────────────────────────────────────
  let counters = {
    var nextDeckId    : Nat = 1;
    var nextCardId    : Nat = 1;
    var nextSessionId : Nat = 1;
  };

  // ── Persistent state ───────────────────────────────────────────────
  let decks    : Map.Map<CommonTypes.DeckId,    DeckTypes.Deck>              = Map.empty();
  let cards    : Map.Map<CommonTypes.CardId,    DeckTypes.Card>              = Map.empty();
  let sessions : Map.Map<CommonTypes.SessionId, SessionTypes.WorkoutSession> = Map.empty();
  let accounts       : Map.Map<Text, UserTypes.UserAccount>                           = Map.empty();
  let emailTokens    : Map.Map<Text, UserTypes.EmailVerificationToken>                = Map.empty();
  let resetTokens    : Map.Map<Text, UserTypes.PasswordResetToken>                   = Map.empty();
  let profiles       : Map.Map<Principal, UserTypes.UserProfile>                     = Map.empty();
  let workoutHistory : Map.Map<Principal, [UserTypes.WorkoutHistoryEntry]>           = Map.empty();
  let tierMap        : Map.Map<Principal, TiersTypes.SubscriberAccess>               = Map.empty();
  let onboardingMap  : Map.Map<Principal, TiersTypes.OnboardingData>                 = Map.empty();
  let adminState     = { var adminPrincipal : ?Principal = null };

  // ── Seed initial deck data on first install ────────────────────────
  DeckLib.seedInitialData(decks, cards, counters);

  // ── Mixin composition ─────────────────────────────────────────────
  include DeckApi(decks, cards, counters);
  include SessionApi(sessions, cards, decks, counters);
  include UserApi(accounts, emailTokens, resetTokens, profiles, workoutHistory);
  include TiersApi(accounts, tierMap, onboardingMap, adminState, counters);
  include AchievementsApi(profiles);
};

