"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const tabsListVariants = cva(
  "flex items-center justify-center rounded-xl p-1 text-zinc-400 backdrop-blur-sm transition-all gap-1",
  {
    variants: {
      variant: {
        default: "h-10 bg-zinc-900/40 border border-white/5",
        glitch:
          "h-12 bg-zinc-900/50 border border-white/10 shadow-[0_0_20px_-12px_rgba(0,0,0,0.5)]",
        neon: "bg-zinc-950/80 border border-white/10 p-1.5 h-auto rounded-2xl backdrop-blur-xl shadow-[0_0_30px_-10px_rgba(0,0,0,0.5)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface TabsListProps
  extends
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(tabsListVariants({ variant, className }))}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3 py-2.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-zinc-950 flex-1",
  {
    variants: {
      variant: {
        default:
          "text-sm font-medium data-[state=active]:bg-zinc-800 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:ring-1 data-[state=active]:ring-white/10 hover:text-white hover:bg-white/5",
        glitch:
          "text-[10px] font-bold uppercase tracking-wide data-[state=active]:bg-zinc-800 data-[state=active]:text-cyan-400 data-[state=active]:shadow-[0_0_15px_-5px_rgba(6,182,212,0.3)] data-[state=active]:ring-1 data-[state=active]:ring-cyan-500/20 hover:text-zinc-200 hover:bg-white/5",
        neon: "rounded-xl px-4 sm:px-8 py-3 text-[11px] sm:text-xs font-black uppercase tracking-widest data-[state=active]:bg-cyan-500 data-[state=active]:text-black data-[state=active]:shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:text-white",
        "neon-purple":
          "rounded-xl px-4 sm:px-8 py-3 text-[11px] sm:text-xs font-black uppercase tracking-widest data-[state=active]:bg-purple-500 data-[state=active]:text-white data-[state=active]:shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface TabsTriggerProps
  extends
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabsTriggerVariants> {}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, variant, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(tabsTriggerVariants({ variant, className }))}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
