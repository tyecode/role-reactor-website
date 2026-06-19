import type { Metadata } from "next";
import type { ReactNode } from "react";
import { HomeLayout } from "fumadocs-ui/layouts/home";

import { baseOptions, linkItems } from "@/app/layout.config";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Contact Us - Role Reactor",
  description:
    "Get in touch with the Role Reactor team. Contact us for support, questions, or feedback about our Discord bot.",
  keywords: [
    "contact",
    "support",
    "help",
    "discord bot",
    "role reactor",
    "feedback",
  ],
  openGraph: {
    title: "Contact Us - Role Reactor",
    description:
      "Get in touch with the Role Reactor team. Contact us for support, questions, or feedback about our Discord bot.",
    type: "website",
  },
};

export default function ContactLayout({ children }: { children: ReactNode }) {
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
