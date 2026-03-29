import { create } from "zustand";

import { AuthUser, Comment, Post } from "@/types";

export const PLACEHOLDER_POST: Post = {
  id: "1",
  slug: "climate-smart-farming",
  title: "Climate Smart Farming: Adapting Uganda's Agriculture to Changing Weather Patterns",
  excerpt:
    "As rainfall patterns become increasingly unpredictable, Ugandan farmers are finding innovative ways to protect their crops and livelihoods through data-driven decisions and traditional knowledge.",
  image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&q=80",
  category: "Climate",
  author: "Dr. Harriet Mwanje",
  // Optional new fields — safe to include, safe to omit in list posts
  authorInitials: "HM",
  authorBio:
    "Dr. Harriet Mwanje is an agronomist at Makerere University with 15+ years of field research in climate-resilient farming across East Africa.",
  readTime: "12 min read",
  publishedAt: "2026-02-18T08:00:00Z",
  likes: 567,
  isLikedByMe: false,
  comments: 3,
  tags: ["Climate", "Sustainability", "Uganda", "Farming"],
  body: [
    {
      type: "paragraph",
      content:
        "Uganda's agricultural landscape is undergoing profound transformation as climate change reshapes growing seasons, rainfall patterns, and pest dynamics across the country. From the highlands of Kabale to the flatlands of Lira, farmers are encountering challenges that previous generations never faced.",
    },
    {
      type: "heading",
      content: "Understanding the New Climate Reality",
    },
    {
      type: "paragraph",
      content:
        "Over the past decade, studies from Makerere University's Department of Agronomy have documented a 15–20% reduction in annual rainfall in key agricultural zones, alongside a 1.2°C rise in average temperatures. These changes may seem minor, but their agricultural impact is enormous.",
    },
    {
      type: "quote",
      content:
        "We used to know exactly when to plant. Now we consult the forecast every morning. Farming has become more of a science.",
      attribution: "Akello Grace, Potato Farmer, Kabale",
    },
    {
      type: "paragraph",
      content:
        "Climate-smart agriculture combines practices that increase productivity, build resilience to climate shocks, and reduce greenhouse gas emissions where possible. It is not a single technology but a portfolio of context-specific strategies.",
    },
    {
      type: "heading",
      content: "Practical Strategies for Ugandan Farmers",
    },
    {
      type: "paragraph",
      content:
        "Several proven approaches are gaining traction across Uganda's farming communities, from agroforestry integration to rainwater harvesting and drought-resistant crop varieties. Early adopters in Mbarara and Soroti districts report 30–45% better yields during dry spells compared to neighbours using conventional methods.",
    },
    {
      type: "image",
      content: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=900&q=80",
      caption: "Farmers in Mbarara demonstrate intercropping techniques on a half-acre plot.",
    },
    {
      type: "paragraph",
      content:
        "Access to timely weather information is equally critical. Platforms like Soko's AI Insights feature are helping bridge the information gap by delivering hyperlocal price and weather predictions directly to farmers' phones — reducing guesswork and enabling smarter planting decisions.",
    },
  ],
};

// ─── Placeholder comments ─────────────────────────────────────────────────────

export const PLACEHOLDER_COMMENTS: Comment[] = [
  {
    id: "c1",
    postId: "1",
    author: "Ssemakula Brian",
    authorInitials: "SB",
    body: "This is exactly what we need more of. I've started implementing rainwater harvesting on my 3-acre plot in Wakiso and the results in the last dry season were remarkable.",
    likes: 14,
    isLikedByMe: false,
    createdAt: "2026-02-21T10:30:00Z",
  },
  {
    id: "c2",
    postId: "1",
    author: "Namutebi Faith",
    authorInitials: "NF",
    body: "Very informative. I shared this with our farming cooperative in Jinja. We're planning to try conservation agriculture on a trial plot this coming season.",
    likes: 9,
    isLikedByMe: false,
    createdAt: "2026-02-22T14:15:00Z",
  },
  {
    id: "c3",
    postId: "1",
    author: "Tumuhaise Peter",
    authorInitials: "TP",
    body: "Could you write more about the specific drought-resistant varieties that perform well in dry conditions? Particularly for beans and groundnuts in northern Uganda.",
    likes: 22,
    isLikedByMe: true,
    createdAt: "2026-02-23T08:00:00Z",
  },
];

// ─── Stub logged-in user ──────────────────────────────────────────────────────
// Replace with your real auth store/context when ready.

export const STUB_USER: AuthUser = {
  id: "u1",
  name: "Amina K",
  initials: "AK",
};

// ─── Store shape ──────────────────────────────────────────────────────────────

interface BlogPostState {
  currentPost: Post | null;
  comments: Comment[];
  isPostLoading: boolean;
  isCommentsLoading: boolean;
  isSubmittingComment: boolean;
  postError: string | null;
  currentUser: AuthUser | null;

  // Setters — call from your API layer / TanStack Query
  setCurrentPost: (post: Post) => void;
  setComments: (comments: Comment[]) => void;
  setCurrentUser: (user: AuthUser) => void;
  setPostLoading: (v: boolean) => void;
  setCommentsLoading: (v: boolean) => void;
  setPostError: (e: string | null) => void;

  // Interactions
  togglePostLike: () => void;
  addComment: (body: string) => void;
  toggleCommentLike: (commentId: string) => void;
  deleteComment: (commentId: string) => void;
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useBlogPostStore = create<BlogPostState>((set, get) => ({
  currentPost: PLACEHOLDER_POST,
  comments: PLACEHOLDER_COMMENTS,
  isPostLoading: false,
  isCommentsLoading: false,
  isSubmittingComment: false,
  postError: null,
  currentUser: STUB_USER,

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
          ? {
              ...c,
              isLikedByMe: !c.isLikedByMe,
              likes: c.likes + (c.isLikedByMe ? -1 : 1),
            }
          : c
      ),
    })),

  // ── Delete own comment ────────────────────────────────────────────────────
  deleteComment: (commentId) =>
    set((state) => ({
      comments: state.comments.filter((c) => c.id !== commentId),
      currentPost: state.currentPost
        ? {
            ...state.currentPost,
            comments: Math.max(0, state.currentPost.comments - 1),
          }
        : null,
    })),
}));
