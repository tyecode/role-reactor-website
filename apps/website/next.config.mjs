import { createMDX } from "fumadocs-mdx/next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withMDX = createMDX();

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const config = {
  transpilePackages: [],
  reactStrictMode: true,
  // Essential performance optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: false,

  // Image optimization
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media.discordapp.net",
        port: "",
        pathname: "/**",
      },
    ],
  },

  // Optimize package imports
  experimental: {
    optimizePackageImports: ["lucide-react", "react-icons"],
    // Enable Next.js 15 Cache Components and PPR (Requires Canary)
    // ppr: "incremental",
    // dynamicIO: true,
    // Enable client-side caching for better navigation performance
    staleTimes: {
      dynamic: 300, // Cache dynamic routes for 5 minutes
      static: 300, // Cache static routes for 5 minutes
    },
  },

  // Security and performance headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(withMDX(config));
