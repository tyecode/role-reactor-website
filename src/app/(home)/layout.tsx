import type { ReactNode } from "react";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { Book, ComponentIcon } from "lucide-react";

import { baseOptions, linkItems } from "@/app/layout.config";
import { Footer } from "@/components/layout/footer";

export default function Layout({ children }: { children: ReactNode }) {
  const mergedLinks = [
    // Left-side navigation items
    {
      type: "menu" as const,
      on: "menu" as const,
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
    // All items from linkItems (GitHub, Discord, Sponsor)
    ...linkItems,
    // Right-side items from baseOptions (Login button)
    ...(baseOptions.links || []),
  ];

  return (
    <HomeLayout
      {...baseOptions}
      {...{ links: mergedLinks }}
      className="dark:bg-neutral-950 dark:[--color-fd-background:var(--color-neutral-950)]"
    >
      {children}
      <Footer />
    </HomeLayout>
  );
}
