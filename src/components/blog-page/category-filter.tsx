import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { BLOG_CATEGORIES, BlogCategory } from "@/store/blog-store";

interface CategoryFilterProps {
  active: BlogCategory;
  onChange: (category: BlogCategory) => void;
}

export function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <ScrollArea className="w-full">
      <div className="flex gap-2 pb-1">
        {BLOG_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={[
              "shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-150 border",
              active === cat
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-transparent text-muted-foreground border-border hover:border-primary/50 hover:text-foreground",
            ].join(" ")}
          >
            {cat}
          </button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" className="hidden" />
    </ScrollArea>
  );
}
