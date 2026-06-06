import { u as useNavigate, b as useSearch, r as reactExports, j as jsxRuntimeExports, m as motion } from "./index-DqGOMkPn.js";
import { c as createActor } from "./backend-Bt8BEzt7.js";
import { u as useActor } from "./useActor-BRlpmEWG.js";
const COOLDOWN_SECONDS = 60;
function getCooldownKey(email) {
  return `mbw_resend_cooldown_${email}`;
}
function getRemainingCooldown(email) {
  const stored = localStorage.getItem(getCooldownKey(email));
  if (!stored) return 0;
  const elapsed = Math.floor((Date.now() - Number.parseInt(stored, 10)) / 1e3);
  return Math.max(0, COOLDOWN_SECONDS - elapsed);
}
function VerifyEmailPage() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/verify-email" });
  const { actor } = useActor(createActor);
  const [status, setStatus] = reactExports.useState(
    "loading"
  );
  const [resendStatus, setResendStatus] = reactExports.useState("idle");
  const [resendError, setResendError] = reactExports.useState("");
  const [cooldownLeft, setCooldownLeft] = reactExports.useState(
    () => search.email ? getRemainingCooldown(search.email) : 0
  );
  const timerRef = reactExports.useRef(null);
  const initialCooldown = reactExports.useRef(cooldownLeft);
  reactExports.useEffect(() => {
    if (initialCooldown.current <= 0) return;
    timerRef.current = setInterval(() => {
      setCooldownLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1e3);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);
  const startCooldown = (email) => {
    if (timerRef.current) clearInterval(timerRef.current);
    localStorage.setItem(getCooldownKey(email), Date.now().toString());
    setCooldownLeft(COOLDOWN_SECONDS);
    timerRef.current = setInterval(() => {
      setCooldownLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1e3);
  };
  const handleResend = async () => {
    if (!search.email || cooldownLeft > 0 || resendStatus === "sending") return;
    setResendStatus("sending");
    setResendError("");
    try {
      const result = await (actor == null ? void 0 : actor.resendVerificationEmail(search.email));
      if (result && "ok" in result) {
        setResendStatus("success");
        startCooldown(search.email);
      } else {
        setResendStatus("error");
        setResendError(
          result.err || "Failed to resend. Please try again."
        );
      }
    } catch {
      setResendStatus("error");
      setResendError("Something went wrong. Please try again.");
    }
  };
  reactExports.useEffect(() => {
    const token = search.token;
    if (!token) {
      setStatus("loading");
      return;
    }
    (async () => {
      try {
        const result = await actor.verifyEmail(token);
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
  const resendSection = search.email ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "mt-8 flex flex-col items-center gap-3",
      "data-ocid": "verify-email.resend_section",
      children: [
        resendStatus === "success" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: -4 },
            animate: { opacity: 1, y: 0 },
            className: "w-full px-4 py-3 rounded-xl text-center",
            style: {
              background: "oklch(0.20 0.05 160 / 0.35)",
              border: "1px solid oklch(0.55 0.18 160 / 0.4)"
            },
            "data-ocid": "verify-email.resend_success_state",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "font-body text-sm",
                style: { color: "oklch(0.80 0.18 160)" },
                children: "Confirmation email sent — please check your inbox and spam folder"
              }
            )
          }
        ),
        resendStatus === "error" && resendError && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: -4 },
            animate: { opacity: 1, y: 0 },
            className: "w-full px-4 py-3 rounded-xl text-center",
            style: {
              background: "oklch(0.25 0.04 25 / 0.3)",
              border: "1px solid oklch(0.55 0.15 25 / 0.4)"
            },
            "data-ocid": "verify-email.resend_error_state",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "font-body text-sm",
                style: { color: "oklch(0.75 0.12 25)" },
                children: resendError
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: handleResend,
            disabled: cooldownLeft > 0 || resendStatus === "sending",
            className: "font-body text-sm transition-smooth disabled:opacity-50 disabled:cursor-not-allowed",
            style: {
              color: cooldownLeft > 0 ? "oklch(0.55 0.008 260)" : "oklch(0.68 0.25 180)"
            },
            "data-ocid": "verify-email.resend_button",
            children: resendStatus === "sending" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 rounded-full border-2 border-current border-t-transparent animate-spin" }),
              "Sending..."
            ] }) : cooldownLeft > 0 ? `Resend in ${cooldownLeft}s...` : "Didn't receive an email? Resend confirmation"
          }
        )
      ]
    }
  ) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-dvh flex flex-col items-center max-w-[430px] mx-auto px-6 relative overflow-hidden bg-background",
      "data-ocid": "verify-email.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none",
            style: {
              background: "radial-gradient(ellipse 80% 40% at 50% 0%, oklch(0.22 0.04 180 / 0.2) 0%, transparent 55%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col flex-1 items-center justify-center text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: -10 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5 },
              className: "mb-8",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: "/assets/images/mbw-logo-white-icon.png",
                  alt: "MyBodyWeight",
                  className: "w-16 h-16 object-contain mx-auto",
                  style: {
                    filter: "drop-shadow(0 0 10px oklch(0.68 0.25 180 / 0.3))"
                  }
                }
              )
            }
          ),
          search.token ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            status === "loading" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                className: "flex flex-col items-center",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin mb-6" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-white/70 text-base", children: "Verifying your email..." })
                ]
              }
            ),
            status === "success" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 14 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-black text-2xl uppercase tracking-widest-custom text-white mb-3", children: "Email Verified!" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-white/55 mb-8", children: "Welcome to MyBodyWeight. Your account is ready." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => navigate({ to: "/onboarding/auth" }),
                      className: "w-full h-14 rounded-full flex items-center justify-center font-display font-bold text-sm tracking-wide bg-primary text-background transition-smooth hover:opacity-90",
                      "data-ocid": "verify-email.sign_in_button",
                      children: "Sign In"
                    }
                  )
                ]
              }
            ),
            status === "error" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 14 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-black text-2xl uppercase tracking-widest-custom text-white mb-3", children: "Verification Failed" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-white/55 mb-8", children: "The link may have expired or is invalid." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => navigate({ to: "/onboarding/auth" }),
                      className: "w-full h-14 rounded-full flex items-center justify-center font-display font-bold text-sm tracking-wide bg-primary text-background transition-smooth hover:opacity-90",
                      "data-ocid": "verify-email.back_to_sign_in_button",
                      children: "Back to Sign In"
                    }
                  ),
                  resendSection
                ]
              }
            )
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 14 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-black text-2xl uppercase tracking-widest-custom text-white mb-3", children: "Check Your Inbox" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-white/55 mb-2", children: "We sent a verification link to" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-white font-bold mb-8", children: search.email || "your email" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => navigate({ to: "/onboarding/auth" }),
                    className: "font-body text-sm font-bold text-primary transition-smooth hover:opacity-75",
                    "data-ocid": "verify-email.back_to_sign_in_link",
                    children: "Back to Sign In"
                  }
                ),
                resendSection
              ]
            }
          )
        ] })
      ]
    }
  );
}
export {
  VerifyEmailPage as default
};
