import { BlogCategory } from "@/store/blog-store";

//->// TanStack Query hooks for the blog LIST page.

//shared
export interface LikeResponse {
  liked: boolean;
  likes: number;
}

export interface ImageUploadOut {
  url: string;
  public_id: string;
}

export interface PublishedPostOut extends Post {
  is_published: true;
  published_at: string;
}

// Fetch params

export interface PostListParams {
  category?: BlogCategory | "All" | "";
  tag?: string;
  search?: string;
  authorId?: string;
  page?: number;
  limit?: number;
}

//  Create / Update payloads (mirror backend schemas)

export interface SectionPayload {
  type: "paragraph" | "heading" | "quote" | "image";
  content: string;
  caption?: string;
  attribution?: string;
}

export interface CreatePostPayload {
  title: string;
  excerpt: string;
  category: string;
  tags?: string[];
  body: SectionPayload[];
  /** Optional — pass a URL if the user hasn't uploaded a File yet */
  image?: string;
}

export interface UpdatePostPayload {
  title?: string;
  excerpt?: string;
  category?: string;
  tags?: string[];
  body?: SectionPayload[];
  image?: string;
}

export interface CreateCommentPayload {
  body: string;
}

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
  comments: number;
  readTime: string;
  publishedAt: string;

  authorInitials?: string;
  authorBio?: string;
  isLikedByMe?: boolean;
  body?: PostSection[];
  tags?: string[];
};

export interface PostSection {
  type: "paragraph" | "heading" | "quote" | "image";
  content: string;
  caption?: string;
  attribution?: string;
}
