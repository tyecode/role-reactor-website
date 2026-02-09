"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useParams } from "next/navigation";
import { useServerStore } from "@/store/use-server-store";
import { useEmojiStore } from "@/store/use-emoji-store";
import { useGuildStore } from "@/store/use-guild-store";
import { DiscordRole, DiscordEmoji, DiscordChannel } from "@/types/discord";
import { toast } from "sonner";

const EMPTY_EMOJIS: DiscordEmoji[] = [];

export interface ReactionMapping {
  emoji: string;
  roleName: string;
  roleId: string;
  roleColor: number;
}

export function useRoleBuilder() {
  const params = useParams();
  const guildId = params.guildId as string;
  const { guilds } = useServerStore();

  const fetchEmojis = useEmojiStore((state) => state.fetchEmojis);
  const serverEmojis = useEmojiStore(
    (state) => state.guildEmojis[guildId] || EMPTY_EMOJIS
  );
  const isLoadingEmojis = useEmojiStore(
    (state) => state.isLoading[guildId] || false
  );
  const emojiError = useEmojiStore((state) => state.errors[guildId] || null);
  const hasFetchedEmojis = useEmojiStore(
    (state) => state.lastFetched[guildId] !== undefined
  );

  const currentGuild = useMemo(
    () => guilds.find((g) => g.id === guildId),
    [guilds, guildId]
  );

  const guildIconUrl = useMemo(() => {
    if (currentGuild?.icon) {
      return `https://cdn.discordapp.com/icons/${guildId}/${currentGuild.icon}.png`;
    }
    return null;
  }, [currentGuild, guildId]);

  const [title, setTitle] = useState("Role Reactions");
  const [description, setDescription] = useState(
    "Choose which updates you'd like to receive by reacting below. You can toggle these roles at any time!"
  );
  const [color, setColor] = useState("#9b8bf0");
  const [reactions, setReactions] = useState<ReactionMapping[]>([]);
  const [selectedChannel, setSelectedChannel] = useState("");
  const [selectionMode, setSelectionMode] = useState("standard");
  const [isActivatingPremium, setIsActivatingPremium] = useState(false);

  const [debouncedTitle, setDebouncedTitle] = useState(title);
  const [debouncedDescription, setDebouncedDescription] = useState(description);
  const [debouncedColor, setDebouncedColor] = useState(color);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedTitle(title), 150);
    return () => clearTimeout(t);
  }, [title]);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedDescription(description), 150);
    return () => clearTimeout(t);
  }, [description]);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedColor(color), 100);
    return () => clearTimeout(t);
  }, [color]);

  const [openEmojiPicker, setOpenEmojiPicker] = useState<number | null>(null);

  const {
    guildData,
    fetchRoles,
    fetchChannels,
    fetchSettings,
    isLoading: storeLoading,
  } = useGuildStore();

  const serverRoles = useMemo(() => {
    const roles = guildData[guildId]?.roles || [];
    return roles.filter(
      (r: DiscordRole) => r.name !== "@everyone" && !r.managed
    );
  }, [guildData, guildId]);

  const serverChannels = useMemo(() => {
    const channels = guildData[guildId]?.channels || [];
    return channels.filter((ch: DiscordChannel) => ch.type === 0);
  }, [guildData, guildId]);

  const isPremium = guildData[guildId]?.settings?.isPremium?.pro || false;

  const isLoadingRoles =
    (storeLoading[guildId]?.roles ?? true) &&
    (guildData[guildId]?.roles === null ||
      guildData[guildId]?.roles === undefined);
  const isLoadingChannels =
    (storeLoading[guildId]?.channels ?? true) &&
    (guildData[guildId]?.channels === null ||
      guildData[guildId]?.channels === undefined);

  // Validation
  const validation = useMemo(() => {
    const hasTitle = title.trim().length > 0;
    const hasDescription = description.trim().length > 0;
    const hasReactions = reactions.length > 0;
    const hasChannel = selectedChannel.length > 0;
    const incompleteReactions = reactions.filter((r) => !r.roleId || !r.emoji);
    const isReady =
      hasTitle &&
      hasDescription &&
      hasReactions &&
      hasChannel &&
      incompleteReactions.length === 0;

    return {
      hasTitle,
      hasDescription,
      hasReactions,
      hasChannel,
      incompleteReactions,
      isReady,
    };
  }, [title, description, reactions, selectedChannel]);

  useEffect(() => {
    if (!guildId) return;

    fetchRoles(guildId);
    fetchChannels(guildId);
    fetchSettings(guildId);
    fetchEmojis(guildId);
  }, [guildId, fetchRoles, fetchChannels, fetchSettings, fetchEmojis]);

  useEffect(() => {
    if (serverRoles.length > 0) {
      setReactions((prev) =>
        prev.map((r) => {
          if (!r.roleId && r.roleName) {
            const matched = serverRoles.find(
              (sr: DiscordRole) => sr.name === r.roleName
            );
            if (matched) {
              return {
                ...r,
                roleId: matched.id,
                roleName: matched.name,
                roleColor: matched.color,
              };
            }
          }
          return r;
        })
      );
    }
  }, [serverRoles]);

  const addReaction = useCallback(() => {
    setReactions((prev) => [
      ...prev,
      { emoji: "🔘", roleName: "", roleId: "", roleColor: 0 },
    ]);
  }, []);

  const removeReaction = useCallback((index: number) => {
    setReactions((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const updateReaction = useCallback(
    (index: number, updates: Partial<ReactionMapping>) => {
      setReactions((prev) => {
        const next = [...prev];
        next[index] = { ...next[index], ...updates };
        return next;
      });
    },
    []
  );

  const handleActivatePremium = useCallback(async () => {
    if (isActivatingPremium) return;
    setIsActivatingPremium(true);
    try {
      const res = await fetch(`/api/guilds/${guildId}/premium/activate`, {
        method: "POST",
      });
      if (res.ok) {
        toast.success("Pro Engine activated successfully!");
        await fetchSettings(guildId, true);
        return true;
      } else {
        const error = await res.json();
        toast.error(error.message || "Failed to activate Pro Engine");
        return false;
      }
    } catch {
      toast.error("An unexpected error occurred");
      return false;
    } finally {
      setIsActivatingPremium(false);
    }
  }, [guildId, isActivatingPremium, fetchSettings]);

  return {
    guildId,
    currentGuild,
    guildIconUrl,
    title,
    setTitle,
    description,
    setDescription,
    color,
    setColor,
    reactions,
    setReactions,
    serverRoles,
    serverChannels,
    selectedChannel,
    setSelectedChannel,
    isLoadingRoles,
    isLoadingChannels,
    selectionMode,
    setSelectionMode,
    debouncedTitle,
    debouncedDescription,
    debouncedColor,
    validation,
    serverEmojis,
    isLoadingEmojis,
    emojiError,
    hasFetchedEmojis,
    fetchEmojis,
    openEmojiPicker,
    setOpenEmojiPicker,
    addReaction,
    removeReaction,
    updateReaction,
    isPremium,
    isActivatingPremium,
    handleActivatePremium,
  };
}
