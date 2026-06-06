import { c as createLucideIcon, a as useWorkoutStore, g as useQuery } from "./index-DqGOMkPn.js";
import { c as createActor } from "./backend-Bt8BEzt7.js";
import { u as useActor } from "./useActor-BRlpmEWG.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z",
      key: "9m4mmf"
    }
  ],
  ["path", { d: "m2.5 21.5 1.4-1.4", key: "17g3f0" }],
  ["path", { d: "m20.1 3.9 1.4-1.4", key: "1qn309" }],
  [
    "path",
    {
      d: "M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z",
      key: "1t2c92"
    }
  ],
  ["path", { d: "m9.6 14.4 4.8-4.8", key: "6umqxw" }]
];
const Dumbbell = createLucideIcon("dumbbell", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode);
function useProfile() {
  const guestMode = useWorkoutStore((s) => s.guestMode);
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["profile", guestMode],
    queryFn: async () => {
      if (guestMode) return null;
      if (!actor) return null;
      const result = await actor.getMyProfile();
      if (result && result.__kind__ === "ok") return result.ok;
      return null;
    },
    enabled: !guestMode && !!actor && !isFetching
  });
}
function useWorkoutHistory() {
  const guestMode = useWorkoutStore((s) => s.guestMode);
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["workoutHistory", guestMode],
    queryFn: async () => {
      if (guestMode) return [];
      if (!actor) return [];
      const result = await actor.getMyWorkoutHistory();
      if (result && result.__kind__ === "ok") return result.ok;
      return [];
    },
    enabled: !guestMode && !!actor && !isFetching
  });
}
export {
  Dumbbell as D,
  User as U,
  useWorkoutHistory as a,
  useProfile as u
};
