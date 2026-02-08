"use client";

import { useMemo, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DiscordPreview } from "./discord-preview";
import { useRoleBuilder, type ReactionMapping } from "@/hooks/use-role-builder";
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
import { DiscordRole, DiscordChannel, DiscordEmoji } from "@/types/discord";

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
  if (!decimal || decimal === 0) return "#b9bbbe";
  return `#${decimal.toString(16).padStart(6, "0")}`;
}

export function RoleBuilder() {
  const {
    guildId,
    guildIconUrl,
    title,
    setTitle,
    description,
    setDescription,
    color,
    setColor,
    reactions,
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
  } = useRoleBuilder();

  const pickerRef = useRef<HTMLDivElement | null>(null);

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
  }, [setOpenEmojiPicker]);

  if (isLoadingRoles) {
    return <RoleBuilderSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_520px] gap-6 items-start animate-in fade-in duration-700 pb-10">
      {/* Configuration Form */}
      <div className="space-y-3 order-2 xl:order-1">
        <SectionHeader
          icon={<Settings2 className="w-4 h-4 text-blue-400" />}
          title="Configuration"
        />

        <Card className="bg-zinc-900/40 border-white/5 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl">
          <CardContent className="p-4 space-y-3">
            <ConfigurationFields
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
              color={color}
              setColor={setColor}
              validation={validation}
            />

            <ChannelSelector
              channels={serverChannels}
              selectedChannel={selectedChannel}
              setSelectedChannel={setSelectedChannel}
              isLoadingChannels={isLoadingChannels}
            />

            <SelectionModePicker
              mode={selectionMode}
              setMode={setSelectionMode}
            />
          </CardContent>
        </Card>

        {/* Reaction Role Mappings */}
        <div className="space-y-4">
          <SectionHeader
            icon={<Shield className="w-3.5 h-3.5" />}
            title="Role Mappings"
            action={
              <Button
                variant="outline"
                size="sm"
                onClick={addReaction}
                className="h-8 bg-white/5 border-white/10 hover:bg-white/10 text-[10px] font-black uppercase tracking-tighter rounded-lg transition-all"
              >
                <Plus className="w-3 h-3 mr-1.5" /> Add Mapping
              </Button>
            }
          />

          <Card className="bg-zinc-900/40 border-white/5 backdrop-blur-xl rounded-2xl shadow-xl">
            <CardContent className="p-2 space-y-1">
              <RoleMappingList
                reactions={reactions}
                removeReaction={removeReaction}
                updateReaction={updateReaction}
                serverRoles={serverRoles}
                isLoadingRoles={isLoadingRoles}
                serverEmojis={serverEmojis}
                openEmojiPicker={openEmojiPicker}
                setOpenEmojiPicker={setOpenEmojiPicker}
                pickerRef={pickerRef}
                guildId={guildId}
                isLoadingEmojis={isLoadingEmojis}
                hasFetchedEmojis={hasFetchedEmojis}
                emojiError={emojiError}
                fetchEmojis={fetchEmojis}
                guildIconUrl={guildIconUrl}
              />
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
        <PreviewHeader />
        <div className="relative group transition-all">
          <Card className="border-[#2b2d31] shadow-2xl overflow-hidden relative z-10">
            <DiscordPreview
              title={debouncedTitle}
              description={debouncedDescription}
              color={debouncedColor}
              reactions={reactions}
              serverEmojis={serverEmojis}
            />
          </Card>
        </div>
        <PreviewInfo />
      </div>

      <EmojiPickerStyles />
    </div>
  );
}

// Sub-components

function SectionHeader({
  icon,
  title,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between px-1 mb-2">
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20">
          {icon}
        </div>
        <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest">
          {title}
        </h3>
      </div>
      {action}
    </div>
  );
}

interface ConfigurationFieldsProps {
  title: string;
  setTitle: (val: string) => void;
  description: string;
  setDescription: (val: string) => void;
  color: string;
  setColor: (val: string) => void;
  validation: {
    hasTitle: boolean;
    hasDescription: boolean;
  };
}

function ConfigurationFields({
  title,
  setTitle,
  description,
  setDescription,
  color,
  setColor,
  validation,
}: ConfigurationFieldsProps) {
  return (
    <>
      <div className="space-y-2">
        <Label className="text-[11px] text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-2">
          <Type className="w-3 h-3 text-blue-400" />
          Embed Title
        </Label>
        <Input
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          placeholder="Ex: Rank Selection"
          className={cn(
            "bg-zinc-950/50 border-white/10 h-10 px-4 rounded-xl focus:border-blue-500/50 transition-all font-medium",
            !validation.hasTitle && title.length > 0 && "border-red-500/50"
          )}
        />
        {!validation.hasTitle && (
          <p className="text-[10px] text-red-400/80 font-medium px-1">
            Title is required
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label className="text-[11px] text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-2">
          <AlignLeft className="w-3 h-3 text-blue-400" />
          Description
        </Label>
        <textarea
          value={description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setDescription(e.target.value)
          }
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
        <Label className="text-[11px] text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-2">
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setColor(e.target.value)
            }
            className="w-[100px] bg-zinc-950/50 border-white/10 h-10 px-3 font-mono uppercase rounded-xl focus:border-blue-500/50 text-[12px]"
          />
        </div>
      </div>
    </>
  );
}

interface ChannelSelectorProps {
  channels: DiscordChannel[];
  selectedChannel: string;
  setSelectedChannel: (val: string) => void;
  isLoadingChannels: boolean;
}

function ChannelSelector({
  channels,
  selectedChannel,
  setSelectedChannel,
  isLoadingChannels,
}: ChannelSelectorProps) {
  return (
    <div className="space-y-3">
      <Label className="text-[11px] text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-2">
        <Hash className="w-3 h-3 text-blue-400" />
        Target Channel
      </Label>
      <Select value={selectedChannel} onValueChange={setSelectedChannel}>
        <SelectTrigger className="w-full bg-zinc-950/50 border-white/10 h-10 rounded-xl focus:ring-0 focus:border-blue-500/50 text-zinc-200">
          <SelectValue placeholder="Select a channel..." />
        </SelectTrigger>
        <SelectContent className="bg-zinc-900 border-white/10 text-zinc-200 max-h-[300px]">
          {channels.length > 0 ? (
            channels.map((ch: DiscordChannel) => (
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
  );
}

interface SelectionModePickerProps {
  mode: string;
  setMode: (val: string) => void;
}

function SelectionModePicker({ mode, setMode }: SelectionModePickerProps) {
  const modes = [
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
  ];

  return (
    <div className="space-y-3 pt-2">
      <div className="flex items-center justify-between px-1">
        <Label className="text-[11px] text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-3 h-3 text-amber-400 fill-amber-400/20" />
          Selection Mode
        </Label>
        {mode !== "standard" && (
          <div className="flex items-center gap-1 bg-amber-500/10 px-2 rounded-full border border-amber-500/20">
            <Zap className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
            <span className="text-[9px] font-black text-amber-400 uppercase tracking-tighter">
              Premium
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {modes.map((m) => (
          <Button
            key={m.id}
            variant="ghost"
            size={"lg"}
            onClick={() => setMode(m.id)}
            className={cn(
              "flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all relative overflow-hidden group/btn h-16 hover:bg-white/[0.02] hover:text-zinc-300",
              mode === m.id
                ? m.color === "blue"
                  ? "bg-blue-500/5 border-blue-500/40 text-blue-400 hover:bg-blue-500/5 hover:text-blue-400"
                  : m.color === "amber"
                    ? "bg-amber-500/5 border-amber-500/40 text-amber-400 hover:bg-amber-500/5 hover:text-amber-400"
                    : "bg-purple-500/5 border-purple-500/40 text-purple-400 hover:bg-purple-500/5 hover:text-purple-400"
                : "bg-zinc-950/20 border-white/5 text-zinc-500"
            )}
          >
            <m.icon className="w-4 h-4" />
            <span className="text-[10px] font-bold">{m.label}</span>
          </Button>
        ))}
      </div>
      <p className="text-[10px] text-zinc-500/80 font-medium px-1 leading-relaxed">
        {mode === "standard" &&
          "Standard behavior: Reacting to an emoji adds the role, reacting again removes it."}
        {mode === "unique" &&
          "Users can only have one role from this group. Selecting a new one cancels the previous selection."}
        {mode === "verify" &&
          "Inverse mode: Useful for staff-only verification or roles that users should only be able to remove."}
      </p>
    </div>
  );
}

interface RoleMappingListProps {
  reactions: ReactionMapping[];
  removeReaction: (idx: number) => void;
  updateReaction: (idx: number, updates: Partial<ReactionMapping>) => void;
  serverRoles: DiscordRole[];
  isLoadingRoles: boolean;
  serverEmojis: DiscordEmoji[];
  openEmojiPicker: number | null;
  setOpenEmojiPicker: (idx: number | null) => void;
  pickerRef: React.RefObject<HTMLDivElement | null>;
  guildId: string;
  isLoadingEmojis: boolean;
  hasFetchedEmojis: boolean;
  emojiError: string | null;
  fetchEmojis: (guildId: string, force?: boolean) => void;
  guildIconUrl: string | null;
}

function RoleMappingList({
  reactions,
  removeReaction,
  updateReaction,
  serverRoles,
  isLoadingRoles,
  serverEmojis,
  openEmojiPicker,
  setOpenEmojiPicker,
  pickerRef,
  guildId,
  isLoadingEmojis,
  hasFetchedEmojis,
  emojiError,
  fetchEmojis,
  guildIconUrl,
}: RoleMappingListProps) {
  const customEmojis = useMemo(() => {
    return serverEmojis.map((emoji: DiscordEmoji) => ({
      id: emoji.identifier,
      name: emoji.name,
      keywords: [emoji.name, emoji.id],
      skins: [{ src: emoji.url }],
    }));
  }, [serverEmojis]);

  return (
    <>
      {reactions.map((r: ReactionMapping, i: number) => (
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
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={
                      serverEmojis.find(
                        (e: DiscordEmoji) => e.identifier === r.emoji
                      )?.url
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
              <EmojiPickerWrapper
                pickerRef={pickerRef}
                guildId={guildId}
                isLoadingEmojis={isLoadingEmojis}
                hasFetchedEmojis={hasFetchedEmojis}
                emojiError={emojiError}
                fetchEmojis={fetchEmojis}
                customEmojis={customEmojis}
                guildIconUrl={guildIconUrl}
                onSelect={(emoji: { native?: string; id: string }) => {
                  const val = emoji.native || emoji.id;
                  updateReaction(i, { emoji: val });
                  setOpenEmojiPicker(null);
                }}
              />
            )}
          </div>

          <div className="flex-1">
            <Select
              value={
                serverRoles.some((sr: DiscordRole) => sr.id === r.roleId)
                  ? r.roleId
                  : ""
              }
              onValueChange={(val) => {
                const role = serverRoles.find(
                  (sr: DiscordRole) => sr.id === val
                );
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
                            {isLoadingRoles ? "Loading..." : "Select a role..."}
                          </span>
                        </>
                      )}
                    </div>
                  }
                />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 shadow-2xl border-white/10 text-zinc-200 min-w-[200px]">
                {serverRoles.length > 0 ? (
                  serverRoles.map((role: DiscordRole) => (
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
                    {isLoadingRoles ? "Fetching roles..." : "No roles found"}
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
    </>
  );
}

interface CustomEmoji {
  id: string;
  name: string;
  keywords: string[];
  skins: { src: string }[];
}

interface EmojiPickerWrapperProps {
  pickerRef: React.RefObject<HTMLDivElement | null>;
  guildId: string;
  isLoadingEmojis: boolean;
  hasFetchedEmojis: boolean;
  emojiError: string | null;
  fetchEmojis: (guildId: string, force?: boolean) => void;
  customEmojis: CustomEmoji[];
  guildIconUrl: string | null;
  onSelect: (emoji: { native?: string; id: string }) => void;
}

function EmojiPickerWrapper({
  pickerRef,
  guildId,
  isLoadingEmojis,
  hasFetchedEmojis,
  emojiError,
  fetchEmojis,
  customEmojis,
  guildIconUrl,
  onSelect,
}: EmojiPickerWrapperProps) {
  return (
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
            onClick={(e: React.MouseEvent) => {
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
              {customEmojis.length === 0 && !emojiError && (
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
                    Upload <ExternalLink className="w-2.5 h-2.5" />
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
                data={data}
                onEmojiSelect={onSelect}
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
                perLine={9}
                width="100%"
                categories={[
                  ...(customEmojis.length > 0 ? [`custom-${guildId}`] : []),
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
  );
}

function RoleBuilderSkeleton() {
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
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-3 w-20 bg-zinc-800/50 rounded" />
              <div
                className={cn(
                  "w-full bg-zinc-950/50 rounded-xl",
                  i === 2 ? "h-[140px]" : "h-10"
                )}
              />
            </div>
          ))}
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

function PreviewHeader() {
  return (
    <div className="px-1 my-2">
      <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
        Discord Preview
      </Label>
    </div>
  );
}

function PreviewInfo() {
  return (
    <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl flex gap-3 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-2 opacity-5">
        <Info className="w-12 h-12" />
      </div>
      <Info className="w-4 h-4 text-blue-400 shrink-0" />
      <p className="text-[11px] text-blue-200/60 leading-relaxed font-medium">
        Your community can click the reactions below the message to toggle roles
        automatically. Everything you see here is exactly what they will see in
        Discord.
      </p>
    </div>
  );
}

function EmojiPickerStyles() {
  return (
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
  );
}
