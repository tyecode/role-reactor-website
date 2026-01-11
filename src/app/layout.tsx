import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { RootProvider } from "fumadocs-ui/provider";
import { Analytics } from "@vercel/analytics/next";

import { links } from "@/constants/links";
import { SessionProvider } from "@/components/auth/session-provider";
import { ConsoleFilter } from "@/components/common/console-filter";
import { OnchainKitProviderWrapper } from "@/components/providers/onchainkit-provider";

import "@/app/global.css";
import "@coinbase/onchainkit/styles.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  title: {
    default: "Role Reactor - Discord Bot for Automated Role Management",
    template: "%s | Role Reactor",
  },
  description:
    "Role Reactor is a powerful Discord bot for automated role management. Set up reaction roles instantly, manage permissions, and enhance your Discord server with the most effective role assignment system.",
  keywords: [
    "role reactor",
    "role reactor bot",
    "discord bot",
    "discord bots",
    "discord bot for roles",
    "role management discord bot",
    "discord roles bot",
    "reaction roles discord",
    "discord automation",
    "discord server management",
    "role assignment",
    "discord permissions",
    "server moderation",
    "discord utilities",
    "self assign roles",
    "emoji roles",
    "discord role bot",
    "free discord bot",
    "discord bot list",
  ],
  authors: [{ name: "qodinger" }],
  creator: "qodinger",
  publisher: "qodinger",
  category: "Technology",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || links.home),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Role Reactor - Discord Bot for Role Management",
    description:
      "Role Reactor is a powerful Discord bot for automated role management. Set up reaction roles instantly, manage permissions, and enhance your Discord server experience.",
    siteName: "Role Reactor",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Role Reactor - Discord Bot for Role Management",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Role Reactor - Discord Bot for Role Management",
    description:
      "Role Reactor is a powerful Discord bot for automated role management. Set up reaction roles instantly, manage permissions, and enhance your Discord server experience.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  ...(process.env.GOOGLE_SITE_VERIFICATION && {
    other: {
      "google-site-verification": process.env.GOOGLE_SITE_VERIFICATION,
    },
  }),
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.className} dark`}
      suppressHydrationWarning
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/favicon/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon/favicon-32x32.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/favicon/apple-touch-icon.png"
        />
        <link rel="manifest" href="/images/favicon/site.webmanifest" />
        <link rel="preload" href="/logo.png" as="image" type="image/png" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Force dark mode script - runs early to ensure dark class is always applied */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof document === 'undefined') return;
                document.documentElement.classList.add('dark');
                // Prevent theme switching by removing theme from localStorage
                try {
                  localStorage.removeItem('theme');
                  localStorage.removeItem('fumadocs-theme');
                } catch (e) {}
                // Observer to ensure dark class stays
                const observer = new MutationObserver(function(mutations) {
                  if (!document.documentElement.classList.contains('dark')) {
                    document.documentElement.classList.add('dark');
                  }
                });
                observer.observe(document.documentElement, {
                  attributes: true,
                  attributeFilter: ['class']
                });
              })();
            `,
          }}
        />
        {/* Console filter script - runs early to catch extension warnings */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window === 'undefined') return;
                const patterns = [
                  /SES Removing unpermitted intrinsics/i,
                  /Removing intrinsics/i,
                  /lockdown-install/i,
                  /moz-extension:/i,
                  /chrome-extension:/i,
                  /safari-extension:/i,
                  /Partitioned cookie or storage access/i,
                  /verify\\.walletconnect/i,
                  /contentscript/i,
                  /Ignoring unsupported entryTypes/i,
                  /longtask/i,
                  /This page is in Quirks Mode/i,
                  /Page layout may be impacted/i,
                  /\\[bugsnag\\]/i,
                  /Referrer Policy: Ignoring/i,
                  /Analytics SDK.*NetworkError/i,
                  /NetworkError when attempting to fetch resource/i,
                  /AnalyticsSDKApiError/i
                ];
                const shouldFilter = (args) => {
                  const msg = args.map(a => typeof a === 'string' ? a : String(a)).join(' ');
                  return patterns.some(p => p.test(msg));
                };
                const origWarn = console.warn;
                const origError = console.error;
                const origInfo = console.info;
                console.warn = function(...args) {
                  if (!shouldFilter(args)) origWarn.apply(console, args);
                };
                console.error = function(...args) {
                  if (!shouldFilter(args)) origError.apply(console, args);
                };
                console.info = function(...args) {
                  if (!shouldFilter(args)) origInfo.apply(console, args);
                };
              })();
            `,
          }}
        />
      </head>
      <body className="flex flex-col min-h-screen antialiased">
        <ConsoleFilter />
        <SessionProvider>
          <OnchainKitProviderWrapper>
            <RootProvider>{children}</RootProvider>
          </OnchainKitProviderWrapper>
        </SessionProvider>
        {/* Only load analytics in production to prevent development errors */}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
