import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Deck } from "@/types/workout";
import { ChevronRight, Lock } from "lucide-react";
import { motion } from "motion/react";

interface DeckCardProps {
  deck: Deck;
  selected?: boolean;
  onClick?: () => void;
  index?: number;
  className?: string;
  thumbnail?: string;
}

const SUIT_ICONS = [
  { symbol: "♥", label: "Push Ups" },
  { symbol: "♠", label: "Pull Ups" },
  { symbol: "♦", label: "Rows" },
  { symbol: "♣", label: "Dips" },
];

export function DeckCard({
  deck,
  selected,
  onClick,
  index = 0,
  className,
  thumbnail = "/assets/exercises/backside_of_card.png",
}: DeckCardProps) {
  const isLocked = !deck.isAvailable;

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.08,
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileTap={isLocked ? undefined : { scale: 0.97 }}
      onClick={onClick}
      disabled={isLocked}
      className={cn(
        "w-full text-left rounded-3xl border transition-smooth relative overflow-hidden",
        selected
          ? "border-primary/70 shadow-[0_0_36px_oklch(0.68_0.25_180/0.3),inset_0_1px_0_oklch(0.68_0.25_180/0.2)]"
          : isLocked
            ? "border-border/20 bg-card/30 cursor-not-allowed"
            : "border-border/50 bg-card hover:border-primary/45 hover:shadow-[0_0_20px_oklch(0.68_0.25_180/0.12)]",
        className,
      )}
      data-ocid={`deck-card.item.${index + 1}`}
    >
      {/* Selected glow overlay */}
      {selected && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 20% 50%, oklch(0.68 0.25 180 / 0.12) 0%, transparent 65%)",
          }}
        />
      )}

      <div className="relative flex gap-4 p-4">
        {/* Thumbnail */}
        <div
          className={cn(
            "relative w-20 h-24 rounded-2xl overflow-hidden shrink-0 border",
            selected ? "border-primary/40" : "border-border/30",
            isLocked && "opacity-40",
          )}
        >
          <img
            src={thumbnail}
            alt={deck.name}
            className="w-full h-full object-cover"
          />
          {isLocked && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm">
              <Lock className="w-5 h-5 text-muted-foreground" />
            </div>
          )}
        </div>

        {/* Info */}
        <div
          className={cn(
            "flex-1 min-w-0 flex flex-col gap-2",
            isLocked && "opacity-50",
          )}
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-display font-black text-base text-foreground leading-tight">
                {deck.name}
              </h3>
              <p className="text-xs text-muted-foreground font-body mt-0.5">
                {Number(deck.cardCount)} cards · 4 muscle groups
              </p>
            </div>
            {isLocked ? (
              <Badge
                variant="secondary"
                className="text-[10px] shrink-0 mt-0.5"
              >
                Soon
              </Badge>
            ) : selected ? (
              <div className="w-5 h-5 rounded-full bg-primary border-2 border-primary shrink-0 mt-0.5 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary-foreground" />
              </div>
            ) : (
              <div className="w-5 h-5 rounded-full border-2 border-border/50 shrink-0 mt-0.5" />
            )}
          </div>

          {/* Suit icons */}
          <div className="flex gap-1.5">
            {SUIT_ICONS.map(({ symbol, label }) => (
              <div
                key={label}
                className={cn(
                  "flex flex-col items-center gap-0.5 rounded-lg px-2 py-1.5 flex-1",
                  selected ? "bg-background/50" : "bg-muted/30",
                )}
              >
                <span
                  className={cn(
                    "text-sm leading-none font-display",
                    selected ? "text-primary" : "text-muted-foreground/70",
                  )}
                >
                  {symbol}
                </span>
                <span className="text-[8px] text-muted-foreground/60 font-body leading-tight text-center">
                  {label.split(" ")[0]}
                </span>
              </div>
            ))}
          </div>

          {!isLocked && (
            <p className="text-xs text-muted-foreground font-body line-clamp-1">
              {deck.description}
            </p>
          )}
        </div>

        {deck.isAvailable && (
          <ChevronRight
            className={cn(
              "self-center w-4 h-4 shrink-0 transition-smooth",
              selected ? "text-primary" : "text-muted-foreground/60",
            )}
          />
        )}
      </div>
    </motion.button>
  );
}
