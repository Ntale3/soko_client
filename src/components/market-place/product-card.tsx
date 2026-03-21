// src/pages/marketplace/components/product-card.tsx
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star } from "lucide-react"
import { useNavigate } from "@tanstack/react-router"
import { useMarketplaceStore } from "@/store/marketplace-store"
import { cn } from "@/lib/utils"
import type { MarketProduct } from "@/types"

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star
        key={s}
        className={cn(
          "size-2.5",
          s <= Math.floor(rating)
            ? "fill-amber-400 text-amber-400"
            : "fill-muted text-muted"
        )}
      />
    ))}
  </div>
)

export const MarketProductCard = ({
  product,
}: {
  product: MarketProduct
}) => {
  const navigate = useNavigate()
  const addToCart = useMarketplaceStore((s) => s.addToCart)

  return (
    <Card className="overflow-hidden shadow-sm">
      {/* Image */}
      <div className="relative flex h-28 items-center justify-center text-5xl">
        {product.img}
        {/* {product.badge && (
          <div className="absolute left-2 top-2">
            <Badge variant="secondary" className="text-xs">
              {product.badge}
            </Badge>
          </div>
        )} */}
      </div>

      <CardContent className="flex flex-col gap-1.5 p-2.5">
        {/* Name */}
        <p className="truncate text-[11px] font-bold text-foreground">
          {product.name}
        </p>

        {/* Farmer — navigates to farmer profile */}
        <button
          type="button"
          // onClick={() =>
          //   navigate({
          //     to: "/farmer-profile",
          //     search: { id: product.id },
          //   })
          //}
          className="w-fit text-[10px] font-medium text-primary hover:underline"
        >
          {product.farmer}
        </button>

        {/* Price + rating */}
        <div className="flex items-center justify-between">
          <p className="text-[13px] font-bold text-primary">{product.price}</p>
          <StarRating rating={product.rating} />
        </div>

        {/* Qty */}
        <p className="text-[10px] text-muted-foreground">{product.qty}</p>

        {/* Add to cart */}
        <Button
          size="sm"
          className="mt-1 h-7 w-full gap-1.5 text-[11px] font-bold"
          onClick={addToCart}
        >
          <ShoppingCart className="size-3" />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  )
}