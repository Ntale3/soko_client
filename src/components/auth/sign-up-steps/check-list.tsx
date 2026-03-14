import { Button } from "@/components/ui/button";
import { OnboardingChecklist } from "../OnboardingChecklist";

export function CheckList(){
  return (
  <div>

    {/* Header */}
    <div>
      <h3 className="font-bold text-3xl">You're all set! 🎉</h3>
      <p className="text-muted-foreground text-sm my-2">Welcome to Soko. Start exploring the marketplace.</p>
    </div>

    <div className="animate-[fadeUp_0.7s_cubic-bezier(.16,1,.3,1)_both]">
      {/* Celebration icon */}
      <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-3xl  text-4xl animate-[glowPulse_2s_ease-in-out_infinite]">

      </div>
      <div className="flex items-center justify-center flex-col mb-4 gap-3">
        <h4 className="font-bold text-xl">Account Created!</h4>
        <p className="text-xs md:text-sm">Welcome to Soko, <span className="font-semibold">{"Ntale"}</span></p>
        <p className="text-xs md:text-sm">We've sent a verification email to <span className="font-semibold">swamaduntale98@gmail.com</span></p>
      </div>
    </div>

    <div className="flex flex-col gap-4 justify-center items-center">
      <OnboardingChecklist/>
      <Button className="w-100 h-11">
        Go to Marketplace
      </Button>

       <Button className="w-100 h-11" variant={"ghost"}>
        Resend verification email
      </Button>
    </div>


  </div>)
}