"use client";

import { Suspense, lazy } from "react";
import { BotInviteCard } from "@/app/dashboard/_components/bot-invite-card";
import { Terminal } from "lucide-react";
import { PageHeader } from "@/app/dashboard/_components/page-header";
import { NodeLoader } from "@/components/common/node-loader";

const CommandsTabs = lazy(() =>
  import("./_components/commands-tabs").then((mod) => ({
    default: mod.CommandsTabs,
  }))
);

function CustomCommandsPageSkeleton() {
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-background">
      <NodeLoader
        title="Loading Dashboard"
        subtitle="Synchronizing your data..."
      />
    </div>
  );
}

interface CustomCommandsClientProps {
  guildId: string;
  guildName: string;
  isInstalled: boolean;
}

export default function CustomCommandsClient({
  guildId,
  guildName,
  isInstalled,
}: CustomCommandsClientProps) {
  if (!isInstalled) {
    return (
      <div className="space-y-6 w-full">
        <PageHeader
          category="Server Management"
          categoryIcon={Terminal}
          title="Custom Commands"
          description="Create server-specific slash commands for"
          serverName={guildName}
        />
        <BotInviteCard guildId={guildId} />
      </div>
    );
  }

  return (
    <Suspense fallback={<CustomCommandsPageSkeleton />}>
      <div className="space-y-6 w-full">
        <PageHeader
          category="Server Management"
          categoryIcon={Terminal}
          title="Custom Commands"
          description="Create server-specific slash commands for"
          serverName={guildName}
        />
        <CommandsTabs guildId={guildId} />
      </div>
    </Suspense>
  );
}
