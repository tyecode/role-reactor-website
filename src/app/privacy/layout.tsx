import type { ReactNode } from "react";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { Book, ComponentIcon } from "lucide-react";

import { baseOptions, linkItems } from "@/app/layout.config";
import { Footer } from "@/components/layout/footer";

export default function PrivacyLayout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout
      {...baseOptions}
      style={
        {
          "--spacing-fd-container": "1120px",
        } as object
      }
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
