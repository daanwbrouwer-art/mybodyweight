import { createActor } from "@/backend";
import type { UserProfile } from "@/backend";
import { useWorkoutStore } from "@/store/workout";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

export function useProfile() {
  const guestMode = useWorkoutStore((s) => s.guestMode);
  const { actor, isFetching } = useActor(createActor);

  return useQuery<UserProfile | null>({
    queryKey: ["profile", guestMode],
    queryFn: async () => {
      if (guestMode) return null;
      if (!actor) return null;
      const result = await actor.getMyProfile();
      if (result && result.__kind__ === "ok") return result.ok;
      return null;
    },
    enabled: !guestMode && !!actor && !isFetching,
  });
}
