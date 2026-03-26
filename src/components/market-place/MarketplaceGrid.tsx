import { ProductCard } from "@/components/common/product-card";
import { ProductListItem } from "@/components/market-place/ProductListItem";
import type { Product } from "@/constants/data/products";
import type { ViewMode } from "@/store/useMarketplaceStore";

interface MarketplaceGridProps {
  products: Product[];
  viewMode: ViewMode;
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <span className="text-5xl mb-4">🌾</span>
      <p className="text-base font-semibold text-foreground">No produce found</p>
      <p className="text-sm text-muted-foreground mt-1">
        Try adjusting your filters or search term.
      </p>
    </div>
  );
}

export function MarketplaceGrid({ products, viewMode }: MarketplaceGridProps) {
  if (products.length === 0) return <EmptyState />;

  if (viewMode === "list") {
    return (
      <div className="flex flex-col gap-3">
        {products.map((p) => (
          <ProductListItem key={p.id} product={p} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-5">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
