import Map "mo:core/Map";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Principal "mo:core/Principal";
import UserTypes "../types/user";
import AchievementsLib "achievements";
import EmailClient "mo:caffeineai-email/emailClient";
import Debug "mo:core/Debug";

module {
  // ── Registration & Login ─────────────────────────────────────────────

  public func registerUser(
    accounts      : Map.Map<Text, UserTypes.UserAccount>,
    emailTokens   : Map.Map<Text, UserTypes.EmailVerificationToken>,
    username      : Text,
    email         : Text,
    passwordHash  : Text,
    caller        : Principal,
    now           : Int,
  ) : async { #ok; #err : Text } {
    // Validate username length
    let ulen = username.size();
    if (ulen < 3 or ulen > 20) {
      return #err "Username must be between 3 and 20 characters";
    };
    // Check for duplicate email
    for (acct in accounts.values()) {
      if (acct.email == email) {
        if (not acct.emailVerified) {
          // Account exists but is unconfirmed — resend verification email
          let newToken = now.toText() # caller.toText() # "resend";
          let verToken : UserTypes.EmailVerificationToken = {
            token         = newToken;
            userPrincipal = acct.principal;
            email         = email;
            createdAt     = now;
            used          = false;
          };
          emailTokens.add(newToken, verToken);
          let verifyUrl = "/verify-email?token=" # newToken;
          let html = "<h1>Confirm Your Email</h1><p>Hi " # acct.username # ", we received another request to confirm your email.</p><p><a href=\"" # verifyUrl # "\">Confirm your email</a> to complete registration.</p>";
          ignore (async {
            let result = await EmailClient.sendVerificationEmail("noreply@mybodyweight.app", [email], "MyBodyWeight \u{2013} Confirm Your Email", html);
            switch result {
              case (#err e) { Debug.print("[registerUser resend] email error: " # e) };
              case _ {};
            };
          });
          return #err "EMAIL_NOT_CONFIRMED: This email is already registered but not yet confirmed. A new confirmation email has been sent.";
        };
        return #err "Email already registered";
      };
    };
    // Create account keyed by email
    let newAccount : UserTypes.UserAccount = {
      principal     = caller;
      username      = username;
      email         = email;
      passwordHash  = passwordHash;
      emailVerified = false;
      createdAt     = now;
    };
    accounts.add(email, newAccount);
    // Generate and store email verification token
    let token = now.toText() # caller.toText();
    let verToken : UserTypes.EmailVerificationToken = {
      token         = token;
      userPrincipal = caller;
      email         = email;
      createdAt     = now;
      used          = false;
    };
    emailTokens.add(token, verToken);
    // Fire-and-forget welcome + verification email
    let verifyUrl = "/verify-email?token=" # token;
    let welcomeHtml = "<h1>Welcome to MyBodyWeight!</h1><p>Hi " # username # ", your account is active.</p><p><a href=\"" # verifyUrl # "\">Confirm your email</a> to complete registration.</p>";
    ignore (async {
      let result = await EmailClient.sendVerificationEmail("noreply@mybodyweight.app", [email], "Welcome to MyBodyWeight \u{2013} Confirm Your Email", welcomeHtml);
      switch result {
        case (#err e) { Debug.print("[registerUser] email error: " # e) };
        case _ {};
      };
    });
    #ok;
  };

  public func loginUser(
    accounts     : Map.Map<Text, UserTypes.UserAccount>,
    profiles     : Map.Map<Principal, UserTypes.UserProfile>,
    email        : Text,
    passwordHash : Text,
  ) : { #ok : UserTypes.UserProfile; #err : Text } {
    // Find account by email
    var found : ?UserTypes.UserAccount = null;
    for (acct in accounts.values()) {
      if (acct.email == email) { found := ?acct };
    };
    switch (found) {
      case null { #err "Invalid email or password" };
      case (?acct) {
        if (acct.passwordHash != passwordHash) {
          return #err "Invalid email or password";
        };
        if (not acct.emailVerified) {
          return #err "Email not verified. Please check your inbox.";
        };
        switch (profiles.get(acct.principal)) {
          case null { #err "Profile not found" };
          case (?profile) { #ok profile };
        };
      };
    };
  };

  // ── Email verification ───────────────────────────────────────────────

  public func verifyEmail(
    accounts    : Map.Map<Text, UserTypes.UserAccount>,
    emailTokens : Map.Map<Text, UserTypes.EmailVerificationToken>,
    profiles    : Map.Map<Principal, UserTypes.UserProfile>,
    token       : Text,
    now         : Int,
  ) : { #ok; #err : Text } {
    switch (emailTokens.get(token)) {
      case null { #err "Invalid verification token" };
      case (?tok) {
        if (tok.used) {
          return #err "Token already used";
        };
        // Get and update the account
        switch (accounts.get(tok.email)) {
          case null { #err "Account not found" };
          case (?acct) {
            let updated : UserTypes.UserAccount = { acct with emailVerified = true };
            accounts.add(tok.email, updated);
            // Create profile if not exists
            switch (profiles.get(tok.userPrincipal)) {
              case null {
                let profile : UserTypes.UserProfile = {
                  principal      = tok.userPrincipal;
                  username       = acct.username;
                  email          = acct.email;
                  emailVerified  = true;
                  createdAt      = acct.createdAt;
                  totalWorkouts  = 0;
                  totalCalories  = 0;
                  totalRepsPerSuit = { hearts = 0; spades = 0; clubs = 0; diamonds = 0 };
                  currentStreak       = 0;
                  longestStreak       = 0;
                  lastWorkoutDate     = null;
                  totalReps           = 0;
                  kingCardsDrawn      = 0;
                  aceCardsDrawn       = 0;
                  jokerCardsDrawn     = 0;
                  fullDecksCompleted  = 0;
                  unlockedAchievements = [];
                };
                profiles.add(tok.userPrincipal, profile);
              };
              case (?_existing) { /* already exists, keep it */ };
            };
            // Mark token as used
            emailTokens.add(token, { tok with used = true });
            ignore now;
            #ok;
          };
        };
      };
    };
  };

  // ── Password reset ───────────────────────────────────────────────────

  public func requestPasswordReset(
    accounts      : Map.Map<Text, UserTypes.UserAccount>,
    resetTokens   : Map.Map<Text, UserTypes.PasswordResetToken>,
    email         : Text,
    now           : Int,
  ) : async { #ok; #err : Text } {
    // Scan for account by email — always return #ok for security (avoid email enumeration)
    var found = false;
    for (acct in accounts.values()) {
      if (acct.email == email) { found := true };
    };
    if (found) {
      let resetToken = "rst" # now.toText();
      let resetEntry : UserTypes.PasswordResetToken = {
        token     = resetToken;
        email     = email;
        createdAt = now;
        used      = false;
      };
      resetTokens.add(resetToken, resetEntry);
      // Fire-and-forget password reset email
      let resetUrl = "/reset-password?token=" # resetToken;
      let resetHtml = "<h1>Reset Your Password</h1><p>Click below to reset your MyBodyWeight password:</p><p><a href=\"" # resetUrl # "\">Reset Password</a></p>";
      ignore (async {
        let result = await EmailClient.sendServiceEmail("noreply@mybodyweight.app", [email], "MyBodyWeight \u{2013} Reset Your Password", resetHtml);
        switch result {
          case (#err e) { Debug.print("[requestPasswordReset] email error: " # e) };
          case _ {};
        };
      });
    };
    #ok;
  };

  public func resetPassword(
    accounts        : Map.Map<Text, UserTypes.UserAccount>,
    resetTokens     : Map.Map<Text, UserTypes.PasswordResetToken>,
    token           : Text,
    newPasswordHash : Text,
    now             : Int,
  ) : { #ok; #err : Text } {
    switch (resetTokens.get(token)) {
      case null { #err "Invalid reset token" };
      case (?tok) {
        if (tok.used) {
          return #err "Token already used";
        };
        // Check 24h expiry
        if (now - tok.createdAt > 86400 * 1_000_000_000) {
          return #err "Token has expired";
        };
        // Find account by email stored in token
        switch (accounts.get(tok.email)) {
          case null { #err "Account not found" };
          case (?acct) {
            let updated : UserTypes.UserAccount = { acct with passwordHash = newPasswordHash };
            accounts.add(tok.email, updated);
            resetTokens.add(token, { tok with used = true });
            #ok;
          };
        };
      };
    };
  };

  // ── Resend verification email ─────────────────────────────────────────

  public func resendVerificationEmail(
    accounts    : Map.Map<Text, UserTypes.UserAccount>,
    emailTokens : Map.Map<Text, UserTypes.EmailVerificationToken>,
    email       : Text,
    now         : Int,
  ) : async { #ok; #err : Text } {
    // Find account by email
    var found : ?UserTypes.UserAccount = null;
    for (acct in accounts.values()) {
      if (acct.email == email) { found := ?acct };
    };
    switch (found) {
      case null { #err "Email not found" };
      case (?acct) {
        if (acct.emailVerified) {
          return #err "Email is already confirmed";
        };
        // Generate a fresh token
        let newToken = now.toText() # acct.principal.toText() # "resend2";
        let verToken : UserTypes.EmailVerificationToken = {
          token         = newToken;
          userPrincipal = acct.principal;
          email         = email;
          createdAt     = now;
          used          = false;
        };
        emailTokens.add(newToken, verToken);
        let verifyUrl = "/verify-email?token=" # newToken;
        let html = "<h1>Confirm Your Email</h1><p>Hi " # acct.username # ", here is your new confirmation link.</p><p><a href=\"" # verifyUrl # "\">Confirm your email</a></p>";
        ignore (async {
          let result = await EmailClient.sendVerificationEmail("noreply@mybodyweight.app", [email], "MyBodyWeight \u{2013} Confirm Your Email", html);
          switch result {
            case (#err e) { Debug.print("[resendVerificationEmail] email error: " # e) };
            case _ {};
          };
        });
        #ok;
      };
    };
  };

  // ── Profile ──────────────────────────────────────────────────────────

  public func getMyProfile(
    profiles : Map.Map<Principal, UserTypes.UserProfile>,
    caller   : Principal,
  ) : { #ok : UserTypes.UserProfile; #err : Text } {
    switch (profiles.get(caller)) {
      case null  { #err "Profile not found" };
      case (?p)  { #ok p };
    };
  };

  public func updateProfile(
    accounts : Map.Map<Text, UserTypes.UserAccount>,
    profiles : Map.Map<Principal, UserTypes.UserProfile>,
    caller   : Principal,
    username : Text,
  ) : { #ok; #err : Text } {
    switch (profiles.get(caller)) {
      case null { #err "Profile not found" };
      case (?profile) {
        let updatedProfile : UserTypes.UserProfile = { profile with username = username };
        profiles.add(caller, updatedProfile);
        // Also update username in account
        switch (accounts.get(profile.email)) {
          case null { /* account lookup by email may not exist — skip */ };
          case (?acct) {
            accounts.add(profile.email, { acct with username = username });
          };
        };
        #ok;
      };
    };
  };

  // ── Workout history ──────────────────────────────────────────────────

  public func getMyWorkoutHistory(
    workoutHistory : Map.Map<Principal, [UserTypes.WorkoutHistoryEntry]>,
    caller         : Principal,
  ) : { #ok : [UserTypes.WorkoutHistoryEntry]; #err : Text } {
    #ok (workoutHistory.get(caller) ?? []);
  };

  public func saveWorkoutHistory(
    profiles       : Map.Map<Principal, UserTypes.UserProfile>,
    workoutHistory : Map.Map<Principal, [UserTypes.WorkoutHistoryEntry]>,
    caller         : Principal,
    entry          : UserTypes.WorkoutHistoryEntry,
    now            : Int,
  ) : { #ok; #err : Text } {
    let existing = workoutHistory.get(caller) ?? [];
    let updated = Array.tabulate(
      existing.size() + 1,
      func(i) { if (i < existing.size()) existing[i] else entry },
    );
    workoutHistory.add(caller, updated);
    // Update profile stats
    switch (profiles.get(caller)) {
      case null { /* no profile to update */ };
      case (?profile) {
        let suits = profile.totalRepsPerSuit;
        let newSuits = {
          hearts   = suits.hearts   + entry.repsBySuit.hearts;
          spades   = suits.spades   + entry.repsBySuit.spades;
          clubs    = suits.clubs    + entry.repsBySuit.clubs;
          diamonds = suits.diamonds + entry.repsBySuit.diamonds;
        };
        let isFullDeck = entry.cardsCompleted >= 52;
        let newFullDecks = profile.fullDecksCompleted + (if (isFullDeck) 1 else 0);
        let newKing  = profile.kingCardsDrawn  + entry.kingCardsDrawn;
        let newAce   = profile.aceCardsDrawn   + entry.aceCardsDrawn;
        let newJoker = profile.jokerCardsDrawn + entry.jokerCardsDrawn;
        let newTotalReps = profile.totalReps + entry.totalReps;
        let newTotalWorkouts = profile.totalWorkouts + 1;

        // Check achievements with updated stats
        let userStats : AchievementsLib.UserStats = {
          totalWorkouts      = newTotalWorkouts;
          currentStreak      = profile.currentStreak;
          totalReps          = newTotalReps;
          kingCardsDrawn     = newKing;
          aceCardsDrawn      = newAce;
          jokerCardsDrawn    = newJoker;
          fullDecksCompleted = newFullDecks;
        };
        let sessionStats : AchievementsLib.SessionStats = {
          cardsDrawnThisSession = entry.cardsCompleted;
          isFullDeck            = isFullDeck;
        };
        let candidates = AchievementsLib.checkAchievements(userStats, sessionStats);
        // Only persist achievements not already unlocked
        let alreadyOwned = profile.unlockedAchievements;
        var newAchievements : [(Text, Int)] = [];
        for (aid in candidates.values()) {
          var already = false;
          for ((owned, _) in alreadyOwned.values()) {
            if (owned == aid) { already := true };
          };
          if (not already) {
            newAchievements := Array.tabulate(
              newAchievements.size() + 1,
              func(i) { if (i < newAchievements.size()) newAchievements[i] else (aid, now) },
            );
          };
        };
        let combinedAchievements = Array.tabulate(
          alreadyOwned.size() + newAchievements.size(),
          func(i) {
            if (i < alreadyOwned.size()) alreadyOwned[i]
            else newAchievements[i - alreadyOwned.size()];
          },
        );

        let updatedProfile : UserTypes.UserProfile = {
          profile with
          totalWorkouts        = newTotalWorkouts;
          totalCalories        = profile.totalCalories + entry.caloriesBurned;
          totalRepsPerSuit     = newSuits;
          lastWorkoutDate      = ?entry.completedAt;
          totalReps            = newTotalReps;
          fullDecksCompleted   = newFullDecks;
          kingCardsDrawn       = newKing;
          aceCardsDrawn        = newAce;
          jokerCardsDrawn      = newJoker;
          unlockedAchievements = combinedAchievements;
        };
        profiles.add(caller, updatedProfile);
      };
    };
    #ok;
  };
};
