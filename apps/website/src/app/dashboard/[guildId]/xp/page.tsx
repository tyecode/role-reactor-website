import { XPView } from "./_components/xp-view";
import { Suspense } from "react";
import { Trophy } from "lucide-react";
import { PageHeader } from "@/app/dashboard/_components/page-header";
import { NodeLoader } from "@/components/common/node-loader";

function XPPageSkeleton() {
  return (
    <NodeLoader
      title="Loading XP Data"
      subtitle="Synchronizing leaderboard..."
    />
  );
}

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
    title: guild ? `${guild.name} | XP System` : "XP System",
  };
}

export default async function XPPage({
  params,
}: {
  params: Promise<{ guildId: string }>;
}) {
  const { guildId } = await params;

  // Reuse the optimized server utility for guild data
  const { guilds } = await getManageableGuilds();
  const activeGuild = guilds.find((g) => g.id === guildId);
  const guildName = activeGuild?.name || "this server";

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-700 w-full min-w-0 overflow-x-hidden">
      <PageHeader
        category="Engagement Management"
        categoryIcon={Trophy}
        title="XP System"
        description="Monitor community activity and manage leveling rewards for"
        serverName={guildName}
      />

      <Suspense fallback={<XPPageSkeleton />}>
        <XPView guildId={guildId} />
      </Suspense>
    </div>
  );
}
