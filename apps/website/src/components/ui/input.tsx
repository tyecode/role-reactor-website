"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex w-full border bg-zinc-900/40 text-sm text-white ring-offset-zinc-950 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all font-mono tracking-tight",
  {
    variants: {
      variant: {
        default:
          "h-10 rounded-xl border-white/10 px-3 py-2 focus-visible:ring-cyan-500/50 focus-visible:border-cyan-500/50 focus-visible:shadow-[0_0_15px_-3px_rgba(6,182,212,0.3)] hover:bg-zinc-900/60 hover:border-white/20",
        cyber:
          "bg-zinc-950/80 border-white/5 h-12 px-4 rounded-xl focus-visible:border-cyan-500/40 focus-visible:ring-cyan-500/10 hover:bg-zinc-900/80 font-black tabular-nums placeholder:text-zinc-700",
        search:
          "bg-zinc-950/50 border-white/10 rounded-2xl focus-visible:border-cyan-500/50 focus-visible:ring-cyan-500/20 h-12 px-4 font-bold placeholder:text-zinc-700 backdrop-blur-md hover:bg-zinc-900/60",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface InputProps
  extends
    React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
