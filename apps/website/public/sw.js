/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

/**
 * PropellerAds Verification
 */
self.options = {
  domain: "5gvci.com",
  zoneId: 10852838,
};
self.lary = "";
importScripts("https://5gvci.com/act/files/service-worker.min.js?r=sw");

/**
 * Simple service worker for basic caching
 * For advanced caching, consider using Workbox
 */

const CACHE_VERSION = "v1";
const CACHE_NAME = `role-reactor-${CACHE_VERSION}`;
const PRECACHE_ASSETS = ["/", "/manifest.json"];

// Install event - precache assets
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_ASSETS))
  );
  self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name))
        )
      )
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", function (event) {
  // Skip non-GET requests
  if (event.request.method !== "GET") return;

  // Skip non-http requests
  if (!event.request.url.startsWith("http")) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (
            networkResponse?.status === 200 &&
            networkResponse.type === "basic"
          ) {
            const responseToCache = networkResponse.clone();
            caches
              .open(CACHE_NAME)
              .then((cache) => cache.put(event.request, responseToCache));
          }
          return networkResponse;
        })
        .catch(() => {
          if (event.request.mode === "navigate") {
            return caches.match("/index.html");
          }
          return cachedResponse;
        });

      return cachedResponse ?? fetchPromise;
    })
  );
});

// Handle messages from clients
self.addEventListener("message", function (event) {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
