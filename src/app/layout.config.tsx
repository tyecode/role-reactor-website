import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Image from "next/image";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <Image
          src="/logo.png"
          width={28}
          height={28}
          alt="Role Reactor Logo"
          className="inline-block"
          priority
        />
        Role Reactor
      </>
    ),
  },
  // see https://fumadocs.dev/docs/ui/navigation/links
  links: [
    {
      text: "Documentation",
      url: "/docs",
    },
    {
      text: "GitHub",
      url: "https://github.com/tyecode-bots/role-reactor-bot",
      external: true,
    },
    {
      text: "Add to Server",
      url: "https://discord.com/oauth2/authorize?client_id=YOUR_BOT_ID&permissions=268435456&scope=bot%20applications.commands",
      external: true,
    },
  ],
};
