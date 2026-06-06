import { u as useNavigate, b as useSearch, r as reactExports, j as jsxRuntimeExports, m as motion } from "./index-DqGOMkPn.js";
import { c as createActor } from "./backend-Bt8BEzt7.js";
import { u as useActor } from "./useActor-BRlpmEWG.js";
function ResetPasswordPage() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/reset-password" });
  const { actor } = useActor(createActor);
  const [password, setPassword] = reactExports.useState("");
  const [confirmPassword, setConfirmPassword] = reactExports.useState("");
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const hashPassword = async (p) => {
    const buf = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(p)
    );
    return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    const token = search.token;
    if (!token) {
      setError("Invalid reset link");
      return;
    }
    setIsLoading(true);
    try {
      const result = await actor.resetPassword(
        token,
        await hashPassword(password)
      );
      if ("ok" in result) {
        navigate({ to: "/onboarding/auth" });
      } else {
        setError(result.err || "Reset failed. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-dvh flex flex-col max-w-[430px] mx-auto px-6 relative overflow-hidden bg-background",
      "data-ocid": "reset-password.page",
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
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 18 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
              className: "flex flex-col flex-1",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-black text-3xl uppercase tracking-widest-custom leading-none text-white mb-1", children: "CREATE NEW PASSWORD" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-white/45 leading-relaxed", children: "Enter your new password below." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "reset-password",
                        className: "font-display text-xs font-bold uppercase tracking-widest text-white/50 mb-2 block",
                        children: "New Password"
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
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "svg",
                            {
                              width: "14",
                              height: "16",
                              viewBox: "0 0 14 18",
                              fill: "none",
                              className: "shrink-0",
                              role: "img",
                              "aria-hidden": "true",
                              style: { color: "oklch(0.55 0.008 260)" },
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "rect",
                                  {
                                    x: "1",
                                    y: "7",
                                    width: "12",
                                    height: "10",
                                    rx: "2",
                                    stroke: "currentColor",
                                    strokeWidth: "1.5"
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "path",
                                  {
                                    d: "M4 7V5a3 3 0 1 1 6 0v2",
                                    stroke: "currentColor",
                                    strokeWidth: "1.5",
                                    strokeLinecap: "round"
                                  }
                                )
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "input",
                            {
                              id: "reset-password",
                              type: "password",
                              value: password,
                              onChange: (e) => setPassword(e.target.value),
                              placeholder: "••••••••",
                              className: "flex-1 bg-transparent font-body text-sm text-white placeholder:text-white/25 outline-none",
                              "data-ocid": "reset-password.password_input"
                            }
                          )
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "reset-confirm",
                        className: "font-display text-xs font-bold uppercase tracking-widest text-white/50 mb-2 block",
                        children: "Confirm New Password"
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
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "svg",
                            {
                              width: "14",
                              height: "16",
                              viewBox: "0 0 14 18",
                              fill: "none",
                              className: "shrink-0",
                              role: "img",
                              "aria-hidden": "true",
                              style: { color: "oklch(0.55 0.008 260)" },
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "rect",
                                  {
                                    x: "1",
                                    y: "7",
                                    width: "12",
                                    height: "10",
                                    rx: "2",
                                    stroke: "currentColor",
                                    strokeWidth: "1.5"
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "path",
                                  {
                                    d: "M4 7V5a3 3 0 1 1 6 0v2",
                                    stroke: "currentColor",
                                    strokeWidth: "1.5",
                                    strokeLinecap: "round"
                                  }
                                )
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "input",
                            {
                              id: "reset-confirm",
                              type: "password",
                              value: confirmPassword,
                              onChange: (e) => setConfirmPassword(e.target.value),
                              placeholder: "••••••••",
                              className: "flex-1 bg-transparent font-body text-sm text-white placeholder:text-white/25 outline-none",
                              "data-ocid": "reset-password.confirm_password_input"
                            }
                          )
                        ]
                      }
                    )
                  ] }),
                  error && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      initial: { opacity: 0, y: -6 },
                      animate: { opacity: 1, y: 0 },
                      className: "mb-5 px-4 py-3 rounded-xl text-center",
                      style: {
                        background: "oklch(0.25 0.04 25 / 0.3)",
                        border: "1px solid oklch(0.55 0.15 25 / 0.4)"
                      },
                      "data-ocid": "reset-password.error_state",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "font-body text-sm",
                          style: { color: "oklch(0.75 0.12 25)" },
                          children: error
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "submit",
                      disabled: isLoading,
                      className: "w-full h-14 rounded-full flex items-center justify-center font-display font-bold text-sm tracking-wide bg-primary text-background transition-smooth hover:opacity-90 active:scale-[0.98]",
                      "data-ocid": "reset-password.submit_button",
                      children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" }),
                        "Saving..."
                      ] }) : "Reset Password"
                    }
                  )
                ] })
              ]
            }
          )
        ] })
      ]
    }
  );
}
export {
  ResetPasswordPage as default
};
