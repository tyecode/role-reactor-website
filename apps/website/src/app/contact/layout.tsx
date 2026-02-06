import type { Metadata } from "next";
import type { ReactNode } from "react";

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
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">{children}</div>
    </div>
  );
}
