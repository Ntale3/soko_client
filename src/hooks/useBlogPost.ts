// hooks/useBlogPost.ts
// TanStack Query hooks for the blog POST DETAIL page.
// Handles: post fetch, comments, like toggling (optimistic), comment CRUD.

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  addCommentApi,
  deleteCommentApi,
  fetchComments,
  fetchPost,
  toggleCommentLikeApi,
  togglePostLikeApi,
} from "@/api/blog.api";
import { useAuthStore } from "@/store/auth-store";
import { useBlogPostStore } from "@/store/blog-post-store";
import { LikeResponse } from "@/types/blogs";

// ── Query keys ────────────────────────────────────────────────────────────────

export const postKeys = {
  detail: (slug: string) => ["posts", "detail", slug] as const,
  comments: (postId: string) => ["posts", "comments", postId] as const,
};

// ── usePost — fetch single post by slug ───────────────────────────────────────

export function usePost(slug: string) {
  const token = useAuthStore((s) => s.token);
  const setCurrentPost = useBlogPostStore((s) => s.setCurrentPost);
  const setPostLoading = useBlogPostStore((s) => s.setPostLoading);
  const setPostError = useBlogPostStore((s) => s.setPostError);

  return useQuery({
    queryKey: postKeys.detail(slug),
    queryFn: async () => {
      setPostLoading(true);
      try {
        const post = await fetchPost(slug, token);
        setCurrentPost(post);
        setPostError(null);
        return post;
      } catch (err) {
        setPostError((err as Error).message);
        throw err;
      } finally {
        setPostLoading(false);
      }
    },
    enabled: !!slug,
    staleTime: 1000 * 60 * 2,
  });
}

// ── useComments — fetch comments for a post ───────────────────────────────────

export function useComments(postId: string | undefined) {
  const token = useAuthStore((s) => s.token);
  const setComments = useBlogPostStore((s) => s.setComments);
  const setLoading = useBlogPostStore((s) => s.setCommentsLoading);

  return useQuery({
    queryKey: postKeys.comments(postId ?? ""),
    queryFn: async () => {
      setLoading(true);
      try {
        const comments = await fetchComments(postId!, token);
        setComments(comments);
        return comments;
      } finally {
        setLoading(false);
      }
    },
    enabled: !!postId,
    staleTime: 1000 * 60,
  });
}

// ── useTogglePostLike — optimistic like on the post ───────────────────────────

export function useTogglePostLike() {
  const token = useAuthStore((s) => s.token);
  const currentPost = useBlogPostStore((s) => s.currentPost);
  const togglePostLike = useBlogPostStore((s) => s.togglePostLike);
  const qc = useQueryClient();

  return useMutation({
    // Optimistic update first — feels instant
    onMutate: () => {
      togglePostLike(); // flips isLikedByMe + adjusts count locally
    },
    mutationFn: async () => {
      if (!token) throw new Error("Login to like posts");
      if (!currentPost?.id) throw new Error("No post loaded");
      return togglePostLikeApi(currentPost.id, token);
    },
    onSuccess: (data: LikeResponse) => {
      // Sync server count in case of race conditions
      const post = useBlogPostStore.getState().currentPost;
      if (post) {
        useBlogPostStore.setState({
          currentPost: { ...post, likes: data.likes, isLikedByMe: data.liked },
        });
      }
      // Invalidate the list so the count updates there too
      if (currentPost?.slug) {
        qc.invalidateQueries({ queryKey: postKeys.detail(currentPost.slug) });
      }
    },
    onError: () => {
      // Roll back the optimistic update
      togglePostLike();
    },
  });
}

// ── useAddComment ─────────────────────────────────────────────────────────────

export function useAddComment(postId: string | undefined) {
  const token = useAuthStore((s) => s.token);
  const addComment = useBlogPostStore((s) => s.addComment); // optimistic
  const setComments = useBlogPostStore((s) => s.setComments);
  const qc = useQueryClient();

  return useMutation({
    onMutate: (body: string) => {
      addComment(body); // immediate UI update
    },
    mutationFn: async (body: string) => {
      if (!token) throw new Error("Login to comment");
      if (!postId) throw new Error("No post id");
      return addCommentApi(postId, { body }, token);
    },
    onSuccess: () => {
      // Refresh comments from server to get the real id + createdAt
      if (postId) qc.invalidateQueries({ queryKey: postKeys.comments(postId) });
    },
    onError: (_err, body) => {
      // Roll back by filtering out the temp comment
      const state = useBlogPostStore.getState();
      setComments(state.comments.filter((c) => !c.id.startsWith("temp-")));
    },
  });
}

// ── useDeleteComment ──────────────────────────────────────────────────────────

export function useDeleteComment(postId: string | undefined) {
  const token = useAuthStore((s) => s.token);
  const deleteComment = useBlogPostStore((s) => s.deleteComment); // optimistic
  const setComments = useBlogPostStore((s) => s.setComments);
  const qc = useQueryClient();

  return useMutation({
    onMutate: (commentId: string) => {
      // Snapshot for rollback
      const prev = useBlogPostStore.getState().comments;
      deleteComment(commentId); // optimistic remove
      return { prev };
    },
    mutationFn: async (commentId: string) => {
      if (!token) throw new Error("Login required");
      if (!postId) throw new Error("No post id");
      return deleteCommentApi(postId, commentId, token);
    },
    onSuccess: () => {
      if (postId) qc.invalidateQueries({ queryKey: postKeys.comments(postId) });
    },
    onError: (_err, _commentId, ctx) => {
      if (ctx?.prev) setComments(ctx.prev);
    },
  });
}

// ── useToggleCommentLike ──────────────────────────────────────────────────────

export function useToggleCommentLike(postId: string | undefined) {
  const token = useAuthStore((s) => s.token);
  const toggleCommentLike = useBlogPostStore((s) => s.toggleCommentLike);
  const setComments = useBlogPostStore((s) => s.setComments);

  return useMutation({
    onMutate: (commentId: string) => {
      const prev = useBlogPostStore.getState().comments;
      toggleCommentLike(commentId); // optimistic
      return { prev };
    },
    mutationFn: async (commentId: string) => {
      if (!token) throw new Error("Login to like comments");
      if (!postId) throw new Error("No post id");
      return toggleCommentLikeApi(postId, commentId, token);
    },
    onSuccess: (data: LikeResponse, commentId) => {
      // Sync server count
      const comments = useBlogPostStore
        .getState()
        .comments.map((c) =>
          c.id === commentId ? { ...c, likes: data.likes, isLikedByMe: data.liked } : c
        );
      setComments(comments);
    },
    onError: (_err, _id, ctx) => {
      if (ctx?.prev) setComments(ctx.prev);
    },
  });
}
