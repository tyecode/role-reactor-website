import "@/app/global.css";
import { RootProvider } from "fumadocs-ui/provider";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { StructuredData } from "@/components/structured-data";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Role Reactor - Discord Bot for Role Management",
    template: "%s | Role Reactor",
  },
  description:
    "Powerful Discord bot for automated role management with reaction-based systems. Enhance your Discord server with seamless role assignment and management.",
  keywords: [
    "discord bot",
    "role management",
    "discord roles",
    "reaction roles",
    "discord automation",
    "discord server management",
    "role assignment",
    "discord permissions",
    "server moderation",
    "discord utilities",
  ],
  authors: [{ name: "Role Reactor Team" }],
  creator: "Role Reactor",
  publisher: "Role Reactor",
  category: "Technology",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://rolereactor.xyz"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Role Reactor - Discord Bot for Role Management",
    description:
      "Powerful Discord bot for automated role management with reaction-based systems.",
    siteName: "Role Reactor",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Role Reactor Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Role Reactor - Discord Bot for Role Management",
    description:
      "Powerful Discord bot for automated role management with reaction-based systems.",
    images: ["/logo.png"],
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
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <StructuredData />
      </head>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
