import { Heart, Share2 } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Post } from "@/types";

interface PostHeaderProps {
  post: Post;
  onLike: () => void;
  onShare?: () => void;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-UG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function PostHeader({ post, onLike, onShare }: PostHeaderProps) {
  const handleShare = () => {
    if (onShare) {
      onShare();
    } else if (navigator.share) {
      navigator.share({ title: post.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="space-y-4">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight font-serif">
        {post.title}
      </h1>

      {/* Excerpt */}
      <p className="text-muted-foreground text-base leading-relaxed">{post.excerpt}</p>

      <Separator />

      {/* Author row */}
      <div className="flex flex-wrap items-center gap-4 justify-between">
        {/* Author */}
        <div className="flex items-center gap-3">
          <Avatar className="size-11 ring-2 ring-primary/20">
            <AvatarFallback className="text-sm font-bold bg-primary text-primary-foreground">
              {post.authorInitials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold text-foreground leading-none">{post.author}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{formatDate(post.publishedAt)}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onLike}
            className={cn(
              "rounded-xl gap-1.5 h-9 px-4 transition-all duration-200 border",
              post.isLikedByMe
                ? "bg-destructive/10 border-destructive/30 text-destructive hover:bg-destructive/20"
                : "hover:bg-muted"
            )}
          >
            <Heart
              size={14}
              className={cn(
                "transition-all",
                post.isLikedByMe && "fill-destructive text-destructive"
              )}
            />
            <span className="font-semibold tabular-nums">{post.likes}</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="rounded-xl gap-1.5 h-9 px-4 hover:bg-muted"
          >
            <Share2 size={14} />
            Share
          </Button>
        </div>
      </div>

      <Separator />
    </div>
  );
}
