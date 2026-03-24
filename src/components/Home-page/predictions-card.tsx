import { Link } from "@tanstack/react-router";
import { TrendingDown, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { PricePrediction } from "@/types";

// ── Price Prediction Card
export const PricePredictionCard = ({ p }: { p: PricePrediction }) => {
  const isUp = p.trend === "up";

  return (
    <Card className="w-38 shrink-0 shadow-sm">
      <CardContent className="p-3.5 flex flex-col gap-2">
        {/* Crop name */}
        <p className="text-xs font-bold text-foreground truncate">{p.crop}</p>

        {/* Current price */}
        <p className="text-[11px] text-muted-foreground">
          Now: <span className="font-semibold text-foreground">{p.current}</span>
        </p>

        {/* Predicted price + trend */}
        <div
          className={cn(
            "flex items-center gap-1 text-[11px] font-semibold",
            isUp ? "text-emerald-600" : "text-destructive"
          )}
        >
          {isUp ? (
            <TrendingUp className="size-3 shrink-0" />
          ) : (
            <TrendingDown className="size-3 shrink-0" />
          )}
          {p.predicted}
        </div>

        {/* Confidence bar */}
        <div className="flex flex-col gap-1">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${p.confidence}%` }}
            />
          </div>
          <p className="text-[10px] text-muted-foreground">{p.confidence}% confidence</p>
        </div>
      </CardContent>
    </Card>
  );
};
