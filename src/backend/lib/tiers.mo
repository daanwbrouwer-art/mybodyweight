import Map "mo:core/Map";
import TiersTypes "../types/tiers";
import UserTypes "../types/user";
import Time "mo:core/Time";

module {
  // ── Tier helpers ────────────────────────────────────────────────────────────

  /// Get the current tier for a principal.
  public func getTier(
    tierMap   : Map.Map<Principal, TiersTypes.SubscriberAccess>,
    principal : Principal,
    accounts  : Map.Map<Text, UserTypes.UserAccount>,
  ) : TiersTypes.UserTier {
    // Check for explicit subscriber override first
    switch (tierMap.get(principal)) {
      case (?access) {
        // If expiry is set and has passed, treat as non-subscriber
        switch (access.expiresAt) {
          case (?expiry) {
            if (expiry > Time.now()) { #Subscriber } else { #Registered };
          };
          case null {
            if (access.isIndefinite) { #Subscriber } else { #Registered };
          };
        };
      };
      case null {
        // Fallback: check if user has a registered account
        let hasAccount = accounts.entries().find(
          func((_, acct)) { acct.principal == principal }
        );
        switch (hasAccount) {
          case (?_) { #Registered };
          case null  { #Guest };
        };
      };
    };
  };

  /// Set the tier for a principal, persisting the access grant record.
  public func setTier(
    tierMap      : Map.Map<Principal, TiersTypes.SubscriberAccess>,
    principal    : Principal,
    tier         : TiersTypes.UserTier,
    expiresAt    : ?Int,
    isIndefinite : Bool,
    grantedBy    : ?Principal,
  ) : Result<(), Text> {
    switch (tier) {
      case (#Subscriber) {
        let access : TiersTypes.SubscriberAccess = {
          grantedBy;
          expiresAt;
          isIndefinite;
        };
        tierMap.add(principal, access);
        #ok(());
      };
      case (_) {
        // Removing from tierMap reverts to natural tier
        tierMap.remove(principal);
        #ok(());
      };
    };
  };

  /// Revoke a subscriber grant, demoting the principal to #Registered (or
  /// #Guest if they have no account).
  public func revokeTier(
    tierMap   : Map.Map<Principal, TiersTypes.SubscriberAccess>,
    principal : Principal,
  ) : Result<(), Text> {
    tierMap.remove(principal);
    #ok(());
  };

  // ── Onboarding helpers ─────────────────────────────────────────────────

  /// Persist gender + level and mark onboarding complete for a principal.
  public func saveOnboarding(
    onboardingMap : Map.Map<Principal, TiersTypes.OnboardingData>,
    principal     : Principal,
    gender        : Text,
    level         : Text,
  ) : Result<(), Text> {
    let data : TiersTypes.OnboardingData = {
      gender;
      level;
      hasCompletedOnboarding = true;
    };
    onboardingMap.add(principal, data);
    #ok(());
  };

  /// Retrieve onboarding data for a principal.
  public func getOnboarding(
    onboardingMap : Map.Map<Principal, TiersTypes.OnboardingData>,
    principal     : Principal,
  ) : ?TiersTypes.OnboardingData {
    onboardingMap.get(principal);
  };

  // ── Admin helpers ───────────────────────────────────────────────────────────

  /// Returns true when caller equals the stored admin principal.
  public func isAdmin(
    adminState : { var adminPrincipal : ?Principal },
    caller     : Principal,
  ) : Bool {
    switch (adminState.adminPrincipal) {
      case (?admin) { admin == caller };
      case null     { false };
    };
  };

  /// Build the full user list enriched with tier information for the admin.
  public func getAdminUserList(
    accounts  : Map.Map<Text, UserTypes.UserAccount>,
    tierMap   : Map.Map<Principal, TiersTypes.SubscriberAccess>,
  ) : [TiersTypes.AdminUserEntry] {
    accounts.entries().map<(Text, UserTypes.UserAccount), TiersTypes.AdminUserEntry>(
      func((_, acct)) {
        let maybeTier = tierMap.get(acct.principal);
        let (tier, expiresAt, isIndefinite) = switch (maybeTier) {
          case (?access) {
            (#Subscriber, access.expiresAt, access.isIndefinite);
          };
          case null {
            (#Registered, null, false);
          };
        };
        {
          principal    = acct.principal;
          email        = ?acct.email;
          tier;
          tierExpiresAt = expiresAt;
          isIndefinite;
        };
      }
    ).toArray();
  };

  // Result alias (module-level convenience)
  public type Result<A, B> = { #ok : A; #err : B };
};
