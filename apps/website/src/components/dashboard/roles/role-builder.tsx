"use client";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "fumadocs-ui/components/card";
import { useState, useEffect, useMemo, useRef } from "react";
import { useParams } from "next/navigation";
import { DiscordPreview } from "./discord-preview";
import { useServerStore } from "@/store/use-server-store";
import { useEmojiStore } from "@/store/use-emoji-store";
import { DiscordRole, DiscordEmoji, DiscordChannel } from "@/types/discord";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import {
  Plus,
  Trash2,
  Rocket,
  Shield,
  Info,
  Type,
  AlignLeft,
  Palette,
  ExternalLink,
  RotateCw,
  Settings2,
  Layers,
  MousePointer2,
  ShieldCheck,
  Zap,
  Sparkles,
  Hash,
} from "lucide-react";

const PRESET_COLORS = [
  { name: "Default", hex: "#9b8bf0" },
  { name: "Neon Blue", hex: "#00BFFF" },
  { name: "Matrix Green", hex: "#00FF00" },
  { name: "Cyber Red", hex: "#FF0040" },
  { name: "Electric Yellow", hex: "#FFFF00" },
  { name: "Quantum Purple", hex: "#8A2BE2" },
  { name: "Plasma Orange", hex: "#FF4500" },
  { name: "Synth Pink", hex: "#FF1493" },
  { name: "Hologram Cyan", hex: "#00FFFF" },
  { name: "Steel Brown", hex: "#8B4513" },
  { name: "Chrome Gray", hex: "#C0C0C0" },
];

function toHex(decimal: number) {
  if (!decimal || decimal === 0) return "#b9bbbe"; // Default Discord gray
  return `#${decimal.toString(16).padStart(6, "0")}`;
}

const EMPTY_EMOJIS: DiscordEmoji[] = [];

interface ReactionMapping {
  emoji: string;
  roleName: string;
  roleId: string;
  roleColor: number;
}

export function RoleBuilder() {
  const params = useParams();
  const guildId = params.guildId as string;
  const { guilds } = useServerStore();

  // Store integration with explicit selectors to ensure reactivity
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

  // Debounced values for performance-heavy preview
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

  const pickerRef = useRef<HTMLDivElement>(null);

  // Validation logic
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

  // Close picker when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setOpenEmojiPicker(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!guildId) return;

    // Reset with explicit loading state
    setServerRoles([]);
    setServerChannels([]);
    setSelectedChannel("");
    setIsLoadingRoles(true);
    setIsLoadingChannels(true);

    // Parallel fetch to avoid waterfalls
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

  // Format server emojis for EmojiMart
  const customEmojis = useMemo(() => {
    return serverEmojis.map((emoji) => ({
      id: emoji.identifier, // This is the full Discord identifier <:name:id>
      name: emoji.name,
      keywords: [emoji.name, emoji.id], // Adding the numeric ID to keywords for easy searching
      skins: [{ src: emoji.url }],
    }));
  }, [serverEmojis]);

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

  const addReaction = () => {
    setReactions([
      ...reactions,
      { emoji: "🔘", roleName: "", roleId: "", roleColor: 0 },
    ]);
  };

  const removeReaction = (index: number) => {
    setReactions(reactions.filter((_, i) => i !== index));
  };

  const updateReaction = (index: number, updates: Partial<ReactionMapping>) => {
    setReactions((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], ...updates };
      return next;
    });
  };

  if (isLoadingRoles) {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_520px] gap-6 items-start animate-in fade-in duration-700 pb-10">
        <div className="space-y-3 order-2 xl:order-1">
          <div className="flex items-center gap-2 mb-2 px-1">
            <div className="p-1.5 rounded-lg bg-zinc-800/50 border border-white/5">
              <div className="w-4 h-4" />
            </div>
            <div className="h-3 w-24 bg-zinc-800/50 rounded animate-pulse" />
          </div>

          <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-5 space-y-4 animate-pulse">
            <div className="space-y-2">
              <div className="h-3 w-20 bg-zinc-800/50 rounded" />
              <div className="h-10 w-full bg-zinc-950/50 rounded-xl" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-20 bg-zinc-800/50 rounded" />
              <div className="h-[140px] w-full bg-zinc-950/50 rounded-xl" />
            </div>
            <div className="space-y-3">
              <div className="h-3 w-20 bg-zinc-800/50 rounded" />
              <div className="h-10 w-full bg-zinc-950/50 rounded-xl" />
            </div>
          </div>

          <div className="space-y-4 animate-pulse">
            <div className="flex items-center justify-between px-1">
              <div className="h-3 w-32 bg-zinc-800/50 rounded" />
              <div className="h-8 w-24 bg-zinc-800/50 rounded-lg" />
            </div>
            <div className="bg-zinc-900/40 border border-white/5 rounded-2xl h-[100px]" />
          </div>

          <div className="h-12 w-full bg-zinc-800/30 rounded-lg border border-white/5 animate-pulse" />
        </div>

        <div className="space-y-4 order-1 xl:order-2 sticky top-24">
          <div className="h-3 w-40 bg-zinc-800/50 rounded animate-pulse ml-1" />
          <div className="bg-[#313338] border border-[#2b2d31] rounded-2xl h-[600px] w-full animate-pulse shadow-2xl opacity-50" />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_520px] gap-6 items-start animate-in fade-in duration-700 pb-10">
      {/* Configuration Form */}
      <div className="space-y-3 order-2 xl:order-1">
        <div className="flex items-center gap-2 px-1 mb-2">
          <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <Settings2 className="w-4 h-4 text-blue-400" />
          </div>
          <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest">
            Configuration
          </h3>
        </div>

        <Card
          className="bg-zinc-900/40 border-white/5 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl"
          title={undefined}
        >
          <CardContent className="p-4 space-y-3">
            <div className="space-y-2">
              <Label
                htmlFor="embed-title"
                className="text-[11px] text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-2"
              >
                <Type className="w-3 h-3 text-blue-400" />
                Embed Title
              </Label>
              <Input
                id="embed-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Rank Selection"
                className={cn(
                  "bg-zinc-950/50 border-white/10 h-10 px-4 rounded-xl focus:border-blue-500/50 transition-all font-medium",
                  !validation.hasTitle &&
                    title.length > 0 &&
                    "border-red-500/50"
                )}
              />
              {!validation.hasTitle && (
                <p className="text-[10px] text-red-400/80 font-medium px-1">
                  Title is required
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="embed-desc"
                className="text-[11px] text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-2"
              >
                <AlignLeft className="w-3 h-3 text-blue-400" />
                Description
              </Label>
              <textarea
                id="embed-desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell users what to do..."
                className={cn(
                  "w-full min-h-[140px] bg-zinc-950/50 border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-blue-500/50 transition-all resize-none font-medium placeholder:text-zinc-600",
                  !validation.hasDescription &&
                    description.length > 0 &&
                    "border-red-500/50"
                )}
              />
              {!validation.hasDescription && (
                <p className="text-[10px] text-red-400/80 font-medium px-1">
                  Description is required
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="accent-color"
                className="text-[11px] text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-2"
              >
                <Palette className="w-3 h-3 text-blue-400" />
                Embed Color
              </Label>
              <div className="flex gap-2">
                <Select
                  value={
                    PRESET_COLORS.find(
                      (c) => c.hex.toLowerCase() === color.toLowerCase()
                    )?.name || "Custom"
                  }
                  onValueChange={(val) => {
                    const preset = PRESET_COLORS.find((c) => c.name === val);
                    if (preset) setColor(preset.hex);
                  }}
                >
                  <SelectTrigger className="flex-1 bg-zinc-950/50 border-white/10 h-10 rounded-xl focus:ring-0 focus:border-blue-500/50">
                    <SelectValue>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full border border-white/20"
                          style={{ backgroundColor: color }}
                        />
                        {PRESET_COLORS.find(
                          (c) => c.hex.toLowerCase() === color.toLowerCase()
                        )?.name || "Custom Color"}
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-white/10 text-zinc-200 max-h-[300px]">
                    {PRESET_COLORS.map((c) => (
                      <SelectItem
                        key={c.name}
                        value={c.name}
                        className="focus:bg-blue-500/20 focus:text-blue-200"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full border border-white/20"
                            style={{ backgroundColor: c.hex }}
                          />
                          {c.name}
                        </div>
                      </SelectItem>
                    ))}
                    {!PRESET_COLORS.some(
                      (c) => c.hex.toLowerCase() === color.toLowerCase()
                    ) && (
                      <SelectItem value="Custom" disabled>
                        Custom Hex
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <Input
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-[100px] bg-zinc-950/50 border-white/10 h-10 px-3 font-mono uppercase rounded-xl focus:border-blue-500/50 text-[12px]"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="target-channel"
                className="text-[11px] text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-2"
              >
                <Hash className="w-3 h-3 text-blue-400" />
                Target Channel
              </Label>
              <Select
                value={selectedChannel}
                onValueChange={setSelectedChannel}
              >
                <SelectTrigger className="w-full bg-zinc-950/50 border-white/10 h-10 rounded-xl focus:ring-0 focus:border-blue-500/50 text-zinc-200">
                  <SelectValue placeholder="Select a channel..." />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-white/10 text-zinc-200 max-h-[300px]">
                  {serverChannels.length > 0 ? (
                    serverChannels.map((ch) => (
                      <SelectItem
                        key={ch.id}
                        value={ch.id}
                        className="focus:bg-blue-500/20 focus:text-blue-200"
                      >
                        <div className="flex items-center gap-2">
                          <Hash className="w-3.5 h-3.5 opacity-50" />
                          {ch.name}
                        </div>
                      </SelectItem>
                    ))
                  ) : (
                    <div className="p-2 text-[11px] text-zinc-500 italic text-center">
                      {isLoadingChannels
                        ? "Fetching channels..."
                        : "No text channels found"}
                    </div>
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Selection Mode - Premium Feature */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between px-1">
                <Label className="text-[11px] text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-3 h-3 text-amber-400 fill-amber-400/20" />
                  Selection Mode
                </Label>
                {selectionMode !== "standard" && (
                  <div className="flex items-center gap-1 bg-amber-500/10 px-2 rounded-full border border-amber-500/20">
                    <Zap className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                    <span className="text-[9px] font-black text-amber-400 uppercase tracking-tighter">
                      Premium
                    </span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  {
                    id: "standard",
                    label: "Toggle",
                    icon: Layers,
                    desc: "Multiple roles allowed. Click to Add/Remove.",
                    color: "blue",
                  },
                  {
                    id: "unique",
                    label: "Unique",
                    icon: MousePointer2,
                    desc: "Strictly one role allowed. Swaps on click.",
                    color: "amber",
                    premium: true,
                  },
                  {
                    id: "verify",
                    label: "Verify",
                    icon: ShieldCheck,
                    desc: "Opt-out mode. Click to remove role.",
                    color: "purple",
                    premium: true,
                  },
                ].map((mode) => (
                  <Button
                    key={mode.id}
                    variant="ghost"
                    size={"lg"}
                    onClick={() => setSelectionMode(mode.id)}
                    className={cn(
                      "flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all relative overflow-hidden group/btn h-16 hover:bg-white/[0.02] hover:text-zinc-300",
                      selectionMode === mode.id
                        ? mode.color === "blue"
                          ? "bg-blue-500/5 border-blue-500/40 text-blue-400 hover:bg-blue-500/5 hover:text-blue-400"
                          : mode.color === "amber"
                            ? "bg-amber-500/5 border-amber-500/40 text-amber-400 hover:bg-amber-500/5 hover:text-amber-400"
                            : "bg-purple-500/5 border-purple-500/40 text-purple-400 hover:bg-purple-500/5 hover:text-purple-400"
                        : "bg-zinc-950/20 border-white/5 text-zinc-500"
                    )}
                  >
                    {mode.premium && (
                      <div
                        className={cn(
                          "absolute -top-1 -right-1 p-1.5 opacity-0 group-hover/btn:opacity-40 transition-opacity",
                          selectionMode === mode.id && "opacity-40"
                        )}
                      ></div>
                    )}
                    <mode.icon className="w-4 h-4" />
                    <span className="text-[10px] font-bold">{mode.label}</span>
                  </Button>
                ))}
              </div>
              <p className="text-[10px] text-zinc-500/80 font-medium px-1 leading-relaxed">
                {selectionMode === "standard" &&
                  "Standard behavior: Reacting to an emoji adds the role, reacting again removes it."}
                {selectionMode === "unique" &&
                  "Users can only have one role from this group. Selecting a new one cancels the previous selection."}
                {selectionMode === "verify" &&
                  "Inverse mode: Useful for staff-only verification or roles that users should only be able to remove."}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Reaction Role Mappings */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
              <Shield className="w-3.5 h-3.5" />
              Role Mappings
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={addReaction}
              className="h-8 bg-white/5 border-white/10 hover:bg-white/10 text-[10px] font-black uppercase tracking-tighter rounded-lg transition-all"
            >
              <Plus className="w-3 h-3 mr-1.5" /> Add Mapping
            </Button>
          </div>

          <Card
            className="bg-zinc-900/40 border-white/5 backdrop-blur-xl rounded-2xl shadow-xl"
            title={undefined}
          >
            <CardContent className="p-2 space-y-1">
              {reactions.map((r, i) => (
                <div
                  key={i}
                  className="flex gap-3 items-center group p-3 rounded-xl hover:bg-white/[0.03] transition-colors"
                >
                  <div className="relative">
                    <button
                      onClick={() =>
                        setOpenEmojiPicker(openEmojiPicker === i ? null : i)
                      }
                      className="w-11 h-11 bg-zinc-950/50 border border-white/5 rounded-xl flex items-center justify-center transition-all hover:border-blue-500/30 shadow-inner group-hover:shadow-[0_0_15px_rgba(59,130,246,0.1)] p-0"
                    >
                      <div className="text-xl relative z-10 group-hover:scale-110 transition-transform flex items-center justify-center w-full h-full">
                        {r.emoji?.startsWith("<") ? (
                          <img
                            src={
                              serverEmojis.find((e) => e.identifier === r.emoji)
                                ?.url
                            }
                            alt=""
                            className="w-6 h-6 object-contain"
                          />
                        ) : (
                          <span>{r.emoji || "🔘"}</span>
                        )}
                      </div>
                    </button>

                    {openEmojiPicker === i && (
                      <div
                        ref={pickerRef}
                        className="absolute bottom-full left-0 mb-2 z-[100] animate-in fade-in slide-in-from-bottom-2 duration-200"
                        onKeyDown={(e) => e.stopPropagation()}
                      >
                        <div className="bg-[#1e1f22] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col w-full min-w-[320px]">
                          <div className="p-3 border-b border-white/5 bg-[#2b2d31] flex items-center justify-between gap-4">
                            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest px-1">
                              Emoji Picker
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                fetchEmojis(guildId, true);
                              }}
                              className={`h-7 w-7 rounded-lg hover:bg-white/5 text-zinc-500 hover:text-blue-400 transition-all ${isLoadingEmojis ? "animate-spin" : ""}`}
                              title="Refresh server emojis"
                              disabled={isLoadingEmojis}
                            >
                              <RotateCw className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                          <div className="flex-1">
                            {isLoadingEmojis || !hasFetchedEmojis ? (
                              <div className="h-[300px] flex items-center justify-center text-zinc-500 text-xs animate-pulse">
                                Fetching server emojis...
                              </div>
                            ) : (
                              <>
                                {serverEmojis.length === 0 && !emojiError && (
                                  <div className="bg-blue-500/10 border-b border-blue-500/10 p-2 flex items-center justify-between text-[10px]">
                                    <span className="text-blue-200 font-medium flex items-center gap-1.5">
                                      <Info className="w-3 h-3" />
                                      No server emojis found
                                    </span>
                                    <a
                                      href={`https://discord.com/channels/${guildId}/settings/emoji`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-1 text-blue-400 hover:text-white font-bold transition-colors"
                                    >
                                      Upload{" "}
                                      <ExternalLink className="w-2.5 h-2.5" />
                                    </a>
                                  </div>
                                )}
                                {emojiError && (
                                  <div className="bg-red-500/10 border-b border-red-500/10 p-2 text-[10px] text-red-300 flex items-center gap-2">
                                    <Info className="w-3 h-3" />
                                    {emojiError}
                                  </div>
                                )}
                                <Picker
                                  key={`${guildId}-${customEmojis.length}`}
                                  id={`role-reactor-v2-${guildId}`}
                                  data={data}
                                  onEmojiSelect={(emoji: {
                                    native?: string;
                                    id: string;
                                  }) => {
                                    // For custom emojis, ensure they belong to this guild
                                    if (emoji.id && !emoji.native) {
                                      const isFromServer = customEmojis.some(
                                        (e) =>
                                          e.id === emoji.id ||
                                          e.name === emoji.id
                                      );
                                      if (!isFromServer) return; // Prevent selection of ghost emojis
                                    }
                                    const val = emoji.native || emoji.id;
                                    updateReaction(i, { emoji: val });
                                    setOpenEmojiPicker(null);
                                  }}
                                  custom={
                                    customEmojis.length > 0
                                      ? [
                                          {
                                            id: `custom-${guildId}`,
                                            name: "Server Emojis",
                                            emojis: customEmojis,
                                          },
                                        ]
                                      : []
                                  }
                                  theme="dark"
                                  skinTonePosition="none"
                                  previewPosition="bottom"
                                  navPosition="bottom"
                                  autoFocus={true}
                                  perLine={9} // Increased to fill width better
                                  width="100%"
                                  categories={[
                                    ...(customEmojis && customEmojis.length > 0
                                      ? [`custom-${guildId}`]
                                      : []),
                                    "people",
                                    "nature",
                                    "foods",
                                    "activity",
                                    "places",
                                    "objects",
                                    "symbols",
                                    "flags",
                                  ]}
                                  categoryIcons={
                                    guildIconUrl
                                      ? {
                                          [`custom-${guildId}`]: {
                                            src: guildIconUrl,
                                          },
                                        }
                                      : undefined
                                  }
                                />
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <Select
                      value={
                        serverRoles.some((sr) => sr.id === r.roleId)
                          ? r.roleId
                          : ""
                      }
                      onValueChange={(val) => {
                        const role = serverRoles.find((sr) => sr.id === val);
                        if (role) {
                          updateReaction(i, {
                            roleId: role.id,
                            roleName: role.name,
                            roleColor: role.color,
                          });
                        }
                      }}
                    >
                      <SelectTrigger className="bg-transparent border-transparent hover:border-white/5 focus:ring-0 focus:border-blue-500/30 h-10 px-2 rounded-lg transition-all font-medium text-sm text-zinc-200">
                        <SelectValue
                          placeholder={
                            <div className="flex items-center gap-2">
                              {r.roleName ? (
                                <>
                                  <Shield
                                    className="w-3.5 h-3.5"
                                    style={{ color: toHex(r.roleColor) }}
                                  />
                                  <span style={{ color: toHex(r.roleColor) }}>
                                    {r.roleName}
                                  </span>
                                </>
                              ) : (
                                <>
                                  <Shield className="w-3.5 h-3.5 opacity-50" />
                                  <span className="opacity-50">
                                    {isLoadingRoles
                                      ? "Loading..."
                                      : "Select a role..."}
                                  </span>
                                </>
                              )}
                            </div>
                          }
                        />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-white/10 text-zinc-200 max-h-[300px] max-w-[320px]">
                        {serverRoles.length > 0 ? (
                          serverRoles.map((role) => (
                            <SelectItem
                              key={role.id}
                              value={role.id}
                              className="focus:bg-blue-500/20 focus:text-blue-200"
                            >
                              <div className="flex items-center gap-2">
                                <Shield
                                  className="w-3.5 h-3.5"
                                  style={{ color: toHex(role.color) }}
                                />
                                <span style={{ color: toHex(role.color) }}>
                                  {role.name}
                                </span>
                              </div>
                            </SelectItem>
                          ))
                        ) : (
                          <div className="p-2 text-[11px] text-zinc-500 italic text-center">
                            {isLoadingRoles
                              ? "Fetching roles..."
                              : "No roles found"}
                          </div>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeReaction(i)}
                    className="h-9 w-9 text-zinc-600 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              {reactions.length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-zinc-600 text-sm italic">
                    Add a mapping to get started...
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-3">
          <Button
            disabled={!validation.isReady}
            className={cn(
              "w-full font-black h-12 rounded-lg border-t border-white/20 shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 group",
              validation.isReady
                ? "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20"
                : "bg-zinc-800 text-zinc-500 border-white/5 cursor-not-allowed opacity-50"
            )}
          >
            <Rocket className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            Deploy to Discord
          </Button>
        </div>
      </div>

      {/* Live Preview */}
      <div className="space-y-4 order-1 xl:order-2 sticky top-24">
        <div className="px-1 my-2">
          <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
            Discord Preview
          </Label>
        </div>

        <div className="relative group transition-all">
          <Card
            className="border-[#2b2d31] shadow-2xl overflow-hidden relative z-10"
            title={undefined}
          >
            <DiscordPreview
              title={debouncedTitle}
              description={debouncedDescription}
              color={debouncedColor}
              reactions={reactions}
              serverEmojis={serverEmojis}
            />
          </Card>
        </div>

        <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl flex gap-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-5">
            <Info className="w-12 h-12" />
          </div>
          <Info className="w-4 h-4 text-blue-400 shrink-0" />
          <p className="text-[11px] text-blue-200/60 leading-relaxed font-medium">
            Your community can click the reactions below the message to toggle
            roles automatically. Everything you see here is exactly what they
            will see in Discord.
          </p>
        </div>
      </div>

      <style jsx global>{`
        .emoji-mart-container em-emoji-picker {
          --border-radius: 0;
          --category-icon-size: 20px;
          --font-family: inherit;
          --font-size: 14px;
          --rgb-accent: 88, 101, 242;
          width: 100% !important;
          height: 300px !important;
        }

        /* Styling for the custom server icon in the nav bar */
        .emoji-mart-container em-emoji-picker::part(nav) button img {
          border-radius: 50%;
          filter: grayscale(0.2);
          transition: all 0.2s ease;
        }

        .emoji-mart-container
          em-emoji-picker::part(nav)
          button[aria-selected="true"]
          img {
          filter: grayscale(0);
          box-shadow: 0 0 8px rgba(88, 101, 242, 0.4);
        }
      `}</style>
    </div>
  );
}
