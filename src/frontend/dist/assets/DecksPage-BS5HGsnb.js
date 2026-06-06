import { j as jsxRuntimeExports, i as cn, e as useInternetIdentity, a as useWorkoutStore, g as useQuery, u as useNavigate, r as reactExports, m as motion, A as ArrowLeft, L as Logo, k as Lock, T as Trophy } from "./index-DqGOMkPn.js";
import { B as Button } from "./button-CQwKH8lW.js";
import { c as createActor } from "./backend-Bt8BEzt7.js";
import { u as useActor } from "./useActor-BRlpmEWG.js";
import { u as ue } from "./index-BxuF7LcC.js";
import { Z as Zap } from "./zap-ClIEObTD.js";
import { S as Sparkles } from "./sparkles-DtHmVhRH.js";
import { A as AnimatePresence } from "./index-BV1IzFVq.js";
import { X } from "./x-DtXDnd-V.js";
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "skeleton",
      className: cn("bg-accent animate-pulse rounded-md", className),
      ...props
    }
  );
}
function useAuth() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const { guestMode, setGuestMode } = useWorkoutStore();
  const mbwUser = localStorage.getItem("mbw_user");
  const isEmailAuth = mbwUser !== null;
  const isAuthenticated = loginStatus === "success" || isEmailAuth;
  const principal = (identity == null ? void 0 : identity.getPrincipal()) ?? null;
  const isSubscriber = localStorage.getItem("mbw_subscriber") === "true";
  const userTier = guestMode ? "guest" : isAuthenticated ? isSubscriber ? "subscriber" : "registered" : "guest";
  const continueAsGuest = () => setGuestMode(true);
  const exitGuestMode = () => setGuestMode(false);
  const setIsGuest = (v) => setGuestMode(v);
  return {
    isAuthenticated,
    login,
    logout: clear,
    loginStatus,
    principal,
    isGuest: guestMode,
    setIsGuest,
    continueAsGuest,
    exitGuestMode,
    userTier
  };
}
function useDecks() {
  const guestMode = useWorkoutStore((s) => s.guestMode);
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["decks", guestMode],
    queryFn: async () => {
      if (guestMode) return [];
      if (!actor) return [];
      return actor.getDecks();
    },
    enabled: !guestMode && !!actor && !isFetching
  });
}
const SUIT_ICONS = [
  { symbol: "♥", label: "Push Ups", color: "text-red-400" },
  { symbol: "♠", label: "Pull Ups", color: "text-foreground" },
  { symbol: "♦", label: "Rows", color: "text-red-400" },
  { symbol: "♣", label: "Dips", color: "text-foreground" }
];
const COMING_SOON = [
  {
    name: "Lower Body Deck",
    sub: "Squats · Lunges · Pistols",
    icon: "🦵",
    thumb: "/assets/cards/push-normal-6.png"
  },
  {
    name: "Core Deck",
    sub: "Planks · L-Sits · Hollow Body",
    icon: "🔥",
    thumb: "/assets/cards/push-diamond-2.png"
  },
  {
    name: "Full Body Deck",
    sub: "Complete Circuit · 52 Moves",
    icon: "⚡",
    thumb: "/assets/cards/push-wide-7.png"
  }
];
const LOCKED_DECKS = [
  {
    id: "locked-advanced-upper",
    name: "Upper Body Advanced",
    sub: "Muscle Ups · Archer Push Ups · L-Sit",
    thumb: "/assets/exercises/backside_of_card.png",
    level: "Advanced"
  },
  {
    id: "locked-pro-upper",
    name: "Upper Body Pro",
    sub: "One-Arm Push Ups · Planche · Front Lever",
    thumb: "/assets/exercises/backside_of_card.png",
    level: "Pro"
  }
];
function DecksPage() {
  const navigate = useNavigate();
  const { data: decks, isLoading } = useDecks();
  const { selectedDeck, setSelectedDeck } = useWorkoutStore();
  const { userTier } = useAuth();
  const [showUpgradeModal, setShowUpgradeModal] = reactExports.useState(false);
  const handleSelect = (deck) => {
    if (!deck.isAvailable) return;
    setSelectedDeck(deck);
  };
  const handleLockedDeckTap = () => {
    setShowUpgradeModal(true);
  };
  const handleUpgradeCTA = () => {
    ue("Coming Soon", {
      description: "Subscription plans will be available soon. Stay tuned!",
      duration: 4e3
    });
    setShowUpgradeModal(false);
  };
  const fallbackDecks = [
    {
      id: BigInt(1),
      name: "Upper Body Deck",
      description: "Push Ups · Pull Ups · Rows · Dips",
      isAvailable: true,
      cardCount: BigInt(52)
    }
  ];
  const displayDecks = decks && decks.length > 0 ? decks : fallbackDecks;
  const showLockedSection = userTier === "guest" || userTier === "registered";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-dvh bg-background flex flex-col max-w-[430px] mx-auto",
      "data-ocid": "decks.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "pointer-events-none fixed inset-0 max-w-[430px] mx-auto",
            style: {
              background: "radial-gradient(ellipse 80% 40% at 50% 0%, oklch(0.22 0.04 180 / 0.18) 0%, transparent 65%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "relative flex items-center gap-3 px-5 pt-12 pb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.button,
            {
              type: "button",
              initial: { opacity: 0, x: -10 },
              animate: { opacity: 1, x: 0 },
              whileTap: { scale: 0.92 },
              onClick: () => navigate({ to: "/home" }),
              className: "w-10 h-10 rounded-xl bg-card border border-border/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/45 transition-smooth",
              "data-ocid": "decks.back_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: -8 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.05 },
              className: "flex-1",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-black text-xl text-foreground tracking-tight", children: "Select Deck" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body", children: "Choose your workout deck" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, { size: "sm", iconOnly: true, className: "opacity-70" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 0.1 },
              className: "flex items-center gap-2 mb-3",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Zap,
                  {
                    className: "w-3.5 h-3.5",
                    style: { color: "oklch(0.68 0.25 180)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-sm text-foreground uppercase tracking-widest", children: "Available Decks" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-px flex-1",
                    style: {
                      background: "linear-gradient(to right, oklch(0.68 0.25 180 / 0.3), transparent)"
                    }
                  }
                )
              ]
            }
          ),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", "data-ocid": "decks.loading_state", children: [0, 1].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-full h-28 rounded-3xl" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: displayDecks.map((deck, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            UpperBodyDeckCard,
            {
              deck,
              index: i,
              selected: (selectedDeck == null ? void 0 : selectedDeck.id) === deck.id,
              onSelect: () => handleSelect(deck)
            },
            String(deck.id)
          )) })
        ] }),
        showLockedSection && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 mt-8 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 0.25 },
              className: "flex items-center gap-2 mb-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Lock,
                  {
                    className: "w-3.5 h-3.5",
                    style: { color: "oklch(0.75 0.18 60)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-sm text-foreground uppercase tracking-widest", children: "Subscriber Decks" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-px flex-1",
                    style: {
                      background: "linear-gradient(to right, oklch(0.75 0.18 60 / 0.3), transparent)"
                    }
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: LOCKED_DECKS.map(({ id, name, sub, thumb, level }, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            LockedDeckCard,
            {
              name,
              sub,
              thumb,
              level,
              index: i,
              onTap: handleLockedDeckTap
            },
            id
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 mt-8 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 0.35 },
              className: "flex items-center gap-2 mb-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Sparkles,
                  {
                    className: "w-3.5 h-3.5",
                    style: { color: "oklch(0.68 0.25 180)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-sm text-foreground uppercase tracking-widest", children: "Coming Soon" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-px flex-1",
                    style: {
                      background: "linear-gradient(to right, oklch(0.68 0.25 180 / 0.3), transparent)"
                    }
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2.5", children: COMING_SOON.map(({ name, sub, thumb }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -12 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: 0.4 + i * 0.07 },
              className: "flex items-center gap-3 rounded-2xl border px-4 py-3.5 cursor-not-allowed",
              style: {
                background: "oklch(0.15 0.008 260 / 0.7)",
                border: "1px solid oklch(0.24 0.01 260 / 0.4)"
              },
              "data-ocid": `decks.coming_soon.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-12 rounded-xl overflow-hidden shrink-0 opacity-40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: thumb,
                    alt: name,
                    className: "w-full h-full object-cover"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 opacity-50", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-sm text-foreground truncate", children: name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body", children: sub })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-[10px] font-display font-bold px-2.5 py-1 rounded-full shrink-0",
                    style: {
                      background: "oklch(0.22 0.01 260 / 0.6)",
                      color: "oklch(0.55 0.008 260)"
                    },
                    children: "SOON"
                  }
                )
              ]
            },
            name
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pb-10 pt-4 mt-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.4, ease: [0.16, 1, 0.3, 1] },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  className: "w-full h-14 font-display font-black text-lg tracking-[0.12em] rounded-2xl disabled:opacity-30 disabled:shadow-none",
                  style: {
                    boxShadow: selectedDeck ? "0 0 36px oklch(0.68 0.25 180 / 0.3), 0 4px 20px oklch(0 0 0 / 0.3)" : "none"
                  },
                  disabled: !selectedDeck,
                  onClick: () => selectedDeck && navigate({ to: "/workout/setup" }),
                  "data-ocid": "decks.continue_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5 mr-2" }),
                    "CONTINUE"
                  ]
                }
              ),
              !selectedDeck && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground font-body mt-3", children: "Select a deck above to continue" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showUpgradeModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
          UpgradeModal,
          {
            onClose: () => setShowUpgradeModal(false),
            onUpgrade: handleUpgradeCTA
          }
        ) })
      ]
    }
  );
}
function LockedDeckCard({
  name,
  sub,
  thumb,
  level,
  index,
  onTap
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.button,
    {
      type: "button",
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: {
        delay: 0.28 + index * 0.08,
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1]
      },
      whileTap: { scale: 0.97 },
      onClick: onTap,
      className: "w-full text-left rounded-3xl border transition-smooth relative overflow-hidden",
      style: {
        background: "oklch(0.16 0.01 260)",
        borderColor: "oklch(0.75 0.18 60 / 0.25)",
        boxShadow: "0 4px 20px oklch(0 0 0 / 0.3)"
      },
      "data-ocid": `decks.locked.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "absolute top-3 right-3 z-20 flex items-center gap-1 px-2.5 py-1 rounded-full",
            style: {
              background: "linear-gradient(135deg, oklch(0.72 0.18 60), oklch(0.62 0.20 55))",
              boxShadow: "0 2px 8px oklch(0.72 0.18 60 / 0.35)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Lock,
                {
                  className: "w-2.5 h-2.5",
                  style: { color: "oklch(0.15 0.02 60)" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-[9px] font-display font-black tracking-widest uppercase",
                  style: { color: "oklch(0.15 0.02 60)" },
                  children: "Subscriber Only"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 z-10 rounded-3xl pointer-events-none",
            style: { background: "oklch(0.08 0.005 260 / 0.5)" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 z-10 flex items-center justify-center pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-12 h-12 rounded-full flex items-center justify-center",
            style: {
              background: "oklch(0.75 0.18 60 / 0.15)",
              border: "1px solid oklch(0.75 0.18 60 / 0.3)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-5 h-5", style: { color: "oklch(0.75 0.18 60)" } })
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex gap-4 p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-20 h-24 rounded-2xl overflow-hidden flex-shrink-0",
              style: { border: "1px solid oklch(0.28 0.01 260 / 0.5)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: thumb, alt: name, className: "w-full h-full object-cover" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 flex flex-col gap-2 justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-black text-lg text-foreground leading-tight", children: name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body mt-0.5", children: sub })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-[10px] font-display font-bold px-2.5 py-1 rounded-full w-fit",
                style: {
                  background: "oklch(0.22 0.03 60 / 0.5)",
                  color: "oklch(0.72 0.18 60)",
                  border: "1px solid oklch(0.72 0.18 60 / 0.3)"
                },
                children: level.toUpperCase()
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function UpgradeModal({
  onClose,
  onUpgrade
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      className: "fixed inset-0 z-50 flex items-end justify-center px-4 pb-6",
      style: { background: "oklch(0 0 0 / 0.75)" },
      onClick: onClose,
      "data-ocid": "decks.upgrade.dialog",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 60, scale: 0.97 },
          animate: { opacity: 1, y: 0, scale: 1 },
          exit: { opacity: 0, y: 40, scale: 0.97 },
          transition: { ease: [0.16, 1, 0.3, 1], duration: 0.42 },
          onClick: (e) => e.stopPropagation(),
          className: "w-full max-w-[420px] rounded-3xl overflow-hidden",
          style: {
            background: "oklch(0.14 0.012 260)",
            border: "1px solid oklch(0.75 0.18 60 / 0.25)",
            boxShadow: "0 -4px 60px oklch(0.75 0.18 60 / 0.12), 0 20px 60px oklch(0 0 0 / 0.6)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-1 w-full",
                style: {
                  background: "linear-gradient(90deg, transparent, oklch(0.72 0.18 60), oklch(0.68 0.25 180), transparent)"
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 pt-6 pb-7", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-10 h-10 rounded-2xl flex items-center justify-center",
                      style: {
                        background: "linear-gradient(135deg, oklch(0.72 0.18 60 / 0.2), oklch(0.62 0.20 55 / 0.1))",
                        border: "1px solid oklch(0.72 0.18 60 / 0.4)"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Lock,
                        {
                          className: "w-5 h-5",
                          style: { color: "oklch(0.75 0.18 60)" }
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black text-xl text-foreground tracking-tight", children: "Unlock All Decks" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    className: "w-8 h-8 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors",
                    style: { background: "oklch(0.20 0.008 260)" },
                    "data-ocid": "decks.upgrade.close_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body leading-relaxed mb-6", children: "Upgrade to Subscriber to access Advanced and Pro level decks, full workout history, and streak tracking." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2 mb-7", children: [
                "All Advanced & Pro decks",
                "Full workout history",
                "Streak tracking",
                "Priority access to new decks"
              ].map((perk) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-4 h-4 rounded-full flex items-center justify-center shrink-0",
                    style: { background: "oklch(0.68 0.25 180 / 0.2)" },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Sparkles,
                      {
                        className: "w-2.5 h-2.5",
                        style: { color: "oklch(0.68 0.25 180)" }
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground font-body", children: perk })
              ] }, perk)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onUpgrade,
                  className: "w-full h-14 rounded-2xl font-display font-black text-base tracking-[0.1em] transition-smooth mb-3",
                  style: {
                    background: "linear-gradient(135deg, oklch(0.72 0.18 60), oklch(0.62 0.20 55))",
                    color: "oklch(0.10 0.01 60)",
                    boxShadow: "0 0 36px oklch(0.72 0.18 60 / 0.35), 0 4px 20px oklch(0 0 0 / 0.3)"
                  },
                  "data-ocid": "decks.upgrade.confirm_button",
                  children: "Upgrade to Subscriber"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "w-full h-10 rounded-xl font-body text-sm text-muted-foreground hover:text-foreground transition-colors",
                  "data-ocid": "decks.upgrade.cancel_button",
                  children: "Maybe Later"
                }
              )
            ] })
          ]
        }
      )
    }
  );
}
function UpperBodyDeckCard({
  deck,
  index,
  selected,
  onSelect
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.button,
    {
      type: "button",
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: {
        delay: index * 0.08,
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1]
      },
      whileTap: { scale: 0.97 },
      onClick: onSelect,
      disabled: !deck.isAvailable,
      className: "w-full text-left rounded-3xl border transition-smooth relative overflow-hidden",
      style: {
        background: selected ? "oklch(0.17 0.015 180 / 0.6)" : "oklch(0.16 0.01 260)",
        borderColor: selected ? "oklch(0.68 0.25 180 / 0.65)" : "oklch(0.28 0.01 260 / 0.6)",
        boxShadow: selected ? "0 0 40px oklch(0.68 0.25 180 / 0.25), inset 0 1px 0 oklch(0.68 0.25 180 / 0.15)" : "0 4px 20px oklch(0 0 0 / 0.3)"
      },
      "data-ocid": `decks.item.${index + 1}`,
      children: [
        selected && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none",
            style: {
              background: "radial-gradient(ellipse at 20% 50%, oklch(0.68 0.25 180 / 0.1) 0%, transparent 70%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex gap-4 p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-20 h-24 rounded-2xl overflow-hidden",
                style: {
                  border: selected ? "1px solid oklch(0.68 0.25 180 / 0.4)" : "1px solid oklch(0.28 0.01 260 / 0.5)",
                  boxShadow: selected ? "0 4px 20px oklch(0.68 0.25 180 / 0.2)" : "none"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: "/assets/exercises/backside_of_card.png",
                    alt: "Upper Body Deck",
                    className: "w-full h-full object-cover"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full flex items-center justify-center",
                style: {
                  background: selected ? "oklch(0.68 0.25 180)" : "oklch(0.22 0.01 260)",
                  border: "2px solid oklch(0.12 0.008 260)"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Trophy,
                  {
                    className: "w-3 h-3",
                    style: {
                      color: selected ? "oklch(0.12 0.008 260)" : "oklch(0.55 0.008 260)"
                    }
                  }
                )
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 flex flex-col gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-black text-lg text-foreground leading-tight", children: deck.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-body mt-0.5", children: [
                  Number(deck.cardCount),
                  " cards · 4 muscle groups"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-5 h-5 rounded-full border-2 shrink-0 mt-0.5 flex items-center justify-center transition-smooth",
                  style: {
                    borderColor: selected ? "oklch(0.68 0.25 180)" : "oklch(0.40 0.01 260)",
                    background: selected ? "oklch(0.68 0.25 180)" : "transparent"
                  },
                  children: selected && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      initial: { scale: 0 },
                      animate: { scale: 1 },
                      className: "w-2 h-2 rounded-full",
                      style: { background: "oklch(0.12 0.008 260)" }
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-1.5", children: SUIT_ICONS.map(({ symbol, label, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-xl py-1.5 px-1 flex flex-col items-center gap-0.5",
                style: {
                  background: selected ? "oklch(0.12 0.008 260 / 0.5)" : "oklch(0.22 0.01 260 / 0.5)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `text-base leading-none font-display ${selected ? color : "text-muted-foreground"}`,
                      children: symbol
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-muted-foreground font-body leading-tight text-center", children: label.split(" ")[0] })
                ]
              },
              label
            )) })
          ] })
        ] })
      ]
    }
  );
}
export {
  DecksPage as default
};
