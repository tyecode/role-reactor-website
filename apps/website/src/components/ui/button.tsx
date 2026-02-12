import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-bold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-95",
  {
    variants: {
      variant: {
        default:
          "bg-white text-black hover:bg-cyan-50 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.6)] font-black uppercase tracking-wider border-t border-l border-white/50 relative overflow-hidden group/btn",
        destructive:
          "bg-red-500/10 text-red-500 border border-red-500/50 hover:bg-red-500/20 hover:text-red-400 hover:shadow-[0_0_20px_-5px_rgba(239,68,68,0.5)] font-bold uppercase tracking-wider backdrop-blur-sm",
        outline:
          "border border-white/20 bg-black/40 text-zinc-300 hover:bg-white/10 hover:text-white hover:border-cyan-500/50 hover:shadow-[0_0_15px_-5px_rgba(6,182,212,0.3)] uppercase tracking-widest font-bold backdrop-blur-sm",
        secondary:
          "bg-zinc-900 text-zinc-300 border border-white/10 hover:border-white/30 hover:text-white hover:bg-zinc-800 font-bold uppercase tracking-wider",
        ghost:
          "text-zinc-500 hover:text-white hover:bg-white/5 uppercase tracking-widest font-bold",
        link: "text-cyan-400 underline-offset-4 hover:underline hover:text-cyan-300 hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.5)] uppercase tracking-widest font-black",
        // Specialized Cyberpunk variants
        glitch:
          "bg-white text-black hover:bg-cyan-50 font-black uppercase tracking-wider ring-1 ring-white/50 hover-glitch shadow-[0_0_15px_-5px_rgba(6,182,212,0.5)]",
        neon: "border border-cyan-500 text-cyan-500 hover:bg-cyan-500/10 hover:shadow-[0_0_20px_-5px_rgba(6,182,212,0.6)] font-bold uppercase tracking-wider backdrop-blur-sm hover:text-cyan-400",
        "ghost-glow":
          "text-zinc-400 hover:text-white hover:bg-zinc-800/50 hover:shadow-[0_0_15px_-5px_rgba(255,255,255,0.2)]",
        "destructive-glitch":
          "text-red-500 hover:text-red-400 hover:bg-red-950/30 hover:shadow-[0_0_15px_-5px_rgba(239,68,68,0.4)] font-mono tracking-wider hover-glitch border border-red-900/0 hover:border-red-500/30",
        cyber:
          "bg-cyan-500 text-black font-black uppercase tracking-widest hover:bg-cyan-400 hover:shadow-[0_0_25px_-5px_rgba(6,182,212,0.6)] clip-path-chamfer",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-lg px-8",
        icon: "h-10 w-10 rounded-lg",
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

    // Automatically set data-text for glitch effects if children is a string
    const dataText =
      typeof props.children === "string" ? props.children : undefined;

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        data-text={dataText}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
