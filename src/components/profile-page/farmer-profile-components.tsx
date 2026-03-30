import { Link } from "@tanstack/react-router";
import {
  Calendar,
  MapPin,
  MessageCircle,
  Phone,
  ShoppingBag,
  Star,
  ThumbsUp,
  UserPlus,
} from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useRateFarmer } from "@/hooks/use-profile";
import { cn } from "@/lib/utils";
import { FarmerProfile, FarmerReview } from "@/types/profile";

import { ProfileAvatar, StarDisplay, StatCard, VerificationBadge } from "./profile-shared";

// ─── Farmer hero ──────────────────────────────────────────────────────────────

export function FarmerProfileHero({ farmer }: { farmer: FarmerProfile }) {
  return (
    <div className="relative rounded-3xl overflow-hidden bg-linear-to-br from-emerald-900 via-emerald-800 to-emerald-600 p-6 md:p-8">
      {/* Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.12),transparent_60%)]" />
      <div className="absolute -top-12 -right-12 size-48 rounded-full border-28 border-white/8" />

      <div className="relative z-10 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
        {/* Avatar */}
        <ProfileAvatar
          name={farmer.name}
          initials={farmer.initials}
          avatarUrl={farmer.avatarUrl}
          verified={farmer.verified}
          size="lg"
        />

        {/* Info */}
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl font-bold text-white font-serif">{farmer.name}</h1>
            {farmer.verified && <VerificationBadge status="verified" />}
          </div>

          {farmer.farmName && (
            <p className="text-emerald-200 text-sm font-medium">{farmer.farmName}</p>
          )}

          <div className="flex items-center flex-wrap gap-3 text-white/60 text-xs">
            <span className="flex items-center gap-1">
              <MapPin size={11} />
              {[farmer.village, farmer.district].filter(Boolean).join(", ")}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={11} />
              Since {new Date(farmer.memberSince).getFullYear()}
            </span>
            {farmer.responseTime && (
              <span className="flex items-center gap-1">
                <MessageCircle size={11} />
                {farmer.responseTime}
              </span>
            )}
          </div>

          <StarDisplay rating={farmer.averageRating} count={farmer.totalReviews} />
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 shrink-0">
          <Link to="/messages">
            <Button
              size="sm"
              className="bg-white text-emerald-800 hover:bg-emerald-50 rounded-xl gap-1.5 font-semibold h-9"
            >
              <MessageCircle size={13} /> Chat
            </Button>
          </Link>
          <Button
            size="icon"
            variant="outline"
            className="size-9 rounded-xl border-white/30 text-white hover:bg-white/10"
          >
            <UserPlus size={15} />
          </Button>
        </div>
      </div>

      {/* Bio */}
      {farmer.farmerBio && (
        <p className="relative z-10 mt-4 text-white/70 text-sm leading-relaxed max-w-2xl border-t border-white/10 pt-4">
          {farmer.farmerBio}
        </p>
      )}
    </div>
  );
}

// ─── Farmer stats ─────────────────────────────────────────────────────────────

export function FarmerStats({ farmer }: { farmer: FarmerProfile }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <StatCard
        label="Listings"
        value={farmer.totalListings}
        icon={<ShoppingBag size={14} className="text-primary" />}
      />
      <StatCard
        label="Units Sold"
        value={farmer.totalSales.toLocaleString()}
        icon={<ShoppingBag size={14} className="text-primary" />}
      />
      <StatCard
        label="Avg Rating"
        value={farmer.averageRating.toFixed(1)}
        sub={`${farmer.totalReviews} reviews`}
        accent
        icon={<Star size={14} className="text-primary" />}
      />
      <StatCard
        label="Reviews"
        value={farmer.totalReviews}
        icon={<MessageCircle size={14} className="text-primary" />}
      />
    </div>
  );
}

// ─── Rate farmer ──────────────────────────────────────────────────────────────

export function RateFarmerCard({ farmer }: { farmer: FarmerProfile }) {
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(farmer.isRatedByMe ?? 0);
  const [body, setBody] = useState("");
  const [submitted, setSubmitted] = useState(!!farmer.isRatedByMe);
  const rateMutation = useRateFarmer(farmer.id);

  const handleSubmit = () => {
    if (!selected) return;
    rateMutation.mutate({ rating: selected, body });
    setSubmitted(true);
  };

  return (
    <div className="bg-card border border-border/60 rounded-2xl p-5 space-y-4">
      <h3 className="text-sm font-bold text-foreground">Rate this Farmer</h3>

      {submitted ? (
        <div className="flex items-center gap-2 text-primary">
          <Star size={16} className="fill-primary" />
          <span className="text-sm font-medium">
            You rated {farmer.name} {selected} star{selected !== 1 ? "s" : ""}. Thank you!
          </span>
        </div>
      ) : (
        <>
          {/* Star picker */}
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <button
                key={i}
                onMouseEnter={() => setHovered(i + 1)}
                onMouseLeave={() => setHovered(0)}
                onClick={() => setSelected(i + 1)}
                className="p-0.5 transition-transform hover:scale-110"
              >
                <Star
                  size={24}
                  className={cn(
                    "transition-colors",
                    i < (hovered || selected)
                      ? "fill-amber-400 text-amber-400"
                      : "fill-muted text-muted-foreground/30"
                  )}
                />
              </button>
            ))}
          </div>

          {selected > 0 && (
            <div className="space-y-2 animate-in fade-in-0 slide-in-from-top-1">
              <Textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Share your experience with this farmer (optional)…"
                className="resize-none rounded-xl text-sm border-border/60 min-h-18"
              />
              <Button
                size="sm"
                onClick={handleSubmit}
                disabled={rateMutation.isPending}
                className="rounded-xl h-8 px-4 text-xs font-semibold gap-1.5"
              >
                <Star size={11} /> Submit Rating
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ─── Single review ────────────────────────────────────────────────────────────

export function FarmerReviewItem({ review }: { review: FarmerReview }) {
  function timeAgo(iso: string) {
    const d = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
    if (d < 1) return "today";
    if (d < 7) return `${d}d ago`;
    return `${Math.floor(d / 7)}w ago`;
  }

  return (
    <div className="flex gap-3">
      <Avatar className="size-9 ring-2 ring-border shrink-0">
        <AvatarFallback className="text-xs font-bold bg-muted">
          {review.reviewerInitials}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1.5">
        <div className="flex items-center justify-between flex-wrap gap-1">
          <p className="text-sm font-semibold text-foreground">{review.reviewerName}</p>
          <span className="text-xs text-muted-foreground">{timeAgo(review.createdAt)}</span>
        </div>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={11}
              className={cn(
                i < review.rating
                  ? "fill-amber-400 text-amber-400"
                  : "fill-muted text-muted-foreground/30"
              )}
            />
          ))}
        </div>
        <p className="text-sm text-foreground/80 leading-relaxed">{review.body}</p>
        <button
          className={cn(
            "flex items-center gap-1.5 text-xs font-medium rounded-full px-2.5 py-1 transition-colors",
            review.isHelpfulByMe
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted"
          )}
        >
          <ThumbsUp size={10} className={cn(review.isHelpfulByMe && "fill-primary")} />
          Helpful {review.helpful > 0 && `(${review.helpful})`}
        </button>
      </div>
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

export function FarmerProfileSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-48 w-full rounded-3xl" />
      <div className="grid grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-2xl" />
        ))}
      </div>
      <Skeleton className="h-40 w-full rounded-2xl" />
    </div>
  );
}
