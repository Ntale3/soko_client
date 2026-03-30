import { Product } from "@/types";
import { FarmerProfile, FarmerReview, OrderSummaryItem, PayoutRecord } from "@/types/profile";

const delay = (ms = 600) => new Promise((r) => setTimeout(r, ms));

//  Public farmer profile
// GET /api/farmers/:id

export async function fetchFarmerProfile(id: string): Promise<FarmerProfile> {
  await delay();
  // MOCK
  return {
    id,
    name: "Okello James",
    initials: "OJ",
    district: "Gulu",
    village: "Lacor",
    verified: true,
    memberSince: "2023-06-15T00:00:00Z",
    farmName: "Lacor Green Farm",
    farmerBio:
      "Third-generation farmer specialising in sun-dried grains and legumes. Supplying markets across northern Uganda since 2018.",
    totalListings: 6,
    totalSales: 18_400,
    averageRating: 4.7,
    totalReviews: 142,
    responseTime: "Usually replies in 2h",
    isFollowedByMe: false,
    isRatedByMe: null,
  };
  // REAL: const res = await fetch(`/api/farmers/${id}`); return res.json();
}

// Farmer's listings
// GET /api/farmers/:id/listings

export async function fetchFarmerListings(farmerId: string): Promise<Product[]> {
  await delay(400);
  // Returns subset of products — in real app filtered server-side
  return [];
  // REAL: const res = await fetch(`/api/farmers/${farmerId}/listings`); return res.json();
}

// ───> Farmer reviews
// GET /api/farmers/:id/reviews

export async function fetchFarmerReviews(farmerId: string): Promise<FarmerReview[]> {
  await delay(500);
  return [
    {
      id: "fr1",
      reviewerId: "u1",
      reviewerName: "Amina K",
      reviewerInitials: "AK",
      rating: 5,
      body: "Excellent quality grain and super professional. Already ordered twice.",
      createdAt: "2026-03-01T10:00:00Z",
      helpful: 12,
      isHelpfulByMe: false,
    },
    {
      id: "fr2",
      reviewerId: "u4",
      reviewerName: "Brian S",
      reviewerInitials: "BS",
      rating: 4,
      body: "Good product, slight delay but communication was excellent throughout.",
      createdAt: "2026-02-20T14:00:00Z",
      helpful: 7,
      isHelpfulByMe: false,
    },
    {
      id: "fr3",
      reviewerId: "u5",
      reviewerName: "Grace A",
      reviewerInitials: "GA",
      rating: 5,
      body: "Best maize supplier in Gulu. Always fresh and properly dried.",
      createdAt: "2026-02-10T08:00:00Z",
      helpful: 19,
      isHelpfulByMe: true,
    },
  ];
  // REAL: const res = await fetch(`/api/farmers/${farmerId}/reviews`); return res.json();
}

// Rate a farmer
// POST /api/farmers/:id/rate

export async function rateFarmer(farmerId: string, rating: number, body: string): Promise<void> {
  await delay(700);
  console.log("Rate farmer (mock):", { farmerId, rating, body });
  // REAL:
  // await fetch(`/api/farmers/${farmerId}/rate`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ rating, body }),
  // });
}

// ───> Buyer orders
// GET /api/me/orders

export async function fetchMyOrders(): Promise<OrderSummaryItem[]> {
  await delay(600);
  return [
    {
      id: "ORD-A1B2C3",
      productName: "Premium White Maize",
      productImage: "https://images.unsplash.com/photo-1601314167099-232775b3d6fd?w=200&q=80",
      farmer: "Okello James",
      quantity: 200,
      unit: "kg",
      total: 170_000,
      status: "delivered",
      createdAt: "2026-03-15T10:00:00Z",
    },
    {
      id: "ORD-D4E5F6",
      productName: "Organic Tomatoes",
      productImage: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=200&q=80",
      farmer: "Sarah Nakato",
      quantity: 50,
      unit: "kg",
      total: 60_000,
      status: "dispatched",
      createdAt: "2026-03-22T10:00:00Z",
    },
    {
      id: "ORD-G7H8I9",
      productName: "Vanilla Beans",
      productImage: "https://images.unsplash.com/photo-1607877742574-a7d9a7449af3?w=200&q=80",
      farmer: "Grace Akello",
      quantity: 10,
      unit: "kg",
      total: 250_000,
      status: "pending",
      createdAt: "2026-03-28T10:00:00Z",
    },
  ];
  // REAL: const res = await fetch("/api/me/orders"); return res.json();
}

// ─── Farmer payouts
// GET /api/me/payouts

export async function fetchMyPayouts(): Promise<PayoutRecord[]> {
  await delay(600);
  return [
    {
      id: "PAY-001",
      amount: 340_000,
      orderId: "ORD-X1",
      buyerName: "Musoke David",
      product: "White Maize 400kg",
      status: "paid",
      paidAt: "2026-03-20T00:00:00Z",
      createdAt: "2026-03-19T00:00:00Z",
    },
    {
      id: "PAY-002",
      amount: 127_500,
      orderId: "ORD-X2",
      buyerName: "Nalubega Peace",
      product: "Soya Beans 150kg",
      status: "paid",
      paidAt: "2026-03-25T00:00:00Z",
      createdAt: "2026-03-24T00:00:00Z",
    },
    {
      id: "PAY-003",
      amount: 212_500,
      orderId: "ORD-X3",
      buyerName: "Opio Charles",
      product: "White Maize 250kg",
      status: "pending",
      createdAt: "2026-03-29T00:00:00Z",
    },
  ];
  // REAL: const res = await fetch("/api/me/payouts"); return res.json();
}

// ─── Update profile ───────────────────────────────────────────────────────────
// PATCH /api/me

export async function updateMyProfile(patch: Record<string, string>): Promise<void> {
  await delay(800);
  console.log("Update profile (mock):", patch);
  // REAL:
  // await fetch("/api/me", {
  //   method: "PATCH",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(patch),
  // });
}
