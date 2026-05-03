// TanStack Query mutations for the blog EDITOR (write / edit page).
// Flow: createDraft → uploadCover → uploadBodyImages → publish
// The write-blog-store handles all local draft state.
// These hooks handle the async API calls + wire results back into the store.

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import {
  createPost,
  deletePost,
  publishPost,
  updatePost,
  uploadBodyImage,
  uploadCoverImage,
} from "@/api/blog.api";
import { useAuthStore } from "@/store/auth-store";
import { useWriteBlogStore } from "@/store/write-blog-store";
import { Post } from "@/types";

import { blogKeys } from "./useBlog";

// ── Helper: convert EditorSection[] → SectionPayload[] ───────────────────────
// The store uses EditorSection (discriminated union); the API wants a flat obj.

function sectionsToPayload(
  sections: ReturnType<typeof useWriteBlogStore.getState>["draft"]["sections"]
) {
  return sections.map((s) => ({
    type: s.type,
    content: s.content,
    caption: "caption" in s ? s.caption : undefined,
    attribution: "attribution" in s ? s.attribution : undefined,
  }));
}

// ── useCreateDraft ────────────────────────────────────────────────────────────
/**
 * Creates a draft on the backend.
 * Returns the created Post (with its real `id`) so subsequent uploads can use it.
 *
 * Usage in your editor's "Save Draft" button:
 *
 *   const { mutateAsync: saveDraft, isPending } = useCreateDraft();
 *   const post = await saveDraft();      // → Post with real id
 */
export function useCreateDraft() {
  const token = useAuthStore((s) => s.token);
  const draft = useWriteBlogStore((s) => s.draft);
  const saveDraft = useWriteBlogStore((s) => s.saveDraft);

  return useMutation({
    mutationFn: async () => {
      if (!token) throw new Error("You must be logged in to write a post");

      const tags = draft.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      return createPost(
        {
          title: draft.title.trim(),
          excerpt: draft.excerpt.trim(),
          category: draft.category as string,
          tags,
          body: sectionsToPayload(draft.sections),
          image: draft.coverPreviewUrl || undefined,
        },
        token
      );
    },
    onSuccess: () => {
      saveDraft(); // update lastSaved timestamp in store
    },
  });
}

// ── useUpdateDraft ────────────────────────────────────────────────────────────
/**
 * Updates an existing draft (already has a real post id).
 *
 * Usage:
 *   const { mutateAsync: save } = useUpdateDraft(post.id);
 *   await save();
 */
export function useUpdateDraft(postId: string) {
  const token = useAuthStore((s) => s.token);
  const draft = useWriteBlogStore((s) => s.draft);
  const saveDraft = useWriteBlogStore((s) => s.saveDraft);

  return useMutation({
    mutationFn: async () => {
      if (!token) throw new Error("Not authenticated");

      const tags = draft.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      return updatePost(
        postId,
        {
          title: draft.title.trim(),
          excerpt: draft.excerpt.trim(),
          category: draft.category as string,
          tags,
          body: sectionsToPayload(draft.sections),
          image: draft.coverPreviewUrl || undefined,
        },
        token
      );
    },
    onSuccess: () => {
      saveDraft();
    },
  });
}

// ── useUploadCover ────────────────────────────────────────────────────────────
/**
 * Uploads the cover File to /posts/{postId}/cover.
 * The backend saves the URL to post.image and returns { url, public_id }.
 *
 * Call AFTER useCreateDraft so you have a real postId.
 *
 * Usage:
 *   const { mutateAsync: uploadCover } = useUploadCover(post.id);
 *   const { url } = await uploadCover(file);
 */
export function useUploadCover(postId: string) {
  const token = useAuthStore((s) => s.token);
  const setCoverImage = useWriteBlogStore((s) => s.setCoverImage);

  return useMutation({
    mutationFn: async (file: File) => {
      if (!token) throw new Error("Not authenticated");
      return uploadCoverImage(postId, file, token);
    },
    onSuccess: (data, file) => {
      // Keep the store preview URL in sync with what the server gave back
      setCoverImage(file, data.url);
    },
  });
}

// ── useUploadBodyImage ────────────────────────────────────────────────────────
/**
 * Uploads an inline body image.
 * Returns { url } — put this into a PostSection { type: "image", content: url }.
 *
 * Usage:
 *   const { mutateAsync: uploadBody } = useUploadBodyImage(post.id);
 *   const { url } = await uploadBody({ file, order: sectionIndex });
 *   updateSection(sectionIndex, { content: url });
 */
export function useUploadBodyImage(postId: string) {
  const token = useAuthStore((s) => s.token);

  return useMutation({
    mutationFn: async ({ file, order }: { file: File; order: number }) => {
      if (!token) throw new Error("Not authenticated");
      return uploadBodyImage(postId, file, order, token);
    },
  });
}

// ── usePublishPost ────────────────────────────────────────────────────────────
/**
 * Full publish flow:
 *   1. If no postId yet → create draft first
 *   2. If coverFile exists → upload cover
 *   3. Publish the draft
 *   4. Reset the write-store and navigate to the new post
 *
 * Usage:
 *   const { mutate: publish, isPending } = usePublishPost();
 *   <button onClick={() => publish(existingPostId)}>Publish</button>
 *   // pass undefined to create + publish in one go
 */
export function usePublishPost() {
  const token = useAuthStore((s) => s.token);
  const draft = useWriteBlogStore((s) => s.draft);
  const resetDraft = useWriteBlogStore((s) => s.resetDraft);
  const qc = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (existingPostId?: string): Promise<Post> => {
      if (!token) throw new Error("You must be logged in to publish");

      // Step 1 — create or reuse draft
      let postId = existingPostId;
      let post: Post;

      if (!postId) {
        const tags = draft.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);
        post = await createPost(
          {
            title: draft.title.trim(),
            excerpt: draft.excerpt.trim(),
            category: draft.category as string,
            tags,
            body: sectionsToPayload(draft.sections),
          },
          token
        );
        postId = post.id;
      }

      // Step 2 — upload cover if user picked a file
      if (draft.coverFile && draft.coverFile.size > 0) {
        await uploadCoverImage(postId!, draft.coverFile, token);
      }

      // Step 3 — publish
      const published = await publishPost(postId!, token);
      return published as Post;
    },

    onSuccess: (published) => {
      resetDraft();
      // Bust the post list cache so the new post appears
      qc.invalidateQueries({ queryKey: blogKeys.all() });
      // Navigate to the new post
      navigate({ to: `/blog/${published.slug}` });
    },
  });
}

// ── useDeletePost ─────────────────────────────────────────────────────────────

export function useDeletePost() {
  const token = useAuthStore((s) => s.token);
  const qc = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (postId: string) => {
      if (!token) throw new Error("Not authenticated");
      return deletePost(postId, token);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: blogKeys.all() });
      navigate({ to: "/blog" });
    },
  });
}
