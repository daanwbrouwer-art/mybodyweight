import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, m as motion, i as cn, u as useNavigate, a as useWorkoutStore, L as Logo, A as ArrowLeft } from "./index-DqGOMkPn.js";
import { r as resolveExerciseIllustration, S as SUIT_CONFIG, u as useWorkout } from "./use-workout-CvigGjhZ.js";
import { J as JokerChallenge } from "./backend-Bt8BEzt7.js";
import { B as Button, u as useComposedRefs, b as buttonVariants } from "./button-CQwKH8lW.js";
import { J as JOKER_CHALLENGE_EMOJI, b as JOKER_CHALLENGE_LABEL, u as useTimer, a as CircleCheck } from "./use-timer-C85FFfco.js";
import { A as AnimatePresence } from "./index-BV1IzFVq.js";
import { R as Root, T as Trigger, W as WarningProvider, C as Content, c as composeEventHandlers, a as Title, D as Description, b as Close, d as createDialogScope, P as Portal, O as Overlay, e as createSlottable, f as createContextScope } from "./index-CrCFe1wq.js";
import { X } from "./x-DtXDnd-V.js";
import { C as Clock, F as Flame } from "./flame-ClYgZPRQ.js";
import { C as ChevronRight } from "./chevron-right-WyRT5wFt.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { x: "14", y: "4", width: "4", height: "16", rx: "1", key: "zuxfzm" }],
  ["rect", { x: "6", y: "4", width: "4", height: "16", rx: "1", key: "1okwgv" }]
];
const Pause = createLucideIcon("pause", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["polygon", { points: "6 3 20 12 6 21 6 3", key: "1oa8hb" }]];
const Play = createLucideIcon("play", __iconNode);
function toNum(v) {
  if (v == null) return 0;
  return typeof v === "bigint" ? Number(v) : v;
}
function getDisplayReps(sessionCard, previousCard) {
  const rank = sessionCard.card.rank;
  if (rank === "Ace") {
    const prev = toNum(previousCard == null ? void 0 : previousCard.reps);
    return prev > 0 ? prev * 2 : 2;
  }
  if (rank === "King") {
    const prev = toNum(previousCard == null ? void 0 : previousCard.reps);
    return Math.max(1, Math.ceil(prev > 0 ? prev / 2 : 1));
  }
  return toNum(sessionCard.reps);
}
function getDisplayExercise(sessionCard, previousCard) {
  const rank = sessionCard.card.rank;
  if ((rank === "Ace" || rank === "King") && previousCard) {
    const name2 = previousCard.card.exercise || "";
    return { name: name2, illustration: resolveExerciseIllustration(name2) };
  }
  const name = sessionCard.card.exercise || "";
  return { name, illustration: resolveExerciseIllustration(name) };
}
const ExerciseCard = ({
  sessionCard,
  previousCard,
  isRevealed = true,
  onReveal,
  className = ""
}) => {
  const [showFront, setShowFront] = reactExports.useState(isRevealed);
  const [flipPhase, setFlipPhase] = reactExports.useState(isRevealed ? "landed" : "idle");
  const buttonRef = reactExports.useRef(null);
  const divRef = reactExports.useRef(null);
  const rank = sessionCard.card.rank || "";
  const isAce = rank === "Ace";
  const isKing = rank === "King";
  const isJoker = rank === "Joker" || sessionCard.card.suit === "Joker";
  const isSpecial = isAce || isKing || isJoker;
  reactExports.useEffect(() => {
    if (isRevealed && !showFront) {
      setFlipPhase("windup");
      const windupTimer = setTimeout(() => {
        setFlipPhase("flipping");
        const flipDuration = isSpecial ? 800 : 500;
        const landTimer = setTimeout(() => {
          setShowFront(true);
          setFlipPhase("landed");
        }, flipDuration);
        return () => clearTimeout(landTimer);
      }, 80);
      return () => clearTimeout(windupTimer);
    }
  }, [isRevealed, showFront, isSpecial]);
  const suit = sessionCard.card.suit;
  const suitCfg = isJoker ? SUIT_CONFIG.Joker : SUIT_CONFIG[suit] ?? SUIT_CONFIG.Hearts;
  const reps = getDisplayReps(sessionCard, previousCard);
  const exercise = getDisplayExercise(sessionCard, previousCard);
  const displayValue = isAce ? "A" : isKing ? "K" : isJoker ? "★" : rank;
  const getFlipAnimationClass = () => {
    if (flipPhase === "windup") return "card-flip-windup";
    if (flipPhase === "flipping") {
      return isSpecial ? "card-flip-special-anim" : "card-flip-standard-anim";
    }
    if (flipPhase === "landed") {
      if (isAce) return "ace-glow-burst-anim";
      if (isKing) return "king-glow-burst-anim";
      if (isJoker) return "joker-glow-burst-anim";
      return "card-land-glow-anim";
    }
    return "";
  };
  const cardWrapper = {
    width: "100%",
    maxWidth: "320px",
    aspectRatio: "2.5/3.5",
    borderRadius: "16px",
    overflow: "hidden",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    userSelect: "none",
    transformStyle: "preserve-3d",
    willChange: flipPhase !== "idle" ? "transform" : "auto"
  };
  if (!showFront) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        ref: buttonRef,
        className: `${className} ${getFlipAnimationClass()}`,
        style: {
          ...cardWrapper,
          cursor: "pointer",
          background: "oklch(0.10 0.015 260)",
          border: "none",
          padding: 0
        },
        onClick: onReveal,
        "data-ocid": "exercise-card",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: "/assets/exercises/backside_of_card.png",
            alt: "Card back",
            style: {
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "16px"
            },
            onError: (e) => {
              const el = e.currentTarget;
              el.style.display = "none";
              const p = el.parentElement;
              if (p)
                p.style.background = "linear-gradient(160deg, oklch(0.10 0.015 260) 0%, oklch(0.14 0.02 260) 100%)";
            }
          }
        )
      }
    );
  }
  if (isJoker) {
    const exerciseName = sessionCard.card.exercise || "";
    const isDeadHang = exerciseName.toLowerCase().includes("dead") || exerciseName.toLowerCase().includes("hang");
    const challengeLabel = isDeadHang ? "DEAD HANG" : reps === 45 ? "45s PLANK" : "30s PLANK";
    const illustration = resolveExerciseIllustration(exerciseName || "plank");
    const jokerAccent = "oklch(0.68 0.25 180)";
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        ref: divRef,
        className: `${className} ${getFlipAnimationClass()}`,
        style: {
          ...cardWrapper,
          background: "linear-gradient(160deg, oklch(0.08 0.02 260) 0%, oklch(0.10 0.025 255) 50%, oklch(0.08 0.025 255) 100%)",
          border: `1.5px solid ${jokerAccent.replace(")", " / 0.5)").replace("oklch(", "oklch(")}`,
          boxShadow: "0 0 40px oklch(0.68 0.25 180 / 0.4), 0 0 80px oklch(0.68 0.25 180 / 0.15), 0 8px 32px oklch(0 0 0 / 0.8)"
        },
        "data-ocid": "exercise-card",
        children: [
          flipPhase === "landed" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "joker-ring-anim",
              style: {
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
                zIndex: 20
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    border: `2px solid ${jokerAccent}`
                  }
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                padding: "12px 16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: {
                      fontSize: "26px",
                      fontWeight: "900",
                      color: jokerAccent,
                      textShadow: "0 0 12px oklch(0.68 0.25 180 / 0.9)"
                    },
                    children: "★"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: {
                      fontSize: "9px",
                      letterSpacing: "3px",
                      color: jokerAccent,
                      fontWeight: "700",
                      textTransform: "uppercase"
                    },
                    children: "WILD CARD"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: {
                      fontSize: "26px",
                      fontWeight: "900",
                      color: jokerAccent,
                      textShadow: "0 0 12px oklch(0.68 0.25 180 / 0.9)"
                    },
                    children: "★"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { textAlign: "center", marginBottom: "6px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              style: {
                fontSize: "28px",
                fontWeight: "900",
                letterSpacing: "6px",
                color: jokerAccent,
                textShadow: "0 0 20px oklch(0.68 0.25 180 / 0.9)"
              },
              children: "JOKER"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                margin: "0 16px",
                borderRadius: "10px",
                overflow: "hidden",
                background: "oklch(0.68 0.25 180 / 0.04)",
                border: "1px solid oklch(0.68 0.25 180 / 0.2)",
                flex: 1,
                minHeight: 0
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: illustration,
                  alt: "Challenge",
                  style: {
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    padding: "8px"
                  }
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                background: "oklch(0.08 0.005 260)",
                padding: "12px 16px",
                textAlign: "center"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "24px",
                      fontWeight: "900",
                      color: jokerAccent,
                      textShadow: "0 0 16px oklch(0.68 0.25 180 / 0.8)",
                      letterSpacing: "2px",
                      marginBottom: "2px"
                    },
                    children: challengeLabel
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "10px",
                      color: "oklch(0.68 0.25 180 / 0.6)",
                      letterSpacing: "2px",
                      textTransform: "uppercase"
                    },
                    children: "CHALLENGE"
                  }
                )
              ]
            }
          )
        ]
      }
    );
  }
  const accentColor = isAce ? "oklch(0.76 0.22 60)" : isKing ? "oklch(0.78 0.04 240)" : suitCfg.accent;
  const glowColor = isAce ? "oklch(0.76 0.22 60 / 0.4)" : isKing ? "oklch(0.78 0.04 240 / 0.3)" : suitCfg.glowColor;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref: divRef,
      className: `${className} ${getFlipAnimationClass()}`,
      style: {
        ...cardWrapper,
        background: `linear-gradient(160deg, ${suitCfg.gradientFrom} 0%, ${suitCfg.gradientTo} 100%)`,
        border: `1.5px solid ${accentColor.replace(")", " / 0.27)").replace("oklch(", "oklch(")}`,
        boxShadow: `0 0 24px ${glowColor}, 0 8px 32px oklch(0 0 0 / 0.7), inset 0 1px 0 oklch(1 0 0 / 0.04)`
      },
      "data-ocid": "exercise-card",
      children: [
        flipPhase === "landed" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-shimmer-overlay" }),
        isAce && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse at center 30%, oklch(0.76 0.22 60 / 0.12) 0%, transparent 70%)",
              pointerEvents: "none",
              zIndex: 0
            }
          }
        ),
        isKing && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse at center 30%, oklch(0.78 0.04 240 / 0.08) 0%, transparent 70%)",
              pointerEvents: "none",
              zIndex: 0
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              padding: "10px 12px 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              position: "relative",
              zIndex: 1
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: isSpecial ? "28px" : "22px",
                      fontWeight: "900",
                      color: accentColor,
                      textShadow: `0 0 10px ${glowColor}`,
                      lineHeight: 1
                    },
                    children: displayValue
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: "16px",
                      color: accentColor,
                      lineHeight: 1,
                      marginTop: "1px"
                    },
                    children: suitCfg.symbol
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: "/assets/images/mbw-logo-white-icon.png",
                  alt: "MBW",
                  style: {
                    width: "24px",
                    height: "24px",
                    objectFit: "contain",
                    opacity: 0.6
                  },
                  onError: (e) => {
                    e.currentTarget.style.display = "none";
                  }
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              flex: 1,
              margin: "6px 12px",
              borderRadius: "8px",
              overflow: "hidden",
              background: "radial-gradient(ellipse at 50% 40%, oklch(0.99 0.005 70) 0%, oklch(0.97 0.008 70) 60%, oklch(0.95 0.012 70) 100%)",
              border: `1px solid ${accentColor.replace(")", " / 0.13)").replace("oklch(", "oklch(")}`,
              boxShadow: "inset 0 2px 8px oklch(0 0 0 / 0.08), inset 0 0 0 1px oklch(1 0 0 / 0.6)",
              position: "relative",
              zIndex: 1,
              minHeight: 0
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: exercise.illustration,
                alt: exercise.name,
                style: {
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  padding: "6px"
                }
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              background: "var(--card-black, oklch(0.08 0.005 260))",
              padding: "8px 12px 10px",
              position: "relative",
              zIndex: 1
            },
            children: [
              isAce && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    fontSize: "9px",
                    letterSpacing: "2px",
                    color: "oklch(0.76 0.22 60)",
                    fontWeight: "700",
                    background: "oklch(0.76 0.22 60 / 0.12)",
                    border: "1px solid oklch(0.76 0.22 60 / 0.3)",
                    borderRadius: "3px",
                    display: "inline-block",
                    padding: "2px 6px",
                    marginBottom: "3px"
                  },
                  children: "ACE — DOUBLE REPS"
                }
              ),
              isKing && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    fontSize: "9px",
                    letterSpacing: "2px",
                    color: "oklch(0.78 0.04 240)",
                    fontWeight: "700",
                    background: "oklch(0.78 0.04 240 / 0.08)",
                    border: "1px solid oklch(0.78 0.04 240 / 0.25)",
                    borderRadius: "3px",
                    display: "inline-block",
                    padding: "2px 6px",
                    marginBottom: "3px"
                  },
                  children: "KING — HALF REPS"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "baseline", gap: "6px" }, children: [
                (isAce || isKing) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: {
                      fontSize: "16px",
                      fontWeight: "700",
                      color: isAce ? "oklch(0.76 0.22 60 / 0.8)" : "oklch(0.78 0.04 240 / 0.8)"
                    },
                    children: isAce ? "×2" : "÷2"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: {
                      fontSize: "42px",
                      fontWeight: "900",
                      color: "oklch(0.97 0.005 260)",
                      lineHeight: 1,
                      textShadow: "0 2px 8px oklch(0 0 0 / 0.5)",
                      letterSpacing: "-1px",
                      fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)"
                    },
                    children: reps
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    fontSize: "11px",
                    fontWeight: "700",
                    color: "oklch(0.92 0.01 260)",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    lineHeight: 1.2,
                    marginTop: "1px",
                    fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)"
                  },
                  children: exercise.name
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "3px",
                    marginTop: "3px"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "11px", color: suitCfg.accent }, children: suitCfg.symbol }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        style: {
                          fontSize: "9px",
                          color: suitCfg.accent,
                          letterSpacing: "1px",
                          textTransform: "uppercase",
                          opacity: 0.75
                        },
                        children: suitCfg.label
                      }
                    )
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              position: "absolute",
              bottom: "64px",
              right: "12px",
              textAlign: "right",
              transform: "rotate(180deg)",
              zIndex: 2
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    fontSize: "16px",
                    fontWeight: "900",
                    color: accentColor,
                    opacity: 0.5,
                    lineHeight: 1
                  },
                  children: displayValue
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    fontSize: "11px",
                    color: accentColor,
                    opacity: 0.5,
                    lineHeight: 1,
                    marginTop: "1px"
                  },
                  children: suitCfg.symbol
                }
              )
            ]
          }
        )
      ]
    }
  );
};
function getChallengeSeconds(challenge) {
  if (!challenge) return 30;
  if (challenge === JokerChallenge.DeadHang30) return 30;
  return 30;
}
function JokerOverlay({
  active,
  challenge,
  onDismiss
}) {
  const challengeKey = challenge ?? JokerChallenge.DeadHang30;
  const challengeLabel = JOKER_CHALLENGE_LABEL[challengeKey] ?? "Complete a challenge!";
  const challengeEmoji = JOKER_CHALLENGE_EMOJI[challengeKey] ?? "🏋️";
  const totalSeconds = getChallengeSeconds(challenge);
  const [countdown, setCountdown] = reactExports.useState(totalSeconds);
  const [running, setRunning] = reactExports.useState(false);
  const [flash, setFlash] = reactExports.useState(false);
  const intervalRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (active) {
      if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 200]);
      setCountdown(totalSeconds);
      setRunning(false);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setRunning(false);
    }
  }, [active, totalSeconds]);
  reactExports.useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
            return 0;
          }
          return prev - 1;
        });
      }, 1e3);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);
  const pct = countdown / totalSeconds;
  const circumference = 2 * Math.PI * 44;
  const dashOffset = circumference * (1 - pct);
  function handleStart() {
    setFlash(true);
    setTimeout(() => setFlash(false), 200);
    setRunning(true);
  }
  function handleDone() {
    setFlash(true);
    setTimeout(() => {
      setFlash(false);
      onDismiss();
    }, 150);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: active && /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
      transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
      className: "fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden",
      style: {
        background: "radial-gradient(ellipse at 50% 30%, oklch(0.2 0.07 180) 0%, oklch(0.08 0.015 260) 100%)"
      },
      "data-ocid": "joker-overlay",
      children: [
        flash && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none z-10",
            style: { background: "oklch(0.68 0.25 180 / 0.15)" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none", children: [0, 1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "absolute rounded-full",
            style: { border: "1px solid oklch(0.68 0.25 180 / 0.3)" },
            initial: { width: 100, height: 100, opacity: 0.8 },
            animate: { width: 700, height: 700, opacity: 0 },
            transition: {
              duration: 2.8,
              delay: i * 0.6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeOut"
            }
          },
          i
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { y: 50, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 24,
              delay: 0.1
            },
            className: "relative w-full max-w-sm px-6 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  animate: { rotate: [0, -6, 6, -3, 0] },
                  transition: { duration: 0.7, delay: 0.3 },
                  className: "text-7xl mb-3 leading-none",
                  children: "🃏"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h2",
                {
                  className: "font-display font-black text-6xl mb-1 tracking-tight",
                  style: {
                    color: "oklch(0.68 0.25 180)",
                    textShadow: "0 0 30px oklch(0.68 0.25 180 / 0.7), 0 0 60px oklch(0.68 0.25 180 / 0.3)"
                  },
                  children: "JOKER!"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-xs mb-5 uppercase tracking-[0.25em]", children: "Wild Challenge Drawn" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-2xl px-5 py-5 mb-5 backdrop-blur-md border",
                  style: {
                    background: "oklch(0.14 0.02 260 / 0.85)",
                    borderColor: "oklch(0.68 0.25 180 / 0.35)",
                    boxShadow: "0 0 30px oklch(0.68 0.25 180 / 0.12), inset 0 0 40px oklch(0.68 0.25 180 / 0.04)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl mb-2", children: challengeEmoji }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-lg text-foreground mb-5 leading-snug", children: challengeLabel }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-28 h-28 mb-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "svg",
                          {
                            className: "w-full h-full -rotate-90",
                            viewBox: "0 0 100 100",
                            role: "img",
                            "aria-label": "Countdown timer",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Countdown timer" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "circle",
                                {
                                  cx: "50",
                                  cy: "50",
                                  r: "44",
                                  fill: "none",
                                  stroke: "oklch(0.26 0.01 260)",
                                  strokeWidth: "5"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                motion.circle,
                                {
                                  cx: "50",
                                  cy: "50",
                                  r: "44",
                                  fill: "none",
                                  stroke: "oklch(0.68 0.25 180)",
                                  strokeWidth: "5",
                                  strokeLinecap: "round",
                                  strokeDasharray: circumference,
                                  animate: { strokeDashoffset: dashOffset },
                                  transition: { duration: 0.9, ease: "easeOut" },
                                  style: {
                                    filter: "drop-shadow(0 0 8px oklch(0.68 0.25 180 / 0.9)) drop-shadow(0 0 16px oklch(0.68 0.25 180 / 0.4))"
                                  }
                                }
                              )
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-black text-4xl text-foreground tabular-nums leading-none", children: countdown }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-body mt-0.5", children: "sec" })
                        ] })
                      ] }),
                      !running && countdown === totalSeconds && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          type: "button",
                          onClick: handleStart,
                          className: "font-display font-bold tracking-widest text-sm px-6",
                          style: {
                            background: "oklch(0.68 0.25 180)",
                            color: "oklch(0.12 0.008 260)",
                            boxShadow: "0 0 20px oklch(0.68 0.25 180 / 0.4)"
                          },
                          "data-ocid": "joker-overlay.start_timer_button",
                          children: "START CHALLENGE"
                        }
                      ),
                      running && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-xs font-display font-bold uppercase tracking-[0.2em] pulse-accent",
                          style: {
                            color: "oklch(0.68 0.25 180)",
                            textShadow: "0 0 10px oklch(0.68 0.25 180 / 0.7)"
                          },
                          children: "Hold position!"
                        }
                      ),
                      !running && countdown === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-display font-bold uppercase tracking-wider text-primary", children: "✓ Challenge complete!" })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  className: "w-full font-display font-black text-base py-6 tracking-[0.15em] rounded-2xl",
                  style: {
                    background: countdown === 0 || !running ? "oklch(0.68 0.25 180)" : "oklch(0.26 0.01 260)",
                    color: countdown === 0 || !running ? "oklch(0.12 0.008 260)" : "oklch(0.55 0.008 260)",
                    boxShadow: countdown === 0 || !running ? "0 0 30px oklch(0.68 0.25 180 / 0.4)" : "none"
                  },
                  onClick: handleDone,
                  "data-ocid": "joker-overlay.confirm_button",
                  children: "DONE — NEXT CARD"
                }
              )
            ]
          }
        )
      ]
    }
  ) });
}
function ProgressBar({
  current,
  total,
  label,
  className
}) {
  const pct = total > 0 ? Math.min(current / total * 100, 100) : 0;
  const remaining = total - current;
  const showSegments = total <= 20 && total > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("w-full", className), "data-ocid": "progress-bar", children: [
    label !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-display font-bold text-muted-foreground uppercase tracking-[0.15em]", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-display font-bold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(0.68 0.25 180)" }, children: remaining }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: " left" })
      ] })
    ] }),
    showSegments ? (
      // Segment dots — one per card with glow on active
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: Array.from({ length: total }, (_, i) => i + 1).map(
        (seg) => {
          const isComplete = seg <= current;
          const isCurrent = seg === current;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: cn(
                "flex-1 h-1.5 rounded-full",
                !isComplete && "bg-muted/40"
              ),
              animate: {
                backgroundColor: isComplete ? "oklch(0.68 0.25 180)" : "oklch(0.22 0.01 260)"
              },
              transition: { duration: 0.4 },
              style: {
                boxShadow: isCurrent ? "0 0 8px oklch(0.68 0.25 180 / 0.9), 0 0 20px oklch(0.68 0.25 180 / 0.4)" : void 0
              }
            },
            seg
          );
        }
      ) })
    ) : (
      // Continuous bar for 52-card decks
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "relative h-2 rounded-full overflow-hidden",
          style: { background: "oklch(0.22 0.01 260)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                className: "absolute inset-y-0 left-0 rounded-full",
                initial: { width: 0 },
                animate: { width: `${pct}%` },
                transition: { duration: 0.6, ease: "easeOut" },
                style: {
                  background: "linear-gradient(90deg, oklch(0.55 0.2 180) 0%, oklch(0.72 0.28 180) 100%)",
                  boxShadow: "0 0 12px oklch(0.68 0.25 180 / 0.7), 0 0 24px oklch(0.68 0.25 180 / 0.3)"
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                className: "absolute inset-y-0 left-0 rounded-full pointer-events-none",
                animate: { width: `${pct}%` },
                transition: { duration: 0.6, ease: "easeOut" },
                style: {
                  background: "linear-gradient(90deg, transparent 0%, oklch(1 0 0 / 0.15) 50%, transparent 100%)"
                }
              }
            )
          ]
        }
      )
    )
  ] });
}
var ROOT_NAME = "AlertDialog";
var [createAlertDialogContext] = createContextScope(ROOT_NAME, [
  createDialogScope
]);
var useDialogScope = createDialogScope();
var AlertDialog$1 = (props) => {
  const { __scopeAlertDialog, ...alertDialogProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { ...dialogScope, ...alertDialogProps, modal: true });
};
AlertDialog$1.displayName = ROOT_NAME;
var TRIGGER_NAME = "AlertDialogTrigger";
var AlertDialogTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...triggerProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Trigger, { ...dialogScope, ...triggerProps, ref: forwardedRef });
  }
);
AlertDialogTrigger$1.displayName = TRIGGER_NAME;
var PORTAL_NAME = "AlertDialogPortal";
var AlertDialogPortal$1 = (props) => {
  const { __scopeAlertDialog, ...portalProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { ...dialogScope, ...portalProps });
};
AlertDialogPortal$1.displayName = PORTAL_NAME;
var OVERLAY_NAME = "AlertDialogOverlay";
var AlertDialogOverlay$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...overlayProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Overlay, { ...dialogScope, ...overlayProps, ref: forwardedRef });
  }
);
AlertDialogOverlay$1.displayName = OVERLAY_NAME;
var CONTENT_NAME = "AlertDialogContent";
var [AlertDialogContentProvider, useAlertDialogContentContext] = createAlertDialogContext(CONTENT_NAME);
var Slottable = createSlottable("AlertDialogContent");
var AlertDialogContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, children, ...contentProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef);
    const cancelRef = reactExports.useRef(null);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      WarningProvider,
      {
        contentName: CONTENT_NAME,
        titleName: TITLE_NAME,
        docsSlug: "alert-dialog",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogContentProvider, { scope: __scopeAlertDialog, cancelRef, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Content,
          {
            role: "alertdialog",
            ...dialogScope,
            ...contentProps,
            ref: composedRefs,
            onOpenAutoFocus: composeEventHandlers(contentProps.onOpenAutoFocus, (event) => {
              var _a;
              event.preventDefault();
              (_a = cancelRef.current) == null ? void 0 : _a.focus({ preventScroll: true });
            }),
            onPointerDownOutside: (event) => event.preventDefault(),
            onInteractOutside: (event) => event.preventDefault(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Slottable, { children }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionWarning, { contentRef })
            ]
          }
        ) })
      }
    );
  }
);
AlertDialogContent$1.displayName = CONTENT_NAME;
var TITLE_NAME = "AlertDialogTitle";
var AlertDialogTitle$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...titleProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { ...dialogScope, ...titleProps, ref: forwardedRef });
  }
);
AlertDialogTitle$1.displayName = TITLE_NAME;
var DESCRIPTION_NAME = "AlertDialogDescription";
var AlertDialogDescription$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeAlertDialog, ...descriptionProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Description, { ...dialogScope, ...descriptionProps, ref: forwardedRef });
});
AlertDialogDescription$1.displayName = DESCRIPTION_NAME;
var ACTION_NAME = "AlertDialogAction";
var AlertDialogAction$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...actionProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Close, { ...dialogScope, ...actionProps, ref: forwardedRef });
  }
);
AlertDialogAction$1.displayName = ACTION_NAME;
var CANCEL_NAME = "AlertDialogCancel";
var AlertDialogCancel$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...cancelProps } = props;
    const { cancelRef } = useAlertDialogContentContext(CANCEL_NAME, __scopeAlertDialog);
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const ref = useComposedRefs(forwardedRef, cancelRef);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Close, { ...dialogScope, ...cancelProps, ref });
  }
);
AlertDialogCancel$1.displayName = CANCEL_NAME;
var DescriptionWarning = ({ contentRef }) => {
  const MESSAGE = `\`${CONTENT_NAME}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${CONTENT_NAME}\` by passing a \`${DESCRIPTION_NAME}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${CONTENT_NAME}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.

For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`;
  reactExports.useEffect(() => {
    var _a;
    const hasDescription = document.getElementById(
      (_a = contentRef.current) == null ? void 0 : _a.getAttribute("aria-describedby")
    );
    if (!hasDescription) console.warn(MESSAGE);
  }, [MESSAGE, contentRef]);
  return null;
};
var Root2 = AlertDialog$1;
var Trigger2 = AlertDialogTrigger$1;
var Portal2 = AlertDialogPortal$1;
var Overlay2 = AlertDialogOverlay$1;
var Content2 = AlertDialogContent$1;
var Action = AlertDialogAction$1;
var Cancel = AlertDialogCancel$1;
var Title2 = AlertDialogTitle$1;
var Description2 = AlertDialogDescription$1;
function AlertDialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2, { "data-slot": "alert-dialog", ...props });
}
function AlertDialogTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Trigger2, { "data-slot": "alert-dialog-trigger", ...props });
}
function AlertDialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal2, { "data-slot": "alert-dialog-portal", ...props });
}
function AlertDialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay2,
    {
      "data-slot": "alert-dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function AlertDialogContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogPortal, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Content2,
      {
        "data-slot": "alert-dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props
      }
    )
  ] });
}
function AlertDialogHeader({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert-dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function AlertDialogFooter({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert-dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function AlertDialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title2,
    {
      "data-slot": "alert-dialog-title",
      className: cn("text-lg font-semibold", className),
      ...props
    }
  );
}
function AlertDialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Description2,
    {
      "data-slot": "alert-dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function AlertDialogAction({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Action,
    {
      className: cn(buttonVariants(), className),
      ...props
    }
  );
}
function AlertDialogCancel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Cancel,
    {
      className: cn(buttonVariants({ variant: "outline" }), className),
      ...props
    }
  );
}
const ModifierOverlay = ({
  type,
  exerciseName = "",
  finalReps = 0,
  onDismiss,
  onComplete,
  visible = true
}) => {
  const dismiss = onDismiss ?? onComplete ?? (() => {
  });
  const timerRef = reactExports.useRef(null);
  const isAce = type === "ace";
  const isShowing = visible && type !== null;
  reactExports.useEffect(() => {
    var _a, _b;
    if (!isShowing) return;
    if (isAce) {
      (_a = navigator.vibrate) == null ? void 0 : _a.call(navigator, [200, 50, 200]);
    } else {
      (_b = navigator.vibrate) == null ? void 0 : _b.call(navigator, [300]);
    }
    timerRef.current = setTimeout(() => {
      dismiss();
    }, 2500);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isShowing, isAce, dismiss]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isShowing && /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.85 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.92 },
      transition: {
        type: "spring",
        stiffness: 320,
        damping: 26,
        duration: 0.4
      },
      className: "fixed inset-0 z-[9999] flex flex-col items-center justify-center cursor-pointer select-none",
      style: {
        background: isAce ? "radial-gradient(ellipse 70% 60% at 50% 40%, oklch(0.65 0.25 30) 0%, oklch(0.10 0.02 20) 45%, oklch(0.08 0.008 260) 70%)" : "radial-gradient(ellipse 70% 60% at 50% 40%, oklch(0.55 0.18 250) 0%, oklch(0.09 0.02 250) 45%, oklch(0.08 0.008 260) 70%)"
      },
      onClick: () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        dismiss();
      },
      "data-ocid": "modifier-overlay.panel",
      "aria-label": isAce ? "Reps Doubled modifier" : "Reps Halved modifier",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute top-6 right-6 px-3 py-1.5 rounded-full text-sm font-black tracking-wider",
            style: {
              background: isAce ? "linear-gradient(135deg, oklch(0.83 0.19 84), oklch(0.72 0.22 50))" : "linear-gradient(135deg, oklch(0.72 0.10 240), oklch(0.78 0.04 240))",
              color: isAce ? "oklch(0.12 0.015 60)" : "oklch(0.10 0.015 250)",
              boxShadow: isAce ? "0 0 16px oklch(0.83 0.19 84 / 0.5), 0 2px 8px oklch(0 0 0 / 0.4)" : "0 0 16px oklch(0.72 0.10 240 / 0.5), 0 2px 8px oklch(0 0 0 / 0.4)"
            },
            children: isAce ? "×2" : "÷2"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs font-bold uppercase tracking-[0.3em]",
              style: {
                color: isAce ? "oklch(0.83 0.19 84)" : "oklch(0.72 0.10 240)"
              },
              children: "MODIFIER"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "font-black leading-none",
              style: { fontSize: "3.25rem", color: "oklch(0.97 0.005 260)" },
              children: "REPS"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "font-black leading-none text-center",
              style: {
                fontSize: "4.5rem",
                background: isAce ? "linear-gradient(135deg, oklch(0.83 0.19 84) 0%, oklch(0.65 0.25 30) 100%)" : "linear-gradient(135deg, oklch(0.72 0.10 240) 0%, oklch(0.78 0.04 240) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "none",
                filter: isAce ? "drop-shadow(0 0 18px oklch(0.83 0.19 84 / 0.55))" : "drop-shadow(0 0 18px oklch(0.72 0.10 240 / 0.55))"
              },
              children: isAce ? "DOUBLED" : "HALVED"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-16 h-px my-1",
              style: {
                background: isAce ? "linear-gradient(90deg, transparent, oklch(0.83 0.19 84), transparent)" : "linear-gradient(90deg, transparent, oklch(0.72 0.10 240), transparent)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "font-black leading-none",
              style: {
                fontSize: "6rem",
                color: "oklch(0.97 0.005 260)",
                lineHeight: 1
              },
              children: finalReps
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "font-bold text-sm tracking-[0.2em] uppercase",
              style: {
                color: isAce ? "oklch(0.83 0.19 84)" : "oklch(0.72 0.10 240)"
              },
              children: "REPS"
            }
          ),
          exerciseName && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-sm font-medium text-center mt-1",
              style: { color: "oklch(0.92 0.01 260 / 0.65)" },
              children: exerciseName
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "absolute bottom-10 text-xs font-medium tracking-widest uppercase",
            style: { color: "oklch(0.92 0.01 260 / 0.3)" },
            children: "TAP TO CONTINUE"
          }
        )
      ]
    },
    `modifier-${type}`
  ) });
};
function StatPill({ icon, value, label, accent }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 items-center gap-1.5 bg-card/70 rounded-xl px-2.5 py-2 border border-border/40 backdrop-blur-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: cn(
          "shrink-0",
          accent ? "text-orange-400" : "text-muted-foreground"
        ),
        children: icon
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-xs text-foreground leading-none tabular-nums select-none", children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-white/60 font-body uppercase tracking-wider mt-0.5", children: label })
    ] })
  ] });
}
function PauseExerciseBreakdown() {
  const cardHistory = useWorkoutStore((s) => s.cardHistory);
  const currentCard = useWorkoutStore((s) => s.currentCard);
  const allCards = currentCard ? [...cardHistory, currentCard] : [...cardHistory];
  const repMap = /* @__PURE__ */ new Map();
  for (const sc of allCards) {
    if (sc.card.suit === "Joker" || !sc.card.exercise) continue;
    repMap.set(sc.card.exercise, (repMap.get(sc.card.exercise) ?? 0) + sc.reps);
  }
  const rows = Array.from(repMap.entries()).sort((a, b) => b[1] - a[1]);
  if (rows.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 mb-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: "font-display font-bold text-[10px] uppercase tracking-widest mb-3",
        style: { color: "oklch(0.90 0.008 260)" },
        children: "Reps So Far"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "rounded-2xl overflow-hidden",
        style: {
          background: "oklch(0.16 0.01 260)",
          border: "1px solid oklch(0.26 0.01 260 / 0.5)"
        },
        "data-ocid": "workout-session.pause_reps_list",
        children: rows.map(([name, reps], i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between px-4 py-3",
            style: {
              borderBottom: i < rows.length - 1 ? "1px solid oklch(0.22 0.01 260 / 0.5)" : "none"
            },
            "data-ocid": `workout-session.pause_reps.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-sm text-white truncate flex-1 mr-3", children: name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-1 shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "font-display font-black text-base leading-none",
                    style: { color: "oklch(0.68 0.25 180)" },
                    children: reps
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "font-body text-[10px] uppercase tracking-wide",
                    style: { color: "oklch(0.82 0.008 260)" },
                    children: "reps"
                  }
                )
              ] })
            ]
          },
          name
        ))
      }
    )
  ] });
}
function WorkoutSessionPage() {
  var _a, _b, _c;
  const navigate = useNavigate();
  const {
    currentCard,
    previousCard,
    isFlipping,
    jokerActive,
    jokerChallenge,
    deckIndex,
    totalCards,
    isSummary,
    shuffledDeck
  } = useWorkoutStore();
  const {
    drawNextCard,
    goBackCard,
    cardHistoryLength,
    markSummary,
    dismissJoker,
    resetWorkout,
    getWorkoutStats
  } = useWorkout();
  const [isPaused, setIsPaused] = reactExports.useState(false);
  const isActive = shuffledDeck.length > 0 && !isSummary;
  const { formatted, elapsed } = useTimer(
    isActive && !jokerActive && !isPaused
  );
  const [isAnimating, setIsAnimating] = reactExports.useState(false);
  const [flashPress, setFlashPress] = reactExports.useState(false);
  const [modifierOverlay, setModifierOverlay] = reactExports.useState({ visible: false, type: null });
  const [screenFlash, setScreenFlash] = reactExports.useState({ active: false, type: null });
  reactExports.useEffect(() => {
    const preloadIndexes = [deckIndex + 1, deckIndex + 2];
    for (const idx of preloadIndexes) {
      const raw = shuffledDeck[idx];
      if (!raw) continue;
      const exerciseName2 = (raw.isAce || raw.isKing) && currentCard ? currentCard.card.exercise : raw.exerciseName;
      const src = resolveExerciseIllustration(exerciseName2);
      const img = new Image();
      img.src = src;
    }
  }, [deckIndex]);
  const currentCardKey = currentCard ? `${currentCard.card.suit}-${currentCard.card.rank}-${currentCard.reps}` : null;
  reactExports.useEffect(() => {
    if (!currentCard) return;
    const rank = currentCard.card.rank;
    const isAce = rank === "Ace" || rank === "ACE";
    const isKing = rank === "King" || rank === "KING";
    const isJoker2 = rank === "Joker" || currentCard.card.suit === "Joker";
    if (isAce || isKing || isJoker2) {
      const flashType = isAce ? "gold" : isKing ? "blue" : "teal";
      setScreenFlash({ active: true, type: flashType });
      const flashDuration = isJoker2 ? 450 : 350;
      const flashTimer = setTimeout(() => {
        setScreenFlash({ active: false, type: null });
      }, flashDuration);
      let modTimer = null;
      if (isAce || isKing) {
        const modType = isAce ? "ace" : "king";
        modTimer = setTimeout(() => {
          setModifierOverlay({ visible: true, type: modType });
        }, 400);
      }
      if (isJoker2 && navigator.vibrate) {
        navigator.vibrate([60, 40, 60]);
      }
      return () => {
        clearTimeout(flashTimer);
        if (modTimer) clearTimeout(modTimer);
      };
    }
  }, [currentCardKey]);
  reactExports.useEffect(() => {
    if (shuffledDeck.length === 0 && !isSummary) {
      navigate({ to: "/home" });
    }
  }, [shuffledDeck.length, isSummary, navigate]);
  reactExports.useEffect(() => {
    if (isSummary) {
      navigate({ to: "/workout/summary" });
    }
  }, [isSummary, navigate]);
  const stats = getWorkoutStats();
  const total = totalCards;
  const current = Math.max(0, deckIndex + 1);
  const remaining = stats.remainingCards;
  const calories = stats.estimatedCalories || Math.floor(elapsed * 0.12);
  const isWorkoutDone = remaining === 0 && current > 0;
  const isDisabled = isFlipping || isAnimating;
  const handleNext = () => {
    if (isDisabled) return;
    setFlashPress(true);
    if (navigator.vibrate) navigator.vibrate(50);
    setTimeout(() => setFlashPress(false), 200);
    if (isWorkoutDone) {
      markSummary();
      return;
    }
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);
    drawNextCard();
  };
  const handleQuit = () => {
    resetWorkout();
    navigate({ to: "/home" });
  };
  const repCount = currentCard ? currentCard.reps : 0;
  const exerciseName = ((_a = currentCard == null ? void 0 : currentCard.card) == null ? void 0 : _a.exercise) ?? "";
  const isJoker = ((_b = currentCard == null ? void 0 : currentCard.card) == null ? void 0 : _b.rank) === "Joker" || ((_c = currentCard == null ? void 0 : currentCard.card) == null ? void 0 : _c.suit) === "Joker";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-dvh bg-background flex flex-col max-w-[430px] mx-auto relative overflow-hidden",
      "data-ocid": "workout-session.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none",
            style: {
              background: "radial-gradient(ellipse 70% 45% at 50% 0%, oklch(0.22 0.04 180 / 0.18) 0%, transparent 65%), radial-gradient(ellipse 40% 30% at 50% 100%, oklch(0.18 0.03 180 / 0.12) 0%, transparent 60%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "relative flex items-center justify-between px-5 pt-10 pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "w-9 h-9 rounded-xl bg-card/60 border border-border/40 flex items-center justify-center text-white/70 hover:text-white transition-smooth",
                "data-ocid": "workout-session.quit_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              AlertDialogContent,
              {
                className: "max-w-xs",
                "data-ocid": "workout-session.quit_dialog",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { className: "font-display", children: "Quit workout?" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "Your progress will be lost. Are you sure you want to quit?" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "workout-session.quit_cancel_button", children: "Keep going" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      AlertDialogAction,
                      {
                        onClick: handleQuit,
                        className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                        "data-ocid": "workout-session.quit_confirm_button",
                        children: "Quit"
                      }
                    )
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, { size: "sm" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setIsPaused(true),
              className: "w-9 h-9 rounded-xl bg-card/60 border border-border/40 flex items-center justify-center text-white/70 hover:text-white transition-smooth",
              "data-ocid": "workout-session.pause_button",
              "aria-label": "Pause workout",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative px-5 pt-2 pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2",
            "data-ocid": "workout-session.stats_bar",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatPill,
                {
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                  value: formatted,
                  label: "TIME"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatPill,
                {
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-3 h-3" }),
                  value: String(calories),
                  label: "KCAL",
                  accent: true
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatPill,
                {
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
                  value: `${current}/${total}`,
                  label: "CARDS"
                }
              )
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          ProgressBar,
          {
            current,
            total,
            label: `CARD ${current} OF ${total}`
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "relative flex-1 px-4 flex flex-col justify-center",
            style: { minHeight: "55dvh" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: isFlipping || isAnimating ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0.8, scale: 0.96, rotateY: -60 },
                animate: { opacity: 1, scale: 1, rotateY: 0 },
                exit: { opacity: 0, scale: 0.96, rotateY: 60 },
                transition: { duration: 0.35, ease: [0.34, 1.56, 0.64, 1] },
                className: "rounded-[20px] border border-border/40 bg-card/40 flex items-center justify-center",
                style: { aspectRatio: "3/4", willChange: "transform" },
                "data-ocid": "workout-session.loading_state",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/60 font-body uppercase tracking-widest", children: "Drawing card..." })
                ] })
              },
              "flipping"
            ) : currentCard ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              ExerciseCard,
              {
                sessionCard: currentCard,
                previousCard,
                className: "card-hero"
              },
              `${currentCard.card.id}-${current}`
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "rounded-[20px] border border-border/40 bg-card/20 flex items-center justify-center",
                style: { aspectRatio: "3/4" },
                "data-ocid": "workout-session.empty_state",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 font-body text-sm", children: "Loading deck..." })
              }
            ) })
          }
        ),
        currentCard && !isFlipping && !isAnimating && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.35, delay: 0.2 },
            className: "px-5 pt-2 pb-3 flex items-end justify-between",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1 mr-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body text-white/60 uppercase tracking-widest mb-1", children: isJoker ? "CHALLENGE" : "EXERCISE" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground uppercase tracking-wide leading-tight truncate", children: exerciseName })
              ] }),
              !isJoker && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-black text-5xl text-primary leading-none text-shadow-glow tabular-nums", children: repCount }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-body text-white/60 uppercase tracking-widest mt-1", children: "REPS" })
              ] })
            ]
          },
          `info-${currentCard.card.id}-${current}`
        ),
        remaining > 0 && !isFlipping && !isAnimating && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs font-body text-white/60 uppercase tracking-widest pb-2", children: [
          remaining,
          " card",
          remaining !== 1 ? "s" : "",
          " remaining"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-1 pb-6 relative flex flex-col gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              whileTap: { scale: 0.97 },
              whileHover: { scale: 1.01 },
              animate: flashPress ? { scale: [1, 0.97, 1.02, 1] } : {},
              transition: { duration: 0.25 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  className: cn(
                    "w-full font-display font-black text-xl tracking-[0.15em] rounded-2xl uppercase transition-all duration-200",
                    "h-14 shadow-[0_0_40px_oklch(0.68_0.25_180/0.35),0_4px_20px_oklch(0_0_0/0.4)]",
                    !isDisabled && "hover:shadow-[0_0_60px_oklch(0.68_0.25_180/0.55),0_6px_24px_oklch(0_0_0/0.45)]"
                  ),
                  onClick: handleNext,
                  disabled: isDisabled,
                  "data-ocid": "workout-session.next_card_button",
                  children: isWorkoutDone ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                    "FINISH WORKOUT",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5" })
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                    "NEXT CARD",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5" })
                  ] })
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { whileTap: { scale: 0.96 }, transition: { duration: 0.2 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              className: cn(
                "w-full h-10 rounded-xl font-display font-bold text-sm tracking-[0.1em] uppercase transition-all duration-200",
                "border border-border/30 bg-card/40",
                cardHistoryLength === 0 || isDisabled ? "opacity-30 cursor-not-allowed" : "hover:bg-card/70 hover:border-border/60 text-white/70 hover:text-white"
              ),
              onClick: () => {
                if (cardHistoryLength === 0 || isDisabled) return;
                if (navigator.vibrate) navigator.vibrate(30);
                goBackCard();
              },
              disabled: cardHistoryLength === 0 || isDisabled,
              "data-ocid": "workout-session.back_card_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                "PREVIOUS CARD"
              ] })
            }
          ) })
        ] }),
        screenFlash.active && screenFlash.type && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `fixed inset-0 z-[100] pointer-events-none ${screenFlash.type === "gold" ? "screen-flash-gold-anim" : screenFlash.type === "blue" ? "screen-flash-blue-anim" : "screen-flash-teal-anim"}`,
            style: {
              background: screenFlash.type === "gold" ? "oklch(0.76 0.22 60)" : screenFlash.type === "blue" ? "oklch(0.55 0.18 250)" : "oklch(0.68 0.25 180)"
            },
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          JokerOverlay,
          {
            active: jokerActive,
            challenge: jokerChallenge,
            onDismiss: dismissJoker
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ModifierOverlay,
          {
            type: modifierOverlay.type,
            visible: modifierOverlay.visible,
            exerciseName,
            finalReps: repCount,
            onDismiss: () => setModifierOverlay({ visible: false, type: null })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isPaused && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              transition: { duration: 0.22 },
              className: "fixed inset-0 z-50",
              style: { background: "oklch(0 0 0 / 0.8)" },
              "aria-hidden": "true"
            },
            "pause-backdrop"
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 40, scale: 0.95 },
              animate: { opacity: 1, y: 0, scale: 1 },
              exit: { opacity: 0, y: 40, scale: 0.95 },
              transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] },
              className: "fixed inset-x-0 bottom-0 z-50 max-w-[430px] mx-auto rounded-t-3xl overflow-hidden",
              style: {
                background: "oklch(0.14 0.012 260)",
                border: "1px solid oklch(0.26 0.01 260 / 0.6)",
                borderBottom: "none",
                boxShadow: "0 -16px 60px oklch(0 0 0 / 0.55)"
              },
              "data-ocid": "workout-session.pause_dialog",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center pt-3 pb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-9 h-1 rounded-full",
                    style: { background: "oklch(0.36 0.01 260 / 0.7)" }
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-6 pt-2 pb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-[10px] font-display font-bold tracking-[0.22em] uppercase mb-0.5",
                        style: { color: "oklch(0.68 0.25 180)" },
                        children: "Paused"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black text-xl text-foreground tracking-tight", children: "Workout Summary" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setIsPaused(false),
                      className: "w-9 h-9 rounded-xl flex items-center justify-center transition-smooth text-white/70 hover:text-white",
                      style: {
                        background: "oklch(0.20 0.01 260)",
                        border: "1px solid oklch(0.30 0.01 260 / 0.5)"
                      },
                      "aria-label": "Close pause menu",
                      "data-ocid": "workout-session.pause_close_button",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "mx-6 h-px mb-5",
                    style: { background: "oklch(0.26 0.01 260 / 0.5)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 grid grid-cols-2 gap-3 mb-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "rounded-2xl p-4",
                      style: {
                        background: "oklch(0.16 0.01 260)",
                        border: "1px solid oklch(0.26 0.01 260 / 0.5)"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5 text-white/60" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-body uppercase tracking-wider text-white/70", children: "Elapsed" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-black text-2xl text-foreground tabular-nums", children: formatted })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "rounded-2xl p-4",
                      style: {
                        background: "oklch(0.17 0.015 180 / 0.4)",
                        border: "1px solid oklch(0.68 0.25 180 / 0.35)",
                        boxShadow: "0 0 20px oklch(0.68 0.25 180 / 0.12)"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            CircleCheck,
                            {
                              className: "w-3.5 h-3.5",
                              style: { color: "oklch(0.68 0.25 180)" }
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-body uppercase tracking-wider text-white/70", children: "Progress" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-black text-2xl text-foreground tabular-nums", children: [
                          current,
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white/50 text-base", children: [
                            "/",
                            total
                          ] })
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "rounded-2xl p-4",
                      style: {
                        background: "oklch(0.16 0.01 260)",
                        border: "1px solid oklch(0.26 0.01 260 / 0.5)"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-3.5 h-3.5 text-white/60" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-body uppercase tracking-wider text-white/70", children: "Remaining" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-black text-2xl text-foreground tabular-nums", children: remaining })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "rounded-2xl p-4",
                      style: {
                        background: "oklch(0.16 0.01 260)",
                        border: "1px solid oklch(0.26 0.01 260 / 0.5)"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-3.5 h-3.5 text-orange-400" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-body uppercase tracking-wider text-white/70", children: "Calories" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-black text-2xl text-foreground tabular-nums", children: calories })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(PauseExerciseBreakdown, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 pb-10 flex flex-col gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      className: "w-full h-12 font-display font-black text-base tracking-[0.12em] rounded-2xl",
                      style: { boxShadow: "0 0 28px oklch(0.68 0.25 180 / 0.3)" },
                      onClick: () => setIsPaused(false),
                      "data-ocid": "workout-session.pause_resume_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4 mr-2" }),
                        "RESUME WORKOUT"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "ghost",
                      className: "w-full h-11 rounded-2xl font-display font-bold text-sm border border-destructive/30 text-destructive hover:bg-destructive/10 hover:border-destructive/50 transition-smooth",
                      onClick: () => {
                        setIsPaused(false);
                        handleQuit();
                      },
                      "data-ocid": "workout-session.pause_end_button",
                      children: "End Workout"
                    }
                  )
                ] })
              ]
            },
            "pause-modal"
          )
        ] }) })
      ]
    }
  );
}
export {
  WorkoutSessionPage as default
};
