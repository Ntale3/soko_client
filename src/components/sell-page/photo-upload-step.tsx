import { ArrowRight, Camera, GripVertical, Trash2, Upload, X } from "lucide-react";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSellStore } from "@/store/sell-store";

interface PhotoUploadStepProps {
  onNext: () => void;
  onBack: () => void;
}

export function PhotoUploadStep({ onNext, onBack }: PhotoUploadStepProps) {
  const { draft, addPhotos, removePhoto, reorderPhoto, isStepValid } = useSellStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [draggingIdx, setDraggingIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);
  const valid = isStepValid("photos");
  const MAX = 8;

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const images = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (images.length) addPhotos(images);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  // Drag-to-reorder handlers
  const handleDragStart = (i: number) => setDraggingIdx(i);
  const handleDragOverThumb = (i: number) => setDragOverIdx(i);
  const handleDropThumb = (i: number) => {
    if (draggingIdx !== null && draggingIdx !== i) reorderPhoto(draggingIdx, i);
    setDraggingIdx(null);
    setDragOverIdx(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground font-serif">Product Photos</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Add up to {MAX} photos. The first photo is the cover image buyers see first.
        </p>
      </div>

      {/* Drop zone */}
      {draft.photoFiles.length < MAX && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-150 py-10 px-6",
            dragOver
              ? "border-primary bg-primary/5 scale-[1.01]"
              : "border-border/50 bg-muted/20 hover:border-primary/40 hover:bg-muted/40"
          )}
        >
          <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Camera size={26} className="text-primary" />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-foreground">
              Drop photos here or{" "}
              <span className="text-primary underline underline-offset-2">browse</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              JPG, PNG, WEBP · Max {MAX} photos · Sent with listing
            </p>
          </div>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="rounded-xl gap-1.5 pointer-events-none"
          >
            <Upload size={13} /> Upload Photos
          </Button>
        </div>
      )}

      {/* Photo grid */}
      {draft.photoPreviews.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              {draft.photoPreviews.length}/{MAX} photos · drag to reorder
            </p>
            <span className="text-[10px] text-primary font-medium">First photo = cover image</span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
            {draft.photoPreviews.map((src, i) => (
              <div
                key={src}
                draggable
                onDragStart={() => handleDragStart(i)}
                onDragOver={(e) => {
                  e.preventDefault();
                  handleDragOverThumb(i);
                }}
                onDrop={() => handleDropThumb(i)}
                onDragEnd={() => {
                  setDraggingIdx(null);
                  setDragOverIdx(null);
                }}
                className={cn(
                  "relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-150 group cursor-grab active:cursor-grabbing",
                  i === 0
                    ? "border-primary shadow-sm"
                    : dragOverIdx === i
                      ? "border-primary/50 scale-[1.02]"
                      : "border-border/40 hover:border-border"
                )}
              >
                <img src={src} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />

                {/* Cover badge */}
                {i === 0 && (
                  <div className="absolute bottom-0 inset-x-0 bg-primary/80 backdrop-blur-sm text-primary-foreground text-[9px] font-bold text-center py-1 uppercase tracking-widest">
                    Cover
                  </div>
                )}

                {/* Drag handle */}
                <div className="absolute top-1.5 left-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-black/40 backdrop-blur-sm rounded-md p-0.5">
                    <GripVertical size={12} className="text-white" />
                  </div>
                </div>

                {/* Remove button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removePhoto(i);
                  }}
                  className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 backdrop-blur-sm rounded-full p-1 text-white hover:bg-destructive"
                >
                  <X size={11} />
                </button>
              </div>
            ))}

            {/* Add more slot */}
            {draft.photoFiles.length < MAX && draft.photoFiles.length > 0 && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square rounded-xl border-2 border-dashed border-border/50 flex flex-col items-center justify-center gap-1 hover:border-primary/40 hover:bg-muted/30 transition-colors text-muted-foreground"
              >
                <Upload size={16} />
                <span className="text-[10px]">Add more</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Tip */}
      <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl px-4 py-3">
        <p className="text-xs text-amber-700 dark:text-amber-400">
          💡 Listings with 4+ clear photos get <strong>40% more enquiries</strong>. Show different
          angles, packaging and any quality certifications.
        </p>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="rounded-xl h-11 px-6">
          ← Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!valid}
          className="flex-1 h-11 font-semibold rounded-xl gap-2"
        >
          Review & Publish <ArrowRight size={15} />
        </Button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
