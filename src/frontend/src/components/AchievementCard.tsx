import type { Achievement } from "@/types/achievements";
import { RARITY_CONFIG } from "@/types/achievements";
import { Lock } from "lucide-react";

interface AchievementCardProps {
  achievement: Achievement;
  isUnlocked: boolean;
  unlockedAt?: number;
}

export function AchievementCard({
  achievement,
  isUnlocked,
  unlockedAt,
}: AchievementCardProps) {
  const config = RARITY_CONFIG[achievement.rarity];

  return (
    <div
      className="relative rounded-2xl p-4 flex flex-col gap-2 transition-smooth"
      style={{
        background: isUnlocked
          ? "oklch(0.16 0.01 260)"
          : "oklch(0.13 0.008 260)",
        border: isUnlocked
          ? `1px solid ${config.glowColor}40`
          : "1px solid oklch(0.22 0.01 260 / 0.4)",
        opacity: isUnlocked ? 1 : 0.5,
        boxShadow: isUnlocked ? `0 0 20px ${config.glowColor}20` : "none",
      }}
      data-ocid={`achievement.card.${achievement.id}`}
    >
      {/* Lock overlay for locked */}
      {!isUnlocked && (
        <div className="absolute top-3 right-3">
          <Lock className="w-4 h-4 text-muted-foreground/50" />
        </div>
      )}

      {/* Rarity badge */}
      <span
        className="self-start text-[10px] font-display font-black uppercase tracking-wider px-2 py-0.5 rounded-full"
        style={{
          background: `${config.glowColor}18`,
          color: config.glowColor,
          border: `1px solid ${config.glowColor}30`,
        }}
      >
        {config.label}
      </span>

      {/* Name */}
      <h3 className="font-display font-bold text-sm text-foreground leading-tight">
        {achievement.name}
      </h3>

      {/* Description */}
      <p className="text-xs text-muted-foreground font-body leading-snug">
        {isUnlocked ? achievement.description : "???"}
      </p>

      {/* Unlock date */}
      {isUnlocked && unlockedAt && (
        <p className="text-[10px] text-muted-foreground/60 font-body mt-auto pt-1">
          Unlocked{" "}
          {new Date(unlockedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      )}
    </div>
  );
}
