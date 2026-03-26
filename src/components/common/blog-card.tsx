import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock, Heart, MessageCircle } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Post } from "@/types";

interface BlogCardProps {
  post: Post;
}

const initials = (name = "") =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      //to={`/blog/${post.slug ?? "post"}`}
      to={"/"}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl"
    >
      <Card className="overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all duration-300 ease-out hover:shadow-md hover:-translate-y-0.5 pt-0 mt-2">
        {/* ── Banner ─────────────────────────────────────────────────── */}
        <div className="relative h-36 flex items-center justify-center overflow-hidden">
          {/* subtle radial glow using primary */}
          <div className="absolute inset-0 " />

          <span className="text-5xl select-none drop-shadow-sm">
            {/* {post.image} */}
            <img src={post.image} alt={post.image} />
          </span>

          {/* category badge */}
          <Badge
            variant="secondary"
            className="absolute bottom-3 left-3 text-[10px] font-semibold tracking-widest uppercase"
          >
            {post.category}
          </Badge>

          {/* hover arrow */}
          <span
            className={[
              "absolute top-3 right-3 p-1.5 rounded-full",
              "bg-background/70 backdrop-blur-sm border border-border",
              "opacity-0 translate-y-1",
              "group-hover:opacity-100 group-hover:translate-y-0",
              "transition-all duration-200",
            ].join(" ")}
          >
            <ArrowUpRight className="w-3.5 h-3.5 text-foreground" />
          </span>
        </div>

        {/* ── Body ────────────────────────────────────────────────────── */}
        <CardContent className="p-4 space-y-2.5">
          {/* title */}
          <h3
            className={[
              "text-sm font-semibold leading-snug line-clamp-2",
              "text-card-foreground",
              "group-hover:text-primary transition-colors duration-200",
            ].join(" ")}
          >
            {post.title}
          </h3>

          {/* excerpt */}
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {post.excerpt.slice(0, 100)}
          </p>

          {/* divider */}
          <div className="border-t border-border" />

          {/* ── Footer ──────────────────────────────────────────────── */}
          <div className="flex justify-between gap-1.5 items-center">
            {/* author */}
            <div className="flex items-center gap-2">
              <Avatar className="w-6 h-6 ring-2 ring-background shadow-sm">
                <AvatarFallback className="text-[9px] font-bold bg-primary text-primary-foreground">
                  {initials(post.author)}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs font-medium text-muted-foreground truncate max-w-22">
                {post.author}
              </span>
            </div>

            {/* stats */}
            <div className="flex text-xs justify-between gap-1">
              <span className="flex items-center gap-1">
                <Heart className="w-3 h-3 text-destructive/70" />
                {post.likes}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="w-3 h-3 text-primary/70" />
                {post.comments}
              </span>
            </div>
          </div>
          <span className="flex items-center gap-1 text-sm">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
