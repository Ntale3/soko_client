import { Eye, EyeOff } from "lucide-react";
import { ComponentProps, ReactNode, useState } from "react";

import { cn } from "@/lib/utils";

// {Icon container slots}

const LeftIconContainer = ({
  children,
  isFocused,
}: {
  children: ReactNode;
  isFocused: boolean;
}) => (
  <div
    className={cn(
      "flex h-full items-center justify-center border-r border-r-muted px-3 transition-colors",
      { "border-r-primary": isFocused }
    )}
  >
    <div className="flex items-center gap-2">{children}</div>
  </div>
);

const RightIconContainer = ({
  children,
  isFocused,
  onClick,
}: {
  children: ReactNode;
  isFocused: boolean;
  onClick?: () => void;
}) => (
  <div
    onClick={onClick}
    className={cn(
      "flex h-full items-center justify-center border-l border-l-muted px-3 transition-colors",
      { "border-l-primary": isFocused }
    )}
  >
    <div className="flex items-center gap-2">{children}</div>
  </div>
);

export interface InputProps extends ComponentProps<"input"> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

// Core Input
function Input({ className, type, leftIcon, rightIcon, ...props }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const isTel = type === "tel";

  // Auto left icon for tel
  const resolvedLeftIcon = isTel ? (
    <div className="flex flex-row items-center gap-1">
      <span>🇺🇬</span>
      <span className="text-sm text-muted-foreground">+256</span>
    </div>
  ) : (
    leftIcon
  );

  // Resolved input type — toggle between password and text
  const resolvedType = isPassword ? (showPassword ? "text" : "password") : type;

  // Password eye toggle icon
  const passwordIcon = (
    <button
      type="button"
      tabIndex={-1}
      onClick={() => setShowPassword((prev) => !prev)}
      className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
    </button>
  );
  // For password type, always use the eye toggle as the right icon
  // Consumer-passed rightIcon is ignored when type="password"
  const resolvedRightIcon = isPassword ? passwordIcon : rightIcon;

  //No icons -> original behaviour preserved
  if (!resolvedLeftIcon && !resolvedRightIcon) {
    return (
      <input
        type={resolvedType}
        data-slot="input"
        className={cn(
          "dark:bg-input/30 border-input focus-visible:border-ring focus-visible:ring-ring/50",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
          "aria-invalid:border-destructive dark:aria-invalid:border-destructive/50",
          "disabled:bg-input/50 dark:disabled:bg-input/80",
          "h-8 w-full min-w-0 rounded-lg border bg-transparent px-2.5 py-1",
          "text-base outline-none transition-colors md:text-sm",
          "placeholder:text-muted-foreground",
          "focus-visible:ring-3 aria-invalid:ring-3",
          "file:inline-flex file:h-6 file:border-0 file:bg-transparent",
          "file:text-sm file:font-medium file:text-foreground",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    );
  }

  //Wrapped input with Icon slots
  return (
    <div
      data-slot="input-wrapper"
      className={cn(
        "dark:bg-input/30 border-input",
        "disabled:bg-input/50 dark:disabled:bg-input/80",
        "aria-invalid:border-destructive dark:aria-invalid:border-destructive/50",
        "flex h-8 w-full min-w-0 items-center overflow-hidden rounded-lg border",
        "transition-colors",
        isFocused && "border-ring ring-3 ring-ring/50",
        "aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        className
      )}
    >
      {/* Left Icon */}
      {resolvedLeftIcon && (
        <LeftIconContainer isFocused={isFocused}>{resolvedLeftIcon}</LeftIconContainer>
      )}

      {/* Input field */}
      <input
        type={resolvedType}
        data-slot="input"
        className={cn(
          "h-full w-full min-w-0 bg-transparent px-2.5 py-1",
          "text-base outline-none md:text-sm",
          "placeholder:text-muted-foreground",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        )}
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          props.onBlur?.(e);
        }}
        {...props}
      />

      {/* Right icon */}
      {resolvedRightIcon && (
        <RightIconContainer isFocused={isFocused}>{resolvedRightIcon}</RightIconContainer>
      )}
    </div>
  );
}

export { Input };
