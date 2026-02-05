// Mock data for sponsors and Discord users
// These are used when real API integrations are not available

export interface Supporter {
  id: string;
  name: string;
  amount: number;
  message: string;
  date: string;
  isMonthly: boolean;
  discordUsername: string | null;
}

export interface DiscordUser {
  id: string;
  username: string;
  discriminator: string;
  avatar: string | null;
  avatar_url: string;
  verified: boolean;
}

export interface BMCStats {
  totalSupporters: number;
  totalAmount: number;
  monthlyAmount: number;
  oneTimeAmount: number;
  thisMonth: number;
}

// Mock supporters data
export const mockSupporters: Supporter[] = [
  {
    id: "mock_1",
    name: "John Doe",
    amount: 5.0,
    message: "Great bot! Discord: john_doe#1234",
    date: new Date().toISOString(),
    isMonthly: false,
    discordUsername: "john_doe",
  },
  {
    id: "mock_2",
    name: "Jane Smith",
    amount: 10.0,
    message: "Love the features! @jane_smith",
    date: new Date(Date.now() - 86400000).toISOString(),
    isMonthly: true,
    discordUsername: "jane_smith",
  },
  {
    id: "mock_3",
    name: "Mike Wilson",
    amount: 3.0,
    message: "Keep up the great work! Discord: mike_w#5678",
    date: new Date(Date.now() - 172800000).toISOString(),
    isMonthly: false,
    discordUsername: "mike_w",
  },
];

// Mock stats
export const mockStats: BMCStats = {
  totalSupporters: 3,
  totalAmount: 18.0,
  monthlyAmount: 10.0,
  oneTimeAmount: 8.0,
  thisMonth: 18.0,
};

// Mock Discord user data
export function getMockDiscordUser(username: string): DiscordUser {
  const avatarIndex = Math.floor(Math.random() * 5);
  return {
    id: `mock_${username}_${Date.now()}`,
    username: username,
    discriminator: "0000",
    avatar: null,
    avatar_url: `https://cdn.discordapp.com/embed/avatars/${avatarIndex}.png`,
    verified: false,
  };
}

// Get mock supporters data
export function getMockSupporters() {
  return {
    supporters: mockSupporters,
    stats: mockStats,
  };
}
