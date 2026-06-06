import { AchievementCard } from "@/components/AchievementCard";
import { Logo } from "@/components/Logo";
import { useAchievements } from "@/hooks/use-achievements";
import { useWorkoutStore } from "@/store/workout";
import {
  ALL_ACHIEVEMENTS,
  type AchievementCategory,
  CATEGORY_META,
} from "@/types/achievements";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Trophy } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const CATEGORIES: (AchievementCategory | "all")[] = [
  "all",
  "card-draw",
  "special-cards",
  "reps",
  "streaks",
  "sessions",
];

export default function AchievementsPage() {
  const navigate = useNavigate();
  const { achievements, unlockedCount, totalCount, isLoading } =
    useAchievements();
  const guestMode = useWorkoutStore((s) => s.guestMode);
  const [activeCategory, setActiveCategory] = useState<
    AchievementCategory | "all"
  >("all");

  const filtered =
    activeCategory === "all"
      ? achievements
      : achievements.filter((a) => a.category === activeCategory);

  // Sort: unlocked first, then by rarity order
  const rarityOrder = {
    common: 0,
    uncommon: 1,
    rare: 2,
    epic: 3,
    legendary: 4,
  };
  const sorted = [...filtered].sort((a, b) => {
    const aUnlocked = a.unlockedAt !== undefined ? 1 : 0;
    const bUnlocked = b.unlockedAt !== undefined ? 1 : 0;
    if (aUnlocked !== bUnlocked) return bUnlocked - aUnlocked;
    return rarityOrder[a.rarity] - rarityOrder[b.rarity];
  });

  return (
    <div
      className="min-h-dvh bg-background flex flex-col max-w-[430px] mx-auto pb-24"
      data-ocid="achievements.page"
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none max-w-[430px] mx-auto"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 50% 0%, oklch(0.22 0.04 180 / 0.22) 0%, transparent 55%)",
        }}
      />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-5 pt-12 pb-4">
        <button
          type="button"
          className="w-9 h-9 rounded-xl bg-card/80 border border-border/60 flex items-center justify-center text-muted-foreground hover:border-primary/50 hover:text-primary transition-smooth"
          onClick={() => navigate({ to: "/home" })}
          data-ocid="achievements.back_button"
          aria-label="Go back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <Logo size="sm" showIcon />
        <div className="w-9" />
      </header>

      {/* Title + count */}
      <div className="relative z-10 px-5 pt-2 pb-5">
        <div className="flex items-center gap-3 mb-1">
          <Trophy className="w-6 h-6 text-primary" />
          <h1 className="font-display font-black text-2xl text-foreground">
            Achievements
          </h1>
        </div>
        <p className="text-sm text-muted-foreground font-body">
          {unlockedCount} / {totalCount} unlocked
        </p>
      </div>

      {/* Guest banner */}
      {guestMode && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 mx-5 mb-4 rounded-2xl px-4 py-3 flex items-center gap-3"
          style={{
            background: "oklch(0.17 0.015 180 / 0.25)",
            border: "1px solid oklch(0.68 0.25 180 / 0.3)",
          }}
        >
          <Trophy className="w-5 h-5 shrink-0 text-primary" />
          <p className="text-sm text-foreground font-body">
            Create an account to track your achievements across sessions.
          </p>
        </motion.div>
      )}

      {/* Category tabs */}
      <div className="relative z-10 px-5 mb-4">
        <div
          className="flex gap-2 overflow-x-auto pb-1"
          style={{ scrollbarWidth: "none" }}
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            const meta =
              cat === "all"
                ? { label: "All", emoji: "🏆" }
                : CATEGORY_META[cat];
            const catUnlocked =
              cat === "all"
                ? unlockedCount
                : achievements.filter(
                    (a) => a.category === cat && a.unlockedAt !== undefined,
                  ).length;
            const catTotal =
              cat === "all"
                ? totalCount
                : ALL_ACHIEVEMENTS.filter((a) => a.category === cat).length;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className="flex-shrink-0 rounded-xl px-3 py-2 flex items-center gap-1.5 transition-smooth"
                style={{
                  background: isActive
                    ? "oklch(0.68 0.25 180 / 0.15)"
                    : "oklch(0.16 0.01 260)",
                  border: isActive
                    ? "1px solid oklch(0.68 0.25 180 / 0.4)"
                    : "1px solid oklch(0.26 0.01 260 / 0.5)",
                  color: isActive
                    ? "oklch(0.68 0.25 180)"
                    : "oklch(0.78 0.008 260)",
                }}
                data-ocid={`achievements.filter.${cat}`}
              >
                <span className="text-sm">{meta.emoji}</span>
                <span className="font-display font-bold text-[11px] uppercase tracking-wider">
                  {meta.label}
                </span>
                <span className="text-[10px] font-body opacity-60">
                  {catUnlocked}/{catTotal}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="relative z-10 flex-1 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      )}

      {/* Achievement grid */}
      {!isLoading && (
        <div className="relative z-10 px-5">
          {/* Section header when filtering by category */}
          {activeCategory !== "all" && (
            <p className="font-display font-bold text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
              {CATEGORY_META[activeCategory].label} —{" "}
              {
                achievements.filter(
                  (a) =>
                    a.category === activeCategory && a.unlockedAt !== undefined,
                ).length
              }{" "}
              unlocked
            </p>
          )}

          <div className="grid grid-cols-2 gap-3">
            {sorted.map((achievement) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                isUnlocked={achievement.unlockedAt !== undefined}
                unlockedAt={achievement.unlockedAt}
              />
            ))}
          </div>

          {sorted.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground font-body text-sm">
                No achievements in this category.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
