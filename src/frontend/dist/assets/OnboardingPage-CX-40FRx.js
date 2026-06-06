import { r as reactExports, d as useOnboarding, u as useNavigate, j as jsxRuntimeExports, m as motion } from "./index-DqGOMkPn.js";
import { A as AnimatePresence } from "./index-BV1IzFVq.js";
const GENDERS = [
  { id: "male", label: "Male", sub: "Tailored for male athletes", icon: "♂" },
  {
    id: "female",
    label: "Female",
    sub: "Tailored for female athletes",
    icon: "♀"
  }
];
const LEVELS = [
  {
    id: "beginner",
    label: "Beginner",
    desc: "New to calisthenics or getting back into it",
    icon: "🌱"
  },
  {
    id: "advanced",
    label: "Advanced",
    desc: "Consistent training, solid foundation",
    icon: "⚡",
    locked: true
  },
  {
    id: "pro",
    label: "Pro",
    desc: "Elite athlete, maximum challenge",
    icon: "🔥",
    locked: true
  }
];
function OnboardingPage() {
  const [step, setStep] = reactExports.useState("gender");
  const [gender, setGender] = reactExports.useState("");
  const [selectedLevel, setSelectedLevel] = reactExports.useState("");
  const [showUpgradeHint, setShowUpgradeHint] = reactExports.useState(false);
  const { saveOnboarding } = useOnboarding();
  const navigate = useNavigate();
  const handleGenderSelect = (g) => setGender(g);
  const handleGenderContinue = () => {
    if (gender) setStep("level");
  };
  const handleLevelTap = (lvl) => {
    if (lvl.locked) {
      setShowUpgradeHint(true);
    } else {
      setSelectedLevel(lvl.id);
      setShowUpgradeHint(false);
    }
  };
  const handleStartTraining = async () => {
    if (!selectedLevel) return;
    await saveOnboarding(gender, selectedLevel);
    navigate({ to: "/home" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-dvh bg-background flex flex-col relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-20",
        style: {
          background: "radial-gradient(ellipse, oklch(0.68 0.25 180) 0%, transparent 70%)"
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center pt-12 pb-4 px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: "/assets/images/mbw-logo-white.png",
            alt: "MyBodyWeight",
            className: "h-8 w-auto",
            onError: (e) => {
              e.target.style.display = "none";
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-black text-xl tracking-widest text-foreground uppercase", children: "MyBodyWeight" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `h-1 rounded-full transition-all duration-500 ${step === "gender" || step === "level" ? "w-16 bg-primary" : "w-8 bg-muted"}`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `h-1 rounded-full transition-all duration-500 ${step === "level" ? "w-16 bg-primary" : "w-8 bg-muted"}`
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex flex-col items-center justify-center px-6 pb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
      step === "gender" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 40 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -40 },
          transition: { duration: 0.35, ease: "easeInOut" },
          className: "w-full max-w-sm flex flex-col items-center gap-8",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3", children: "Step 1 of 2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl font-display font-black text-foreground mb-2 leading-tight", children: [
                "Welcome to",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "MyBodyWeight" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Tell us about yourself" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full grid grid-cols-2 gap-4", children: GENDERS.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": `onboarding.gender_${g.id}`,
                onClick: () => handleGenderSelect(g.id),
                className: `relative flex flex-col items-center justify-center gap-3 rounded-2xl p-6 border transition-all duration-300 ${gender === g.id ? "border-primary bg-primary/10 shadow-[0_0_20px_oklch(0.68_0.25_180_/_0.25)]" : "border-border bg-card hover:border-primary/40 hover:bg-card/80"}`,
                children: [
                  gender === g.id && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 right-3 w-5 h-5 rounded-full bg-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "svg",
                    {
                      width: "10",
                      height: "8",
                      viewBox: "0 0 10 8",
                      fill: "none",
                      "aria-label": "Selected",
                      role: "img",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          d: "M1 4L3.5 6.5L9 1",
                          stroke: "oklch(0.08 0.005 260)",
                          strokeWidth: "1.8",
                          strokeLinecap: "round",
                          strokeLinejoin: "round"
                        }
                      )
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl", children: g.icon }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-bold text-foreground", children: g.label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: g.sub })
                  ] })
                ]
              },
              g.id
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": "onboarding.gender_continue",
                onClick: handleGenderContinue,
                disabled: !gender,
                className: `w-full py-4 rounded-xl font-bold text-base tracking-wide transition-all duration-300 ${gender ? "bg-primary text-background shadow-[0_4px_20px_oklch(0.68_0.25_180_/_0.4)] hover:shadow-[0_6px_28px_oklch(0.68_0.25_180_/_0.55)] active:scale-[0.98]" : "bg-muted text-muted-foreground cursor-not-allowed opacity-40"}`,
                children: "Continue"
              }
            )
          ]
        },
        "gender"
      ),
      step === "level" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 40 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -40 },
          transition: { duration: 0.35, ease: "easeInOut" },
          className: "w-full max-w-sm flex flex-col items-center gap-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3", children: "Step 2 of 2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-black text-foreground mb-2 leading-tight", children: "Choose Your Level" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Start free. Unlock more as you progress." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full flex flex-col gap-3", children: LEVELS.map((lvl) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": `onboarding.level_${lvl.id}`,
                onClick: () => handleLevelTap(lvl),
                className: `w-full rounded-2xl p-5 border transition-all duration-300 relative overflow-hidden text-left ${lvl.locked ? "border-border bg-card/40 opacity-60" : selectedLevel === lvl.id ? "border-primary bg-primary/10 shadow-[0_0_20px_oklch(0.68_0.25_180_/_0.25)]" : "border-border bg-card hover:border-primary/40 hover:bg-card/80"}`,
                children: [
                  lvl.locked && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "absolute inset-0 pointer-events-none",
                      style: {
                        background: "linear-gradient(135deg, transparent 0%, oklch(0.83 0.19 84 / 0.03) 100%)"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: `text-3xl w-12 h-12 flex items-center justify-center rounded-xl ${lvl.locked ? "bg-muted/60" : "bg-primary/15"}`,
                        children: lvl.locked ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "svg",
                          {
                            width: "20",
                            height: "20",
                            viewBox: "0 0 20 20",
                            fill: "none",
                            "aria-label": "Locked",
                            role: "img",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "rect",
                                {
                                  x: "4",
                                  y: "9",
                                  width: "12",
                                  height: "9",
                                  rx: "2",
                                  fill: "oklch(0.83 0.19 84)",
                                  opacity: "0.8"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M7 9V6a3 3 0 1 1 6 0v3",
                                  stroke: "oklch(0.83 0.19 84)",
                                  strokeWidth: "1.8",
                                  strokeLinecap: "round",
                                  opacity: "0.8"
                                }
                              )
                            ]
                          }
                        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: lvl.icon })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: `font-bold text-base ${lvl.locked ? "text-muted-foreground" : "text-foreground"}`,
                            children: lvl.label
                          }
                        ),
                        lvl.locked && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full",
                            style: {
                              background: "oklch(0.76 0.22 60 / 0.15)",
                              color: "oklch(0.76 0.22 60)",
                              border: "1px solid oklch(0.76 0.22 60 / 0.35)"
                            },
                            children: "🔒 Subscriber Only"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: `text-xs mt-0.5 ${lvl.locked ? "text-muted-foreground/60" : "text-muted-foreground"}`,
                          children: lvl.desc
                        }
                      )
                    ] }),
                    !lvl.locked && selectedLevel === lvl.id && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full bg-primary flex-shrink-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "svg",
                      {
                        width: "10",
                        height: "8",
                        viewBox: "0 0 10 8",
                        fill: "none",
                        "aria-label": "Selected",
                        role: "img",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "path",
                          {
                            d: "M1 4L3.5 6.5L9 1",
                            stroke: "oklch(0.08 0.005 260)",
                            strokeWidth: "1.8",
                            strokeLinecap: "round",
                            strokeLinejoin: "round"
                          }
                        )
                      }
                    ) })
                  ] })
                ]
              },
              lvl.id
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showUpgradeHint && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: -8, scale: 0.96 },
                animate: { opacity: 1, y: 0, scale: 1 },
                exit: { opacity: 0, y: -8, scale: 0.96 },
                transition: { duration: 0.2 },
                className: "w-full rounded-xl px-4 py-3 text-sm text-center",
                style: {
                  background: "oklch(0.76 0.22 60 / 0.08)",
                  border: "1px solid oklch(0.76 0.22 60 / 0.25)",
                  color: "oklch(0.76 0.22 60)"
                },
                "data-ocid": "onboarding.upgrade_hint",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Upgrade to Subscriber" }),
                  " ",
                  "to unlock Advanced & Pro levels."
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": "onboarding.start_training",
                onClick: handleStartTraining,
                disabled: !selectedLevel,
                className: `w-full py-4 rounded-xl font-bold text-base tracking-wide transition-all duration-300 ${selectedLevel ? "bg-primary text-background shadow-[0_4px_20px_oklch(0.68_0.25_180_/_0.4)] hover:shadow-[0_6px_28px_oklch(0.68_0.25_180_/_0.55)] active:scale-[0.98]" : "bg-muted text-muted-foreground cursor-not-allowed opacity-40"}`,
                children: "Start Training"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": "onboarding.back_button",
                onClick: () => {
                  setStep("gender");
                  setShowUpgradeHint(false);
                },
                className: "flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "svg",
                    {
                      width: "16",
                      height: "16",
                      viewBox: "0 0 16 16",
                      fill: "none",
                      "aria-label": "Go back",
                      role: "img",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          d: "M10 12L6 8l4-4",
                          stroke: "currentColor",
                          strokeWidth: "1.8",
                          strokeLinecap: "round",
                          strokeLinejoin: "round"
                        }
                      )
                    }
                  ),
                  "Back"
                ]
              }
            )
          ]
        },
        "level"
      )
    ] }) })
  ] });
}
export {
  OnboardingPage as default
};
