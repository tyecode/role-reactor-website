"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Loader2,
  Save,
  X,
  MessageSquare,
  Layers,
  AlertCircle,
  ShieldCheck,
  Plus,
  Minus,
  RefreshCw,
  Pipette,
  Hash,
  Users,
  Eye,
  EyeOff,
  Mail,
  Zap,
  Shuffle,
  ListOrdered,
  MousePointer,
  ListChecks,
  Trash2,
  GripVertical,
  Settings2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { audiowide } from "@/lib/fonts";
import { toast } from "sonner";
import { useCustomCommandsStore } from "@/store/use-custom-commands-store";
import { useGuildStore } from "@/store/use-guild-store";
import { CommandPreview } from "./command-preview";
import { DiscordRole, DiscordChannel } from "@/types/discord";
import type {
  CustomCommand,
  CustomCommandType,
  RoleAction,
  CustomCommandAction,
  CustomCommandOption,
  ButtonConfig,
  SelectMenuConfig,
  OptionType,
} from "@/types/custom-commands";

const NAME_REGEX = /^[a-z0-9-]{1,32}$/;
const PRESET_COLORS = [
  "#9b8bf0",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
  "#8b5cf6",
  "#3b82f6",
];

const ROLE_ACTION_LABELS: Record<
  RoleAction,
  { label: string; icon: React.ElementType; description: string }
> = {
  add: {
    label: "Add Role",
    icon: Plus,
    description: "Give the role to the user",
  },
  remove: {
    label: "Remove Role",
    icon: Minus,
    description: "Take the role from the user",
  },
  toggle: {
    label: "Toggle Role",
    icon: RefreshCw,
    description:
      "Gives the role if the user doesn't have it — removes it if they do",
  },
};

const VARIABLES = [
  { code: "{user}", description: "User mention" },
  { code: "{user.id}", description: "User ID" },
  { code: "{user.name}", description: "Username" },
  { code: "{user.tag}", description: "User tag" },
  { code: "{user.joined_at}", description: "Join date (relative)" },
  { code: "{user.created_at}", description: "Account creation date" },
  { code: "{server}", description: "Server name" },
  { code: "{server.id}", description: "Server ID" },
  { code: "{count}", description: "Member count" },
  { code: "{channel}", description: "Channel mention" },
  { code: "{channel.name}", description: "Channel name" },
  { code: "{channel.id}", description: "Channel ID" },
  { code: "{role}", description: "Role mention (role commands)" },
  { code: "{options.name}", description: "Option value (dynamic)" },
];

function toRoleColor(decimal: number) {
  if (!decimal || decimal === 0) return "#99aab5";
  return `#${decimal.toString(16).padStart(6, "0")}`;
}

interface CommandFormProps {
  guildId: string;
  editData?: CustomCommand | null;
  onCancelEdit?: () => void;
  onSaveComplete?: () => void;
}

export function CommandForm({
  guildId,
  editData,
  onCancelEdit,
  onSaveComplete,
}: CommandFormProps) {
  const isEditing = !!editData;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<CustomCommandType>("text");

  // Text
  const [response, setResponse] = useState("");
  const [responses, setResponses] = useState<string[]>([]);
  const [randomResponse, setRandomResponse] = useState(false);

  // Embed
  const [embedTitle, setEmbedTitle] = useState("");
  const [embedDescription, setEmbedDescription] = useState("");
  const [embedColor, setEmbedColor] = useState("#9b8bf0");
  const [embedFooter, setEmbedFooter] = useState("");

  // Role
  const [roleId, setRoleId] = useState("");
  const [roleAction, setRoleAction] = useState<RoleAction>("add");
  const [roleConfirmation, setRoleConfirmation] = useState("");

  // New settings
  const [ephemeral, setEphemeral] = useState(false);
  const [allowedChannels, setAllowedChannels] = useState<string[]>([]);
  const [requiredRoles, setRequiredRoles] = useState<string[]>([]);
  const [cooldown, setCooldown] = useState<number | null>(null);
  const [aliases, setAliases] = useState<string[]>([]);
  const [dmUser, setDmUser] = useState(false); // eslint-disable-line @typescript-eslint/no-unused-vars
  const [dmTarget, setDmTarget] = useState<string | null>(null);
  const [multiActions, setMultiActions] = useState<CustomCommandAction[]>([]);

  // Options
  const [options, setOptions] = useState<CustomCommandOption[]>([]);

  // Components (buttons, select menus)
  const [buttons, setButtons] = useState<ButtonConfig[]>([]);
  const [selectMenu, setSelectMenu] = useState<SelectMenuConfig | null>(null);

  // UI state
  const [newAlias, setNewAlias] = useState("");
  const [newResponse, setNewResponse] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showComponents, setShowComponents] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { addCommand, updateCommand } = useCustomCommandsStore();
  const { guildData, fetchRoles, fetchChannels } = useGuildStore();
  const roles = guildData[guildId]?.roles ?? [];
  const channels = guildData[guildId]?.channels ?? [];

  useEffect(() => {
    fetchRoles(guildId);
    fetchChannels(guildId);
  }, [guildId, fetchRoles, fetchChannels]);

  // Populate form when editing
  useEffect(() => {
    if (editData) {
      setName(editData.name);
      setDescription(editData.description);
      setType(editData.type);
      setResponse(editData.response ?? "");
      setResponses(editData.responses ?? []);
      setRandomResponse(editData.randomResponse ?? false);
      setEmbedTitle(editData.embed?.title ?? "");
      setEmbedDescription(editData.embed?.description ?? "");
      setEmbedColor(editData.embed?.color ?? "#9b8bf0");
      setEmbedFooter(editData.embed?.footer ?? "");
      setRoleId(editData.role?.roleId ?? "");
      setRoleAction(editData.role?.action ?? "add");
      setRoleConfirmation(editData.response ?? "");
      setEphemeral(editData.ephemeral ?? false);
      setAllowedChannels(editData.allowedChannels ?? []);
      setRequiredRoles(editData.requiredRoles ?? []);
      setCooldown(editData.cooldown ?? null);
      setAliases(editData.aliases ?? []);
      setDmUser(editData.dmUser ?? false);
      setDmTarget(editData.dmTarget ?? null);
      setMultiActions(editData.actions ?? []);
      setOptions(editData.options ?? []);
      setButtons(editData.components?.buttons ?? []);
      setSelectMenu(editData.components?.selectMenu ?? null);
    } else {
      setName("");
      setDescription("");
      setType("text");
      setResponse("");
      setResponses([]);
      setRandomResponse(false);
      setEmbedTitle("");
      setEmbedDescription("");
      setEmbedColor("#9b8bf0");
      setEmbedFooter("");
      setRoleId("");
      setRoleAction("add");
      setRoleConfirmation("");
      setEphemeral(false);
      setAllowedChannels([]);
      setRequiredRoles([]);
      setCooldown(null);
      setAliases([]);
      setDmUser(false);
      setDmTarget(null);
      setMultiActions([]);
      setOptions([]);
      setButtons([]);
      setSelectMenu(null);
    }
  }, [editData]);

  const selectedRole = roles.find((r) => r.id === roleId);

  const nameError =
    name.length > 0 && !NAME_REGEX.test(name)
      ? "Only lowercase letters, numbers, and hyphens (max 32 chars)"
      : null;

  const isValid =
    name.length > 0 &&
    NAME_REGEX.test(name) &&
    description.trim().length > 0 &&
    (type === "text" || type === "dm"
      ? randomResponse
        ? responses.length > 0
        : response.trim().length > 0
      : type === "embed"
        ? embedTitle.trim().length > 0 && embedDescription.trim().length > 0
        : roleId.length > 0);

  const handleSubmit = async () => {
    if (!isValid) return;
    setIsSubmitting(true);

    let payload: Record<string, unknown>;

    if (type === "text") {
      payload = {
        name,
        description,
        type,
        response: randomResponse ? null : response.trim(),
        responses: randomResponse ? responses : null,
        randomResponse,
        ephemeral,
        allowedChannels: allowedChannels.length > 0 ? allowedChannels : null,
        requiredRoles: requiredRoles.length > 0 ? requiredRoles : null,
        cooldown,
        aliases: aliases.length > 0 ? aliases : null,
        actions: multiActions.length > 0 ? multiActions : null,
        options: options.length > 0 ? options : null,
        components:
          buttons.length > 0 || selectMenu
            ? { buttons, selectMenu: selectMenu || undefined }
            : null,
      };
    } else if (type === "embed") {
      payload = {
        name,
        description,
        type,
        embed: {
          title: embedTitle.trim(),
          description: embedDescription.trim(),
          color: embedColor,
          footer: embedFooter.trim() || null,
        },
        ephemeral,
        allowedChannels: allowedChannels.length > 0 ? allowedChannels : null,
        requiredRoles: requiredRoles.length > 0 ? requiredRoles : null,
        cooldown,
        aliases: aliases.length > 0 ? aliases : null,
        actions: multiActions.length > 0 ? multiActions : null,
        options: options.length > 0 ? options : null,
        components:
          buttons.length > 0 || selectMenu
            ? { buttons, selectMenu: selectMenu || undefined }
            : null,
      };
    } else if (type === "dm") {
      payload = {
        name,
        description,
        type,
        response: randomResponse ? null : response.trim(),
        responses: randomResponse ? responses : null,
        randomResponse,
        dmUser: true,
        dmTarget,
        ephemeral: false,
        allowedChannels: allowedChannels.length > 0 ? allowedChannels : null,
        requiredRoles: requiredRoles.length > 0 ? requiredRoles : null,
        cooldown,
        aliases: aliases.length > 0 ? aliases : null,
        options: options.length > 0 ? options : null,
      };
    } else {
      payload = {
        name,
        description,
        type,
        role: {
          roleId,
          roleName: selectedRole?.name ?? "",
          roleColor: selectedRole?.color ?? 0,
          action: roleAction,
        },
        response: roleConfirmation.trim() || null,
        ephemeral,
        allowedChannels: allowedChannels.length > 0 ? allowedChannels : null,
        requiredRoles: requiredRoles.length > 0 ? requiredRoles : null,
        cooldown,
        aliases: aliases.length > 0 ? aliases : null,
        actions: multiActions.length > 0 ? multiActions : null,
        options: options.length > 0 ? options : null,
        components:
          buttons.length > 0 || selectMenu
            ? { buttons, selectMenu: selectMenu || undefined }
            : null,
      };
    }

    try {
      const url = isEditing
        ? `/api/guilds/${guildId}/custom-commands/${editData.commandId}`
        : `/api/guilds/${guildId}/custom-commands`;

      const res = await fetch(url, {
        method: isEditing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        toast.error(err.error || "Failed to save command");
        return;
      }

      const data = await res.json();

      if (isEditing) {
        updateCommand(
          guildId,
          editData.commandId,
          payload as Partial<CustomCommand>
        );
        toast.success(`/${name} updated`);
      } else {
        if (data.command) addCommand(guildId, data.command);
        toast.success(`/${name} created — it's live in Discord!`);
      }

      onSaveComplete?.();
    } finally {
      setIsSubmitting(false);
    }
  };

  const addAlias = () => {
    if (
      newAlias &&
      NAME_REGEX.test(newAlias) &&
      !aliases.includes(newAlias) &&
      newAlias !== name
    ) {
      if (aliases.length < 5) {
        setAliases([...aliases, newAlias.toLowerCase()]);
        setNewAlias("");
      }
    }
  };

  const removeAlias = (alias: string) => {
    setAliases(aliases.filter((a) => a !== alias));
  };

  const toggleChannel = (channelId: string) => {
    if (allowedChannels.includes(channelId)) {
      setAllowedChannels(allowedChannels.filter((c) => c !== channelId));
    } else {
      setAllowedChannels([...allowedChannels, channelId]);
    }
  };

  const toggleRole = (roleId: string) => {
    if (requiredRoles.includes(roleId)) {
      setRequiredRoles(requiredRoles.filter((r) => r !== roleId));
    } else {
      setRequiredRoles([...requiredRoles, roleId]);
    }
  };

  const _addMultiAction = () => {
    setMultiActions([...multiActions, { type: "role", action: "add" }]);
  };

  const _removeMultiAction = (index: number) => {
    setMultiActions(multiActions.filter((_, i) => i !== index));
  };

  const _updateMultiAction = (
    index: number,
    updates: Partial<CustomCommandAction>
  ) => {
    const updated = [...multiActions];
    updated[index] = { ...updated[index], ...updates };
    setMultiActions(updated);
  };

  const textChannels = channels.filter(
    (c: DiscordChannel) => c.type === 0 || c.type === 5
  );

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {/* Form */}
      <Card className="border-zinc-800/50 bg-zinc-900/30">
        <CardContent className="p-6 space-y-5">
          {isEditing && (
            <div className="flex items-center justify-between">
              <Badge
                variant="accent"
                className="text-[10px] font-black uppercase"
              >
                Editing /{editData.name}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-zinc-500 hover:text-zinc-300"
                onClick={onCancelEdit}
              >
                <X className="w-3.5 h-3.5 mr-1" />
                Cancel
              </Button>
            </div>
          )}

          {/* Name */}
          <div className="space-y-1.5">
            <Label className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
              Command Name
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-sm select-none">
                /
              </span>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value.toLowerCase())}
                placeholder="rules"
                className="pl-6 bg-zinc-800/50 border-zinc-700/50 text-sm"
                maxLength={32}
              />
            </div>
            {nameError && (
              <p className="text-red-400 text-xs flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {nameError}
              </p>
            )}
            <p className="text-zinc-600 text-xs">
              Lowercase letters, numbers, hyphens only
            </p>
          </div>

          {/* Aliases */}
          <div className="space-y-1.5">
            <Label className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
              Aliases <span className="text-zinc-600 font-normal">(max 5)</span>
            </Label>
            <div className="flex gap-2">
              <Input
                value={newAlias}
                onChange={(e) => setNewAlias(e.target.value.toLowerCase())}
                placeholder="alias-name"
                className="bg-zinc-800/50 border-zinc-700/50 text-sm"
                maxLength={32}
                onKeyDown={(e) => e.key === "Enter" && addAlias()}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={addAlias}
                disabled={!newAlias || aliases.length >= 5}
                className="border-zinc-700/50"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {aliases.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {aliases.map((alias) => (
                  <Badge
                    key={alias}
                    variant="secondary"
                    className="text-xs bg-zinc-800/50 border-zinc-700/50"
                  >
                    /{alias}
                    <button
                      type="button"
                      onClick={() => removeAlias(alias)}
                      className="ml-1.5 hover:text-red-400"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
              Description{" "}
              <span className="text-zinc-600 normal-case font-normal">
                (shown in Discord command menu)
              </span>
            </Label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Shows the server rules"
              className="bg-zinc-800/50 border-zinc-700/50 text-sm"
              maxLength={100}
            />
            <p className="text-zinc-600 text-xs text-right">
              {description.length}/100
            </p>
          </div>

          {/* Command type */}
          <div className="space-y-1.5">
            <Label className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
              Command Type
            </Label>
            <Tabs
              value={type}
              onValueChange={(v) => setType(v as CustomCommandType)}
            >
              <TabsList className="w-full">
                <TabsTrigger
                  value="text"
                  className={cn(
                    "flex-1 flex items-center gap-2 text-xs",
                    audiowide.className
                  )}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Text
                </TabsTrigger>
                <TabsTrigger
                  value="embed"
                  className={cn(
                    "flex-1 flex items-center gap-2 text-xs",
                    audiowide.className
                  )}
                >
                  <Layers className="w-3.5 h-3.5" />
                  Embed
                </TabsTrigger>
                <TabsTrigger
                  value="role"
                  className={cn(
                    "flex-1 flex items-center gap-2 text-xs",
                    audiowide.className
                  )}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Role
                </TabsTrigger>
                <TabsTrigger
                  value="dm"
                  className={cn(
                    "flex-1 flex items-center gap-2 text-xs",
                    audiowide.className
                  )}
                >
                  <Mail className="w-3.5 h-3.5" />
                  DM
                </TabsTrigger>
              </TabsList>

              {/* ── Text ── */}
              <TabsContent value="text" className="mt-4 space-y-3">
                {/* Random Response Toggle */}
                <div className="flex items-center justify-between p-3 rounded-lg border border-zinc-700/50 bg-zinc-800/30">
                  <div className="space-y-0.5">
                    <Label className="text-xs text-zinc-300 flex items-center gap-2">
                      <Shuffle className="w-3.5 h-3.5" />
                      Random Responses
                    </Label>
                    <p className="text-[10px] text-zinc-500">
                      Send a random response from a list each time
                    </p>
                  </div>
                  <Switch
                    checked={randomResponse}
                    onCheckedChange={setRandomResponse}
                  />
                </div>

                {randomResponse ? (
                  <div className="space-y-2">
                    <Label className="text-xs text-zinc-400 flex items-center gap-2">
                      <ListOrdered className="w-3.5 h-3.5" />
                      Responses ({responses.length}/10)
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        value={newResponse}
                        onChange={(e) => setNewResponse(e.target.value)}
                        placeholder="Add a response..."
                        className="bg-zinc-800/50 border-zinc-700/50 text-sm"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && newResponse.trim()) {
                            if (responses.length < 10) {
                              setResponses([...responses, newResponse.trim()]);
                              setNewResponse("");
                            }
                          }
                        }}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (newResponse.trim() && responses.length < 10) {
                            setResponses([...responses, newResponse.trim()]);
                            setNewResponse("");
                          }
                        }}
                        disabled={!newResponse.trim() || responses.length >= 10}
                        className="border-zinc-700/50"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    {responses.length > 0 && (
                      <div className="space-y-1.5 max-h-40 overflow-y-auto">
                        {responses.map((resp, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 p-2 rounded bg-zinc-800/30 border border-zinc-700/30"
                          >
                            <span className="text-zinc-500 text-xs w-5">
                              {i + 1}.
                            </span>
                            <span className="text-zinc-300 text-xs flex-1 truncate">
                              {resp}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                setResponses(
                                  responses.filter((_, idx) => idx !== i)
                                )
                              }
                              className="text-zinc-500 hover:text-red-400 transition-colors"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <Textarea
                      value={response}
                      onChange={(e) => setResponse(e.target.value)}
                      placeholder="Type your response here..."
                      className="bg-zinc-800/50 border-zinc-700/50 text-sm min-h-30 resize-none"
                      maxLength={2000}
                    />
                    <p className="text-zinc-600 text-xs text-right">
                      {response.length}/2000
                    </p>
                  </>
                )}
              </TabsContent>

              {/* ── Embed ── */}
              <TabsContent value="embed" className="mt-4 space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-xs text-zinc-400">Embed Color</Label>
                  <div className="flex items-center gap-2 flex-wrap">
                    {PRESET_COLORS.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setEmbedColor(c)}
                        className={cn(
                          "w-6 h-6 rounded-full transition-all",
                          embedColor === c
                            ? "ring-2 ring-white ring-offset-2 ring-offset-zinc-900 scale-110"
                            : "hover:scale-110"
                        )}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                    <label
                      className={cn(
                        "relative flex items-center gap-1.5 px-2.5 h-7 rounded-md border text-xs font-medium cursor-pointer transition-all select-none",
                        !PRESET_COLORS.includes(embedColor)
                          ? "border-white/20 bg-zinc-700/60 text-zinc-200"
                          : "border-zinc-700/50 bg-zinc-800/50 text-zinc-400 hover:border-zinc-600 hover:text-zinc-300"
                      )}
                    >
                      {!PRESET_COLORS.includes(embedColor) ? (
                        <span
                          className="w-3 h-3 rounded-full shrink-0 ring-1 ring-white/20"
                          style={{ backgroundColor: embedColor }}
                        />
                      ) : (
                        <Pipette className="w-3 h-3 shrink-0" />
                      )}
                      Custom
                      <input
                        type="color"
                        value={embedColor}
                        onChange={(e) => setEmbedColor(e.target.value)}
                        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                      />
                    </label>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs text-zinc-400">Title</Label>
                  <Input
                    value={embedTitle}
                    onChange={(e) => setEmbedTitle(e.target.value)}
                    placeholder="Server Rules"
                    className="bg-zinc-800/50 border-zinc-700/50 text-sm"
                    maxLength={256}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs text-zinc-400">Description</Label>
                  <Textarea
                    value={embedDescription}
                    onChange={(e) => setEmbedDescription(e.target.value)}
                    placeholder="Embed description..."
                    className="bg-zinc-800/50 border-zinc-700/50 text-sm min-h-25 resize-none"
                    maxLength={4096}
                  />
                  <p className="text-zinc-600 text-xs text-right">
                    {embedDescription.length}/4096
                  </p>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs text-zinc-400">
                    Footer{" "}
                    <span className="text-zinc-600 font-normal">
                      (optional)
                    </span>
                  </Label>
                  <Input
                    value={embedFooter}
                    onChange={(e) => setEmbedFooter(e.target.value)}
                    placeholder="Footer text"
                    className="bg-zinc-800/50 border-zinc-700/50 text-sm"
                    maxLength={2048}
                  />
                </div>
              </TabsContent>

              {/* ── Role ── */}
              <TabsContent value="role" className="mt-4 space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-xs text-zinc-400">Action</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {(
                      Object.entries(ROLE_ACTION_LABELS) as [
                        RoleAction,
                        (typeof ROLE_ACTION_LABELS)[RoleAction],
                      ][]
                    ).map(([value, meta]) => {
                      const Icon = meta.icon;
                      return (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setRoleAction(value)}
                          className={cn(
                            "flex flex-col items-center gap-1.5 p-3 rounded-lg border text-xs font-medium transition-all",
                            roleAction === value
                              ? "border-cyan-500/50 bg-cyan-950/30 text-cyan-400"
                              : "border-zinc-700/50 bg-zinc-800/30 text-zinc-500 hover:border-zinc-600 hover:text-zinc-400"
                          )}
                        >
                          <Icon className="w-4 h-4" />
                          {meta.label}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-zinc-600 text-xs">
                    {ROLE_ACTION_LABELS[roleAction].description}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs text-zinc-400">Role</Label>
                  <Select value={roleId} onValueChange={setRoleId}>
                    <SelectTrigger className="bg-zinc-800/50 border-zinc-700/50 text-sm">
                      <SelectValue placeholder="Select a role...">
                        {selectedRole && (
                          <span className="flex items-center gap-2">
                            <span
                              className="w-3 h-3 rounded-full shrink-0"
                              style={{
                                backgroundColor: toRoleColor(
                                  selectedRole.color
                                ),
                              }}
                            />
                            {selectedRole.name}
                          </span>
                        )}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-700 max-h-60">
                      {roles
                        .filter(
                          (r: DiscordRole) =>
                            !r.managed && r.name !== "@everyone"
                        )
                        .sort(
                          (a: DiscordRole, b: DiscordRole) =>
                            (b.position ?? 0) - (a.position ?? 0)
                        )
                        .map((role: DiscordRole) => (
                          <SelectItem
                            key={role.id}
                            value={role.id}
                            className="text-sm"
                          >
                            <span className="flex items-center gap-2">
                              <span
                                className="w-3 h-3 rounded-full shrink-0"
                                style={{
                                  backgroundColor: toRoleColor(role.color),
                                }}
                              />
                              {role.name}
                            </span>
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs text-zinc-400">
                    Confirmation message{" "}
                    <span className="text-zinc-600 font-normal">
                      (optional)
                    </span>
                  </Label>
                  <Input
                    value={roleConfirmation}
                    onChange={(e) => setRoleConfirmation(e.target.value)}
                    placeholder="You now have the {role} role!"
                    className="bg-zinc-800/50 border-zinc-700/50 text-sm"
                    maxLength={200}
                  />
                </div>
              </TabsContent>

              {/* ── DM ── */}
              <TabsContent value="dm" className="mt-4 space-y-3">
                {/* Random Response Toggle */}
                <div className="flex items-center justify-between p-3 rounded-lg border border-zinc-700/50 bg-zinc-800/30">
                  <div className="space-y-0.5">
                    <Label className="text-xs text-zinc-300 flex items-center gap-2">
                      <Shuffle className="w-3.5 h-3.5" />
                      Random Responses
                    </Label>
                    <p className="text-[10px] text-zinc-500">
                      Send a random response from a list each time
                    </p>
                  </div>
                  <Switch
                    checked={randomResponse}
                    onCheckedChange={setRandomResponse}
                  />
                </div>

                {randomResponse ? (
                  <div className="space-y-2">
                    <Label className="text-xs text-zinc-400 flex items-center gap-2">
                      <ListOrdered className="w-3.5 h-3.5" />
                      Responses ({responses.length}/10)
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        value={newResponse}
                        onChange={(e) => setNewResponse(e.target.value)}
                        placeholder="Add a response..."
                        className="bg-zinc-800/50 border-zinc-700/50 text-sm"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && newResponse.trim()) {
                            if (responses.length < 10) {
                              setResponses([...responses, newResponse.trim()]);
                              setNewResponse("");
                            }
                          }
                        }}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (newResponse.trim() && responses.length < 10) {
                            setResponses([...responses, newResponse.trim()]);
                            setNewResponse("");
                          }
                        }}
                        disabled={!newResponse.trim() || responses.length >= 10}
                        className="border-zinc-700/50"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    {responses.length > 0 && (
                      <div className="space-y-1.5 max-h-40 overflow-y-auto">
                        {responses.map((resp, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 p-2 rounded bg-zinc-800/30 border border-zinc-700/30"
                          >
                            <span className="text-zinc-500 text-xs w-5">
                              {i + 1}.
                            </span>
                            <span className="text-zinc-300 text-xs flex-1 truncate">
                              {resp}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                setResponses(
                                  responses.filter((_, idx) => idx !== i)
                                )
                              }
                              className="text-zinc-500 hover:text-red-400 transition-colors"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <Textarea
                      value={response}
                      onChange={(e) => setResponse(e.target.value)}
                      placeholder="This message will be sent to the user via DM..."
                      className="bg-zinc-800/50 border-zinc-700/50 text-sm min-h-30 resize-none"
                      maxLength={2000}
                    />
                    <p className="text-zinc-600 text-xs text-right">
                      {response.length}/2000
                    </p>
                  </>
                )}

                {/* DM Target (only if there are user options) */}
                {options.some((o) => o.type === "user") && (
                  <div className="space-y-1.5">
                    <Label className="text-xs text-zinc-400">
                      DM Target User Option
                    </Label>
                    <Select
                      value={dmTarget || ""}
                      onValueChange={(v) => setDmTarget(v || null)}
                    >
                      <SelectTrigger className="bg-zinc-800/50 border-zinc-700/50 text-sm">
                        <SelectValue placeholder="Select an option..." />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-zinc-700">
                        {options
                          .filter((o) => o.type === "user")
                          .map((opt) => (
                            <SelectItem key={opt.name} value={opt.name}>
                              {opt.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <p className="text-zinc-600 text-xs">
                      DM this user instead of the command runner
                    </p>
                  </div>
                )}

                <p className="text-zinc-500 text-xs">
                  <Mail className="w-3 h-3 inline mr-1" />
                  The message will be sent directly to the user.
                </p>
              </TabsContent>
            </Tabs>
          </div>

          {/* Advanced Settings */}
          <div className="border-t border-zinc-800/50 pt-4">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2 text-xs text-zinc-400 hover:text-zinc-300 transition-colors"
            >
              <Zap className="w-4 h-4" />
              Advanced Settings
              {showAdvanced ? (
                <EyeOff className="w-3 h-3" />
              ) : (
                <Eye className="w-3 h-3" />
              )}
            </button>

            {showAdvanced && (
              <div className="mt-4 space-y-4">
                {/* Ephemeral Toggle */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-xs text-zinc-300">
                      Ephemeral Response
                    </Label>
                    <p className="text-[10px] text-zinc-500">
                      Only the user who ran the command can see the response
                    </p>
                  </div>
                  <Switch checked={ephemeral} onCheckedChange={setEphemeral} />
                </div>

                {/* Cooldown */}
                <div className="space-y-1.5">
                  <Label className="text-xs text-zinc-300">
                    Cooldown (seconds)
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={cooldown ?? ""}
                      onChange={(e) =>
                        setCooldown(
                          e.target.value ? parseInt(e.target.value) : null
                        )
                      }
                      placeholder="60"
                      min={5}
                      max={3600}
                      className="bg-zinc-800/50 border-zinc-700/50 text-sm w-32"
                    />
                    <span className="text-zinc-500 text-xs self-center">
                      5-3600 seconds
                    </span>
                  </div>
                </div>

                {/* Channel Restriction */}
                <div className="space-y-1.5">
                  <Label className="text-xs text-zinc-300">
                    <Hash className="w-3 h-3 inline mr-1" />
                    Allowed Channels
                  </Label>
                  <p className="text-[10px] text-zinc-500 mb-2">
                    Leave empty to allow all channels
                  </p>
                  <div className="max-h-32 overflow-y-auto border border-zinc-700/50 rounded-md bg-zinc-800/30 p-2 space-y-1">
                    {textChannels.length === 0 ? (
                      <p className="text-zinc-500 text-xs">No channels found</p>
                    ) : (
                      textChannels.map((channel: DiscordChannel) => (
                        <label
                          key={channel.id}
                          className="flex items-center gap-2 text-xs cursor-pointer hover:bg-zinc-700/30 p-1 rounded"
                        >
                          <input
                            type="checkbox"
                            checked={allowedChannels.includes(channel.id)}
                            onChange={() => toggleChannel(channel.id)}
                            className="rounded border-zinc-600"
                          />
                          <span className="text-zinc-300">
                            # {channel.name}
                          </span>
                        </label>
                      ))
                    )}
                  </div>
                </div>

                {/* Role Restriction */}
                <div className="space-y-1.5">
                  <Label className="text-xs text-zinc-300">
                    <Users className="w-3 h-3 inline mr-1" />
                    Required Roles
                  </Label>
                  <p className="text-[10px] text-zinc-500 mb-2">
                    Leave empty to allow all roles
                  </p>
                  <div className="max-h-32 overflow-y-auto border border-zinc-700/50 rounded-md bg-zinc-800/30 p-2 space-y-1">
                    {roles.filter(
                      (r: DiscordRole) => !r.managed && r.name !== "@everyone"
                    ).length === 0 ? (
                      <p className="text-zinc-500 text-xs">No roles found</p>
                    ) : (
                      roles
                        .filter(
                          (r: DiscordRole) =>
                            !r.managed && r.name !== "@everyone"
                        )
                        .sort(
                          (a: DiscordRole, b: DiscordRole) =>
                            (b.position ?? 0) - (a.position ?? 0)
                        )
                        .map((role: DiscordRole) => (
                          <label
                            key={role.id}
                            className="flex items-center gap-2 text-xs cursor-pointer hover:bg-zinc-700/30 p-1 rounded"
                          >
                            <input
                              type="checkbox"
                              checked={requiredRoles.includes(role.id)}
                              onChange={() => toggleRole(role.id)}
                              className="rounded border-zinc-600"
                            />
                            <span
                              className="w-3 h-3 rounded-full shrink-0"
                              style={{
                                backgroundColor: toRoleColor(role.color),
                              }}
                            />
                            <span className="text-zinc-300">{role.name}</span>
                          </label>
                        ))
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Command Options */}
          <div className="border-t border-zinc-800/50 pt-4">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2 text-xs text-zinc-400 hover:text-zinc-300 transition-colors"
            >
              <Settings2 className="w-4 h-4" />
              Command Options
            </button>

            {showAdvanced && (
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg border border-zinc-700/50 bg-zinc-800/30">
                  <div className="space-y-0.5">
                    <Label className="text-xs text-zinc-300">
                      Add Command Arguments
                    </Label>
                    <p className="text-[10px] text-zinc-500">
                      Allow users to provide arguments when running the command
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setOptions([
                        ...options,
                        {
                          name: "",
                          description: "",
                          type: "string",
                          required: false,
                        },
                      ]);
                    }}
                    disabled={options.length >= 25}
                    className="border-zinc-700/50"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Option
                  </Button>
                </div>

                {options.length > 0 && (
                  <div className="space-y-3">
                    {options.map((opt, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-lg border border-zinc-700/50 bg-zinc-800/20 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-zinc-500">
                            Option {i + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setOptions(options.filter((_, idx) => idx !== i))
                            }
                            className="text-zinc-500 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <Input
                            value={opt.name}
                            onChange={(e) => {
                              const updated = [...options];
                              updated[i] = {
                                ...updated[i],
                                name: e.target.value
                                  .toLowerCase()
                                  .replace(/\s+/g, "_"),
                              };
                              setOptions(updated);
                            }}
                            placeholder="option_name"
                            className="bg-zinc-800/50 border-zinc-700/50 text-xs"
                          />
                          <Input
                            value={opt.description}
                            onChange={(e) => {
                              const updated = [...options];
                              updated[i] = {
                                ...updated[i],
                                description: e.target.value,
                              };
                              setOptions(updated);
                            }}
                            placeholder="Description"
                            className="bg-zinc-800/50 border-zinc-700/50 text-xs col-span-2"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <Select
                            value={opt.type}
                            onValueChange={(v) => {
                              const updated = [...options];
                              updated[i] = {
                                ...updated[i],
                                type: v as OptionType,
                              };
                              setOptions(updated);
                            }}
                          >
                            <SelectTrigger className="bg-zinc-800/50 border-zinc-700/50 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-900 border-zinc-700">
                              <SelectItem value="string">String</SelectItem>
                              <SelectItem value="integer">Integer</SelectItem>
                              <SelectItem value="number">Number</SelectItem>
                              <SelectItem value="boolean">Boolean</SelectItem>
                              <SelectItem value="user">User</SelectItem>
                              <SelectItem value="channel">Channel</SelectItem>
                              <SelectItem value="role">Role</SelectItem>
                              <SelectItem value="mentionable">
                                Mentionable
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={opt.required ?? false}
                              onCheckedChange={(v) => {
                                const updated = [...options];
                                updated[i] = { ...updated[i], required: v };
                                setOptions(updated);
                              }}
                              className="scale-75"
                            />
                            <span className="text-zinc-500 text-xs">
                              Required
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Interactive Components */}
          <div className="border-t border-zinc-800/50 pt-4">
            <button
              type="button"
              onClick={() => setShowComponents(!showComponents)}
              className="flex items-center gap-2 text-xs text-zinc-400 hover:text-zinc-300 transition-colors"
            >
              <MousePointer className="w-4 h-4" />
              Interactive Components
              {showComponents ? (
                <EyeOff className="w-3 h-3" />
              ) : (
                <Eye className="w-3 h-3" />
              )}
            </button>

            {showComponents && (
              <div className="mt-4 space-y-4">
                {/* Buttons */}
                <div className="p-3 rounded-lg border border-zinc-700/50 bg-zinc-800/30">
                  <div className="flex items-center justify-between mb-3">
                    <div className="space-y-0.5">
                      <Label className="text-xs text-zinc-300 flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5" />
                        Buttons
                      </Label>
                      <p className="text-[10px] text-zinc-500">
                        Add interactive buttons to the response (max 5)
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setButtons([
                          ...buttons,
                          { style: "secondary", label: "New Button" },
                        ]);
                      }}
                      disabled={buttons.length >= 5}
                      className="border-zinc-700/50"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Button
                    </Button>
                  </div>

                  {buttons.length > 0 && (
                    <div className="space-y-2">
                      {buttons.map((btn, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 p-2 rounded bg-zinc-800/30 border border-zinc-700/30"
                        >
                          <GripVertical className="w-4 h-4 text-zinc-600" />
                          <Input
                            value={btn.label}
                            onChange={(e) => {
                              const updated = [...buttons];
                              updated[i] = {
                                ...updated[i],
                                label: e.target.value,
                              };
                              setButtons(updated);
                            }}
                            placeholder="Button label"
                            className="flex-1 bg-zinc-800/50 border-zinc-700/50 text-xs"
                          />
                          <Select
                            value={btn.style}
                            onValueChange={(v) => {
                              const updated = [...buttons];
                              updated[i] = { ...updated[i], style: v as any };
                              setButtons(updated);
                            }}
                          >
                            <SelectTrigger className="w-28 bg-zinc-800/50 border-zinc-700/50 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-900 border-zinc-700">
                              <SelectItem value="primary">Primary</SelectItem>
                              <SelectItem value="secondary">
                                Secondary
                              </SelectItem>
                              <SelectItem value="success">Success</SelectItem>
                              <SelectItem value="danger">Danger</SelectItem>
                            </SelectContent>
                          </Select>
                          <button
                            type="button"
                            onClick={() =>
                              setButtons(buttons.filter((_, idx) => idx !== i))
                            }
                            className="text-zinc-500 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Select Menu */}
                <div className="p-3 rounded-lg border border-zinc-700/50 bg-zinc-800/30">
                  <div className="flex items-center justify-between mb-3">
                    <div className="space-y-0.5">
                      <Label className="text-xs text-zinc-300 flex items-center gap-2">
                        <ListChecks className="w-3.5 h-3.5" />
                        Select Menu
                      </Label>
                      <p className="text-[10px] text-zinc-500">
                        Add a dropdown select menu
                      </p>
                    </div>
                    <Switch
                      checked={!!selectMenu}
                      onCheckedChange={(v) => {
                        if (v) {
                          setSelectMenu({
                            placeholder: "Select an option...",
                            minValues: 1,
                            maxValues: 1,
                            options: [],
                          });
                        } else {
                          setSelectMenu(null);
                        }
                      }}
                    />
                  </div>

                  {selectMenu && (
                    <div className="space-y-3">
                      <Input
                        value={selectMenu.placeholder}
                        onChange={(e) => {
                          setSelectMenu({
                            ...selectMenu,
                            placeholder: e.target.value,
                          });
                        }}
                        placeholder="Placeholder text"
                        className="bg-zinc-800/50 border-zinc-700/50 text-xs"
                      />
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectMenu({
                              ...selectMenu,
                              options: [
                                ...selectMenu.options,
                                { label: "", value: "" },
                              ],
                            });
                          }}
                          disabled={selectMenu.options.length >= 25}
                          className="border-zinc-700/50 text-xs"
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          Add Option
                        </Button>
                        <span className="text-zinc-600 text-xs">
                          {selectMenu.options.length}/25
                        </span>
                      </div>
                      {selectMenu.options.map((opt, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 p-2 rounded bg-zinc-800/30 border border-zinc-700/30"
                        >
                          <Input
                            value={opt.label}
                            onChange={(e) => {
                              const updated = [...selectMenu!.options];
                              updated[i] = {
                                ...updated[i],
                                label: e.target.value,
                                value: e.target.value
                                  .toLowerCase()
                                  .replace(/\s+/g, "_"),
                              };
                              setSelectMenu({
                                ...selectMenu!,
                                options: updated,
                              });
                            }}
                            placeholder="Label"
                            className="flex-1 bg-zinc-800/50 border-zinc-700/50 text-xs"
                          />
                          <Input
                            value={opt.value}
                            onChange={(e) => {
                              const updated = [...selectMenu!.options];
                              updated[i] = {
                                ...updated[i],
                                value: e.target.value,
                              };
                              setSelectMenu({
                                ...selectMenu!,
                                options: updated,
                              });
                            }}
                            placeholder="value"
                            className="w-24 bg-zinc-800/50 border-zinc-700/50 text-xs"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setSelectMenu({
                                ...selectMenu!,
                                options: selectMenu!.options.filter(
                                  (_, idx) => idx !== i
                                ),
                              });
                            }}
                            className="text-zinc-500 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Submit */}
          <Button
            onClick={handleSubmit}
            disabled={!isValid || isSubmitting}
            className={cn("w-full", audiowide.className)}
            variant="cyber"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            {isEditing ? "Update Command" : "Create Command"}
          </Button>
        </CardContent>
      </Card>

      {/* Preview */}
      <div className="space-y-3">
        <p
          className={cn(
            "text-xs text-zinc-500 uppercase tracking-widest font-bold",
            audiowide.className
          )}
        >
          Live Preview
        </p>
        <CommandPreview
          type={type}
          commandName={name || "command"}
          response={response}
          responses={responses}
          randomResponse={randomResponse}
          embed={
            type === "embed"
              ? {
                  title: embedTitle,
                  description: embedDescription,
                  color: embedColor,
                  footer: embedFooter || null,
                }
              : undefined
          }
          role={
            type === "role"
              ? {
                  roleId,
                  roleName: selectedRole?.name ?? "",
                  roleColor: selectedRole?.color ?? 0,
                  action: roleAction,
                }
              : undefined
          }
          roleConfirmation={roleConfirmation}
          ephemeral={ephemeral}
          buttons={buttons}
          selectMenu={selectMenu}
        />
        <p className="text-zinc-500 text-xs">
          Variables:{" "}
          {VARIABLES.slice(0, 6).map((v) => (
            <code
              key={v.code}
              className="text-zinc-400 bg-zinc-800 px-1 rounded mx-0.5"
            >
              {v.code}
            </code>
          ))}
          <span className="text-zinc-600"> and more...</span>
        </p>
      </div>
    </div>
  );
}
