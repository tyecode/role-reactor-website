"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const developmentNoticeVariants = cva("fixed inset-0 z-50 flex p-4", {
  variants: {
    position: {
      center: "items-center justify-center",
      top: "items-start justify-center pt-8",
      bottom: "items-end justify-center pb-8",
    },
  },
  defaultVariants: {
    position: "center",
  },
});

const developmentNoticeContentVariants = cva(
  "relative w-full bg-white dark:bg-gray-900 rounded-lg border shadow-lg transform transition-all duration-300",
  {
    variants: {
      size: {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const developmentNoticeIconVariants = cva(
  "flex items-center justify-center rounded-lg",
  {
    variants: {
      size: {
        sm: "w-8 h-8",
        md: "w-10 h-10",
        lg: "w-12 h-12",
      },
      variant: {
        default: "bg-gradient-to-br from-blue-500 to-purple-600",
        warning: "bg-gradient-to-br from-yellow-500 to-orange-500",
        info: "bg-gradient-to-br from-blue-500 to-cyan-500",
        success: "bg-gradient-to-br from-green-500 to-emerald-500",
        error: "bg-gradient-to-br from-red-500 to-pink-500",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
);

const developmentNoticeContentBgVariants = cva("rounded-lg p-4 border", {
  variants: {
    variant: {
      default:
        "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800",
      warning:
        "bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800",
      info: "bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800",
      success:
        "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800",
      error:
        "bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-red-200 dark:border-red-800",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const developmentNoticeTitleVariants = cva("font-semibold text-foreground", {
  variants: {
    size: {
      sm: "text-base",
      md: "text-lg",
      lg: "text-xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const developmentNoticeSubtitleVariants = cva("text-muted-foreground", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const developmentNoticeDescriptionVariants = cva(
  "text-muted-foreground leading-relaxed",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const developmentNoticePaddingVariants = cva("", {
  variants: {
    size: {
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface DevelopmentNoticeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof developmentNoticeVariants>,
    VariantProps<typeof developmentNoticeContentVariants>,
    VariantProps<typeof developmentNoticeIconVariants> {
  showOnMount?: boolean;
  onClose?: () => void;
  noticeId?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  icon?: React.ReactNode;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  primaryButtonVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  secondaryButtonVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  showSecondaryButton?: boolean;
  showDontShowAgain?: boolean;
  delay?: number;
}

const DevelopmentNotice = React.forwardRef<
  HTMLDivElement,
  DevelopmentNoticeProps
>(
  (
    {
      className,
      showOnMount = true,
      onClose,
      noticeId = "development-notice",
      title = "Development Notice",
      subtitle = "Role Reactor Bot",
      description = "No description provided",
      icon,
      primaryButtonText = "Got it, thanks!",
      secondaryButtonText = "Don't show again",
      onPrimaryAction,
      onSecondaryAction,
      primaryButtonVariant = "default",
      secondaryButtonVariant = "ghost",
      showSecondaryButton = true,
      showDontShowAgain = true,
      delay = 1000,
      position = "center",
      size = "md",
      variant = "default",
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const [isAnimating, setIsAnimating] = React.useState(false);

    React.useEffect(() => {
      if (showOnMount) {
        const hasDismissedPermanently = localStorage.getItem(
          `${noticeId}-dismissed`
        );
        const hasShownThisSession = sessionStorage.getItem(`${noticeId}-shown`);

        if (!hasDismissedPermanently && !hasShownThisSession) {
          const timer = setTimeout(() => {
            setIsVisible(true);
            setIsAnimating(true);
            sessionStorage.setItem(`${noticeId}-shown`, "true");
          }, delay);
          return () => clearTimeout(timer);
        }
      }
    }, [showOnMount, noticeId, delay]);

    const handleClose = React.useCallback(() => {
      setIsAnimating(false);
      setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, 200);
    }, [onClose]);

    const handlePrimaryAction = React.useCallback(() => {
      if (onPrimaryAction) {
        onPrimaryAction();
      } else {
        handleClose();
      }
    }, [onPrimaryAction, handleClose]);

    const handleSecondaryAction = React.useCallback(() => {
      if (onSecondaryAction) {
        onSecondaryAction();
      } else if (showDontShowAgain) {
        localStorage.setItem(`${noticeId}-dismissed`, "true");
      }
      handleClose();
    }, [onSecondaryAction, showDontShowAgain, noticeId, handleClose]);

    if (!isVisible) return null;

    return (
      <div
        ref={ref}
        className={cn(developmentNoticeVariants({ position }), className)}
        {...props}
      >
        <div
          className={cn(
            "absolute inset-0 bg-black/10 backdrop-blur-sm transition-opacity duration-300",
            isAnimating ? "opacity-100" : "opacity-0"
          )}
          onClick={handleClose}
        />

        <div
          className={cn(
            developmentNoticeContentVariants({ size }),
            isAnimating ? "scale-100 opacity-100" : "scale-95 opacity-0"
          )}
        >
          <div
            className={cn(
              "flex items-start justify-between",
              developmentNoticePaddingVariants({ size }),
              "pb-4"
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(developmentNoticeIconVariants({ size, variant }))}
              >
                {icon || (
                  <X
                    className={cn(
                      "text-white",
                      size === "sm"
                        ? "w-4 h-4"
                        : size === "md"
                        ? "w-5 h-5"
                        : "w-6 h-6"
                    )}
                  />
                )}
              </div>
              <div>
                <h3 className={cn(developmentNoticeTitleVariants({ size }))}>
                  {title}
                </h3>
                {subtitle && (
                  <p
                    className={cn(developmentNoticeSubtitleVariants({ size }))}
                  >
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              aria-label="Close notice"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {description && (
            <div
              className={cn(
                "px-6 pb-4",
                developmentNoticePaddingVariants({ size }).replace("p-", "px-")
              )}
            >
              <div
                className={cn(developmentNoticeContentBgVariants({ variant }))}
              >
                <p
                  className={cn(developmentNoticeDescriptionVariants({ size }))}
                >
                  {description}
                </p>
              </div>
            </div>
          )}

          <div
            className={cn(
              "flex flex-col gap-3",
              developmentNoticePaddingVariants({ size }),
              "pt-2"
            )}
          >
            <Button
              onClick={handlePrimaryAction}
              variant={primaryButtonVariant}
              className={cn(
                "w-full",
                primaryButtonVariant === "default" &&
                  "bg-[#5865F2] hover:bg-[#4752C4] text-white"
              )}
            >
              {primaryButtonText}
            </Button>
            {showSecondaryButton && (
              <Button
                onClick={handleSecondaryAction}
                variant={secondaryButtonVariant}
                className="w-full"
              >
                {secondaryButtonText}
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
);

DevelopmentNotice.displayName = "DevelopmentNotice";

export { DevelopmentNotice };
