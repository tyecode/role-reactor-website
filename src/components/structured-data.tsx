export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Role Reactor",
    description:
      "Powerful Discord bot for automated role management with reaction-based systems. Enhance your Discord server with seamless role assignment and management.",
    url: "https://rolereactor.xyz",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Discord",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    creator: {
      "@type": "Organization",
      name: "Role Reactor Team",
    },
    keywords: [
      "discord bot",
      "role management",
      "discord roles",
      "reaction roles",
      "discord automation",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      ratingCount: "100",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
