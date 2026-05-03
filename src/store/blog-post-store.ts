// PLACEHOLDER_POST, PLACEHOLDER_COMMENTS and STUB_USER removed.
// Real data arrives via useBlogPost.ts hooks. The store handles
// optimistic UI mutations only — the source of truth is TanStack Query.

import { create } from "zustand";

import { AuthUser, Comment, Post } from "@/types";

//store Shape
interface BlogPostState {
  currentPost: Post | null;
  comments: Comment[];
  isPostLoading: boolean;
  isCommentsLoading: boolean;
  isSubmittingComment: boolean;
  postError: string | null;
  // currentUser is populated from useAuthStore in your component — no STUB_USER needed
  currentUser: AuthUser | null;

  // Setters — called by hooks
  setCurrentPost: (post: Post) => void;
  setComments: (comments: Comment[]) => void;
  setCurrentUser: (user: AuthUser) => void;
  setPostLoading: (v: boolean) => void;
  setCommentsLoading: (v: boolean) => void;
  setPostError: (e: string | null) => void;

  // Optimistic interactions (called by hooks before/on-error of mutations)
  togglePostLike: () => void;
  addComment: (body: string) => void;
  toggleCommentLike: (commentId: string) => void;
  deleteComment: (commentId: string) => void;
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useBlogPostStore = create<BlogPostState>((set, get) => ({
  currentPost: null, // ← no placeholder; hook fills on mount
  comments: [], // ← no placeholder; hook fills on mount
  isPostLoading: false,
  isCommentsLoading: false,
  isSubmittingComment: false,
  postError: null,
  currentUser: null, // ← set from useAuthStore in component/hook

  // ── Setters ───────────────────────────────────────────────────────────────
  setCurrentPost: (post) => set({ currentPost: post }),
  setComments: (comments) => set({ comments }),
  setCurrentUser: (user) => set({ currentUser: user }),
  setPostLoading: (v) => set({ isPostLoading: v }),
  setCommentsLoading: (v) => set({ isCommentsLoading: v }),
  setPostError: (e) => set({ postError: e }),

  // ── Like the post (optimistic) ────────────────────────────────────────────
  togglePostLike: () =>
    set((state) => {
      if (!state.currentPost) return state;
      const liked = state.currentPost.isLikedByMe ?? false;
      return {
        currentPost: {
          ...state.currentPost,
          isLikedByMe: !liked,
          likes: state.currentPost.likes + (liked ? -1 : 1),
        },
      };
    }),

  // ── Add comment (optimistic) ──────────────────────────────────────────────
  addComment: (body) => {
    const { currentUser, currentPost } = get();
    if (!currentUser || !currentPost || !body.trim()) return;

    const newComment: Comment = {
      id: `temp-${Date.now()}`,
      postId: currentPost.id,
      author: currentUser.name,
      authorInitials: currentUser.initials,
      body: body.trim(),
      likes: 0,
      isLikedByMe: false,
      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      comments: [newComment, ...state.comments],
      currentPost: state.currentPost
        ? { ...state.currentPost, comments: state.currentPost.comments + 1 }
        : null,
    }));
  },

  // ── Like/unlike a comment (optimistic) ───────────────────────────────────
  toggleCommentLike: (commentId) =>
    set((state) => ({
      comments: state.comments.map((c) =>
        c.id === commentId
          ? { ...c, isLikedByMe: !c.isLikedByMe, likes: c.likes + (c.isLikedByMe ? -1 : 1) }
          : c
      ),
    })),

  // ── Delete own comment ────────────────────────────────────────────────────
  deleteComment: (commentId) =>
    set((state) => ({
      comments: state.comments.filter((c) => c.id !== commentId),
      currentPost: state.currentPost
        ? { ...state.currentPost, comments: Math.max(0, state.currentPost.comments - 1) }
        : null,
    })),
}));
