"use client";

import { useState, useEffect, Suspense, lazy } from "react";
import { useSearchParams } from "next/navigation";
import { BotInviteCard } from "@/app/dashboard/_components/bot-invite-card";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { PageHeader } from "@/app/dashboard/_components/page-header";
import { Button } from "@/components/ui/button";
import { NodeLoader } from "@/components/common/node-loader";

const RolesTabs = lazy(() =>
  import("./_components/roles-tabs").then((mod) => ({ default: mod.RolesTabs }))
);

const RoleBuilder = lazy(() =>
  import("./_components/role-builder").then((mod) => ({ default: mod.RoleBuilder }))
);

interface EditData {
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
    <NodeLoader
      title="Loading Roles"
      subtitle="Synchronizing role data..."
    />
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
  const searchParams = useSearchParams();
  const [view, setView] = useState<"list" | "create" | "edit">("list");
  const [editData, setEditData] = useState<EditData | null>(null);

  // Check for edit mode from search params
  useEffect(() => {
    const editParam = searchParams.get("edit");
    if (editParam) {
      try {
        const data = JSON.parse(decodeURIComponent(editParam));
        setEditData(data);
        setView("edit");
      } catch (e) {
        console.error("Failed to parse edit data:", e);
      }
    }
  }, [searchParams]);

  const handleEdit = (data: EditData) => {
    setEditData(data);
    setView("edit");
  };

  const handleCreate = () => {
    setEditData(null);
    setView("create");
  };

  const handleBackToList = () => {
    setEditData(null);
    setView("list");
  };

  const handleSaveComplete = () => {
    setEditData(null);
    setView("list");
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

  // Full-page builder view
  if (view === "create" || view === "edit") {
    return (
      <div className="space-y-6 w-full">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackToList}
            className="shrink-0"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <PageHeader
            category="Engagement Management"
            categoryIcon={ShieldCheck}
            title={
              view === "edit" ? "Edit Reaction Role" : "Create Reaction Role"
            }
            description={
              view === "edit"
                ? "Update your existing role assignment system"
                : "Configure interactive role assignment systems for"
            }
            serverName={view === "edit" ? undefined : guildName}
          />
        </div>
        <Suspense fallback={<RolesPageSkeleton />}>
          <RoleBuilder
            guildId={guildId}
            editData={editData}
            onCancelEdit={handleBackToList}
            onSaveComplete={handleSaveComplete}
          />
        </Suspense>
      </div>
    );
  }

  // List view with tabs
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
