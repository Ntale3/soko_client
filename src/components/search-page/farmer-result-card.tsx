import { useNavigate } from "@tanstack/react-router"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { BadgeCheck, MapPin, MessageCircle, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { Farmer } from "@/types"
// import type { Farmer } from "./types"

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star
        key={s}
        className={cn(
          "size-2.5",
          s <= Math.floor(rating)
            ? "fill-amber-400 text-amber-400"
            : "fill-muted text-muted"
        )}
      />
    ))}
  </div>
)

export const FarmerResultCard = ({ farmer }: { farmer: Farmer }) => {
  const navigate = useNavigate()

  return (
    <div
      // onClick={() => navigate({ to: "/farmer-profile", search: { id: farmer.id } })}
      className="flex w-full cursor-pointer gap-3 rounded-3xl border border-border bg-background p-3.5 text-left shadow-sm transition-shadow hover:shadow-md"
    >
      {/* Avatar */}
      <div className="relative shrink-0">
        <Avatar className="size-11">
          <AvatarImage src={farmer.avatarUrl} alt={farmer.name} />
          <AvatarFallback className="bg-primary/10 text-sm font-bold text-primary">
            {farmer.avatar}
          </AvatarFallback>
        </Avatar>
        {farmer.online && (
          <span className="absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-background bg-emerald-500" />
        )}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <div className="mb-0.5 flex items-center gap-1.5">
          <p className="truncate text-[13px] font-bold text-foreground">
            {farmer.name}
          </p>
          {farmer.verified && (
            <BadgeCheck className="size-3.5 shrink-0 text-primary" />
          )}
          <Badge variant="secondary" className="text-[10px]">
            {farmer.badge}
          </Badge>
        </div>

        <div className="mb-1.5 flex items-center gap-1 text-[11px] text-muted-foreground">
          <MapPin className="size-3 shrink-0" />
          {farmer.location}
        </div>

        <div className="mb-2 flex items-center gap-2">
          <StarRating rating={farmer.rating} />
          <span className="text-[10px] text-muted-foreground">
            {farmer.reviews} reviews
          </span>
        </div>

        <div className="flex flex-wrap gap-1">
          {farmer.produce.map((p) => (
            <span
              key={p}
              className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary"
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* Right col */}
      <div className="flex shrink-0 flex-col items-end gap-2">
        <span className="text-xs font-bold text-primary">{farmer.price}</span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            // navigate({ to: "/chat" })
          }}
          className="flex items-center gap-1 rounded-xl bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary transition-colors hover:bg-primary/20"
        >
          <MessageCircle className="size-3" />
          Chat
        </button>
      </div>
    </div>
  )
}