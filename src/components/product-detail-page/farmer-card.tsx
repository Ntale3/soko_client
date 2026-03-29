import { Link } from "@tanstack/react-router";
import { BadgeCheck, Calendar, MapPin, MessageCircle, Phone, ShoppingBag } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";

interface FarmerCardProps {
  product: Product;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatDate(iso?: string) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("en-UG", { month: "long", year: "numeric" });
}

export function FarmerCard({ product }: FarmerCardProps) {
  const fd = product.farmerDetail;

  return (
    <div className="bg-muted/40 border border-border/50 rounded-2xl p-4 space-y-3">
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <Avatar className="size-12 ring-2 ring-primary/20 shrink-0">
          <AvatarFallback className="text-sm font-bold bg-primary text-primary-foreground">
            {getInitials(product.farmer)}
          </AvatarFallback>
        </Avatar>

        {/* Name + location */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <p className="text-sm font-semibold text-foreground leading-none">{product.farmer}</p>
            {product.verified && <BadgeCheck size={14} className="text-primary shrink-0" />}
          </div>
          <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
            <MapPin size={11} />
            {product.district} District
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 shrink-0">
          <Link to="/messages">
            <Button
              size="icon"
              variant="outline"
              className="size-9 rounded-xl border-border/60 hover:bg-primary/5 hover:border-primary/40"
              aria-label="Message farmer"
            >
              <MessageCircle size={15} />
            </Button>
          </Link>
          {fd?.phone && (
            <a href={`tel:${fd.phone}`}>
              <Button
                size="icon"
                variant="outline"
                className="size-9 rounded-xl border-border/60 hover:bg-primary/5 hover:border-primary/40"
                aria-label="Call farmer"
              >
                <Phone size={15} />
              </Button>
            </a>
          )}
        </div>
      </div>

      {/* Stats row */}
      {(fd?.totalSales || fd?.memberSince || fd?.responseTime) && (
        <div className="flex flex-wrap gap-3 pt-1 border-t border-border/40">
          {fd?.totalSales && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <ShoppingBag size={11} className="text-primary" />
              {fd.totalSales.toLocaleString()} {product.unit}s sold
            </div>
          )}
          {fd?.memberSince && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar size={11} className="text-primary" />
              Since {formatDate(fd.memberSince)}
            </div>
          )}
          {fd?.responseTime && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <MessageCircle size={11} className="text-primary" />
              {fd.responseTime}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
