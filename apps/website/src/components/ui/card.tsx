import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { CyberpunkBackground } from "@/components/common/cyberpunk-background";
import { Audiowide } from "next/font/google";

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
});

const cardVariants = cva(
  "rounded-md border text-card-foreground shadow-lg transition-all flex flex-col",
  {
    variants: {
      variant: {
        default:
          "bg-black/40 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all duration-300 relative group overflow-hidden shadow-none",
        stat: "bg-black/40 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all duration-300 relative group overflow-hidden shadow-none",
        feature:
          "bg-black/40 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all duration-300 relative group overflow-hidden shadow-none",
        glass:
          "rounded-md bg-black/40 border-white/10 backdrop-blur-xl shadow-none relative group overflow-hidden hover:border-white/20 transition-all duration-300",
        cyberpunk:
          "bg-black/40 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all duration-300 relative group overflow-hidden shadow-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface CardProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  showGrid?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, showGrid, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant }), className)}
      {...props}
    >
      {showGrid && (
        <CyberpunkBackground
          gridSize={24}
          gridOpacity={0.02}
          gridColor="#00ffff"
          showGlows={true}
          glowOpacity={0.4}
        />
      )}

      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.03)_2px,rgba(255,255,255,0.03)_4px)]" />
      </div>

      {/* Noise Texture */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.015] mix-blend-overlay">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />
      </div>

      {/* Corner Accent Lines */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-cyan-500/20 rounded-tl-md pointer-events-none z-10 transition-all duration-300 group-hover:border-cyan-400" />
      <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-cyan-500/20 rounded-tr-md pointer-events-none z-10 transition-all duration-300 group-hover:border-cyan-400" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-cyan-500/20 rounded-bl-md pointer-events-none z-10 transition-all duration-300 group-hover:border-cyan-400" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-cyan-500/20 rounded-br-md pointer-events-none z-10 transition-all duration-300 group-hover:border-cyan-400" />

      <div className="relative z-20 h-full w-full flex flex-col">
        {children}
      </div>
    </div>
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-2xl font-bold leading-none tracking-tight text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]",
      audiowide.className,
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-zinc-400 font-medium", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
