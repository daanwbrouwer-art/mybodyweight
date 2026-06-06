import { c as createLucideIcon, u as useNavigate, e as useInternetIdentity, j as jsxRuntimeExports, A as ArrowLeft, L as Logo, m as motion } from "./index-DqGOMkPn.js";
import { B as Button } from "./button-CQwKH8lW.js";
import { u as useProfile, a as useWorkoutHistory, U as User, D as Dumbbell } from "./use-workout-history-D3R1GMYX.js";
import { F as Flame, C as Clock } from "./flame-ClYgZPRQ.js";
import { C as ChevronRight } from "./chevron-right-WyRT5wFt.js";
import "./backend-Bt8BEzt7.js";
import "./useActor-BRlpmEWG.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
];
const LogOut = createLucideIcon("log-out", __iconNode);
function ProfilePage() {
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
  const totalWorkouts = (profile == null ? void 0 : profile.totalWorkouts) ?? BigInt(0);
  const totalCalories = (profile == null ? void 0 : profile.totalCalories) ?? BigInt(0);
  const totalReps = history ? history.reduce((sum, h) => sum + Number(h.totalReps), 0) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-dvh bg-background flex flex-col max-w-[430px] mx-auto",
      "data-ocid": "profile.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none max-w-[430px] mx-auto",
            style: {
              background: "radial-gradient(ellipse 80% 40% at 50% 0%, oklch(0.22 0.04 180 / 0.22) 0%, transparent 60%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "relative z-10 flex items-center justify-between px-5 pt-12 pb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "w-9 h-9 rounded-xl bg-card/80 border border-border/60 flex items-center justify-center text-muted-foreground hover:border-primary/50 hover:text-primary transition-smooth",
              onClick: () => navigate({ to: "/home" }),
              "data-ocid": "profile.back_button",
              "aria-label": "Go back to home",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, { size: "sm", showIcon: true }),
          isLoggedIn ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "w-9 h-9 rounded-xl bg-card/80 border border-border/60 flex items-center justify-center text-muted-foreground hover:border-destructive/50 hover:text-destructive transition-smooth",
              onClick: handleLogout,
              "data-ocid": "profile.logout_button",
              "aria-label": "Log out",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" })
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col flex-1 px-5 pb-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
              className: "flex flex-col items-center pt-4 pb-8",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-20 h-20 rounded-full flex items-center justify-center mb-4",
                    style: {
                      background: "oklch(0.17 0.015 180 / 0.3)",
                      border: "2px solid oklch(0.68 0.25 180 / 0.4)",
                      boxShadow: "0 0 40px oklch(0.68 0.25 180 / 0.18)"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      User,
                      {
                        className: "w-9 h-9",
                        style: { color: "oklch(0.68 0.25 180)" }
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-black text-2xl text-foreground mb-1", children: (profile == null ? void 0 : profile.username) ?? (isLoggedIn ? "Athlete" : "Guest") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-[11px] font-display font-bold px-3 py-1 rounded-full",
                    style: {
                      background: isLoggedIn ? "oklch(0.68 0.25 180 / 0.12)" : "oklch(0.28 0.01 260 / 0.6)",
                      color: isLoggedIn ? "oklch(0.68 0.25 180)" : "oklch(0.62 0.008 260)",
                      border: isLoggedIn ? "1px solid oklch(0.68 0.25 180 / 0.25)" : "1px solid oklch(0.32 0.01 260 / 0.5)"
                    },
                    children: isLoggedIn ? "REGISTERED" : "GUEST MODE"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.12, duration: 0.45 },
              className: "grid grid-cols-3 gap-3 mb-6",
              children: [
                {
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Dumbbell, { className: "w-4 h-4" }),
                  label: "Workouts",
                  value: totalWorkouts.toString()
                },
                {
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-4 h-4" }),
                  label: "Calories",
                  value: totalCalories.toString()
                },
                {
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4" }),
                  label: "Total Reps",
                  value: totalReps.toString()
                }
              ].map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-2xl p-3.5 flex flex-col items-center gap-1.5 text-center",
                  style: {
                    background: "oklch(0.16 0.01 260)",
                    border: "1px solid oklch(0.26 0.01 260 / 0.6)"
                  },
                  "data-ocid": `profile.stat.item.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(0.68 0.25 180)" }, children: stat.icon }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-black text-xl text-foreground leading-none", children: stat.value }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-body text-muted-foreground uppercase tracking-wider", children: stat.label })
                  ]
                },
                stat.label
              ))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.22, duration: 0.45 },
              className: "mb-6",
              "data-ocid": "profile.history_section",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-[10px] uppercase tracking-widest mb-3 text-muted-foreground", children: "Past Sessions" }),
                history && history.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "rounded-2xl overflow-hidden",
                    style: {
                      background: "oklch(0.16 0.01 260)",
                      border: "1px solid oklch(0.26 0.01 260 / 0.5)"
                    },
                    children: [...history].sort((a, b) => Number(b.completedAt) - Number(a.completedAt)).slice(0, 10).map((entry, i) => {
                      const date = new Date(Number(entry.completedAt));
                      const dateStr = date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric"
                      });
                      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "flex items-center justify-between px-5 py-3.5",
                          style: {
                            borderBottom: i < Math.min(history.length, 10) - 1 ? "1px solid oklch(0.22 0.01 260 / 0.5)" : "none"
                          },
                          "data-ocid": `profile.history.item.${i + 1}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5 min-w-0", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-sm text-foreground", children: dateStr }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-body", children: [
                                Number(entry.cardsCompleted),
                                " cards ·",
                                " ",
                                Number(entry.caloriesBurned),
                                " kcal"
                              ] })
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  className: "font-display font-black text-base",
                                  style: { color: "oklch(0.68 0.25 180)" },
                                  children: Number(entry.totalReps)
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  className: "text-[10px] font-body uppercase tracking-wide",
                                  style: { color: "oklch(0.5 0.008 260)" },
                                  children: "reps"
                                }
                              )
                            ] })
                          ]
                        },
                        entry.id
                      );
                    })
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "rounded-2xl px-5 py-8 text-center",
                    style: {
                      background: "oklch(0.16 0.01 260)",
                      border: "1px solid oklch(0.26 0.01 260 / 0.4)"
                    },
                    "data-ocid": "profile.history.empty_state",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-sm text-foreground mb-1", children: "No workouts yet" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body", children: "Complete your first workout to see your history here." })
                    ]
                  }
                )
              ]
            }
          ),
          !isLoggedIn && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.3, duration: 0.4 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  className: "w-full h-14 font-display font-black text-base tracking-wider rounded-2xl",
                  style: {
                    boxShadow: "0 0 32px oklch(0.68 0.25 180 / 0.28), 0 4px 16px oklch(0 0 0 / 0.25)"
                  },
                  onClick: () => navigate({ to: "/onboarding/auth" }),
                  "data-ocid": "profile.sign_in_button",
                  children: "Sign In to Save Progress"
                }
              )
            }
          ),
          isLoggedIn && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.button,
            {
              type: "button",
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 0.35 },
              className: "w-full rounded-2xl px-5 py-4 flex items-center gap-3 hover:border-primary/40 transition-smooth",
              style: {
                background: "oklch(0.16 0.01 260)",
                border: "1px solid oklch(0.26 0.01 260 / 0.5)"
              },
              onClick: () => navigate({ to: "/decks" }),
              "data-ocid": "profile.start_workout_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
                    style: { background: "oklch(0.68 0.25 180 / 0.12)" },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Dumbbell,
                      {
                        className: "w-4 h-4",
                        style: { color: "oklch(0.68 0.25 180)" }
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-sm text-foreground flex-1 text-left", children: "Start New Workout" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground/60" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "relative z-10 px-5 pb-10 text-center mt-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-body", children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          ".",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "hover:text-primary transition-smooth",
              children: "Built with love using caffeine.ai"
            }
          )
        ] }) })
      ]
    }
  );
}
export {
  ProfilePage as default
};
