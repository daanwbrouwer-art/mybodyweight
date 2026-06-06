import { u as useNavigate, a as useWorkoutStore, r as reactExports, j as jsxRuntimeExports, m as motion } from "./index-DqGOMkPn.js";
import { X } from "./x-DtXDnd-V.js";
function WelcomePage() {
  const navigate = useNavigate();
  const setGuestMode = useWorkoutStore((s) => s.setGuestMode);
  const guestMode = useWorkoutStore((s) => s.guestMode);
  const [dismissBanner, setDismissBanner] = reactExports.useState(false);
  const handleGuestMode = () => {
    setGuestMode(true);
    navigate({ to: "/home" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-dvh flex flex-col items-center max-w-[430px] mx-auto px-6 relative overflow-hidden bg-background",
      "data-ocid": "onboarding-welcome.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none",
            style: {
              background: "radial-gradient(ellipse 80% 50% at 50% 0%, oklch(0.22 0.05 180 / 0.28) 0%, transparent 60%)"
            }
          }
        ),
        guestMode && !dismissBanner && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -10 },
            animate: { opacity: 1, y: 0 },
            className: "relative z-10 w-full mt-4 mb-2 px-4 py-3 rounded-xl flex items-center justify-between",
            style: {
              background: "oklch(0.22 0.04 180 / 0.3)",
              border: "1px solid oklch(0.68 0.25 180 / 0.3)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-white", children: "Save your progress — create a free account" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setDismissBanner(true),
                  className: "text-white/60 hover:text-white transition-smooth",
                  "aria-label": "Dismiss",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: -10 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
            className: "relative z-10 pt-16 pb-6",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: "/assets/images/mbw-logo-white-icon.png",
                alt: "MyBodyWeight",
                className: "w-20 h-20 object-contain mx-auto",
                style: {
                  filter: "drop-shadow(0 0 14px oklch(0.68 0.25 180 / 0.35))"
                }
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 14 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
            className: "relative z-10 text-center mb-10",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-black text-4xl uppercase tracking-widest-custom leading-none text-white mb-2", children: "MYBODYWEIGHT" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-lg uppercase tracking-widest-custom text-primary", children: "TRAIN LIKE AN ATHLETE" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-white/55 mt-3 leading-relaxed max-w-[280px] mx-auto", children: "YOUR BODY. YOUR RULES." })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 18 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.25, duration: 0.55, ease: [0.16, 1, 0.3, 1] },
            className: "relative z-10 w-full flex flex-col gap-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => navigate({ to: "/onboarding/create-account" }),
                  className: "w-full h-14 rounded-full flex items-center justify-center font-display font-bold text-sm tracking-wide bg-primary text-background transition-smooth hover:opacity-90 active:scale-[0.98]",
                  "data-ocid": "onboarding-welcome.create_account_button",
                  children: "Create Account"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => navigate({ to: "/onboarding/auth" }),
                  className: "w-full h-14 rounded-full flex items-center justify-center font-display font-bold text-sm tracking-wide text-foreground border border-white/40 bg-transparent transition-smooth hover:opacity-90 active:scale-[0.98]",
                  "data-ocid": "onboarding-welcome.sign_in_button",
                  children: "Sign In"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 0.5, duration: 0.4 },
            className: "relative z-10 mt-auto pb-10 pt-6",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleGuestMode,
                className: "font-body text-sm text-foreground/50 hover:text-foreground/80 transition-smooth",
                "data-ocid": "onboarding-welcome.guest_button",
                children: "Continue as Guest"
              }
            )
          }
        )
      ]
    }
  );
}
export {
  WelcomePage as default
};
