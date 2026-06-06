import { useWorkoutStore } from "@/store/workout";
import type { UserTier } from "@/types/user";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";

export async function hashPassword(p: string): Promise<string> {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(p),
  );
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function useAuth() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const { guestMode, setGuestMode } = useWorkoutStore();

  const mbwUser = localStorage.getItem("mbw_user");
  const isEmailAuth = mbwUser !== null;
  const isAuthenticated = loginStatus === "success" || isEmailAuth;
  const principal = identity?.getPrincipal() ?? null;

  // Derive tier: subscriber if mbw_subscriber flag set (admin-granted), else registered for logged-in, guest otherwise
  const isSubscriber = localStorage.getItem("mbw_subscriber") === "true";
  const userTier: UserTier = guestMode
    ? "guest"
    : isAuthenticated
      ? isSubscriber
        ? "subscriber"
        : "registered"
      : "guest";

  const continueAsGuest = () => setGuestMode(true);
  const exitGuestMode = () => setGuestMode(false);
  const setIsGuest = (v: boolean) => setGuestMode(v);

  return {
    isAuthenticated,
    login,
    logout: clear,
    loginStatus,
    principal,
    isGuest: guestMode,
    setIsGuest,
    continueAsGuest,
    exitGuestMode,
    userTier,
  };
}
