import { c as createLucideIcon, u as useNavigate, j as jsxRuntimeExports, m as motion } from "./index-DqGOMkPn.js";
import { S as Sparkles } from "./sparkles-DtHmVhRH.js";
import { Z as Zap } from "./zap-ClIEObTD.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "12", height: "12", x: "2", y: "10", rx: "2", ry: "2", key: "6agr2n" }],
  [
    "path",
    { d: "m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6", key: "1o487t" }
  ],
  ["path", { d: "M6 18h.01", key: "uhywen" }],
  ["path", { d: "M10 14h.01", key: "ssrbsk" }],
  ["path", { d: "M15 6h.01", key: "cblpky" }],
  ["path", { d: "M18 9h.01", key: "2061c0" }]
];
const Dices = createLucideIcon("dices", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
      key: "zw3jo"
    }
  ],
  [
    "path",
    {
      d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
      key: "1wduqc"
    }
  ],
  [
    "path",
    {
      d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
      key: "kqbvx6"
    }
  ]
];
const Layers = createLucideIcon("layers", __iconNode);
function WelcomeTipsPage() {
  const navigate = useNavigate();
  const tips = [
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Dices, { className: "w-6 h-6" }),
      title: "Draw a Card",
      description: "Each card reveals a bodyweight exercise and rep count."
    },
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-6 h-6" }),
      title: "Choose Your Session",
      description: "Pick 10, 20, or 52 cards — or set a custom number."
    },
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-6 h-6" }),
      title: "Special Cards",
      description: "ACE doubles your reps. KING cuts them in half."
    },
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-6 h-6" }),
      title: "Joker Alert",
      description: "Joker cards trigger special bonus challenges. Dig deep!"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-dvh flex flex-col max-w-[430px] mx-auto px-6 relative overflow-hidden bg-background",
      "data-ocid": "welcome-tips.page",
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col flex-1 pt-16 pb-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: -10 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5 },
              className: "flex justify-center mb-8",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: "/assets/images/mbw-logo-white-icon.png",
                  alt: "MyBodyWeight",
                  className: "w-14 h-14 object-contain",
                  style: {
                    filter: "drop-shadow(0 0 10px oklch(0.68 0.25 180 / 0.3))"
                  }
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.h1,
            {
              initial: { opacity: 0, y: 14 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.1, duration: 0.5 },
              className: "font-display font-black text-3xl uppercase tracking-widest-custom leading-none text-white text-center mb-10",
              children: "Welcome to MyBodyWeight!"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-4 mb-8", children: tips.map((tip, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.2 + index * 0.1, duration: 0.5 },
              className: "rounded-2xl p-5 flex items-start gap-4 bg-card border-l-[3px] border-primary",
              "data-ocid": `welcome-tips.tip.${index + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-primary/15 text-primary", children: tip.icon }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-white text-base mb-1", children: tip.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-white/55 leading-relaxed", children: tip.description })
                ] })
              ]
            },
            tip.title
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 0.7, duration: 0.4 },
              className: "mt-auto",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => navigate({ to: "/home" }),
                  className: "w-full h-14 rounded-full flex items-center justify-center font-display font-bold text-sm tracking-wide bg-primary text-background transition-smooth hover:opacity-90 active:scale-[0.98]",
                  "data-ocid": "welcome-tips.lets_go_button",
                  children: "Let's Go!"
                }
              )
            }
          )
        ] })
      ]
    }
  );
}
export {
  WelcomeTipsPage as default
};
