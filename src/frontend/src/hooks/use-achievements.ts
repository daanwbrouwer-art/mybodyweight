import { useWorkoutStore } from "@/store/workout";
import { ALL_ACHIEVEMENTS, type Achievement } from "@/types/achievements";
import { useQuery } from "@tanstack/react-query";

export function useAchievements() {
  const guestMode = useWorkoutStore((s) => s.guestMode);

  const { data, isLoading, refetch } = useQuery<Achievement[]>({
    queryKey: ["achievements", guestMode],
    queryFn: async () => {
      // Achievements are client-side only for now.
      // In the future, this can sync with the backend when an
      // achievements endpoint is added.
      return ALL_ACHIEVEMENTS.map((a) => ({ ...a }));
    },
    enabled: true,
  });

  const achievements = data ?? ALL_ACHIEVEMENTS.map((a) => ({ ...a }));
  const unlockedCount = achievements.filter(
    (a) => a.unlockedAt !== undefined,
  ).length;

  return {
    achievements,
    unlockedCount,
    totalCount: ALL_ACHIEVEMENTS.length,
    isLoading,
    refetch,
  };
}
