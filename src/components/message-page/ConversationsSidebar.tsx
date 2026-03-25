import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMessagesStore } from "@/store/useMessagesStore";

import { ConversationItem } from "./ConversationItem";

export function ConversationsSidebar() {
  const { conversations, searchQuery, setSearchQuery } = useMessagesStore();

  const filtered = conversations.filter(
    (c) =>
      c.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.product?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full border-r border-border bg-background">
      {/* Header */}
      <div className="px-4 pt-5 pb-3 border-b border-border">
        <h2 className="text-lg font-bold mb-3">Messages</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            className="pl-9 h-9 bg-muted border-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* List */}
      <ScrollArea className="flex-1">
        <div className="p-2 flex flex-col gap-0.5">
          {filtered.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No conversations found</p>
          ) : (
            filtered.map((c) => <ConversationItem key={c.id} conversation={c} />)
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
