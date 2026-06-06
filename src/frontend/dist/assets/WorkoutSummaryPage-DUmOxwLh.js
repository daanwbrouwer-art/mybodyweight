var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _client, _currentResult, _currentMutation, _mutateOptions, _MutationObserver_instances, updateResult_fn, notify_fn, _a;
import { S as Subscribable, s as shallowEqualObjects, n as hashKey, o as getDefaultState, p as notifyManager, f as useQueryClient, r as reactExports, q as noop, t as shouldThrowError, c as createLucideIcon, u as useNavigate, a as useWorkoutStore, P as Principal, j as jsxRuntimeExports, L as Logo, m as motion, T as Trophy } from "./index-DqGOMkPn.js";
import { c as createActor } from "./backend-Bt8BEzt7.js";
import { B as Button } from "./button-CQwKH8lW.js";
import { C as CARD_COUNT_LABEL, a as CircleCheck, f as formatTime } from "./use-timer-C85FFfco.js";
import { u as useWorkout } from "./use-workout-CvigGjhZ.js";
import { u as useActor } from "./useActor-BRlpmEWG.js";
import { S as Sparkles } from "./sparkles-DtHmVhRH.js";
import { C as Clock, F as Flame } from "./flame-ClYgZPRQ.js";
import { Z as Zap } from "./zap-ClIEObTD.js";
import { H as House } from "./house-C3y0ia5b.js";
var MutationObserver = (_a = class extends Subscribable {
  constructor(client, options) {
    super();
    __privateAdd(this, _MutationObserver_instances);
    __privateAdd(this, _client);
    __privateAdd(this, _currentResult);
    __privateAdd(this, _currentMutation);
    __privateAdd(this, _mutateOptions);
    __privateSet(this, _client, client);
    this.setOptions(options);
    this.bindMethods();
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
  }
  bindMethods() {
    this.mutate = this.mutate.bind(this);
    this.reset = this.reset.bind(this);
  }
  setOptions(options) {
    var _a2;
    const prevOptions = this.options;
    this.options = __privateGet(this, _client).defaultMutationOptions(options);
    if (!shallowEqualObjects(this.options, prevOptions)) {
      __privateGet(this, _client).getMutationCache().notify({
        type: "observerOptionsUpdated",
        mutation: __privateGet(this, _currentMutation),
        observer: this
      });
    }
    if ((prevOptions == null ? void 0 : prevOptions.mutationKey) && this.options.mutationKey && hashKey(prevOptions.mutationKey) !== hashKey(this.options.mutationKey)) {
      this.reset();
    } else if (((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state.status) === "pending") {
      __privateGet(this, _currentMutation).setOptions(this.options);
    }
  }
  onUnsubscribe() {
    var _a2;
    if (!this.hasListeners()) {
      (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    }
  }
  onMutationUpdate(action) {
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this, action);
  }
  getCurrentResult() {
    return __privateGet(this, _currentResult);
  }
  reset() {
    var _a2;
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, void 0);
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this);
  }
  mutate(variables, options) {
    var _a2;
    __privateSet(this, _mutateOptions, options);
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, __privateGet(this, _client).getMutationCache().build(__privateGet(this, _client), this.options));
    __privateGet(this, _currentMutation).addObserver(this);
    return __privateGet(this, _currentMutation).execute(variables);
  }
}, _client = new WeakMap(), _currentResult = new WeakMap(), _currentMutation = new WeakMap(), _mutateOptions = new WeakMap(), _MutationObserver_instances = new WeakSet(), updateResult_fn = function() {
  var _a2;
  const state = ((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state) ?? getDefaultState();
  __privateSet(this, _currentResult, {
    ...state,
    isPending: state.status === "pending",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    isIdle: state.status === "idle",
    mutate: this.mutate,
    reset: this.reset
  });
}, notify_fn = function(action) {
  notifyManager.batch(() => {
    var _a2, _b, _c, _d, _e, _f, _g, _h;
    if (__privateGet(this, _mutateOptions) && this.hasListeners()) {
      const variables = __privateGet(this, _currentResult).variables;
      const onMutateResult = __privateGet(this, _currentResult).context;
      const context = {
        client: __privateGet(this, _client),
        meta: this.options.meta,
        mutationKey: this.options.mutationKey
      };
      if ((action == null ? void 0 : action.type) === "success") {
        try {
          (_b = (_a2 = __privateGet(this, _mutateOptions)).onSuccess) == null ? void 0 : _b.call(
            _a2,
            action.data,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_d = (_c = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _d.call(
            _c,
            action.data,
            null,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      } else if ((action == null ? void 0 : action.type) === "error") {
        try {
          (_f = (_e = __privateGet(this, _mutateOptions)).onError) == null ? void 0 : _f.call(
            _e,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_h = (_g = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _h.call(
            _g,
            void 0,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      }
    }
    this.listeners.forEach((listener) => {
      listener(__privateGet(this, _currentResult));
    });
  });
}, _a);
function useMutation(options, queryClient) {
  const client = useQueryClient();
  const [observer] = reactExports.useState(
    () => new MutationObserver(
      client,
      options
    )
  );
  reactExports.useEffect(() => {
    observer.setOptions(options);
  }, [observer, options]);
  const result = reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => observer.subscribe(notifyManager.batchCalls(onStoreChange)),
      [observer]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  const mutate = reactExports.useCallback(
    (variables, mutateOptions) => {
      observer.mutate(variables, mutateOptions).catch(noop);
    },
    [observer]
  );
  if (result.error && shouldThrowError(observer.options.throwOnError, [result.error])) {
    throw result.error;
  }
  return { ...result, mutate, mutateAsync: result.mutate };
}
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m10 17 5-5-5-5", key: "1bsop3" }],
  ["path", { d: "M15 12H3", key: "6jk70r" }],
  ["path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4", key: "u53s6r" }]
];
const LogIn = createLucideIcon("log-in", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
];
const RotateCcw = createLucideIcon("rotate-ccw", __iconNode);
function ConfettiParticle({
  delay,
  x,
  color,
  shape
}) {
  const sizeClass = shape === "rect" ? "w-3 h-1.5" : shape === "circle" ? "w-2 h-2 rounded-full" : "w-2 h-2 rounded-sm";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      className: `absolute top-0 ${sizeClass} ${color}`,
      style: { left: `${x}%` },
      initial: { y: -20, opacity: 1, rotate: 0, scale: 1 },
      animate: {
        y: "110vh",
        opacity: [1, 1, 0.8, 0],
        rotate: [0, 180, 360, 540],
        scale: [1, 1.3, 0.8, 0.5]
      },
      transition: {
        duration: 2.8 + delay * 0.3,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  );
}
const CONFETTI_COLORS = [
  "bg-primary",
  "bg-yellow-400",
  "bg-orange-400",
  "bg-rose-400",
  "bg-purple-400",
  "bg-primary",
  "bg-amber-300",
  "bg-emerald-400"
];
const CONFETTI_SHAPES = [
  "square",
  "circle",
  "rect"
];
const CONFETTI_PIECES = Array.from({ length: 48 }, (_, i) => ({
  id: i,
  x: (i * 2.1 + Math.sin(i * 37) * 8 + 100) % 100,
  delay: i % 14 * 0.07,
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  shape: CONFETTI_SHAPES[i % CONFETTI_SHAPES.length]
}));
function getMotivation(selectedCardCount, completionPct) {
  if (completionPct === 100) {
    if (selectedCardCount === "FullDeck")
      return "LEGENDARY. You conquered the full 52-card gauntlet!";
    if (selectedCardCount === "Twenty")
      return "BEAST MODE. 20 cards down — you're unstoppable.";
    return "SOLID START. Every rep builds the foundation.";
  }
  if (completionPct >= 75) return "SO CLOSE. That's elite-level commitment.";
  if (completionPct >= 50) return "HALFWAY WARRIOR. Come back and finish it.";
  return "EVERY SET COUNTS. Rest, recover, come back stronger.";
}
const SUIT_GROUP = {
  Hearts: { label: "Push Ups", emoji: "♥" },
  Diamonds: { label: "Rows", emoji: "♦" },
  Clubs: { label: "Dips", emoji: "♣" },
  Spades: { label: "Pull Ups", emoji: "♠" },
  Joker: { label: "Joker Challenges", emoji: "🃏" }
};
const SUIT_ACCENT = {
  Hearts: "oklch(0.65 0.22 25)",
  // red
  Spades: "oklch(0.72 0.0 260)",
  // light silver
  Diamonds: "oklch(0.65 0.22 25)",
  // red
  Clubs: "oklch(0.72 0.0 260)",
  // light silver
  Joker: "oklch(0.85 0.18 85)"
  // gold
};
function buildBreakdown(playedCards) {
  const suitCounts = {};
  const repMap = {};
  let jokerCount = 0;
  let totalReps = 0;
  for (const sc of playedCards) {
    const suit = sc.card.suit;
    if (suit === "Joker") {
      jokerCount++;
      continue;
    }
    suitCounts[suit] = (suitCounts[suit] ?? 0) + 1;
    const ex = sc.card.exercise;
    if (ex) {
      const reps = sc.reps ?? 0;
      if (!repMap[ex]) repMap[ex] = { reps: 0, suit };
      repMap[ex].reps += reps;
      totalReps += reps;
    }
  }
  const suitGroups = Object.entries(suitCounts).map(([suit, count]) => {
    var _a2, _b;
    return {
      label: ((_a2 = SUIT_GROUP[suit]) == null ? void 0 : _a2.label) ?? suit,
      count,
      emoji: ((_b = SUIT_GROUP[suit]) == null ? void 0 : _b.emoji) ?? "•"
    };
  }).sort((a, b) => b.count - a.count);
  const exerciseRows = Object.entries(repMap).map(([name, { reps, suit }]) => ({ name, reps, suit })).sort((a, b) => b.reps - a.reps);
  return { suitGroups, exerciseRows, totalReps, jokerCount };
}
function StatCard({
  icon,
  label,
  value,
  delay,
  glow
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      className: "rounded-2xl p-4 flex flex-col gap-2",
      style: {
        background: glow ? "oklch(0.17 0.015 180 / 0.4)" : "oklch(0.16 0.01 260)",
        border: glow ? "1px solid oklch(0.68 0.25 180 / 0.4)" : "1px solid oklch(0.26 0.01 260 / 0.6)",
        boxShadow: glow ? "0 0 24px oklch(0.68 0.25 180 / 0.18)" : "none"
      },
      "data-ocid": "workout-summary.stat_card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              color: glow ? "oklch(0.68 0.25 180)" : "oklch(0.78 0.008 260)"
            },
            children: icon
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-black text-2xl text-foreground leading-none", children: value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-[10px] font-body uppercase tracking-wider",
            style: { color: "oklch(0.78 0.008 260)" },
            children: label
          }
        )
      ]
    }
  );
}
function WorkoutSummaryPage() {
  const navigate = useNavigate();
  const { selectedDeck, selectedCardCount, totalCards, workoutStartTime } = useWorkoutStore();
  const guestMode = useWorkoutStore((s) => s.guestMode);
  const { resetWorkout, getWorkoutStats } = useWorkout();
  const hasVibrated = reactExports.useRef(false);
  const hasSaved = reactExports.useRef(false);
  const { actor } = useActor(createActor);
  const saveMutation = useMutation({
    mutationFn: (entry) => actor.saveWorkoutHistory(entry)
  });
  reactExports.useEffect(() => {
    if (!hasVibrated.current && navigator.vibrate) {
      navigator.vibrate([100, 50, 100, 50, 200]);
      hasVibrated.current = true;
    }
  }, []);
  const handleNewWorkout = () => {
    resetWorkout();
    navigate({ to: "/decks" });
  };
  const handleHome = () => {
    navigate({ to: "/home" });
  };
  const stats = getWorkoutStats();
  const completedCards = stats.completedCards;
  const duration = workoutStartTime ? Math.floor((Date.now() - workoutStartTime) / 1e3) : 0;
  const calories = stats.estimatedCalories;
  const hasSummary = completedCards > 0;
  const {
    cardHistory: savedCardHistory,
    currentCard: storeCurrentCardForSave
  } = useWorkoutStore.getState();
  const playedForSave = storeCurrentCardForSave ? [...savedCardHistory, storeCurrentCardForSave] : [...savedCardHistory];
  reactExports.useEffect(() => {
    var _a2;
    if (!hasSaved.current && hasSummary && actor && !guestMode) {
      hasSaved.current = true;
      const repsBySuit = { hearts: 0, spades: 0, clubs: 0, diamonds: 0 };
      let totalRepsCount = 0;
      for (const sc of playedForSave) {
        const suit = sc.card.suit.toLowerCase();
        if (suit in repsBySuit) {
          repsBySuit[suit] += sc.reps;
          totalRepsCount += sc.reps;
        }
      }
      const aceCount = playedForSave.filter(
        (sc) => sc.card.rank === "Ace"
      ).length;
      const kingCount = playedForSave.filter(
        (sc) => sc.card.rank === "King"
      ).length;
      const jokerCount2 = playedForSave.filter(
        (sc) => sc.card.rank === "Joker"
      ).length;
      const entry = {
        id: `${Date.now()}`,
        completedAt: BigInt(Date.now()),
        userId: Principal.anonymous(),
        deckId: ((_a2 = selectedDeck == null ? void 0 : selectedDeck.id) == null ? void 0 : _a2.toString()) ?? "upper-body",
        durationSeconds: BigInt(duration),
        caloriesBurned: BigInt(calories),
        cardsCompleted: BigInt(completedCards),
        totalReps: BigInt(totalRepsCount),
        aceCardsDrawn: BigInt(aceCount),
        kingCardsDrawn: BigInt(kingCount),
        jokerCardsDrawn: BigInt(jokerCount2),
        repsBySuit: {
          hearts: BigInt(repsBySuit.hearts),
          spades: BigInt(repsBySuit.spades),
          clubs: BigInt(repsBySuit.clubs),
          diamonds: BigInt(repsBySuit.diamonds)
        }
      };
      saveMutation.mutate(entry);
    }
  }, [
    calories,
    duration,
    selectedDeck,
    saveMutation,
    completedCards,
    playedForSave,
    hasSummary,
    actor,
    guestMode
  ]);
  const completionPct = totalCards > 0 ? Math.round(completedCards / totalCards * 100) : 0;
  const { cardHistory: localCardHistory, currentCard: storeCurrentCard } = useWorkoutStore.getState();
  const playedLocalCards = storeCurrentCard ? [...localCardHistory, storeCurrentCard] : [...localCardHistory];
  const cardCountKey = selectedCardCount ? String(selectedCardCount) : null;
  const deckName = (selectedDeck == null ? void 0 : selectedDeck.name) ?? "Upper Body Deck";
  const deckLabel = cardCountKey ? CARD_COUNT_LABEL[cardCountKey] ?? cardCountKey : null;
  const motivationalMsg = getMotivation(cardCountKey, completionPct);
  const { suitGroups, exerciseRows, totalReps, jokerCount } = buildBreakdown(playedLocalCards);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-dvh bg-background flex flex-col max-w-[430px] mx-auto relative overflow-hidden",
      "data-ocid": "workout-summary.page",
      children: [
        hasSummary && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 z-50 overflow-hidden", children: CONFETTI_PIECES.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          ConfettiParticle,
          {
            x: p.x,
            delay: p.delay,
            color: p.color,
            shape: p.shape
          },
          p.id
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "pointer-events-none absolute inset-0 z-0",
            style: {
              background: "radial-gradient(ellipse 90% 45% at 50% 0%, oklch(0.68 0.25 180 / 0.13) 0%, transparent 65%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "relative z-10 flex items-center justify-between px-5 pt-10 pb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, { size: "md", showIcon: true }),
          deckLabel && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-[10px] font-display font-bold text-white/70 rounded-full px-3 py-1",
              style: {
                background: "oklch(0.16 0.01 260)",
                border: "1px solid oklch(0.26 0.01 260 / 0.6)"
              },
              children: deckLabel
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col items-center px-5 pt-2 pb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { scale: 0, opacity: 0, rotate: -20 },
              animate: { scale: 1, opacity: 1, rotate: 0 },
              transition: {
                type: "spring",
                stiffness: 280,
                damping: 18,
                delay: 0.1
              },
              className: "w-24 h-24 rounded-full flex items-center justify-center mb-5",
              style: {
                background: "oklch(0.17 0.015 180 / 0.3)",
                border: "2px solid oklch(0.68 0.25 180 / 0.5)",
                boxShadow: "0 0 60px oklch(0.68 0.25 180 / 0.35), 0 0 120px oklch(0.68 0.25 180 / 0.1)"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Trophy,
                {
                  className: "w-11 h-11",
                  style: { color: "oklch(0.68 0.25 180)" }
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.h1,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.25, duration: 0.5 },
              className: "font-display font-black text-4xl text-foreground tracking-tight mb-1 text-center",
              style: { textShadow: "0 0 24px oklch(0.68 0.25 180 / 0.4)" },
              children: [
                "WORKOUT",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(0.68 0.25 180)" }, children: "COMPLETE" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.35 },
              className: "font-body text-sm text-white/70 text-center",
              children: deckName
            }
          )
        ] }),
        hasSummary && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.95 },
            animate: { opacity: 1, scale: 1 },
            transition: { delay: 0.4, duration: 0.4 },
            className: "relative z-10 mx-5 mb-6 rounded-2xl px-5 py-4 flex items-center gap-3",
            style: {
              background: "oklch(0.17 0.015 180 / 0.4)",
              border: "1px solid oklch(0.68 0.25 180 / 0.3)"
            },
            "data-ocid": "workout-summary.motivation_banner",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Sparkles,
                {
                  className: "w-5 h-5 shrink-0",
                  style: { color: "oklch(0.68 0.25 180)" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "font-display font-bold text-sm leading-snug",
                  style: { color: "oklch(0.68 0.25 180)" },
                  children: motivationalMsg
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 px-5 grid grid-cols-2 gap-3 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5" }),
              label: "Cards Completed",
              value: hasSummary ? `${completedCards} / ${totalCards}` : "—",
              delay: 0.42,
              glow: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-5 h-5" }),
              label: "Total Duration",
              value: hasSummary ? formatTime(duration) : "—",
              delay: 0.48
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-5 h-5" }),
              label: "Est. Calories",
              value: hasSummary ? `${calories} kcal` : "—",
              delay: 0.54
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5" }),
              label: "Completion",
              value: hasSummary ? `${completionPct}%` : "—",
              delay: 0.6
            }
          )
        ] }),
        exerciseRows.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.65, duration: 0.5 },
            className: "relative z-10 mx-5 mb-6",
            "data-ocid": "workout-summary.reps_section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-[10px] uppercase tracking-widest mb-3 text-muted-foreground", children: "Reps per Exercise" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-2xl overflow-hidden",
                  style: {
                    background: "oklch(0.16 0.01 260)",
                    border: "1px solid oklch(0.26 0.01 260 / 0.5)"
                  },
                  children: [
                    exerciseRows.map((row, i) => {
                      var _a2;
                      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "flex items-center justify-between px-5 py-3.5",
                          style: {
                            borderBottom: i < exerciseRows.length - 1 ? "1px solid oklch(0.22 0.01 260 / 0.5)" : "none"
                          },
                          "data-ocid": `workout-summary.exercise.item.${i + 1}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base w-5 text-center shrink-0", children: ((_a2 = SUIT_GROUP[row.suit]) == null ? void 0 : _a2.emoji) ?? "•" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-sm text-foreground truncate", children: row.name })
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-1 shrink-0 ml-3", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  className: "font-display font-black text-lg leading-none",
                                  style: {
                                    color: SUIT_ACCENT[row.suit] ?? "oklch(0.68 0.25 180)"
                                  },
                                  children: row.reps
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  className: "font-body text-[10px] uppercase tracking-wide",
                                  style: { color: "oklch(0.75 0.008 260)" },
                                  children: "reps"
                                }
                              )
                            ] })
                          ]
                        },
                        row.name
                      );
                    }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex items-center justify-between px-5 py-4",
                        style: {
                          borderTop: "1px solid oklch(0.26 0.01 260 / 0.6)",
                          background: "oklch(0.17 0.015 180 / 0.2)"
                        },
                        "data-ocid": "workout-summary.total_reps",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: "font-display font-bold text-xs uppercase tracking-widest",
                              style: { color: "oklch(0.78 0.008 260)" },
                              children: "Total Reps"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: "font-display font-black text-2xl leading-none",
                                style: { color: "oklch(0.68 0.25 180)" },
                                children: totalReps
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: "font-body text-[10px] uppercase tracking-wide",
                                style: { color: "oklch(0.75 0.008 260)" },
                                children: "reps"
                              }
                            )
                          ] })
                        ]
                      }
                    )
                  ]
                }
              )
            ]
          }
        ),
        suitGroups.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.75, duration: 0.5 },
            className: "relative z-10 mx-5 mb-6",
            "data-ocid": "workout-summary.category_section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-[10px] uppercase tracking-widest mb-3 text-muted-foreground", children: "Cards by Category" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-2xl overflow-hidden",
                  style: {
                    background: "oklch(0.16 0.01 260)",
                    border: "1px solid oklch(0.26 0.01 260 / 0.5)"
                  },
                  children: [
                    suitGroups.map((g, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex items-center justify-between px-5 py-3.5",
                        style: {
                          borderBottom: i < suitGroups.length - 1 ? "1px solid oklch(0.22 0.01 260 / 0.5)" : "none"
                        },
                        "data-ocid": `workout-summary.category.item.${i + 1}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg w-6 text-center", children: g.emoji }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-sm text-foreground", children: g.label })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: "font-display font-black text-base leading-none",
                                style: { color: "oklch(0.68 0.25 180)" },
                                children: g.count
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: "font-body text-[10px] uppercase tracking-wide",
                                style: { color: "oklch(0.75 0.008 260)" },
                                children: "cards"
                              }
                            )
                          ] })
                        ]
                      },
                      g.label
                    )),
                    jokerCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex items-center justify-between px-5 py-3.5",
                        style: {
                          borderTop: suitGroups.length > 0 ? "1px solid oklch(0.22 0.01 260 / 0.5)" : "none"
                        },
                        "data-ocid": "workout-summary.joker_count",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg w-6 text-center", children: "🃏" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-sm text-foreground", children: "Joker Challenges" })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-black text-base leading-none text-yellow-400", children: jokerCount }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: "font-body text-[10px] uppercase tracking-wide",
                                style: { color: "oklch(0.75 0.008 260)" },
                                children: "cards"
                              }
                            )
                          ] })
                        ]
                      }
                    )
                  ]
                }
              )
            ]
          }
        ),
        !hasSummary && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative z-10 mx-5 mb-6 rounded-2xl p-8 text-center",
            style: {
              background: "oklch(0.16 0.01 260)",
              border: "1px solid oklch(0.26 0.01 260 / 0.4)"
            },
            "data-ocid": "workout-summary.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4",
                  style: { background: "oklch(0.68 0.25 180 / 0.1)" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Trophy,
                    {
                      className: "w-7 h-7",
                      style: { color: "oklch(0.68 0.25 180 / 0.5)" }
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-sm text-foreground mb-1", children: "No workout yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 font-body text-xs", children: "Complete a workout to see your statistics here." })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative z-10 px-5 pb-10 mt-auto flex flex-col gap-3",
            "data-ocid": "workout-summary.actions",
            children: [
              guestMode && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 10 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.65, duration: 0.4 },
                  className: "rounded-2xl px-5 py-4 flex items-center gap-3 cursor-pointer",
                  style: {
                    background: "oklch(0.17 0.015 260 / 0.6)",
                    border: "1px solid oklch(0.45 0.12 260 / 0.5)"
                  },
                  onClick: () => navigate({ to: "/onboarding/auth" }),
                  "data-ocid": "workout-summary.guest_signin_banner",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      LogIn,
                      {
                        className: "w-5 h-5 shrink-0",
                        style: { color: "oklch(0.75 0.18 260)" }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-sm text-white leading-snug", children: "Sign in to save your progress" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-white/60 mt-0.5", children: "Your workout won't be saved in guest mode." })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { opacity: 0, y: 16 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.72, duration: 0.45 },
                  whileTap: { scale: 0.97 },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      className: "w-full h-14 font-display font-black text-xl tracking-widest rounded-2xl",
                      style: {
                        boxShadow: "0 0 40px oklch(0.68 0.25 180 / 0.35), 0 4px 20px oklch(0 0 0 / 0.3)"
                      },
                      onClick: handleNewWorkout,
                      "data-ocid": "workout-summary.new_workout_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-5 h-5 mr-2" }),
                        "NEW WORKOUT"
                      ]
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { opacity: 0, y: 12 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.8, duration: 0.4 },
                  whileTap: { scale: 0.97 },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      variant: "outline",
                      className: "w-full h-14 font-display font-black text-xl tracking-widest rounded-2xl hover:border-primary/40",
                      style: {
                        background: "oklch(0.16 0.01 260 / 0.8)",
                        border: "1px solid oklch(0.38 0.01 260 / 0.8)"
                      },
                      onClick: handleHome,
                      "data-ocid": "workout-summary.home_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "w-4 h-4 mr-2" }),
                        "Home"
                      ]
                    }
                  )
                }
              )
            ]
          }
        )
      ]
    }
  );
}
export {
  WorkoutSummaryPage as default
};
