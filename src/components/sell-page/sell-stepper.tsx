import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { SELL_STEPS, SellStep } from "@/types/sell";

interface SellStepperProps {
  currentStep: SellStep;
  completedSteps: SellStep[];
  onStepClick: (step: SellStep) => void;
}

const STEP_ORDER: SellStep[] = ["info", "pricing", "photos", "publish"];

export function SellStepper({ currentStep, completedSteps, onStepClick }: SellStepperProps) {
  const currentIndex = STEP_ORDER.indexOf(currentStep);

  return (
    <div className="flex items-start justify-between relative">
      {/* Connecting line behind circles */}
      <div className="absolute top-4 left-0 right-0 h-0.5 bg-border/50 mx-8 z-0" />

      {SELL_STEPS.map((step, i) => {
        const stepIndex = STEP_ORDER.indexOf(step.key);
        const isCompleted = completedSteps.includes(step.key);
        const isActive = step.key === currentStep;
        const isPast = stepIndex < currentIndex;
        const canClick = isPast || isCompleted;

        return (
          <div key={step.key} className="flex flex-col items-center gap-2 z-10 flex-1">
            <button
              onClick={() => canClick && onStepClick(step.key)}
              disabled={!canClick && !isActive}
              className={cn(
                "size-9 rounded-full flex items-center justify-center border-2 font-bold text-sm transition-all duration-200",
                isCompleted || isPast
                  ? "bg-primary border-primary text-primary-foreground cursor-pointer hover:opacity-80"
                  : isActive
                    ? "bg-primary/10 border-primary text-primary shadow-sm shadow-primary/20"
                    : "bg-background border-border text-muted-foreground cursor-default"
              )}
            >
              {isCompleted || isPast ? <Check size={14} strokeWidth={3} /> : i + 1}
            </button>
            <span
              className={cn(
                "text-[10px] font-semibold uppercase tracking-widest text-center whitespace-nowrap",
                isActive
                  ? "text-primary"
                  : isPast || isCompleted
                    ? "text-foreground"
                    : "text-muted-foreground"
              )}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
