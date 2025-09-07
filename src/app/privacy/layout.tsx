import type { ReactNode } from "react";

import { Footer } from "@/components/layout/footer";
import { Metadata } from "next";

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
  return (
    <div className="flex flex-col min-h-screen">
      {children}
      <Footer />
    </div>
  );
}
