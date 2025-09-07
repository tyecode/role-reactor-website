import type { ReactNode } from "react";

import { Footer } from "@/components/layout/footer";
import { Metadata } from "next";

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
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
}
