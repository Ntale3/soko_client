import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { Product } from "@/types";

import { ProductCard } from "../common/product-card";
import { Button } from "../ui/button";

export const FreshListingsSection = ({ products }: { products: Product[] }) => {
  //const navigate = useNavigate()
  // const [wishlist, setWishlist] = useState<number[]>([])

  // const toggleWishlist = (id: number) =>
  //   setWishlist((prev: number[]) =>
  //     prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
  //   )

  const addToCart = (id: number) => {
    // handle cart logic here
    console.log("added to cart", id);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-[13px] font-bold text-foreground">🛒 Fresh Listings</h3>
        <Button
          variant="link"
          size="sm"
          className="h-auto p-0 text-[11px] font-semibold text-primary"
          asChild
        >
          <Link to="/marketplace">See all</Link>
        </Button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {products.slice(0, 4).map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            // isWishlisted={wishlist.includes(p.id)}
            //onToggleWishlist={toggleWishlist}
            onAddToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
};
