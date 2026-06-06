import { useWorkoutStore } from "@/store/workout";
import type { OnboardingData } from "@/types/user";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useCallback, useEffect, useState } from "react";

const GUEST_ONBOARDING_KEY = "mbw_guest_onboarding";
const USER_ONBOARDING_KEY = "mbw_onboarding";

function readOnboarding(isGuest: boolean): OnboardingData | null {
  const key = isGuest ? GUEST_ONBOARDING_KEY : USER_ONBOARDING_KEY;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as OnboardingData;
  } catch {
    return null;
  }
}

function writeOnboarding(isGuest: boolean, data: OnboardingData): void {
  const key = isGuest ? GUEST_ONBOARDING_KEY : USER_ONBOARDING_KEY;
  localStorage.setItem(key, JSON.stringify(data));
}

export function useOnboarding() {
  const { loginStatus } = useInternetIdentity();
  const guestMode = useWorkoutStore((s) => s.guestMode);
  const isEmailAuth = localStorage.getItem("mbw_user") !== null;
  const isAuthenticated = loginStatus === "success" || isEmailAuth;
  const isGuest = guestMode && !isAuthenticated;

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<OnboardingData | null>(null);

  useEffect(() => {
    if (guestMode) {
      setIsLoading(false);
      setData(null);
      return;
    }
    setIsLoading(true);
    const stored = readOnboarding(isGuest);
    setData(stored);
    setIsLoading(false);
  }, [isGuest, guestMode]);

  const saveOnboarding = useCallback(
    async (gender: string, level: string) => {
      if (guestMode) return;
      const updated: OnboardingData = {
        gender,
        level,
        hasCompletedOnboarding: true,
      };
      writeOnboarding(isGuest, updated);
      setData(updated);
    },
    [isGuest, guestMode],
  );

  if (guestMode) {
    return {
      hasCompletedOnboarding: true,
      gender: null,
      level: null,
      saveOnboarding,
      isLoading: false,
    };
  }

  return {
    hasCompletedOnboarding: data?.hasCompletedOnboarding ?? false,
    gender: data?.gender ?? null,
    level: data?.level ?? null,
    saveOnboarding,
    isLoading,
  };
}
