"use client";

import { useEffect } from "react";

/**
 * Filters out harmless warnings and errors from browser extensions and third-party scripts
 * These warnings clutter the console but don't affect functionality
 */
export function ConsoleFilter() {
  useEffect(() => {
    // Store original console methods
    const originalWarn = console.warn;
    const originalError = console.error;
    const originalInfo = console.info;

    // Patterns to filter out (harmless warnings from extensions/third-party scripts)
    const filterPatterns = [
      // SES (Secure EcmaScript) warnings from browser extensions
      /SES Removing unpermitted intrinsics/i,
      /Removing intrinsics/i,
      /lockdown-install/i,

      // Browser extension URLs
      /moz-extension:/i,
      /chrome-extension:/i,
      /safari-extension:/i,

      // WalletConnect and third-party script warnings
      /Partitioned cookie or storage access/i,
      /verify\.walletconnect/i,
      /contentscript/i,

      // Performance Observer warnings (harmless)
      /Ignoring unsupported entryTypes/i,
      /longtask/i,

      // Quirks Mode warnings (usually from iframes or third-party content)
      /This page is in Quirks Mode/i,
      /Page layout may be impacted/i,

      // Bugsnag info messages (harmless)
      /\[bugsnag\]/i,

      // Referrer Policy warnings (harmless)
      /Referrer Policy: Ignoring/i,

      // Analytics SDK network errors (development mode)
      /Analytics SDK.*NetworkError/i,
      /NetworkError when attempting to fetch resource/i,
      /AnalyticsSDKApiError/i,
    ];

    // Helper function to check if message should be filtered
    const shouldFilterMessage = (args: unknown[]): boolean => {
      const message = args
        .map((arg) => {
          if (typeof arg === "string") return arg;
          if (arg instanceof Error) return arg.message;
          try {
            return JSON.stringify(arg);
          } catch {
            return String(arg);
          }
        })
        .join(" ");

      return filterPatterns.some((pattern) => pattern.test(message));
    };

    // Override console.warn
    console.warn = (...args: unknown[]) => {
      if (!shouldFilterMessage(args)) {
        originalWarn.apply(console, args);
      }
    };

    // Override console.error (some extensions use error instead of warn)
    console.error = (...args: unknown[]) => {
      if (!shouldFilterMessage(args)) {
        originalError.apply(console, args);
      }
    };

    // Override console.info (for Bugsnag and similar)
    console.info = (...args: unknown[]) => {
      if (!shouldFilterMessage(args)) {
        originalInfo.apply(console, args);
      }
    };

    // Cleanup: restore original methods on unmount
    return () => {
      console.warn = originalWarn;
      console.error = originalError;
      console.info = originalInfo;
    };
  }, []);

  return null;
}
