import { create } from "zustand";

export type ViewMode = "grid" | "list";
export type SortOption = "newest" | "price-asc" | "price-desc" | "rating";

interface MarketplaceState {
  activeCategory: string;
  viewMode: ViewMode;
  sort: SortOption;
  search: string;
  district: string;

  setActiveCategory: (category: string) => void;
  setViewMode: (mode: ViewMode) => void;
  setSort: (sort: SortOption) => void;
  setSearch: (search: string) => void;
  setDistrict: (district: string) => void;
  reset: () => void;
}

const defaults = {
  activeCategory: "All",
  viewMode: "grid" as ViewMode,
  sort: "newest" as SortOption,
  search: "",
  district: "All",
};

export const useMarketplaceStore = create<MarketplaceState>((set) => ({
  ...defaults,

  setActiveCategory: (activeCategory) => set({ activeCategory }),
  setViewMode: (viewMode) => set({ viewMode }),
  setSort: (sort) => set({ sort }),
  setSearch: (search) => set({ search }),
  setDistrict: (district) => set({ district }),
  reset: () => set(defaults),
}));
