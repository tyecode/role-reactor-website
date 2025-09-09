import type { ReactNode } from "react";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { Book, ComponentIcon } from "lucide-react";
import { Metadata } from "next";

import { baseOptions, linkItems } from "@/app/layout.config";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Sponsor Role Reactor | Support Our Development",
  description:
    "Support Role Reactor development and help us keep the bot free for everyone. View our sponsors and make a donation.",
  keywords: [
    "sponsor",
    "donate",
    "support",
    "role reactor",
    "discord bot",
    "development",
  ],
  openGraph: {
    title: "Sponsor Role Reactor | Support Our Development",
    description:
      "Support Role Reactor development and help us keep the bot free for everyone.",
    type: "website",
  },
};

export default function SponsorLayout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout
      {...baseOptions}
      links={[
        {
          type: "menu",
          on: "menu",
          text: "Documentation",
          items: [
            {
              text: "Getting Started",
              url: "/docs/ui",
              icon: <Book />,
            },
            {
              text: "Components",
              url: "/docs/ui/components",
              icon: <ComponentIcon />,
            },
          ],
        },
        {
          text: "Documentation",
          url: "/docs",
        },
        ...linkItems,
      ]}
      className="dark:bg-neutral-950 dark:[--color-fd-background:var(--color-neutral-950)]"
    >
      {children}
      <Footer />
    </HomeLayout>
  );
}
