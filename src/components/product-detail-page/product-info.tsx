import { Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Product } from "@/types";

interface ProductInfoProps {
  product: Product;
  effectivePrice: number;
  quantity: number;
}

function StarRating({ rating, count }: { rating: number; count?: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < Math.floor(rating);
          const partial = !filled && i < rating;
          return (
            <Star
              key={i}
              size={15}
              className={cn(
                filled
                  ? "fill-amber-400 text-amber-400"
                  : partial
                    ? "fill-amber-200 text-amber-300"
                    : "fill-muted text-muted-foreground/30"
              )}
            />
          );
        })}
      </div>
      <span className="text-sm font-semibold text-foreground tabular-nums">
        {rating.toFixed(1)}
      </span>
      {count !== undefined && (
        <span className="text-xs text-muted-foreground">({count} reviews)</span>
      )}
    </div>
  );
}

export function ProductInfo({ product, effectivePrice, quantity }: ProductInfoProps) {
  return (
    <div className="space-y-4">
      {/* Badges row */}
      <div className="flex items-center gap-2 flex-wrap">
        <Badge variant="secondary" className="text-[10px] font-semibold uppercase tracking-widest">
          {product.category}
        </Badge>
        {product.badge && (
          <Badge className="text-[10px] font-semibold uppercase tracking-widest">
            {product.badge}
          </Badge>
        )}
        {product.posted && (
          <span className="text-xs text-muted-foreground ml-auto">Posted {product.posted}</span>
        )}
      </div>

      {/* Name */}
      <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight font-serif">
        {product.name}
      </h1>

      {/* Rating */}
      <StarRating rating={product.rating} count={product.reviewCount} />

      {/* Price */}
      <div className="space-y-1">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
            UGX {effectivePrice.toLocaleString()}
          </span>
          <span className="text-sm text-muted-foreground">/ {product.unit}</span>
        </div>
        <p className="text-xs text-muted-foreground tabular-nums">
          {product.qty.toLocaleString()} {product.unit}s available
        </p>
      </div>

      {/* Price tiers */}
      {product.priceTiers && product.priceTiers.length > 1 && (
        <div className="grid grid-cols-3 gap-2">
          {product.priceTiers.map((tier) => {
            const active = quantity >= tier.minQty;
            return (
              <div
                key={tier.minQty}
                className={cn(
                  "rounded-xl border px-3 py-2 text-center transition-all duration-150",
                  active
                    ? "border-primary/40 bg-primary/5"
                    : "border-border/50 bg-muted/30 opacity-60"
                )}
              >
                <p className={cn("text-xs font-bold", active ? "text-primary" : "text-foreground")}>
                  UGX {tier.price.toLocaleString()}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{tier.label}</p>
                <p className="text-[10px] text-muted-foreground">
                  ≥ {tier.minQty} {product.unit}s
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
