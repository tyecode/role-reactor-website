"use client";

import { useParams } from "next/navigation";
import { XPView } from "@/components/dashboard/xp/xp-view";
import { Suspense } from "react";
import { Trophy } from "lucide-react";
import { useServerStore } from "@/store/use-server-store";
import { PageHeader } from "@/components/dashboard/page-header";
import { NodeLoader } from "@/components/common/node-loader";

function XPPageSkeleton() {
  return (
    <NodeLoader
      title="Syncing XP Nodes"
      subtitle="Retrieving_Leaderboard_Data..."
    />
  );
}

export default function XPPage() {
  const params = useParams();
  const guildId = params.guildId as string;
  const { guilds } = useServerStore();
  const activeGuild = guilds.find((g) => g.id === guildId);

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-700 w-full min-w-0 overflow-x-hidden">
      <PageHeader
        category="Rankings & Rewards"
        categoryIcon={Trophy}
        title="XP System"
        description="Track community engagement and manage leveling rewards for"
        serverName={activeGuild?.name || "Target Node"}
      />

      <Suspense fallback={<XPPageSkeleton />}>
        <XPView guildId={guildId} />
      </Suspense>
    </div>
  );
}
