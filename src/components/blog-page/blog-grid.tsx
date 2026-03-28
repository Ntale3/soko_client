import { BlogCard } from "@/components/common/blog-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BlogCategory } from "@/store/blog-store";
import { Post } from "@/types";

interface BlogGridProps {
  posts: Post[];
  activeCategory: BlogCategory;
  isLoading?: boolean;
  onResetCategory: () => void;
}

// ─── Loading skeletons ────────────────────────────────────────────────────────
function BlogGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-xl border border-border overflow-hidden">
          <Skeleton className="h-36 w-full rounded-none" />
          <div className="p-4 space-y-2.5">
            <Skeleton className="h-4 w-3/4 rounded" />
            <Skeleton className="h-3 w-full rounded" />
            <Skeleton className="h-3 w-2/3 rounded" />
            <div className="flex justify-between pt-1">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-4 w-16 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────
function EmptyState({ category, onReset }: { category: BlogCategory; onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
      <span className="text-4xl">🌱</span>
      <p className="text-muted-foreground text-sm">
        No articles in <span className="text-foreground font-medium">{category}</span> yet.
      </p>
      <Button variant="outline" size="sm" onClick={onReset}>
        View all articles
      </Button>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export function BlogGrid({ posts, activeCategory, isLoading, onResetCategory }: BlogGridProps) {
  if (isLoading) return <BlogGridSkeleton />;

  if (posts.length === 0) {
    return <EmptyState category={activeCategory} onReset={onResetCategory} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}
