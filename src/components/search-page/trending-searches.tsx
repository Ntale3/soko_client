// src/pages/search/components/trending-searches.tsx
import { TrendingUp } from "lucide-react"

const TRENDING = [
  "Tomatoes",
  "Organic Maize",
  "Avocado",
  "Sesame",
  "Grace Auma",
  "Mbarara Farmers",
]

interface TrendingSearchesProps {
  onSelect: (tag: string) => void
}

export const TrendingSearches = ({ onSelect }: TrendingSearchesProps) => (
  <div className="mb-5">
    <p className="mb-2.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
      Trending Searches
    </p>
    <div className="flex flex-wrap gap-2">
      {TRENDING.map((tag) => (
        <button
          key={tag}
          onClick={() => onSelect(tag)}
          className="flex items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-1.5 text-[11px] font-medium text-foreground shadow-sm transition-colors hover:border-primary hover:text-primary"
        >
          <TrendingUp className="size-3 text-primary" />
          {tag}
        </button>
      ))}
    </div>
  </div>
)