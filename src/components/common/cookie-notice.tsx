"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface CookieNoticeProps {
  /** Custom storage key for the dismissed state */
  storageKey?: string;
  /** Custom privacy policy URL */
  privacyUrl?: string;
  /** Custom message text */
  message?: string;
  /** Custom dismiss button aria-label */
  dismissLabel?: string;
  /** Custom CSS classes for the container */
  className?: string;
}

export function CookieNotice({
  storageKey = "cookie-notice-dismissed",
  privacyUrl = "/privacy",
  message = "This website uses essential cookies to ensure proper functionality. By continuing to use this site, you agree to our use of cookies. See our",
  dismissLabel = "Dismiss cookie notice",
  className = "",
}: CookieNoticeProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    try {
      // Check if user has dismissed the notice
      const dismissed = localStorage.getItem(storageKey);
      if (!dismissed) {
        setIsVisible(true);
      }
    } catch (error) {
      // Handle localStorage errors (e.g., in private browsing mode)
      console.warn("Failed to access localStorage:", error);
      setIsVisible(true);
    }
  }, [storageKey]);

  const dismissNotice = () => {
    try {
      localStorage.setItem(storageKey, "true");
    } catch (error) {
      console.warn("Failed to save to localStorage:", error);
    }
    setIsVisible(false);
  };

  // Prevent hydration mismatch
  if (!isMounted || !isVisible) {
    return null;
  }

  return (
    <div
      role="banner"
      aria-label="Cookie notice"
      className={`fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4 z-50 ${className}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {message}{" "}
            <a
              href={privacyUrl}
              className="text-blue-600 dark:text-blue-400 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded"
            >
              Privacy Policy
            </a>{" "}
            for more information.
          </p>
        </div>
        <button
          onClick={dismissNotice}
          className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded"
          aria-label={dismissLabel}
          type="button"
        >
          <X size={20} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
