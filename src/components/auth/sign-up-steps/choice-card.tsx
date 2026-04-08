import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Ic } from "@/constants/crisp-svg";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";
import { useSignUpStore } from "@/store/useSignUpStore";

import { Button } from "../../ui/button";

interface RoleOption {
  value: string;
  title: string;
  description: string;
  icon: string;
}

const ROLE_OPTIONS: RoleOption[] = [
  {
    value: "farmer",
    title: "Sell My Produce",
    description: "I grow crops and want to reach buyers directly",
    icon: "🌾",
  },
  {
    value: "buyer",
    title: "Buy From Farmers",
    description: "I want to source fresh produce directly from farms",
    icon: "🛒",
  },
  {
    value: "both",
    title: "Both",
    description: "I want to buy and sell on one account",
    icon: "🤝",
  },
];

export function RadioGroupChoiceCard() {
  const { role, setRole, next, canProceed } = useSignUpStore();
  const { handleGoogleLogin } = useAuthStore();

  return (
    <div className="flex flex-col gap-3 w-full max-w-sm">
      <div>
        <h3 className="font-bold text-3xl text-foreground">I want to.....</h3>
        <p className="text-muted-foreground">Tell us how you'll use Soko.</p>
      </div>

      <RadioGroup value={role} onValueChange={setRole} className="flex flex-col gap-3">
        {ROLE_OPTIONS.map((opt) => (
          <label // plain HTML label, not FieldLabel
            key={opt.value}
            htmlFor={opt.value} // correctly targets only this item's RadioGroupItem
            className={cn(
              "rounded-2xl border border-border bg-card p-4 cursor-pointer",
              "transition-all duration-200 hover:border-primary",
              role === opt.value && "border-primary bg-primary/5"
            )}
          >
            <Field orientation="horizontal" className="items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl">
                <span className="text-2xl">{opt.icon}</span>
              </div>
              <FieldContent className="flex-1">
                <FieldTitle className="font-bold">{opt.title}</FieldTitle>
                <FieldDescription>{opt.description}</FieldDescription>
              </FieldContent>
              <RadioGroupItem value={opt.value} id={opt.value} />
            </Field>
          </label>
        ))}
      </RadioGroup>

      <div className="flex flex-col gap-4 mt-2">
        <Button
          className="w-full h-11 hover:-translate-y-0.5 transition-all hover:shadow-2xl"
          disabled={!canProceed}
          onClick={next}
        >
          Continue <Ic n="arrow" s={18} c="var(--primary-foreground)" />
        </Button>

        <Button
          className="mb-6 gap-3 py-3.25 px-7 rounded-[14px] text-[15px] w-full h-11 hover:-translate-y-0.5 transition-all"
          variant="outline"
          onClick={handleGoogleLogin}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" className="shrink-0">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </Button>
      </div>
    </div>
  );
}
