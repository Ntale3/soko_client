// src/pages/marketplace/components/marketplace-header.tsx
import { useNavigate } from "@tanstack/react-router";
import { Filter, ShoppingCart } from "lucide-react";

import { CategoryBadgeGroup } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { useMarketplaceStore } from "@/store/marketplace-store";

const CATEGORIES = [
  { label: "All" },
  { label: "Vegetables", image: "🥦" },
  { label: "Fruits", image: "🍎" },
  { label: "Grains", image: "🌾" },
  { label: "Cash Crops", image: "☕" },
  { label: "Dairy", image: "🥛" },
  { label: "Herbs", image: "🌿" },
];

const MAX_PRICE = 500000;

export const MarketplaceHeader = () => {
  const navigate = useNavigate();
  const { activeCategory, priceRange, cartCount, setCategory, setPriceRange } =
    useMarketplaceStore();

  return (
    <div className="sticky top-0 z-40 border-b border-border bg-background px-4 pb-3 pt-12 shadow-sm">
      {/* Title row */}
      <div className="mb-3.5 flex items-center justify-between">
        <h1 className="text-xl font-extrabold tracking-tight text-foreground">Marketplace</h1>

        <div className="flex items-center gap-2">
          {/* Filter sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="size-9 rounded-xl">
                <Filter className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-3xl px-6 pb-10">
              <SheetHeader className="mb-4">
                <SheetTitle>Filter Products</SheetTitle>
              </SheetHeader>

              {/* Category filter */}
              <div className="mb-6">
                <p className="mb-2.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Category
                </p>
                <CategoryBadgeGroup items={CATEGORIES} defaultValue="All" onChange={setCategory} />
              </div>

              <Separator className="mb-6" />

              {/* Price range filter */}
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Price Range
                  </p>
                  <span className="text-xs font-semibold text-primary">
                    UGX {priceRange[0].toLocaleString()} — UGX {priceRange[1].toLocaleString()}
                  </span>
                </div>
                <Slider
                  min={0}
                  max={MAX_PRICE}
                  step={5000}
                  value={priceRange}
                  onValueChange={(val) => setPriceRange(val as [number, number])}
                  className="w-full"
                />
                <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
                  <span>UGX 0</span>
                  <span>UGX {MAX_PRICE.toLocaleString()}</span>
                </div>
              </div>

              <Separator className="my-6" />

              <Button
                className="w-full"
                onClick={() => setPriceRange([0, MAX_PRICE])}
                variant="outline"
              >
                Reset Filters
              </Button>
            </SheetContent>
          </Sheet>

          {/* Cart */}
          <Button
            variant="outline"
            size="icon"
            className="relative size-9 rounded-xl"
            // onClick={() => navigate({ to: "/cart" })}
          >
            <ShoppingCart className="size-4" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
                {cartCount}
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Category badges — inline scroll */}
      <CategoryBadgeGroup items={CATEGORIES} defaultValue="All" onChange={setCategory} />
    </div>
  );
};
