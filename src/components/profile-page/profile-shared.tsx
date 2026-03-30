import { BadgeCheck, Star } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// ───> Profile Avatar

interface ProfileAvatarProps {
  name: string;
  initials: string;
  avatarUrl?: string;
  verified?: boolean;
  size?: "sm" | "md" | "lg";
}

const SIZE = { sm: "size-12", md: "size-16", lg: "size-24" };
const FONT = { sm: "text-sm", md: "text-base", lg: "text-2xl" };

export function ProfileAvatar({
  name,
  initials,
  avatarUrl,
  verified,
  size = "md",
}: ProfileAvatarProps) {
  return (
    <div className="relative inline-block">
      <Avatar className={cn(SIZE[size], "ring-4 ring-primary/20 shadow-md")}>
        {avatarUrl && <AvatarImage src={avatarUrl} alt={name} />}
        <AvatarFallback className={cn(FONT[size], "font-bold bg-primary text-primary-foreground")}>
          {initials}
        </AvatarFallback>
      </Avatar>
      {verified && (
        <div className="absolute -bottom-0.5 -right-0.5 size-5 bg-primary rounded-full flex items-center justify-center ring-2 ring-background">
          <BadgeCheck size={12} className="text-primary-foreground" strokeWidth={2.5} />
        </div>
      )}
    </div>
  );
}

// ───> Stat Card

interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  icon?: React.ReactNode;
  accent?: boolean;
}

export function StatCard({ label, value, sub, icon, accent }: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-4 space-y-1 text-center",
        accent ? "bg-primary/5 border-primary/20" : "bg-card border-border/60"
      )}
    >
      {icon && <div className="flex justify-center mb-1.5">{icon}</div>}
      <p
        className={cn(
          "text-xl font-extrabold tabular-nums leading-none",
          accent ? "text-primary" : "text-foreground"
        )}
      >
        {value}
      </p>
      <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-widest">
        {label}
      </p>
      {sub && <p className="text-[10px] text-muted-foreground">{sub}</p>}
    </div>
  );
}

// ─── Star display ─────────────────────────────────────────────────────────────

export function StarDisplay({ rating, count }: { rating: number; count?: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={13}
            className={cn(
              i < Math.round(rating)
                ? "fill-amber-400 text-amber-400"
                : "fill-muted text-muted-foreground/30"
            )}
          />
        ))}
      </div>
      <span className="text-sm font-bold text-foreground tabular-nums">{rating.toFixed(1)}</span>
      {count !== undefined && <span className="text-xs text-muted-foreground">({count})</span>}
    </div>
  );
}

// ───> Verification badge

export function VerificationBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; className: string }> = {
    verified: { label: "✓ Verified", className: "bg-primary/10 text-primary border-primary/20" },
    pending: {
      label: "⏳ Pending",
      className:
        "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800",
    },
    rejected: {
      label: "✕ Rejected",
      className: "bg-destructive/10 text-destructive border-destructive/20",
    },
    unverified: { label: "Unverified", className: "bg-muted text-muted-foreground border-border" },
  };
  const { label, className } = map[status] ?? map.unverified;
  return (
    <Badge variant="outline" className={cn("text-[10px] font-semibold", className)}>
      {label}
    </Badge>
  );
}
