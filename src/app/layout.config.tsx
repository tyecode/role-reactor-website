import { type LinkItemType } from "fumadocs-ui/layouts/docs";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { Heart } from "lucide-react";
import Image from "next/image";
import { BsGithub } from "react-icons/bs";
import { FaDiscord } from "react-icons/fa";

import { links } from "@/constants/links";
import { UserMenu } from "@/components/auth/user-menu";

export const linkItems: LinkItemType[] = [
  // Temporarily hidden - sponsor page not ready
  // {
  //   type: "custom",
  //   children: (
  //     <a
  //       href="/sponsor"
  //       className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
  //     >
  //       <Heart className="h-4 w-4 text-pink-500" />
  //       <span>Sponsor</span>
  //     </a>
  //   ),
  // },
];

export const baseOptions: BaseLayoutProps = {
  nav: {
    transparentMode: "always",
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any,
  links: [
    {
      type: "custom",
      secondary: true,
      children: <UserMenu />,
    },
  ],
};

// Docs layout options without login button
export const docsOptions: BaseLayoutProps = {
  ...baseOptions,
  links: [
    {
      type: "icon",
      text: "GitHub Repository",
      url: links.github,
      external: true,
      icon: <BsGithub className="w-5 h-5" />,
    },
    {
      type: "icon",
      text: "Discord Server",
      url: links.support,
      external: true,
      secondary: true,
      icon: <FaDiscord className="w-5 h-5" />,
    },
  ],
};
