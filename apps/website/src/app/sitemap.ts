import type { MetadataRoute } from "next";
import { source } from "@/lib/source";
import { links } from "@/constants/links";
import { botFetchJson } from "@/lib/bot-fetch";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || links.home;

  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    // Temporarily hidden - sponsor page not ready
    // {
    //   url: `${baseUrl}/sponsor`,
    //   lastModified: new Date(),
    //   changeFrequency: "monthly" as const,
    //   priority: 0.9,
    // },
    {
      url: `${baseUrl}/docs`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/docs/getting-started/introduction`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/docs/getting-started/setup`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/docs/examples`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/docs/troubleshooting`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ];

  // Add documentation pages dynamically
  const docPages = source.getPages().map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: page.url.includes("getting-started") ? 0.8 : 0.6,
  }));

  // Add public leaderboards dynamically
  let leaderboardRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/leaderboards`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
  ];

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = await botFetchJson<any>(
      "/guilds/public-leaderboards?limit=1000",
      {
        next: { revalidate: 3600 }, // Cache fetched data for 1 hour to prevent API spam
        silent: true,
      }
    );

    if (data?.guilds && Array.isArray(data.guilds)) {
      const serverRoutes = data.guilds.map((guild: { id: string }) => ({
        url: `${baseUrl}/leaderboards/${guild.id}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));

      leaderboardRoutes = [...leaderboardRoutes, ...serverRoutes];
    }
  } catch (error) {
    console.error("Failed to fetch public leaderboards for sitemap", error);
  }

  return [...staticRoutes, ...docPages, ...leaderboardRoutes];
}
