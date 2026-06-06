import { c as createLucideIcon, j as jsxRuntimeExports, i as cn, u as useNavigate, a as useWorkoutStore, r as reactExports, m as motion, A as ArrowLeft, L as Logo } from "./index-DqGOMkPn.js";
import { C as CardCount } from "./backend-Bt8BEzt7.js";
import { B as Button } from "./button-CQwKH8lW.js";
import { u as useWorkout, g as getSuitConfig, r as resolveExerciseIllustration } from "./use-workout-CvigGjhZ.js";
import { A as AnimatePresence } from "./index-BV1IzFVq.js";
import { C as Clock, F as Flame } from "./flame-ClYgZPRQ.js";
import { Z as Zap } from "./zap-ClIEObTD.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m18 14 4 4-4 4", key: "10pe0f" }],
  ["path", { d: "m18 2 4 4-4 4", key: "pucp1d" }],
  ["path", { d: "M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22", key: "1ailkh" }],
  ["path", { d: "M2 6h1.972a4 4 0 0 1 3.6 2.2", key: "km57vx" }],
  ["path", { d: "M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45", key: "os18l9" }]
];
const Shuffle = createLucideIcon("shuffle", __iconNode);
function PlayingCard({
  isFlipping = false,
  showBack = false,
  className,
  compact = false
}) {
  const size = compact ? "w-full h-full" : "w-48 h-64";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("card-flip", className), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "card-flip-inner relative",
        size,
        (isFlipping || showBack) && "flipped"
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: cn(
              "card-face absolute inset-0 rounded-3xl overflow-hidden",
              "border border-primary/25",
              "shadow-[0_0_40px_oklch(0.68_0.25_180/0.2),0_8px_40px_oklch(0_0_0/0.6)]"
            ),
            style: {
              background: "radial-gradient(ellipse at 50% 30%, oklch(0.22 0.035 180 / 0.4) 0%, oklch(0.14 0.01 260) 65%)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: "/assets/exercises/backside_of_card.png",
                  className: "absolute inset-0 w-full h-full object-cover",
                  onError: (e) => {
                    e.currentTarget.style.display = "none";
                  },
                  alt: ""
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-0 opacity-[0.07]",
                  style: {
                    backgroundImage: "repeating-linear-gradient(0deg, oklch(0.68 0.25 180) 0px, oklch(0.68 0.25 180) 1px, transparent 1px, transparent 24px), repeating-linear-gradient(90deg, oklch(0.68 0.25 180) 0px, oklch(0.68 0.25 180) 1px, transparent 1px, transparent 24px)"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-3 rounded-2xl border opacity-20",
                  style: { borderColor: "oklch(0.68 0.25 180)" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: cn(
                      "rounded-2xl border flex items-center justify-center",
                      compact ? "w-10 h-10" : "w-16 h-16"
                    ),
                    style: {
                      borderColor: "oklch(0.68 0.25 180 / 0.5)",
                      background: "oklch(0.68 0.25 180 / 0.08)",
                      boxShadow: "0 0 20px oklch(0.68 0.25 180 / 0.3)"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: cn(
                          "font-display font-black tracking-tighter",
                          compact ? "text-sm" : "text-xl"
                        ),
                        style: {
                          color: "oklch(0.68 0.25 180)",
                          textShadow: "0 0 12px oklch(0.68 0.25 180 / 0.6)"
                        },
                        children: "MBW"
                      }
                    )
                  }
                ),
                !compact && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-body uppercase tracking-[0.25em] opacity-50 text-primary", children: "MyBodyWeight" })
              ] }),
              [
                "top-2 left-2",
                "top-2 right-2",
                "bottom-2 left-2",
                "bottom-2 right-2"
              ].map((pos) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: cn("absolute w-3 h-3", pos),
                  style: {
                    borderColor: "oklch(0.68 0.25 180 / 0.4)",
                    borderWidth: pos.includes("top") && pos.includes("left") ? "2px 0 0 2px" : pos.includes("top") && pos.includes("right") ? "2px 2px 0 0" : pos.includes("bottom") && pos.includes("left") ? "0 0 2px 2px" : "0 2px 2px 0"
                  }
                },
                pos
              ))
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "card-face back absolute inset-0 rounded-3xl overflow-hidden border border-primary/25",
            style: {
              background: "radial-gradient(ellipse at 50% 70%, oklch(0.22 0.035 180 / 0.4) 0%, oklch(0.14 0.01 260) 65%)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: cn(
                  "font-display font-black tracking-tighter",
                  compact ? "text-sm" : "text-2xl"
                ),
                style: { color: "oklch(0.68 0.25 180 / 0.4)" },
                children: "MBW"
              }
            ) })
          }
        )
      ]
    }
  ) });
}
const CARD_COUNTS = [
  {
    value: CardCount.Ten,
    label: "10 Cards",
    badge: "QUICK",
    sub: "Quick Session",
    time: "~20 min",
    calories: "~120 cal",
    badgeStyle: {
      background: "oklch(0.65 0.18 160 / 0.2)",
      color: "oklch(0.65 0.18 160)"
    }
  },
  {
    value: CardCount.Twenty,
    label: "20 Cards",
    badge: "STANDARD",
    sub: "Standard Workout",
    time: "~40 min",
    calories: "~240 cal",
    badgeStyle: {
      background: "oklch(0.68 0.25 180 / 0.2)",
      color: "oklch(0.68 0.25 180)"
    }
  },
  {
    value: CardCount.FullDeck,
    label: "52 Cards",
    badge: "FULL CHALLENGE",
    sub: "Complete Gauntlet",
    time: "~90 min",
    calories: "~550 cal",
    badgeStyle: {
      background: "oklch(0.65 0.22 40 / 0.2)",
      color: "oklch(0.65 0.22 40)"
    }
  }
];
function WorkoutSetupPage() {
  const navigate = useNavigate();
  const { selectedDeck, selectedCardCount, setSelectedCardCount, isShuffling } = useWorkoutStore();
  const { startWorkout } = useWorkout();
  const [customInput, setCustomInput] = reactExports.useState("");
  const [customError, setCustomError] = reactExports.useState("");
  const [isCustomSelected, setIsCustomSelected] = reactExports.useState(false);
  const handleCustomChange = (val) => {
    setCustomInput(val);
    if (val === "") {
      setCustomError("");
      return;
    }
    const n = Number(val);
    if (!Number.isInteger(n) || n < 2 || n > 52) {
      setCustomError("Enter a number between 2 and 52");
    } else {
      setCustomError("");
    }
  };
  const handlePresetSelect = (value) => {
    setIsCustomSelected(false);
    setCustomInput("");
    setCustomError("");
    setSelectedCardCount(value);
  };
  const handleCustomFocus = () => {
    setIsCustomSelected(true);
    setSelectedCardCount(null);
  };
  const customCountNum = customInput !== "" && !customError ? Number(customInput) : null;
  const canStart = !isShuffling && (isCustomSelected ? customCountNum !== null : selectedCardCount !== null);
  const handleStart = async () => {
    if (!selectedDeck || isShuffling) return;
    if (isCustomSelected && customCountNum !== null) {
      await startWorkout(customCountNum);
      return;
    }
    if (!selectedCardCount) return;
    await startWorkout();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-dvh bg-background flex flex-col max-w-[430px] mx-auto",
      "data-ocid": "workout-setup.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "pointer-events-none fixed inset-0 max-w-[430px] mx-auto",
            style: {
              background: "radial-gradient(ellipse 70% 35% at 50% 0%, oklch(0.22 0.04 180 / 0.16) 0%, transparent 65%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "relative flex items-center gap-3 px-5 pt-12 pb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.button,
            {
              type: "button",
              initial: { opacity: 0, x: -10 },
              animate: { opacity: 1, x: 0 },
              whileTap: { scale: 0.92 },
              onClick: () => navigate({ to: "/decks" }),
              className: "w-10 h-10 rounded-xl bg-card border border-border/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/45 transition-smooth",
              "data-ocid": "workout-setup.back_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: -8 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.05 },
              className: "flex-1 min-w-0",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-black text-xl text-foreground tracking-tight", children: "Workout Setup" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body truncate", children: (selectedDeck == null ? void 0 : selectedDeck.name) ?? "No deck selected" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, { size: "sm", iconOnly: true, className: "opacity-70 shrink-0" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.1 },
            className: "px-5 mb-6",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "font-display font-black text-xs tracking-[0.28em] uppercase",
                style: { color: "oklch(0.68 0.25 180)" },
                children: "SHUFFLE. DRAW. CONQUER."
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center px-5 mb-7", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: isShuffling ? /* @__PURE__ */ jsxRuntimeExports.jsx(ShuffleAnimation, {}, "shuffling") : /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.85, rotateY: -15 },
            animate: { opacity: 1, scale: 1, rotateY: 0 },
            exit: { opacity: 0, scale: 0.85 },
            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
            "data-ocid": "workout-setup.card_preview",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(PlayingCard, { showBack: true })
          },
          "card-preview"
        ) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.h2,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 0.15 },
              className: "font-display font-bold text-sm uppercase tracking-widest text-muted-foreground mb-3",
              children: "Select Workout Size"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
            CARD_COUNTS.map(
              ({ value, label, badge, sub, time, calories, badgeStyle }, i) => {
                const isSelected = !isCustomSelected && selectedCardCount === value;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.button,
                  {
                    type: "button",
                    initial: { opacity: 0, x: -16 },
                    animate: { opacity: 1, x: 0 },
                    transition: {
                      delay: 0.18 + i * 0.07,
                      ease: [0.16, 1, 0.3, 1]
                    },
                    whileTap: { scale: 0.97 },
                    onClick: () => handlePresetSelect(value),
                    className: "w-full text-left rounded-2xl border transition-smooth relative overflow-hidden",
                    style: {
                      background: isSelected ? "oklch(0.17 0.015 180 / 0.5)" : "oklch(0.16 0.01 260)",
                      borderColor: isSelected ? "oklch(0.68 0.25 180 / 0.6)" : "oklch(0.26 0.01 260 / 0.6)",
                      boxShadow: isSelected ? "0 0 28px oklch(0.68 0.25 180 / 0.2), inset 0 1px 0 oklch(0.68 0.25 180 / 0.1)" : "none"
                    },
                    "data-ocid": `workout-setup.card-count.item.${i + 1}`,
                    children: [
                      isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "absolute inset-0 pointer-events-none",
                          style: {
                            background: "radial-gradient(ellipse at 0% 50%, oklch(0.68 0.25 180 / 0.08) 0%, transparent 70%)"
                          }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center gap-4 p-4", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: cn(
                              "w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-smooth"
                            ),
                            style: {
                              borderColor: isSelected ? "oklch(0.68 0.25 180)" : "oklch(0.38 0.01 260)",
                              background: isSelected ? "oklch(0.68 0.25 180)" : "transparent"
                            },
                            children: isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx(
                              motion.div,
                              {
                                initial: { scale: 0 },
                                animate: { scale: 1 },
                                className: "w-2 h-2 rounded-full",
                                style: { background: "oklch(0.12 0.008 260)" }
                              }
                            )
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-0.5", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: "font-display font-black text-lg leading-none",
                                style: {
                                  color: isSelected ? "oklch(0.68 0.25 180)" : "oklch(0.92 0.01 260)"
                                },
                                children: label
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: "text-[10px] font-display font-black tracking-widest px-2 py-0.5 rounded",
                                style: isSelected ? badgeStyle : {
                                  background: "oklch(0.22 0.01 260 / 0.8)",
                                  color: "oklch(0.55 0.008 260)"
                                },
                                children: badge
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-body", children: sub }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-[10px] text-muted-foreground font-body", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                              time
                            ] })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 shrink-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Flame,
                            {
                              className: "w-3.5 h-3.5",
                              style: {
                                color: isSelected ? "oklch(0.68 0.25 180)" : "oklch(0.55 0.008 260)"
                              }
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: "text-xs font-display font-bold",
                              style: {
                                color: isSelected ? "oklch(0.68 0.25 180)" : "oklch(0.55 0.008 260)"
                              },
                              children: calories
                            }
                          )
                        ] })
                      ] })
                    ]
                  },
                  value
                );
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: -16 },
                animate: { opacity: 1, x: 0 },
                transition: { delay: 0.39, ease: [0.16, 1, 0.3, 1] },
                className: "w-full rounded-2xl border transition-smooth relative overflow-hidden",
                style: {
                  background: isCustomSelected ? "oklch(0.17 0.015 180 / 0.5)" : "oklch(0.16 0.01 260)",
                  borderColor: customError ? "oklch(0.65 0.22 25 / 0.7)" : isCustomSelected ? "oklch(0.68 0.25 180 / 0.6)" : "oklch(0.26 0.01 260 / 0.6)",
                  boxShadow: isCustomSelected && !customError ? "0 0 28px oklch(0.68 0.25 180 / 0.2), inset 0 1px 0 oklch(0.68 0.25 180 / 0.1)" : customError ? "0 0 16px oklch(0.65 0.22 25 / 0.15)" : "none"
                },
                children: [
                  isCustomSelected && !customError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "absolute inset-0 pointer-events-none",
                      style: {
                        background: "radial-gradient(ellipse at 0% 50%, oklch(0.68 0.25 180 / 0.08) 0%, transparent 70%)"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center gap-4 p-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-smooth",
                        style: {
                          borderColor: customError ? "oklch(0.65 0.22 25)" : isCustomSelected ? "oklch(0.68 0.25 180)" : "oklch(0.38 0.01 260)",
                          background: isCustomSelected && !customError ? "oklch(0.68 0.25 180)" : "transparent"
                        },
                        children: isCustomSelected && !customError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          motion.div,
                          {
                            initial: { scale: 0 },
                            animate: { scale: 1 },
                            className: "w-2 h-2 rounded-full",
                            style: { background: "oklch(0.12 0.008 260)" }
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "font-display font-black text-lg leading-none",
                            style: {
                              color: isCustomSelected && !customError ? "oklch(0.68 0.25 180)" : customError ? "oklch(0.65 0.22 25)" : "oklch(0.92 0.01 260)"
                            },
                            children: "Custom"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "text-[10px] font-display font-black tracking-widest px-2 py-0.5 rounded",
                            style: {
                              background: "oklch(0.22 0.01 260 / 0.8)",
                              color: "oklch(0.55 0.008 260)"
                            },
                            children: "YOUR CHOICE"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            type: "number",
                            min: 2,
                            max: 52,
                            value: customInput,
                            onFocus: handleCustomFocus,
                            onChange: (e) => handleCustomChange(e.target.value),
                            placeholder: "2 – 52 cards",
                            className: "w-32 h-8 rounded-lg px-3 font-display font-bold text-sm text-foreground outline-none transition-smooth",
                            style: {
                              background: "oklch(0.12 0.008 260)",
                              border: `1px solid ${customError ? "oklch(0.65 0.22 25 / 0.7)" : isCustomSelected ? "oklch(0.68 0.25 180 / 0.5)" : "oklch(0.30 0.01 260 / 0.6)"}`
                            },
                            "data-ocid": "workout-setup.custom_count_input"
                          }
                        ),
                        customError ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "text-[10px] font-body",
                            style: { color: "oklch(0.65 0.22 25)" },
                            children: customError
                          }
                        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-body", children: "Any amount" })
                      ] })
                    ] })
                  ] })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pb-10 mt-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.45, ease: [0.16, 1, 0.3, 1] },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  className: "w-full h-14 font-display font-black text-xl tracking-widest rounded-2xl disabled:shadow-none disabled:opacity-30 transition-smooth",
                  style: {
                    boxShadow: canStart ? "0 0 40px oklch(0.68 0.25 180 / 0.35), 0 4px 20px oklch(0 0 0 / 0.3)" : "none"
                  },
                  disabled: !canStart,
                  onClick: handleStart,
                  "data-ocid": "workout-setup.start_button",
                  children: isShuffling ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Shuffle, { className: "w-5 h-5 animate-spin" }),
                    "Shuffling..."
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5" }),
                    "START WORKOUT"
                  ] })
                }
              ),
              !canStart && !isShuffling && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground font-body mt-3", children: "Select a workout size above" })
            ]
          }
        ) })
      ]
    }
  );
}
const SHUFFLE_SAMPLE_CARDS = [
  { exercise: "Diamond Push Ups", suit: "Hearts", rank: "8", reps: 8 },
  { exercise: "Chin Ups", suit: "Spades", rank: "5", reps: 5 },
  { exercise: "Dips", suit: "Diamonds", rank: "10", reps: 10 },
  { exercise: "Normal Rows", suit: "Clubs", rank: "6", reps: 6 },
  { exercise: "Close Grip Push Ups", suit: "Hearts", rank: "7", reps: 7 },
  { exercise: "Normal Pull Ups", suit: "Spades", rank: "4", reps: 4 },
  { exercise: "Chin Up Rows", suit: "Clubs", rank: "3", reps: 3 },
  { exercise: "Normal Push Ups", suit: "Hearts", rank: "9", reps: 9 }
];
const ANGLES = [-24, -12, 0, 12, 24];
function ShuffleAnimation() {
  const [cycleOffset, setCycleOffset] = reactExports.useState(0);
  const timerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    timerRef.current = setInterval(() => {
      setCycleOffset((prev) => (prev + 1) % SHUFFLE_SAMPLE_CARDS.length);
    }, 420);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);
  const visibleCards = ANGLES.map((_, i) => ({
    ...SHUFFLE_SAMPLE_CARDS[(cycleOffset + i) % SHUFFLE_SAMPLE_CARDS.length],
    slot: i
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.9 },
      className: "flex flex-col items-center gap-5",
      "data-ocid": "workout-setup.loading_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-60 h-44", children: visibleCards.map((card, i) => {
          const baseAngle = ANGLES[i] ?? 0;
          const isCenter = i === 2;
          const suitCfg = getSuitConfig(card.suit);
          const imgSrc = resolveExerciseIllustration(card.exercise);
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "absolute",
              style: {
                left: "50%",
                bottom: 0,
                originX: "50%",
                originY: "100%",
                x: "-50%"
              },
              animate: {
                rotate: [
                  baseAngle,
                  baseAngle + (i % 2 === 0 ? 14 : -14),
                  baseAngle - (i % 2 === 0 ? 5 : -5),
                  baseAngle
                ],
                y: [0, isCenter ? -14 : -6, 0, 0]
              },
              transition: {
                duration: 0.8,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.08,
                ease: "easeInOut"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0.7, scale: 0.9 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { duration: 0.2 },
                  className: "w-20 h-28 rounded-xl overflow-hidden flex flex-col",
                  style: {
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: isCenter ? `${suitCfg.accent}cc` : "oklch(0.26 0.01 260 / 0.8)",
                    background: isCenter ? `linear-gradient(160deg, ${suitCfg.gradientFrom}, ${suitCfg.gradientTo})` : "oklch(0.15 0.01 260)",
                    boxShadow: isCenter ? `0 6px 24px ${suitCfg.glowColor}` : "none"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-1.5 pt-1.5 shrink-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "font-display font-black text-[10px] leading-none",
                          style: { color: suitCfg.accent },
                          children: card.rank
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-[9px] leading-none",
                          style: { color: suitCfg.accent },
                          children: suitCfg.symbol
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 mx-1 my-0.5 rounded-md overflow-hidden bg-[oklch(0.93_0.035_70)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: imgSrc,
                        alt: card.exercise,
                        className: "w-full h-full object-contain",
                        loading: "eager",
                        decoding: "sync"
                      }
                    ) }),
                    isCenter && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center pb-1.5 shrink-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "font-display font-black text-sm leading-none",
                          style: { color: suitCfg.accent },
                          children: card.reps
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "font-body text-[7px] ml-0.5 uppercase tracking-wide",
                          style: { color: `${suitCfg.accent}88` },
                          children: "reps"
                        }
                      )
                    ] })
                  ]
                },
                `${card.exercise}-${cycleOffset}`
              )
            },
            "`slot-${ANGLES[i]}`"
          );
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            animate: { opacity: [0.6, 1, 0.6] },
            transition: { duration: 1.2, repeat: Number.POSITIVE_INFINITY },
            className: "flex items-center gap-2 font-display font-bold text-base",
            style: { color: "oklch(0.68 0.25 180)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Shuffle, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tracking-widest", children: "SHUFFLING DECK..." })
            ]
          }
        )
      ]
    }
  );
}
export {
  WorkoutSetupPage as default
};
