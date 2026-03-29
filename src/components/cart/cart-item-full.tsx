import { Minus, Plus, Trash2 } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useCartStore } from "@/store/cart-store";
import { CartItem } from "@/types";

import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";

function CartItemFull({ item }: { item: CartItem }) {
  const { updateQuantity, removeItem, toggleSelected } = useCartStore();

  return (
    <div className="flex gap-4 py-4 group">
      {/* Checkbox */}
      <Checkbox
        checked={item.isSelected}
        onCheckedChange={() => toggleSelected(item.cartItemId)}
        className="mt-2 shrink-0"
      />

      {/* Image */}
      <div className="size-20 rounded-xl overflow-hidden bg-muted shrink-0">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 space-y-1.5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-semibold text-foreground leading-tight">{item.name}</p>
            <div className="flex items-center gap-1.5 mt-1">
              <Avatar className="size-5">
                <AvatarFallback className="text-[8px] font-bold bg-primary text-primary-foreground">
                  {item.farmer
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground">{item.farmer}</span>
              <span className="text-muted-foreground/40">·</span>
              <span className="text-xs text-muted-foreground">{item.district}</span>
            </div>
            <Badge variant="outline" className="text-[10px] mt-1.5">
              {item.category}
            </Badge>
          </div>
          <button
            onClick={() => removeItem(item.cartItemId)}
            className="text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100 shrink-0"
          >
            <Trash2 size={15} />
          </button>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-3">
          {/* Quantity */}
          <div className="flex items-center gap-2 bg-muted/50 rounded-xl px-2 py-1">
            <button
              onClick={() => updateQuantity(item.cartItemId, item.quantity - item.minimumOrder)}
              disabled={item.quantity <= item.minimumOrder}
              className="size-6 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-40 transition-colors"
            >
              <Minus size={12} />
            </button>
            <span className="text-sm font-bold tabular-nums w-10 text-center">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.cartItemId, item.quantity + item.minimumOrder)}
              disabled={item.quantity >= item.availableQty}
              className="size-6 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-40 transition-colors"
            >
              <Plus size={12} />
            </button>
            <span className="text-xs text-muted-foreground">{item.unit}s</span>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="text-base font-extrabold text-primary tabular-nums">
              UGX {item.subtotal.toLocaleString()}
            </p>
            <p className="text-[11px] text-muted-foreground">
              UGX {item.unitPrice.toLocaleString()} / {item.unit}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CartItemFull;
