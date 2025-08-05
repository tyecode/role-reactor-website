import { Hero } from "@/app/(home)/components/hero";
import { Features } from "@/app/(home)/components/features";
import { FooterCTA } from "@/app/(home)/components/footer-cta";
import { links } from "@/constants/links";

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Role Reactor",
    description:
      "Role Reactor is a powerful Discord bot for automated role management. Set up reaction roles instantly, manage permissions, and enhance your Discord server with the most effective role assignment system.",
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
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "150",
    },
    featureList: [
      "Discord bot for role management",
      "Automated role assignment",
      "Reaction-based role system",
      "Easy setup with slash commands",
      "User-friendly Discord bot interface",
      "Secure permission handling",
      "Customizable role messages",
      "Free Discord bot",
      "Role management automation",
    ],
    keywords:
      "discord bot, discord bots, role management, reaction roles, discord automation, free discord bot, discord role bot",
    applicationSubCategory: "Role Management Bot",
    softwareVersion: "1.0.0",
    downloadUrl: links.inviteBot,
    installUrl: links.inviteBot,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-blue-900">
        <Hero />
        <Features />
        <FooterCTA />
      </main>
    </>
  );
}
