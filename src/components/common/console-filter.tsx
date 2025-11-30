"use client";

import { useEffect } from "react";

/**
 * Filters out SES (Secure EcmaScript) warnings from browser extensions
 * These warnings are harmless and clutter the console
 */
export function ConsoleFilter() {
  useEffect(() => {
    // Only filter in development
    if (process.env.NODE_ENV !== "development") {
      return;
    }

    // Store original console methods
    const originalWarn = console.warn;
    const originalError = console.error;

    // Patterns to filter out
    const filterPatterns = [
      /SES Removing unpermitted intrinsics/i,
      /Removing intrinsics\.%/i,
      /lockdown-install\.js/i,
      /moz-extension:/i,
      /chrome-extension:/i,
    ];

    // Override console.warn
    console.warn = (...args: unknown[]) => {
      const message = args.join(" ");
      const shouldFilter = filterPatterns.some((pattern) =>
        pattern.test(message)
      );

      if (!shouldFilter) {
        originalWarn.apply(console, args);
      }
    };

    // Override console.error (some extensions use error instead of warn)
    console.error = (...args: unknown[]) => {
      const message = args.join(" ");
      const shouldFilter = filterPatterns.some((pattern) =>
        pattern.test(message)
      );

      if (!shouldFilter) {
        originalError.apply(console, args);
      }
    };

    // Cleanup: restore original methods on unmount
    return () => {
      console.warn = originalWarn;
      console.error = originalError;
    };
  }, []);

  return null;
}
