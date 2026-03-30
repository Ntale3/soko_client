import { Link } from "@tanstack/react-router";
import { BadgeCheck, MapPin, MessageCircle, Star } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Farmer } from "@/types";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

interface FarmerResultCardProps {
  farmer: Farmer;
}

export function FarmerResultCard({ farmer }: FarmerResultCardProps) {
  return (
    <Link
      to="/farmers/$id"
      params={{ id: String(farmer.id) }}
      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-2xl"
    >
      <Card className="border border-border/60 bg-card hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group">
        <CardContent className="p-4 flex gap-4 items-center flex-wrap">
          {/* Avatar */}
          <div className="relative shrink-0">
            <Avatar className="size-12 ring-2 ring-primary/20">
              <AvatarFallback className="text-sm font-bold bg-primary text-primary-foreground">
                {getInitials(farmer.name)}
              </AvatarFallback>
            </Avatar>
            {farmer.online && (
              <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-background" />
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                {farmer.name}
              </h3>
              {farmer.verified && <BadgeCheck size={14} className="text-primary shrink-0" />}
              <Badge variant="outline" className="text-[10px] ml-auto shrink-0">
                {farmer.badge}
              </Badge>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin size={10} className="shrink-0" />
              {farmer.location}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={10}
                  className={cn(
                    i < Math.floor(farmer.rating)
                      ? "fill-amber-400 text-amber-400"
                      : "fill-muted text-muted-foreground/30"
                  )}
                />
              ))}
              <span className="text-xs text-muted-foreground ml-0.5">
                {farmer.rating.toFixed(1)}
                {farmer.reviews && ` · ${farmer.reviews} reviews`}
              </span>
            </div>

            {/* Produce tags */}
            {farmer.produce?.length > 0 && (
              <div className="flex gap-1 flex-wrap">
                {farmer.produce.slice(0, 3).map((p) => (
                  <Badge key={p} variant="secondary" className="text-[10px] rounded-full">
                    {p}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Price + Chat */}
          <div className="flex flex-col items-end gap-2 shrink-0">
            {farmer.price && (
              <p className="text-sm font-extrabold text-primary tabular-nums">{farmer.price}</p>
            )}
            <Link to="/messages" onClick={(e) => e.stopPropagation()}>
              <Button
                size="sm"
                variant="outline"
                className="h-8 rounded-xl gap-1.5 text-xs border-border/60 hover:bg-primary/5 hover:border-primary/40"
              >
                <MessageCircle size={12} /> Chat
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
