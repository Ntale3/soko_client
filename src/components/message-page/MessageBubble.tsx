import { Check, CheckCheck, Package } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Message } from "@/constants/mock-messages-api";
import { MOCK_ME } from "@/constants/mock-messages-api";
import { cn } from "@/lib/utils";

export function MessageBubble({ message }: { message: Message }) {
  const isMe = message.senderId === MOCK_ME.id;

  if (message.type === "offer" && message.offer) {
    return (
      <div className={cn("flex", isMe ? "justify-end" : "justify-start")}>
        <Card
          className={cn(
            "max-w-70 p-0 overflow-hidden border-emerald-200 dark:border-emerald-800",
            isMe ? "rounded-tr-sm" : "rounded-tl-sm"
          )}
        >
          <div className="bg-emerald-600 dark:bg-emerald-800 px-4 py-2 flex items-center gap-2">
            <Package className="size-4 text-white" />
            <span className="text-xs font-semibold text-white uppercase tracking-wide">
              Trade Offer
            </span>
          </div>
          <div className="px-4 py-3 space-y-2">
            <p className="font-bold text-sm">{message.offer.product}</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="text-muted-foreground">Quantity</p>
                <p className="font-semibold">
                  {message.offer.quantity} {message.offer.unit}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Price/kg</p>
                <p className="font-semibold text-emerald-600">{message.offer.price} UGX</p>
              </div>
            </div>
            {!isMe && (
              <div className="flex gap-2 pt-1">
                <Button
                  size="sm"
                  className="flex-1 h-7 text-xs bg-emerald-600 hover:bg-emerald-700"
                >
                  Accept
                </Button>
                <Button size="sm" variant="outline" className="flex-1 h-7 text-xs">
                  Decline
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={cn("flex items-end gap-1.5", isMe ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[75%] px-3.5 py-2 rounded-2xl text-sm leading-relaxed",
          isMe
            ? "bg-primary text-primary-foreground rounded-br-sm"
            : "bg-card text-foreground rounded-bl-sm"
        )}
      >
        <p>{message.text}</p>
        <div className={cn("flex items-center gap-1 mt-1", isMe ? "justify-end" : "justify-start")}>
          <span
            className={cn(
              "text-[10px]",
              isMe ? "text-primary-foreground/60" : "text-muted-foreground"
            )}
          >
            {message.timestamp}
          </span>
          {isMe &&
            (message.read ? (
              <CheckCheck className="size-3 text-primary-foreground/60" />
            ) : (
              <Check className="size-3 text-primary-foreground/60" />
            ))}
        </div>
      </div>
    </div>
  );
}
