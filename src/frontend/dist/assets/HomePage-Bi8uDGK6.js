import { c as createLucideIcon, u as useNavigate, j as jsxRuntimeExports, i as cn, T as Trophy, m as motion, r as reactExports, k as Lock } from "./index-DqGOMkPn.js";
import { H as House } from "./house-C3y0ia5b.js";
import { D as Dumbbell, U as User, u as useProfile, a as useWorkoutHistory } from "./use-workout-history-D3R1GMYX.js";
import { B as Button } from "./button-CQwKH8lW.js";
import { A as AnimatePresence } from "./index-BV1IzFVq.js";
import { X } from "./x-DtXDnd-V.js";
import { Z as Zap } from "./zap-ClIEObTD.js";
import { C as ChevronRight } from "./chevron-right-WyRT5wFt.js";
import "./backend-Bt8BEzt7.js";
import "./useActor-BRlpmEWG.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      key: "11g9vi"
    }
  ]
];
const Bell = createLucideIcon("bell", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "18", x2: "18", y1: "20", y2: "10", key: "1xfpm4" }],
  ["line", { x1: "12", x2: "12", y1: "20", y2: "4", key: "be30l9" }],
  ["line", { x1: "6", x2: "6", y1: "20", y2: "14", key: "1r4le6" }]
];
const ChartNoAxesColumn = createLucideIcon("chart-no-axes-column", __iconNode);
const ACCENT = "oklch(0.68 0.25 180)";
function BottomNav({ active }) {
  const navigate = useNavigate();
  const items = [
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "w-5 h-5" }),
      label: "Home",
      to: "/home",
      ocid: "bottom-nav.home_tab"
    },
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Dumbbell, { className: "w-5 h-5" }),
      label: "Workouts",
      to: "/decks",
      ocid: "bottom-nav.workouts_tab"
    },
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-5 h-5" }),
      label: "Achievements",
      to: "/achievements",
      ocid: "bottom-nav.achievements_tab"
    },
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { className: "w-5 h-5" }),
      label: "Progress",
      to: "/profile",
      ocid: "bottom-nav.progress_tab"
    },
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-5 h-5" }),
      label: "Profile",
      to: "/profile",
      ocid: "bottom-nav.profile_tab"
    }
  ];
  const activeKeys = {
    home: "Home",
    workouts: "Workouts",
    achievements: "Achievements",
    progress: "Progress",
    profile: "Profile"
  };
  const activeLabel = activeKeys[active];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "nav",
    {
      className: "fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto z-50",
      style: {
        background: "oklch(0.10 0.008 260 / 0.97)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderTop: "1px solid oklch(0.22 0.01 260 / 0.6)"
      },
      "aria-label": "Bottom navigation",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-around px-2 py-2 pb-safe", children: items.map((item) => {
        const isActive = item.label === activeLabel;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => navigate({
              to: item.to
            }),
            className: cn(
              "flex flex-col items-center gap-0.5 px-4 py-2 rounded-2xl transition-smooth",
              isActive ? "" : "opacity-45 hover:opacity-65"
            ),
            style: isActive ? { color: ACCENT } : { color: "white" },
            "data-ocid": item.ocid,
            "aria-label": item.label,
            children: [
              item.icon,
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-[10px] uppercase tracking-wider", children: item.label })
            ]
          },
          item.label
        );
      }) })
    }
  );
}
const STEPS = [
  {
    number: 1,
    title: "Warm Up",
    description: "Start with a brief warm-up to prepare your body before drawing your first card."
  },
  {
    number: 2,
    title: "Shuffle the Deck",
    description: "Your deck is automatically shuffled at the start of every workout — no two sessions are the same."
  },
  {
    number: 3,
    title: "Draw a Card",
    description: 'Tap "Next Card" to draw the top card from the deck.'
  },
  {
    number: 4,
    title: "Perform the Exercise",
    description: "Complete the exercise shown on the card — reps, exercise name, and illustration are all displayed."
  },
  {
    number: 5,
    title: "Keep Going",
    description: "Draw the next card and repeat until your workout is complete."
  }
];
function HowToPlayModal({ open, onClose }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.22 },
        className: "fixed inset-0 z-40",
        style: { background: "oklch(0 0 0 / 0.72)" },
        onClick: onClose,
        "aria-hidden": "true"
      },
      "backdrop"
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 32 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 32 },
        transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] },
        className: "fixed inset-x-0 bottom-0 z-50 max-w-[430px] mx-auto rounded-t-3xl overflow-hidden",
        style: {
          background: "oklch(0.14 0.012 260)",
          border: "1px solid oklch(0.26 0.01 260 / 0.6)",
          borderBottom: "none",
          boxShadow: "0 -16px 60px oklch(0 0 0 / 0.55)"
        },
        "aria-modal": "true",
        "aria-label": "How to Play",
        "data-ocid": "how-to-play.dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center pt-3 pb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-9 h-1 rounded-full",
              style: { background: "oklch(0.36 0.01 260 / 0.7)" }
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-6 pt-2 pb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-[10px] font-display font-bold tracking-[0.22em] uppercase mb-0.5",
                  style: { color: "oklch(0.68 0.25 180)" },
                  children: "Upper Body Deck"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black text-xl text-foreground tracking-tight", children: "How to Play" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onClose,
                className: "w-9 h-9 rounded-xl flex items-center justify-center transition-smooth text-muted-foreground hover:text-foreground",
                style: {
                  background: "oklch(0.20 0.01 260)",
                  border: "1px solid oklch(0.30 0.01 260 / 0.5)"
                },
                "aria-label": "Close",
                "data-ocid": "how-to-play.close_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "mx-6 h-px",
              style: { background: "oklch(0.26 0.01 260 / 0.5)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 pt-5 pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "flex flex-col gap-0", children: STEPS.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-7 h-7 rounded-full flex items-center justify-center shrink-0",
                  style: {
                    background: i === 0 ? "oklch(0.68 0.25 180)" : "oklch(0.20 0.01 260)",
                    border: `1px solid ${i === 0 ? "oklch(0.68 0.25 180)" : "oklch(0.32 0.01 260 / 0.6)"}`
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "font-display font-black text-[11px]",
                      style: {
                        color: i === 0 ? "oklch(0.12 0.008 260)" : "oklch(0.65 0.008 260)"
                      },
                      children: step.number
                    }
                  )
                }
              ),
              i < STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-px flex-1 min-h-[20px]",
                  style: {
                    background: "oklch(0.28 0.01 260 / 0.5)"
                  }
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `pb-5 flex-1 min-w-0 ${i === STEPS.length - 1 ? "pb-1" : ""}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-sm text-foreground leading-tight mb-1", children: step.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body leading-relaxed", children: step.description })
                ]
              }
            )
          ] }, step.number)) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-6 mb-6 mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-2xl px-4 py-3.5",
              style: {
                background: "oklch(0.68 0.25 180 / 0.08)",
                border: "1px solid oklch(0.68 0.25 180 / 0.2)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-[10px] font-display font-bold tracking-[0.18em] uppercase mb-1",
                    style: { color: "oklch(0.68 0.25 180)" },
                    children: "Fun Tip"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body leading-relaxed", children: "Share the deck with a friend and complete it together." })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 pb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "w-full h-12 font-display font-black text-sm tracking-[0.15em] rounded-2xl",
              onClick: onClose,
              "data-ocid": "how-to-play.confirm_button",
              children: "GOT IT"
            }
          ) })
        ]
      },
      "sheet"
    )
  ] }) });
}
const COMING_SOON_DECKS = [
  { id: "lower-body", label: "LOWER BODY" },
  { id: "core", label: "CORE" }
];
function HomePage() {
  const navigate = useNavigate();
  const [howToPlayOpen, setHowToPlayOpen] = reactExports.useState(false);
  const { data: profile } = useProfile();
  const { data: history } = useWorkoutHistory();
  const username = (profile == null ? void 0 : profile.username) ?? "Athlete";
  const workoutCount = (history == null ? void 0 : history.length) ?? 0;
  const totalCards = (history == null ? void 0 : history.reduce((acc, e) => acc + Number(e.cardsCompleted), 0)) ?? 0;
  const totalCalories = (history == null ? void 0 : history.reduce((acc, e) => acc + Number(e.caloriesBurned), 0)) ?? 0;
  const streak = Number((profile == null ? void 0 : profile.currentStreak) ?? 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      HowToPlayModal,
      {
        open: howToPlayOpen,
        onClose: () => setHowToPlayOpen(false)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "min-h-dvh bg-background flex flex-col max-w-[430px] mx-auto overflow-x-hidden pb-24",
        "data-ocid": "home.page",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 pointer-events-none max-w-[430px] mx-auto",
              style: {
                background: "radial-gradient(ellipse 80% 40% at 50% 0%, oklch(0.22 0.04 180 / 0.22) 0%, transparent 55%)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "relative flex items-center justify-between px-5 pt-12 pb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-muted/40 flex items-center justify-center shrink-0 border border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-5 h-5 text-white/60" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground font-body leading-none mb-0.5", children: "Welcome back," }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-black text-sm text-white leading-none", children: [
                  username,
                  "."
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "w-9 h-9 rounded-xl bg-card/80 border border-border/60 flex items-center justify-center text-white hover:border-primary/50 hover:text-primary transition-smooth",
                onClick: () => setHowToPlayOpen(true),
                "data-ocid": "home.notification_button",
                "aria-label": "Notifications",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-[22px] h-[22px]" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
              className: "flex flex-col items-center py-6",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: "/assets/images/mbw-logo-white-icon.png",
                    alt: "MyBodyWeight logo",
                    className: "w-16 h-16 object-contain",
                    onError: (e) => {
                      e.currentTarget.style.display = "none";
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-black uppercase tracking-widest text-white mt-2 font-display", children: "MYBODYWEIGHT" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.section,
            {
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.1, duration: 0.5 },
              className: "mb-6",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-display font-bold uppercase tracking-widest text-muted-foreground px-5 mb-3", children: "CHOOSE YOUR DECK" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex flex-row gap-4 overflow-x-auto px-5 pb-2",
                    style: { scrollbarWidth: "none" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: () => navigate({ to: "/decks" }),
                          className: "flex-shrink-0 w-[150px] h-[180px] rounded-2xl overflow-hidden relative flex flex-col justify-end",
                          style: {
                            background: "linear-gradient(155deg, oklch(0.18 0.02 180) 0%, oklch(0.12 0.015 200) 100%)",
                            border: "1px solid oklch(0.68 0.25 180 / 0.5)",
                            boxShadow: "0 0 24px oklch(0.68 0.25 180 / 0.2)"
                          },
                          "data-ocid": "home.upper_body_deck_card",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "img",
                              {
                                src: "/assets/exercises/backside_of_card.png",
                                alt: "Upper Body Deck",
                                className: "absolute inset-0 w-full h-full object-cover opacity-40"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "div",
                              {
                                className: "relative p-3",
                                style: {
                                  background: "linear-gradient(to top, oklch(0.08 0.01 200 / 0.95), transparent)"
                                },
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-black text-sm text-white uppercase tracking-wide", children: "UPPER BODY" }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-display font-bold mt-0.5 text-primary", children: "52 CARDS" })
                                ]
                              }
                            )
                          ]
                        }
                      ),
                      COMING_SOON_DECKS.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "flex-shrink-0 w-[150px] h-[180px] rounded-2xl overflow-hidden relative flex flex-col justify-end",
                          style: {
                            background: "oklch(0.13 0.008 260)",
                            border: "1px solid oklch(0.22 0.01 260 / 0.5)"
                          },
                          "data-ocid": `home.coming_soon_deck.${i + 1}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-8 h-8 text-muted-foreground/30" }) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2.5 right-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: "text-[9px] font-display font-black px-2 py-0.5 rounded-full uppercase tracking-wider",
                                style: {
                                  background: "oklch(0.68 0.25 180 / 0.15)",
                                  color: "oklch(0.68 0.25 180)",
                                  border: "1px solid oklch(0.68 0.25 180 / 0.3)"
                                },
                                children: "SOON"
                              }
                            ) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "div",
                              {
                                className: "relative p-3",
                                style: {
                                  background: "linear-gradient(to top, oklch(0.08 0.01 260 / 0.95), transparent)"
                                },
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-black text-sm text-white/60 uppercase tracking-wide", children: d.label }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground font-display font-bold mt-0.5", children: "52 CARDS" })
                                ]
                              }
                            )
                          ]
                        },
                        d.id
                      ))
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.section,
            {
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.18, duration: 0.45 },
              className: "px-5 mb-6",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  className: "w-full rounded-2xl bg-card p-4 flex items-center gap-3 text-left border border-primary/20",
                  onClick: () => navigate({ to: "/decks" }),
                  "data-ocid": "home.daily_challenge_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-7 h-7 shrink-0 text-primary" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-black text-sm text-white uppercase tracking-wide", children: "DAILY CHALLENGE" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body mt-0.5", children: "Test yourself. Earn rewards." })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5 text-muted-foreground shrink-0" })
                  ]
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.section,
            {
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.26, duration: 0.45 },
              className: "px-5 mb-6",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-display font-bold uppercase tracking-widest text-muted-foreground mb-3", children: "STATS OVERVIEW" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    StatCard,
                    {
                      value: workoutCount,
                      label: "WORKOUTS",
                      ocid: "home.stats.workouts"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    StatCard,
                    {
                      value: totalCards,
                      label: "CARDS DRAWN",
                      ocid: "home.stats.cards"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    StatCard,
                    {
                      value: totalCalories,
                      label: "CALORIES",
                      suffix: "kcal",
                      ocid: "home.stats.calories"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    StatCard,
                    {
                      value: streak,
                      label: "STREAK",
                      suffix: "🔥",
                      ocid: "home.stats.streak"
                    }
                  )
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "mt-auto px-5 pb-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-body", children: [
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
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BottomNav, { active: "home" })
  ] });
}
function StatCard({
  value,
  label,
  suffix,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-xl bg-card p-4 flex flex-col",
      style: { border: "1px solid oklch(0.22 0.01 260 / 0.5)" },
      "data-ocid": ocid,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-black text-2xl text-white leading-none", children: [
          value.toLocaleString(),
          suffix ? ` ${suffix}` : ""
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-display font-bold uppercase tracking-wider mt-1.5", children: label })
      ]
    }
  );
}
export {
  HomePage as default
};
