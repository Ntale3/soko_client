import { BadgeCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Product } from "@/types";

interface ProductGalleryProps {
  product: Product;
  activeIndex: number;
  onSelect: (i: number) => void;
}

export function ProductGallery({ product, activeIndex, onSelect }: ProductGalleryProps) {
  const images = product.images?.length ? product.images : [product.image];

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative rounded-2xl overflow-hidden bg-muted aspect-square md:aspect-[4/3] w-full">
        <img
          src={images[activeIndex]}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-300"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        {/* Verified badge */}
        {product.verified && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-primary text-primary-foreground text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-md">
            <BadgeCheck size={12} strokeWidth={2.5} />
            Verified Farmer
          </div>
        )}

        {/* Fresh badge */}
        {product.fresh && (
          <Badge className="absolute top-3 left-3 text-[10px] font-semibold">🟢 Fresh</Badge>
        )}

        {/* Tags */}
        {product.tags?.length ? (
          <div className="absolute bottom-3 left-3 flex gap-1.5 flex-wrap">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="bg-black/40 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-0.5 rounded-full border border-white/20"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className={cn(
                "shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-150",
                i === activeIndex
                  ? "border-primary shadow-sm scale-[1.04]"
                  : "border-border/50 hover:border-primary/40 opacity-70 hover:opacity-100"
              )}
            >
              <img src={src} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
