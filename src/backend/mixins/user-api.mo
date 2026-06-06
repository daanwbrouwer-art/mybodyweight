import Map "mo:core/Map";
import Time "mo:core/Time";
import UserTypes "../types/user";
import UserLib "../lib/user";

mixin (
  accounts       : Map.Map<Text, UserTypes.UserAccount>,
  emailTokens    : Map.Map<Text, UserTypes.EmailVerificationToken>,
  resetTokens    : Map.Map<Text, UserTypes.PasswordResetToken>,
  profiles       : Map.Map<Principal, UserTypes.UserProfile>,
  workoutHistory : Map.Map<Principal, [UserTypes.WorkoutHistoryEntry]>,
) {
  // ── Registration ─────────────────────────────────────────────────────
  public shared ({ caller }) func registerUser(
    username     : Text,
    email        : Text,
    passwordHash : Text,
  ) : async { #ok; #err : Text } {
    await UserLib.registerUser(accounts, emailTokens, username, email, passwordHash, caller, Time.now());
  };

  // ── Login ────────────────────────────────────────────────────────────
  public shared func loginUser(
    email        : Text,
    passwordHash : Text,
  ) : async { #ok : UserTypes.UserProfile; #err : Text } {
    UserLib.loginUser(accounts, profiles, email, passwordHash);
  };

  // ── Email verification ───────────────────────────────────────────────
  public shared func verifyEmail(
    token : Text,
  ) : async { #ok; #err : Text } {
    UserLib.verifyEmail(accounts, emailTokens, profiles, token, Time.now());
  };

  // ── Password reset ───────────────────────────────────────────────────
  public shared func requestPasswordReset(
    email : Text,
  ) : async { #ok; #err : Text } {
    await UserLib.requestPasswordReset(accounts, resetTokens, email, Time.now());
  };

  public shared func resetPassword(
    token           : Text,
    newPasswordHash : Text,
  ) : async { #ok; #err : Text } {
    UserLib.resetPassword(accounts, resetTokens, token, newPasswordHash, Time.now());
  };

  // ── Resend verification email ─────────────────────────────────────────
  public shared func resendVerificationEmail(
    email : Text,
  ) : async { #ok; #err : Text } {
    await UserLib.resendVerificationEmail(accounts, emailTokens, email, Time.now());
  };

  // ── Profile ──────────────────────────────────────────────────────────
  public shared query ({ caller }) func getMyProfile() : async { #ok : UserTypes.UserProfile; #err : Text } {
    UserLib.getMyProfile(profiles, caller);
  };

  public shared ({ caller }) func updateProfile(
    username : Text,
  ) : async { #ok; #err : Text } {
    UserLib.updateProfile(accounts, profiles, caller, username);
  };

  // ── Workout history ──────────────────────────────────────────────────
  public shared query ({ caller }) func getMyWorkoutHistory() : async { #ok : [UserTypes.WorkoutHistoryEntry]; #err : Text } {
    UserLib.getMyWorkoutHistory(workoutHistory, caller);
  };

  public shared ({ caller }) func saveWorkoutHistory(
    entry : UserTypes.WorkoutHistoryEntry,
  ) : async { #ok; #err : Text } {
    UserLib.saveWorkoutHistory(profiles, workoutHistory, caller, entry, Time.now());
  };
};
