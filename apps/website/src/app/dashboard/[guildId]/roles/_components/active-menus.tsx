"use client";

import { NodeLoader } from "@/components/common/node-loader";

import { useState, useCallback } from "react";
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
  ExternalLink,
  Hash,
  Activity,
  Clock,
  MessageSquareText,
  Trash2,
  AlertTriangle,
  Loader2,
  ChevronDown,
  Pencil,
} from "lucide-react";
import { CyberpunkBackground } from "@/components/common/cyberpunk-background";
import { cn } from "@/lib/utils";
import { audiowide } from "@/lib/fonts";
import { toast } from "@/lib/toast";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface RoleConfig {
  emoji: string;
  roleId: string;
  roleName: string;
  roleColor: number;
  roleIds?: string[];
  roleNames?: string[];
}

interface RoleMapping {
  messageId: string;
  channelId: string;
  channelName: string;
  embedTitle: string | null;
  embedDescription: string | null;
  embedColor: number | null;
  roles: Record<string, RoleConfig>;
  hideList: boolean;
  selectionMode?: string;
  createdAt: string;
  updatedAt: string;
}

function toHex(decimal: number) {
  if (!decimal || decimal === 0) return "#b9bbbe";
  return `#${decimal.toString(16).padStart(6, "0")}`;
}

function toEmbedColorHex(decimal: number | null) {
  if (!decimal) return "#9b8bf0";
  return `#${decimal.toString(16).padStart(6, "0")}`;
}

const ITEMS_PER_PAGE = 6;

import type { EditData } from "./roles-tabs";

export function ActiveMenus({
  guildId,
  onEdit,
}: {
  guildId: string;
  onEdit?: (data: EditData) => void;
}) {
  const [additionalMenus, setAdditionalMenus] = useState<RoleMapping[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMoreOverride, setHasMoreOverride] = useState<boolean | null>(null);
  const [deletedIds, setDeletedIds] = useState<Set<string>>(new Set());

  // Initial load — SWR caches page 1 data so it's available instantly on re-mount
  const { data, error, isLoading } = useSWR(
    `/api/guilds/${guildId}/role-reactions?page=1&limit=${ITEMS_PER_PAGE}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshWhenHidden: false,
      dedupingInterval: 30_000,
    }
  );

  const firstPageMenus: RoleMapping[] = data?.roleMappings || [];
  const total = (data?.total || 0) - deletedIds.size;
  const hasMore = hasMoreOverride ?? (data?.hasMore || false);

  // Merge page 1 + additional pages, excluding deleted items
  const roleMappings = [...firstPageMenus, ...additionalMenus].filter(
    (m) => !deletedIds.has(m.messageId)
  );

  const [deleteTarget, setDeleteTarget] = useState<RoleMapping | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(
        `/api/guilds/${guildId}/role-reactions/${deleteTarget.messageId}`,
        { method: "DELETE" }
      );
      if (res.ok) {
        // Track deleted ID so it's filtered out of both SWR data and additional pages
        setDeletedIds((prev) => new Set(prev).add(deleteTarget.messageId));
        setDeleteTarget(null);
        toast.success("Role reaction setup deleted successfully");
      } else {
        const error = await res.json();
        toast.error(error.error || "Failed to delete role reaction setup");
      }
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setIsDeleting(false);
    }
  };

  const loadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);
    try {
      const nextPage = currentPage + 1;
      const res = await fetch(
        `/api/guilds/${guildId}/role-reactions?page=${nextPage}&limit=${ITEMS_PER_PAGE}`
      );
      const pageData = await res.json();
      if (pageData?.roleMappings) {
        setAdditionalMenus((prev) => [...prev, ...pageData.roleMappings]);
        setHasMoreOverride(pageData.hasMore || false);
        setCurrentPage(nextPage);
      }
    } catch {
      // Silently fail
    } finally {
      setIsLoadingMore(false);
    }
  }, [guildId, currentPage, hasMore, isLoadingMore]);

  if (error) {
    return (
      <div className="absolute inset-0 z-40 flex items-center justify-center bg-background">
        <Card className="border-red-500/20 bg-red-500/5 max-w-lg w-full">
          <CardContent className="p-8 flex flex-col items-center text-center">
            <AlertTriangle className="size-8 text-red-500 mb-4 animate-pulse" />
            <p className="text-red-400 font-mono text-sm uppercase tracking-widest font-bold">
              Data Synchronization Failed
            </p>
            <p className="text-zinc-500 text-xs mt-2">
              Failed to load active setups. Please refresh the page or try again
              later.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="absolute inset-0 z-40 flex items-center justify-center bg-background">
        <NodeLoader
          title="Loading Dashboard"
          subtitle="Synchronizing your data..."
        />
      </div>
    );
  }

  if (roleMappings.length === 0) {
    return (
      <Card variant="cyberpunk" className="overflow-hidden relative group">
        <CyberpunkBackground
          gridSize={20}
          gridOpacity={0.03}
          gridColor="#06b6d4"
        />
        <CardContent className="p-12 flex flex-col items-center text-center relative z-10 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-2">
            <Activity className="w-8 h-8" />
          </div>
          <h3
            className={cn(
              "text-xl text-white tracking-wider",
              audiowide.className
            )}
          >
            No Active Setups
          </h3>
          <p className="text-zinc-400 text-sm max-w-sm">
            You haven&apos;t created any Reaction Role setups yet. Switch to the
            &quot;Create Setup&quot; tab to get started.
          </p>
        </CardContent>
      </Card>
    );
  }

  const deleteRoleEntries = deleteTarget
    ? Object.values(deleteTarget.roles || {})
    : [];

  return (
    <>
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open && !isDeleting) setDeleteTarget(null);
        }}
      >
        <DialogContent variant="glitch" className="sm:max-w-md">
          <div className="p-6 space-y-5">
            <DialogHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <DialogTitle
                    variant="glitch"
                    className="text-red-400! text-sm!"
                  >
                    Delete Setup
                  </DialogTitle>
                  <DialogDescription
                    variant="glitch"
                    className="text-zinc-500! text-[11px]!"
                  >
                    This action cannot be undone
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            {deleteTarget && (
              <>
                {/* Setup preview */}
                <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-white">
                      {deleteTarget.embedTitle || "Untitled Setup"}
                    </p>
                    <Badge
                      variant="outline"
                      className="text-[10px] border-white/5 bg-zinc-800/50 text-zinc-400"
                    >
                      {deleteRoleEntries.length}{" "}
                      {deleteRoleEntries.length === 1 ? "role" : "roles"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 mb-2.5">
                    <Hash className="w-3 h-3 text-zinc-600" />
                    {deleteTarget.channelName}
                  </div>
                  {deleteRoleEntries.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {deleteRoleEntries.slice(0, 4).map((role) => (
                        <Badge
                          key={role.emoji}
                          variant="outline"
                          className="border-white/5 bg-zinc-800/50 gap-1 py-0.5 text-[10px]"
                        >
                          <span>
                            {role.emoji.startsWith("<") ? "✦" : role.emoji}
                          </span>
                          <span style={{ color: toHex(role.roleColor) }}>
                            {role.roleName}
                          </span>
                        </Badge>
                      ))}
                      {deleteRoleEntries.length > 4 && (
                        <Badge
                          variant="outline"
                          className="border-white/5 bg-zinc-800/50 text-zinc-500 text-[10px]"
                        >
                          +{deleteRoleEntries.length - 4}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>

                {/* Warning */}
                <p className="text-xs text-zinc-500 leading-relaxed">
                  This will{" "}
                  <strong className="text-red-400">permanently delete</strong>{" "}
                  the role-reaction message from Discord and remove its data.
                  Members will no longer be able to self-assign roles from this
                  setup.
                </p>
              </>
            )}

            <DialogFooter className="gap-2 sm:gap-2 pt-1">
              <Button
                variant="ghost"
                size="sm"
                disabled={isDeleting}
                onClick={() => setDeleteTarget(null)}
                className="text-zinc-400 hover:text-white hover:bg-zinc-800"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                size="sm"
                disabled={isDeleting}
                onClick={handleDelete}
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Setup
                  </>
                )}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* Setup Grid */}
      <div className="space-y-4 pt-2">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {roleMappings.map((menu) => {
            const roleEntries = Object.values(menu.roles || {});
            const roleCount = roleEntries.length;
            const embedColorHex = toEmbedColorHex(menu.embedColor);

            return (
              <Card
                key={menu.messageId}
                variant="glass"
                className="relative group overflow-hidden"
              >
                {/* Colored accent bar */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
                  style={{ backgroundColor: embedColorHex }}
                />

                <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                <CardContent className="p-6 pl-5 relative z-10 flex flex-col h-full">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="space-y-1.5 flex-1 min-w-0">
                      {menu.embedTitle ? (
                        <h4
                          className="text-sm font-semibold text-white truncate"
                          title={menu.embedTitle}
                        >
                          <MessageSquareText className="w-3.5 h-3.5 inline mr-1.5 opacity-50" />
                          {menu.embedTitle}
                        </h4>
                      ) : (
                        <h4 className="text-sm font-medium text-zinc-500 italic">
                          <MessageSquareText className="w-3.5 h-3.5 inline mr-1.5 opacity-30" />
                          Untitled Setup
                        </h4>
                      )}
                      <div className="flex items-center gap-3 flex-wrap">
                        <div className="flex items-center gap-1.5 text-[10px] text-zinc-400">
                          <Hash className="w-3 h-3 text-cyan-400" />
                          <span>{menu.channelName}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-zinc-500">
                          <Clock className="w-3 h-3" />
                          {menu.createdAt &&
                          !isNaN(new Date(menu.createdAt).getTime())
                            ? new Date(menu.createdAt).toLocaleString("en-GB", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "Unknown"}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-3">
                      {menu.selectionMode === "unique" ? (
                        <Badge
                          variant="accent"
                          className="bg-amber-500/10 text-amber-400 border-amber-500/20"
                        >
                          Unique
                        </Badge>
                      ) : (
                        <Badge
                          variant="accent"
                          className="bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
                        >
                          Toggle
                        </Badge>
                      )}
                      <Badge
                        variant="accent"
                        className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                      >
                        {roleCount} {roleCount === 1 ? "Role" : "Roles"}
                      </Badge>
                    </div>
                  </div>

                  {/* Role chips */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {roleEntries.slice(0, 6).map((role) => (
                      <Badge
                        key={role.emoji}
                        variant="outline"
                        className="border-white/10 bg-black/30 gap-1.5 py-1"
                      >
                        <span className="text-sm leading-none">
                          {role.emoji.startsWith("<") ? "✦" : role.emoji}
                        </span>
                        <span
                          className="text-[10px] font-medium"
                          style={{ color: toHex(role.roleColor) }}
                        >
                          {role.roleName}
                        </span>
                      </Badge>
                    ))}
                    {roleCount > 6 && (
                      <Badge
                        variant="outline"
                        className="border-white/10 bg-black/30 text-zinc-500"
                      >
                        +{roleCount - 6} more
                      </Badge>
                    )}
                  </div>

                  {/* Action bar */}
                  <div className="flex gap-2 pt-3 mt-auto border-t border-white/5">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-white/10 hover:bg-white/5"
                      onClick={() =>
                        window.open(
                          `https://discord.com/channels/${guildId}/${menu.channelId}/${menu.messageId}`,
                          "_blank"
                        )
                      }
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View in Discord
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/10 hover:bg-cyan-500/5 hover:border-cyan-500/20 hover:text-cyan-400 transition-colors"
                      onClick={() => {
                        if (!onEdit) return;
                        const roles = menu.roles || {};
                        const reactions = Object.entries(roles).map(
                          ([emoji, config]) => {
                            const c = config as RoleConfig;
                            return {
                              emoji,
                              roleId: c.roleId ?? "",
                              roleName: c.roleName ?? "",
                              roleColor: c.roleColor ?? 0,
                              roleIds:
                                c.roleIds ?? (c.roleId ? [c.roleId] : []),
                              roleNames:
                                c.roleNames ?? (c.roleName ? [c.roleName] : []),
                              roleColors:
                                c.roleColor != null
                                  ? (c.roleIds ?? [c.roleId]).map(
                                      () => c.roleColor ?? 0
                                    )
                                  : [],
                            };
                          }
                        );
                        onEdit({
                          messageId: menu.messageId,
                          title: menu.embedTitle || "Role Reactions",
                          description:
                            menu.embedDescription || "React to get a role!",
                          color: toEmbedColorHex(menu.embedColor),
                          hideList: menu.hideList || false,
                          selectionMode: menu.selectionMode || "standard",
                          channelId: menu.channelId,
                          channelName: menu.channelName,
                          reactions,
                        });
                      }}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/10 hover:bg-red-500/5 hover:border-red-500/20 hover:text-red-400 transition-colors"
                      onClick={() => setDeleteTarget(menu)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {hasMore && (
          <div className="flex justify-center pt-2">
            <Button
              variant="outline"
              size="sm"
              disabled={isLoadingMore}
              className="border-white/10 hover:bg-white/5 text-zinc-400 hover:text-white gap-2"
              onClick={loadMore}
            >
              {isLoadingMore ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  Show More ({total - roleMappings.length} remaining)
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
