import { useNavigate } from "@tanstack/react-router";
import { BadgeCheck, MapPin, MessageCircle, ShoppingCart, Star } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-1 text-xs text-muted-foreground">
      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
      {rating.toFixed(1)}
    </span>
  );
}

export function ProductListItem({ product: p }: { product: Product }) {
  const navigate = useNavigate();

  return (
    <Card
      className="border border-border bg-card cursor-pointer transition-all duration-200 hover:shadow-md hover:border-primary/30 group"
      onClick={() => navigate({ to: `/marketplace/${p.id}` })}
    >
      <CardContent className="p-3.5 flex gap-4 items-center flex-wrap">
        {/* thumbnail */}
        <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center shrink-0 overflow-hidden">
          <img src={p.image} alt={p.name} />
        </div>

        {/* info */}
        <div className="flex-1 min-w-40 space-y-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h3 className="text-sm font-semibold text-card-foreground group-hover:text-primary transition-colors line-clamp-1">
              {p.name}
            </h3>
            {p.verified && <BadgeCheck className="w-3.5 h-3.5 text-primary shrink-0" />}
            <Badge variant="outline" className="text-[10px] ml-auto shrink-0">
              {p.category}
            </Badge>
          </div>

          <div className="flex items-center gap-1.5">
            <Avatar className="w-4 h-4">
              <AvatarFallback className="text-[8px] font-bold">
                {getInitials(p.farmer)}
              </AvatarFallback>
            </Avatar>
            <span className="text-[11px] text-muted-foreground truncate">{p.farmer}</span>
            <span className="text-muted-foreground/40 text-xs">·</span>
            <MapPin className="w-2.5 h-2.5 text-muted-foreground/60 shrink-0" />
            <span className="text-[11px] text-muted-foreground shrink-0">{p.district}</span>
          </div>

          <StarRating rating={p.rating} />
        </div>

        {/* price + actions */}
        <div className={cn("flex items-center gap-4 shrink-0 ml-auto")}>
          <div className="text-right">
            <p className="text-base font-extrabold text-primary leading-none">
              UGX {p.price.toLocaleString()}
            </p>
            <span className="text-[11px] text-muted-foreground">/{p.unit}</span>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              className="h-8 text-xs px-4 gap-1.5"
              onClick={(e) => {
                e.stopPropagation();
                navigate({ to: `/marketplace/${p.id}` });
              }}
            >
              <ShoppingCart size={12} />
              Buy
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-8 text-xs px-4 gap-1.5"
              onClick={(e) => {
                e.stopPropagation();
                navigate({ to: "/messages" });
              }}
            >
              <MessageCircle size={12} />
              Chat
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
