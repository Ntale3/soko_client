import { Heart, Trash2 } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AuthUser, Comment } from "@/types";

interface CommentItemProps {
  comment: Comment;
  currentUser: AuthUser | null;
  onLike: (id: string) => void;
  onDelete: (id: string) => void;
}

function timeAgo(iso: string): string {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export function CommentItem({ comment, currentUser, onLike, onDelete }: CommentItemProps) {
  const isOwn = currentUser?.name === comment.author;

  return (
    <div className="flex gap-3 group">
      {/* Avatar */}
      <Avatar className="size-9 ring-2 ring-border shrink-0 mt-0.5">
        <AvatarFallback className="text-xs font-bold bg-muted text-muted-foreground">
          {comment.authorInitials}
        </AvatarFallback>
      </Avatar>

      {/* Body */}
      <div className="flex-1 min-w-0 space-y-1.5">
        {/* Name + time */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-semibold text-foreground leading-none">
            {comment.author}
          </span>
          {isOwn && (
            <span className="text-[9px] font-semibold uppercase tracking-widest text-primary bg-primary/10 rounded-full px-1.5 py-0.5">
              You
            </span>
          )}
          <span className="text-xs text-muted-foreground">· {timeAgo(comment.createdAt)}</span>
        </div>

        {/* Comment text */}
        <p className="text-sm text-foreground/80 leading-relaxed">{comment.body}</p>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onLike(comment.id)}
            className={cn(
              "flex items-center gap-1 text-xs font-medium transition-colors rounded-full px-2 py-0.5",
              comment.isLikedByMe
                ? "text-destructive bg-destructive/10"
                : "text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            )}
          >
            <Heart size={11} className={cn(comment.isLikedByMe && "fill-destructive")} />
            {comment.likes > 0 && comment.likes}
          </button>

          {/* Delete — only for own comments */}
          {isOwn && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(comment.id)}
              className="size-6 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive rounded-full"
            >
              <Trash2 size={11} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
