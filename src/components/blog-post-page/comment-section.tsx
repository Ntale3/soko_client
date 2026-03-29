import { MessageCircle } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { AuthUser, Comment } from "@/types";

import { CommentComposer } from "./comment-composer";
import { CommentItem } from "./comment-item";

interface CommentsSectionProps {
  comments: Comment[];
  totalCount: number;
  currentUser: AuthUser | null;
  isLoading?: boolean;
  isSubmitting?: boolean;
  onSubmit: (body: string) => void;
  onLikeComment: (id: string) => void;
  onDeleteComment: (id: string) => void;
}

function CommentsSkeleton() {
  return (
    <div className="space-y-5">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex gap-3">
          <Skeleton className="size-9 rounded-full shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3.5 w-28 rounded" />
            <Skeleton className="h-3 w-full rounded" />
            <Skeleton className="h-3 w-3/4 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function CommentsSection({
  comments,
  totalCount,
  currentUser,
  isLoading,
  isSubmitting,
  onSubmit,
  onLikeComment,
  onDeleteComment,
}: CommentsSectionProps) {
  return (
    <div className="space-y-6">
      {/* Section header */}
      <div className="flex items-center gap-2">
        <MessageCircle size={18} className="text-primary" />
        <h3 className="text-lg font-bold text-foreground font-serif">
          Comments
          <span className="ml-2 text-sm font-normal text-muted-foreground">({totalCount})</span>
        </h3>
      </div>

      {/* Composer */}
      <CommentComposer currentUser={currentUser} isSubmitting={isSubmitting} onSubmit={onSubmit} />

      <Separator />

      {/* List */}
      {isLoading ? (
        <CommentsSkeleton />
      ) : comments.length === 0 ? (
        <div className="text-center py-10 space-y-2">
          <p className="text-2xl">💬</p>
          <p className="text-sm text-muted-foreground">
            No comments yet. Be the first to share your thoughts!
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              currentUser={currentUser}
              onLike={onLikeComment}
              onDelete={onDeleteComment}
            />
          ))}
        </div>
      )}
    </div>
  );
}
