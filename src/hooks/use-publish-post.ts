import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { useWriteBlogStore } from "@/store/write-blog-store";

interface PublishResponse {
  id: string;
  slug: string;
}

// ─── API call ─────────────────────────────────────────────────────────────────
// Do NOT set Content-Type manually — the browser sets it automatically
// with the correct multipart boundary when the body is FormData.

async function publishPost(form: FormData): Promise<PublishResponse> {
  const res = await fetch("/api/posts", {
    method: "POST",
    // Authorization: `Bearer ${yourToken}`,  // add when auth is ready
    body: form, // ← FormData: text fields + image File all in one request
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message ?? "Failed to publish post");
  }

  return res.json();
}

// ─── Publish hook ─────────────────────────────────────────────────────────────

export function usePublishPost() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { buildFormData, resetDraft } = useWriteBlogStore();

  return useMutation({
    mutationFn: () => publishPost(buildFormData()),

    onSuccess: (data) => {
      // Invalidate blog list so it refetches with the new post
      queryClient.invalidateQueries({ queryKey: ["blog-posts"] });
      // Clear the local draft
      resetDraft();
      // Navigate to the published post
      navigate({ to: "/blog/$slug", params: { slug: data.slug } });
    },
  });
}

// ─── Save draft hook ──────────────────────────────────────────────────────────

async function saveDraftRequest(form: FormData): Promise<void> {
  // Override the status field to "draft"
  form.set("status", "draft");
  await fetch("/api/posts/draft", {
    method: "POST",
    body: form,
  });
}

export function useSaveDraft() {
  const { buildFormData, saveDraft } = useWriteBlogStore();

  return useMutation({
    mutationFn: () => saveDraftRequest(buildFormData()),
    onSuccess: () => saveDraft(), // update lastSaved timestamp in store
  });
}
