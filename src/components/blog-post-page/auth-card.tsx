import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Post } from "@/types";

interface AuthorCardProps {
  post: Pick<Post, "author" | "authorInitials" | "authorBio">;
}

export function AuthorCard({ post }: AuthorCardProps) {
  if (!post.authorBio) return null;

  return (
    <>
      <Separator />
      <div className="flex gap-4 items-start bg-muted/40 rounded-2xl p-4 border border-border/50">
        <Avatar className="size-12 ring-2 ring-primary/20 shrink-0">
          <AvatarFallback className="text-sm font-bold bg-primary text-primary-foreground">
            {post.authorInitials}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1 min-w-0">
          <p className="text-sm font-semibold text-foreground">{post.author}</p>
          <p className="text-xs text-muted-foreground leading-relaxed">{post.authorBio}</p>
        </div>
      </div>
    </>
  );
}
