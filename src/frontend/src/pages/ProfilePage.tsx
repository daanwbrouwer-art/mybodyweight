import { createActor } from "@/backend";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/use-profile";
import { useWorkoutHistory } from "@/hooks/use-workout-history";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ChevronRight,
  Clock,
  Dumbbell,
  Flame,
  LogOut,
  User,
} from "lucide-react";
import { motion } from "motion/react";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { loginStatus, clear } = useInternetIdentity();
  const isLoggedIn = loginStatus === "success";

  const { data: profile } = useProfile();
  const { data: history } = useWorkoutHistory();

  const handleLogout = () => {
    clear();
    localStorage.removeItem("mbw_user");
    localStorage.removeItem("mbw_first_login");
    navigate({ to: "/onboarding/welcome" });
  };

  const totalWorkouts = profile?.totalWorkouts ?? BigInt(0);
  const totalCalories = profile?.totalCalories ?? BigInt(0);
  const totalReps = history
    ? history.reduce((sum, h) => sum + Number(h.totalReps), 0)
    : 0;

  return (
    <div
      className="min-h-dvh bg-background flex flex-col max-w-[430px] mx-auto"
      data-ocid="profile.page"
    >
      {/* Radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none max-w-[430px] mx-auto"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 50% 0%, oklch(0.22 0.04 180 / 0.22) 0%, transparent 60%)",
        }}
      />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-5 pt-12 pb-4">
        <button
          type="button"
          className="w-9 h-9 rounded-xl bg-card/80 border border-border/60 flex items-center justify-center text-muted-foreground hover:border-primary/50 hover:text-primary transition-smooth"
          onClick={() => navigate({ to: "/home" })}
          data-ocid="profile.back_button"
          aria-label="Go back to home"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <Logo size="sm" showIcon />
        {isLoggedIn ? (
          <button
            type="button"
            className="w-9 h-9 rounded-xl bg-card/80 border border-border/60 flex items-center justify-center text-muted-foreground hover:border-destructive/50 hover:text-destructive transition-smooth"
            onClick={handleLogout}
            data-ocid="profile.logout_button"
            aria-label="Log out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        ) : (
          <div className="w-9" />
        )}
      </header>

      <div className="relative z-10 flex flex-col flex-1 px-5 pb-10">
        {/* Avatar + name */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center pt-4 pb-8"
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
            style={{
              background: "oklch(0.17 0.015 180 / 0.3)",
              border: "2px solid oklch(0.68 0.25 180 / 0.4)",
              boxShadow: "0 0 40px oklch(0.68 0.25 180 / 0.18)",
            }}
          >
            <User
              className="w-9 h-9"
              style={{ color: "oklch(0.68 0.25 180)" }}
            />
          </div>
          <h1 className="font-display font-black text-2xl text-foreground mb-1">
            {profile?.username ?? (isLoggedIn ? "Athlete" : "Guest")}
          </h1>
          <span
            className="text-[11px] font-display font-bold px-3 py-1 rounded-full"
            style={{
              background: isLoggedIn
                ? "oklch(0.68 0.25 180 / 0.12)"
                : "oklch(0.28 0.01 260 / 0.6)",
              color: isLoggedIn
                ? "oklch(0.68 0.25 180)"
                : "oklch(0.62 0.008 260)",
              border: isLoggedIn
                ? "1px solid oklch(0.68 0.25 180 / 0.25)"
                : "1px solid oklch(0.32 0.01 260 / 0.5)",
            }}
          >
            {isLoggedIn ? "REGISTERED" : "GUEST MODE"}
          </span>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.45 }}
          className="grid grid-cols-3 gap-3 mb-6"
        >
          {[
            {
              icon: <Dumbbell className="w-4 h-4" />,
              label: "Workouts",
              value: totalWorkouts.toString(),
            },
            {
              icon: <Flame className="w-4 h-4" />,
              label: "Calories",
              value: totalCalories.toString(),
            },
            {
              icon: <Clock className="w-4 h-4" />,
              label: "Total Reps",
              value: totalReps.toString(),
            },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="rounded-2xl p-3.5 flex flex-col items-center gap-1.5 text-center"
              style={{
                background: "oklch(0.16 0.01 260)",
                border: "1px solid oklch(0.26 0.01 260 / 0.6)",
              }}
              data-ocid={`profile.stat.item.${i + 1}`}
            >
              <span style={{ color: "oklch(0.68 0.25 180)" }}>{stat.icon}</span>
              <p className="font-display font-black text-xl text-foreground leading-none">
                {stat.value}
              </p>
              <p className="text-[10px] font-body text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Workout history */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.45 }}
          className="mb-6"
          data-ocid="profile.history_section"
        >
          <p className="font-display font-bold text-[10px] uppercase tracking-widest mb-3 text-muted-foreground">
            Past Sessions
          </p>
          {history && history.length > 0 ? (
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "oklch(0.16 0.01 260)",
                border: "1px solid oklch(0.26 0.01 260 / 0.5)",
              }}
            >
              {[...history]
                .sort((a, b) => Number(b.completedAt) - Number(a.completedAt))
                .slice(0, 10)
                .map((entry, i) => {
                  const date = new Date(Number(entry.completedAt));
                  const dateStr = date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                  return (
                    <div
                      key={entry.id}
                      className="flex items-center justify-between px-5 py-3.5"
                      style={{
                        borderBottom:
                          i < Math.min(history.length, 10) - 1
                            ? "1px solid oklch(0.22 0.01 260 / 0.5)"
                            : "none",
                      }}
                      data-ocid={`profile.history.item.${i + 1}`}
                    >
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <p className="font-display font-bold text-sm text-foreground">
                          {dateStr}
                        </p>
                        <p className="text-xs text-muted-foreground font-body">
                          {Number(entry.cardsCompleted)} cards ·{" "}
                          {Number(entry.caloriesBurned)} kcal
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className="font-display font-black text-base"
                          style={{ color: "oklch(0.68 0.25 180)" }}
                        >
                          {Number(entry.totalReps)}
                        </span>
                        <span
                          className="text-[10px] font-body uppercase tracking-wide"
                          style={{ color: "oklch(0.5 0.008 260)" }}
                        >
                          reps
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <div
              className="rounded-2xl px-5 py-8 text-center"
              style={{
                background: "oklch(0.16 0.01 260)",
                border: "1px solid oklch(0.26 0.01 260 / 0.4)",
              }}
              data-ocid="profile.history.empty_state"
            >
              <p className="font-display font-bold text-sm text-foreground mb-1">
                No workouts yet
              </p>
              <p className="text-xs text-muted-foreground font-body">
                Complete your first workout to see your history here.
              </p>
            </div>
          )}
        </motion.div>

        {/* Auth CTA for guests */}
        {!isLoggedIn && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <Button
              className="w-full h-14 font-display font-black text-base tracking-wider rounded-2xl"
              style={{
                boxShadow:
                  "0 0 32px oklch(0.68 0.25 180 / 0.28), 0 4px 16px oklch(0 0 0 / 0.25)",
              }}
              onClick={() => navigate({ to: "/onboarding/auth" })}
              data-ocid="profile.sign_in_button"
            >
              Sign In to Save Progress
            </Button>
          </motion.div>
        )}

        {/* Quick action to start workout */}
        {isLoggedIn && (
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="w-full rounded-2xl px-5 py-4 flex items-center gap-3 hover:border-primary/40 transition-smooth"
            style={{
              background: "oklch(0.16 0.01 260)",
              border: "1px solid oklch(0.26 0.01 260 / 0.5)",
            }}
            onClick={() => navigate({ to: "/decks" })}
            data-ocid="profile.start_workout_button"
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: "oklch(0.68 0.25 180 / 0.12)" }}
            >
              <Dumbbell
                className="w-4 h-4"
                style={{ color: "oklch(0.68 0.25 180)" }}
              />
            </div>
            <span className="font-display font-bold text-sm text-foreground flex-1 text-left">
              Start New Workout
            </span>
            <ChevronRight className="w-4 h-4 text-muted-foreground/60" />
          </motion.button>
        )}
      </div>

      {/* Footer */}
      <footer className="relative z-10 px-5 pb-10 text-center mt-auto">
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
  );
}
