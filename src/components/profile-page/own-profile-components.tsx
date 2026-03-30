import {
  Bell,
  ChevronRight,
  CreditCard,
  FileText,
  Globe,
  Heart,
  LogOut,
  Moon,
  Package,
  ShieldCheck,
  Sun,
  SunMoon,
  Wallet,
} from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useMyOrders, useMyPayouts } from "@/hooks/use-profile";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";
import { OrderSummaryItem, PayoutRecord, ThemePreference } from "@/types/profile";

import { ProfileAvatar, StatCard, VerificationBadge } from "./profile-shared";

// ───> Own profile hero

export function OwnProfileHero() {
  const { user } = useAuthStore();
  if (!user) return null;

  const roleLabel = { buyer: "Buyer", farmer: "Farmer", both: "Farmer & Buyer" }[user.role];

  return (
    <div className="bg-card border border-border/60 rounded-3xl p-6 space-y-4">
      <div className="flex items-start gap-4">
        <ProfileAvatar
          name={user.name}
          initials={user.initials}
          avatarUrl={user.avatarUrl}
          verified={user.verified}
          size="lg"
        />
        <div className="flex-1 min-w-0 space-y-1.5">
          <h1 className="text-xl font-bold text-foreground font-serif">{user.name}</h1>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="secondary" className="text-[10px] font-semibold">
              {roleLabel}
            </Badge>
            <VerificationBadge status={user.verificationStatus} />
          </div>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            {user.district}
            {user.village ? `, ${user.village}` : ""}
          </p>
          {user.farmName && <p className="text-xs text-primary font-medium">{user.farmName}</p>}
        </div>
      </div>

      {user.farmerBio && (
        <p className="text-xs text-muted-foreground leading-relaxed border-t border-border/40 pt-4">
          {user.farmerBio}
        </p>
      )}

      <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border/40 pt-3">
        <span>{user.email}</span>
        <span>{user.phone}</span>
      </div>
    </div>
  );
}

// ─── Buyer stats ──────────────────────────────────────────────────────────────

export function BuyerStatsRow() {
  const { user } = useAuthStore();
  if (!user) return null;
  return (
    <div className="grid grid-cols-3 gap-3">
      <StatCard label="Orders" value={user.totalOrders ?? 0} />
      <StatCard
        label="Total Spent"
        value={`UGX ${((user.totalSpent ?? 0) / 1000).toFixed(0)}K`}
        accent
      />
      <StatCard label="Wishlist" value={user.wishlistCount ?? 0} />
    </div>
  );
}

// ─── Farmer stats ─────────────────────────────────────────────────────────────

export function FarmerStatsRow() {
  const { user } = useAuthStore();
  if (!user) return null;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <StatCard label="Listings" value={user.totalListings ?? 0} />
      <StatCard label="Units Sold" value={(user.totalSales ?? 0).toLocaleString()} />
      <StatCard
        label="Total Earned"
        value={`UGX ${Math.round(((user.totalEarned ?? 0) / 1_000_000) * 10) / 10}M`}
        accent
      />
      <StatCard
        label="Pending"
        value={`UGX ${((user.pendingPayout ?? 0) / 1000).toFixed(0)}K`}
        sub="awaiting release"
      />
    </div>
  );
}

// ─── Order status pill ────────────────────────────────────────────────────────

function OrderStatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400",
    confirmed: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400",
    dispatched:
      "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/30 dark:text-purple-400",
    delivered: "bg-primary/10 text-primary border-primary/20",
    cancelled: "bg-destructive/10 text-destructive border-destructive/20",
  };
  return (
    <Badge
      variant="outline"
      className={cn("text-[10px] font-semibold capitalize", map[status] ?? "")}
    >
      {status}
    </Badge>
  );
}

// ─── Order history ────────────────────────────────────────────────────────────

export function OrderHistory() {
  const { data: orders, isLoading } = useMyOrders();

  if (isLoading)
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-full rounded-2xl" />
        ))}
      </div>
    );

  if (!orders?.length)
    return (
      <div className="text-center py-10 space-y-2">
        <Package size={32} className="text-muted-foreground/30 mx-auto" />
        <p className="text-sm text-muted-foreground">No orders yet</p>
      </div>
    );

  return (
    <div className="space-y-2.5">
      {orders.map((order) => (
        <div
          key={order.id}
          className="flex gap-3 items-center bg-card border border-border/60 rounded-2xl p-3.5"
        >
          <div className="size-12 rounded-xl overflow-hidden bg-muted shrink-0">
            <img
              src={order.productImage}
              alt={order.productName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0 space-y-0.5">
            <p className="text-sm font-semibold text-foreground line-clamp-1">
              {order.productName}
            </p>
            <p className="text-xs text-muted-foreground">
              {order.quantity} {order.unit}s · {order.farmer}
            </p>
            <div className="flex items-center gap-2">
              <OrderStatusBadge status={order.status} />
              <span className="text-[10px] text-muted-foreground">
                {new Date(order.createdAt).toLocaleDateString("en-UG", {
                  day: "numeric",
                  month: "short",
                })}
              </span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="text-sm font-extrabold text-primary tabular-nums">
              UGX {order.total.toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Earnings / payouts ───────────────────────────────────────────────────────

export function EarningsPanel() {
  const { data: payouts, isLoading } = useMyPayouts();

  if (isLoading)
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-2xl" />
        ))}
      </div>
    );

  if (!payouts?.length)
    return <p className="text-sm text-muted-foreground text-center py-8">No payouts yet</p>;

  return (
    <div className="space-y-2.5">
      {payouts.map((p) => (
        <div
          key={p.id}
          className="flex items-center gap-3 bg-card border border-border/60 rounded-2xl px-4 py-3"
        >
          <div
            className={cn(
              "size-9 rounded-xl flex items-center justify-center shrink-0",
              p.status === "paid" ? "bg-primary/10" : "bg-muted"
            )}
          >
            <Wallet
              size={15}
              className={p.status === "paid" ? "text-primary" : "text-muted-foreground"}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-foreground line-clamp-1">{p.product}</p>
            <p className="text-[11px] text-muted-foreground">
              {p.buyerName} · {p.orderId}
            </p>
          </div>
          <div className="text-right shrink-0 space-y-0.5">
            <p
              className={cn(
                "text-sm font-extrabold tabular-nums",
                p.status === "paid" ? "text-primary" : "text-muted-foreground"
              )}
            >
              UGX {p.amount.toLocaleString()}
            </p>
            <Badge
              variant="outline"
              className={cn(
                "text-[9px] font-semibold",
                p.status === "paid"
                  ? "text-primary border-primary/20 bg-primary/5"
                  : "text-amber-600 border-amber-200 bg-amber-50 dark:bg-amber-950/30"
              )}
            >
              {p.status}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Settings panel ───────────────────────────────────────────────────────────

function SettingsRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between py-3.5">
      <div className="flex items-center gap-3">
        <div className="size-8 rounded-lg bg-muted/60 flex items-center justify-center text-muted-foreground">
          {icon}
        </div>
        <span className="text-sm font-medium text-foreground">{label}</span>
      </div>
      {children}
    </div>
  );
}

export function SettingsPanel() {
  const { settings, setTheme, updateSettings, logout } = useAuthStore();

  const themes: { value: ThemePreference; icon: React.ReactNode; label: string }[] = [
    { value: "light", icon: <Sun size={14} />, label: "Light" },
    { value: "dark", icon: <Moon size={14} />, label: "Dark" },
    { value: "system", icon: <SunMoon size={14} />, label: "System" },
  ];

  return (
    <div className="bg-card border border-border/60 rounded-2xl px-5 divide-y divide-border/40">
      {/* Theme */}
      <SettingsRow icon={<SunMoon size={15} />} label="Appearance">
        <div className="flex items-center gap-1 bg-muted/60 rounded-xl p-1">
          {themes.map((t) => (
            <button
              key={t.value}
              onClick={() => setTheme(t.value)}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all",
                settings.theme === t.value
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t.icon}
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>
      </SettingsRow>

      {/* Notifications */}
      <SettingsRow icon={<Bell size={15} />} label="Email Notifications">
        <Switch
          checked={settings.notificationsEmail}
          onCheckedChange={(v) => updateSettings({ notificationsEmail: v })}
        />
      </SettingsRow>
      <SettingsRow icon={<Bell size={15} />} label="SMS Notifications">
        <Switch
          checked={settings.notificationsSms}
          onCheckedChange={(v) => updateSettings({ notificationsSms: v })}
        />
      </SettingsRow>

      {/* Language */}
      <SettingsRow icon={<Globe size={15} />} label="Language">
        <select
          value={settings.language}
          onChange={(e) => updateSettings({ language: e.target.value as any })}
          className="text-xs bg-muted/60 border border-border/50 rounded-lg px-2.5 py-1.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
        >
          <option value="en">English</option>
          <option value="lg">Luganda</option>
          <option value="sw">Swahili</option>
        </select>
      </SettingsRow>

      {/* Verification */}
      <SettingsRow icon={<ShieldCheck size={15} />} label="Verification">
        <button className="flex items-center gap-1 text-xs text-primary hover:underline">
          View status <ChevronRight size={12} />
        </button>
      </SettingsRow>

      {/* Log out */}
      <SettingsRow icon={<LogOut size={15} className="text-destructive" />} label="Sign Out">
        <Button
          size="sm"
          variant="outline"
          className="h-7 text-xs rounded-lg text-destructive border-destructive/30 hover:bg-destructive/10"
          onClick={logout}
        >
          Sign out
        </Button>
      </SettingsRow>
    </div>
  );
}
