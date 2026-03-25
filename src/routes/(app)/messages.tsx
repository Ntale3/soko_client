import { createFileRoute } from "@tanstack/react-router";

import { ChatPanel } from "@/components/message-page/ChatPanel";
import { ConversationsSidebar } from "@/components/message-page/ConversationsSidebar";
import { cn } from "@/lib/utils";
import { useMessagesStore } from "@/store/useMessagesStore";

export const Route = createFileRoute("/(app)/messages")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isMobileConversationOpen } = useMessagesStore();

  return (
    <div className="flex  overflow-hidden">
      {/* Sidebar — full width on mobile unless a chat is open */}
      <div
        className={cn(
          "w-full md:w-80 lg:w-96 shrink-0 flex flex-col",
          "transition-transform duration-300",
          isMobileConversationOpen
            ? "-translate-x-full absolute inset-0 md:translate-x-0 md:relative"
            : "translate-x-0"
        )}
      >
        <ConversationsSidebar />
      </div>

      {/* Chat panel — hidden on mobile until a conversation is selected */}
      <div
        className={cn(
          "flex-1 flex flex-col min-w-0",
          "transition-transform duration-300",
          isMobileConversationOpen ? "translate-x-0" : "hidden md:flex"
        )}
      >
        <ChatPanel />
      </div>
    </div>
  );
}
