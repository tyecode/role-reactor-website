export type CustomCommandType = "text" | "embed" | "role" | "dm";
export type RoleAction = "add" | "remove" | "toggle";

export type OptionType =
  | "string"
  | "integer"
  | "number"
  | "boolean"
  | "user"
  | "channel"
  | "role"
  | "mentionable"
  | "attachment";

export interface CustomCommandOption {
  name: string;
  description: string;
  type: OptionType;
  required?: boolean;
  autocomplete?: boolean;
  choices?: { name: string; value: string }[];
  channelTypes?: number[];
  minValue?: number;
  maxValue?: number;
  minLength?: number;
  maxLength?: number;
}

export interface ButtonConfig {
  style: "primary" | "secondary" | "success" | "danger" | "link";
  label: string;
  emoji?: string;
  url?: string;
}

export interface SelectOption {
  label: string;
  value: string;
  description?: string;
  emoji?: string;
}

export interface SelectMenuConfig {
  placeholder: string;
  minValues: number;
  maxValues: number;
  options: SelectOption[];
}

export interface ComponentConfig {
  buttons?: ButtonConfig[];
  selectMenu?: SelectMenuConfig;
}

export interface CustomCommandEmbed {
  title: string;
  description: string;
  color: string;
  footer: string | null;
}

export interface CustomCommandRole {
  roleId: string;
  roleName: string;
  roleColor: number;
  action: RoleAction;
}

export interface CustomCommandAction {
  type: "text" | "role" | "dm";
  roleId?: string;
  roleName?: string;
  roleColor?: number;
  action?: RoleAction;
  channelId?: string;
  content?: string;
  targetUserId?: string;
  responseIndex?: number;
}

export interface CustomCommand {
  commandId: string;
  discordCommandId: string;
  name: string;
  description: string;
  type: CustomCommandType;
  response: string | null;
  responses?: string[] | null;
  randomResponse?: boolean;
  embed: CustomCommandEmbed | null;
  role: CustomCommandRole | null;
  enabled: boolean;
  ephemeral?: boolean;
  allowedChannels?: string[] | null;
  requiredRoles?: string[] | null;
  cooldown?: number | null;
  aliases?: string[] | null;
  dmUser?: boolean;
  dmTarget?: string | null;
  actions?: CustomCommandAction[] | null;
  options?: CustomCommandOption[] | null;
  components?: ComponentConfig | null;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomCommandsResponse {
  commands: CustomCommand[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface CreateCustomCommandPayload {
  name: string;
  description: string;
  type: CustomCommandType;
  response?: string;
  responses?: string[];
  randomResponse?: boolean;
  embed?: CustomCommandEmbed;
  role?: CustomCommandRole;
  createdBy: string;
  ephemeral?: boolean;
  allowedChannels?: string[];
  requiredRoles?: string[];
  cooldown?: number;
  aliases?: string[];
  dmUser?: boolean;
  dmTarget?: string;
  actions?: CustomCommandAction[];
  options?: CustomCommandOption[];
  components?: ComponentConfig;
}

export interface UpdateCustomCommandPayload {
  name?: string;
  description?: string;
  type?: CustomCommandType;
  response?: string;
  responses?: string[];
  randomResponse?: boolean;
  embed?: Partial<CustomCommandEmbed>;
  role?: Partial<CustomCommandRole>;
  enabled?: boolean;
  ephemeral?: boolean;
  allowedChannels?: string[];
  requiredRoles?: string[];
  cooldown?: number;
  aliases?: string[];
  dmUser?: boolean;
  dmTarget?: string;
  actions?: CustomCommandAction[];
  options?: CustomCommandOption[];
  components?: ComponentConfig;
}
