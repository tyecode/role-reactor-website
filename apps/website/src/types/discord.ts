export interface DiscordRole {
  id: string;
  name: string;
  color: number;
  managed: boolean;
  position?: number;
  permissions?: string;
}

export interface DiscordEmoji {
  id: string;
  name: string;
  animated: boolean;
  url: string;
  identifier: string;
  roles?: string[];
  require_colons?: boolean;
}

export interface DiscordGuild {
  id: string;
  name: string;
  icon: string | null;
  permissions: string;
  owner?: boolean;
}
export interface DiscordChannel {
  id: string;
  name: string;
  type: number;
}

export interface LeaderboardEntry {
  userId: string;
  totalXP: number;
  level: number;
  user: {
    username: string;
    discriminator: string;
    avatar: string | null;
    bot: boolean;
  };
  rankInfo?: {
    title: string;
    emoji: string;
    color: number;
    minLevel: number;
  };
}

export interface DiscordCommand {
  name: string;
  description: string;
  category?: string;
  options?: DiscordCommandOption[];
}

export interface DiscordCommandOption {
  name: string;
  description: string;
  type: number;
  required?: boolean;
  choices?: { name: string; value: string }[];
}

export interface GuildStats {
  growth?: {
    new7d: number;
  };
  growthHistory?: Array<{
    label: string;
    joins: number;
    leaves: number;
  }>;
  recentMembers?: Array<{
    userId: string;
    username: string;
    avatar: string;
    joinedAt: string;
  }>;
  totalMembers?: number;
  onlineMembers?: number;
  totalXP?: number;
  highestLevel?: number;
  averageLevel?: number;
}

export interface ServerInfo {
  [key: string]: unknown;
}

export interface GuildSettings {
  [key: string]: unknown;
}
