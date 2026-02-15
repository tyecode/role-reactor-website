"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cva, type VariantProps } from "class-variance-authority";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const checkboxVariants = cva(
  "peer h-4 w-4 shrink-0 rounded-md border shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
  {
    variants: {
      variant: {
        default:
          "border-white/10 bg-zinc-900/50 data-[state=checked]:bg-cyan-500 data-[state=checked]:text-black data-[state=checked]:border-cyan-500 data-[state=checked]:shadow-[0_0_10px_rgba(6,182,212,0.5)] hover:border-cyan-500/50",
        cyber:
          "border-white/10 bg-black/40 rounded-sm data-[state=checked]:bg-cyan-500 data-[state=checked]:text-black data-[state=checked]:border-cyan-500 data-[state=checked]:shadow-[0_0_10px_rgba(6,182,212,0.6)] hover:border-cyan-400 group-hover:border-cyan-400",
        amber:
          "border-white/10 bg-zinc-900/50 data-[state=checked]:bg-amber-500 data-[state=checked]:text-black data-[state=checked]:border-amber-500 data-[state=checked]:shadow-[0_0_10px_rgba(245,158,11,0.5)] hover:border-amber-500/50",
        emerald:
          "border-white/10 bg-zinc-900/50 data-[state=checked]:bg-emerald-500 data-[state=checked]:text-black data-[state=checked]:border-emerald-500 data-[state=checked]:shadow-[0_0_10px_rgba(16,185,129,0.5)] hover:border-emerald-500/50",
        purple:
          "border-white/10 bg-zinc-900/50 data-[state=checked]:bg-purple-500 data-[state=checked]:text-black data-[state=checked]:border-purple-500 data-[state=checked]:shadow-[0_0_10px_rgba(168,85,247,0.5)] hover:border-purple-500/50",
        glitch:
          "border-white/10 bg-zinc-950 rounded-none data-[state=checked]:bg-cyan-600 data-[state=checked]:text-white data-[state=checked]:border-cyan-500 hover:bg-zinc-900",
      },
      size: {
        default: "h-4 w-4",
        sm: "h-3.5 w-3.5",
        lg: "h-5 w-5 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface CheckboxProps
  extends
    React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, variant, size, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(checkboxVariants({ variant, size, className }))}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-3 w-3 stroke-[3]" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
