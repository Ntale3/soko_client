import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { useEffect } from "react";

import { AuthorCard } from "@/components/blog-post-page/auth-card";
import { CommentsSection } from "@/components/blog-post-page/comment-section";
import { PostBody } from "@/components/blog-post-page/post-body";
import { PostHeader } from "@/components/blog-post-page/post-header";
import { PostHero } from "@/components/blog-post-page/post-hero";
import { PostTags } from "@/components/blog-post-page/post-tags";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useAddComment,
  useComments,
  useDeleteComment,
  usePost,
  useToggleCommentLike,
  useTogglePostLike,
} from "@/hooks/useBlogPost";
import { useAuthStore } from "@/store/auth-store";
import { useBlogPostStore } from "@/store/blog-post-store";

export const Route = createFileRoute("/(app)/blog/$slug")({
  component: RouteComponent,
});

function PostSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-72 w-full rounded-3xl" />
      <Skeleton className="h-8 w-3/4 rounded-lg" />
      <Skeleton className="h-4 w-full rounded" />
      <Skeleton className="h-4 w-5/6 rounded" />
      <div className="flex gap-3">
        <Skeleton className="size-11 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-32 rounded" />
          <Skeleton className="h-3 w-24 rounded" />
        </div>
      </div>
    </div>
  );
}

function RouteComponent() {
  const { slug } = Route.useParams();

  // ── Sync auth user into post store so optimistic comments get real name ──
  const authUser = useAuthStore((s) => s.user);
  const setCurrentUser = useBlogPostStore((s) => s.setCurrentUser);
  useEffect(() => {
    if (authUser) {
      setCurrentUser({
        id: authUser.id,
        name: authUser.name,
        initials: authUser.initials,
      });
    }
  }, [authUser, setCurrentUser]);

  // ── Fetch post
  usePost(slug);

  // ── Read from store
  const {
    currentPost,
    comments,
    currentUser,
    isPostLoading,
    isCommentsLoading,
    isSubmittingComment,
    postError,
  } = useBlogPostStore();

  // Fetch comments once we have the post id
  useComments(currentPost?.id);

  //  Mutations
  const { mutate: togglePostLike } = useTogglePostLike();
  const { mutate: addComment } = useAddComment(currentPost?.id);
  const { mutate: deleteComment } = useDeleteComment(currentPost?.id);
  const { mutate: toggleCommentLike } = useToggleCommentLike(currentPost?.id);

  // Error state
  if (postError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center space-y-4 max-w-sm">
          <AlertCircle className="size-10 text-destructive mx-auto" />
          <p className="text-sm text-muted-foreground">{postError}</p>
          <Link to="/blog">
            <Button variant="outline" size="sm" className="rounded-xl gap-1.5">
              <ArrowLeft size={13} /> Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {isPostLoading || !currentPost ? (
          <PostSkeleton />
        ) : (
          <>
            <PostHero post={currentPost} />
            <PostHeader post={currentPost} onLike={() => togglePostLike()} />
            <PostBody sections={currentPost.body} />
            <PostTags tags={currentPost.tags} />
            <AuthorCard post={currentPost} />
            <Separator />
            <CommentsSection
              comments={comments}
              totalCount={currentPost.comments}
              currentUser={currentUser}
              isLoading={isCommentsLoading}
              isSubmitting={isSubmittingComment}
              onSubmit={(body) => addComment(body)}
              onLikeComment={(id) => toggleCommentLike(id)}
              onDeleteComment={(id) => deleteComment(id)}
            />
          </>
        )}
      </div>
    </div>
  );
}
