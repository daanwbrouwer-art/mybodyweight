import { createActor } from "@/backend";
import { Button } from "@/components/ui/button";
import { useActor } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";

const AUTH_COOLDOWN_SECONDS = 60;

function getAuthCooldownKey(email: string) {
  return `mbw_resend_cooldown_${email}`;
}

function getAuthRemainingCooldown(email: string): number {
  const stored = localStorage.getItem(getAuthCooldownKey(email));
  if (!stored) return 0;
  const elapsed = Math.floor((Date.now() - Number.parseInt(stored, 10)) / 1000);
  return Math.max(0, AUTH_COOLDOWN_SECONDS - elapsed);
}

function isEmailNotConfirmedError(err: string): boolean {
  const lower = err.toLowerCase();
  return (
    lower.includes("not confirmed") ||
    lower.includes("not verified") ||
    lower.includes("email_not_confirmed") ||
    lower.includes("unconfirmed")
  );
}

export default function AuthPage() {
  const navigate = useNavigate();
  const { actor } = useActor(createActor);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showResend, setShowResend] = useState(false);
  const [resendStatus, setResendStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [resendMsg, setResendMsg] = useState("");
  const [cooldownLeft, setCooldownLeft] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCooldown = (e: string) => {
    if (timerRef.current) clearInterval(timerRef.current);
    localStorage.setItem(getAuthCooldownKey(e), Date.now().toString());
    setCooldownLeft(AUTH_COOLDOWN_SECONDS);
    timerRef.current = setInterval(() => {
      setCooldownLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResend = async () => {
    if (!email || cooldownLeft > 0 || resendStatus === "sending") return;
    setResendStatus("sending");
    setResendMsg("");
    try {
      const result = await actor?.resendVerificationEmail(email);
      if (result && "ok" in result) {
        setResendStatus("success");
        setResendMsg(
          "Confirmation email sent — please check your inbox and spam folder",
        );
        startCooldown(email);
      } else {
        setResendStatus("error");
        setResendMsg(
          (result as { err: string }).err ||
            "Failed to resend. Please try again.",
        );
      }
    } catch {
      setResendStatus("error");
      setResendMsg("Something went wrong. Please try again.");
    }
  };

  const hashPassword = async (p: string) => {
    const buf = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(p),
    );
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setShowResend(false);
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setIsLoading(true);
    try {
      const result = await (actor as any).loginUser(
        email,
        await hashPassword(password),
      );
      if ("ok" in result) {
        localStorage.setItem("mbw_user", JSON.stringify(result.ok));
        const isFirstLogin = localStorage.getItem("mbw_first_login") === null;
        localStorage.setItem("mbw_first_login", "done");
        if (isFirstLogin) {
          navigate({ to: "/welcome-tips" });
        } else {
          navigate({ to: "/home" });
        }
      } else {
        const errMsg = result.err || "Invalid email or password";
        setError(errMsg);
        if (isEmailNotConfirmedError(errMsg)) {
          setShowResend(true);
          const remaining = getAuthRemainingCooldown(email);
          setCooldownLeft(remaining);
          if (remaining > 0) {
            if (timerRef.current) clearInterval(timerRef.current);
            timerRef.current = setInterval(() => {
              setCooldownLeft((prev) => {
                if (prev <= 1) {
                  clearInterval(timerRef.current!);
                  return 0;
                }
                return prev - 1;
              });
            }, 1000);
          }
        }
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-dvh flex flex-col max-w-[430px] mx-auto relative overflow-hidden bg-background"
      data-ocid="onboarding-auth.page"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 50% 0%, oklch(0.22 0.04 180 / 0.2) 0%, transparent 55%)",
        }}
      />

      <header className="relative z-10 flex items-center justify-between px-5 pt-12 pb-2">
        <button
          type="button"
          className="w-10 h-10 rounded-2xl bg-card/60 border border-border/40 flex items-center justify-center text-white/50 hover:text-white hover:border-primary/40 transition-smooth"
          onClick={() => navigate({ to: "/onboarding/welcome" })}
          data-ocid="onboarding-auth.back_button"
          aria-label="Go back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <img
          src="/assets/images/mbw-logo-white-icon.png"
          alt="MyBodyWeight"
          className="w-10 h-10 object-contain"
          style={{ filter: "drop-shadow(0 0 10px oklch(0.68 0.25 180 / 0.3))" }}
        />
        <div className="w-10" />
      </header>

      <div className="relative z-10 flex flex-col flex-1 px-6 pt-6 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col flex-1"
        >
          <div className="mb-8">
            <h1 className="font-display font-black text-3xl uppercase tracking-widest-custom leading-none text-white mb-1">
              WELCOME BACK
            </h1>
            <p className="font-body text-sm text-white/45 leading-relaxed">
              Sign in to continue your training journey.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col flex-1">
            <div className="mb-4">
              <label
                htmlFor="auth-email"
                className="font-display text-xs font-bold uppercase tracking-widest text-white/50 mb-2 block"
              >
                Email
              </label>
              <div
                className="w-full h-14 rounded-2xl flex items-center px-4 gap-3 transition-smooth focus-within:border-primary/60"
                style={{
                  background: "oklch(0.17 0.012 260)",
                  border: "1px solid oklch(0.28 0.01 260)",
                }}
              >
                <svg
                  width="16"
                  height="12"
                  viewBox="0 0 18 14"
                  fill="none"
                  className="shrink-0"
                  role="img"
                  aria-hidden="true"
                  style={{ color: "oklch(0.55 0.008 260)" }}
                >
                  <path
                    d="M1 1h16v12H1V1zm0 0l8 7 8-7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input
                  id="auth-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="flex-1 bg-transparent font-body text-sm text-white placeholder:text-white/25 outline-none"
                  data-ocid="onboarding-auth.email_input"
                />
              </div>
            </div>

            <div className="mb-2">
              <label
                htmlFor="auth-password"
                className="font-display text-xs font-bold uppercase tracking-widest text-white/50 mb-2 block"
              >
                Password
              </label>
              <div
                className="w-full h-14 rounded-2xl flex items-center px-4 gap-3 transition-smooth focus-within:border-primary/60"
                style={{
                  background: "oklch(0.17 0.012 260)",
                  border: "1px solid oklch(0.28 0.01 260)",
                }}
              >
                <svg
                  width="14"
                  height="16"
                  viewBox="0 0 14 18"
                  fill="none"
                  className="shrink-0"
                  role="img"
                  aria-hidden="true"
                  style={{ color: "oklch(0.55 0.008 260)" }}
                >
                  <rect
                    x="1"
                    y="7"
                    width="12"
                    height="10"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M4 7V5a3 3 0 1 1 6 0v2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <input
                  id="auth-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="flex-1 bg-transparent font-body text-sm text-white placeholder:text-white/25 outline-none"
                  data-ocid="onboarding-auth.password_input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="shrink-0 text-white/30 hover:text-white/60 transition-smooth"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-end mb-6">
              <button
                type="button"
                onClick={() => navigate({ to: "/forgot-password" })}
                className="font-body text-sm font-bold text-primary transition-smooth hover:opacity-75"
                data-ocid="onboarding-auth.forgot_password_link"
              >
                Forgot password?
              </button>
            </div>

            {error && !showResend && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-5 px-4 py-3 rounded-xl text-center"
                style={{
                  background: "oklch(0.25 0.04 25 / 0.3)",
                  border: "1px solid oklch(0.55 0.15 25 / 0.4)",
                }}
                data-ocid="onboarding-auth.error_state"
              >
                <p
                  className="font-body text-sm"
                  style={{ color: "oklch(0.75 0.12 25)" }}
                >
                  {error}
                </p>
              </motion.div>
            )}

            {showResend && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-5 px-4 py-4 rounded-xl flex flex-col gap-3"
                style={{
                  background: "oklch(0.18 0.04 200 / 0.35)",
                  border: "1px solid oklch(0.45 0.12 200 / 0.5)",
                }}
                data-ocid="onboarding-auth.unconfirmed_email_state"
              >
                <p
                  className="font-body text-sm text-center"
                  style={{ color: "oklch(0.78 0.10 200)" }}
                >
                  Your email isn't confirmed yet. Check your inbox or resend
                  below.
                </p>
                {resendMsg && (
                  <p
                    className="font-body text-xs text-center"
                    style={{
                      color:
                        resendStatus === "success"
                          ? "oklch(0.80 0.18 160)"
                          : "oklch(0.75 0.12 25)",
                    }}
                    data-ocid={
                      resendStatus === "success"
                        ? "onboarding-auth.resend_success_state"
                        : "onboarding-auth.resend_error_state"
                    }
                  >
                    {resendMsg}
                  </p>
                )}
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={cooldownLeft > 0 || resendStatus === "sending"}
                  className="font-body text-sm font-bold transition-smooth disabled:opacity-50 disabled:cursor-not-allowed text-center"
                  style={{
                    color:
                      cooldownLeft > 0
                        ? "oklch(0.55 0.008 260)"
                        : "oklch(0.68 0.25 180)",
                  }}
                  data-ocid="onboarding-auth.resend_button"
                >
                  {resendStatus === "sending" ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-3 h-3 rounded-full border-2 border-current border-t-transparent animate-spin" />
                      Sending...
                    </span>
                  ) : cooldownLeft > 0 ? (
                    `Resend in ${cooldownLeft}s...`
                  ) : (
                    "Resend confirmation email"
                  )}
                </button>
              </motion.div>
            )}

            <Button
              type="submit"
              className="w-full h-14 font-display font-black text-sm tracking-widest-custom rounded-full uppercase mb-4"
              style={{
                boxShadow:
                  "0 0 32px oklch(0.68 0.25 180 / 0.3), 0 4px 16px oklch(0 0 0 / 0.25)",
              }}
              disabled={isLoading}
              data-ocid="onboarding-auth.login_button"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Continue"
              )}
            </Button>

            <p className="font-body text-sm text-white/40 text-center mt-4">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate({ to: "/onboarding/create-account" })}
                className="font-bold text-primary transition-smooth hover:opacity-75"
                data-ocid="onboarding-auth.signup_link"
              >
                Create one
              </button>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
