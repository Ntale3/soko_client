import { Heart, Loader2, Minus, Plus, Share2, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ─── Quantity Selector ────────────────────────────────────────────────────────

interface QuantitySelectorProps {
  quantity: number;
  unit: string;
  available: number;
  minimumOrder?: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onChange: (qty: number) => void;
}

export function QuantitySelector({
  quantity,
  unit,
  available,
  minimumOrder = 1,
  onIncrement,
  onDecrement,
  onChange,
}: QuantitySelectorProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-foreground">Quantity ({unit}s)</label>
        <span className="text-xs text-muted-foreground">
          Min. {minimumOrder} {unit}s
        </span>
      </div>

      <div className="flex items-center gap-3">
        {/* Decrement */}
        <Button
          type="button"
          size="icon"
          variant="outline"
          className="size-10 rounded-xl shrink-0"
          onClick={onDecrement}
          disabled={quantity <= minimumOrder}
        >
          <Minus size={14} />
        </Button>

        {/* Direct number input — controlled, always a number */}
        <input
          type="number"
          value={quantity}
          min={minimumOrder}
          max={available}
          onChange={(e) => {
            // e.target.valueAsNumber avoids the [object Object] bug
            const parsed = e.target.valueAsNumber;
            if (!isNaN(parsed)) onChange(parsed);
          }}
          onBlur={(e) => {
            // Clamp on blur so partial input gets corrected
            const parsed = e.target.valueAsNumber;
            const clamped = Math.min(
              available,
              Math.max(minimumOrder, isNaN(parsed) ? minimumOrder : parsed)
            );
            onChange(clamped);
          }}
          className={cn(
            "flex-1 h-10 rounded-xl border border-border/60 bg-background",
            "text-center font-bold text-base text-foreground",
            "focus:outline-none focus:ring-2 focus:ring-primary/40",
            // Hide browser spin arrows
            "[appearance:textfield]",
            "[&::-webkit-outer-spin-button]:appearance-none",
            "[&::-webkit-inner-spin-button]:appearance-none"
          )}
        />

        {/* Increment */}
        <Button
          type="button"
          size="icon"
          variant="outline"
          className="size-10 rounded-xl shrink-0"
          onClick={onIncrement}
          disabled={quantity >= available}
        >
          <Plus size={14} />
        </Button>

        <span className="text-xs text-muted-foreground shrink-0 whitespace-nowrap">
          of {available.toLocaleString()} avail.
        </span>
      </div>
    </div>
  );
}

// ─── Order Summary ────────────────────────────────────────────────────────────

interface OrderSummaryProps {
  quantity: number;
  unit: string;
  effectivePrice: number;
  subtotal: number;
  originalPrice: number;
}

export function OrderSummary({
  quantity,
  unit,
  effectivePrice,
  subtotal,
  originalPrice,
}: OrderSummaryProps) {
  const hasDiscount = effectivePrice < originalPrice;
  const saved = (originalPrice - effectivePrice) * quantity;

  return (
    <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-foreground/70">
          {quantity.toLocaleString()} {unit}s × UGX {effectivePrice.toLocaleString()}
        </span>
        <span className="text-lg font-extrabold text-primary">UGX {subtotal.toLocaleString()}</span>
      </div>
      {hasDiscount && (
        <div className="flex items-center justify-between">
          <span className="text-xs text-primary font-medium">Bulk discount applied</span>
          <span className="text-xs text-primary font-semibold">− UGX {saved.toLocaleString()}</span>
        </div>
      )}
    </div>
  );
}

// ─── Action Buttons ───────────────────────────────────────────────────────────

interface ProductActionsProps {
  isWishlisted: boolean;
  isAddingToCart: boolean;
  onAddToCart: () => void;
  onToggleWishlist: () => void;
  onShare: () => void;
}

export function ProductActions({
  isWishlisted,
  isAddingToCart,
  onAddToCart,
  onToggleWishlist,
  onShare,
}: ProductActionsProps) {
  return (
    <div className="flex gap-2">
      <Button
        className="flex-1 h-11 text-sm font-semibold gap-2 shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.98] transition-all"
        onClick={onAddToCart}
        disabled={isAddingToCart}
      >
        {isAddingToCart ? (
          <Loader2 size={15} className="animate-spin" />
        ) : (
          <ShoppingCart size={15} />
        )}
        {isAddingToCart ? "Adding…" : "Add to Cart"}
      </Button>

      <Button
        type="button"
        size="icon"
        variant="outline"
        className={cn(
          "size-11 rounded-xl border-border/60 transition-all",
          isWishlisted ? "bg-red-50 border-red-200 text-red-500 hover:bg-red-100" : "hover:bg-muted"
        )}
        onClick={onToggleWishlist}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart size={16} className={cn(isWishlisted && "fill-red-500 text-red-500")} />
      </Button>

      <Button
        type="button"
        size="icon"
        variant="outline"
        className="size-11 rounded-xl border-border/60 hover:bg-muted"
        onClick={onShare}
        aria-label="Share product"
      >
        <Share2 size={16} />
      </Button>
    </div>
  );
}
