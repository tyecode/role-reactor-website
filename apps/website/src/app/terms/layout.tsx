import type { ReactNode } from "react";
import type { Metadata } from "next";
import { HomeLayout } from "fumadocs-ui/layouts/home";

import { baseOptions, linkItems } from "@/app/layout.config";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Terms of Use - Role Reactor",
  description:
    "Terms of use for Role Reactor Discord Bot - Rules and guidelines for using our service.",
  keywords: [
    "terms",
    "conditions",
    "agreement",
    "role reactor",
    "discord bot",
    "service",
    "legal",
  ],
  openGraph: {
    title: "Terms of Use - Role Reactor",
    description:
      "Terms of use for Role Reactor Discord Bot - Rules and guidelines for using our service.",
    type: "website",
  },
};

export default function TermsLayout({ children }: { children: ReactNode }) {
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
