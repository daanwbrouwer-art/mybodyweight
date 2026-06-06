export type UserTier = "guest" | "registered" | "subscriber";

export interface OnboardingData {
  gender: string;
  level: string;
  hasCompletedOnboarding: boolean;
}
