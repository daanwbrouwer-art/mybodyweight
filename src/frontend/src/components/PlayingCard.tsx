import { cn } from "@/lib/utils";
import type { Card } from "@/types/workout";

interface PlayingCardProps {
  card?: Card | null;
  isFlipping?: boolean;
  showBack?: boolean;
  className?: string;
  compact?: boolean;
}

export function PlayingCard({
  isFlipping = false,
  showBack = false,
  className,
  compact = false,
}: PlayingCardProps) {
  const size = compact ? "w-full h-full" : "w-48 h-64";

  return (
    <div className={cn("card-flip", className)}>
      <div
        className={cn(
          "card-flip-inner relative",
          size,
          (isFlipping || showBack) && "flipped",
        )}
      >
        {/* Back face — premium MBW branded dark card back */}
        <div
          className={cn(
            "card-face absolute inset-0 rounded-3xl overflow-hidden",
            "border border-primary/25",
            "shadow-[0_0_40px_oklch(0.68_0.25_180/0.2),0_8px_40px_oklch(0_0_0/0.6)]",
          )}
          style={{
            background:
              "radial-gradient(ellipse at 50% 30%, oklch(0.22 0.035 180 / 0.4) 0%, oklch(0.14 0.01 260) 65%)",
          }}
        >
          {/* Card back image */}
          <img
            src="/assets/exercises/backside_of_card.png"
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
            alt=""
          />
          {/* Subtle grid lines */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, oklch(0.68 0.25 180) 0px, oklch(0.68 0.25 180) 1px, transparent 1px, transparent 24px), repeating-linear-gradient(90deg, oklch(0.68 0.25 180) 0px, oklch(0.68 0.25 180) 1px, transparent 1px, transparent 24px)",
            }}
          />

          {/* Diamond decorative border */}
          <div
            className="absolute inset-3 rounded-2xl border opacity-20"
            style={{ borderColor: "oklch(0.68 0.25 180)" }}
          />

          {/* Center MBW logo mark */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <div
              className={cn(
                "rounded-2xl border flex items-center justify-center",
                compact ? "w-10 h-10" : "w-16 h-16",
              )}
              style={{
                borderColor: "oklch(0.68 0.25 180 / 0.5)",
                background: "oklch(0.68 0.25 180 / 0.08)",
                boxShadow: "0 0 20px oklch(0.68 0.25 180 / 0.3)",
              }}
            >
              <span
                className={cn(
                  "font-display font-black tracking-tighter",
                  compact ? "text-sm" : "text-xl",
                )}
                style={{
                  color: "oklch(0.68 0.25 180)",
                  textShadow: "0 0 12px oklch(0.68 0.25 180 / 0.6)",
                }}
              >
                MBW
              </span>
            </div>
            {!compact && (
              <span className="text-xs font-body uppercase tracking-[0.25em] opacity-50 text-primary">
                MyBodyWeight
              </span>
            )}
          </div>

          {/* Corner accents */}
          {[
            "top-2 left-2",
            "top-2 right-2",
            "bottom-2 left-2",
            "bottom-2 right-2",
          ].map((pos) => (
            <div
              key={pos}
              className={cn("absolute w-3 h-3", pos)}
              style={{
                borderColor: "oklch(0.68 0.25 180 / 0.4)",
                borderWidth:
                  pos.includes("top") && pos.includes("left")
                    ? "2px 0 0 2px"
                    : pos.includes("top") && pos.includes("right")
                      ? "2px 2px 0 0"
                      : pos.includes("bottom") && pos.includes("left")
                        ? "0 0 2px 2px"
                        : "0 2px 2px 0",
              }}
            />
          ))}
        </div>

        {/* Front face (shown during shuffle preview — same back style) */}
        <div
          className="card-face back absolute inset-0 rounded-3xl overflow-hidden border border-primary/25"
          style={{
            background:
              "radial-gradient(ellipse at 50% 70%, oklch(0.22 0.035 180 / 0.4) 0%, oklch(0.14 0.01 260) 65%)",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className={cn(
                "font-display font-black tracking-tighter",
                compact ? "text-sm" : "text-2xl",
              )}
              style={{ color: "oklch(0.68 0.25 180 / 0.4)" }}
            >
              MBW
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
