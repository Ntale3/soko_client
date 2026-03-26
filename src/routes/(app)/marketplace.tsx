import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useMemo } from "react";

import { MarketplaceFilters } from "@/components/market-place/MarketplaceFilters";
import { MarketplaceGrid } from "@/components/market-place/MarketplaceGrid";
import { Button } from "@/components/ui/button";
import { products } from "@/constants/data/products";
import { useMarketplaceStore } from "@/store/useMarketplaceStore";

export const Route = createFileRoute("/(app)/marketplace")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { activeCategory, search, district, sort, viewMode } = useMarketplaceStore();

  const filtered = useMemo(() => {
    const result = products.filter((p) => {
      const catMatch = activeCategory === "All" || p.category === activeCategory;
      const searchMatch =
        !search || [p.name, p.farmer].some((s) => s.toLowerCase().includes(search.toLowerCase()));
      const distMatch = district === "All" || p.district === district;
      return catMatch && searchMatch && distMatch;
    });

    if (sort === "price-asc") return [...result].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") return [...result].sort((a, b) => b.price - a.price);
    if (sort === "rating") return [...result].sort((a, b) => b.rating - a.rating);
    return [...result].sort((a, b) => b.listedAt.localeCompare(a.listedAt));
  }, [activeCategory, search, district, sort]);

  return (
    <div className="max-w-7xl mx-auto px-5 py-6 pb-28">
      {/* header */}
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Marketplace</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Discover fresh produce from verified Ugandan farmers
        </p>
      </div>
      <MarketplaceFilters />
      {/* results bar */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{filtered.length}</span> results found
        </p>
        <Button size="sm" className="gap-1.5" onClick={() => navigate({ to: "/" })}>
          <Plus className="w-4 h-4" />
          List Your Produce
        </Button>
      </div>
      <MarketplaceGrid products={filtered} viewMode={viewMode} />
    </div>
  );
}
