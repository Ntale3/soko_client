import { CheckCircle2, Clock, Loader2, Save, Send } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WriteHeaderProps {
  isReadyToPublish: boolean;
  isSavingDraft: boolean;
  isPublishing: boolean;
  lastSaved: string | null;
  publishError: string | null;
  onSaveDraft: () => void;
  onPublish: () => void;
}

function formatLastSaved(iso: string | null): string | null {
  if (!iso) return null;
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60) return "Saved just now";
  if (diff < 3600) return `Saved ${Math.floor(diff / 60)}m ago`;
  return `Saved ${Math.floor(diff / 3600)}h ago`;
}

export function WriteHeader({
  isReadyToPublish,
  isSavingDraft,
  isPublishing,
  lastSaved,
  publishError,
  onSaveDraft,
  onPublish,
}: WriteHeaderProps) {
  const savedLabel = formatLastSaved(lastSaved);

  return (
    <div className="flex items-start justify-between gap-4 flex-wrap">
      {/* Left: title + meta */}
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground font-serif">Write Article</h1>
        <p className="text-muted-foreground text-sm">
          Share your farming knowledge with the community
        </p>
        {/* Last saved indicator */}
        {savedLabel && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <CheckCircle2 size={11} className="text-primary" />
            {savedLabel}
          </div>
        )}
        {/* Publish error */}
        {publishError && <p className="text-xs text-destructive">{publishError}</p>}
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onSaveDraft}
          disabled={isSavingDraft || isPublishing}
          className="rounded-xl gap-1.5 h-9 font-medium"
        >
          {isSavingDraft ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
          {isSavingDraft ? "Saving…" : "Save Draft"}
        </Button>

        <Button
          size="sm"
          onClick={onPublish}
          disabled={!isReadyToPublish || isPublishing}
          className={cn(
            "rounded-xl gap-1.5 h-9 font-semibold transition-all",
            isReadyToPublish
              ? "shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
              : "opacity-60"
          )}
        >
          {isPublishing ? <Loader2 size={13} className="animate-spin" /> : <Send size={13} />}
          {isPublishing ? "Publishing…" : "Publish"}
        </Button>
      </div>
    </div>
  );
}
