import { Package, Paperclip, Send } from "lucide-react";
import { type KeyboardEvent, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useMessagesStore } from "@/store/useMessagesStore";

export function MessageInput() {
  const { sendMessage } = useMessagesStore();
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleSend() {
    if (!text.trim()) return;
    sendMessage(text);
    setText("");
    textareaRef.current?.focus();
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <TooltipProvider>
      <div className="px-4 py-3 border-t border-border bg-background">
        <div className="flex items-end gap-2">
          <div className="flex gap-1 shrink-0 pb-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8 text-muted-foreground">
                  <Paperclip className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Attach image</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8 text-muted-foreground">
                  <Package className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Send trade offer</TooltipContent>
            </Tooltip>
          </div>

          <Textarea
            ref={textareaRef}
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            className="min-h-10 max-h-30 resize-none flex-1 bg-muted border-0 rounded-2xl py-2.5 px-4 text-sm"
          />

          <Button
            size="icon"
            className="shrink-0 size-10 rounded-full mb-0.5"
            disabled={!text.trim()}
            onClick={handleSend}
          >
            <Send className="size-4" />
          </Button>
        </div>
        <p className="text-[10px] text-muted-foreground text-center mt-2">
          Press Enter to send · Shift+Enter for new line
        </p>
      </div>
    </TooltipProvider>
  );
}
