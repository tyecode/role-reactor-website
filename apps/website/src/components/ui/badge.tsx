import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        // Cyberpunk variants
        accent:
          "border-[hsl(var(--cyber-border-accent))] bg-[hsl(var(--cyber-accent))]/10 text-[hsl(var(--cyber-accent))] shadow-[var(--cyber-glow-sm)] hover:bg-[hsl(var(--cyber-accent))]/20",
        premium:
          "border-[hsl(var(--cyber-premium))]/20 bg-[hsl(var(--cyber-premium))]/10 text-[hsl(var(--cyber-premium))] shadow-[0_0_8px_rgb(234_179_8_/_0.3)] hover:bg-[hsl(var(--cyber-premium))]/20",
        pro: "border-[hsl(var(--cyber-pro))]/20 bg-[hsl(var(--cyber-pro))]/10 text-[hsl(var(--cyber-pro))] shadow-[var(--cyber-glow-sm)] hover:bg-[hsl(var(--cyber-pro))]/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
