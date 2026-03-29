// useAddToCart now writes directly to the Zustand cart store (local-first).
// When your FastAPI backend is ready, the store's addItem action is the only
// place you need to add a server sync — no component changes needed.
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useCartStore } from "@/store/cart-store";
import { Product } from "@/types";

// ─── Fetch single product ─────────────────────────────────────────────────────

// async function fetchProduct(id: string): Promise<Product> {
//   const res = await fetch(`/api/products/${id}`);
//   if (!res.ok) throw new Error("Product not found");
//   return res.json();
// }

export const PLACEHOLDER_PRODUCT: Product = {
  id: "1",
  slug: "white-maize-okello-james",
  name: "Premium White Maize",
  category: "Grains",
  image: "https://images.unsplash.com/photo-1601314167099-232775b3d6fd?w=600&q=80",
  img: "https://images.unsplash.com/photo-1601314167099-232775b3d6fd?w=600&q=80",
  images: [
    "https://images.unsplash.com/photo-1601314167099-232775b3d6fd?w=600&q=80",
    "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=600&q=80",
    "https://images.unsplash.com/photo-1624206112918-f140f087f9b5?w=600&q=80",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  ],
  badge: "Hot",
  farmer: "Okello James",
  district: "Gulu",
  verified: true,
  price: 850,
  priceValue: 850,
  unit: "kg",
  qty: 5000,
  qtyDisplay: "5,000 kg available",
  rating: 4.5,
  fresh: true,
  description:
    "Sun-dried premium white maize harvested from the fertile soils of Gulu District. Consistently high germination rate with low moisture content — ideal for both milling and direct consumption. Grown without artificial pesticides using traditional intercropping methods.",
  minimumOrder: 50,
  harvestDate: "2026-02-15T00:00:00Z",
  storage: "Dry warehouse, ventilated sacks",
  reviewCount: 142,
  isWishlisted: false,
  posted: "3 days ago",
  tags: ["Organic", "Bulk", "Certified"],
  priceTiers: [
    { minQty: 50, price: 850, label: "Standard" },
    { minQty: 500, price: 800, label: "Bulk (-6%)" },
    { minQty: 2000, price: 750, label: "Wholesale (-12%)" },
  ],
  farmerDetail: {
    name: "Okello James",
    district: "Gulu",
    verified: true,
    phone: "+256 700 123 456",
    responseTime: "Usually replies in 2h",
    totalSales: 3200,
    memberSince: "2023-04-01T00:00:00Z",
  },
  reviews: [
    {
      id: "r1",
      reviewer: "Musoke David",
      reviewerInitials: "MD",
      rating: 5,
      body: "Excellent quality maize, exactly as described. Delivery was smooth and James was very professional. Will order again!",
      createdAt: "2026-02-20T10:00:00Z",
      helpful: 14,
      isHelpfulByMe: false,
    },
    {
      id: "r2",
      reviewer: "Nalubega Peace",
      reviewerInitials: "NP",
      rating: 4,
      body: "Good product, slight delay in communication but the maize quality made up for it. Highly recommend.",
      createdAt: "2026-02-22T14:30:00Z",
      helpful: 9,
      isHelpfulByMe: false,
    },
    {
      id: "r3",
      reviewer: "Opio Charles",
      reviewerInitials: "OC",
      rating: 5,
      body: "Best supplier I've worked with. Consistent quality and fair pricing. The bulk tier pricing is a great deal.",
      createdAt: "2026-02-25T08:00:00Z",
      helpful: 22,
      isHelpfulByMe: true,
    },
  ],
};

//Mock Product place holder
function findProduct(): Product {
  return PLACEHOLDER_PRODUCT;
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => findProduct(), //Replace with fetchProduct(id: string/0;
    staleTime: 1000 * 60 * 5,
  });
}

// ─── Add to cart ──────────────────────────────────────────────────────────────
// Writes to Zustand store (local-first, persisted to localStorage).
// No server call needed until checkout — this matches how most e-commerce works.

export function useAddToCart() {
  const { addItem, openDrawer } = useCartStore();

  return {
    addToCart: (product: Product, quantity: number, unitPrice: number) => {
      addItem({
        product: {
          id: product.id,
          name: product.name,
          image: product.image,
          farmer: product.farmer,
          district: product.district,
          verified: product.verified,
          unit: product.unit,
          category: product.category,
          qty: product.qty,
          minimumOrder: product.minimumOrder,
        },
        quantity,
        unitPrice,
      });
      openDrawer(); // show the drawer so user gets immediate feedback
    },
  };
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
      queryClient.invalidateQueries({ queryKey: ["product", String(productId)] });
    },
  });
}

// ─── Toggle review helpful ────────────────────────────────────────────────────

async function toggleHelpfulRequest(reviewId: string): Promise<void> {
  const res = await fetch(`/api/reviews/${reviewId}/helpful`, { method: "POST" });
  if (!res.ok) throw new Error("Failed to update");
}

export function useToggleReviewHelpful(productId: string | number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleHelpfulRequest,
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
      return { previous };
    },
    onError: (_err, _reviewId, context) => {
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
