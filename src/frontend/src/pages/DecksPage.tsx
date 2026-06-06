import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";
import { useDecks } from "@/hooks/use-decks";
import { useWorkoutStore } from "@/store/workout";
import type { Deck } from "@/types/workout";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Lock, Sparkles, Trophy, X, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const SUIT_ICONS = [
  { symbol: "♥", label: "Push Ups", color: "text-red-400" },
  { symbol: "♠", label: "Pull Ups", color: "text-foreground" },
  { symbol: "♦", label: "Rows", color: "text-red-400" },
  { symbol: "♣", label: "Dips", color: "text-foreground" },
];

const COMING_SOON = [
  {
    name: "Lower Body Deck",
    sub: "Squats · Lunges · Pistols",
    icon: "🦵",
    thumb: "/assets/cards/push-normal-6.png",
  },
  {
    name: "Core Deck",
    sub: "Planks · L-Sits · Hollow Body",
    icon: "🔥",
    thumb: "/assets/cards/push-diamond-2.png",
  },
  {
    name: "Full Body Deck",
    sub: "Complete Circuit · 52 Moves",
    icon: "⚡",
    thumb: "/assets/cards/push-wide-7.png",
  },
];

// Locked decks shown for non-subscriber tiers
const LOCKED_DECKS = [
  {
    id: "locked-advanced-upper",
    name: "Upper Body Advanced",
    sub: "Muscle Ups · Archer Push Ups · L-Sit",
    thumb: "/assets/exercises/backside_of_card.png",
    level: "Advanced",
  },
  {
    id: "locked-pro-upper",
    name: "Upper Body Pro",
    sub: "One-Arm Push Ups · Planche · Front Lever",
    thumb: "/assets/exercises/backside_of_card.png",
    level: "Pro",
  },
];

export default function DecksPage() {
  const navigate = useNavigate();
  const { data: decks, isLoading } = useDecks();
  const { selectedDeck, setSelectedDeck } = useWorkoutStore();
  const { userTier } = useAuth();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const handleSelect = (deck: Deck) => {
    if (!deck.isAvailable) return;
    setSelectedDeck(deck);
  };

  const handleLockedDeckTap = () => {
    setShowUpgradeModal(true);
  };

  const handleUpgradeCTA = () => {
    toast("Coming Soon", {
      description: "Subscription plans will be available soon. Stay tuned!",
      duration: 4000,
    });
    setShowUpgradeModal(false);
  };

  const fallbackDecks: Deck[] = [
    {
      id: BigInt(1),
      name: "Upper Body Deck",
      description: "Push Ups · Pull Ups · Rows · Dips",
      isAvailable: true,
      cardCount: BigInt(52),
    },
  ];

  const displayDecks = decks && decks.length > 0 ? decks : fallbackDecks;
  // Guests can access everything in the available decks; registered/subscriber differ only on locked decks
  const showLockedSection = userTier === "guest" || userTier === "registered";

  return (
    <div
      className="min-h-dvh bg-background flex flex-col max-w-[430px] mx-auto"
      data-ocid="decks.page"
    >
      {/* Ambient gradient */}
      <div
        className="pointer-events-none fixed inset-0 max-w-[430px] mx-auto"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 50% 0%, oklch(0.22 0.04 180 / 0.18) 0%, transparent 65%)",
        }}
      />

      {/* Header */}
      <header className="relative flex items-center gap-3 px-5 pt-12 pb-5">
        <motion.button
          type="button"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => navigate({ to: "/home" })}
          className="w-10 h-10 rounded-xl bg-card border border-border/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/45 transition-smooth"
          data-ocid="decks.back_button"
        >
          <ArrowLeft className="w-4 h-4" />
        </motion.button>
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex-1"
        >
          <h1 className="font-display font-black text-xl text-foreground tracking-tight">
            Select Deck
          </h1>
          <p className="text-xs text-muted-foreground font-body">
            Choose your workout deck
          </p>
        </motion.div>
        <Logo size="sm" iconOnly className="opacity-70" />
      </header>

      {/* Available decks section */}
      <div className="px-5">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-2 mb-3"
        >
          <Zap
            className="w-3.5 h-3.5"
            style={{ color: "oklch(0.68 0.25 180)" }}
          />
          <h2 className="font-display font-bold text-sm text-foreground uppercase tracking-widest">
            Available Decks
          </h2>
          <div
            className="h-px flex-1"
            style={{
              background:
                "linear-gradient(to right, oklch(0.68 0.25 180 / 0.3), transparent)",
            }}
          />
        </motion.div>

        {isLoading ? (
          <div className="flex flex-col gap-3" data-ocid="decks.loading_state">
            {[0, 1].map((i) => (
              <Skeleton key={i} className="w-full h-28 rounded-3xl" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {displayDecks.map((deck, i) => (
              <UpperBodyDeckCard
                key={String(deck.id)}
                deck={deck}
                index={i}
                selected={selectedDeck?.id === deck.id}
                onSelect={() => handleSelect(deck)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Locked decks section */}
      {showLockedSection && (
        <div className="px-5 mt-8 mb-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="flex items-center gap-2 mb-4"
          >
            <Lock
              className="w-3.5 h-3.5"
              style={{ color: "oklch(0.75 0.18 60)" }}
            />
            <h2 className="font-display font-bold text-sm text-foreground uppercase tracking-widest">
              Subscriber Decks
            </h2>
            <div
              className="h-px flex-1"
              style={{
                background:
                  "linear-gradient(to right, oklch(0.75 0.18 60 / 0.3), transparent)",
              }}
            />
          </motion.div>

          <div className="flex flex-col gap-3">
            {LOCKED_DECKS.map(({ id, name, sub, thumb, level }, i) => (
              <LockedDeckCard
                key={id}
                name={name}
                sub={sub}
                thumb={thumb}
                level={level}
                index={i}
                onTap={handleLockedDeckTap}
              />
            ))}
          </div>
        </div>
      )}

      {/* Coming soon section */}
      <div className="px-5 mt-8 mb-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="flex items-center gap-2 mb-4"
        >
          <Sparkles
            className="w-3.5 h-3.5"
            style={{ color: "oklch(0.68 0.25 180)" }}
          />
          <h2 className="font-display font-bold text-sm text-foreground uppercase tracking-widest">
            Coming Soon
          </h2>
          <div
            className="h-px flex-1"
            style={{
              background:
                "linear-gradient(to right, oklch(0.68 0.25 180 / 0.3), transparent)",
            }}
          />
        </motion.div>

        <div className="flex flex-col gap-2.5">
          {COMING_SOON.map(({ name, sub, thumb }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.07 }}
              className="flex items-center gap-3 rounded-2xl border px-4 py-3.5 cursor-not-allowed"
              style={{
                background: "oklch(0.15 0.008 260 / 0.7)",
                border: "1px solid oklch(0.24 0.01 260 / 0.4)",
              }}
              data-ocid={`decks.coming_soon.item.${i + 1}`}
            >
              <div className="w-10 h-12 rounded-xl overflow-hidden shrink-0 opacity-40">
                <img
                  src={thumb}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0 opacity-50">
                <p className="font-display font-bold text-sm text-foreground truncate">
                  {name}
                </p>
                <p className="text-xs text-muted-foreground font-body">{sub}</p>
              </div>
              <span
                className="text-[10px] font-display font-bold px-2.5 py-1 rounded-full shrink-0"
                style={{
                  background: "oklch(0.22 0.01 260 / 0.6)",
                  color: "oklch(0.55 0.008 260)",
                }}
              >
                SOON
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-5 pb-10 pt-4 mt-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Button
            className="w-full h-14 font-display font-black text-lg tracking-[0.12em] rounded-2xl disabled:opacity-30 disabled:shadow-none"
            style={{
              boxShadow: selectedDeck
                ? "0 0 36px oklch(0.68 0.25 180 / 0.3), 0 4px 20px oklch(0 0 0 / 0.3)"
                : "none",
            }}
            disabled={!selectedDeck}
            onClick={() => selectedDeck && navigate({ to: "/workout/setup" })}
            data-ocid="decks.continue_button"
          >
            <Zap className="w-5 h-5 mr-2" />
            CONTINUE
          </Button>
          {!selectedDeck && (
            <p className="text-center text-xs text-muted-foreground font-body mt-3">
              Select a deck above to continue
            </p>
          )}
        </motion.div>
      </div>

      {/* Upgrade to Subscriber Modal */}
      <AnimatePresence>
        {showUpgradeModal && (
          <UpgradeModal
            onClose={() => setShowUpgradeModal(false)}
            onUpgrade={handleUpgradeCTA}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Locked deck card with overlay
function LockedDeckCard({
  name,
  sub,
  thumb,
  level,
  index,
  onTap,
}: {
  name: string;
  sub: string;
  thumb: string;
  level: string;
  index: number;
  onTap: () => void;
}) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.28 + index * 0.08,
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileTap={{ scale: 0.97 }}
      onClick={onTap}
      className="w-full text-left rounded-3xl border transition-smooth relative overflow-hidden"
      style={{
        background: "oklch(0.16 0.01 260)",
        borderColor: "oklch(0.75 0.18 60 / 0.25)",
        boxShadow: "0 4px 20px oklch(0 0 0 / 0.3)",
      }}
      data-ocid={`decks.locked.item.${index + 1}`}
    >
      {/* Gold "Subscriber Only" badge */}
      <div
        className="absolute top-3 right-3 z-20 flex items-center gap-1 px-2.5 py-1 rounded-full"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.72 0.18 60), oklch(0.62 0.20 55))",
          boxShadow: "0 2px 8px oklch(0.72 0.18 60 / 0.35)",
        }}
      >
        <Lock
          className="w-2.5 h-2.5"
          style={{ color: "oklch(0.15 0.02 60)" }}
        />
        <span
          className="text-[9px] font-display font-black tracking-widest uppercase"
          style={{ color: "oklch(0.15 0.02 60)" }}
        >
          Subscriber Only
        </span>
      </div>

      {/* Dark overlay at 50% */}
      <div
        className="absolute inset-0 z-10 rounded-3xl pointer-events-none"
        style={{ background: "oklch(0.08 0.005 260 / 0.5)" }}
      />

      {/* Lock icon centered */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            background: "oklch(0.75 0.18 60 / 0.15)",
            border: "1px solid oklch(0.75 0.18 60 / 0.3)",
          }}
        >
          <Lock className="w-5 h-5" style={{ color: "oklch(0.75 0.18 60)" }} />
        </div>
      </div>

      <div className="relative flex gap-4 p-5">
        {/* Card thumbnail */}
        <div
          className="w-20 h-24 rounded-2xl overflow-hidden flex-shrink-0"
          style={{ border: "1px solid oklch(0.28 0.01 260 / 0.5)" }}
        >
          <img src={thumb} alt={name} className="w-full h-full object-cover" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 flex flex-col gap-2 justify-center">
          <div>
            <h3 className="font-display font-black text-lg text-foreground leading-tight">
              {name}
            </h3>
            <p className="text-xs text-muted-foreground font-body mt-0.5">
              {sub}
            </p>
          </div>
          <span
            className="text-[10px] font-display font-bold px-2.5 py-1 rounded-full w-fit"
            style={{
              background: "oklch(0.22 0.03 60 / 0.5)",
              color: "oklch(0.72 0.18 60)",
              border: "1px solid oklch(0.72 0.18 60 / 0.3)",
            }}
          >
            {level.toUpperCase()}
          </span>
        </div>
      </div>
    </motion.button>
  );
}

// Upgrade modal
function UpgradeModal({
  onClose,
  onUpgrade,
}: {
  onClose: () => void;
  onUpgrade: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center px-4 pb-6"
      style={{ background: "oklch(0 0 0 / 0.75)" }}
      onClick={onClose}
      data-ocid="decks.upgrade.dialog"
    >
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.42 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[420px] rounded-3xl overflow-hidden"
        style={{
          background: "oklch(0.14 0.012 260)",
          border: "1px solid oklch(0.75 0.18 60 / 0.25)",
          boxShadow:
            "0 -4px 60px oklch(0.75 0.18 60 / 0.12), 0 20px 60px oklch(0 0 0 / 0.6)",
        }}
      >
        {/* Gold accent bar at top */}
        <div
          className="h-1 w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.72 0.18 60), oklch(0.68 0.25 180), transparent)",
          }}
        />

        <div className="px-6 pt-6 pb-7">
          {/* Header row */}
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.72 0.18 60 / 0.2), oklch(0.62 0.20 55 / 0.1))",
                  border: "1px solid oklch(0.72 0.18 60 / 0.4)",
                }}
              >
                <Lock
                  className="w-5 h-5"
                  style={{ color: "oklch(0.75 0.18 60)" }}
                />
              </div>
              <h2 className="font-display font-black text-xl text-foreground tracking-tight">
                Unlock All Decks
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              style={{ background: "oklch(0.20 0.008 260)" }}
              data-ocid="decks.upgrade.close_button"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body text */}
          <p className="text-sm text-muted-foreground font-body leading-relaxed mb-6">
            Upgrade to Subscriber to access Advanced and Pro level decks, full
            workout history, and streak tracking.
          </p>

          {/* Perks list */}
          <div className="flex flex-col gap-2 mb-7">
            {[
              "All Advanced & Pro decks",
              "Full workout history",
              "Streak tracking",
              "Priority access to new decks",
            ].map((perk) => (
              <div key={perk} className="flex items-center gap-2.5">
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "oklch(0.68 0.25 180 / 0.2)" }}
                >
                  <Sparkles
                    className="w-2.5 h-2.5"
                    style={{ color: "oklch(0.68 0.25 180)" }}
                  />
                </div>
                <span className="text-sm text-foreground font-body">
                  {perk}
                </span>
              </div>
            ))}
          </div>

          {/* CTA button */}
          <button
            type="button"
            onClick={onUpgrade}
            className="w-full h-14 rounded-2xl font-display font-black text-base tracking-[0.1em] transition-smooth mb-3"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.72 0.18 60), oklch(0.62 0.20 55))",
              color: "oklch(0.10 0.01 60)",
              boxShadow:
                "0 0 36px oklch(0.72 0.18 60 / 0.35), 0 4px 20px oklch(0 0 0 / 0.3)",
            }}
            data-ocid="decks.upgrade.confirm_button"
          >
            Upgrade to Subscriber
          </button>

          {/* Dismiss */}
          <button
            type="button"
            onClick={onClose}
            className="w-full h-10 rounded-xl font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="decks.upgrade.cancel_button"
          >
            Maybe Later
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Enhanced deck card for the Upper Body Deck
function UpperBodyDeckCard({
  deck,
  index,
  selected,
  onSelect,
}: {
  deck: Deck;
  index: number;
  selected: boolean;
  onSelect: () => void;
}) {
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
      whileTap={{ scale: 0.97 }}
      onClick={onSelect}
      disabled={!deck.isAvailable}
      className="w-full text-left rounded-3xl border transition-smooth relative overflow-hidden"
      style={{
        background: selected
          ? "oklch(0.17 0.015 180 / 0.6)"
          : "oklch(0.16 0.01 260)",
        borderColor: selected
          ? "oklch(0.68 0.25 180 / 0.65)"
          : "oklch(0.28 0.01 260 / 0.6)",
        boxShadow: selected
          ? "0 0 40px oklch(0.68 0.25 180 / 0.25), inset 0 1px 0 oklch(0.68 0.25 180 / 0.15)"
          : "0 4px 20px oklch(0 0 0 / 0.3)",
      }}
      data-ocid={`decks.item.${index + 1}`}
    >
      {/* Glow overlay when selected */}
      {selected && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 20% 50%, oklch(0.68 0.25 180 / 0.1) 0%, transparent 70%)",
          }}
        />
      )}

      <div className="relative flex gap-4 p-5">
        {/* Card thumbnail */}
        <div className="relative flex-shrink-0">
          <div
            className="w-20 h-24 rounded-2xl overflow-hidden"
            style={{
              border: selected
                ? "1px solid oklch(0.68 0.25 180 / 0.4)"
                : "1px solid oklch(0.28 0.01 260 / 0.5)",
              boxShadow: selected
                ? "0 4px 20px oklch(0.68 0.25 180 / 0.2)"
                : "none",
            }}
          >
            <img
              src="/assets/exercises/backside_of_card.png"
              alt="Upper Body Deck"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Trophy badge overlay */}
          <div
            className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full flex items-center justify-center"
            style={{
              background: selected
                ? "oklch(0.68 0.25 180)"
                : "oklch(0.22 0.01 260)",
              border: "2px solid oklch(0.12 0.008 260)",
            }}
          >
            <Trophy
              className="w-3 h-3"
              style={{
                color: selected
                  ? "oklch(0.12 0.008 260)"
                  : "oklch(0.55 0.008 260)",
              }}
            />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 flex flex-col gap-3">
          {/* Name + radio */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-display font-black text-lg text-foreground leading-tight">
                {deck.name}
              </h3>
              <p className="text-xs text-muted-foreground font-body mt-0.5">
                {Number(deck.cardCount)} cards · 4 muscle groups
              </p>
            </div>
            <div
              className="w-5 h-5 rounded-full border-2 shrink-0 mt-0.5 flex items-center justify-center transition-smooth"
              style={{
                borderColor: selected
                  ? "oklch(0.68 0.25 180)"
                  : "oklch(0.40 0.01 260)",
                background: selected ? "oklch(0.68 0.25 180)" : "transparent",
              }}
            >
              {selected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-2 h-2 rounded-full"
                  style={{ background: "oklch(0.12 0.008 260)" }}
                />
              )}
            </div>
          </div>

          {/* Suit icons row */}
          <div className="grid grid-cols-4 gap-1.5">
            {SUIT_ICONS.map(({ symbol, label, color }) => (
              <div
                key={label}
                className="rounded-xl py-1.5 px-1 flex flex-col items-center gap-0.5"
                style={{
                  background: selected
                    ? "oklch(0.12 0.008 260 / 0.5)"
                    : "oklch(0.22 0.01 260 / 0.5)",
                }}
              >
                <span
                  className={`text-base leading-none font-display ${selected ? color : "text-muted-foreground"}`}
                >
                  {symbol}
                </span>
                <span className="text-[9px] text-muted-foreground font-body leading-tight text-center">
                  {label.split(" ")[0]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.button>
  );
}
