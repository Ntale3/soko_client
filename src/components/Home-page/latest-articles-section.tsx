import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { ArticleCard } from "./artical-card";
import { Article } from "@/types";

export const LatestArticlesSection = ({ blogs }: { blogs: Article[] }) => (
  <div>
    {/* Header */}
    <div className="mb-3 flex items-center justify-between">
      <h3 className="text-[13px] font-bold text-foreground">
        📝 Latest Articles
      </h3>
      <Button
        variant="link"
        size="sm"
        className="h-auto p-0 text-[11px] font-semibold text-primary"
        asChild
      >
        {/* <Link to="/blog">See all</Link> */}
        Sell all
      </Button>
    </div>

    {/* List */}
    <div className="flex flex-col gap-2.5">
      {blogs.slice(0, 2).map((b) => (
        <ArticleCard key={b.id} article={b} />
      ))}
    </div>
  </div>
)