"use client";

import { useEffect, Suspense } from "react";
import { Audiowide } from "next/font/google";
import { Plus, List } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ActiveMenus } from "./active-menus";
import { NodeLoader } from "@/components/common/node-loader";
import { useProEngineStore } from "@/store/use-pro-engine-store";

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export interface EditData {
  messageId: string;
  title: string;
  description: string;
  color: string;
  hideList: boolean;
  selectionMode: string;
  channelId: string;
  channelName?: string;
  reactions: Array<{
    emoji: string;
    roleId: string;
    roleName: string;
    roleColor: number;
    roleIds?: string[];
    roleNames?: string[];
    roleColors?: number[];
  }>;
}

function RolesPageSkeleton() {
  return (
    <NodeLoader title="Loading Roles" subtitle="Synchronizing role data..." />
  );
}

export function RolesTabs({
  guildId,
  onEdit,
  onCreate,
}: {
  guildId: string;
  onEdit: (data: EditData) => void;
  onCreate: () => void;
}) {
  const { fetchSettings } = useProEngineStore();

  useEffect(() => {
    if (guildId) {
      fetchSettings(guildId);
    }
  }, [guildId, fetchSettings]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <List className="w-4 h-4 text-zinc-500" />
          <span className={cn("text-sm font-bold", audiowide.className)}>
            ACTIVE SETUPS
          </span>
        </div>
        <Button
          variant="cyber"
          size="sm"
          onClick={onCreate}
          className={cn("h-9 px-4", audiowide.className)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Setup
        </Button>
      </div>

      <Suspense fallback={<RolesPageSkeleton />}>
        <ActiveMenus guildId={guildId} onEdit={onEdit} />
      </Suspense>
    </div>
  );
}
