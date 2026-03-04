/**
 * Web Vitals Performance Monitoring
 * Tracks Core Web Vitals and other performance metrics
 */

type MetricName = "CLS" | "FCP" | "FID" | "LCP" | "TTFB" | "INP";

interface Metric {
  name: MetricName;
  value: number;
  delta: number;
  rating: "good" | "needs-improvement" | "poor";
  id: string;
  navigationType?:
    | "navigate"
    | "reload"
    | "back-forward-cache"
    | "prerender"
    | "restore";
}

/**
 * Send vitals to analytics endpoint
 */
function sendToAnalytics(metric: Metric) {
  const body = {
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    id: metric.id,
    page: typeof window !== "undefined" ? window.location.pathname : "unknown",
    name: metric.name,
    value: metric.value.toString(),
    delta: metric.delta.toString(),
    rating: metric.rating,
    navigationType: metric.navigationType || "navigate",
  };

  // Log in development
  if (process.env.NODE_ENV === "development") {
    console.log("[Web Vitals]", metric.name, metric.value, metric.rating);
  }

  // Send to custom analytics endpoint in production
  if (
    process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT &&
    typeof navigator !== "undefined"
  ) {
    navigator.sendBeacon(
      process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT,
      JSON.stringify(body)
    );
  }
}

/**
 * Report Core Web Vitals
 */
export function reportWebVitals(onReport?: (metric: Metric) => void) {
  const report = onReport ?? sendToAnalytics;

  // Import web-vitals dynamically to avoid bundle size impact
  import("web-vitals")
    .then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
      onCLS((m) => report({ ...m, name: "CLS" } as Metric));
      onFCP((m) => report({ ...m, name: "FCP" } as Metric));
      onLCP((m) => report({ ...m, name: "LCP" } as Metric));
      onTTFB((m) => report({ ...m, name: "TTFB" } as Metric));
      onINP((m) => report({ ...m, name: "INP" } as Metric));
    })
    .catch(() => {
      // web-vitals failed to load
    });
}

/**
 * Performance observer for custom metrics
 */
export function observePerformance() {
  if (
    typeof window === "undefined" ||
    typeof PerformanceObserver === "undefined"
  ) {
    return;
  }

  // Observe long tasks
  try {
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 50) {
          console.warn(
            "[Performance] Long task detected:",
            entry.duration,
            "ms"
          );
        }
      }
    }).observe({
      entryTypes: ["longtask"] as PerformanceObserverInit["entryTypes"],
    });
  } catch {
    // longtask not supported
  }
}

/**
 * Get current performance metrics
 */
export function getPerformanceMetrics() {
  if (typeof window === "undefined" || typeof performance === "undefined") {
    return null;
  }

  const navigation = performance.getEntriesByType(
    "navigation"
  )[0] as PerformanceNavigationTiming;
  const paint = performance.getEntriesByType("paint");

  return {
    dns: navigation.domainLookupEnd - navigation.domainLookupStart,
    tcp: navigation.connectEnd - navigation.connectStart,
    ttfb: navigation.responseStart - navigation.requestStart,
    domContentLoaded:
      navigation.domContentLoadedEventEnd - navigation.startTime,
    load: navigation.loadEventEnd - navigation.startTime,
    firstPaint: paint.find((p) => p.name === "first-paint")?.startTime,
    firstContentfulPaint: paint.find((p) => p.name === "first-contentful-paint")
      ?.startTime,
  };
}

/**
 * Initialize performance monitoring
 */
export function initPerformanceMonitoring() {
  if (typeof window === "undefined") return;

  // Only monitor in production
  if (process.env.NODE_ENV !== "production") return;

  reportWebVitals();
  observePerformance();
}
