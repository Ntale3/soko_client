import { Check, CreditCard, MapPin, ShoppingCart } from "lucide-react";

import { cn } from "@/lib/utils";
import { CheckoutStep } from "@/store/cart-store";

const STEPS: { key: CheckoutStep; label: string; icon: React.ReactNode }[] = [
  { key: "cart", label: "Cart", icon: <ShoppingCart size={14} /> },
  { key: "address", label: "Delivery", icon: <MapPin size={14} /> },
  { key: "payment", label: "Payment", icon: <CreditCard size={14} /> },
];

const STEP_ORDER: CheckoutStep[] = ["cart", "address", "payment", "confirmation"];

interface CheckoutStepperProps {
  currentStep: CheckoutStep;
}

export function CheckoutStepper({ currentStep }: CheckoutStepperProps) {
  const currentIndex = STEP_ORDER.indexOf(currentStep);

  return (
    <div className="flex items-center justify-center gap-0">
      {STEPS.map((step, i) => {
        const stepIndex = STEP_ORDER.indexOf(step.key);
        const isDone = stepIndex < currentIndex;
        const isActive = step.key === currentStep;

        return (
          <div key={step.key} className="flex items-center">
            {/* Step circle */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "size-9 rounded-full flex items-center justify-center border-2 transition-all duration-200",
                  isDone
                    ? "bg-primary border-primary text-primary-foreground"
                    : isActive
                      ? "bg-primary/10 border-primary text-primary"
                      : "bg-muted/50 border-border text-muted-foreground"
                )}
              >
                {isDone ? <Check size={14} strokeWidth={2.5} /> : step.icon}
              </div>
              <span
                className={cn(
                  "text-[10px] font-semibold uppercase tracking-widest whitespace-nowrap",
                  isActive ? "text-primary" : isDone ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  "w-16 md:w-24 h-0.5 mb-5 mx-1 transition-colors duration-300",
                  stepIndex < currentIndex ? "bg-primary" : "bg-border/50"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
