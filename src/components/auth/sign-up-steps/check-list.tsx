import { Button } from "@/components/ui/button";
import { OnboardingChecklist } from "../OnboardingChecklist";
import { useNavigate } from "@tanstack/react-router";

export function CheckList() {
    const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 sm:py-12">
      <div className="w-full max-w-md mx-auto flex flex-col gap-6">

        {/* Header */}
        <div className="text-center">
          <h3 className="font-bold text-2xl sm:text-3xl">You're all set! 🎉</h3>
          <p className="text-muted-foreground text-sm mt-2">
            Welcome to Soko. Start exploring the marketplace.
          </p>
        </div>

        {/* Account created card */}
        <div className="animate-[fadeUp_0.7s_cubic-bezier(.16,1,.3,1)_both] flex flex-col items-center text-center gap-3 rounded-xl p-6">
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

        {/* Checklist + actions */}
        <div className="flex flex-col items-center gap-4 w-full">
          <div className="w-full flex justify-center">
            <OnboardingChecklist />
          </div>

          <Button className="w-full h-11"
          onClick={()=>{navigate({to:'/marketplace'})}}
          >
            Go to Marketplace
          </Button>

          <Button className="w-full h-11" variant="ghost">
            Resend verification email
          </Button>
        </div>

      </div>
    </div>
  );
}