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

const AlertContext = React.createContext<{
  variant?: VariantProps<typeof alertVariants>["variant"];
}>({});

interface AlertProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  onClose?: () => void;
  autoClose?: number;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    { className, variant = "default", onClose, autoClose, children, ...props },
    ref
  ) => {
    const [isVisible, setIsVisible] = React.useState(true);
    const [isClosing, setIsClosing] = React.useState(false);

    const handleClose = React.useCallback(() => {
      setIsClosing(true);
      setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, 200);
    }, [onClose]);

    React.useEffect(() => {
      if (autoClose) {
        const timer = setTimeout(handleClose, autoClose);
        return () => clearTimeout(timer);
      }
    }, [autoClose, handleClose]);

    if (!isVisible) return null;

    return (
      <AlertContext.Provider value={{ variant }}>
        <div
          ref={ref}
          role="alert"
          className={cn(
            alertVariants({ variant }),
            isClosing &&
              (variant === "glitch"
                ? "animate-dialog-glitch-out"
                : "animate-out fade-out slide-out-to-top-2 shadow-none"),
            className
          )}
          {...props}
        >
          {children}
          {onClose && (
            <button
              onClick={handleClose}
              className="absolute right-2.5 top-2.5 w-6 h-6 flex items-center justify-center rounded-md opacity-30 bg-zinc-900 border border-white/5 transition-all hover:opacity-100 hover:bg-zinc-800 hover:border-cyan-500/30 text-zinc-400 hover:text-white z-20"
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Close</span>
            </button>
          )}
        </div>
      </AlertContext.Provider>
    );
  }
);
Alert.displayName = "Alert";

const alertTitleVariants = cva("mb-1 font-bold leading-none tracking-tight", {
  variants: {
    variant: {
      default: "",
      glitch: "text-cyan-400 font-mono uppercase tracking-widest px-0.5",
      info: "text-cyan-400",
      success: "text-emerald-400",
      warning: "text-amber-400",
      error: "text-red-400",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> &
    VariantProps<typeof alertTitleVariants>
>(({ className, variant: propsVariant, ...props }, ref) => {
  const { variant: contextVariant } = React.useContext(AlertContext);
  const variant = propsVariant || contextVariant;

  return (
    <h5
      ref={ref}
      className={cn(alertTitleVariants({ variant, className }))}
      {...props}
    />
  );
});
AlertTitle.displayName = "AlertTitle";

const alertDescriptionVariants = cva("text-sm [&_p]:leading-relaxed", {
  variants: {
    variant: {
      default: "opacity-80",
      glitch: "text-cyan-500/70 font-mono text-[10px] uppercase leading-tight",
      info: "opacity-90",
      success: "opacity-90",
      warning: "opacity-90",
      error: "opacity-90",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> &
    VariantProps<typeof alertDescriptionVariants>
>(({ className, variant: propsVariant, ...props }, ref) => {
  const { variant: contextVariant } = React.useContext(AlertContext);
  const variant = propsVariant || contextVariant;

  return (
    <div
      ref={ref}
      className={cn(alertDescriptionVariants({ variant, className }))}
      {...props}
    />
  );
});
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
