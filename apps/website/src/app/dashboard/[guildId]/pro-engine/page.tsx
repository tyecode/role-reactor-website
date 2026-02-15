import { ProEngineView } from "./_components/pro-engine-view";
import { PageHeader } from "@/app/dashboard/_components/page-header";
import { Crown, Zap } from "lucide-react";
import { botFetchJson } from "@/lib/bot-fetch";
import { Suspense } from "react";
import { NodeLoader } from "@/components/common/node-loader";

import { getManageableGuilds } from "@/lib/server/guilds";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ guildId: string }>;
}) {
  const { guildId } = await params;
  const { guilds } = await getManageableGuilds();
  const guild = guilds.find((g) => g.id === guildId);

  return {
    title: guild ? `${guild.name} | Pro Engine` : "Pro Engine",
  };
}

interface GuildSettings {
  isPremium: {
    pro: boolean;
  };
  subscription?: {
    expiresAt: string;
    activatedAt: string;
    cancelled?: boolean;
    cancelledAt?: string;
    autoRenew?: boolean;
    cost?: number;
    period?: string;
  };
}

export default async function ProEnginePage({
  params,
  searchParams,
}: {
  params: Promise<{ guildId: string }>;
  searchParams: Promise<{ activate?: string }>;
}) {
  const { guildId } = await params;
  const { activate } = await searchParams;

  // Optimized server-side fetching
  const { guilds } = await getManageableGuilds();
  const activeGuild = guilds.find((g) => g.id === guildId);
  const guildName = activeGuild?.name || "this server";

  let premiumStatus: GuildSettings | null = null;
  try {
    premiumStatus = await botFetchJson<GuildSettings>(
      `/guilds/${guildId}/settings`,
      {
        next: { revalidate: 0 }, // Ensure fresh data on this page
      }
    );
  } catch (error) {
    console.error("Failed to fetch Pro Engine data:", error);
  }

  const isPremium = premiumStatus?.isPremium?.pro || false;

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-700 w-full min-w-0 overflow-x-hidden">
      <PageHeader
        category="System Configuration"
        categoryIcon={Crown}
        title="Pro Engine"
        badge={
          isPremium
            ? { icon: Zap, label: "PRO STATUS", variant: "yellow" }
            : undefined
        }
        description={
          isPremium
            ? "Advanced system capabilities active for"
            : "Unlock premium capabilities and granular control for"
        }
        serverName={guildName}
      />

      <Suspense
        fallback={
          <NodeLoader
            title="Loading Pro Engine"
            subtitle="Synchronizing system capabilities..."
          />
        }
      >
        <ProEngineView
          guildId={guildId}
          initialPremiumStatus={premiumStatus}
          showActivationInitially={activate === "true"}
        />
      </Suspense>
    </div>
  );
}
