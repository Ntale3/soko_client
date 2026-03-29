import { Calendar, Package, ShoppingBag, Star, ThumbsUp, Warehouse } from "lucide-react";
import { useState } from "react";

import { ProductCard } from "@/components/common/product-card"; // your existing card
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Product, ProductReview } from "@/types";

// ─── Interactive star picker ──────────────────────────────────────────────────

function StarPicker({ value, onChange }: { value: number; onChange: (r: number) => void }) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < (hovered || value);
        return (
          <button
            key={i}
            onMouseEnter={() => setHovered(i + 1)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => onChange(i + 1)}
            className="p-0.5 transition-transform hover:scale-110"
            aria-label={`Rate ${i + 1} star${i !== 0 ? "s" : ""}`}
          >
            <Star
              size={22}
              className={cn(
                "transition-colors",
                filled ? "fill-amber-400 text-amber-400" : "fill-muted text-muted-foreground/30"
              )}
            />
          </button>
        );
      })}
    </div>
  );
}

// ─── Single review ────────────────────────────────────────────────────────────

function ReviewItem({
  review,
  onHelpful,
}: {
  review: ProductReview;
  onHelpful: (id: string) => void;
}) {
  function timeAgo(iso: string) {
    const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
    if (diff < 1) return "today";
    if (diff < 7) return `${diff}d ago`;
    if (diff < 30) return `${Math.floor(diff / 7)}w ago`;
    return `${Math.floor(diff / 30)}mo ago`;
  }

  return (
    <div className="space-y-2">
      <div className="flex items-start gap-3">
        <Avatar className="size-9 ring-2 ring-border shrink-0">
          <AvatarFallback className="text-xs font-bold bg-muted">
            {review.reviewerInitials}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center justify-between flex-wrap gap-1">
            <p className="text-sm font-semibold text-foreground">{review.reviewer}</p>
            <span className="text-xs text-muted-foreground">{timeAgo(review.createdAt)}</span>
          </div>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={11}
                className={cn(
                  i < review.rating
                    ? "fill-amber-400 text-amber-400"
                    : "fill-muted text-muted-foreground/30"
                )}
              />
            ))}
          </div>
          <p className="text-sm text-foreground/80 leading-relaxed">{review.body}</p>
          <button
            onClick={() => onHelpful(review.id)}
            className={cn(
              "flex items-center gap-1.5 text-xs font-medium rounded-full px-2.5 py-1 transition-colors",
              review.isHelpfulByMe
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <ThumbsUp size={11} className={cn(review.isHelpfulByMe && "fill-primary")} />
            Helpful {review.helpful > 0 && `(${review.helpful})`}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Details tab ──────────────────────────────────────────────────────────────

function DetailsTab({ product }: { product: Product }) {
  const specs = [
    {
      icon: <Package size={14} className="text-primary" />,
      label: "Available Stock",
      value: product.qtyDisplay || `${product.qty.toLocaleString()} ${product.unit}s`,
    },
    {
      icon: <ShoppingBag size={14} className="text-primary" />,
      label: "Minimum Order",
      value: `${product.minimumOrder ?? 1} ${product.unit}s`,
    },
    {
      icon: <Calendar size={14} className="text-primary" />,
      label: "Harvest Date",
      value: product.harvestDate
        ? new Date(product.harvestDate).toLocaleDateString("en-UG", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        : "N/A",
    },
    {
      icon: <Warehouse size={14} className="text-primary" />,
      label: "Storage",
      value: product.storage ?? "N/A",
    },
  ];

  return (
    <div className="space-y-5">
      {product.description && (
        <p className="text-sm text-foreground/80 leading-relaxed">{product.description}</p>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {specs.map(({ icon, label, value }) => (
          <div
            key={label}
            className="bg-muted/50 border border-border/40 rounded-xl p-3 space-y-1.5"
          >
            <div className="flex items-center gap-1.5">
              {icon}
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">
                {label}
              </span>
            </div>
            <p className="text-sm font-semibold text-foreground leading-tight">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Reviews tab ──────────────────────────────────────────────────────────────

function ReviewsTab({
  product,
  onHelpful,
  onSubmitRating,
}: {
  product: Product;
  onHelpful: (id: string) => void;
  onSubmitRating: (r: number) => void;
}) {
  const [selectedRating, setSelectedRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!selectedRating) return;
    onSubmitRating(selectedRating);
    setSubmitted(true);
  };

  return (
    <div className="space-y-6">
      {/* Rating summary */}
      <div className="flex items-center gap-4 bg-muted/40 rounded-2xl p-4">
        <div className="text-center shrink-0">
          <p className="text-4xl font-extrabold text-foreground leading-none">
            {product.rating.toFixed(1)}
          </p>
          <div className="flex items-center gap-0.5 mt-1 justify-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={11}
                className={cn(
                  i < Math.round(product.rating)
                    ? "fill-amber-400 text-amber-400"
                    : "fill-muted text-muted-foreground/30"
                )}
              />
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground mt-1">{product.reviewCount} reviews</p>
        </div>
        <Separator orientation="vertical" className="h-16" />
        {/* Rate this product */}
        <div className="flex-1 space-y-2">
          <p className="text-sm font-semibold text-foreground">Rate this product</p>
          {submitted ? (
            <p className="text-sm text-primary font-medium">Thanks for your rating! ⭐</p>
          ) : (
            <div className="flex items-center gap-3 flex-wrap">
              <StarPicker value={selectedRating} onChange={setSelectedRating} />
              <Button
                size="sm"
                className="rounded-xl h-8 px-4 text-xs font-semibold"
                disabled={!selectedRating}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Review list */}
      {product.reviews?.length ? (
        <div className="space-y-4">
          {product.reviews.map((review, i) => (
            <div key={review.id}>
              <ReviewItem review={review} onHelpful={onHelpful} />
              {i < product.reviews!.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-muted-foreground text-sm">
          No reviews yet — be the first!
        </div>
      )}
    </div>
  );
}

// ─── Similar tab ──────────────────────────────────────────────────────────────

function SimilarTab({ product, allProducts }: { product: Product; allProducts: Product[] }) {
  const similar = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  if (!similar.length) {
    return (
      <p className="text-sm text-muted-foreground text-center py-8">No similar products found.</p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {similar.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

// ─── Tabs container ───────────────────────────────────────────────────────────

interface ProductTabsProps {
  product: Product;
  activeTab: string;
  allProducts: Product[];
  onTabChange: (tab: string) => void;
  onReviewHelpful: (id: string) => void;
  onSubmitRating: (r: number) => void;
}

export function ProductTabs({
  product,
  activeTab,
  allProducts,
  onTabChange,
  onReviewHelpful,
  onSubmitRating,
}: ProductTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="w-full sm:w-auto rounded-xl h-10 bg-muted/50 border border-border/50">
        <TabsTrigger value="details" className="rounded-lg text-sm flex-1 sm:flex-none capitalize">
          Details
        </TabsTrigger>
        <TabsTrigger value="reviews" className="rounded-lg text-sm flex-1 sm:flex-none capitalize">
          Reviews {product.reviewCount ? `(${product.reviewCount})` : ""}
        </TabsTrigger>
        <TabsTrigger value="similar" className="rounded-lg text-sm flex-1 sm:flex-none capitalize">
          Similar
        </TabsTrigger>
      </TabsList>

      <div className="mt-6">
        <TabsContent value="details">
          <DetailsTab product={product} />
        </TabsContent>
        <TabsContent value="reviews">
          <ReviewsTab
            product={product}
            onHelpful={onReviewHelpful}
            onSubmitRating={onSubmitRating}
          />
        </TabsContent>
        <TabsContent value="similar">
          <SimilarTab product={product} allProducts={allProducts} />
        </TabsContent>
      </div>
    </Tabs>
  );
}
