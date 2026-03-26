import { LayoutGrid, List, Search } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories, UGANDA_DISTRICTS as districts } from "@/constants/districts";
import { cn } from "@/lib/utils";
import { type SortOption, useMarketplaceStore, type ViewMode } from "@/store/useMarketplaceStore";

export function MarketplaceFilters() {
  const {
    search,
    setSearch,
    district,
    setDistrict,
    sort,
    setSort,
    viewMode,
    setViewMode,
    activeCategory,
    setActiveCategory,
  } = useMarketplaceStore();

  return (
    <Card className="border border-border bg-card shadow-sm mb-5">
      <CardContent className="p-4 space-y-4">
        {/* row: search · district · sort · view toggle */}
        <div className="flex gap-3 flex-wrap">
          <div className="relative flex-1 min-w-50">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Search produce, farmers…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-10"
            />
          </div>

          <Select value={district} onValueChange={setDistrict}>
            <SelectTrigger className="w-40 h-10">
              <SelectValue placeholder="All Districts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Districts</SelectItem>
              {districts.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
            <SelectTrigger className="w-45 h-10">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex border border-border rounded-lg overflow-hidden shrink-0">
            {(["grid", "list"] as ViewMode[]).map((v) => (
              <button
                key={v}
                onClick={() => setViewMode(v)}
                className={cn(
                  "px-3.5 h-10 flex items-center justify-center transition-colors duration-150",
                  viewMode === v
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:bg-accent"
                )}
              >
                {v === "grid" ? <LayoutGrid className="w-4 h-4" /> : <List className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </div>

        {/* category pill tabs */}
        <div className="flex gap-2 overflow-x-auto pb-0.5 no-scrollbar">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={cn(
                "whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium border transition-all duration-150 shrink-0",
                activeCategory === c
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
