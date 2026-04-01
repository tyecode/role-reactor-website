"use client";

import { useState } from "react";
import useSWR from "swr";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Trash2,
  AlertTriangle,
  Loader2,
  Pencil,
  ToggleLeft,
  ToggleRight,
  Terminal,
  Copy,
  Server,
} from "lucide-react";
import { NodeLoader } from "@/components/common/node-loader";
import { cn } from "@/lib/utils";
import { audiowide } from "@/lib/fonts";
import { useCustomCommandsStore } from "@/store/use-custom-commands-store";
import type { CustomCommand } from "@/types/custom-commands";
import { toast } from "sonner";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

interface DiscordGuild {
  id: string;
  name: string;
  icon: string | null;
}

export function ActiveCommands({
  guildId,
  onEdit,
}: {
  guildId: string;
  onEdit: (command: CustomCommand) => void;
}) {
  const {
    data,
    error,
    isLoading,
    mutate: _mutate,
  } = useSWR(
    `/api/guilds/${guildId}/custom-commands?page=1&limit=50`,
    fetcher,
    { revalidateOnFocus: false, dedupingInterval: 30_000 }
  );

  const { data: guildsData, isLoading: guildsLoading } = useSWR(
    "/api/discord/guilds",
    fetcher,
    { revalidateOnFocus: false, dedupingInterval: 60_000 }
  );

  const { removeCommand, updateCommand } = useCustomCommandsStore();
  const [deleteTarget, setDeleteTarget] = useState<CustomCommand | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [deletedIds, setDeletedIds] = useState<Set<string>>(new Set());

  const [duplicateTarget, setDuplicateTarget] = useState<CustomCommand | null>(
    null
  );
  const [targetGuildId, setTargetGuildId] = useState<string>("");
  const [isDuplicating, setIsDuplicating] = useState(false);

  const commands: CustomCommand[] = (data?.commands ?? []).filter(
    (c: CustomCommand) => !deletedIds.has(c.commandId)
  );

  const availableGuilds: DiscordGuild[] = (guildsData ?? []).filter(
    (g: DiscordGuild) => g.id !== guildId
  );

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(
        `/api/guilds/${guildId}/custom-commands/${deleteTarget.commandId}`,
        { method: "DELETE" }
      );
      if (res.ok) {
        setDeletedIds((prev) => new Set(prev).add(deleteTarget.commandId));
        removeCommand(guildId, deleteTarget.commandId);
        toast.success(`/${deleteTarget.name} deleted`);
        setDeleteTarget(null);
      } else {
        const err = await res.json().catch(() => ({}));
        toast.error(err.error || "Failed to delete command");
      }
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggle = async (command: CustomCommand) => {
    setTogglingId(command.commandId);
    const newEnabled = !command.enabled;
    updateCommand(guildId, command.commandId, { enabled: newEnabled });
    try {
      const res = await fetch(
        `/api/guilds/${guildId}/custom-commands/${command.commandId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ enabled: newEnabled }),
        }
      );
      if (!res.ok) {
        updateCommand(guildId, command.commandId, { enabled: !newEnabled });
        toast.error("Failed to update command status");
      }
    } catch {
      updateCommand(guildId, command.commandId, { enabled: !newEnabled });
    } finally {
      setTogglingId(null);
    }
  };

  const handleDuplicate = async () => {
    if (!duplicateTarget || !targetGuildId) return;
    setIsDuplicating(true);
    try {
      const res = await fetch(
        `/api/guilds/${guildId}/custom-commands/${duplicateTarget.commandId}/duplicate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ targetGuildId }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || `/${duplicateTarget.name} duplicated`);
        setDuplicateTarget(null);
        setTargetGuildId("");
      } else {
        toast.error(data.error || "Failed to duplicate command");
      }
    } catch {
      toast.error("Failed to duplicate command");
    } finally {
      setIsDuplicating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <NodeLoader
          title="Loading Commands"
          subtitle="Fetching your custom commands..."
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3 text-zinc-500">
        <AlertTriangle className="w-8 h-8 text-red-400" />
        <p className="text-sm">Failed to load custom commands</p>
      </div>
    );
  }

  if (commands.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3 text-zinc-500 border border-dashed border-zinc-800 rounded-xl">
        <Terminal className="w-10 h-10 text-zinc-700" />
        <p className="text-sm font-medium">No custom commands yet</p>
        <p className="text-xs text-zinc-600">
          Create your first command using the &ldquo;Create Command&rdquo; tab
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {commands.map((command) => (
          <Card
            key={command.commandId}
            className={cn(
              "border-zinc-800/50 bg-zinc-900/30 transition-opacity",
              !command.enabled && "opacity-50"
            )}
          >
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={cn(
                        "text-cyan-400 font-bold text-sm",
                        audiowide.className
                      )}
                    >
                      /{command.name}
                    </span>
                    <Badge
                      variant={command.type === "embed" ? "accent" : "outline"}
                      className="text-[9px] uppercase tracking-wider font-black h-4 px-1.5"
                    >
                      {command.type}
                    </Badge>
                    {!command.enabled && (
                      <Badge
                        variant="outline"
                        className="text-[9px] uppercase tracking-wider font-black h-4 px-1.5 border-zinc-700 text-zinc-500"
                      >
                        Disabled
                      </Badge>
                    )}
                  </div>
                  <p className="text-zinc-500 text-xs mt-1 truncate">
                    {command.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 px-2 text-xs text-zinc-400 hover:text-white"
                  onClick={() => onEdit(command)}
                >
                  <Pencil className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 px-2 text-xs text-zinc-400 hover:text-white"
                  disabled={togglingId === command.commandId}
                  onClick={() => handleToggle(command)}
                >
                  {togglingId === command.commandId ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : command.enabled ? (
                    <ToggleRight className="w-3 h-3 mr-1 text-cyan-400" />
                  ) : (
                    <ToggleLeft className="w-3 h-3 mr-1" />
                  )}
                  {command.enabled ? "Enabled" : "Disabled"}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 px-2 text-xs text-zinc-400 hover:text-white"
                  onClick={() => setDuplicateTarget(command)}
                >
                  <Copy className="w-3 h-3 mr-1" />
                  Duplicate
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 px-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-950/30 ml-auto"
                  onClick={() => setDeleteTarget(command)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Delete Dialog */}
      <Dialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <DialogContent className="bg-zinc-900 border-zinc-800">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-400">
              <AlertTriangle className="w-5 h-5" />
              Delete Command
            </DialogTitle>
            <DialogDescription className="text-zinc-400">
              This will permanently delete{" "}
              <span className="text-cyan-400 font-bold">
                /{deleteTarget?.name}
              </span>{" "}
              and remove it from Discord. This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              variant="ghost"
              onClick={() => setDeleteTarget(null)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Trash2 className="w-4 h-4 mr-2" />
              )}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Duplicate Dialog */}
      <Dialog
        open={!!duplicateTarget}
        onOpenChange={(open) => {
          if (!open) {
            setDuplicateTarget(null);
            setTargetGuildId("");
          }
        }}
      >
        <DialogContent className="bg-zinc-900 border-zinc-800">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Copy className="w-5 h-5 text-cyan-400" />
              Duplicate Command
            </DialogTitle>
            <DialogDescription className="text-zinc-400">
              Copy{" "}
              <span className="text-cyan-400 font-bold">
                /{duplicateTarget?.name}
              </span>{" "}
              to another server you manage.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {guildsLoading ? (
              <div className="flex items-center gap-2 text-zinc-500 text-sm">
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading servers...
              </div>
            ) : availableGuilds.length === 0 ? (
              <p className="text-zinc-500 text-sm">
                No other servers available. Make sure the bot is in other
                servers and you have admin permissions.
              </p>
            ) : (
              <div className="space-y-2">
                <label className="text-xs text-zinc-400 uppercase tracking-wider">
                  Select Target Server
                </label>
                <Select value={targetGuildId} onValueChange={setTargetGuildId}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700">
                    <SelectValue placeholder="Choose a server..." />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-700 max-h-60">
                    {availableGuilds.map((guild: DiscordGuild) => (
                      <SelectItem key={guild.id} value={guild.id}>
                        <span className="flex items-center gap-2">
                          <Server className="w-4 h-4" />
                          {guild.name}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="ghost"
              onClick={() => {
                setDuplicateTarget(null);
                setTargetGuildId("");
              }}
              disabled={isDuplicating}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDuplicate}
              disabled={!targetGuildId || isDuplicating || guildsLoading}
            >
              {isDuplicating ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Copy className="w-4 h-4 mr-2" />
              )}
              Duplicate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
