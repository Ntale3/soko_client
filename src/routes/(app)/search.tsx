import { createFileRoute } from "@tanstack/react-router";
import { Filter, MapPin, SlidersHorizontal, Star, TrendingUp, Users, Wheat } from "lucide-react";

import { ProductCard } from "@/components/common/product-card";
import { farmers } from "@/components/search-page/data";
import { EmptyState } from "@/components/search-page/empty-state";
import { FarmerResultCard } from "@/components/search-page/farmer-result-card";
import { ResultsCount } from "@/components/search-page/results-count";
import { SearchHeader } from "@/components/search-page/search-header";
import { TrendingSearches } from "@/components/search-page/trending-searches";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { products } from "@/constants/data/products";
import { useSearchStore } from "@/store/search-store";

export const Route = createFileRoute("/(app)/search")({
  component: RouteComponent,
});

function SearchSidebar({ query, onSelect }: { query: string; onSelect: (q: string) => void }) {
  const trendingItems = [
    "Tomatoes",
    "Organic Maize",
    "Avocado",
    "Sesame",
    "Grace Auma",
    "Mbarara Farmers",
  ];

  const topDistricts = ["Kampala", "Wakiso", "Gulu", "Mbarara", "Jinja", "Mbale"];

  return (
    <aside className="hidden md:flex flex-col gap-4 w-64 lg:w-72 shrink-0">
      {/* Trending Searches */}
      <Card className="bg-card border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2 text-foreground/80">
            <TrendingUp className="w-4 h-4 text-primary" />
            Trending Searches
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-col gap-1">
            {trendingItems.map((item) => (
              <button
                key={item}
                onClick={() => onSelect(item)}
                className={`text-left text-sm px-2 py-1.5 rounded-md transition-colors hover:bg-primary/10 hover:text-primary ${
                  query === item
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filter by District */}
      <Card className="bg-card border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2 text-foreground/80">
            <MapPin className="w-4 h-4 text-primary" />
            Filter by District
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-1.5">
            {topDistricts.map((d) => (
              <Badge
                key={d}
                variant="outline"
                className="cursor-pointer text-xs hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
              >
                {d}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card className="bg-card border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2 text-foreground/80">
            <Star className="w-4 h-4 text-primary" />
            Platform Stats
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 flex flex-col gap-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" /> Verified Farmers
            </span>
            <span className="font-semibold text-foreground">1,240+</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <Wheat className="w-3.5 h-3.5" /> Products Listed
            </span>
            <span className="font-semibold text-foreground">5,800+</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> Districts Covered
            </span>
            <span className="font-semibold text-foreground">86</span>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}

function RouteComponent() {
  const { query, activeTab, setQuery, setActiveTab, getFilteredFarmers, getFilteredProducts } =
    useSearchStore();

  const filteredFarmers = getFilteredFarmers(farmers);
  const filteredProducts = getFilteredProducts(products);
  const activeCount = activeTab === "farmers" ? filteredFarmers.length : filteredProducts.length;

  return (
    <div className="min-h-screen bg-background">
      {/* SearchHeader stays full-width on all screens */}
      <SearchHeader
        query={query}
        activeTab={activeTab}
        onQueryChange={setQuery}
        onTabChange={setActiveTab}
      />

      {/*
        MOBILE: single column, full width
        MD+: two-column layout — sidebar left, main content right
      */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-6">
        <div className="flex gap-6 items-start">
          {/* Sidebar — hidden on mobile, visible md+ */}
          <SearchSidebar query={query} onSelect={setQuery} />

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Tabs — hidden on md+ since SearchHeader handles it on mobile,
                but we re-expose as a styled bar on larger screens */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              {/* Desktop tab bar — hidden on mobile (SearchHeader has its own) */}
              <div className="hidden md:flex items-center justify-between mb-4">
                <TabsList className="bg-muted/50 border border-border/50 p-1 h-10">
                  <TabsTrigger
                    value="farmers"
                    className="flex items-center gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-sm"
                  >
                    <Users className="w-3.5 h-3.5" />
                    Farmers
                    {activeTab === "farmers" && (
                      <Badge
                        variant="secondary"
                        className="ml-1 text-[10px] px-1.5 py-0 h-4 bg-primary-foreground/20 text-primary-foreground"
                      >
                        {filteredFarmers.length}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger
                    value="produce"
                    className="flex items-center gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-sm"
                  >
                    <Wheat className="w-3.5 h-3.5" />
                    Produce
                    {activeTab === "produce" && (
                      <Badge
                        variant="secondary"
                        className="ml-1 text-[10px] px-1.5 py-0 h-4 bg-primary-foreground/20 text-primary-foreground"
                      >
                        {filteredProducts.length}
                      </Badge>
                    )}
                  </TabsTrigger>
                </TabsList>

                {/* Sort/Filter hint — decorative for now */}
                <button className="hidden md:flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground border border-border/50 rounded-lg px-3 py-1.5 transition-colors hover:bg-muted/50">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  Filters
                </button>
              </div>

              {/* Trending (mobile only — md+ has sidebar) */}
              <div className="md:hidden">{!query && <TrendingSearches onSelect={setQuery} />}</div>

              {/* Results count */}
              <ResultsCount count={activeCount} query={query} />

              {/* Farmers Tab */}
              <TabsContent value="farmers" className="mt-0">
                {filteredFarmers.length === 0 ? (
                  <EmptyState />
                ) : (
                  /*
                    Mobile: single column list
                    LG: two-column grid for farmer cards
                  */
                  <div className="flex flex-col gap-2.5 lg:grid lg:grid-cols-2 lg:gap-3">
                    {filteredFarmers.map((f) => (
                      <FarmerResultCard key={f.id} farmer={f} />
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Produce Tab */}
              <TabsContent value="produce" className="mt-0">
                {filteredProducts.length === 0 ? (
                  <EmptyState />
                ) : (
                  /*
                    Mobile: 2-col grid
                    MD: 3-col grid
                    LG: 3-col grid (wider sidebar gives more room)
                  */
                  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                    {filteredProducts.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>

      {/* Bottom nav spacer — mobile only */}
      <div className="h-24 md:hidden" />
    </div>
  );
}
