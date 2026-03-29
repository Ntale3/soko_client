import { Input } from "@base-ui/react";
import { createFileRoute } from "@tanstack/react-router";

import { Separator } from "@/components/ui/separator";
import { AddSectionBar } from "@/components/write-blog-page/add-section-bar";
import { PostMeta } from "@/components/write-blog-page/post-meta";
import { PublishChecklist } from "@/components/write-blog-page/publish-checklist";
import { SectionEditor } from "@/components/write-blog-page/section-editor";
import { WriteHeader } from "@/components/write-blog-page/write-header";
import { usePublishPost, useSaveDraft } from "@/hooks/use-publish-post";
import { useWriteBlogStore } from "@/store/write-blog-store";

export const Route = createFileRoute("/(app)/blog/write")({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    draft,
    activeSectionIndex,
    isSavingDraft,
    lastSaved,
    setTitle,
    setExcerpt,
    setCategory,
    setTags,
    setCoverImage,
    removeCoverImage,
    addSection,
    updateSection,
    removeSection,
    moveSectionUp,
    moveSectionDown,
    setActiveSectionIndex,
    saveDraft,
    isReadyToPublish,
  } = useWriteBlogStore();

  const publishMutation = usePublishPost();
  const saveDraftMutation = useSaveDraft();

  const hasSections = draft.sections.some((s) => s.content.trim().length > 0);

  return (
    <div className="min-h-screen bg-background pt-4 pb-24 md:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* ── Page header ───────────────────────────────────────────── */}
        <WriteHeader
          isReadyToPublish={isReadyToPublish()}
          isSavingDraft={isSavingDraft || saveDraftMutation.isPending}
          isPublishing={publishMutation.isPending}
          lastSaved={lastSaved}
          publishError={publishMutation.isError ? (publishMutation.error as Error).message : null}
          onSaveDraft={() => saveDraftMutation.mutate()}
          onPublish={() => publishMutation.mutate()}
        />

        <Separator />

        {/*
          Mobile  → single column, full width
          lg+     → two-column: editor (flex-1) | sidebar (w-72, sticky)

          The sidebar sticks at top-[calc(4rem+1rem)] = navbar height (64px)
          + a little breathing room so it never hides under the navbar.
        */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* ── Main editor ─────────────────────────────────────────── */}
          <div className="w-full lg:flex-1 min-w-0 space-y-4">
            {/* Title input */}
            <div className="bg-card border border-border/60 rounded-2xl px-4 sm:px-5 py-4">
              <Input
                value={draft.title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Article title…"
                className="border-none shadow-none bg-transparent text-xl sm:text-2xl md:text-3xl font-bold font-serif focus-visible:ring-0 h-auto px-0 py-1 placeholder:text-muted-foreground/40"
              />
            </div>

            {/* Article meta */}
            <PostMeta
              category={draft.category}
              coverPreviewUrl={draft.coverPreviewUrl}
              tags={draft.tags}
              excerpt={draft.excerpt}
              onCategoryChange={setCategory}
              onCoverImageChange={setCoverImage}
              onCoverImageRemove={removeCoverImage}
              onTagsChange={setTags}
              onExcerptChange={setExcerpt}
            />

            {/* Sections header */}
            <div className="flex items-center gap-2 px-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                Article Body
              </p>
              <div className="flex-1 h-px bg-border/40" />
              <span className="text-[10px] text-muted-foreground">
                {draft.sections.length} section{draft.sections.length !== 1 ? "s" : ""}
              </span>
            </div>

            {/* Section list */}
            <div className="space-y-3">
              {draft.sections.map((section, i) => (
                <SectionEditor
                  key={i}
                  section={section}
                  index={i}
                  isActive={activeSectionIndex === i}
                  isFirst={i === 0}
                  isLast={i === draft.sections.length - 1}
                  onUpdate={(partial) => updateSection(i, partial)}
                  onRemove={() => removeSection(i)}
                  onMoveUp={() => moveSectionUp(i)}
                  onMoveDown={() => moveSectionDown(i)}
                  onFocus={() => setActiveSectionIndex(i)}
                />
              ))}
            </div>

            <AddSectionBar onAdd={addSection} />

            {/*
              Mobile-only publish checklist — sits at the bottom of the
              editor flow so it doesn't take up precious screen width
            */}
            <div className="lg:hidden">
              <PublishChecklist
                title={draft.title}
                excerpt={draft.excerpt}
                category={draft.category}
                hasCoverImage={!!draft.coverPreviewUrl}
                hasSections={hasSections}
              />
            </div>
          </div>

          {/* ── Sidebar (desktop only) ───────────────────────────────── */}
          <div className="hidden lg:flex flex-col gap-4 w-72 shrink-0 sticky top-[5rem]">
            <PublishChecklist
              title={draft.title}
              excerpt={draft.excerpt}
              category={draft.category}
              hasCoverImage={!!draft.coverPreviewUrl}
              hasSections={hasSections}
            />

            {/* Writing tips */}
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 space-y-2">
              <p className="text-xs font-semibold text-primary uppercase tracking-widest">
                Writing Tips
              </p>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                {[
                  "Start with a clear, specific title",
                  "Add a concise excerpt — it shows on the blog list",
                  "Use headings to break up long content",
                  "Quotes from real farmers add credibility",
                  "Images keep readers engaged",
                ].map((tip) => (
                  <li key={tip} className="flex items-start gap-1.5">
                    <span className="text-primary mt-0.5">·</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
