import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const COOLDOWN_SECONDS = 60;

function getCooldownKey(email: string) {
  return `mbw_resend_cooldown_${email}`;
}

function getRemainingCooldown(email: string): number {
  const stored = localStorage.getItem(getCooldownKey(email));
  if (!stored) return 0;
  const elapsed = Math.floor((Date.now() - Number.parseInt(stored, 10)) / 1000);
  return Math.max(0, COOLDOWN_SECONDS - elapsed);
}

export default function VerifyEmailPage() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/verify-email" }) as {
    token?: string;
    email?: string;
  };
  const { actor } = useActor(createActor);
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [resendStatus, setResendStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [resendError, setResendError] = useState("");
  const [cooldownLeft, setCooldownLeft] = useState(() =>
    search.email ? getRemainingCooldown(search.email) : 0,
  );
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const initialCooldown = useRef(cooldownLeft);

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally runs once on mount only
  useEffect(() => {
    if (initialCooldown.current <= 0) return;
    timerRef.current = setInterval(() => {
      setCooldownLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startCooldown = (email: string) => {
    if (timerRef.current) clearInterval(timerRef.current);
    localStorage.setItem(getCooldownKey(email), Date.now().toString());
    setCooldownLeft(COOLDOWN_SECONDS);
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
    if (!search.email || cooldownLeft > 0 || resendStatus === "sending") return;
    setResendStatus("sending");
    setResendError("");
    try {
      const result = await actor?.resendVerificationEmail(search.email);
      if (result && "ok" in result) {
        setResendStatus("success");
        startCooldown(search.email);
      } else {
        setResendStatus("error");
        setResendError(
          (result as { err: string }).err ||
            "Failed to resend. Please try again.",
        );
      }
    } catch {
      setResendStatus("error");
      setResendError("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    const token = search.token;
    if (!token) {
      setStatus("loading");
      return;
    }
    (async () => {
      try {
        const result = await (actor as any).verifyEmail(token);
        if ("ok" in result) {
          setStatus("success");
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
    })();
  }, [search.token, actor]);

  const resendSection = search.email ? (
    <div
      className="mt-8 flex flex-col items-center gap-3"
      data-ocid="verify-email.resend_section"
    >
      {resendStatus === "success" && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full px-4 py-3 rounded-xl text-center"
          style={{
            background: "oklch(0.20 0.05 160 / 0.35)",
            border: "1px solid oklch(0.55 0.18 160 / 0.4)",
          }}
          data-ocid="verify-email.resend_success_state"
        >
          <p
            className="font-body text-sm"
            style={{ color: "oklch(0.80 0.18 160)" }}
          >
            Confirmation email sent — please check your inbox and spam folder
          </p>
        </motion.div>
      )}
      {resendStatus === "error" && resendError && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full px-4 py-3 rounded-xl text-center"
          style={{
            background: "oklch(0.25 0.04 25 / 0.3)",
            border: "1px solid oklch(0.55 0.15 25 / 0.4)",
          }}
          data-ocid="verify-email.resend_error_state"
        >
          <p
            className="font-body text-sm"
            style={{ color: "oklch(0.75 0.12 25)" }}
          >
            {resendError}
          </p>
        </motion.div>
      )}
      <button
        type="button"
        onClick={handleResend}
        disabled={cooldownLeft > 0 || resendStatus === "sending"}
        className="font-body text-sm transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          color:
            cooldownLeft > 0 ? "oklch(0.55 0.008 260)" : "oklch(0.68 0.25 180)",
        }}
        data-ocid="verify-email.resend_button"
      >
        {resendStatus === "sending" ? (
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full border-2 border-current border-t-transparent animate-spin" />
            Sending...
          </span>
        ) : cooldownLeft > 0 ? (
          `Resend in ${cooldownLeft}s...`
        ) : (
          "Didn't receive an email? Resend confirmation"
        )}
      </button>
    </div>
  ) : null;

  return (
    <div
      className="min-h-dvh flex flex-col items-center max-w-[430px] mx-auto px-6 relative overflow-hidden bg-background"
      data-ocid="verify-email.page"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 50% 0%, oklch(0.22 0.04 180 / 0.2) 0%, transparent 55%)",
        }}
      />

      <div className="relative z-10 flex flex-col flex-1 items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <img
            src="/assets/images/mbw-logo-white-icon.png"
            alt="MyBodyWeight"
            className="w-16 h-16 object-contain mx-auto"
            style={{
              filter: "drop-shadow(0 0 10px oklch(0.68 0.25 180 / 0.3))",
            }}
          />
        </motion.div>

        {search.token ? (
          <>
            {status === "loading" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center"
              >
                <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin mb-6" />
                <p className="font-body text-white/70 text-base">
                  Verifying your email...
                </p>
              </motion.div>
            )}
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="font-display font-black text-2xl uppercase tracking-widest-custom text-white mb-3">
                  Email Verified!
                </h1>
                <p className="font-body text-white/55 mb-8">
                  Welcome to MyBodyWeight. Your account is ready.
                </p>
                <button
                  type="button"
                  onClick={() => navigate({ to: "/onboarding/auth" })}
                  className="w-full h-14 rounded-full flex items-center justify-center font-display font-bold text-sm tracking-wide bg-primary text-background transition-smooth hover:opacity-90"
                  data-ocid="verify-email.sign_in_button"
                >
                  Sign In
                </button>
              </motion.div>
            )}
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="font-display font-black text-2xl uppercase tracking-widest-custom text-white mb-3">
                  Verification Failed
                </h1>
                <p className="font-body text-white/55 mb-8">
                  The link may have expired or is invalid.
                </p>
                <button
                  type="button"
                  onClick={() => navigate({ to: "/onboarding/auth" })}
                  className="w-full h-14 rounded-full flex items-center justify-center font-display font-bold text-sm tracking-wide bg-primary text-background transition-smooth hover:opacity-90"
                  data-ocid="verify-email.back_to_sign_in_button"
                >
                  Back to Sign In
                </button>
                {resendSection}
              </motion.div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-display font-black text-2xl uppercase tracking-widest-custom text-white mb-3">
              Check Your Inbox
            </h1>
            <p className="font-body text-white/55 mb-2">
              We sent a verification link to
            </p>
            <p className="font-body text-white font-bold mb-8">
              {search.email || "your email"}
            </p>
            <button
              type="button"
              onClick={() => navigate({ to: "/onboarding/auth" })}
              className="font-body text-sm font-bold text-primary transition-smooth hover:opacity-75"
              data-ocid="verify-email.back_to_sign_in_link"
            >
              Back to Sign In
            </button>
            {resendSection}
          </motion.div>
        )}
      </div>
    </div>
  );
}
