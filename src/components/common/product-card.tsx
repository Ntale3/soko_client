import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Link, useNavigate } from "@tanstack/react-router"
import { Heart, Star, ShoppingCart } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Product } from "@/types"



// Star Rating
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

// Product Card
export const ProductCard = ({
  product,
  onAddToCart,
}: {
  product: Product
  onToggleWishlist: (id: number) => void
  onAddToCart: (id: number) => void
}) => (
  <Card className="overflow-hidden shadow-sm">

    {/* Image area */}
    <div className="relative flex h-24 items-center justify-center text-lg">
      {product.img}

      {/* Badge — top left */}
      {/* {product.badge && (
        <div className="absolute left-2 top-2">
          <Badge variant="secondary" className="text-[10px]">
            {product.badge}
          </Badge>
        </div>
      )} */}

      {/* Wishlist — top right */}
      {/* <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onToggleWishlist(product.id)
        }}
        className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-background shadow-sm transition-transform active:scale-90"
      >
        <Heart
          className={cn(
            "size-3.5 transition-colors",
            isWishlisted
              ? "fill-red-500 text-red-500"
              : "fill-none text-muted-foreground"
          )}
        />
      </button> */}
    </div>

    {/* Content */}
    <CardContent className="flex flex-col gap-1 p-2.5">

      {/* Name */}
      <p className="truncate text-[11px] font-bold text-foreground">
        {product.name}
      </p>

      {/* Farmer */}
      <p className="truncate text-[10px] text-muted-foreground">
        {product.farmer}
      </p>

      {/* Price + rating */}
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-bold text-primary">
          {product.price}
        </p>
        <StarRating rating={product.rating} />
      </div>

      {/* Quantity */}
      <p className="text-[10px] text-muted-foreground">{product.qty}</p>

      {/* Add to cart */}
      <Button
        size="sm"
        className="mt-1 h-7 w-full gap-1.5 text-[11px] font-bold"
        onClick={() => onAddToCart(product.id)}
      >
        <ShoppingCart className="size-3" />
        Add to Cart
      </Button>

    </CardContent>
  </Card>
)