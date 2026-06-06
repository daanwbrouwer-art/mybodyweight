import { createActor } from "@/backend";
import { useWorkoutStore } from "@/store/workout";
import type { Deck } from "@/types/workout";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

export function useDecks() {
  const guestMode = useWorkoutStore((s) => s.guestMode);
  const { actor, isFetching } = useActor(createActor);

  return useQuery<Deck[]>({
    queryKey: ["decks", guestMode],
    queryFn: async () => {
      if (guestMode) return [];
      if (!actor) return [];
      return actor.getDecks();
    },
    enabled: !guestMode && !!actor && !isFetching,
  });
}

export function useDeck(id: bigint | null) {
  const guestMode = useWorkoutStore((s) => s.guestMode);
  const { actor, isFetching } = useActor(createActor);

  return useQuery({
    queryKey: ["deck", id?.toString(), guestMode],
    queryFn: async () => {
      if (guestMode) return null;
      if (!actor || id === null) return null;
      return actor.getDeck(id);
    },
    enabled: !guestMode && !!actor && !isFetching && id !== null,
  });
}
