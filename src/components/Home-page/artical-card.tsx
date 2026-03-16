import { Article } from "@/types";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";

export const ArticleCard = ({ article }: { article: Article }) => (
  <Card className="shadow-sm">
    <CardContent className="flex gap-3 p-3.5">

      {/* Thumbnail */}
      <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 text-[26px]">
        {article.img}
      </div>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <Badge variant="secondary" className="w-fit text-[10px]">
          {article.tag}
        </Badge>

        <p className="line-clamp-2 text-xs font-bold leading-snug text-foreground">
          {article.title}
        </p>

        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <span>{article.author}</span>
          <span>·</span>
          <span>{article.readTime}</span>
        </div>
      </div>

    </CardContent>
  </Card>
)