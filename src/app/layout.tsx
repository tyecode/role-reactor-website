import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { RootProvider } from "fumadocs-ui/provider";

import { links } from "@/constants/links";

import "@/app/global.css";

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
  authors: [{ name: "Tyecode" }],
  creator: "Tyecode",
  publisher: "Tyecode",
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
    <html lang="en" className={inter.className} suppressHydrationWarning>
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
      </head>
      <body className="flex flex-col min-h-screen antialiased">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
