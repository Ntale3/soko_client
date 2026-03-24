// components/auth/sign-up-steps/StepWrapper.tsx
import { useSignUpStore } from "@/store/useSignUpStore";
import { RadioGroupChoiceCard } from "./choice-card";
import SignUpForm from "./sign-up-form";
import { CheckList } from "./check-list";

const STEPS = [
  { label: "Role",    component: RadioGroupChoiceCard },
  { label: "Account", component: SignUpForm },
  { label: "Done",    component: CheckList },
];

export function StepWrapper() {
  const current = useSignUpStore((s) => s.current);
  const StepComponent = STEPS[current].component;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      <div className="w-full max-w-sm mx-auto flex flex-col gap-6">

        {/* Progress bars */}
        <div className="flex gap-2">
          {STEPS.map((step, i) => (
            <div key={i} className="flex-1 flex flex-col gap-1.5">
              <div
                className={`h-1 rounded-full transition-all duration-500 ${
                  i <= current ? "bg-primary" : "bg-muted"
                }`}
              />
              <span
                className={`text-xs font-medium transition-colors duration-200 ${
                  i <= current ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>

        {/* Animated step */}
        <div key={current} className="animate-[fadeUp_0.4s_cubic-bezier(.16,1,.3,1)_both]">
          <StepComponent />
        </div>

      </div>
    </div>
  );
}