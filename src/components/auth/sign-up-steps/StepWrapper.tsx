import { Link, useNavigate } from "@tanstack/react-router";

import { Logo } from "@/components/landing-page/logo";
import { Button } from "@/components/ui/button";
import { Ic } from "@/constants/crisp-svg";
import { useSignUpStore } from "@/store/useSignUpStore";

import { CheckList } from "./check-list";
import { RadioGroupChoiceCard } from "./choice-card";
import SignUpForm from "./sign-up-form";

const STEPS = [
  { label: "Role", component: RadioGroupChoiceCard },
  { label: "Account", component: SignUpForm },
  { label: "Done", component: CheckList },
];

export function StepWrapper() {
  const current = useSignUpStore((s) => s.current);
  const StepComponent = STEPS[current].component;
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-sm flex flex-col gap-6 px-1 py-8">
      {/* Mobile logo */}
      <div className="lg:hidden">
        <Logo dark size="md" LogoStyle="text-primary" />
      </div>

      {/* Heading */}
      <div className="flex flex-col gap-1">
        <h1 className="fraunces text-[32px] font-extrabold tracking-[-0.3px] text-foreground">
          Create Account!
        </h1>
        <p className="text-[15px] text-muted-foreground flex items-center gap-1">
          Already have an account?
          <Button
            variant="link"
            className="h-auto p-0"
            onClick={() => {
              navigate({ to: "/auth/sign-in", from: "/auth/sign-up" });
            }}
            asChild
          >
            <Link to="/auth/sign-in" className="flex items-center gap-0.5">
              <span className="text-primary font-semibold">Sign in</span>
              <Ic n="arrow" s={16} c="var(--primary)" />
            </Link>
          </Button>
        </p>
      </div>

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
  );
}
