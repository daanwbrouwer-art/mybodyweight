import { createActor } from "@/backend";
import type { AdminUserEntry } from "@/backend";
import { UserTier } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActor } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Crown, RefreshCw, Shield, UserX } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

type GrantModalState = {
  open: boolean;
  user: AdminUserEntry | null;
  isIndefinite: boolean;
  expiryDate: string;
  loading: boolean;
};

function TierBadge({ tier }: { tier: UserTier }) {
  if (tier === UserTier.Subscriber)
    return (
      <span
        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold tracking-wide"
        style={{
          background: "oklch(0.76 0.22 60 / 0.15)",
          color: "oklch(0.76 0.22 60)",
          border: "1px solid oklch(0.76 0.22 60 / 0.3)",
        }}
      >
        ★ Subscriber
      </span>
    );
  if (tier === UserTier.Registered)
    return (
      <span
        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold tracking-wide text-primary"
        style={{
          background: "oklch(0.68 0.25 180 / 0.12)",
          border: "1px solid oklch(0.68 0.25 180 / 0.3)",
        }}
      >
        Registered
      </span>
    );
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold tracking-wide text-foreground/40"
      style={{
        background: "oklch(0.22 0.01 260 / 0.5)",
        border: "1px solid oklch(0.26 0.01 260 / 0.5)",
      }}
    >
      Guest
    </span>
  );
}

function formatExpiry(entry: AdminUserEntry): string {
  if (entry.tier !== UserTier.Subscriber) return "\u2014";
  if (entry.isIndefinite) return "Indefinite";
  if (entry.tierExpiresAt) {
    return new Date(
      Number(entry.tierExpiresAt) / 1_000_000,
    ).toLocaleDateString();
  }
  return "\u2014";
}

export default function AdminPage() {
  const navigate = useNavigate();
  const { actor, isFetching } = useActor(createActor);
  const isAdmin = localStorage.getItem("mbw_admin") === "true";
  const isGuest = localStorage.getItem("mbw_user_type") === "guest";
  const [noAdminSet, setNoAdminSet] = useState<boolean | null>(null);

  const [users, setUsers] = useState<AdminUserEntry[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [newAdminPrincipal, setNewAdminPrincipal] = useState("");
  const [settingAdmin, setSettingAdmin] = useState(false);
  const [revokeConfirm, setRevokeConfirm] = useState<string | null>(null);
  const [grantModal, setGrantModal] = useState<GrantModalState>({
    open: false,
    user: null,
    isIndefinite: true,
    expiryDate: "",
    loading: false,
  });

  const fetchUsers = useCallback(async () => {
    if (!actor) return;
    setLoadingUsers(true);
    try {
      const result = await actor.getAdminUserList();
      if (result.__kind__ === "ok") {
        setUsers(result.ok);
      } else {
        toast.error(result.err);
      }
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoadingUsers(false);
    }
  }, [actor]);

  useEffect(() => {
    if (!actor || isFetching || isAdmin) return;
    actor
      .getAdminUserList()
      .then((result) => {
        if (result.__kind__ === "err") {
          const msg: string = (result.err as string) ?? "";
          setNoAdminSet(
            msg.toLowerCase().includes("no admin") ||
              msg.toLowerCase().includes("not set") ||
              msg.toLowerCase().includes("unauthorized"),
          );
        } else {
          setNoAdminSet(false);
        }
      })
      .catch(() => setNoAdminSet(false));
  }, [actor, isFetching, isAdmin]);

  useEffect(() => {
    if (actor && !isFetching && isAdmin) {
      fetchUsers();
    }
  }, [actor, isFetching, isAdmin, fetchUsers]);

  const openGrantModal = (user: AdminUserEntry) => {
    setGrantModal({
      open: true,
      user,
      isIndefinite: true,
      expiryDate: "",
      loading: false,
    });
  };

  const closeGrantModal = () =>
    setGrantModal((s) => ({ ...s, open: false, user: null }));

  const confirmGrant = async () => {
    if (!actor || !grantModal.user) return;
    setGrantModal((s) => ({ ...s, loading: true }));
    try {
      let expiresAt: bigint | null = null;
      if (!grantModal.isIndefinite && grantModal.expiryDate) {
        expiresAt =
          BigInt(new Date(grantModal.expiryDate).getTime()) * 1_000_000n;
      }
      const result = await actor.adminGrantSubscriber(
        grantModal.user.principal,
        expiresAt,
        grantModal.isIndefinite,
      );
      if (result.__kind__ === "ok") {
        toast.success(
          `Subscriber access granted to ${grantModal.user.email ?? grantModal.user.principal.toString()}`,
        );
        closeGrantModal();
        await fetchUsers();
      } else {
        toast.error(result.err);
        setGrantModal((s) => ({ ...s, loading: false }));
      }
    } catch {
      toast.error("Failed to grant access");
      setGrantModal((s) => ({ ...s, loading: false }));
    }
  };

  const handleRevoke = async (user: AdminUserEntry) => {
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
        toast.success(
          `Access revoked for ${user.email ?? user.principal.toString()}`,
        );
        await fetchUsers();
      } else {
        toast.error(result.err);
      }
    } catch {
      toast.error("Failed to revoke access");
    }
  };

  const handleSetAdmin = async () => {
    if (!actor || !newAdminPrincipal.trim()) return;
    setSettingAdmin(true);
    try {
      const { Principal } = await import("@icp-sdk/core/principal");
      const p = Principal.fromText(newAdminPrincipal.trim());
      const result = await actor.setAdminPrincipal(p);
      if (result.__kind__ === "ok") {
        toast.success("Admin principal updated");
        setNewAdminPrincipal("");
      } else {
        toast.error(result.err);
      }
    } catch {
      toast.error("Invalid principal or request failed");
    } finally {
      setSettingAdmin(false);
    }
  };

  // Access denied screen
  if (!isAdmin) {
    return (
      <div className="min-h-dvh bg-background flex flex-col items-center justify-center gap-6 px-6">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{
            background: "oklch(0.65 0.19 22 / 0.12)",
            border: "1px solid oklch(0.65 0.19 22 / 0.25)",
          }}
        >
          <Shield className="w-8 h-8 text-destructive" />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2 font-display tracking-tight">
            Access Denied
          </h1>
          <p className="text-sm" style={{ color: "oklch(0.55 0.008 260)" }}>
            You need admin privileges to access this panel.
          </p>
        </div>
        <div className="flex flex-col gap-3 w-full max-w-xs">
          {!isGuest && noAdminSet === true && (
            <>
              <p
                className="text-xs text-center"
                style={{ color: "oklch(0.55 0.008 260)" }}
              >
                First-time setup: click below to claim admin on this device.
              </p>
              <Button
                type="button"
                variant="outline"
                data-ocid="admin.claim_admin_button"
                onClick={() => {
                  localStorage.setItem("mbw_admin", "true");
                  window.location.reload();
                }}
                className="border-border text-foreground hover:bg-muted/40 transition-colors"
              >
                Claim Admin (first-time setup)
              </Button>
            </>
          )}
          <Button
            type="button"
            variant="ghost"
            onClick={() => navigate({ to: "/home" })}
            className="text-foreground/60 hover:text-foreground hover:bg-muted/30 transition-colors"
          >
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-background">
      {/* Header */}
      <div
        className="bg-card sticky top-0 z-10 px-4 py-4 flex items-center justify-between"
        style={{ borderBottom: "1px solid oklch(0.26 0.01 260 / 0.6)" }}
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            data-ocid="admin.back_button"
            onClick={() => navigate({ to: "/home" })}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
            style={{
              background: "oklch(0.22 0.01 260)",
              color: "oklch(0.55 0.008 260)",
            }}
            aria-label="Back"
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color =
                "oklch(0.92 0.01 260)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color =
                "oklch(0.55 0.008 260)";
            }}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-5 rounded-full bg-primary" />
            <h1 className="text-lg font-bold text-foreground tracking-tight font-display uppercase">
              Admin Panel
            </h1>
            <Crown
              className="w-4 h-4"
              style={{ color: "oklch(0.76 0.22 60)" }}
            />
          </div>
        </div>
        <button
          type="button"
          data-ocid="admin.refresh_button"
          onClick={fetchUsers}
          disabled={loadingUsers}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-colors disabled:opacity-40"
          style={{
            background: "oklch(0.22 0.01 260)",
            color: "oklch(0.55 0.008 260)",
          }}
          aria-label="Refresh users"
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color =
              "oklch(0.92 0.01 260)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color =
              "oklch(0.55 0.008 260)";
          }}
        >
          <RefreshCw
            className={`w-4 h-4 ${loadingUsers ? "animate-spin" : ""}`}
          />
        </button>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-6">
        {/* User Management */}
        <Card
          className="bg-card rounded-2xl overflow-hidden"
          style={{ border: "1px solid oklch(0.26 0.01 260 / 0.5)" }}
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-foreground text-base flex items-center gap-2 font-display font-bold tracking-tight uppercase">
              <span>User Management</span>
              <span
                className="text-xs font-normal normal-case tracking-normal px-2 py-0.5 rounded-full"
                style={{
                  background: "oklch(0.22 0.01 260)",
                  color: "oklch(0.55 0.008 260)",
                }}
              >
                {users.length} users
              </span>
            </CardTitle>
            <p className="text-xs" style={{ color: "oklch(0.55 0.008 260)" }}>
              Manage registered users and subscriber access.
            </p>
          </CardHeader>
          <CardContent className="p-0">
            {loadingUsers ? (
              <div
                data-ocid="admin.users_loading_state"
                className="flex items-center justify-center py-12 gap-3"
              >
                <div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                <span className="text-sm text-muted-foreground">
                  Loading users…
                </span>
              </div>
            ) : users.length === 0 ? (
              <div
                data-ocid="admin.users_empty_state"
                className="py-14 text-center flex flex-col items-center gap-3"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: "oklch(0.68 0.25 180 / 0.1)",
                    border: "1px solid oklch(0.68 0.25 180 / 0.2)",
                  }}
                >
                  <UserX className="w-5 h-5 text-primary opacity-70" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    No registered users yet
                  </p>
                  <p
                    className="text-xs mt-1"
                    style={{ color: "oklch(0.55 0.008 260)" }}
                  >
                    Users will appear here once they sign up.
                  </p>
                </div>
              </div>
            ) : (
              <div>
                {users.map((user, i) => {
                  const principalStr = user.principal.toString();
                  const isConfirmingRevoke = revokeConfirm === principalStr;
                  return (
                    <div
                      key={principalStr}
                      data-ocid={`admin.user.item.${i + 1}`}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 transition-colors"
                      style={{
                        borderBottom: "1px solid oklch(0.26 0.01 260 / 0.4)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLDivElement).style.background =
                          "oklch(0.22 0.01 260 / 0.5)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLDivElement).style.background =
                          "transparent";
                      }}
                    >
                      <div className="flex flex-col gap-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">
                          {user.email ?? "Anonymous"}
                        </p>
                        <p
                          className="text-xs font-mono truncate max-w-[200px]"
                          style={{ color: "oklch(0.55 0.008 260)" }}
                        >
                          {principalStr}
                        </p>
                        <div className="flex items-center gap-2 flex-wrap mt-0.5">
                          <TierBadge tier={user.tier} />
                          <span
                            className="text-xs"
                            style={{ color: "oklch(0.55 0.008 260)" }}
                          >
                            Expires: {formatExpiry(user)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {user.tier !== UserTier.Subscriber ? (
                          <button
                            type="button"
                            data-ocid={`admin.grant_button.${i + 1}`}
                            onClick={() => openGrantModal(user)}
                            className="text-xs rounded-lg px-3 py-1 font-semibold transition-colors"
                            style={{
                              background: "oklch(0.76 0.22 60 / 0.15)",
                              color: "oklch(0.76 0.22 60)",
                              border: "1px solid oklch(0.76 0.22 60 / 0.35)",
                            }}
                          >
                            Grant Subscriber
                          </button>
                        ) : isConfirmingRevoke ? (
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              data-ocid={`admin.revoke_confirm_button.${i + 1}`}
                              onClick={() => handleRevoke(user)}
                              className="text-xs rounded-lg px-3 py-1 font-semibold transition-colors"
                              style={{
                                background: "oklch(0.65 0.19 22 / 0.2)",
                                color: "oklch(0.65 0.19 22 / 0.9)",
                                border: "1px solid oklch(0.65 0.19 22 / 0.4)",
                              }}
                            >
                              Confirm
                            </button>
                            <button
                              type="button"
                              data-ocid={`admin.revoke_cancel_button.${i + 1}`}
                              onClick={() => setRevokeConfirm(null)}
                              className="text-xs rounded-lg px-3 py-1 transition-colors"
                              style={{ color: "oklch(0.55 0.008 260)" }}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            data-ocid={`admin.revoke_button.${i + 1}`}
                            onClick={() => handleRevoke(user)}
                            className="text-xs rounded-lg px-3 py-1 font-medium transition-colors"
                            style={{
                              color: "oklch(0.65 0.19 22 / 0.85)",
                              border: "1px solid oklch(0.65 0.19 22 / 0.3)",
                            }}
                          >
                            Revoke Access
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Admin Settings */}
        <Card
          className="bg-card rounded-2xl overflow-hidden"
          style={{ border: "1px solid oklch(0.26 0.01 260 / 0.5)" }}
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-foreground text-base flex items-center gap-2 font-display font-bold tracking-tight uppercase">
              <Shield className="w-4 h-4 text-primary" />
              Admin Settings
            </CardTitle>
            <p className="text-xs" style={{ color: "oklch(0.55 0.008 260)" }}>
              Transfer admin ownership to another principal.
            </p>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="admin-principal"
                className="text-sm font-medium text-foreground"
              >
                New Admin Principal
              </Label>
              <div className="flex gap-2">
                <Input
                  id="admin-principal"
                  data-ocid="admin.principal_input"
                  placeholder="aaaaa-bbbbb-ccccc-ddddd-eeeee-fff"
                  value={newAdminPrincipal}
                  onChange={(e) => setNewAdminPrincipal(e.target.value)}
                  className="bg-background border-border text-foreground font-mono text-sm flex-1 focus:ring-1 focus:ring-primary"
                />
                <Button
                  type="button"
                  data-ocid="admin.set_admin_button"
                  onClick={handleSetAdmin}
                  disabled={settingAdmin || !newAdminPrincipal.trim()}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 shrink-0 font-semibold transition-colors"
                >
                  {settingAdmin ? (
                    <div className="w-4 h-4 border-2 border-primary-foreground/50 border-t-primary-foreground rounded-full animate-spin" />
                  ) : (
                    "Set Admin"
                  )}
                </Button>
              </div>
              <p className="text-xs" style={{ color: "oklch(0.55 0.008 260)" }}>
                This transfers admin control to the specified principal. You
                will lose access afterwards.
              </p>
            </div>
            <div
              className="rounded-xl p-3"
              style={{
                background: "oklch(0.65 0.19 22 / 0.06)",
                border: "1px solid oklch(0.65 0.19 22 / 0.2)",
              }}
            >
              <p
                className="text-xs font-semibold mb-1"
                style={{ color: "oklch(0.65 0.19 22 / 0.9)" }}
              >
                Danger Zone
              </p>
              <p className="text-xs" style={{ color: "oklch(0.55 0.008 260)" }}>
                Revoke your own admin flag from this device:
              </p>
              <button
                type="button"
                data-ocid="admin.revoke_self_button"
                onClick={() => {
                  localStorage.removeItem("mbw_admin");
                  navigate({ to: "/home" });
                }}
                className="mt-2 text-xs hover:underline transition-colors"
                style={{ color: "oklch(0.65 0.19 22 / 0.85)" }}
              >
                Remove admin flag from this device
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grant Subscriber Modal */}
      <Dialog
        open={grantModal.open}
        onOpenChange={(o) => !o && closeGrantModal()}
      >
        <DialogContent
          data-ocid="admin.grant_dialog"
          className="bg-card text-foreground max-w-sm"
          style={{ border: "1px solid oklch(0.26 0.01 260 / 0.6)" }}
        >
          <DialogHeader>
            <DialogTitle className="text-foreground font-bold font-display tracking-tight uppercase text-base">
              Grant Subscriber Access
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-2">
            <div
              className="rounded-xl px-3 py-2"
              style={{ background: "oklch(0.22 0.01 260)" }}
            >
              <p
                className="text-xs mb-0.5"
                style={{ color: "oklch(0.55 0.008 260)" }}
              >
                User
              </p>
              <p className="text-sm font-semibold text-foreground truncate">
                {grantModal.user?.email ??
                  grantModal.user?.principal.toString()}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium text-foreground">
                Access Duration
              </Label>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    data-ocid="admin.grant_indefinite_radio"
                    type="radio"
                    name="grant-type"
                    checked={grantModal.isIndefinite}
                    onChange={() =>
                      setGrantModal((s) => ({ ...s, isIndefinite: true }))
                    }
                    className="accent-primary"
                  />
                  <span className="text-sm text-foreground">
                    Indefinite Access
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    data-ocid="admin.grant_expiry_radio"
                    type="radio"
                    name="grant-type"
                    checked={!grantModal.isIndefinite}
                    onChange={() =>
                      setGrantModal((s) => ({ ...s, isIndefinite: false }))
                    }
                    className="accent-primary"
                  />
                  <span className="text-sm text-foreground">
                    Set Expiry Date
                  </span>
                </label>
              </div>
            </div>
            {!grantModal.isIndefinite && (
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="grant-expiry"
                  className="text-sm font-medium text-foreground"
                >
                  Expiry Date
                </Label>
                <Input
                  id="grant-expiry"
                  data-ocid="admin.grant_expiry_input"
                  type="date"
                  value={grantModal.expiryDate}
                  onChange={(e) =>
                    setGrantModal((s) => ({ ...s, expiryDate: e.target.value }))
                  }
                  className="bg-background border-border text-foreground focus:ring-1 focus:ring-primary"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
            )}
          </div>
          <DialogFooter className="flex flex-row gap-2">
            <Button
              type="button"
              data-ocid="admin.grant_cancel_button"
              variant="ghost"
              onClick={closeGrantModal}
              disabled={grantModal.loading}
              className="flex-1 text-foreground/60 hover:text-foreground hover:bg-muted/30 transition-colors"
            >
              Cancel
            </Button>
            <Button
              type="button"
              data-ocid="admin.grant_confirm_button"
              onClick={confirmGrant}
              disabled={
                grantModal.loading ||
                (!grantModal.isIndefinite && !grantModal.expiryDate)
              }
              className="flex-1 font-bold font-display transition-colors"
              style={{
                background: "oklch(0.76 0.22 60)",
                color: "oklch(0.12 0.008 260)",
              }}
            >
              {grantModal.loading ? (
                <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
              ) : (
                "Confirm Grant"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
