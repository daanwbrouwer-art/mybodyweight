const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-BxuF7LcC.js","assets/index-DqGOMkPn.js","assets/index-DtsKJuLM.css"])))=>i.map(i=>d[i]);
import { c as createLucideIcon, j as jsxRuntimeExports, i as cn, r as reactExports, u as useNavigate, A as ArrowLeft, ak as __vitePreload } from "./index-DqGOMkPn.js";
import { U as UserTier, c as createActor } from "./backend-Bt8BEzt7.js";
import { c as createSlot, B as Button } from "./button-CQwKH8lW.js";
import { R as Root$1, C as Content, b as Close, a as Title, P as Portal, O as Overlay } from "./index-CrCFe1wq.js";
import { X } from "./x-DtXDnd-V.js";
import { u as useActor } from "./useActor-BRlpmEWG.js";
import { u as ue } from "./index-BxuF7LcC.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",
      key: "1vdc57"
    }
  ],
  ["path", { d: "M5 21h14", key: "11awu3" }]
];
const Crown = createLucideIcon("crown", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "17", x2: "22", y1: "8", y2: "13", key: "3nzzx3" }],
  ["line", { x1: "22", x2: "17", y1: "8", y2: "13", key: "1swrse" }]
];
const UserX = createLucideIcon("user-x", __iconNode);
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-header",
      className: cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      ),
      ...props
    }
  );
}
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-title",
      className: cn("leading-none font-semibold", className),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root$1, { "data-slot": "dialog", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogFooter({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}
var NODES = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
];
var Primitive = NODES.reduce((primitive, node) => {
  const Slot = createSlot(`Primitive.${node}`);
  const Node = reactExports.forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? Slot : node;
    if (typeof window !== "undefined") {
      window[Symbol.for("radix-ui")] = true;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { ...primitiveProps, ref: forwardedRef });
  });
  Node.displayName = `Primitive.${node}`;
  return { ...primitive, [node]: Node };
}, {});
var NAME = "Label";
var Label$1 = reactExports.forwardRef((props, forwardedRef) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.label,
    {
      ...props,
      ref: forwardedRef,
      onMouseDown: (event) => {
        var _a;
        const target = event.target;
        if (target.closest("button, input, select, textarea")) return;
        (_a = props.onMouseDown) == null ? void 0 : _a.call(props, event);
        if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
      }
    }
  );
});
Label$1.displayName = NAME;
var Root = Label$1;
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
function TierBadge({ tier }) {
  if (tier === UserTier.Subscriber)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold tracking-wide",
        style: {
          background: "oklch(0.76 0.22 60 / 0.15)",
          color: "oklch(0.76 0.22 60)",
          border: "1px solid oklch(0.76 0.22 60 / 0.3)"
        },
        children: "★ Subscriber"
      }
    );
  if (tier === UserTier.Registered)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold tracking-wide text-primary",
        style: {
          background: "oklch(0.68 0.25 180 / 0.12)",
          border: "1px solid oklch(0.68 0.25 180 / 0.3)"
        },
        children: "Registered"
      }
    );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold tracking-wide text-foreground/40",
      style: {
        background: "oklch(0.22 0.01 260 / 0.5)",
        border: "1px solid oklch(0.26 0.01 260 / 0.5)"
      },
      children: "Guest"
    }
  );
}
function formatExpiry(entry) {
  if (entry.tier !== UserTier.Subscriber) return "—";
  if (entry.isIndefinite) return "Indefinite";
  if (entry.tierExpiresAt) {
    return new Date(
      Number(entry.tierExpiresAt) / 1e6
    ).toLocaleDateString();
  }
  return "—";
}
function AdminPage() {
  var _a, _b;
  const navigate = useNavigate();
  const { actor, isFetching } = useActor(createActor);
  const isAdmin = localStorage.getItem("mbw_admin") === "true";
  const isGuest = localStorage.getItem("mbw_user_type") === "guest";
  const [noAdminSet, setNoAdminSet] = reactExports.useState(null);
  const [users, setUsers] = reactExports.useState([]);
  const [loadingUsers, setLoadingUsers] = reactExports.useState(false);
  const [newAdminPrincipal, setNewAdminPrincipal] = reactExports.useState("");
  const [settingAdmin, setSettingAdmin] = reactExports.useState(false);
  const [revokeConfirm, setRevokeConfirm] = reactExports.useState(null);
  const [grantModal, setGrantModal] = reactExports.useState({
    open: false,
    user: null,
    isIndefinite: true,
    expiryDate: "",
    loading: false
  });
  const fetchUsers = reactExports.useCallback(async () => {
    if (!actor) return;
    setLoadingUsers(true);
    try {
      const result = await actor.getAdminUserList();
      if (result.__kind__ === "ok") {
        setUsers(result.ok);
      } else {
        ue.error(result.err);
      }
    } catch {
      ue.error("Failed to load users");
    } finally {
      setLoadingUsers(false);
    }
  }, [actor]);
  reactExports.useEffect(() => {
    if (!actor || isFetching || isAdmin) return;
    actor.getAdminUserList().then((result) => {
      if (result.__kind__ === "err") {
        const msg = result.err ?? "";
        setNoAdminSet(
          msg.toLowerCase().includes("no admin") || msg.toLowerCase().includes("not set") || msg.toLowerCase().includes("unauthorized")
        );
      } else {
        setNoAdminSet(false);
      }
    }).catch(() => setNoAdminSet(false));
  }, [actor, isFetching, isAdmin]);
  reactExports.useEffect(() => {
    if (actor && !isFetching && isAdmin) {
      fetchUsers();
    }
  }, [actor, isFetching, isAdmin, fetchUsers]);
  const openGrantModal = (user) => {
    setGrantModal({
      open: true,
      user,
      isIndefinite: true,
      expiryDate: "",
      loading: false
    });
  };
  const closeGrantModal = () => setGrantModal((s) => ({ ...s, open: false, user: null }));
  const confirmGrant = async () => {
    if (!actor || !grantModal.user) return;
    setGrantModal((s) => ({ ...s, loading: true }));
    try {
      let expiresAt = null;
      if (!grantModal.isIndefinite && grantModal.expiryDate) {
        expiresAt = BigInt(new Date(grantModal.expiryDate).getTime()) * 1000000n;
      }
      const result = await actor.adminGrantSubscriber(
        grantModal.user.principal,
        expiresAt,
        grantModal.isIndefinite
      );
      if (result.__kind__ === "ok") {
        ue.success(
          `Subscriber access granted to ${grantModal.user.email ?? grantModal.user.principal.toString()}`
        );
        closeGrantModal();
        await fetchUsers();
      } else {
        ue.error(result.err);
        setGrantModal((s) => ({ ...s, loading: false }));
      }
    } catch {
      ue.error("Failed to grant access");
      setGrantModal((s) => ({ ...s, loading: false }));
    }
  };
  const handleRevoke = async (user) => {
    if (!actor) return;
    const key = user.principal.toString();
    if (revokeConfirm !== key) {
      setRevokeConfirm(key);
      return;
    }
    setRevokeConfirm(null);
    try {
      const result = await actor.adminRevokeSubscriber(user.principal);
      if (result.__kind__ === "ok") {
        ue.success(
          `Access revoked for ${user.email ?? user.principal.toString()}`
        );
        await fetchUsers();
      } else {
        ue.error(result.err);
      }
    } catch {
      ue.error("Failed to revoke access");
    }
  };
  const handleSetAdmin = async () => {
    if (!actor || !newAdminPrincipal.trim()) return;
    setSettingAdmin(true);
    try {
      const { Principal } = await __vitePreload(async () => {
        const { Principal: Principal2 } = await import("./index-BxuF7LcC.js").then((n) => n.i);
        return { Principal: Principal2 };
      }, true ? __vite__mapDeps([0,1,2]) : void 0);
      const p = Principal.fromText(newAdminPrincipal.trim());
      const result = await actor.setAdminPrincipal(p);
      if (result.__kind__ === "ok") {
        ue.success("Admin principal updated");
        setNewAdminPrincipal("");
      } else {
        ue.error(result.err);
      }
    } catch {
      ue.error("Invalid principal or request failed");
    } finally {
      setSettingAdmin(false);
    }
  };
  if (!isAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-dvh bg-background flex flex-col items-center justify-center gap-6 px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "w-16 h-16 rounded-full flex items-center justify-center",
          style: {
            background: "oklch(0.65 0.19 22 / 0.12)",
            border: "1px solid oklch(0.65 0.19 22 / 0.25)"
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-8 h-8 text-destructive" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground mb-2 font-display tracking-tight", children: "Access Denied" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: { color: "oklch(0.55 0.008 260)" }, children: "You need admin privileges to access this panel." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 w-full max-w-xs", children: [
        !isGuest && noAdminSet === true && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs text-center",
              style: { color: "oklch(0.55 0.008 260)" },
              children: "First-time setup: click below to claim admin on this device."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              "data-ocid": "admin.claim_admin_button",
              onClick: () => {
                localStorage.setItem("mbw_admin", "true");
                window.location.reload();
              },
              className: "border-border text-foreground hover:bg-muted/40 transition-colors",
              children: "Claim Admin (first-time setup)"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "ghost",
            onClick: () => navigate({ to: "/home" }),
            className: "text-foreground/60 hover:text-foreground hover:bg-muted/30 transition-colors",
            children: "Go Home"
          }
        )
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-dvh bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card sticky top-0 z-10 px-4 py-4 flex items-center justify-between",
        style: { borderBottom: "1px solid oklch(0.26 0.01 260 / 0.6)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": "admin.back_button",
                onClick: () => navigate({ to: "/home" }),
                className: "w-9 h-9 rounded-full flex items-center justify-center transition-colors",
                style: {
                  background: "oklch(0.22 0.01 260)",
                  color: "oklch(0.55 0.008 260)"
                },
                "aria-label": "Back",
                onMouseEnter: (e) => {
                  e.currentTarget.style.color = "oklch(0.92 0.01 260)";
                },
                onMouseLeave: (e) => {
                  e.currentTarget.style.color = "oklch(0.55 0.008 260)";
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-5 rounded-full bg-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-bold text-foreground tracking-tight font-display uppercase", children: "Admin Panel" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Crown,
                {
                  className: "w-4 h-4",
                  style: { color: "oklch(0.76 0.22 60)" }
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": "admin.refresh_button",
              onClick: fetchUsers,
              disabled: loadingUsers,
              className: "w-9 h-9 rounded-full flex items-center justify-center transition-colors disabled:opacity-40",
              style: {
                background: "oklch(0.22 0.01 260)",
                color: "oklch(0.55 0.008 260)"
              },
              "aria-label": "Refresh users",
              onMouseEnter: (e) => {
                e.currentTarget.style.color = "oklch(0.92 0.01 260)";
              },
              onMouseLeave: (e) => {
                e.currentTarget.style.color = "oklch(0.55 0.008 260)";
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                RefreshCw,
                {
                  className: `w-4 h-4 ${loadingUsers ? "animate-spin" : ""}`
                }
              )
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-6 flex flex-col gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "bg-card rounded-2xl overflow-hidden",
          style: { border: "1px solid oklch(0.26 0.01 260 / 0.5)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-foreground text-base flex items-center gap-2 font-display font-bold tracking-tight uppercase", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "User Management" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "text-xs font-normal normal-case tracking-normal px-2 py-0.5 rounded-full",
                    style: {
                      background: "oklch(0.22 0.01 260)",
                      color: "oklch(0.55 0.008 260)"
                    },
                    children: [
                      users.length,
                      " users"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: "oklch(0.55 0.008 260)" }, children: "Manage registered users and subscriber access." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: loadingUsers ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": "admin.users_loading_state",
                className: "flex items-center justify-center py-12 gap-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Loading users…" })
                ]
              }
            ) : users.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": "admin.users_empty_state",
                className: "py-14 text-center flex flex-col items-center gap-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-12 h-12 rounded-full flex items-center justify-center",
                      style: {
                        background: "oklch(0.68 0.25 180 / 0.1)",
                        border: "1px solid oklch(0.68 0.25 180 / 0.2)"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserX, { className: "w-5 h-5 text-primary opacity-70" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "No registered users yet" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-xs mt-1",
                        style: { color: "oklch(0.55 0.008 260)" },
                        children: "Users will appear here once they sign up."
                      }
                    )
                  ] })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: users.map((user, i) => {
              const principalStr = user.principal.toString();
              const isConfirmingRevoke = revokeConfirm === principalStr;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": `admin.user.item.${i + 1}`,
                  className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 transition-colors",
                  style: {
                    borderBottom: "1px solid oklch(0.26 0.01 260 / 0.4)"
                  },
                  onMouseEnter: (e) => {
                    e.currentTarget.style.background = "oklch(0.22 0.01 260 / 0.5)";
                  },
                  onMouseLeave: (e) => {
                    e.currentTarget.style.background = "transparent";
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: user.email ?? "Anonymous" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-xs font-mono truncate max-w-[200px]",
                          style: { color: "oklch(0.55 0.008 260)" },
                          children: principalStr
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mt-0.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(TierBadge, { tier: user.tier }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "span",
                          {
                            className: "text-xs",
                            style: { color: "oklch(0.55 0.008 260)" },
                            children: [
                              "Expires: ",
                              formatExpiry(user)
                            ]
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 shrink-0", children: user.tier !== UserTier.Subscriber ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        "data-ocid": `admin.grant_button.${i + 1}`,
                        onClick: () => openGrantModal(user),
                        className: "text-xs rounded-lg px-3 py-1 font-semibold transition-colors",
                        style: {
                          background: "oklch(0.76 0.22 60 / 0.15)",
                          color: "oklch(0.76 0.22 60)",
                          border: "1px solid oklch(0.76 0.22 60 / 0.35)"
                        },
                        children: "Grant Subscriber"
                      }
                    ) : isConfirmingRevoke ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          "data-ocid": `admin.revoke_confirm_button.${i + 1}`,
                          onClick: () => handleRevoke(user),
                          className: "text-xs rounded-lg px-3 py-1 font-semibold transition-colors",
                          style: {
                            background: "oklch(0.65 0.19 22 / 0.2)",
                            color: "oklch(0.65 0.19 22 / 0.9)",
                            border: "1px solid oklch(0.65 0.19 22 / 0.4)"
                          },
                          children: "Confirm"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          "data-ocid": `admin.revoke_cancel_button.${i + 1}`,
                          onClick: () => setRevokeConfirm(null),
                          className: "text-xs rounded-lg px-3 py-1 transition-colors",
                          style: { color: "oklch(0.55 0.008 260)" },
                          children: "Cancel"
                        }
                      )
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        "data-ocid": `admin.revoke_button.${i + 1}`,
                        onClick: () => handleRevoke(user),
                        className: "text-xs rounded-lg px-3 py-1 font-medium transition-colors",
                        style: {
                          color: "oklch(0.65 0.19 22 / 0.85)",
                          border: "1px solid oklch(0.65 0.19 22 / 0.3)"
                        },
                        children: "Revoke Access"
                      }
                    ) })
                  ]
                },
                principalStr
              );
            }) }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "bg-card rounded-2xl overflow-hidden",
          style: { border: "1px solid oklch(0.26 0.01 260 / 0.5)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-foreground text-base flex items-center gap-2 font-display font-bold tracking-tight uppercase", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-primary" }),
                "Admin Settings"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: "oklch(0.55 0.008 260)" }, children: "Transfer admin ownership to another principal." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "admin-principal",
                    className: "text-sm font-medium text-foreground",
                    children: "New Admin Principal"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "admin-principal",
                      "data-ocid": "admin.principal_input",
                      placeholder: "aaaaa-bbbbb-ccccc-ddddd-eeeee-fff",
                      value: newAdminPrincipal,
                      onChange: (e) => setNewAdminPrincipal(e.target.value),
                      className: "bg-background border-border text-foreground font-mono text-sm flex-1 focus:ring-1 focus:ring-primary"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      "data-ocid": "admin.set_admin_button",
                      onClick: handleSetAdmin,
                      disabled: settingAdmin || !newAdminPrincipal.trim(),
                      className: "bg-primary text-primary-foreground hover:bg-primary/90 shrink-0 font-semibold transition-colors",
                      children: settingAdmin ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 border-2 border-primary-foreground/50 border-t-primary-foreground rounded-full animate-spin" }) : "Set Admin"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: "oklch(0.55 0.008 260)" }, children: "This transfers admin control to the specified principal. You will lose access afterwards." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-xl p-3",
                  style: {
                    background: "oklch(0.65 0.19 22 / 0.06)",
                    border: "1px solid oklch(0.65 0.19 22 / 0.2)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-xs font-semibold mb-1",
                        style: { color: "oklch(0.65 0.19 22 / 0.9)" },
                        children: "Danger Zone"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: "oklch(0.55 0.008 260)" }, children: "Revoke your own admin flag from this device:" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        "data-ocid": "admin.revoke_self_button",
                        onClick: () => {
                          localStorage.removeItem("mbw_admin");
                          navigate({ to: "/home" });
                        },
                        className: "mt-2 text-xs hover:underline transition-colors",
                        style: { color: "oklch(0.65 0.19 22 / 0.85)" },
                        children: "Remove admin flag from this device"
                      }
                    )
                  ]
                }
              )
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: grantModal.open,
        onOpenChange: (o) => !o && closeGrantModal(),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DialogContent,
          {
            "data-ocid": "admin.grant_dialog",
            className: "bg-card text-foreground max-w-sm",
            style: { border: "1px solid oklch(0.26 0.01 260 / 0.6)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-foreground font-bold font-display tracking-tight uppercase text-base", children: "Grant Subscriber Access" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 py-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "rounded-xl px-3 py-2",
                    style: { background: "oklch(0.22 0.01 260)" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-xs mb-0.5",
                          style: { color: "oklch(0.55 0.008 260)" },
                          children: "User"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: ((_a = grantModal.user) == null ? void 0 : _a.email) ?? ((_b = grantModal.user) == null ? void 0 : _b.principal.toString()) })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium text-foreground", children: "Access Duration" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-3 cursor-pointer", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          "data-ocid": "admin.grant_indefinite_radio",
                          type: "radio",
                          name: "grant-type",
                          checked: grantModal.isIndefinite,
                          onChange: () => setGrantModal((s) => ({ ...s, isIndefinite: true })),
                          className: "accent-primary"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: "Indefinite Access" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-3 cursor-pointer", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          "data-ocid": "admin.grant_expiry_radio",
                          type: "radio",
                          name: "grant-type",
                          checked: !grantModal.isIndefinite,
                          onChange: () => setGrantModal((s) => ({ ...s, isIndefinite: false })),
                          className: "accent-primary"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: "Set Expiry Date" })
                    ] })
                  ] })
                ] }),
                !grantModal.isIndefinite && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Label,
                    {
                      htmlFor: "grant-expiry",
                      className: "text-sm font-medium text-foreground",
                      children: "Expiry Date"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "grant-expiry",
                      "data-ocid": "admin.grant_expiry_input",
                      type: "date",
                      value: grantModal.expiryDate,
                      onChange: (e) => setGrantModal((s) => ({ ...s, expiryDate: e.target.value })),
                      className: "bg-background border-border text-foreground focus:ring-1 focus:ring-primary",
                      min: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "flex flex-row gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    "data-ocid": "admin.grant_cancel_button",
                    variant: "ghost",
                    onClick: closeGrantModal,
                    disabled: grantModal.loading,
                    className: "flex-1 text-foreground/60 hover:text-foreground hover:bg-muted/30 transition-colors",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    "data-ocid": "admin.grant_confirm_button",
                    onClick: confirmGrant,
                    disabled: grantModal.loading || !grantModal.isIndefinite && !grantModal.expiryDate,
                    className: "flex-1 font-bold font-display transition-colors",
                    style: {
                      background: "oklch(0.76 0.22 60)",
                      color: "oklch(0.12 0.008 260)"
                    },
                    children: grantModal.loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" }) : "Confirm Grant"
                  }
                )
              ] })
            ]
          }
        )
      }
    )
  ] });
}
export {
  AdminPage as default
};
