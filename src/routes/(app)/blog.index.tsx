import { createFileRoute } from "@tanstack/react-router";

import { BlogGrid } from "@/components/blog-page/blog-grid";
import { BlogPageHeader } from "@/components/blog-page/blog-page-header";
import { CategoryFilter } from "@/components/blog-page/category-filter";
import { FeaturedPost } from "@/components/blog-page/featured-post";
import { ResultsCount } from "@/components/blog-page/result-count";
import { TrendingStrip } from "@/components/blog-page/trending-strip";
import { useFeaturedPost, usePosts } from "@/hooks/useBlog";
import { useBlogStore } from "@/store/blog-store";

export const Route = createFileRoute("/(app)/blog/")({
  component: RouteComponent,
});

function RouteComponent() {
  // ── Fetch & sync into store
  usePosts();
  useFeaturedPost();

  // Read from store
  const { featuredPost, activeCategory, isLoading, setActiveCategory, filteredPosts } =
    useBlogStore();

  const posts = filteredPosts();

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 space-y-6">
        <BlogPageHeader />
        <FeaturedPost post={featuredPost} isLoading={isLoading} />
        <TrendingStrip />
        <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
        <ResultsCount count={posts.length} activeCategory={activeCategory} />
        <BlogGrid
          posts={posts}
          activeCategory={activeCategory}
          isLoading={isLoading}
          onResetCategory={() => setActiveCategory("All")}
        />
      </div>
    </div>
  );
}
