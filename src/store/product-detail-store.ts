import { create } from "zustand";

import { Product, ProductReview } from "@/types";

// ─── Placeholder ──────────────────────────────────────────────────────────────

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

// ─── Store shape ──────────────────────────────────────────────────────────────

type ActiveTab = "details" | "reviews" | "similar";

interface ProductDetailState {
  product: Product | null;
  activeImageIndex: number;
  quantity: number;
  activeTab: ActiveTab;
  isLoading: boolean;
  error: string | null;
  isAddingToCart: boolean;
  userRating: number; // star the user is hovering/selecting
  pendingRating: number | null;

  // Setters
  setProduct: (p: Product) => void;
  setLoading: (v: boolean) => void;
  setError: (e: string | null) => void;

  // UI
  setActiveImageIndex: (i: number) => void;
  setActiveTab: (tab: ActiveTab) => void;

  // Quantity
  setQuantity: (qty: number, minimumOrder?: number) => void;
  increment: (step?: number, max?: number) => void;
  decrement: (step?: number, minimumOrder?: number) => void;

  // Wishlist (optimistic)
  toggleWishlist: () => void;

  // Rating
  setUserRating: (r: number) => void;
  submitRating: (r: number) => void;

  // Review helpful
  toggleReviewHelpful: (reviewId: string) => void;

  // Cart
  setAddingToCart: (v: boolean) => void;

  // Derived
  effectivePrice: () => number;
  subtotal: () => number;
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useProductDetailStore = create<ProductDetailState>((set, get) => ({
  product: PLACEHOLDER_PRODUCT,
  activeImageIndex: 0,
  quantity: 50,
  activeTab: "details",
  isLoading: false,
  error: null,
  isAddingToCart: false,
  userRating: 0,
  pendingRating: null,

  setProduct: (p) => set({ product: p, quantity: p.minimumOrder ?? 50, activeImageIndex: 0 }),
  setLoading: (v) => set({ isLoading: v }),
  setError: (e) => set({ error: e }),

  setActiveImageIndex: (i) => set({ activeImageIndex: i }),
  setActiveTab: (tab) => set({ activeTab: tab }),

  // ── Quantity ───────────────────────────────────────────────────────────────
  increment: (step = 50) => set((s) => ({ quantity: s.quantity + step })),

  decrement: (step = 50) =>
    set((s) => ({ quantity: Math.max(s.product?.minimumOrder ?? 1, s.quantity - step) })),

  setQuantity: (qty) => set((s) => ({ quantity: Math.max(s.product?.minimumOrder ?? 1, qty) })),

  // ── Wishlist ───────────────────────────────────────────────────────────────
  toggleWishlist: () =>
    set((s) => ({
      product: s.product ? { ...s.product, isWishlisted: !s.product.isWishlisted } : null,
    })),

  // ── Rating ─────────────────────────────────────────────────────────────────
  setUserRating: (r) => set({ userRating: r }),

  submitRating: (r) => {
    set({ pendingRating: r });
    // TODO: call your API here, then update product.rating optimistically
    set((s) => ({
      product: s.product
        ? { ...s.product, rating: parseFloat(((s.product.rating + r) / 2).toFixed(1)) }
        : null,
      pendingRating: null,
    }));
  },

  // ── Review helpful ─────────────────────────────────────────────────────────
  toggleReviewHelpful: (reviewId) =>
    set((s) => ({
      product: s.product
        ? {
            ...s.product,
            reviews: s.product.reviews?.map((r) =>
              r.id === reviewId
                ? {
                    ...r,
                    isHelpfulByMe: !r.isHelpfulByMe,
                    helpful: r.helpful + (r.isHelpfulByMe ? -1 : 1),
                  }
                : r
            ),
          }
        : null,
    })),

  setAddingToCart: (v) => set({ isAddingToCart: v }),

  // ── Derived ────────────────────────────────────────────────────────────────
  effectivePrice: () => {
    const { product, quantity } = get();
    if (!product) return 0;
    if (!product.priceTiers?.length) return product.price;
    const tier = [...product.priceTiers].reverse().find((t) => quantity >= t.minQty);
    return tier?.price ?? product.price;
  },

  subtotal: () => {
    const { quantity, effectivePrice } = get();
    return quantity * effectivePrice();
  },
}));
