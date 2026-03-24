// components/auth/sign-up-steps/check-list.tsx
import { useNavigate } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

import { OnboardingChecklist } from "../OnboardingChecklist";

export function CheckList() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="text-center">
        <h3 className="font-bold text-2xl sm:text-3xl">You're all set! 🎉</h3>
        <p className="text-muted-foreground text-sm mt-2">
          Welcome to Soko. Start exploring the marketplace.
        </p>
      </div>

      <div className="flex flex-col items-center text-center gap-3 rounded-xl p-6 w-full">
        <div className="flex size-16 sm:size-20 items-center justify-center rounded-3xl text-4xl animate-[glowPulse_2s_ease-in-out_infinite]">
          🎊
        </div>
        <h4 className="font-bold text-lg sm:text-xl">Account Created!</h4>
        <p className="text-xs sm:text-sm">
          Welcome to Soko, <span className="font-semibold">Ntale</span>
        </p>
        <p className="text-xs sm:text-sm text-muted-foreground">
          We've sent a verification email to{" "}
          <span className="font-semibold text-foreground">swamaduntale98@gmail.com</span>
        </p>
      </div>

      <div className="flex flex-col items-center gap-4 w-full">
        <OnboardingChecklist />
        <Button className="w-full h-11" onClick={() => navigate({ to: "/marketplace" })}>
          Go to Marketplace
        </Button>
        <Button className="w-full h-11" variant="ghost">
          Resend verification email
        </Button>
      </div>
    </div>
  );
}
