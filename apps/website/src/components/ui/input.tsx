import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-[var(--cyber-radius-sm)] border border-[hsl(var(--cyber-border-subtle))] bg-[hsl(var(--cyber-bg-input))] px-3 py-2 text-sm text-[hsl(var(--cyber-text-primary))] ring-offset-[hsl(var(--cyber-ring-offset))] file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-[hsl(var(--cyber-text-placeholder))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--cyber-ring))] focus-visible:ring-offset-2 focus-visible:border-[hsl(var(--cyber-border-accent-hover))] disabled:cursor-not-allowed disabled:opacity-50 transition-all backdrop-blur-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
