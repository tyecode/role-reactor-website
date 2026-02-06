import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { RootProvider } from "fumadocs-ui/provider";
import { Analytics } from "@vercel/analytics/next";

import { links } from "@/constants/links";
import { SessionProvider } from "@/components/auth/session-provider";

import "@/app/global.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

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
  icons: {
    icon: [
      { url: "/images/favicon/favicon.ico" },
      {
        url: "/images/favicon/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/images/favicon/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: [{ url: "/images/favicon/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/images/favicon/site.webmanifest",
  ...(process.env.GOOGLE_SITE_VERIFICATION && {
    other: {
      "google-site-verification": process.env.GOOGLE_SITE_VERIFICATION,
    },
  }),
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen antialiased">
        <SessionProvider>
          <RootProvider
            theme={{
              defaultTheme: "dark",
              forcedTheme: "dark",
              attribute: "class",
              enableSystem: false,
            }}
          >
            {children}
          </RootProvider>
        </SessionProvider>
        {/* Only load analytics in production to prevent development errors */}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
