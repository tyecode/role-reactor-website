import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 hover:cursor-pointer",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:cursor-pointer",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:cursor-pointer",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:cursor-pointer",
        ghost:
          "hover:bg-accent hover:text-accent-foreground hover:cursor-pointer",
        link: "text-primary underline-offset-4 hover:underline hover:cursor-pointer",
        // Cyberpunk variants
        glitch:
          "bg-white text-zinc-950 hover:bg-zinc-200 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.4)] font-black uppercase tracking-wider overflow-hidden ring-1 ring-white/20 hover:cursor-pointer",
        neon: "border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 hover:shadow-[0_0_15px_-4px_rgba(6,182,212,0.6)] hover:border-cyan-400 font-bold uppercase tracking-wider backdrop-blur-sm hover:cursor-pointer",
        "ghost-glow":
          "text-zinc-400 hover:text-white hover:bg-zinc-800/50 hover:shadow-[0_0_15px_-5px_rgba(255,255,255,0.2)] hover:cursor-pointer",
        "destructive-glitch":
          "text-red-400 hover:text-red-300 hover:bg-red-950/30 hover:shadow-[0_0_15px_-5px_rgba(239,68,68,0.3)] hover:cursor-pointer font-mono tracking-wider",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
