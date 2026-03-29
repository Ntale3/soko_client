import { PostSection } from "@/types";

interface PostBodyProps {
  sections?: PostSection[];
}

export function PostBody({ sections }: PostBodyProps) {
  if (!sections?.length) return null;
  return (
    <article className="space-y-5 text-foreground">
      {sections.map((section, i) => {
        switch (section.type) {
          case "paragraph":
            return (
              <p key={i} className="text-base leading-[1.85] text-foreground/85">
                {section.content}
              </p>
            );

          case "heading":
            return (
              <h2 key={i} className="text-xl md:text-2xl font-bold text-foreground font-serif pt-4">
                {section.content}
              </h2>
            );

          case "quote":
            return (
              <blockquote
                key={i}
                className="relative pl-5 border-l-4 border-primary bg-primary/5 rounded-r-2xl py-4 pr-4 my-6"
              >
                <p className="text-sm md:text-base italic text-foreground/80 leading-relaxed font-medium">
                  "{section.content}"
                </p>
                {section.attribution && (
                  <footer className="mt-2 text-xs text-muted-foreground font-semibold not-italic">
                    — {section.attribution}
                  </footer>
                )}
              </blockquote>
            );

          case "image":
            return (
              <figure key={i} className="my-6 space-y-2">
                <img
                  src={section.content}
                  alt={section.caption ?? "Article image"}
                  className="w-full rounded-2xl object-cover max-h-80"
                />
                {section.caption && (
                  <figcaption className="text-xs text-muted-foreground text-center italic">
                    {section.caption}
                  </figcaption>
                )}
              </figure>
            );

          default:
            return null;
        }
      })}
    </article>
  );
}
