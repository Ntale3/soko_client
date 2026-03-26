import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Search, X } from "lucide-react";
import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SearchHeaderProps {
  query: string;
  activeTab: string;
  onQueryChange: (q: string) => void;
  onTabChange: (tab: string) => void;
}

export const SearchHeader = ({
  query,
  activeTab,
  onQueryChange,
  onTabChange,
}: SearchHeaderProps) => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* ─── MOBILE (< md) ───────────────────────────────────────────────────
          Navbar: sticky top-0 z-50 h-16
          This bar: sticky top-16 z-40 — slots flush underneath, no overlap.
      ──────────────────────────────────────────────────────────────────────── */}
      <div className="md:hidden sticky top-16 z-40 bg-background border-b border-border/60 px-4 pt-3 pb-2.5">
        {/* Search row */}
        <div className="flex items-center gap-2 mb-2.5">
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 -ml-2 size-9 text-muted-foreground"
            onClick={() => navigate({ to: "/home" })}
          >
            <ArrowLeft className="size-4" />
          </Button>

          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
            <Input
              ref={inputRef}
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder={
                activeTab === "farmers"
                  ? "Farmers by name, crop, location…"
                  : "Search produce, products…"
              }
              className="pl-9 pr-8 bg-muted border-none rounded-xl text-sm h-10"
            />
            {query && (
              <button
                onClick={() => onQueryChange("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Tab switcher — mobile only, desktop uses sidebar */}
        <Tabs value={activeTab} onValueChange={onTabChange}>
          <TabsList className="w-full rounded-xl h-9">
            <TabsTrigger value="farmers" className="flex-1 rounded-lg text-xs capitalize">
              Farmers
            </TabsTrigger>
            <TabsTrigger value="produce" className="flex-1 rounded-lg text-xs capitalize">
              Produce
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* ─── DESKTOP (md+) ──────────────────────────────────────────────────
          Mirrors the navbar's max-w-7xl + px-4 sm:px-6 container so the
          back button and search field align with the navbar logo/links.
          Tabs are omitted — the sidebar in the page layout handles that.
      ──────────────────────────────────────────────────────────────────────── */}
      <div className="hidden md:block sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-3">
          {/* Back */}
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 size-8 text-muted-foreground hover:text-foreground rounded-lg"
            onClick={() => navigate({ to: "/home" })}
          >
            <ArrowLeft className="size-4" />
          </Button>

          {/* Subtle divider */}
          <div className="w-px h-5 bg-border/60 shrink-0" />

          {/* Search input — constrained width so it doesn't bleed to the right */}
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
            <Input
              ref={inputRef}
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search farmers by name, crop, location…"
              className="pl-9 pr-8 bg-muted/60 border border-border/40 focus-visible:border-primary/40 rounded-lg text-sm h-9 transition-colors"
            />
            {query && (
              <button
                onClick={() => onQueryChange("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          {/* Active query callout — only shown lg+ to avoid crowding */}
          {query && (
            <p className="text-sm text-muted-foreground whitespace-nowrap hidden lg:block">
              Results for <span className="text-foreground font-medium">"{query}"</span>
            </p>
          )}
        </div>
      </div>
    </>
  );
};
