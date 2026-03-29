export interface PricePrediction {
  crop: string;
  current: string;
  predicted: string;
  trend: "up" | "down";
  confidence: number;
}

export interface Farmer {
  id: number;
  name: string;
  avatar: string;
  avatarUrl?: string;
  verified: boolean;
  badge: string;
  location: string;
  rating: number;
  produce: string[];
  online?: boolean;
  reviews?: number;
  price?: string;
}

export interface Product {
  // Identification
  id: string | number;
  name: string;
  category: string;

  // Visuals & Branding
  image: string; // Standard URL or Emoji
  img: string; // Alias for compatibility
  badge?: string; // e.g., "Fresh", "Hot", "Organic"

  // Supplier Info
  farmer: string;
  district: string;
  verified: boolean;

  // Pricing
  price: number; // Raw UGX value
  priceValue: number; // Duplicate for logic/sorting
  unit: string; // "kg", "crate", "bunch"

  // Stock & Quality
  qty: number; // Numeric for inventory math
  qtyDisplay: string; // Formatted: "5,000 kg available"
  rating: number; // 0-5 decimal
  fresh: boolean;
}

export interface MarketProduct {
  id: number;
  name: string;
  farmer: string;
  img: string;
  badge?: string;
  price: string;
  priceValue: number; // raw number for price range filter
  rating: number;
  qty: string;
  category: string;
}

export interface Article {
  id: number;
  img: string;
  tag: string;
  title: string;
  author: string;
  readTime: string;
}

export type PostCategory =
  | "Soil & Crops"
  | "Livestock"
  | "AgriTech"
  | "Sustainability"
  | "Business"
  | "Irrigation";

export interface PostSection {
  type: "paragraph" | "heading" | "quote" | "image";
  content: string; // text for paragraph/heading/quote; URL for image
  caption?: string; // only used when type === "image"
  attribution?: string; // only used when type === "quote"
}

export type Post = {
  // ── Existing fields (unchanged) ──────────────────────────────────────────
  id: string;
  slug: string;
  image: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  likes: number;
  comments: number; // total count (denormalised)
  readTime: string;
  publishedAt: string; // ISO date string

  // ── New fields for single-post view (all optional) ────────────────────────
  authorInitials?: string;
  authorBio?: string;
  isLikedByMe?: boolean; // scoped to logged-in user; defaults to false
  body?: PostSection[]; // structured article content
  tags?: string[];
};

// ─── Comment ──────────────────────────────────────────────────────────────────

export interface Comment {
  id: string;
  postId: string;
  author: string;
  authorInitials: string;
  body: string;
  likes: number;
  isLikedByMe: boolean;
  createdAt: string; // ISO string — format on display
}

// ─── Auth user stub (replace with your real auth type) ───────────────────────

export interface AuthUser {
  id: string;
  name: string;
  initials: string;
}
