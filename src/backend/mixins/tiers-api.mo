import Map "mo:core/Map";
import TiersTypes "../types/tiers";
import TiersLib "../lib/tiers";
import UserTypes "../types/user";
import CommonTypes "../types/common";

mixin (
  accounts      : Map.Map<Text, UserTypes.UserAccount>,
  tierMap       : Map.Map<Principal, TiersTypes.SubscriberAccess>,
  onboardingMap : Map.Map<Principal, TiersTypes.OnboardingData>,
  adminState    : { var adminPrincipal : ?Principal },
  counters      : { var nextDeckId : Nat; var nextCardId : Nat; var nextSessionId : Nat },
) {
  // ── Tier API ───────────────────────────────────────────────────────────────

  /// Return the tier of any principal.
  public shared query ({ caller = _ }) func getTier(userId : Principal) : async TiersTypes.UserTier {
    TiersLib.getTier(tierMap, userId, accounts);
  };

  /// (Admin-only) Explicitly set a principal's tier.
  public shared ({ caller }) func setTier(
    userId       : Principal,
    tier         : TiersTypes.UserTier,
    expiresAt    : ?Int,
    isIndefinite : Bool,
  ) : async TiersLib.Result<(), Text> {
    if (not TiersLib.isAdmin(adminState, caller)) {
      return #err("Unauthorized");
    };
    TiersLib.setTier(tierMap, userId, tier, expiresAt, isIndefinite, ?caller);
  };

  /// (Admin-only) Revoke a subscriber grant.
  public shared ({ caller }) func revokeTier(
    userId : Principal,
  ) : async TiersLib.Result<(), Text> {
    if (not TiersLib.isAdmin(adminState, caller)) {
      return #err("Unauthorized");
    };
    TiersLib.revokeTier(tierMap, userId);
  };

  // ── Onboarding API ──────────────────────────────────────────────────────────

  /// Save the caller's gender and fitness level; marks onboarding complete.
  public shared ({ caller }) func saveOnboarding(
    gender : Text,
    level  : Text,
  ) : async TiersLib.Result<(), Text> {
    TiersLib.saveOnboarding(onboardingMap, caller, gender, level);
  };

  /// Return the caller's onboarding data (null if not yet completed).
  public shared query ({ caller }) func getOnboarding() : async ?TiersTypes.OnboardingData {
    TiersLib.getOnboarding(onboardingMap, caller);
  };

  // ── Admin Panel API ──────────────────────────────────────────────────────────

  /// (Admin-only) List all registered users with their tier info.
  public shared ({ caller }) func getAdminUserList()
    : async TiersLib.Result<[TiersTypes.AdminUserEntry], Text>
  {
    if (not TiersLib.isAdmin(adminState, caller)) {
      return #err("Unauthorized");
    };
    #ok(TiersLib.getAdminUserList(accounts, tierMap));
  };

  /// (Admin-only) Grant subscriber access to a target principal.
  public shared ({ caller }) func adminGrantSubscriber(
    targetPrincipal : Principal,
    expiresAt       : ?Int,
    isIndefinite    : Bool,
  ) : async TiersLib.Result<(), Text> {
    if (not TiersLib.isAdmin(adminState, caller)) {
      return #err("Unauthorized");
    };
    TiersLib.setTier(tierMap, targetPrincipal, #Subscriber, expiresAt, isIndefinite, ?caller);
  };

  /// (Admin-only) Revoke subscriber access from a target principal.
  public shared ({ caller }) func adminRevokeSubscriber(
    targetPrincipal : Principal,
  ) : async TiersLib.Result<(), Text> {
    if (not TiersLib.isAdmin(adminState, caller)) {
      return #err("Unauthorized");
    };
    TiersLib.revokeTier(tierMap, targetPrincipal);
  };

  /// (Owner-only) Set or replace the admin principal.
  public shared ({ caller }) func setAdminPrincipal(
    newAdmin : Principal,
  ) : async TiersLib.Result<(), Text> {
    // Only current admin or unset admin (first-time setup) can set
    switch (adminState.adminPrincipal) {
      case (?existing) {
        if (existing != caller) { return #err("Unauthorized") };
      };
      case null {}; // first-time setup: any caller may set admin
    };
    adminState.adminPrincipal := ?newAdmin;
    #ok(());
  };
};
