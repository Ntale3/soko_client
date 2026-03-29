import { Link } from "@tanstack/react-router";
import { ArrowLeft, Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Post } from "@/types";

interface PostHeroProps {
  post: Post;
}

export function PostHero({ post }: PostHeroProps) {
  return (
    <div className="relative">
      {/* Cover image */}
      <div className="relative h-56 sm:h-72 md:h-96 w-full overflow-hidden rounded-3xl">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        {/* dark gradient overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-3xl" />

        {/* Back button — floats top-left over image */}
        <Link
          to="/blog"
          className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/20 transition-colors"
        >
          <ArrowLeft size={13} />
          Back to Blog
        </Link>

        {/* Badges — bottom-left over image */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 flex-wrap">
          <Badge className="bg-primary text-primary-foreground text-[10px] uppercase tracking-widest font-semibold">
            {post.category}
          </Badge>
          <Badge
            variant="outline"
            className="border-white/30 text-white text-[10px] backdrop-blur-sm"
          >
            <Clock size={9} className="mr-1" />
            {post.readTime}
          </Badge>
        </div>
      </div>
    </div>
  );
}
