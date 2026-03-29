import { Send } from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AuthUser } from "@/types";

interface CommentComposerProps {
  currentUser: AuthUser | null;
  isSubmitting?: boolean;
  onSubmit: (body: string) => void;
}

export function CommentComposer({ currentUser, isSubmitting, onSubmit }: CommentComposerProps) {
  const [body, setBody] = useState("");

  const handleSubmit = () => {
    if (!body.trim()) return;
    onSubmit(body);
    setBody("");
  };

  // Guest prompt
  if (!currentUser) {
    return (
      <div className="rounded-2xl border border-border bg-muted/30 px-5 py-6 text-center space-y-2">
        <p className="text-sm font-medium text-foreground">Join the conversation</p>
        <p className="text-xs text-muted-foreground">
          Log in to share your thoughts and experiences with fellow farmers.
        </p>
        <Button size="sm" className="rounded-xl mt-1">
          Log in to comment
        </Button>
      </div>
    );
  }

  return (
    <div className="flex gap-3 items-start">
      {/* User avatar */}
      <Avatar className="size-9 ring-2 ring-primary/20 shrink-0 mt-0.5">
        <AvatarFallback className="text-xs font-bold bg-primary text-primary-foreground">
          {currentUser.initials}
        </AvatarFallback>
      </Avatar>

      {/* Input area */}
      <div className="flex-1 space-y-2">
        <Textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Share your thoughts or experiences…"
          className="resize-none rounded-2xl text-sm min-h-[90px] bg-muted/50 border-border focus-visible:border-primary/50 transition-colors"
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSubmit();
          }}
        />
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-muted-foreground">⌘ + Enter to post</span>
          <Button
            size="sm"
            onClick={handleSubmit}
            disabled={!body.trim() || isSubmitting}
            className="rounded-xl gap-1.5 h-8 px-4 font-semibold"
          >
            <Send size={12} />
            {isSubmitting ? "Posting…" : "Post Comment"}
          </Button>
        </div>
      </div>
    </div>
  );
}
