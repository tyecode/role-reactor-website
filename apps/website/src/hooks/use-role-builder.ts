"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useParams } from "next/navigation";
import { useServerStore } from "@/store/use-server-store";
import { useEmojiStore } from "@/store/use-emoji-store";
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
  const [serverRoles, setServerRoles] = useState<DiscordRole[]>([]);
  const [serverChannels, setServerChannels] = useState<DiscordChannel[]>([]);
  const [selectedChannel, setSelectedChannel] = useState("");
  const [isLoadingRoles, setIsLoadingRoles] = useState(true);
  const [isLoadingChannels, setIsLoadingChannels] = useState(true);
  const [selectionMode, setSelectionMode] = useState("standard");
  const [isPremium, setIsPremium] = useState(false);
  const [isActivatingPremium, setIsActivatingPremium] = useState(false);

  // Debounced values
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

    setServerRoles([]);
    setServerChannels([]);
    setSelectedChannel("");
    setIsLoadingRoles(true);
    setIsLoadingChannels(true);

    const fetchData = async () => {
      try {
        const [rolesRes, channelsRes] = await Promise.all([
          fetch(`/api/guilds/${guildId}/roles`),
          fetch(`/api/guilds/${guildId}/channels`),
        ]);

        if (rolesRes.ok) {
          const roles = await rolesRes.json();
          setServerRoles(
            Array.isArray(roles)
              ? roles.filter(
                  (r: DiscordRole) => r.name !== "@everyone" && !r.managed
                )
              : []
          );
        }

        if (channelsRes.ok) {
          const channels = await channelsRes.json();
          setServerChannels(
            Array.isArray(channels)
              ? channels.filter((ch: DiscordChannel) => ch.type === 0)
              : []
          );
        }

        // Fetch settings/premium status
        const settingsRes = await fetch(`/api/guilds/${guildId}/settings`);
        if (settingsRes.ok) {
          const settings = await settingsRes.json();
          setIsPremium(settings.isPremium?.pro || false);
        }
      } catch (err) {
        console.error("Failed to sync guild data:", err);
      } finally {
        setIsLoadingRoles(false);
        setIsLoadingChannels(false);
      }
    };

    fetchData();
    fetchEmojis(guildId);
  }, [guildId, fetchEmojis]);

  useEffect(() => {
    if (serverRoles.length > 0) {
      setReactions((prev) =>
        prev.map((r) => {
          if (!r.roleId && r.roleName) {
            const matched = serverRoles.find((sr) => sr.name === r.roleName);
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
        setIsPremium(true);
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
  }, [guildId, isActivatingPremium]);

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
    setIsActivatingPremium,
    setIsPremium,
    handleActivatePremium,
  };
}
