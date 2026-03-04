"use client";

import { useEffect } from "react";

export function PWAProvider() {
  useEffect(() => {
    // Register service worker in production
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js", { scope: "/" })
          .then((registration) => {
            console.log("[PWA] Service Worker registered:", registration.scope);

            // Check for updates
            registration.addEventListener("updatefound", () => {
              const newWorker = registration.installing;
              if (newWorker) {
                newWorker.addEventListener("statechange", () => {
                  if (
                    newWorker.state === "installed" &&
                    navigator.serviceWorker.controller
                  ) {
                    console.log("[PWA] New content available, please refresh.");
                  }
                });
              }
            });
          })
          .catch((error) => {
            console.error("[PWA] Service Worker registration failed:", error);
          });
      });
    }
  }, []);

  return null;
}

/**
 * Add PWA meta tags to document head
 */
export function PWAMeta() {
  return (
    <>
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <meta name="apple-mobile-web-app-title" content="Role Reactor" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#06b6d4" />
      <link rel="manifest" href="/manifest.json" />
      <link
        rel="apple-touch-icon"
        href="/images/favicon/apple-touch-icon.png"
      />
    </>
  );
}
