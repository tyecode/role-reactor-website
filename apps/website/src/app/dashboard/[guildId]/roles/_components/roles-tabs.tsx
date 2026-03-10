"use client";

import { useState, useCallback, Suspense } from "react";
import { Plus, List, Pencil } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ActiveMenus } from "./active-menus";
import { RoleBuilder } from "./role-builder";
import { NodeLoader } from "@/components/common/node-loader";

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
  }>;
}

function RolesPageSkeleton() {
  return (
    <NodeLoader title="Loading Roles" subtitle="Synchronizing role data..." />
  );
}

export function RolesTabs({ guildId }: { guildId: string }) {
  const [activeTab, setActiveTab] = useState("active");
  const [editData, setEditData] = useState<EditData | null>(null);

  const handleEdit = useCallback((data: EditData) => {
    setEditData(data);
    setActiveTab("create");
  }, []);

  const handleCancelEdit = useCallback(() => {
    setEditData(null);
    setActiveTab("active");
  }, []);

  const handleSaveComplete = useCallback(() => {
    setEditData(null);
    setActiveTab("active");
  }, []);

  const isEditing = editData !== null;

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList variant="neon" className="mb-4 w-full md:w-auto">
        <TabsTrigger
          variant="neon"
          value="active"
          className="flex items-center gap-2"
        >
          <List className="w-4 h-4" />
          Active Setups
        </TabsTrigger>
        <TabsTrigger
          variant="neon"
          value="create"
          className="flex items-center gap-2"
        >
          {isEditing ? (
            <>
              <Pencil className="w-4 h-4" />
              Edit Setup
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Create Setup
            </>
          )}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="active" className="mt-0">
        <Suspense fallback={<RolesPageSkeleton />}>
          <ActiveMenus guildId={guildId} onEdit={handleEdit} />
        </Suspense>
      </TabsContent>

      <TabsContent value="create" className="mt-0">
        <Suspense fallback={<RolesPageSkeleton />}>
          <RoleBuilder
            guildId={guildId}
            editData={editData}
            onCancelEdit={handleCancelEdit}
            onSaveComplete={handleSaveComplete}
          />
        </Suspense>
      </TabsContent>
    </Tabs>
  );
}
