import type { ReactNode } from "react";
import type { Metadata } from "next";
import { HomeLayout } from "fumadocs-ui/layouts/home";

import { baseOptions, linkItems } from "@/app/layout.config";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Privacy Policy - Role Reactor",
  description:
    "Privacy policy for Role Reactor Discord Bot - How we handle your data and protect your privacy.",
  keywords: [
    "privacy",
    "policy",
    "data protection",
    "role reactor",
    "discord bot",
    "gdpr",
    "ccpa",
  ],
  openGraph: {
    title: "Privacy Policy - Role Reactor",
    description:
      "Privacy policy for Role Reactor Discord Bot - How we handle your data and protect your privacy.",
    type: "website",
  },
};

export default function PrivacyLayout({ children }: { children: ReactNode }) {
  const mergedLinks = [
    {
      text: "Documentation",
      url: "/docs",
    },
    {
      text: "Leaderboards",
      url: "/leaderboards",
    },
    ...linkItems,
    ...(baseOptions.links || []),
  ];

  return (
    <HomeLayout
      {...baseOptions}
      {...{ links: mergedLinks }}
      className="bg-neutral-950 [--color-fd-background:var(--color-neutral-950)]"
    >
      {children}
      <Footer />
    </HomeLayout>
  );
}
