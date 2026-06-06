import { BottomNav } from "@/components/BottomNav";
import { HowToPlayModal } from "@/components/HowToPlayModal";
import { useProfile } from "@/hooks/use-profile";
import { useWorkoutHistory } from "@/hooks/use-workout-history";
import { useNavigate } from "@tanstack/react-router";
import { Bell, ChevronRight, Lock, User, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const COMING_SOON_DECKS = [
  { id: "lower-body", label: "LOWER BODY" },
  { id: "core", label: "CORE" },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [howToPlayOpen, setHowToPlayOpen] = useState(false);
  const { data: profile } = useProfile();
  const { data: history } = useWorkoutHistory();

  const username = profile?.username ?? "Athlete";

  const workoutCount = history?.length ?? 0;
  const totalCards =
    history?.reduce((acc, e) => acc + Number(e.cardsCompleted), 0) ?? 0;
  const totalCalories =
    history?.reduce((acc, e) => acc + Number(e.caloriesBurned), 0) ?? 0;
  const streak = Number(profile?.currentStreak ?? 0);

  return (
    <>
      <HowToPlayModal
        open={howToPlayOpen}
        onClose={() => setHowToPlayOpen(false)}
      />
      <div
        className="min-h-dvh bg-background flex flex-col max-w-[430px] mx-auto overflow-x-hidden pb-24"
        data-ocid="home.page"
      >
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none max-w-[430px] mx-auto"
          style={{
            background:
              "radial-gradient(ellipse 80% 40% at 50% 0%, oklch(0.22 0.04 180 / 0.22) 0%, transparent 55%)",
          }}
        />

        {/* 1. TOP BAR */}
        <header className="relative flex items-center justify-between px-5 pt-12 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted/40 flex items-center justify-center shrink-0 border border-primary/20">
              <User className="w-5 h-5 text-white/60" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] text-muted-foreground font-body leading-none mb-0.5">
                Welcome back,
              </span>
              <span className="font-display font-black text-sm text-white leading-none">
                {username}.
              </span>
            </div>
          </div>
          <button
            type="button"
            className="w-9 h-9 rounded-xl bg-card/80 border border-border/60 flex items-center justify-center text-white hover:border-primary/50 hover:text-primary transition-smooth"
            onClick={() => setHowToPlayOpen(true)}
            data-ocid="home.notification_button"
            aria-label="Notifications"
          >
            <Bell className="w-[22px] h-[22px]" />
          </button>
        </header>

        {/* 2. LOGO SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center py-6"
        >
          <img
            src="/assets/images/mbw-logo-white-icon.png"
            alt="MyBodyWeight logo"
            className="w-16 h-16 object-contain"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          <p className="text-lg font-black uppercase tracking-widest text-white mt-2 font-display">
            MYBODYWEIGHT
          </p>
        </motion.div>

        {/* 3. CHOOSE YOUR DECK */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-6"
        >
          <p className="text-xs font-display font-bold uppercase tracking-widest text-muted-foreground px-5 mb-3">
            CHOOSE YOUR DECK
          </p>
          {/* Horizontal scroll */}
          <div
            className="flex flex-row gap-4 overflow-x-auto px-5 pb-2"
            style={{ scrollbarWidth: "none" }}
          >
            {/* Upper Body — active */}
            <button
              type="button"
              onClick={() => navigate({ to: "/decks" })}
              className="flex-shrink-0 w-[150px] h-[180px] rounded-2xl overflow-hidden relative flex flex-col justify-end"
              style={{
                background:
                  "linear-gradient(155deg, oklch(0.18 0.02 180) 0%, oklch(0.12 0.015 200) 100%)",
                border: "1px solid oklch(0.68 0.25 180 / 0.5)",
                boxShadow: "0 0 24px oklch(0.68 0.25 180 / 0.2)",
              }}
              data-ocid="home.upper_body_deck_card"
            >
              <img
                src="/assets/exercises/backside_of_card.png"
                alt="Upper Body Deck"
                className="absolute inset-0 w-full h-full object-cover opacity-40"
              />
              <div
                className="relative p-3"
                style={{
                  background:
                    "linear-gradient(to top, oklch(0.08 0.01 200 / 0.95), transparent)",
                }}
              >
                <p className="font-display font-black text-sm text-white uppercase tracking-wide">
                  UPPER BODY
                </p>
                <p className="text-[11px] font-display font-bold mt-0.5 text-primary">
                  52 CARDS
                </p>
              </div>
            </button>

            {/* Coming Soon cards */}
            {COMING_SOON_DECKS.map((d, i) => (
              <div
                key={d.id}
                className="flex-shrink-0 w-[150px] h-[180px] rounded-2xl overflow-hidden relative flex flex-col justify-end"
                style={{
                  background: "oklch(0.13 0.008 260)",
                  border: "1px solid oklch(0.22 0.01 260 / 0.5)",
                }}
                data-ocid={`home.coming_soon_deck.${i + 1}`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <Lock className="w-8 h-8 text-muted-foreground/30" />
                </div>
                <div className="absolute top-2.5 right-2.5">
                  <span
                    className="text-[9px] font-display font-black px-2 py-0.5 rounded-full uppercase tracking-wider"
                    style={{
                      background: "oklch(0.68 0.25 180 / 0.15)",
                      color: "oklch(0.68 0.25 180)",
                      border: "1px solid oklch(0.68 0.25 180 / 0.3)",
                    }}
                  >
                    SOON
                  </span>
                </div>
                <div
                  className="relative p-3"
                  style={{
                    background:
                      "linear-gradient(to top, oklch(0.08 0.01 260 / 0.95), transparent)",
                  }}
                >
                  <p className="font-display font-black text-sm text-white/60 uppercase tracking-wide">
                    {d.label}
                  </p>
                  <p className="text-[11px] text-muted-foreground font-display font-bold mt-0.5">
                    52 CARDS
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 4. DAILY CHALLENGE */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.45 }}
          className="px-5 mb-6"
        >
          <button
            type="button"
            className="w-full rounded-2xl bg-card p-4 flex items-center gap-3 text-left border border-primary/20"
            onClick={() => navigate({ to: "/decks" })}
            data-ocid="home.daily_challenge_button"
          >
            <Zap className="w-7 h-7 shrink-0 text-primary" />
            <div className="flex-1 min-w-0">
              <p className="font-display font-black text-sm text-white uppercase tracking-wide">
                DAILY CHALLENGE
              </p>
              <p className="text-xs text-muted-foreground font-body mt-0.5">
                Test yourself. Earn rewards.
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
          </button>
        </motion.section>

        {/* 5. STATS OVERVIEW */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26, duration: 0.45 }}
          className="px-5 mb-6"
        >
          <p className="text-xs font-display font-bold uppercase tracking-widest text-muted-foreground mb-3">
            STATS OVERVIEW
          </p>
          <div className="grid grid-cols-2 gap-3">
            <StatCard
              value={workoutCount}
              label="WORKOUTS"
              ocid="home.stats.workouts"
            />
            <StatCard
              value={totalCards}
              label="CARDS DRAWN"
              ocid="home.stats.cards"
            />
            <StatCard
              value={totalCalories}
              label="CALORIES"
              suffix="kcal"
              ocid="home.stats.calories"
            />
            <StatCard
              value={streak}
              label="STREAK"
              suffix="🔥"
              ocid="home.stats.streak"
            />
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="mt-auto px-5 pb-4 text-center">
          <p className="text-xs text-muted-foreground font-body">
            © {new Date().getFullYear()}.{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-smooth"
            >
              Built with love using caffeine.ai
            </a>
          </p>
        </footer>
      </div>

      <BottomNav active="home" />
    </>
  );
}

function StatCard({
  value,
  label,
  suffix,
  ocid,
}: {
  value: number;
  label: string;
  suffix?: string;
  ocid: string;
}) {
  return (
    <div
      className="rounded-xl bg-card p-4 flex flex-col"
      style={{ border: "1px solid oklch(0.22 0.01 260 / 0.5)" }}
      data-ocid={ocid}
    >
      <span className="font-display font-black text-2xl text-white leading-none">
        {value.toLocaleString()}
        {suffix ? ` ${suffix}` : ""}
      </span>
      <span className="text-xs text-muted-foreground font-display font-bold uppercase tracking-wider mt-1.5">
        {label}
      </span>
    </div>
  );
}
