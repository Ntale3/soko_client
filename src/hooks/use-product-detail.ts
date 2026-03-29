import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Product } from "@/types";

// ─── Fetch single product ─────────────────────────────────────────────────────

async function fetchProduct(id: string): Promise<Product> {
  const res = await fetch(`/api/products/${id}`);
  if (!res.ok) throw new Error("Product not found");
  return res.json();
}

// Returns query directly — component reads query.data, query.isLoading, query.error
// Zustand store holds NO copy of the product from the server.
export function useProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    staleTime: 1000 * 60 * 5,
  });
}

// ─── Add to cart ──────────────────────────────────────────────────────────────

interface CartPayload {
  productId: string | number;
  quantity: number;
  price: number;
}

async function addToCart(payload: CartPayload): Promise<void> {
  const res = await fetch("/api/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to add to cart");
}

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

// ─── Submit rating ────────────────────────────────────────────────────────────

async function submitRatingRequest(payload: {
  productId: string | number;
  rating: number;
}): Promise<void> {
  const res = await fetch(`/api/products/${payload.productId}/rate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rating: payload.rating }),
  });
  if (!res.ok) throw new Error("Failed to submit rating");
}

export function useSubmitRating(productId: string | number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (rating: number) => submitRatingRequest({ productId, rating }),
    onSuccess: () => {
      // Refetch the product so rating updates from server truth
      queryClient.invalidateQueries({ queryKey: ["product", String(productId)] });
    },
  });
}

// ─── Toggle review helpful ────────────────────────────────────────────────────

async function toggleHelpfulRequest(reviewId: string): Promise<void> {
  const res = await fetch(`/api/reviews/${reviewId}/helpful`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Failed to update");
}

export function useToggleReviewHelpful(productId: string | number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleHelpfulRequest,
    // Optimistic update — update cache directly, no Zustand needed
    onMutate: async (reviewId) => {
      await queryClient.cancelQueries({ queryKey: ["product", String(productId)] });

      const previous = queryClient.getQueryData<Product>(["product", String(productId)]);

      queryClient.setQueryData<Product>(["product", String(productId)], (old) => {
        if (!old) return old;
        return {
          ...old,
          reviews: old.reviews?.map((r) =>
            r.id === reviewId
              ? {
                  ...r,
                  isHelpfulByMe: !r.isHelpfulByMe,
                  helpful: r.helpful + (r.isHelpfulByMe ? -1 : 1),
                }
              : r
          ),
        };
      });

      return { previous }; // rollback context
    },
    onError: (_err, _reviewId, context) => {
      // Rollback on failure
      if (context?.previous) {
        queryClient.setQueryData(["product", String(productId)], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["product", String(productId)] });
    },
  });
}

// ─── Toggle wishlist ──────────────────────────────────────────────────────────

async function toggleWishlistRequest(productId: string | number): Promise<void> {
  const res = await fetch(`/api/wishlist/${productId}`, { method: "POST" });
  if (!res.ok) throw new Error("Failed to update wishlist");
}

export function useToggleWishlist(productId: string | number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => toggleWishlistRequest(productId),
    // Optimistic toggle directly in the query cache
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["product", String(productId)] });
      const previous = queryClient.getQueryData<Product>(["product", String(productId)]);
      queryClient.setQueryData<Product>(["product", String(productId)], (old) =>
        old ? { ...old, isWishlisted: !old.isWishlisted } : old
      );
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["product", String(productId)], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["product", String(productId)] });
    },
  });
}
