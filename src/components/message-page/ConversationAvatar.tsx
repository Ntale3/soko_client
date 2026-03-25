// components/messages/ConversationAvatar.tsx
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { User } from "@/constants/mock-messages-api";
import { cn } from "@/lib/utils";

const ROLE_COLORS: Record<User["role"], string> = {
  farmer: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300",
  buyer: "bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-300",
};

interface Props {
  user: User;
  showOnline?: boolean;
  size?: "sm" | "md" | "lg";
}

export function ConversationAvatar({ user, showOnline = false, size = "md" }: Props) {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const sizeClass = { sm: "size-8", md: "size-10", lg: "size-12" }[size];

  return (
    <div className="relative shrink-0">
      <Avatar className={sizeClass}>
        <AvatarFallback className={cn("text-xs font-semibold", ROLE_COLORS[user.role])}>
          {initials}
        </AvatarFallback>
      </Avatar>
      {showOnline && user.online && (
        <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-500 ring-2 ring-background" />
      )}
    </div>
  );
}
