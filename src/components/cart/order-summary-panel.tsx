import { ShoppingBag } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CartItem, CartSummary } from "@/types";

interface OrderSummaryPanelProps {
  items: CartItem[];
  summary: CartSummary;
}

export function OrderSummaryPanel({ items, summary }: OrderSummaryPanelProps) {
  return (
    <div className="bg-card border border-border/60 rounded-2xl p-5 space-y-4 lg:sticky lg:top-20">
      <div className="flex items-center gap-2">
        <ShoppingBag size={16} className="text-primary" />
        <h3 className="font-semibold text-foreground text-sm">Order Summary</h3>
        <Badge variant="secondary" className="text-[10px] ml-auto">
          {summary.itemCount} item{summary.itemCount !== 1 ? "s" : ""}
        </Badge>
      </div>

      {/* Item list */}
      <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
        {items.map((item) => (
          <div key={item.cartItemId} className="flex gap-2.5 items-center">
            <div className="size-10 rounded-lg overflow-hidden bg-muted shrink-0">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground line-clamp-1">{item.name}</p>
              <p className="text-[10px] text-muted-foreground">
                {item.quantity} {item.unit}s × UGX {item.unitPrice.toLocaleString()}
              </p>
            </div>
            <p className="text-xs font-bold text-foreground tabular-nums shrink-0">
              UGX {item.subtotal.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <Separator />

      {/* Totals */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium">UGX {summary.subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Delivery fee</span>
          <span className="font-medium">UGX {summary.deliveryFee.toLocaleString()}</span>
        </div>
        <Separator />
        <div className="flex justify-between">
          <span className="font-bold text-foreground">Total</span>
          <span className="text-xl font-extrabold text-primary tabular-nums">
            UGX {summary.total.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
