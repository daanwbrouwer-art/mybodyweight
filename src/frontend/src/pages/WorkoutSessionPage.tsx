import { ExerciseCard } from "@/components/ExerciseCard";
import { JokerOverlay } from "@/components/JokerOverlay";
import { Logo } from "@/components/Logo";
import { ProgressBar } from "@/components/ProgressBar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { resolveExerciseIllustration } from "@/data/exerciseAssets";
import { useTimer } from "@/hooks/use-timer";
import { useWorkout } from "@/hooks/use-workout";
import { cn } from "@/lib/utils";
import { useWorkoutStore } from "@/store/workout";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Clock,
  Flame,
  Pause,
  Play,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { type ReactNode, useEffect, useState } from "react";
import { ModifierOverlay } from "../components/ModifierOverlay";

interface StatPillProps {
  icon: ReactNode;
  value: string;
  label: string;
  accent?: boolean;
}

function StatPill({ icon, value, label, accent }: StatPillProps) {
  return (
    <div className="flex flex-1 items-center gap-1.5 bg-card/70 rounded-xl px-2.5 py-2 border border-border/40 backdrop-blur-sm">
      <span
        className={cn(
          "shrink-0",
          accent ? "text-orange-400" : "text-muted-foreground",
        )}
      >
        {icon}
      </span>
      <div className="min-w-0">
        <div className="font-display font-bold text-xs text-foreground leading-none tabular-nums select-none">
          {value}
        </div>
        <div className="text-[10px] text-white/60 font-body uppercase tracking-wider mt-0.5">
          {label}
        </div>
      </div>
    </div>
  );
}

// ─── Pause Exercise Breakdown ───────────────────────────────────────────────
function PauseExerciseBreakdown() {
  const cardHistory = useWorkoutStore((s) => s.cardHistory);
  const currentCard = useWorkoutStore((s) => s.currentCard);

  // Aggregate all drawn cards (history + current)
  const allCards = currentCard
    ? [...cardHistory, currentCard]
    : [...cardHistory];

  // Sum reps per exercise, skip Jokers
  const repMap = new Map<string, number>();
  for (const sc of allCards) {
    if (sc.card.suit === "Joker" || !sc.card.exercise) continue;
    repMap.set(sc.card.exercise, (repMap.get(sc.card.exercise) ?? 0) + sc.reps);
  }

  const rows = Array.from(repMap.entries()).sort((a, b) => b[1] - a[1]);

  if (rows.length === 0) return null;

  return (
    <div className="px-6 mb-5">
      <p
        className="font-display font-bold text-[10px] uppercase tracking-widest mb-3"
        style={{ color: "oklch(0.90 0.008 260)" }}
      >
        Reps So Far
      </p>
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "oklch(0.16 0.01 260)",
          border: "1px solid oklch(0.26 0.01 260 / 0.5)",
        }}
        data-ocid="workout-session.pause_reps_list"
      >
        {rows.map(([name, reps], i) => (
          <div
            key={name}
            className="flex items-center justify-between px-4 py-3"
            style={{
              borderBottom:
                i < rows.length - 1
                  ? "1px solid oklch(0.22 0.01 260 / 0.5)"
                  : "none",
            }}
            data-ocid={`workout-session.pause_reps.item.${i + 1}`}
          >
            <span className="font-body text-sm text-white truncate flex-1 mr-3">
              {name}
            </span>
            <div className="flex items-baseline gap-1 shrink-0">
              <span
                className="font-display font-black text-base leading-none"
                style={{ color: "oklch(0.68 0.25 180)" }}
              >
                {reps}
              </span>
              <span
                className="font-body text-[10px] uppercase tracking-wide"
                style={{ color: "oklch(0.82 0.008 260)" }}
              >
                reps
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function WorkoutSessionPage() {
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
    shuffledDeck,
  } = useWorkoutStore();
  const {
    drawNextCard,
    goBackCard,
    cardHistoryLength,
    markSummary,
    dismissJoker,
    resetWorkout,
    getWorkoutStats,
  } = useWorkout();

  const [isPaused, setIsPaused] = useState(false);
  const isActive = shuffledDeck.length > 0 && !isSummary;
  const { formatted, elapsed } = useTimer(
    isActive && !jokerActive && !isPaused,
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [flashPress, setFlashPress] = useState(false);
  const [modifierOverlay, setModifierOverlay] = useState<{
    visible: boolean;
    type: "ace" | "king" | null;
  }>({ visible: false, type: null });
  const [screenFlash, setScreenFlash] = useState<{
    active: boolean;
    type: "gold" | "blue" | "teal" | null;
  }>({ active: false, type: null });

  // Silently preload the next 2 cards' illustrations so they appear instantly
  // biome-ignore lint/correctness/useExhaustiveDependencies: deckIndex drives preload
  useEffect(() => {
    const preloadIndexes = [deckIndex + 1, deckIndex + 2];
    for (const idx of preloadIndexes) {
      const raw = shuffledDeck[idx];
      if (!raw) continue;
      // ACE/KING inherit the exercise from the current card
      const exerciseName =
        (raw.isAce || raw.isKing) && currentCard
          ? currentCard.card.exercise
          : raw.exerciseName;
      const src = resolveExerciseIllustration(exerciseName);
      const img = new Image();
      img.src = src;
    }
  }, [deckIndex]);

  const currentCardKey = currentCard
    ? `${currentCard.card.suit}-${currentCard.card.rank}-${currentCard.reps}`
    : null;

  // Trigger screen flash + modifier overlay when Ace or King card is drawn
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional key-based trigger
  useEffect(() => {
    if (!currentCard) return;
    const rank = currentCard.card.rank;
    const isAce = rank === "Ace" || rank === "ACE";
    const isKing = rank === "King" || rank === "KING";
    const isJoker = rank === "Joker" || currentCard.card.suit === "Joker";

    if (isAce || isKing || isJoker) {
      // Trigger screen flash at flip start
      const flashType = isAce ? "gold" : isKing ? "blue" : "teal";
      setScreenFlash({ active: true, type: flashType });

      // Clear flash after animation
      const flashDuration = isJoker ? 450 : 350;
      const flashTimer = setTimeout(() => {
        setScreenFlash({ active: false, type: null });
      }, flashDuration);

      // For Ace/King, show modifier overlay after flash
      let modTimer: ReturnType<typeof setTimeout> | null = null;
      if (isAce || isKing) {
        const modType = isAce ? "ace" : "king";
        modTimer = setTimeout(() => {
          setModifierOverlay({ visible: true, type: modType });
        }, 400);
      }

      // Joker haptic: double-pulse pattern
      if (isJoker && navigator.vibrate) {
        navigator.vibrate([60, 40, 60]);
      }

      return () => {
        clearTimeout(flashTimer);
        if (modTimer) clearTimeout(modTimer);
      };
    }
  }, [currentCardKey]);

  // Redirect if no deck loaded
  useEffect(() => {
    if (shuffledDeck.length === 0 && !isSummary) {
      navigate({ to: "/home" });
    }
  }, [shuffledDeck.length, isSummary, navigate]);

  // Navigate to summary when done
  useEffect(() => {
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
  const exerciseName = currentCard?.card?.exercise ?? "";
  const isJoker =
    currentCard?.card?.rank === "Joker" || currentCard?.card?.suit === "Joker";

  return (
    <div
      className="min-h-dvh bg-background flex flex-col max-w-[430px] mx-auto relative overflow-hidden"
      data-ocid="workout-session.page"
    >
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 45% at 50% 0%, oklch(0.22 0.04 180 / 0.18) 0%, transparent 65%), radial-gradient(ellipse 40% 30% at 50% 100%, oklch(0.18 0.03 180 / 0.12) 0%, transparent 60%)",
        }}
      />

      {/* ── Header ── */}
      <header className="relative flex items-center justify-between px-5 pt-10 pb-2">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              type="button"
              className="w-9 h-9 rounded-xl bg-card/60 border border-border/40 flex items-center justify-center text-white/70 hover:text-white transition-smooth"
              data-ocid="workout-session.quit_button"
            >
              <X className="w-4 h-4" />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent
            className="max-w-xs"
            data-ocid="workout-session.quit_dialog"
          >
            <AlertDialogHeader>
              <AlertDialogTitle className="font-display">
                Quit workout?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Your progress will be lost. Are you sure you want to quit?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel data-ocid="workout-session.quit_cancel_button">
                Keep going
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleQuit}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                data-ocid="workout-session.quit_confirm_button"
              >
                Quit
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Logo size="sm" />

        <button
          type="button"
          onClick={() => setIsPaused(true)}
          className="w-9 h-9 rounded-xl bg-card/60 border border-border/40 flex items-center justify-center text-white/70 hover:text-white transition-smooth"
          data-ocid="workout-session.pause_button"
          aria-label="Pause workout"
        >
          <Pause className="w-4 h-4" />
        </button>
      </header>

      {/* ── Stats bar ── */}
      <div className="relative px-5 pt-2 pb-3">
        <div
          className="flex items-center gap-2"
          data-ocid="workout-session.stats_bar"
        >
          <StatPill
            icon={<Clock className="w-3 h-3" />}
            value={formatted}
            label="TIME"
          />
          <StatPill
            icon={<Flame className="w-3 h-3" />}
            value={String(calories)}
            label="KCAL"
            accent
          />
          <StatPill
            icon={<CheckCircle2 className="w-3 h-3" />}
            value={`${current}/${total}`}
            label="CARDS"
          />
        </div>
      </div>

      {/* ── Progress bar ── */}
      <div className="px-5 pb-4">
        <ProgressBar
          current={current}
          total={total}
          label={`CARD ${current} OF ${total}`}
        />
      </div>

      {/* ── HERO CARD AREA ── */}
      <div
        className="relative flex-1 px-4 flex flex-col justify-center"
        style={{ minHeight: "55dvh" }}
      >
        <AnimatePresence mode="wait">
          {isFlipping || isAnimating ? (
            <motion.div
              key="flipping"
              initial={{ opacity: 0.8, scale: 0.96, rotateY: -60 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.96, rotateY: 60 }}
              transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
              className="rounded-[20px] border border-border/40 bg-card/40 flex items-center justify-center"
              style={{ aspectRatio: "3/4", willChange: "transform" }}
              data-ocid="workout-session.loading_state"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                <p className="text-xs text-white/60 font-body uppercase tracking-widest">
                  Drawing card...
                </p>
              </div>
            </motion.div>
          ) : currentCard ? (
            <ExerciseCard
              key={`${currentCard.card.id}-${current}`}
              sessionCard={currentCard}
              previousCard={previousCard}
              className="card-hero"
            />
          ) : (
            <div
              className="rounded-[20px] border border-border/40 bg-card/20 flex items-center justify-center"
              style={{ aspectRatio: "3/4" }}
              data-ocid="workout-session.empty_state"
            >
              <p className="text-white/50 font-body text-sm">Loading deck...</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Exercise info strip below card ── */}
      {currentCard && !isFlipping && !isAnimating && (
        <motion.div
          key={`info-${currentCard.card.id}-${current}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.2 }}
          className="px-5 pt-2 pb-3 flex items-end justify-between"
        >
          <div className="min-w-0 flex-1 mr-4">
            <p className="text-xs font-body text-white/60 uppercase tracking-widest mb-1">
              {isJoker ? "CHALLENGE" : "EXERCISE"}
            </p>
            <h2 className="font-display font-bold text-2xl text-foreground uppercase tracking-wide leading-tight truncate">
              {exerciseName}
            </h2>
          </div>
          {!isJoker && (
            <div className="text-right shrink-0">
              <div className="font-display font-black text-5xl text-primary leading-none text-shadow-glow tabular-nums">
                {repCount}
              </div>
              <div className="text-xs font-body text-white/60 uppercase tracking-widest mt-1">
                REPS
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Remaining label */}
      {remaining > 0 && !isFlipping && !isAnimating && (
        <p className="text-center text-xs font-body text-white/60 uppercase tracking-widest pb-2">
          {remaining} card{remaining !== 1 ? "s" : ""} remaining
        </p>
      )}

      {/* ── NEXT CARD button ── */}
      <div className="px-4 pt-1 pb-6 relative flex flex-col gap-2">
        <motion.div
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.01 }}
          animate={flashPress ? { scale: [1, 0.97, 1.02, 1] } : {}}
          transition={{ duration: 0.25 }}
        >
          <Button
            className={cn(
              "w-full font-display font-black text-xl tracking-[0.15em] rounded-2xl uppercase transition-all duration-200",
              "h-14 shadow-[0_0_40px_oklch(0.68_0.25_180/0.35),0_4px_20px_oklch(0_0_0/0.4)]",
              !isDisabled &&
                "hover:shadow-[0_0_60px_oklch(0.68_0.25_180/0.55),0_6px_24px_oklch(0_0_0/0.45)]",
            )}
            onClick={handleNext}
            disabled={isDisabled}
            data-ocid="workout-session.next_card_button"
          >
            {isWorkoutDone ? (
              <span className="flex items-center gap-2">
                FINISH WORKOUT
                <ChevronRight className="w-5 h-5" />
              </span>
            ) : (
              <span className="flex items-center gap-2">
                NEXT CARD
                <ChevronRight className="w-5 h-5" />
              </span>
            )}
          </Button>
        </motion.div>

        {/* ── BACK button ── */}
        <motion.div whileTap={{ scale: 0.96 }} transition={{ duration: 0.2 }}>
          <Button
            type="button"
            variant="ghost"
            className={cn(
              "w-full h-10 rounded-xl font-display font-bold text-sm tracking-[0.1em] uppercase transition-all duration-200",
              "border border-border/30 bg-card/40",
              cardHistoryLength === 0 || isDisabled
                ? "opacity-30 cursor-not-allowed"
                : "hover:bg-card/70 hover:border-border/60 text-white/70 hover:text-white",
            )}
            onClick={() => {
              if (cardHistoryLength === 0 || isDisabled) return;
              if (navigator.vibrate) navigator.vibrate(30);
              goBackCard();
            }}
            disabled={cardHistoryLength === 0 || isDisabled}
            data-ocid="workout-session.back_card_button"
          >
            <span className="flex items-center gap-1.5">
              <ArrowLeft className="w-4 h-4" />
              PREVIOUS CARD
            </span>
          </Button>
        </motion.div>
      </div>

      {/* Screen flash overlay — triggered at card flip start for special cards */}
      {screenFlash.active && screenFlash.type && (
        <div
          className={`fixed inset-0 z-[100] pointer-events-none ${
            screenFlash.type === "gold"
              ? "screen-flash-gold-anim"
              : screenFlash.type === "blue"
                ? "screen-flash-blue-anim"
                : "screen-flash-teal-anim"
          }`}
          style={{
            background:
              screenFlash.type === "gold"
                ? "oklch(0.76 0.22 60)"
                : screenFlash.type === "blue"
                  ? "oklch(0.55 0.18 250)"
                  : "oklch(0.68 0.25 180)",
          }}
          aria-hidden="true"
        />
      )}

      <JokerOverlay
        active={jokerActive}
        challenge={jokerChallenge}
        onDismiss={dismissJoker}
      />
      <ModifierOverlay
        type={modifierOverlay.type}
        visible={modifierOverlay.visible}
        exerciseName={exerciseName}
        finalReps={repCount}
        onDismiss={() => setModifierOverlay({ visible: false, type: null })}
      />

      {/* ── Pause Modal ── */}
      <AnimatePresence>
        {isPaused && (
          <>
            <motion.div
              key="pause-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="fixed inset-0 z-50"
              style={{ background: "oklch(0 0 0 / 0.8)" }}
              aria-hidden="true"
            />
            <motion.div
              key="pause-modal"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-0 bottom-0 z-50 max-w-[430px] mx-auto rounded-t-3xl overflow-hidden"
              style={{
                background: "oklch(0.14 0.012 260)",
                border: "1px solid oklch(0.26 0.01 260 / 0.6)",
                borderBottom: "none",
                boxShadow: "0 -16px 60px oklch(0 0 0 / 0.55)",
              }}
              data-ocid="workout-session.pause_dialog"
            >
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div
                  className="w-9 h-1 rounded-full"
                  style={{ background: "oklch(0.36 0.01 260 / 0.7)" }}
                />
              </div>

              {/* Title */}
              <div className="flex items-center justify-between px-6 pt-2 pb-4">
                <div>
                  <p
                    className="text-[10px] font-display font-bold tracking-[0.22em] uppercase mb-0.5"
                    style={{ color: "oklch(0.68 0.25 180)" }}
                  >
                    Paused
                  </p>
                  <h2 className="font-display font-black text-xl text-foreground tracking-tight">
                    Workout Summary
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPaused(false)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-smooth text-white/70 hover:text-white"
                  style={{
                    background: "oklch(0.20 0.01 260)",
                    border: "1px solid oklch(0.30 0.01 260 / 0.5)",
                  }}
                  aria-label="Close pause menu"
                  data-ocid="workout-session.pause_close_button"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Divider */}
              <div
                className="mx-6 h-px mb-5"
                style={{ background: "oklch(0.26 0.01 260 / 0.5)" }}
              />

              {/* Stats grid */}
              <div className="px-6 grid grid-cols-2 gap-3 mb-5">
                {/* Time */}
                <div
                  className="rounded-2xl p-4"
                  style={{
                    background: "oklch(0.16 0.01 260)",
                    border: "1px solid oklch(0.26 0.01 260 / 0.5)",
                  }}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <Clock className="w-3.5 h-3.5 text-white/60" />
                    <span className="text-[10px] font-body uppercase tracking-wider text-white/70">
                      Elapsed
                    </span>
                  </div>
                  <p className="font-display font-black text-2xl text-foreground tabular-nums">
                    {formatted}
                  </p>
                </div>
                {/* Cards */}
                <div
                  className="rounded-2xl p-4"
                  style={{
                    background: "oklch(0.17 0.015 180 / 0.4)",
                    border: "1px solid oklch(0.68 0.25 180 / 0.35)",
                    boxShadow: "0 0 20px oklch(0.68 0.25 180 / 0.12)",
                  }}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <CheckCircle2
                      className="w-3.5 h-3.5"
                      style={{ color: "oklch(0.68 0.25 180)" }}
                    />
                    <span className="text-[10px] font-body uppercase tracking-wider text-white/70">
                      Progress
                    </span>
                  </div>
                  <p className="font-display font-black text-2xl text-foreground tabular-nums">
                    {current}
                    <span className="text-white/50 text-base">/{total}</span>
                  </p>
                </div>
                {/* Remaining */}
                <div
                  className="rounded-2xl p-4"
                  style={{
                    background: "oklch(0.16 0.01 260)",
                    border: "1px solid oklch(0.26 0.01 260 / 0.5)",
                  }}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <ArrowLeft className="w-3.5 h-3.5 text-white/60" />
                    <span className="text-[10px] font-body uppercase tracking-wider text-white/70">
                      Remaining
                    </span>
                  </div>
                  <p className="font-display font-black text-2xl text-foreground tabular-nums">
                    {remaining}
                  </p>
                </div>
                {/* Calories */}
                <div
                  className="rounded-2xl p-4"
                  style={{
                    background: "oklch(0.16 0.01 260)",
                    border: "1px solid oklch(0.26 0.01 260 / 0.5)",
                  }}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <Flame className="w-3.5 h-3.5 text-orange-400" />
                    <span className="text-[10px] font-body uppercase tracking-wider text-white/70">
                      Calories
                    </span>
                  </div>
                  <p className="font-display font-black text-2xl text-foreground tabular-nums">
                    {calories}
                  </p>
                </div>
              </div>

              {/* Per-exercise breakdown */}
              <PauseExerciseBreakdown />

              {/* Action buttons */}
              <div className="px-6 pb-10 flex flex-col gap-3">
                <Button
                  className="w-full h-12 font-display font-black text-base tracking-[0.12em] rounded-2xl"
                  style={{ boxShadow: "0 0 28px oklch(0.68 0.25 180 / 0.3)" }}
                  onClick={() => setIsPaused(false)}
                  data-ocid="workout-session.pause_resume_button"
                >
                  <Play className="w-4 h-4 mr-2" />
                  RESUME WORKOUT
                </Button>
                <Button
                  variant="ghost"
                  className="w-full h-11 rounded-2xl font-display font-bold text-sm border border-destructive/30 text-destructive hover:bg-destructive/10 hover:border-destructive/50 transition-smooth"
                  onClick={() => {
                    setIsPaused(false);
                    handleQuit();
                  }}
                  data-ocid="workout-session.pause_end_button"
                >
                  End Workout
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
