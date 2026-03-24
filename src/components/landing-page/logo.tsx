import { Icon } from "@/components/landing-page/icon";
import { cn } from "@/lib/utils";

interface LogoProps {
  dark?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  LogoStyle?: string;
}

const SIZE = {
  sm: { icon: 30, text: "text-[18px]" },
  md: { icon: 38, text: "text-[22px]" },
  lg: { icon: 48, text: "text-[28px]" },
};

export function Logo({ dark = false, size = "md", className, LogoStyle }: LogoProps) {
  const { icon, text } = SIZE[size];
  return (
    <div className={cn("flex items-center gap-2.5 cursor-pointer select-none", className)}>
      <div
        className="flex items-center justify-center shrink-0"
        style={{
          width: icon,
          height: icon,
          borderRadius: icon * 0.28,
          background: "linear-gradient(135deg, var(--shamba-emerald), #00A05A)",
          boxShadow: dark
            ? "0 4px 16px color-mix(in oklch, var(--shamba-emerald) 50%, transparent)"
            : "none",
        }}
      >
        <Icon name="leaf" size={icon * 0.52} color="var(--shamba-forest)" strokeWidth={2.2} />
      </div>
      <span
        className={cn(
          "font-display font-bold tracking-tight leading-none text-white",
          LogoStyle,
          text
        )}
      >
        Soko<span style={{ color: "var(--shamba-emerald)" }}>.</span>
      </span>
    </div>
  );
}
