import { Link } from "@tanstack/react-router";
import { ArrowRight, Heart, MessageCircle, Sparkles } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { FeaturedPost as FeaturedPostType } from "@/store/blog-store";

interface FeaturedPostProps {
  post: FeaturedPostType | null;
  isLoading?: boolean;
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────
function FeaturedPostSkeleton() {
  return (
    <div className="rounded-3xl overflow-hidden bg-muted p-6 md:p-8 lg:p-10 space-y-4">
      <Skeleton className="h-5 w-24 rounded-full" />
      <Skeleton className="h-8 w-3/4 rounded-lg" />
      <Skeleton className="h-4 w-full rounded-md" />
      <Skeleton className="h-4 w-2/3 rounded-md" />
      <Skeleton className="h-9 w-32 rounded-xl" />
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export function FeaturedPost({ post, isLoading }: FeaturedPostProps) {
  if (isLoading) return <FeaturedPostSkeleton />;
  if (!post) return null;

  return (
    <Link
      to={`/blog/$slug`}
      params={{ slug: post.slug }}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-3xl"
    >
      <div className="relative rounded-3xl overflow-hidden bg-linear-to-br from-emerald-900 via-emerald-800 to-emerald-600 shadow-xl">
        {/* Mesh overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.12)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,0,0,0.25)_0%,transparent_70%)]" />

        {/* Decorative rings */}
        <div className="absolute -top-16 -right-16 size-64 rounded-full border-32 border-white/8" />
        <div className="absolute -top-8 -right-8 size-40 rounded-full border-20 border-white/6" />

        {/* Watermark emoji */}
        <div className="absolute right-8 top-4 text-[100px] md:text-[140px] opacity-10 select-none pointer-events-none leading-none">
          🌦️
        </div>

        {/* Content */}
        <div className="relative z-10 p-6 md:p-8 lg:p-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            {/* ── Left: text ── */}
            <div className="flex-1 min-w-0">
              {/* Badges */}
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-white/15 border border-white/25 text-white hover:bg-white/20 text-[10px] uppercase tracking-widest font-semibold backdrop-blur-sm">
                  <Sparkles size={9} className="mr-1 text-emerald-300" />
                  Featured
                </Badge>
                <Badge
                  variant="outline"
                  className="border-white/25 text-white/70 text-[10px] uppercase tracking-widest"
                >
                  {post.category}
                </Badge>
              </div>

              {/* Headline */}
              <h2 className="text-white font-bold text-xl md:text-2xl lg:text-3xl leading-tight mb-3 max-w-xl font-serif group-hover:text-emerald-200 transition-colors duration-300">
                {post.title}
              </h2>

              {/* Excerpt */}
              <p className="text-white/60 text-sm leading-relaxed max-w-lg line-clamp-2 md:line-clamp-3 mb-5">
                {post.excerpt}
              </p>

              {/* CTA */}
              <Button
                size="sm"
                className="bg-white text-emerald-800 hover:bg-emerald-50 font-semibold rounded-xl gap-1.5 shadow-lg shadow-black/20 h-9 px-4 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                Read Article
                <ArrowRight size={13} />
              </Button>
            </div>

            {/* ── Right: author + stats ── */}
            <div className="flex flex-row lg:flex-col items-center lg:items-end gap-4 lg:gap-3 shrink-0">
              {/* Author */}
              <div className="flex items-center gap-2.5">
                <Avatar className="size-8 ring-2 ring-white/30">
                  <AvatarFallback className="text-[10px] font-bold bg-emerald-700 text-white">
                    {post.authorInitials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-white text-xs font-semibold leading-none">{post.author}</p>
                  <p className="text-white/50 text-[10px] mt-0.5">
                    {post.date} · {post.readTime}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-3 lg:justify-end">
                <span className="flex items-center gap-1 text-white/60 text-xs">
                  <Heart size={12} className="text-red-400" />
                  {post.likes}
                </span>
                <span className="flex items-center gap-1 text-white/60 text-xs">
                  <MessageCircle size={12} className="text-emerald-300" />
                  {post.comments}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
