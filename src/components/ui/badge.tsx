import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { ComponentProps, ReactNode, useState } from "react";

import { cn } from "@/lib/utils";

// ── Variants — unchanged + new category variant
const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "bg-destructive text-white focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40 [a&]:hover:bg-destructive/90",
        outline:
          "border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        ghost: "[a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        link: "text-primary underline-offset-4 [a&]:hover:underline",
        category:
          "border-border bg-background text-muted-foreground cursor-pointer px-3 py-1.5 text-sm hover:border-primary hover:text-primary hover:bg-primary/5 data-[active=true]:border-primary data-[active=true]:bg-primary/10 data-[active=true]:text-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// ── Image slot
const BadgeImage = ({ src, alt }: { src: string; alt: string }) => (
  <span className="flex size-4 shrink-0 items-center justify-center overflow-hidden rounded-full">
    {src.startsWith("http") || src.startsWith("/") ? (
      <img src={src} alt={alt} className="size-full object-cover" />
    ) : (
      <span className="text-xs leading-none">{src}</span>
    )}
  </span>
);

//── Props
export interface BadgeProps extends ComponentProps<"span">, VariantProps<typeof badgeVariants> {
  asChild?: boolean;
  image?: string;
  active?: boolean;
  onBadgeSelect?: (label: string) => void;
}

//── Badge
function Badge({
  className,
  variant = "default",
  asChild = false,
  image,
  active = false,
  onBadgeSelect,
  children,
  onClick,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot.Root : "span";

  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    onClick?.(e);
    if (onBadgeSelect && typeof children === "string") {
      onBadgeSelect(children); // ← renamed
    }
  };

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      data-active={active}
      className={cn(badgeVariants({ variant }), className)}
      onClick={handleClick}
      {...props}
    >
      {image && <BadgeImage src={image} alt={String(children)} />}
      {children}
    </Comp>
  );
}

// ── CategoryBadgeGroup
export interface CategoryItem {
  label: string;
  image?: string;
}

interface CategoryBadgeGroupProps {
  items: CategoryItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  multiple?: boolean;
  className?: string;
}

function CategoryBadgeGroup({
  items,
  value,
  defaultValue,
  onChange,
  multiple = false,
  className,
}: CategoryBadgeGroupProps) {
  const [internal, setInternal] = useState<string[]>(defaultValue ? [defaultValue] : []);

  const selected = value !== undefined ? [value] : internal;

  const handleSelect = (label: string) => {
    if (multiple) {
      const next = selected.includes(label)
        ? selected.filter((s) => s !== label)
        : [...selected, label];
      setInternal(next);
      onChange?.(next.join(","));
    } else {
      const next = selected.includes(label) ? "" : label;
      setInternal(next ? [next] : []);
      onChange?.(next);
    }
  };

  return (
    <div
      className={cn(
        "flex overflow-x-auto gap-2",
        "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className
      )}
    >
      {items.map((item) => (
        <Badge
          key={item.label}
          variant="category"
          image={item.image}
          active={selected.includes(item.label)}
          onBadgeSelect={handleSelect}
          className="shrink-0"
        >
          {item.label}
        </Badge>
      ))}
    </div>
  );
}

export { Badge, badgeVariants, CategoryBadgeGroup };
