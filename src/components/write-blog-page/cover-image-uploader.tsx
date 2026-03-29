import { ImageIcon, LinkIcon, Upload, X } from "lucide-react";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface CoverImageUploaderProps {
  previewUrl: string;
  onFileChange: (file: File, previewUrl: string) => void;
  onRemove: () => void;
}

export function CoverImageUploader({
  previewUrl,
  onFileChange,
  onRemove,
}: CoverImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState("");

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const preview = URL.createObjectURL(file); // local preview only
    onFileChange(file, preview);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = ""; // reset so same file can be re-picked
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  // ── Has image preview ──────────────────────────────────────────────────────
  if (previewUrl) {
    return (
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground flex items-center gap-1.5">
          <ImageIcon size={11} /> Cover Image
        </Label>

        <div className="relative h-44 rounded-xl overflow-hidden border border-border/40 group">
          <img src={previewUrl} alt="Cover preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-200" />

          {/* Hover actions */}
          <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button
              type="button"
              size="sm"
              variant="secondary"
              className="rounded-xl h-8 gap-1.5 text-xs"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload size={12} /> Replace
            </Button>
            <Button
              type="button"
              size="sm"
              variant="destructive"
              className="rounded-xl h-8 gap-1.5 text-xs"
              onClick={onRemove}
            >
              <X size={12} /> Remove
            </Button>
          </div>

          <span className="absolute bottom-2 left-3 text-white text-[10px] font-medium opacity-80">
            Cover image · sent with publish
          </span>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileInput}
        />
      </div>
    );
  }

  // ── No image yet ───────────────────────────────────────────────────────────
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground flex items-center gap-1.5">
        <ImageIcon size={11} /> Cover Image
      </Label>

      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "flex flex-col items-center justify-center gap-2 h-36 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-150",
          dragOver
            ? "border-primary bg-primary/5 scale-[1.01]"
            : "border-border/50 bg-muted/30 hover:border-primary/40 hover:bg-muted/50"
        )}
      >
        <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Upload size={18} className="text-primary" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">
            Drop image here or{" "}
            <span className="text-primary underline underline-offset-2">browse</span>
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">JPG, PNG, WEBP — sent with publish</p>
        </div>
      </div>

      {/* URL fallback */}
      {showUrlInput ? (
        <div className="flex gap-2">
          <Input
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://images.unsplash.com/…"
            className="rounded-xl h-9 text-sm bg-muted/50 border-border/50 flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter" && urlInput.trim()) {
                // For a plain URL we create a dummy File-less preview
                // The store treats a non-File coverImage as a URL string fallback
                onFileChange(new File([], "url"), urlInput.trim());
                setUrlInput("");
                setShowUrlInput(false);
              }
            }}
            autoFocus
          />
          <Button
            type="button"
            size="sm"
            className="rounded-xl h-9 px-3"
            onClick={() => {
              if (urlInput.trim()) {
                onFileChange(new File([], "url"), urlInput.trim());
                setUrlInput("");
                setShowUrlInput(false);
              }
            }}
            disabled={!urlInput.trim()}
          >
            Use URL
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="rounded-xl h-9 px-2"
            onClick={() => setShowUrlInput(false)}
          >
            <X size={13} />
          </Button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowUrlInput(true)}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          <LinkIcon size={11} />
          Or paste an image URL instead
        </button>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileInput}
      />
    </div>
  );
}
