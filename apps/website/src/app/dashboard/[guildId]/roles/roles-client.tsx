"use client";

import { Suspense } from "react";
import { BotInviteCard } from "@/app/dashboard/_components/bot-invite-card";
import { ShieldCheck } from "lucide-react";
import { PageHeader } from "@/app/dashboard/_components/page-header";
import { NodeLoader } from "@/components/common/node-loader";
import { RolesTabs } from "./_components/roles-tabs";

function RolesPageSkeleton() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/80 backdrop-blur-sm">
      <NodeLoader title="Loading Roles" subtitle="Synchronizing role data..." />
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
  const handleEdit = () => {
    // Handled by tabs component
  };

  const handleCreate = () => {
    // Handled by tabs component
  };

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
    <div className="space-y-6 w-full">
      <PageHeader
        category="Engagement Management"
        categoryIcon={ShieldCheck}
        title="Reaction Roles"
        description="Configure interactive role assignment systems for"
        serverName={guildName}
      />
      <Suspense fallback={<RolesPageSkeleton />}>
        <RolesTabs
          guildId={guildId}
          onEdit={handleEdit}
          onCreate={handleCreate}
        />
      </Suspense>
    </div>
  );
}
