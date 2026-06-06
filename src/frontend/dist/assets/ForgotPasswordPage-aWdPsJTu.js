import { u as useNavigate, r as reactExports, j as jsxRuntimeExports, A as ArrowLeft, m as motion } from "./index-DqGOMkPn.js";
import { c as createActor } from "./backend-Bt8BEzt7.js";
import { u as useActor } from "./useActor-BRlpmEWG.js";
function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { actor } = useActor(createActor);
  const [email, setEmail] = reactExports.useState("");
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [sent, setSent] = reactExports.useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    try {
      await actor.requestPasswordReset(email);
    } catch {
    } finally {
      setIsLoading(false);
      setSent(true);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-dvh flex flex-col max-w-[430px] mx-auto relative overflow-hidden bg-background",
      "data-ocid": "forgot-password.page",
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "relative z-10 flex items-center justify-between px-5 pt-12 pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "w-10 h-10 rounded-2xl bg-card/60 border border-border/40 flex items-center justify-center text-white/50 hover:text-white hover:border-primary/40 transition-smooth",
              onClick: () => navigate({ to: "/onboarding/auth" }),
              "data-ocid": "forgot-password.back_button",
              "aria-label": "Go back",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "/assets/images/mbw-logo-white-icon.png",
              alt: "MyBodyWeight",
              className: "w-10 h-10 object-contain",
              style: { filter: "drop-shadow(0 0 10px oklch(0.68 0.25 180 / 0.3))" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 flex flex-col flex-1 px-6 pt-6 pb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 18 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
            className: "flex flex-col flex-1",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-black text-3xl uppercase tracking-widest-custom leading-none text-white mb-1", children: "RESET PASSWORD" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-white/45 leading-relaxed", children: "Enter your email and we'll send you a reset link." })
              ] }),
              sent ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 10 },
                  animate: { opacity: 1, y: 0 },
                  className: "flex flex-col items-center text-center mt-8",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-white mb-4", children: "If an account with that email exists, a reset link has been sent." }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => navigate({ to: "/onboarding/auth" }),
                        className: "font-body text-sm font-bold text-primary transition-smooth hover:opacity-75",
                        "data-ocid": "forgot-password.back_to_sign_in_link",
                        children: "Back to Sign In"
                      }
                    )
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: "forgot-email",
                      className: "font-display text-xs font-bold uppercase tracking-widest text-white/50 mb-2 block",
                      children: "Email"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "w-full h-14 rounded-2xl flex items-center px-4 gap-3 transition-smooth focus-within:border-primary/60",
                      style: {
                        background: "oklch(0.17 0.012 260)",
                        border: "1px solid oklch(0.28 0.01 260)"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "svg",
                          {
                            width: "16",
                            height: "12",
                            viewBox: "0 0 18 14",
                            fill: "none",
                            className: "shrink-0",
                            role: "img",
                            "aria-hidden": "true",
                            style: { color: "oklch(0.55 0.008 260)" },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "M1 1h16v12H1V1zm0 0l8 7 8-7",
                                stroke: "currentColor",
                                strokeWidth: "1.5",
                                strokeLinecap: "round",
                                strokeLinejoin: "round"
                              }
                            )
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            id: "forgot-email",
                            type: "email",
                            value: email,
                            onChange: (e) => setEmail(e.target.value),
                            placeholder: "you@example.com",
                            className: "flex-1 bg-transparent font-body text-sm text-white placeholder:text-white/25 outline-none",
                            "data-ocid": "forgot-password.email_input"
                          }
                        )
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "submit",
                    disabled: isLoading,
                    className: "w-full h-14 rounded-full flex items-center justify-center font-display font-bold text-sm tracking-wide bg-primary text-background transition-smooth hover:opacity-90 active:scale-[0.98]",
                    "data-ocid": "forgot-password.submit_button",
                    children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" }),
                      "Sending..."
                    ] }) : "Send Reset Link"
                  }
                )
              ] })
            ]
          }
        ) })
      ]
    }
  );
}
export {
  ForgotPasswordPage as default
};
