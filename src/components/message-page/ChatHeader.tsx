import { ArrowLeft, MoreVertical, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MOCK_CONVERSATIONS } from "@/constants/mock-messages-api";
import { useMessagesStore } from "@/store/useMessagesStore";

import { ConversationAvatar } from "./ConversationAvatar";

export function ChatHeader() {
  const { activeConversationId, closeMobileConversation } = useMessagesStore();
  const conversation = MOCK_CONVERSATIONS.find((c) => c.id === activeConversationId);
  if (!conversation) return null;

  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-background">
      {/* Back button — mobile only */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden shrink-0 -ml-1"
        onClick={closeMobileConversation}
      >
        <ArrowLeft className="size-5" />
      </Button>

      <ConversationAvatar user={conversation.participant} showOnline size="md" />

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm truncate">{conversation.participant.name}</p>
        <p className="text-xs text-muted-foreground">
          {conversation.participant.online ? (
            <span className="text-emerald-500 font-medium">Online</span>
          ) : (
            "Offline"
          )}{" "}
          · {conversation.participant.location}
        </p>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        <Button variant="ghost" size="icon" className="size-9">
          <Phone className="size-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-9">
              <MoreVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View profile</DropdownMenuItem>
            <DropdownMenuItem>View listings</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Block user</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
