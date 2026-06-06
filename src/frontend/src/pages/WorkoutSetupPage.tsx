import { CardCount } from "@/backend";
import { Logo } from "@/components/Logo";
import { PlayingCard } from "@/components/PlayingCard";
import { Button } from "@/components/ui/button";
import {
  getSuitConfig,
  resolveExerciseIllustration,
} from "@/data/exerciseAssets";
import { useWorkout } from "@/hooks/use-workout";
import { cn } from "@/lib/utils";
import { useWorkoutStore } from "@/store/workout";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Clock, Flame, Shuffle, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

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
      color: "oklch(0.65 0.18 160)",
    },
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
      color: "oklch(0.68 0.25 180)",
    },
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
      color: "oklch(0.65 0.22 40)",
    },
  },
];

export default function WorkoutSetupPage() {
  const navigate = useNavigate();
  const { selectedDeck, selectedCardCount, setSelectedCardCount, isShuffling } =
    useWorkoutStore();
  const { startWorkout } = useWorkout();

  const [customInput, setCustomInput] = useState("");
  const [customError, setCustomError] = useState("");
  const [isCustomSelected, setIsCustomSelected] = useState(false);

  const handleCustomChange = (val: string) => {
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

  const handlePresetSelect = (value: (typeof CARD_COUNTS)[number]["value"]) => {
    setIsCustomSelected(false);
    setCustomInput("");
    setCustomError("");
    setSelectedCardCount(value);
  };

  const handleCustomFocus = () => {
    setIsCustomSelected(true);
    setSelectedCardCount(null);
  };

  const customCountNum =
    customInput !== "" && !customError ? Number(customInput) : null;
  const canStart =
    !isShuffling &&
    (isCustomSelected ? customCountNum !== null : selectedCardCount !== null);

  const handleStart = async () => {
    if (!selectedDeck || isShuffling) return;
    if (isCustomSelected && customCountNum !== null) {
      await startWorkout(customCountNum);
      return;
    }
    if (!selectedCardCount) return;
    await startWorkout();
  };

  return (
    <div
      className="min-h-dvh bg-background flex flex-col max-w-[430px] mx-auto"
      data-ocid="workout-setup.page"
    >
      {/* Ambient gradient */}
      <div
        className="pointer-events-none fixed inset-0 max-w-[430px] mx-auto"
        style={{
          background:
            "radial-gradient(ellipse 70% 35% at 50% 0%, oklch(0.22 0.04 180 / 0.16) 0%, transparent 65%)",
        }}
      />

      {/* Header */}
      <header className="relative flex items-center gap-3 px-5 pt-12 pb-5">
        <motion.button
          type="button"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => navigate({ to: "/decks" })}
          className="w-10 h-10 rounded-xl bg-card border border-border/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/45 transition-smooth"
          data-ocid="workout-setup.back_button"
        >
          <ArrowLeft className="w-4 h-4" />
        </motion.button>
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex-1 min-w-0"
        >
          <h1 className="font-display font-black text-xl text-foreground tracking-tight">
            Workout Setup
          </h1>
          <p className="text-xs text-muted-foreground font-body truncate">
            {selectedDeck?.name ?? "No deck selected"}
          </p>
        </motion.div>
        <Logo size="sm" iconOnly className="opacity-70 shrink-0" />
      </header>

      {/* Motivational tagline */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="px-5 mb-6"
      >
        <p
          className="font-display font-black text-xs tracking-[0.28em] uppercase"
          style={{ color: "oklch(0.68 0.25 180)" }}
        >
          SHUFFLE. DRAW. CONQUER.
        </p>
      </motion.div>

      {/* Card visual / Shuffle animation */}
      <div className="flex justify-center px-5 mb-7">
        <AnimatePresence mode="wait">
          {isShuffling ? (
            <ShuffleAnimation key="shuffling" />
          ) : (
            <motion.div
              key="card-preview"
              initial={{ opacity: 0, scale: 0.85, rotateY: -15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              data-ocid="workout-setup.card_preview"
            >
              <PlayingCard showBack />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Card count selection */}
      <div className="px-5 mb-6">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="font-display font-bold text-sm uppercase tracking-widest text-muted-foreground mb-3"
        >
          Select Workout Size
        </motion.h2>
        <div className="flex flex-col gap-3">
          {CARD_COUNTS.map(
            ({ value, label, badge, sub, time, calories, badgeStyle }, i) => {
              const isSelected =
                !isCustomSelected && selectedCardCount === value;
              return (
                <motion.button
                  key={value}
                  type="button"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.18 + i * 0.07,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handlePresetSelect(value)}
                  className="w-full text-left rounded-2xl border transition-smooth relative overflow-hidden"
                  style={{
                    background: isSelected
                      ? "oklch(0.17 0.015 180 / 0.5)"
                      : "oklch(0.16 0.01 260)",
                    borderColor: isSelected
                      ? "oklch(0.68 0.25 180 / 0.6)"
                      : "oklch(0.26 0.01 260 / 0.6)",
                    boxShadow: isSelected
                      ? "0 0 28px oklch(0.68 0.25 180 / 0.2), inset 0 1px 0 oklch(0.68 0.25 180 / 0.1)"
                      : "none",
                  }}
                  data-ocid={`workout-setup.card-count.item.${i + 1}`}
                >
                  {isSelected && (
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(ellipse at 0% 50%, oklch(0.68 0.25 180 / 0.08) 0%, transparent 70%)",
                      }}
                    />
                  )}

                  <div className="relative flex items-center gap-4 p-4">
                    {/* Selector radio */}
                    <div
                      className={cn(
                        "w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-smooth",
                      )}
                      style={{
                        borderColor: isSelected
                          ? "oklch(0.68 0.25 180)"
                          : "oklch(0.38 0.01 260)",
                        background: isSelected
                          ? "oklch(0.68 0.25 180)"
                          : "transparent",
                      }}
                    >
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 rounded-full"
                          style={{ background: "oklch(0.12 0.008 260)" }}
                        />
                      )}
                    </div>

                    {/* Text content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span
                          className="font-display font-black text-lg leading-none"
                          style={{
                            color: isSelected
                              ? "oklch(0.68 0.25 180)"
                              : "oklch(0.92 0.01 260)",
                          }}
                        >
                          {label}
                        </span>
                        <span
                          className="text-[10px] font-display font-black tracking-widest px-2 py-0.5 rounded"
                          style={
                            isSelected
                              ? badgeStyle
                              : {
                                  background: "oklch(0.22 0.01 260 / 0.8)",
                                  color: "oklch(0.55 0.008 260)",
                                }
                          }
                        >
                          {badge}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground font-body">
                          {sub}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] text-muted-foreground font-body">
                          <Clock className="w-3 h-3" />
                          {time}
                        </span>
                      </div>
                    </div>

                    {/* Calories chip */}
                    <div className="flex items-center gap-1 shrink-0">
                      <Flame
                        className="w-3.5 h-3.5"
                        style={{
                          color: isSelected
                            ? "oklch(0.68 0.25 180)"
                            : "oklch(0.55 0.008 260)",
                        }}
                      />
                      <span
                        className="text-xs font-display font-bold"
                        style={{
                          color: isSelected
                            ? "oklch(0.68 0.25 180)"
                            : "oklch(0.55 0.008 260)",
                        }}
                      >
                        {calories}
                      </span>
                    </div>
                  </div>
                </motion.button>
              );
            },
          )}

          {/* Custom card count */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.39, ease: [0.16, 1, 0.3, 1] }}
            className="w-full rounded-2xl border transition-smooth relative overflow-hidden"
            style={{
              background: isCustomSelected
                ? "oklch(0.17 0.015 180 / 0.5)"
                : "oklch(0.16 0.01 260)",
              borderColor: customError
                ? "oklch(0.65 0.22 25 / 0.7)"
                : isCustomSelected
                  ? "oklch(0.68 0.25 180 / 0.6)"
                  : "oklch(0.26 0.01 260 / 0.6)",
              boxShadow:
                isCustomSelected && !customError
                  ? "0 0 28px oklch(0.68 0.25 180 / 0.2), inset 0 1px 0 oklch(0.68 0.25 180 / 0.1)"
                  : customError
                    ? "0 0 16px oklch(0.65 0.22 25 / 0.15)"
                    : "none",
            }}
          >
            {isCustomSelected && !customError && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 0% 50%, oklch(0.68 0.25 180 / 0.08) 0%, transparent 70%)",
                }}
              />
            )}
            <div className="relative flex items-center gap-4 p-4">
              {/* Selector radio */}
              <div
                className="w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-smooth"
                style={{
                  borderColor: customError
                    ? "oklch(0.65 0.22 25)"
                    : isCustomSelected
                      ? "oklch(0.68 0.25 180)"
                      : "oklch(0.38 0.01 260)",
                  background:
                    isCustomSelected && !customError
                      ? "oklch(0.68 0.25 180)"
                      : "transparent",
                }}
              >
                {isCustomSelected && !customError && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2 h-2 rounded-full"
                    style={{ background: "oklch(0.12 0.008 260)" }}
                  />
                )}
              </div>

              {/* Label + input */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="font-display font-black text-lg leading-none"
                    style={{
                      color:
                        isCustomSelected && !customError
                          ? "oklch(0.68 0.25 180)"
                          : customError
                            ? "oklch(0.65 0.22 25)"
                            : "oklch(0.92 0.01 260)",
                    }}
                  >
                    Custom
                  </span>
                  <span
                    className="text-[10px] font-display font-black tracking-widest px-2 py-0.5 rounded"
                    style={{
                      background: "oklch(0.22 0.01 260 / 0.8)",
                      color: "oklch(0.55 0.008 260)",
                    }}
                  >
                    YOUR CHOICE
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={2}
                    max={52}
                    value={customInput}
                    onFocus={handleCustomFocus}
                    onChange={(e) => handleCustomChange(e.target.value)}
                    placeholder="2 – 52 cards"
                    className="w-32 h-8 rounded-lg px-3 font-display font-bold text-sm text-foreground outline-none transition-smooth"
                    style={{
                      background: "oklch(0.12 0.008 260)",
                      border: `1px solid ${
                        customError
                          ? "oklch(0.65 0.22 25 / 0.7)"
                          : isCustomSelected
                            ? "oklch(0.68 0.25 180 / 0.5)"
                            : "oklch(0.30 0.01 260 / 0.6)"
                      }`,
                    }}
                    data-ocid="workout-setup.custom_count_input"
                  />
                  {customError ? (
                    <span
                      className="text-[10px] font-body"
                      style={{ color: "oklch(0.65 0.22 25)" }}
                    >
                      {customError}
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground font-body">
                      Any amount
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Start button */}
      <div className="px-5 pb-10 mt-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <Button
            className="w-full h-14 font-display font-black text-xl tracking-widest rounded-2xl disabled:shadow-none disabled:opacity-30 transition-smooth"
            style={{
              boxShadow: canStart
                ? "0 0 40px oklch(0.68 0.25 180 / 0.35), 0 4px 20px oklch(0 0 0 / 0.3)"
                : "none",
            }}
            disabled={!canStart}
            onClick={handleStart}
            data-ocid="workout-setup.start_button"
          >
            {isShuffling ? (
              <span className="flex items-center gap-2">
                <Shuffle className="w-5 h-5 animate-spin" />
                Shuffling...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                START WORKOUT
              </span>
            )}
          </Button>
          {!canStart && !isShuffling && (
            <p className="text-center text-xs text-muted-foreground font-body mt-3">
              Select a workout size above
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}

// ─── Sample cards for shuffle animation ──────────────────────────────────────
const SHUFFLE_SAMPLE_CARDS: Array<{
  exercise: string;
  suit: string;
  rank: string;
  reps: number;
}> = [
  { exercise: "Diamond Push Ups", suit: "Hearts", rank: "8", reps: 8 },
  { exercise: "Chin Ups", suit: "Spades", rank: "5", reps: 5 },
  { exercise: "Dips", suit: "Diamonds", rank: "10", reps: 10 },
  { exercise: "Normal Rows", suit: "Clubs", rank: "6", reps: 6 },
  { exercise: "Close Grip Push Ups", suit: "Hearts", rank: "7", reps: 7 },
  { exercise: "Normal Pull Ups", suit: "Spades", rank: "4", reps: 4 },
  { exercise: "Chin Up Rows", suit: "Clubs", rank: "3", reps: 3 },
  { exercise: "Normal Push Ups", suit: "Hearts", rank: "9", reps: 9 },
];

const ANGLES = [-24, -12, 0, 12, 24];

// Shuffle animation — shows real exercise cards cycling through the fan
function ShuffleAnimation() {
  const [cycleOffset, setCycleOffset] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCycleOffset((prev) => (prev + 1) % SHUFFLE_SAMPLE_CARDS.length);
    }, 420);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const visibleCards = ANGLES.map((_, i) => ({
    ...SHUFFLE_SAMPLE_CARDS[(cycleOffset + i) % SHUFFLE_SAMPLE_CARDS.length]!,
    slot: i,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex flex-col items-center gap-5"
      data-ocid="workout-setup.loading_state"
    >
      {/* Fan of real exercise cards */}
      <div className="relative w-60 h-44">
        {visibleCards.map((card, i) => {
          const baseAngle = ANGLES[i] ?? 0;
          const isCenter = i === 2;
          const suitCfg = getSuitConfig(card.suit);
          const imgSrc = resolveExerciseIllustration(card.exercise);
          return (
            <motion.div
              key="`slot-${ANGLES[i]}`"
              className="absolute"
              style={{
                left: "50%",
                bottom: 0,
                originX: "50%",
                originY: "100%",
                x: "-50%",
              }}
              animate={{
                rotate: [
                  baseAngle,
                  baseAngle + (i % 2 === 0 ? 14 : -14),
                  baseAngle - (i % 2 === 0 ? 5 : -5),
                  baseAngle,
                ],
                y: [0, isCenter ? -14 : -6, 0, 0],
              }}
              transition={{
                duration: 0.8,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.08,
                ease: "easeInOut",
              }}
            >
              <motion.div
                key={`${card.exercise}-${cycleOffset}`}
                initial={{ opacity: 0.7, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="w-20 h-28 rounded-xl overflow-hidden flex flex-col"
                style={{
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor: isCenter
                    ? `${suitCfg.accent}cc`
                    : "oklch(0.26 0.01 260 / 0.8)",
                  background: isCenter
                    ? `linear-gradient(160deg, ${suitCfg.gradientFrom}, ${suitCfg.gradientTo})`
                    : "oklch(0.15 0.01 260)",
                  boxShadow: isCenter
                    ? `0 6px 24px ${suitCfg.glowColor}`
                    : "none",
                }}
              >
                {/* Top: suit symbol + rank */}
                <div className="flex items-center justify-between px-1.5 pt-1.5 shrink-0">
                  <span
                    className="font-display font-black text-[10px] leading-none"
                    style={{ color: suitCfg.accent }}
                  >
                    {card.rank}
                  </span>
                  <span
                    className="text-[9px] leading-none"
                    style={{ color: suitCfg.accent }}
                  >
                    {suitCfg.symbol}
                  </span>
                </div>

                {/* Exercise illustration */}
                <div className="flex-1 mx-1 my-0.5 rounded-md overflow-hidden bg-[oklch(0.93_0.035_70)]">
                  <img
                    src={imgSrc}
                    alt={card.exercise}
                    className="w-full h-full object-contain"
                    loading="eager"
                    decoding="sync"
                  />
                </div>

                {/* Rep count — only on center card */}
                {isCenter && (
                  <div className="text-center pb-1.5 shrink-0">
                    <span
                      className="font-display font-black text-sm leading-none"
                      style={{ color: suitCfg.accent }}
                    >
                      {card.reps}
                    </span>
                    <span
                      className="font-body text-[7px] ml-0.5 uppercase tracking-wide"
                      style={{ color: `${suitCfg.accent}88` }}
                    >
                      reps
                    </span>
                  </div>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Shuffle label */}
      <motion.div
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY }}
        className="flex items-center gap-2 font-display font-bold text-base"
        style={{ color: "oklch(0.68 0.25 180)" }}
      >
        <Shuffle className="w-4 h-4" />
        <span className="tracking-widest">SHUFFLING DECK...</span>
      </motion.div>
    </motion.div>
  );
}
