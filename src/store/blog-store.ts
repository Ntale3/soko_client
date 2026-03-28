import { create } from "zustand";

import { Post } from "@/types";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FeaturedPost {
  title: string;
  excerpt: string;
  author: string;
  authorInitials: string;
  date: string;
  readTime: string;
  likes: number;
  comments: number;
  category: string;
  slug: string;
}

export type BlogCategory =
  | "All"
  | "Grains"
  | "Vegetables"
  | "Fruits"
  | "Herbs"
  | "Business"
  | "Technology"
  | "Climate";

export const BLOG_CATEGORIES: BlogCategory[] = [
  "All",
  "Grains",
  "Vegetables",
  "Fruits",
  "Herbs",
  "Business",
  "Technology",
  "Climate",
];

export const TRENDING_TOPICS = ["Climate Smart Farming", "Avocado Exports", "Vanilla Prices"];

// ─── Store shape ──────────────────────────────────────────────────────────────

interface BlogState {
  // Data
  posts: Post[];
  featuredPost: FeaturedPost | null;
  activeCategory: BlogCategory;
  isLoading: boolean;
  error: string | null;

  // Derived
  filteredPosts: () => Post[];

  // Actions
  setActiveCategory: (category: BlogCategory) => void;
  setPosts: (posts: Post[]) => void; // call this after your API fetch
  setFeaturedPost: (post: FeaturedPost) => void; // call this after your API fetch
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

// ─── Default featured (swap out once backend is wired) ────────────────────────

const DEFAULT_FEATURED: FeaturedPost = {
  title: "Climate Smart Farming: Adapting Uganda's Agriculture to Changing Weather Patterns",
  excerpt:
    "As rainfall patterns become increasingly unpredictable, Ugandan farmers are finding innovative ways to protect their crops and livelihoods through data-driven decisions and traditional knowledge.",
  author: "Dr. Harriet Mwanje",
  authorInitials: "HM",
  date: "Feb 18, 2026",
  readTime: "12 min read",
  likes: 567,
  comments: 89,
  category: "Climate",
  slug: "climate-smart-farming",
};

// ─── Placeholder posts (swap out once backend is wired) ───────────────────────

export const PLACEHOLDER_POSTS: Post[] = [
  {
    id: "1",
    title: "How to Maximize Maize Yield in Dry Seasons",
    excerpt:
      "Practical irrigation and soil techniques that top farmers swear by across the Nile Basin region.",
    author: "James Okello",
    image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=400&q=80",
    category: "Grains",
    likes: 214,
    comments: 31,
    readTime: "6 min read",
    slug: "maize-yield",
    publishedAt: "",
  },
  {
    id: "2",
    title: "Organic Tomato Farming: From Seedling to Market",
    excerpt:
      "A step-by-step guide on growing certified organic tomatoes that command premium prices.",
    author: "Sarah Nakato",
    image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=400&q=80",
    category: "Vegetables",
    likes: 189,
    comments: 22,
    readTime: "8 min read",
    slug: "organic-tomatoes",
    publishedAt: "",
  },
  {
    id: "3",
    title: "Avocado Export Opportunities in East Africa",
    excerpt:
      "Understanding the logistics and certification needed to tap into EU and Middle East export markets.",
    author: "Peter Tumuhaise",
    image: "https://images.unsplash.com/photo-1601039641847-7857b994d704?w=400&q=80",
    category: "Fruits",
    likes: 342,
    comments: 54,
    readTime: "10 min read",
    slug: "avocado-export",
    publishedAt: "",
  },
  {
    id: "4",
    title: "Vanilla Farming: Uganda's Hidden Gold",
    excerpt:
      "How small-scale vanilla farmers in Bundibugyo are earning 3x more than traditional cash crops.",
    author: "Grace Akello",
    image: "https://images.unsplash.com/photo-1607877742574-a7d9a7449af3?w=400&q=80",
    category: "Herbs",
    likes: 278,
    comments: 41,
    readTime: "7 min read",
    slug: "vanilla-farming",
    publishedAt: "",
  },
  {
    id: "5",
    title: "Digital Tools Transforming Ugandan Agriculture",
    excerpt: "From satellite imagery to mobile money, technology is reshaping how farmers operate.",
    author: "David Ssempa",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80",
    category: "Technology",
    likes: 401,
    comments: 67,
    readTime: "9 min read",
    slug: "digital-tools",
    publishedAt: "",
  },
  {
    id: "6",
    title: "Building a Farming Cooperative That Works",
    excerpt:
      "Lessons from Wakiso District's most successful farmer cooperative — 400 members, one voice.",
    author: "Mary Namukasa",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&q=80",
    category: "Business",
    likes: 156,
    comments: 19,
    readTime: "5 min read",
    slug: "farming-cooperative",
    publishedAt: "",
  },
];

// ─── Store ────────────────────────────────────────────────────────────────────

export const useBlogStore = create<BlogState>((set, get) => ({
  // Initial data — replace PLACEHOLDER_POSTS with [] once you fetch from backend
  posts: PLACEHOLDER_POSTS,
  featuredPost: DEFAULT_FEATURED,
  activeCategory: "All",
  isLoading: false,
  error: null,

  // Derived: filter posts by active category
  filteredPosts: () => {
    const { posts, activeCategory } = get();
    if (activeCategory === "All") return posts;
    return posts.filter((p) => p.category === activeCategory);
  },

  // Actions
  setActiveCategory: (category) => set({ activeCategory: category }),

  // ↓ Call these from your TanStack Query onSuccess / useEffect after fetch
  setPosts: (posts) => set({ posts }),
  setFeaturedPost: (post) => set({ featuredPost: post }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
