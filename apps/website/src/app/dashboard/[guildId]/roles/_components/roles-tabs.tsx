"use client";

import { useState, useCallback, Suspense } from "react";
import { Audiowide } from "next/font/google";
import { Plus, List, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ActiveMenus } from "./active-menus";
import { RoleBuilder } from "./role-builder";
import { NodeLoader } from "@/components/common/node-loader";

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
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-5 min-w-0">
        <TabsList variant="neon" className="w-full sm:w-auto flex min-w-0">
          <TabsTrigger
            variant="neon"
            value="active"
            className={cn(
              "flex-1 sm:flex-none flex items-center gap-2",
              audiowide.className
            )}
          >
            <List className="w-4 h-4" />
            Active Setups
          </TabsTrigger>
          <TabsTrigger
            variant="neon-purple"
            value="create"
            className={cn(
              "flex-1 sm:flex-none flex items-center gap-2",
              audiowide.className
            )}
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
      </div>

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
