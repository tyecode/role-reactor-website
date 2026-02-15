"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const popoverContentVariants = cva(
  "z-50 w-72 rounded-2xl border p-4 text-zinc-100 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-popover-content-transform-origin] transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-zinc-950/95 border-white/10 shadow-[0_0_30px_-5px_rgba(0,0,0,0.7)] data-[state=open]:border-cyan-500/20",
        cyber:
          "bg-zinc-950/80 border-cyan-500/20 shadow-[0_0_30px_-5px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> &
    VariantProps<typeof popoverContentVariants>
>(({ className, align = "center", sideOffset = 4, variant, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(popoverContentVariants({ variant, className }))}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };
