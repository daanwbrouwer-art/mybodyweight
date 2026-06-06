import { createActor } from "@/backend";
import type { WorkoutHistoryEntry } from "@/backend";
import { useWorkoutStore } from "@/store/workout";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

export function useWorkoutHistory() {
  const guestMode = useWorkoutStore((s) => s.guestMode);
  const { actor, isFetching } = useActor(createActor);

  return useQuery<WorkoutHistoryEntry[]>({
    queryKey: ["workoutHistory", guestMode],
    queryFn: async () => {
      if (guestMode) return [];
      if (!actor) return [];
      const result = await actor.getMyWorkoutHistory();
      if (result && result.__kind__ === "ok") return result.ok;
      return [];
    },
    enabled: !guestMode && !!actor && !isFetching,
  });
}
