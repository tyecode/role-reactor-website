import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-2xl border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 backdrop-blur-md",
  {
    variants: {
      variant: {
        default:
          "bg-zinc-950/40 text-foreground border-white/10 [&>svg]:text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        // Cyberpunk variants
        info: "border-cyan-500/20 bg-cyan-500/5 text-white shadow-[0_0_15px_-4px_rgba(6,182,212,0.2)] [&>svg]:text-cyan-400",
        success:
          "border-emerald-500/20 bg-emerald-500/5 text-white shadow-[0_0_15px_-4px_rgba(16,185,129,0.2)] [&>svg]:text-emerald-400",
        warning:
          "border-amber-500/20 bg-amber-500/5 text-white shadow-[0_0_15px_-4px_rgba(245,158,11,0.2)] [&>svg]:text-amber-400",
        error:
          "border-red-500/20 bg-red-500/5 text-white shadow-[0_0_15px_-4px_rgba(239,68,68,0.2)] [&>svg]:text-red-400",
        glitch:
          "border-cyan-500/20 bg-cyan-950/30 text-cyan-300 font-mono shadow-[0_0_15px_-4px_rgba(6,182,212,0.2)] [&>svg]:text-cyan-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
