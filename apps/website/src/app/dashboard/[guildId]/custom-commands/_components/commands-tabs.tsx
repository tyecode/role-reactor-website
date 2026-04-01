"use client";

import { useState, useCallback, useEffect, lazy } from "react";
import { Plus, List, Pencil, RefreshCw, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { audiowide } from "@/lib/fonts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ActiveCommands } from "./active-commands";
import { PremiumGuard } from "@/app/dashboard/_components/premium-guard";
import { useProEngineStore } from "@/store/use-pro-engine-store";
import { toast } from "sonner";
import type { CustomCommand } from "@/types/custom-commands";

const CommandForm = lazy(() =>
  import("./command-form").then((mod) => ({ default: mod.CommandForm }))
);

export function CommandsTabs({ guildId }: { guildId: string }) {
  const [activeTab, setActiveTab] = useState("active");
  const [editData, setEditData] = useState<CustomCommand | null>(null);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [isActivating, setIsActivating] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const { fetchSettings, settingsCache } = useProEngineStore();
  const isPremium = settingsCache[guildId]?.isPremium?.pro ?? false;

  useEffect(() => {
    if (guildId) fetchSettings(guildId);
  }, [guildId, fetchSettings]);

  const handleEdit = useCallback((command: CustomCommand) => {
    setEditData(command);
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

  const handleActivatePremium = async () => {
    setIsActivating(true);
    try {
      const res = await fetch(`/api/guilds/${guildId}/premium/activate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featureId: "pro_engine" }),
      });
      if (res.ok) {
        await fetchSettings(guildId, true);
        setShowPremiumModal(false);
      }
    } finally {
      setIsActivating(false);
    }
  };

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      const res = await fetch(`/api/guilds/${guildId}/custom-commands/sync`, {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Commands synced");
      } else {
        toast.error(data.error || "Failed to sync commands");
      }
    } catch {
      toast.error("Failed to sync commands");
    } finally {
      setIsSyncing(false);
    }
  };

  const isEditing = editData !== null;

  return (
    <>
      <PremiumGuard
        open={showPremiumModal}
        onOpenChange={setShowPremiumModal}
        onActivate={handleActivatePremium}
        isActivating={isActivating}
        title="UNLOCK CUSTOM COMMANDS"
        description="Create your own server-specific slash commands with custom responses and rich embeds."
        features={[
          "Unlimited custom slash commands",
          "Text & rich embed responses",
          "Variable substitution ({user}, {server})",
          "Native Discord command menu integration",
        ]}
      />

      {!isPremium ? (
        <div
          className="relative w-full rounded-xl border border-dashed border-zinc-700/50 p-12 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-cyan-500/50 transition-colors"
          onClick={() => setShowPremiumModal(true)}
        >
          <div className="text-center space-y-2">
            <p className="text-zinc-400 text-sm font-medium">
              Custom Commands requires Pro Engine
            </p>
            <p className="text-zinc-600 text-xs">
              Click to unlock with Pro Engine
            </p>
          </div>
        </div>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-5 min-w-0 px-1">
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
                Active Commands
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
                    Edit Command
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Create Command
                  </>
                )}
              </TabsTrigger>
            </TabsList>

            {activeTab === "active" && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleSync}
                disabled={isSyncing}
                className="border-zinc-700/50 text-zinc-400 hover:text-white"
              >
                {isSyncing ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <RefreshCw className="w-4 h-4 mr-2" />
                )}
                Sync Commands
              </Button>
            )}
          </div>

          <TabsContent value="active" className="mt-0">
            <ActiveCommands guildId={guildId} onEdit={handleEdit} />
          </TabsContent>

          <TabsContent value="create" className="mt-0">
            <CommandForm
              guildId={guildId}
              editData={editData}
              onCancelEdit={handleCancelEdit}
              onSaveComplete={handleSaveComplete}
            />
          </TabsContent>
        </Tabs>
      )}
    </>
  );
}
