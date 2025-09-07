import { Hero } from "@/app/(home)/components/hero";
import { Features } from "@/app/(home)/components/features";
import { SocialProof } from "@/app/(home)/components/social-proof";
import { FooterCTA } from "@/app/(home)/components/footer-cta";
import { links } from "@/constants/links";

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Role Reactor Bot",
    description:
      "A simple Discord bot for role management. Let members choose their own roles with reactions and welcome new members automatically. Free to use with basic features.",
    url: links.home,
    applicationCategory: "Discord Bot",
    operatingSystem: "Discord",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Person",
      name: "Tyecode",
      email: "tyecoder@gmail.com",
      url: "https://github.com/tyecode",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "150",
    },
    featureList: [
      "Basic role management with reactions",
      "Temporary roles that auto-expire",
      "Simple role scheduling",
      "Welcome new members automatically",
      "Basic XP system with leaderboards",
      "Fun 8ball game",
      "User information display",
      "Custom emoji support",
      "Role categories",
      "Free to use",
      "Easy setup",
      "Simple commands",
      "Basic features",
      "New bot with growing features",
    ],
    keywords:
      "discord bot, discord bots, role management, reaction roles, temporary roles, welcome system, XP system, free discord bot, discord role bot, easy setup, community management, server roles",
    applicationSubCategory: "Role Management Bot",
    softwareVersion: "0.4.1",
    downloadUrl: links.inviteBot,
    installUrl: links.inviteBot,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="min-h-screen">
        <Hero />
        <Features />
        <SocialProof />
        <FooterCTA />
      </main>
    </>
  );
}
