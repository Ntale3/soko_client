import { AlignLeft, Heading2, ImageIcon, Plus, Quote } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EditorSection } from "@/store/write-blog-store";

interface AddSectionBarProps {
  onAdd: (type: EditorSection["type"]) => void;
}

const SECTION_TYPES: {
  type: EditorSection["type"];
  label: string;
  icon: React.ReactNode;
}[] = [
  { type: "paragraph", label: "Paragraph", icon: <AlignLeft size={13} /> },
  { type: "heading", label: "Heading", icon: <Heading2 size={13} /> },
  { type: "quote", label: "Quote", icon: <Quote size={13} /> },
  { type: "image", label: "Image", icon: <ImageIcon size={13} /> },
];

export function AddSectionBar({ onAdd }: AddSectionBarProps) {
  return (
    <div className="flex items-center gap-2 py-1">
      <div className="flex-1 h-px bg-border/50" />
      <div className="flex items-center gap-1.5 bg-muted/50 border border-border/50 rounded-xl px-2 py-1.5">
        <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest mr-1">
          Add
        </span>
        {SECTION_TYPES.map(({ type, label, icon }) => (
          <Button
            key={type}
            variant="ghost"
            size="sm"
            onClick={() => onAdd(type)}
            className="h-7 rounded-lg gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground px-2.5"
          >
            {icon}
            <span className="hidden sm:inline">{label}</span>
          </Button>
        ))}
      </div>
      <div className="flex-1 h-px bg-border/50" />
    </div>
  );
}
