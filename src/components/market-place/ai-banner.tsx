import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "@tanstack/react-router"

export const AIBanner = () => {
  const navigate = useNavigate()

  return (
    <div className="mb-4 flex items-center gap-3 rounded-2xl bg-linear-to-br from-primary via-muted-600 to-card p-3.5">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/20">
        <Sparkles className="size-5 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-white">AI Picks for You</p>
        <p className="text-[11px] text-white/70">
          Based on your purchase history
        </p>
      </div>
      <Button
      variant={"outline"}
        size="sm"
        className="shrink-0 font-bold text-xs h-8"
        // onClick={() => navigate({ to: "/ai" })}
      >
        View
      </Button>
    </div>
  )
}