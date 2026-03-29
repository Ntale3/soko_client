import { BlogCategory } from "@/store/blog-store";

interface ResultsCountProps {
  count: number;
  activeCategory: BlogCategory;
}

export function ResultsCount({ count, activeCategory }: ResultsCountProps) {
  return (
    <p className="text-xs text-muted-foreground">
      {count} article{count !== 1 ? "s" : ""}
      {activeCategory !== "All" && (
        <span>
          {" "}
          in <span className="text-foreground font-medium">{activeCategory}</span>
        </span>
      )}
    </p>
  );
}
