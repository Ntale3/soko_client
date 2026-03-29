import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { useSellStore } from "@/store/sell-store";
import { AiPriceSuggestion, CreateListingResponse } from "@/types/sell";

const delay = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

// ─── Create listing ───────────────────────────────────────────────────────────
// POST /api/listings  (multipart/form-data)
// FastAPI receives all fields + image files, stores images, returns URLs

async function createListing(form: FormData): Promise<CreateListingResponse> {
  // ── MOCK ──────────────────────────────────────────────────────────────────
  await delay(1400);
  return {
    id: Math.floor(Math.random() * 10000),
    slug: `product-${Date.now()}`,
    imageUrls: [], // backend fills this after saving images
    message: "Listing created successfully",
  };

  // ── REAL (uncomment when FastAPI ready) ───────────────────────────────────
  // const res = await fetch("/api/listings", {
  //   method: "POST",
  //   // DO NOT set Content-Type — browser sets multipart boundary automatically
  //   // Authorization: `Bearer ${getToken()}`,
  //   body: form,
  // });
  // if (!res.ok) {
  //   const err = await res.json().catch(() => ({}));
  //   throw new Error(err?.detail ?? "Failed to create listing");
  // }
  // return res.json();
}

export function useCreateListing() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { buildFormData, setPlacedListingId, resetDraft } = useSellStore();

  return useMutation({
    mutationFn: () => createListing(buildFormData()),

    onSuccess: (data) => {
      setPlacedListingId(String(data.id));
      // Invalidate marketplace list so it refetches with the new product
      queryClient.invalidateQueries({ queryKey: ["products"] });
      resetDraft();
      navigate({ to: "/sell/success", search: { listingId: String(data.id) } });
    },
  });
}

// ─── AI price suggestion ──────────────────────────────────────────────────────
// GET /api/ai/price-suggestion?category=Grains&district=Gulu

async function fetchAiPriceSuggestion(
  category: string,
  district: string
): Promise<AiPriceSuggestion> {
  // ── MOCK ──────────────────────────────────────────────────────────────────
  await delay(800);
  const base = { Grains: 850, Vegetables: 1200, Fruits: 2000, Herbs: 5000 }[category] ?? 1000;
  return {
    min: Math.round(base * 0.9),
    max: Math.round(base * 1.1),
    suggested: base,
    basis: `Based on ${Math.floor(Math.random() * 60 + 20)} recent listings in ${district || "your region"}`,
  };

  // ── REAL ─────────────────────────────────────────────────────────────────
  // const params = new URLSearchParams({ category, district });
  // const res = await fetch(`/api/ai/price-suggestion?${params}`);
  // if (!res.ok) throw new Error("Failed to fetch price suggestion");
  // return res.json();
}

export function useAiPriceSuggestion(category: string, district: string) {
  const { setAiSuggestion } = useSellStore();

  return useQuery({
    queryKey: ["ai-price", category, district],
    queryFn: () => fetchAiPriceSuggestion(category, district),
    enabled: !!(category && district), // only fetch when both are selected
    staleTime: 1000 * 60 * 10,
    // select: (data) => {
    //   setAiSuggestion(data);
    //   return data;
    // },
    // onSuccess: (data)=>{
    //   setAiSuggestion(data);

    // }
  });
}
