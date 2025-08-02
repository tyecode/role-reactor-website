"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export function CookieNotice() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has dismissed the notice
    const dismissed = localStorage.getItem("cookie-notice-dismissed");
    if (!dismissed) {
      setIsVisible(true);
    }
  }, []);

  const dismissNotice = () => {
    setIsVisible(false);
    localStorage.setItem("cookie-notice-dismissed", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1 pr-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            This website uses essential cookies to ensure proper functionality.
            By continuing to use this site, you agree to our use of cookies. See
            our{" "}
            <a
              href="/privacy"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Privacy Policy
            </a>{" "}
            for more information.
          </p>
        </div>
        <button
          onClick={dismissNotice}
          className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          aria-label="Dismiss cookie notice"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}
