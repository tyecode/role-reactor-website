import type { ReactNode } from "react";

import { Footer } from "@/components/layout/footer";
import { Metadata } from "next";

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
    <div className="flex flex-col min-h-screen">
      {children}
      <Footer />
    </div>
  );
}
