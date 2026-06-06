import { u as useNavigate, r as reactExports, j as jsxRuntimeExports, m as motion } from "./index-DqGOMkPn.js";
function SplashPage() {
  const navigate = useNavigate();
  const handleTap = reactExports.useCallback(() => {
    const isEmailAuth = localStorage.getItem("mbw_user") !== null;
    if (isEmailAuth) {
      navigate({ to: "/home" });
    } else {
      navigate({ to: "/onboarding/welcome" });
    }
  }, [navigate]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      className: "min-h-dvh w-full flex flex-col items-center justify-between bg-background relative overflow-hidden cursor-pointer select-none",
      "data-ocid": "splash.page",
      onClick: handleTap,
      "aria-label": "Tap to continue",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none",
            style: {
              background: "radial-gradient(ellipse 65% 55% at 50% 45%, oklch(0.22 0.06 180 / 0.35) 0%, oklch(0.15 0.02 220 / 0.1) 55%, transparent 75%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
            className: "relative flex flex-col items-center gap-6 px-8 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.8 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] },
                  className: "relative",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "absolute inset-0 rounded-full pointer-events-none",
                        style: {
                          background: "oklch(0.68 0.25 180 / 0.22)",
                          filter: "blur(24px)",
                          transform: "scale(1.8)"
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: "/assets/images/mbw-logo-white-icon.png",
                        alt: "MyBodyWeight",
                        className: "relative w-24 h-24 object-contain",
                        style: {
                          filter: "drop-shadow(0 0 18px oklch(0.68 0.25 180 / 0.45))"
                        }
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 12 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                  className: "flex flex-col items-center gap-2",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-black text-3xl tracking-widest-custom uppercase leading-none text-white", children: "MYBODYWEIGHT" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-sm tracking-widest-custom uppercase text-primary", children: "TRAIN LIKE AN ATHLETE" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  transition: { delay: 0.55, duration: 0.5 },
                  className: "flex flex-col items-center gap-2",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "h-px w-24",
                        style: {
                          background: "linear-gradient(to right, transparent, oklch(0.68 0.25 180 / 0.5), transparent)"
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-[11px] tracking-[0.2em] uppercase text-white/60", children: "YOUR BODY. YOUR RULES." }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "h-px w-24",
                        style: {
                          background: "linear-gradient(to right, transparent, oklch(0.68 0.25 180 / 0.5), transparent)"
                        }
                      }
                    )
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 1, duration: 0.6 },
            className: "relative pb-16 flex flex-col items-center gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.p,
                {
                  animate: { opacity: [0.35, 0.85, 0.35] },
                  transition: {
                    duration: 2.2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut"
                  },
                  className: "font-display text-[11px] tracking-[0.25em] uppercase text-white/50",
                  children: "TAP TO CONTINUE"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  animate: { y: [0, 4, 0] },
                  transition: {
                    duration: 1.6,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut"
                  },
                  style: { color: "oklch(0.68 0.25 180 / 0.6)" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "svg",
                    {
                      width: "16",
                      height: "10",
                      viewBox: "0 0 16 10",
                      fill: "none",
                      role: "img",
                      "aria-label": "Scroll down",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          d: "M1 1L8 8L15 1",
                          stroke: "currentColor",
                          strokeWidth: "1.5",
                          strokeLinecap: "round",
                          strokeLinejoin: "round"
                        }
                      )
                    }
                  )
                }
              )
            ]
          }
        )
      ]
    }
  );
}
export {
  SplashPage as default
};
