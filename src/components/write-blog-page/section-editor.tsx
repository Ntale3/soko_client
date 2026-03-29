import {
  AlignLeft,
  ChevronDown,
  ChevronUp,
  Heading2,
  ImageIcon,
  Quote,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { EditorSection } from "@/store/write-blog-store";

interface SectionEditorProps {
  section: EditorSection;
  index: number;
  isActive: boolean;
  isFirst: boolean;
  isLast: boolean;
  onUpdate: (partial: Partial<EditorSection>) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onFocus: () => void;
}

const TYPE_ICONS: Record<EditorSection["type"], React.ReactNode> = {
  paragraph: <AlignLeft size={13} />,
  heading: <Heading2 size={13} />,
  quote: <Quote size={13} />,
  image: <ImageIcon size={13} />,
};

const TYPE_LABELS: Record<EditorSection["type"], string> = {
  paragraph: "Paragraph",
  heading: "Heading",
  quote: "Quote",
  image: "Image",
};

export function SectionEditor({
  section,
  index,
  isActive,
  isFirst,
  isLast,
  onUpdate,
  onRemove,
  onMoveUp,
  onMoveDown,
  onFocus,
}: SectionEditorProps) {
  return (
    <div
      onClick={onFocus}
      className={cn(
        "group relative rounded-2xl border transition-all duration-150",
        isActive
          ? "border-primary/40 bg-primary/[0.02] shadow-sm"
          : "border-border/50 bg-card hover:border-border"
      )}
    >
      {/* ── Toolbar ── */}
      <div
        className={cn(
          "flex items-center gap-1.5 px-3 pt-3 pb-2",
          "transition-opacity duration-150",
          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )}
      >
        {/* Type switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-7 rounded-lg gap-1.5 text-xs font-medium border-border/60 px-2.5"
            >
              {TYPE_ICONS[section.type]}
              {TYPE_LABELS[section.type]}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-36">
            {(["paragraph", "heading", "quote", "image"] as EditorSection["type"][]).map((t) => (
              <DropdownMenuItem
                key={t}
                onClick={() => onUpdate({ type: t } as Partial<EditorSection>)}
                className="gap-2 text-sm"
              >
                {TYPE_ICONS[t]}
                {TYPE_LABELS[t]}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Move up */}
        <Button
          variant="ghost"
          size="icon"
          className="size-7 rounded-lg"
          onClick={(e) => {
            e.stopPropagation();
            onMoveUp();
          }}
          disabled={isFirst}
        >
          <ChevronUp size={13} />
        </Button>

        {/* Move down */}
        <Button
          variant="ghost"
          size="icon"
          className="size-7 rounded-lg"
          onClick={(e) => {
            e.stopPropagation();
            onMoveDown();
          }}
          disabled={isLast}
        >
          <ChevronDown size={13} />
        </Button>

        {/* Delete */}
        <Button
          variant="ghost"
          size="icon"
          className="size-7 rounded-lg text-muted-foreground hover:text-destructive"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          <Trash2 size={13} />
        </Button>
      </div>

      {/* ── Content inputs ── */}
      <div className="px-3 pb-3">
        {section.type === "paragraph" && (
          <Textarea
            value={section.content}
            onChange={(e) => onUpdate({ content: e.target.value })}
            placeholder="Write your paragraph here…"
            className="resize-none border-none shadow-none bg-transparent text-sm leading-relaxed focus-visible:ring-0 min-h-[100px] p-0"
          />
        )}

        {section.type === "heading" && (
          <Input
            value={section.content}
            onChange={(e) => onUpdate({ content: e.target.value })}
            placeholder="Section heading…"
            className="border-none shadow-none bg-transparent text-lg font-bold font-serif focus-visible:ring-0 h-auto py-1 px-0"
          />
        )}

        {section.type === "quote" && (
          <div className="pl-4 border-l-4 border-primary space-y-2">
            <Textarea
              value={section.content}
              onChange={(e) => onUpdate({ content: e.target.value })}
              placeholder="Quote text…"
              className="resize-none border-none shadow-none bg-transparent text-sm italic leading-relaxed focus-visible:ring-0 min-h-[72px] p-0"
            />
            <Input
              value={"attribution" in section ? section.attribution : ""}
              onChange={(e) => onUpdate({ attribution: e.target.value })}
              placeholder="— Attribution (name, title)"
              className="border-none shadow-none bg-transparent text-xs text-muted-foreground focus-visible:ring-0 h-auto py-0.5 px-0"
            />
          </div>
        )}

        {section.type === "image" && (
          <div className="space-y-2">
            <Input
              value={section.content}
              onChange={(e) => onUpdate({ content: e.target.value })}
              placeholder="Image URL (https://…)"
              className="rounded-xl h-9 text-sm bg-muted/50 border-border/50"
            />
            {section.content && (
              <div className="relative h-48 rounded-xl overflow-hidden border border-border/40">
                <img src={section.content} alt="preview" className="w-full h-full object-cover" />
              </div>
            )}
            <Input
              value={"caption" in section ? section.caption : ""}
              onChange={(e) => onUpdate({ caption: e.target.value })}
              placeholder="Caption (optional)"
              className="border-none shadow-none bg-transparent text-xs text-muted-foreground focus-visible:ring-0 h-auto py-0.5 px-0 italic"
            />
          </div>
        )}
      </div>
    </div>
  );
}
