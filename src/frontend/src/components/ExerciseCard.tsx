import type React from "react";
import { useEffect, useRef, useState } from "react";
import {
  SUIT_CONFIG,
  type SuitKey,
  resolveExerciseIllustration,
} from "../data/exerciseAssets";

interface CardData {
  suit: string;
  rank: string;
  exercise: string;
  id?: string | bigint;
  videoUrl?: string;
}

interface SessionCardLocal {
  card: CardData;
  reps: number | bigint;
  isMod?: boolean;
}

interface ExerciseCardProps {
  sessionCard: SessionCardLocal;
  previousCard?: SessionCardLocal | null;
  isRevealed?: boolean;
  onReveal?: () => void;
  className?: string;
}

function toNum(v: number | bigint | undefined | null): number {
  if (v == null) return 0;
  return typeof v === "bigint" ? Number(v) : v;
}

function getDisplayReps(
  sessionCard: SessionCardLocal,
  previousCard?: SessionCardLocal | null,
): number {
  const rank = sessionCard.card.rank;
  if (rank === "Ace") {
    const prev = toNum(previousCard?.reps);
    return prev > 0 ? prev * 2 : 2;
  }
  if (rank === "King") {
    const prev = toNum(previousCard?.reps);
    return Math.max(1, Math.ceil(prev > 0 ? prev / 2 : 1));
  }
  return toNum(sessionCard.reps);
}

function getDisplayExercise(
  sessionCard: SessionCardLocal,
  previousCard?: SessionCardLocal | null,
): { name: string; illustration: string } {
  const rank = sessionCard.card.rank;
  if ((rank === "Ace" || rank === "King") && previousCard) {
    const name = previousCard.card.exercise || "";
    return { name, illustration: resolveExerciseIllustration(name) };
  }
  const name = sessionCard.card.exercise || "";
  return { name, illustration: resolveExerciseIllustration(name) };
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  sessionCard,
  previousCard,
  isRevealed = true,
  onReveal,
  className = "",
}) => {
  const [showFront, setShowFront] = useState(isRevealed);
  const [flipPhase, setFlipPhase] = useState<
    "idle" | "windup" | "flipping" | "landed"
  >(isRevealed ? "landed" : "idle");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  const rank = sessionCard.card.rank || "";
  const isAce = rank === "Ace";
  const isKing = rank === "King";
  const isJoker = rank === "Joker" || sessionCard.card.suit === "Joker";
  const isSpecial = isAce || isKing || isJoker;

  useEffect(() => {
    if (isRevealed && !showFront) {
      // Phase 1: Wind-up (80ms)
      setFlipPhase("windup");
      const windupTimer = setTimeout(() => {
        // Phase 2: Flip
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

  const suit = sessionCard.card.suit as SuitKey;

  const suitCfg = isJoker
    ? SUIT_CONFIG.Joker
    : (SUIT_CONFIG[suit] ?? SUIT_CONFIG.Hearts);

  const reps = getDisplayReps(sessionCard, previousCard);
  const exercise = getDisplayExercise(sessionCard, previousCard);
  const displayValue = isAce ? "A" : isKing ? "K" : isJoker ? "\u2605" : rank;

  // Build animation classes based on flip phase and card type
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

  const cardWrapper: React.CSSProperties = {
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
    willChange: flipPhase !== "idle" ? "transform" : "auto",
  };

  if (!showFront) {
    return (
      <button
        type="button"
        ref={buttonRef}
        className={`${className} ${getFlipAnimationClass()}`}
        style={{
          ...cardWrapper,
          cursor: "pointer",
          background: "oklch(0.10 0.015 260)",
          border: "none",
          padding: 0,
        }}
        onClick={onReveal}
        data-ocid="exercise-card"
      >
        <img
          src="/assets/exercises/backside_of_card.png"
          alt="Card back"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "16px",
          }}
          onError={(e) => {
            const el = e.currentTarget;
            el.style.display = "none";
            const p = el.parentElement;
            if (p)
              p.style.background =
                "linear-gradient(160deg, oklch(0.10 0.015 260) 0%, oklch(0.14 0.02 260) 100%)";
          }}
        />
      </button>
    );
  }

  if (isJoker) {
    const exerciseName = sessionCard.card.exercise || "";
    const isDeadHang =
      exerciseName.toLowerCase().includes("dead") ||
      exerciseName.toLowerCase().includes("hang");
    const challengeLabel = isDeadHang
      ? "DEAD HANG"
      : reps === 45
        ? "45s PLANK"
        : "30s PLANK";
    const illustration = resolveExerciseIllustration(exerciseName || "plank");
    const jokerAccent = "oklch(0.68 0.25 180)";

    return (
      <div
        ref={divRef}
        className={`${className} ${getFlipAnimationClass()}`}
        style={{
          ...cardWrapper,
          background:
            "linear-gradient(160deg, oklch(0.08 0.02 260) 0%, oklch(0.10 0.025 255) 50%, oklch(0.08 0.025 255) 100%)",
          border: `1.5px solid ${jokerAccent.replace(")", " / 0.5)").replace("oklch(", "oklch(")}`,
          boxShadow:
            "0 0 40px oklch(0.68 0.25 180 / 0.4), 0 0 80px oklch(0.68 0.25 180 / 0.15), 0 8px 32px oklch(0 0 0 / 0.8)",
        }}
        data-ocid="exercise-card"
      >
        {/* Joker expanding ring */}
        {flipPhase === "landed" && (
          <div
            className="joker-ring-anim"
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
              zIndex: 20,
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                border: `2px solid ${jokerAccent}`,
              }}
            />
          </div>
        )}
        <div
          style={{
            padding: "12px 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: "26px",
              fontWeight: "900",
              color: jokerAccent,
              textShadow: "0 0 12px oklch(0.68 0.25 180 / 0.9)",
            }}
          >
            {"\u2605"}
          </span>
          <span
            style={{
              fontSize: "9px",
              letterSpacing: "3px",
              color: jokerAccent,
              fontWeight: "700",
              textTransform: "uppercase",
            }}
          >
            WILD CARD
          </span>
          <span
            style={{
              fontSize: "26px",
              fontWeight: "900",
              color: jokerAccent,
              textShadow: "0 0 12px oklch(0.68 0.25 180 / 0.9)",
            }}
          >
            {"★"}
          </span>
        </div>
        <div style={{ textAlign: "center", marginBottom: "6px" }}>
          <span
            style={{
              fontSize: "28px",
              fontWeight: "900",
              letterSpacing: "6px",
              color: jokerAccent,
              textShadow: "0 0 20px oklch(0.68 0.25 180 / 0.9)",
            }}
          >
            JOKER
          </span>
        </div>
        <div
          style={{
            margin: "0 16px",
            borderRadius: "10px",
            overflow: "hidden",
            background: "oklch(0.68 0.25 180 / 0.04)",
            border: "1px solid oklch(0.68 0.25 180 / 0.2)",
            flex: 1,
            minHeight: 0,
          }}
        >
          <img
            src={illustration}
            alt="Challenge"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              padding: "8px",
            }}
          />
        </div>
        <div
          style={{
            background: "oklch(0.08 0.005 260)",
            padding: "12px 16px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              fontWeight: "900",
              color: jokerAccent,
              textShadow: "0 0 16px oklch(0.68 0.25 180 / 0.8)",
              letterSpacing: "2px",
              marginBottom: "2px",
            }}
          >
            {challengeLabel}
          </div>
          <div
            style={{
              fontSize: "10px",
              color: "oklch(0.68 0.25 180 / 0.6)",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            CHALLENGE
          </div>
        </div>
      </div>
    );
  }

  const accentColor = isAce
    ? "oklch(0.76 0.22 60)"
    : isKing
      ? "oklch(0.78 0.04 240)"
      : suitCfg.accent;
  const glowColor = isAce
    ? "oklch(0.76 0.22 60 / 0.4)"
    : isKing
      ? "oklch(0.78 0.04 240 / 0.3)"
      : suitCfg.glowColor;

  return (
    <div
      ref={divRef}
      className={`${className} ${getFlipAnimationClass()}`}
      style={{
        ...cardWrapper,
        background: `linear-gradient(160deg, ${suitCfg.gradientFrom} 0%, ${suitCfg.gradientTo} 100%)`,
        border: `1.5px solid ${accentColor.replace(")", " / 0.27)").replace("oklch(", "oklch(")}`,
        boxShadow: `0 0 24px ${glowColor}, 0 8px 32px oklch(0 0 0 / 0.7), inset 0 1px 0 oklch(1 0 0 / 0.04)`,
      }}
      data-ocid="exercise-card"
    >
      {/* Shimmer sweep overlay on reveal */}
      {flipPhase === "landed" && <div className="card-shimmer-overlay" />}
      {isAce && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center 30%, oklch(0.76 0.22 60 / 0.12) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      )}
      {isKing && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center 30%, oklch(0.78 0.04 240 / 0.08) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      )}

      {/* Corner rank + suit */}
      <div
        style={{
          padding: "10px 12px 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div>
          <div
            style={{
              fontSize: isSpecial ? "28px" : "22px",
              fontWeight: "900",
              color: accentColor,
              textShadow: `0 0 10px ${glowColor}`,
              lineHeight: 1,
            }}
          >
            {displayValue}
          </div>
          <div
            style={{
              fontSize: "16px",
              color: accentColor,
              lineHeight: 1,
              marginTop: "1px",
            }}
          >
            {suitCfg.symbol}
          </div>
        </div>
        <img
          src="/assets/images/mbw-logo-white-icon.png"
          alt="MBW"
          style={{
            width: "24px",
            height: "24px",
            objectFit: "contain",
            opacity: 0.6,
          }}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </div>

      {/* Exercise illustration — beige/cream card body per original design */}
      <div
        style={{
          flex: 1,
          margin: "6px 12px",
          borderRadius: "8px",
          overflow: "hidden",
          background:
            "radial-gradient(ellipse at 50% 40%, oklch(0.99 0.005 70) 0%, oklch(0.97 0.008 70) 60%, oklch(0.95 0.012 70) 100%)",
          border: `1px solid ${accentColor.replace(")", " / 0.13)").replace("oklch(", "oklch(")}`,
          boxShadow:
            "inset 0 2px 8px oklch(0 0 0 / 0.08), inset 0 0 0 1px oklch(1 0 0 / 0.6)",
          position: "relative",
          zIndex: 1,
          minHeight: 0,
        }}
      >
        <img
          src={exercise.illustration}
          alt={exercise.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            padding: "6px",
          }}
        />
      </div>

      {/* Bottom strip — original black strip design with white typography */}
      <div
        style={{
          background: "var(--card-black, oklch(0.08 0.005 260))",
          padding: "8px 12px 10px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {isAce && (
          <div
            style={{
              fontSize: "9px",
              letterSpacing: "2px",
              color: "oklch(0.76 0.22 60)",
              fontWeight: "700",
              background: "oklch(0.76 0.22 60 / 0.12)",
              border: "1px solid oklch(0.76 0.22 60 / 0.3)",
              borderRadius: "3px",
              display: "inline-block",
              padding: "2px 6px",
              marginBottom: "3px",
            }}
          >
            ACE — DOUBLE REPS
          </div>
        )}
        {isKing && (
          <div
            style={{
              fontSize: "9px",
              letterSpacing: "2px",
              color: "oklch(0.78 0.04 240)",
              fontWeight: "700",
              background: "oklch(0.78 0.04 240 / 0.08)",
              border: "1px solid oklch(0.78 0.04 240 / 0.25)",
              borderRadius: "3px",
              display: "inline-block",
              padding: "2px 6px",
              marginBottom: "3px",
            }}
          >
            KING — HALF REPS
          </div>
        )}
        <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
          {(isAce || isKing) && (
            <span
              style={{
                fontSize: "16px",
                fontWeight: "700",
                color: isAce
                  ? "oklch(0.76 0.22 60 / 0.8)"
                  : "oklch(0.78 0.04 240 / 0.8)",
              }}
            >
              {isAce ? "\u00d72" : "\u00f72"}
            </span>
          )}
          <span
            style={{
              fontSize: "42px",
              fontWeight: "900",
              color: "oklch(0.97 0.005 260)",
              lineHeight: 1,
              textShadow: "0 2px 8px oklch(0 0 0 / 0.5)",
              letterSpacing: "-1px",
              fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)",
            }}
          >
            {reps}
          </span>
        </div>
        <div
          style={{
            fontSize: "11px",
            fontWeight: "700",
            color: "oklch(0.92 0.01 260)",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            lineHeight: 1.2,
            marginTop: "1px",
            fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)",
          }}
        >
          {exercise.name}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "3px",
            marginTop: "3px",
          }}
        >
          <span style={{ fontSize: "11px", color: suitCfg.accent }}>
            {suitCfg.symbol}
          </span>
          <span
            style={{
              fontSize: "9px",
              color: suitCfg.accent,
              letterSpacing: "1px",
              textTransform: "uppercase",
              opacity: 0.75,
            }}
          >
            {suitCfg.label}
          </span>
        </div>
      </div>

      {/* Bottom-right rotated corner rank — pinned above the strip */}
      <div
        style={{
          position: "absolute",
          bottom: "64px",
          right: "12px",
          textAlign: "right",
          transform: "rotate(180deg)",
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontSize: "16px",
            fontWeight: "900",
            color: accentColor,
            opacity: 0.5,
            lineHeight: 1,
          }}
        >
          {displayValue}
        </div>
        <div
          style={{
            fontSize: "11px",
            color: accentColor,
            opacity: 0.5,
            lineHeight: 1,
            marginTop: "1px",
          }}
        >
          {suitCfg.symbol}
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;
