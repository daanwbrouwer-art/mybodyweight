import Debug "mo:core/Debug";

module {
  // ── User Tier ────────────────────────────────────────────────────────
  public type UserTier = {
    #Guest;
    #Registered;
    #Subscriber;
  };

  // ── Subscriber access grant record ──────────────────────────────────
  public type SubscriberAccess = {
    grantedBy    : ?Principal;
    expiresAt    : ?Int;
    isIndefinite : Bool;
  };

  // ── Onboarding data ──────────────────────────────────────────────────
  public type OnboardingData = {
    gender                 : Text;
    level                  : Text;
    hasCompletedOnboarding : Bool;
  };

  // ── Admin user entry (returned by admin list endpoint) ───────────────
  public type AdminUserEntry = {
    principal    : Principal;
    email        : ?Text;
    tier         : UserTier;
    tierExpiresAt : ?Int;
    isIndefinite  : Bool;
  };
};
