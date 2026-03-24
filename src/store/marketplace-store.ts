import { create } from "zustand";

interface MarketplaceState {
  activeCategory: string;
  priceRange: [number, number];
  cartCount: number;
  setCategory: (cat: string) => void;
  setPriceRange: (range: [number, number]) => void;
  addToCart: () => void;
}

export const useMarketplaceStore = create<MarketplaceState>((set) => ({
  activeCategory: "All",
  priceRange: [0, 500000],
  cartCount: 2,

  setCategory: (cat) => set({ activeCategory: cat }),
  setPriceRange: (range) => set({ priceRange: range }),
  addToCart: () => set((s) => ({ cartCount: s.cartCount + 1 })),
}));
