// src/pages/search/components/produce-result-card.tsx
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Product } from "./types"

export const ProduceResultCard = ({ product }: { product: Product }) => (
  <Card className="overflow-hidden shadow-sm">
    {/* Image */}
    <div className="relative flex h-24 items-center justify-center  text-lg">
      {product.img}

    </div>

    <CardContent className="flex flex-col gap-1 p-2.5">
      <p className="truncate text-[11px] font-bold text-foreground">
        {product.name}
      </p>
      <p className="truncate text-[10px] text-muted-foreground">
        {product.farmer}
      </p>
      <p className="text-xs font-bold text-primary">{product.price}</p>
      <Button size="sm" className="mt-1 h-7 w-full text-[11px] font-bold">
        Add to Cart
      </Button>
    </CardContent>
  </Card>
)