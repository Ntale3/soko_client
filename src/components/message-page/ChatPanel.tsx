import { MessageSquareDashed } from "lucide-react";
import { useEffect, useRef } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useMessagesStore } from "@/store/useMessagesStore";

import { ChatHeader } from "./ChatHeader";
import { MessageBubble } from "./MessageBubble";
import { MessageInput } from "./MessageInput";

export function ChatPanel() {
  const { activeConversationId, messages } = useMessagesStore();
  const bottomRef = useRef<HTMLDivElement>(null);
  const activeMessages = activeConversationId ? (messages[activeConversationId] ?? []) : [];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeMessages.length]);

  if (!activeConversationId) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center p-8 bg-muted/20">
        <div className="size-16 rounded-2xl bg-muted flex items-center justify-center">
          <MessageSquareDashed className="size-8 text-muted-foreground" />
        </div>
        <div>
          <p className="font-semibold text-base">No conversation selected</p>
          <p className="text-sm text-muted-foreground mt-1">
            Choose a conversation from the list to start messaging
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <ChatHeader />
      <ScrollArea className="flex-1 px-4 py-4">
        <div className="flex flex-col gap-2">
          {activeMessages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>
      {/* Keep input above bottom nav on mobile — add pb-16 if your bottom nav is fixed */}
      <div className="pb-safe">
        <MessageInput />
      </div>
    </div>
  );
}
