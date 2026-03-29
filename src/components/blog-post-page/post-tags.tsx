import { Tag } from "lucide-react";

import { Badge } from "@/components/ui/badge";

interface PostTagsProps {
  tags?: string[];
}

export function PostTags({ tags }: PostTagsProps) {
  if (!tags?.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 pt-2">
      <Tag size={13} className="text-muted-foreground shrink-0" />
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant="secondary"
          className="text-xs rounded-full cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}
