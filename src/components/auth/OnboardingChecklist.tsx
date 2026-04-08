import { Check, Mail, Shield, ShoppingBag } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: Check,
    label: "Account created successfully",
    done: true,
  },
  {
    icon: Mail,
    label: "Verify your email address",
    done: false,
  },
  {
    icon: Shield,
    label: "Complete KYC verification (optional)",
    done: false,
  },
  {
    icon: ShoppingBag,
    label: "Post your first listing",
    done: false,
  },
];

export function OnboardingChecklist() {
  return (
    <Card className="w-full max-w-md rounded-2xl overflow-hidden border shadow-sm">
      {steps.map((step, i) => {
        return (
          <CardContent
            key={step.label}
            className={cn(
              "flex items-center gap-3 sm:gap-4 p-3 sm:p-4",
              i < steps.length - 1 && "border-b border-border"
            )}
          >
            {/* Icon */}
            <div
              className={cn(
                "flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full border",
                step.done
                  ? "border-emerald-500 text-emerald-500"
                  : "border-muted-foreground/30 text-muted-foreground/50"
              )}
            >
              <step.icon className="size-4" />
            </div>

            {/* Label */}
            <span
              className={cn(
                "flex-1 text-xs sm:text-sm leading-snug",
                step.done ? "font-semibold text-card-foreground" : "text-muted-foreground"
              )}
            >
              {step.label}
            </span>

            {/* Done checkmark */}
            {step.done && <Check className="size-4 text-emerald-500 shrink-0" />}
          </CardContent>
        );
      })}
    </Card>
  );
}
