import { u as useNavigate, r as reactExports, j as jsxRuntimeExports, A as ArrowLeft, m as motion } from "./index-DqGOMkPn.js";
import { c as createActor } from "./backend-Bt8BEzt7.js";
import { B as Button } from "./button-CQwKH8lW.js";
import { u as useActor } from "./useActor-BRlpmEWG.js";
import { E as EyeOff, a as Eye } from "./eye-d2BO0zHO.js";
function CreateAccountPage() {
  const navigate = useNavigate();
  const { actor } = useActor(createActor);
  const [username, setUsername] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [confirmPassword, setConfirmPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [unconfirmedEmail, setUnconfirmedEmail] = reactExports.useState(null);
  const [unconfirmedMessage, setUnconfirmedMessage] = reactExports.useState(
    null
  );
  const [resendCooldown, setResendCooldown] = reactExports.useState(0);
  const [resendSuccess, setResendSuccess] = reactExports.useState(null);
  const [resendError, setResendError] = reactExports.useState(null);
  const [isResending, setIsResending] = reactExports.useState(false);
  const cooldownTimerRef = reactExports.useRef(null);
  const hashPassword = async (p) => {
    const buf = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(p)
    );
    return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
  };
  const validate = () => {
    if (!username || username.length < 3 || username.length > 20) {
      return "Username must be 3-20 characters";
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return "Username can only contain letters, numbers, and underscores";
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Please enter a valid email address";
    }
    if (!password || password.length < 8) {
      return "Password must be at least 8 characters";
    }
    if (password !== confirmPassword) {
      return "Passwords do not match";
    }
    return "";
  };
  const startCooldown = (emailAddr) => {
    localStorage.setItem(
      `mbw_resend_cooldown_${emailAddr}`,
      Date.now().toString()
    );
    setResendCooldown(60);
    if (cooldownTimerRef.current) clearInterval(cooldownTimerRef.current);
    cooldownTimerRef.current = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          if (cooldownTimerRef.current) clearInterval(cooldownTimerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1e3);
  };
  const handleResend = async () => {
    if (resendCooldown > 0 || !unconfirmedEmail) return;
    setIsResending(true);
    setResendError(null);
    setResendSuccess(null);
    try {
      await actor.resendVerificationEmail(unconfirmedEmail);
      setResendSuccess(
        "Confirmation email sent — please check your inbox and spam folder"
      );
      startCooldown(unconfirmedEmail);
    } catch (err) {
      setResendError(
        err instanceof Error ? err.message : "Failed to resend. Please try again."
      );
    } finally {
      setIsResending(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    setIsLoading(true);
    try {
      const result = await actor.registerUser(
        username,
        email,
        await hashPassword(password)
      );
      if ("ok" in result) {
        navigate({ to: `/verify-email?email=${encodeURIComponent(email)}` });
      } else if (typeof result.err === "string" && result.err.includes("EMAIL_NOT_CONFIRMED")) {
        setUnconfirmedEmail(email);
        setUnconfirmedMessage(
          "This email is already registered but not yet confirmed. A new confirmation email has been sent — please check your inbox."
        );
        startCooldown(email);
      } else {
        setError(result.err || "Registration failed. Please try again.");
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
      className: "min-h-dvh flex flex-col max-w-[430px] mx-auto relative overflow-hidden bg-background",
      "data-ocid": "create-account.page",
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
              onClick: () => navigate({ to: "/onboarding/welcome" }),
              "data-ocid": "create-account.back_button",
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
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-black text-3xl uppercase tracking-widest-custom leading-none text-white mb-1", children: "CREATE YOUR ACCOUNT" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-white/45 leading-relaxed", children: "Join the movement. Start your journey." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: "create-username",
                      className: "font-display text-xs font-bold uppercase tracking-widest text-white/50 mb-2 block",
                      children: "Username"
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
                            viewBox: "0 0 16 18",
                            fill: "none",
                            className: "shrink-0",
                            role: "img",
                            "aria-hidden": "true",
                            style: { color: "oklch(0.55 0.008 260)" },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "circle",
                                {
                                  cx: "8",
                                  cy: "6",
                                  r: "4",
                                  stroke: "currentColor",
                                  strokeWidth: "1.5"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M1 17c0-3.866 3.134-7 7-7s7 3.134 7 7",
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
                            id: "create-username",
                            type: "text",
                            value: username,
                            onChange: (e) => setUsername(e.target.value),
                            placeholder: "athlete_name",
                            className: "flex-1 bg-transparent font-body text-sm text-white placeholder:text-white/25 outline-none",
                            "data-ocid": "create-account.username_input"
                          }
                        )
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: "create-email",
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
                            id: "create-email",
                            type: "email",
                            value: email,
                            onChange: (e) => setEmail(e.target.value),
                            placeholder: "you@example.com",
                            className: "flex-1 bg-transparent font-body text-sm text-white placeholder:text-white/25 outline-none",
                            "data-ocid": "create-account.email_input"
                          }
                        )
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: "create-password",
                      className: "font-display text-xs font-bold uppercase tracking-widest text-white/50 mb-2 block",
                      children: "Password"
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
                            id: "create-password",
                            type: showPassword ? "text" : "password",
                            value: password,
                            onChange: (e) => setPassword(e.target.value),
                            placeholder: "••••••••",
                            className: "flex-1 bg-transparent font-body text-sm text-white placeholder:text-white/25 outline-none",
                            "data-ocid": "create-account.password_input"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => setShowPassword((v) => !v),
                            className: "shrink-0 text-white/30 hover:text-white/60 transition-smooth",
                            "aria-label": showPassword ? "Hide password" : "Show password",
                            children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
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
                      htmlFor: "create-confirm",
                      className: "font-display text-xs font-bold uppercase tracking-widest text-white/50 mb-2 block",
                      children: "Confirm Password"
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
                            id: "create-confirm",
                            type: showPassword ? "text" : "password",
                            value: confirmPassword,
                            onChange: (e) => setConfirmPassword(e.target.value),
                            placeholder: "••••••••",
                            className: "flex-1 bg-transparent font-body text-sm text-white placeholder:text-white/25 outline-none",
                            "data-ocid": "create-account.confirm_password_input"
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
                    "data-ocid": "create-account.error_state",
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
                unconfirmedEmail && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { opacity: 0, y: -6 },
                    animate: { opacity: 1, y: 0 },
                    className: "mb-5 rounded-xl overflow-hidden",
                    "data-ocid": "create-account.unconfirmed_state",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "px-4 py-3",
                        style: {
                          background: "oklch(0.18 0.04 180 / 0.35)",
                          border: "1px solid oklch(0.68 0.25 180 / 0.35)",
                          borderRadius: "0.75rem"
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: "font-body text-sm leading-relaxed mb-3",
                              style: { color: "oklch(0.88 0.08 180)" },
                              children: unconfirmedMessage
                            }
                          ),
                          resendSuccess && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            motion.p,
                            {
                              initial: { opacity: 0 },
                              animate: { opacity: 1 },
                              className: "font-body text-xs mb-2 px-3 py-2 rounded-lg",
                              style: {
                                background: "oklch(0.22 0.06 145 / 0.4)",
                                border: "1px solid oklch(0.55 0.18 145 / 0.4)",
                                color: "oklch(0.75 0.18 145)"
                              },
                              "data-ocid": "create-account.resend_success_state",
                              children: resendSuccess
                            }
                          ),
                          resendError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            motion.p,
                            {
                              initial: { opacity: 0 },
                              animate: { opacity: 1 },
                              className: "font-body text-xs mb-2 px-3 py-2 rounded-lg",
                              style: {
                                background: "oklch(0.25 0.04 25 / 0.3)",
                                border: "1px solid oklch(0.55 0.15 25 / 0.4)",
                                color: "oklch(0.75 0.12 25)"
                              },
                              "data-ocid": "create-account.resend_error_state",
                              children: resendError
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: handleResend,
                              disabled: resendCooldown > 0 || isResending,
                              className: "w-full h-10 rounded-xl font-display font-bold text-xs uppercase tracking-widest transition-smooth disabled:opacity-50",
                              style: {
                                background: resendCooldown > 0 ? "oklch(0.22 0.02 260)" : "oklch(0.22 0.06 180 / 0.5)",
                                border: resendCooldown > 0 ? "1px solid oklch(0.35 0.02 260)" : "1px solid oklch(0.68 0.25 180 / 0.5)",
                                color: resendCooldown > 0 ? "oklch(0.55 0.008 260)" : "oklch(0.78 0.2 180)"
                              },
                              "data-ocid": "create-account.resend_button",
                              children: isResending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center justify-center gap-2", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 rounded-full border-2 border-current border-t-transparent animate-spin" }),
                                "Sending..."
                              ] }) : resendCooldown > 0 ? `Resend in ${resendCooldown}s...` : "Resend again"
                            }
                          )
                        ]
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "submit",
                    className: "w-full h-14 font-display font-black text-sm tracking-widest-custom rounded-full uppercase mb-4",
                    style: {
                      boxShadow: "0 0 32px oklch(0.68 0.25 180 / 0.3), 0 4px 16px oklch(0 0 0 / 0.25)"
                    },
                    disabled: isLoading,
                    "data-ocid": "create-account.submit_button",
                    children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" }),
                      "Creating..."
                    ] }) : "Create Account"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-white/30 text-center leading-relaxed mb-6", children: "By creating an account you agree to our Terms of Service and Privacy Policy" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-sm text-white/40 text-center", children: [
                  "Already have an account?",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => navigate({ to: "/onboarding/auth" }),
                      className: "font-bold text-primary transition-smooth hover:opacity-75",
                      "data-ocid": "create-account.login_link",
                      children: "Sign In"
                    }
                  )
                ] })
              ] })
            ]
          }
        ) })
      ]
    }
  );
}
export {
  CreateAccountPage as default
};
