import { TrendingUp } from "lucide-react";

import { TRENDING_TOPICS } from "@/store/blog-store";

interface TrendingStripProps {
  onSelect?: (topic: string) => void;
}

export function TrendingStrip({ onSelect }: TrendingStripProps) {
  return (
    <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground border border-border/50 rounded-2xl px-4 py-3 bg-muted/30">
      <TrendingUp size={14} className="text-primary shrink-0" />
      <span className="font-medium text-foreground shrink-0">Trending:</span>
      {TRENDING_TOPICS.map((topic, i) => (
        <span key={topic} className="flex items-center gap-2">
          {i > 0 && <span className="text-border">·</span>}
          <button
            onClick={() => onSelect?.(topic)}
            className="hover:text-primary transition-colors"
          >
            {topic}
          </button>
        </span>
      ))}
    </div>
  );
}
