import { Hero } from "@/app/(home)/_components/hero";
import { Features } from "@/app/(home)/_components/features";
import { SocialProof } from "@/app/(home)/_components/social-proof";
import { FooterCTA } from "@/app/(home)/_components/footer-cta";
import { AdBlock } from "@/components/adsense/ad-block";
import { links } from "@/constants/links";
import { botFetchJson } from "@/lib/bot-fetch";

export default async function HomePage() {
  // Fetch command usage stats from the bot API
  let totalExecutions = 0;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = await botFetchJson<any>("/commands/usage", {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    totalExecutions = data.summary?.totalExecutions || 0;
  } catch (error) {
    console.error("Failed to fetch command stats:", error);
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Role Reactor Bot",
    description:
      "A comprehensive Discord bot for self-assignable roles through reactions. Features temporary roles, scheduled assignments, welcome/goodbye systems, XP tracking, AI avatar generation, poll system, voice permissions, and more.",
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
      name: "qodinger",
      email: "tyecoder@gmail.com",
      url: "https://github.com/qodinger",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "150",
    },
    featureList: [
      "Self-assignable roles through reactions",
      "Temporary roles with auto-expiration",
      "Scheduled role assignments (one-time and recurring)",
      "Welcome system with customizable messages",
      "Goodbye system with customizable placeholders",
      "XP system with levels and leaderboards",
      "AI-powered avatar generation",
      "Native Discord poll system",
      "8ball game for fun and entertainment",
      "Voice channel permission enforcement",
      "Role categories and organization",
      "Custom emoji support",
      "Bulk operations for role management",
    ],
    keywords:
      "discord bot, discord bots, role management, reaction roles, temporary roles, scheduled roles, welcome system, goodbye system, XP system, AI avatar generation, poll system, discord role bot, easy setup, community management, server roles",
    applicationSubCategory: "Role Management Bot",
    softwareVersion: "1.4.0",
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
        <div className="max-w-fd-container mx-auto px-4">
          <AdBlock slot="home_between_sections" className="mb-8" />
        </div>
        <SocialProof totalExecutions={totalExecutions} />
        <FooterCTA />
      </main>
    </>
  );
}
