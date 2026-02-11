import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-2xl border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 backdrop-blur-md overflow-hidden transition-all duration-500 animate-in fade-in slide-in-from-top-4",
  {
    variants: {
      variant: {
        default:
          "bg-zinc-950/40 text-zinc-100 border-white/10 shadow-[0_0_15px_-5px_rgba(255,255,255,0.05)] [&>svg]:text-zinc-400",
        info: "border-cyan-500/20 bg-cyan-500/5 text-white shadow-[0_0_15px_-4px_rgba(6,182,212,0.2)] [&>svg]:text-cyan-400",
        success:
          "border-emerald-500/20 bg-emerald-500/5 text-white shadow-[0_0_15px_-4px_rgba(16,185,129,0.2)] [&>svg]:text-emerald-400",
        warning:
          "border-amber-500/20 bg-amber-500/5 text-white shadow-[0_0_15px_-4px_rgba(245,158,11,0.2)] [&>svg]:text-amber-400",
        error:
          "border-red-500/30 bg-red-500/5 text-red-200 shadow-[0_0_15px_-4px_rgba(239,68,68,0.2)] [&>svg]:text-red-400 animate-tv-flicker",
        glitch:
          "border-cyan-500/20 bg-cyan-950/30 text-cyan-300 font-mono shadow-[0_0_15px_-4px_rgba(6,182,212,0.2)] [&>svg]:text-cyan-400 animate-dialog-glitch-in sm:dialog-scanlines",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface AlertProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  onClose?: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, onClose, children, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      {children}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-3 top-3 p-1.5 rounded-lg opacity-40 hover:opacity-100 hover:bg-white/5 transition-all text-zinc-400 hover:text-white"
        >
          <X className="h-3.5 w-3.5" />
          <span className="sr-only">Close</span>
        </button>
      )}
    </div>
  )
);
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn(
      "mb-1 font-bold leading-none tracking-wider uppercase",
      className
    )}
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
    className={cn(
      "text-[11px] sm:text-xs [&_p]:leading-relaxed font-medium opacity-80",
      className
    )}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
