import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertCircle, ArrowLeft } from "lucide-react";

import { AuthorCard } from "@/components/blog-post-page/auth-card";
import { CommentsSection } from "@/components/blog-post-page/comment-section";
import { PostBody } from "@/components/blog-post-page/post-body";
import { PostHeader } from "@/components/blog-post-page/post-header";
import { PostHero } from "@/components/blog-post-page/post-hero";
import { PostTags } from "@/components/blog-post-page/post-tags";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useBlogPostStore } from "@/store/blog-post-store";

export const Route = createFileRoute("/(app)/blog/$slug")({
  component: RouteComponent,
  //   loader: async ({ params }) => {
  //   const store = useBlogPostStore.getState();
  //   store.setPostLoading(true);
  //   try {
  //     const [post, comments] = await Promise.all([
  //       fetchPost(params.slug),
  //       fetchComments(params.slug),
  //     ]);
  //     store.setCurrentPost(post);
  //     store.setComments(comments);
  //   } catch (e) {
  //     store.setPostError("Failed to load post.");
  //   } finally {
  //     store.setPostLoading(false);
  //   }
  // },
});

//loading skeleton
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
  const {
    currentPost,
    comments,
    currentUser,
    isPostLoading,
    isCommentsLoading,
    isSubmittingComment,
    postError,
    togglePostLike,
    addComment,
    toggleCommentLike,
    deleteComment,
  } = useBlogPostStore();

  //Error state
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
      {/*
        Layout:
        - Mobile: full-width single column
        - Desktop (lg+): centred narrow column (max-w-3xl) for readability
      */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {isPostLoading || !currentPost ? (
          <PostSkeleton />
        ) : (
          <>
            {/* 1. Cover image + back button + badges */}
            <PostHero post={currentPost} />

            {/* 2. Title, excerpt, author row, like + share */}
            <PostHeader post={currentPost} onLike={togglePostLike} />

            {/* 3. Structured article body */}
            <PostBody sections={currentPost.body} />

            {/* 4. Tags */}
            <PostTags tags={currentPost.tags} />

            {/* 5. Author bio card */}
            <AuthorCard post={currentPost} />

            <Separator />

            {/* 6. Comments — composer + list */}
            <CommentsSection
              comments={comments}
              totalCount={currentPost.comments}
              currentUser={currentUser}
              isLoading={isCommentsLoading}
              isSubmitting={isSubmittingComment}
              onSubmit={addComment}
              onLikeComment={toggleCommentLike}
              onDeleteComment={deleteComment}
            />
          </>
        )}
      </div>
    </div>
  );
}
