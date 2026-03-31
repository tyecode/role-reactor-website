"use client";

import { Suspense, lazy } from "react";
import { BotInviteCard } from "@/app/dashboard/_components/bot-invite-card";
import { ShieldCheck } from "lucide-react";
import { PageHeader } from "@/app/dashboard/_components/page-header";
import { NodeLoader } from "@/components/common/node-loader";

const RolesTabs = lazy(() =>
  import("./_components/roles-tabs").then((mod) => ({ default: mod.RolesTabs }))
);

function RolesPageSkeleton() {
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-background">
      <NodeLoader
        title="Loading Dashboard"
        subtitle="Synchronizing your data..."
      />
    </div>
  );
}

interface RolesClientProps {
  guildId: string;
  guildName: string;
  isInstalled: boolean;
}

export default function RolesClient({
  guildId,
  guildName,
  isInstalled,
}: RolesClientProps) {
  if (!isInstalled) {
    return (
      <div className="space-y-6 w-full">
        <PageHeader
          category="Engagement Management"
          categoryIcon={ShieldCheck}
          title="Reaction Roles"
          description="Configure interactive role assignment systems for"
          serverName={guildName}
        />
        <BotInviteCard guildId={guildId} />
      </div>
    );
  }

  return (
    <Suspense fallback={<RolesPageSkeleton />}>
      <div className="space-y-6 w-full">
        <PageHeader
          category="Engagement Management"
          categoryIcon={ShieldCheck}
          title="Reaction Roles"
          description="Configure interactive role assignment systems for"
          serverName={guildName}
        />
        <RolesTabs guildId={guildId} onEdit={() => {}} onCreate={() => {}} />
      </div>
    </Suspense>
  );
}
