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
