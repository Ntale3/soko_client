import { create } from "zustand";

import { Product } from "@/constants/data/products";
import type { Farmer } from "@/types";

interface SearchState {
  query: string;
  activeTab: string;

  // actions
  setQuery: (query: string) => void;
  setActiveTab: (tab: string) => void;
  reset: () => void;

  // derived — pass in data, get filtered results
  getFilteredFarmers: (farmers: Farmer[]) => Farmer[];
  getFilteredProducts: (products: Product[]) => Product[];
}

export const useSearchStore = create<SearchState>((set, get) => ({
  query: "",
  activeTab: "farmers",

  setQuery: (query) => set({ query }),

  setActiveTab: (tab) => set({ activeTab: tab, query: "" }),

  reset: () => set({ query: "", activeTab: "farmers" }),

  getFilteredFarmers: (farmers) => {
    const q = get().query.toLowerCase();
    if (!q) return farmers;
    return farmers.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.produce.some((p) => p.toLowerCase().includes(q)) ||
        f.location.toLowerCase().includes(q)
    );
  },

  getFilteredProducts: (products) => {
    const q = get().query.toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) => p.name.toLowerCase().includes(q) || p.farmer.toLowerCase().includes(q)
    );
  },
}));
