import { CheckCircle2, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

interface PublishChecklistProps {
  title: string;
  excerpt: string;
  category: string;
  hasCoverImage: boolean;
  hasSections: boolean;
}

export function PublishChecklist({
  title,
  excerpt,
  category,
  hasCoverImage,
  hasSections,
}: PublishChecklistProps) {
  const items = [
    { label: "Title (min 5 chars)", done: title.trim().length > 5 },
    { label: "Excerpt", done: excerpt.trim().length > 10 },
    { label: "Category selected", done: category !== "" },
    { label: "Cover image", done: hasCoverImage },
    { label: "At least one section", done: hasSections },
  ];

  const doneCount = items.filter((i) => i.done).length;
  const allDone = doneCount === items.length;

  return (
    <div className="bg-card border border-border/60 rounded-2xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
          Publish Checklist
        </p>
        <span
          className={cn(
            "text-[10px] font-bold rounded-full px-2 py-0.5",
            allDone ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
          )}
        >
          {doneCount}/{items.length}
        </span>
      </div>
      <div className="space-y-2">
        {items.map(({ label, done }) => (
          <div key={label} className="flex items-center gap-2">
            {done ? (
              <CheckCircle2 size={14} className="text-primary shrink-0" />
            ) : (
              <Circle size={14} className="text-muted-foreground/40 shrink-0" />
            )}
            <span className={cn("text-xs", done ? "text-foreground" : "text-muted-foreground")}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
