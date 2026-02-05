import { handlers } from "@/auth";

// Export handlers - NextAuth v5 handles errors internally
export const { GET, POST } = handlers;

// Warn about missing configuration (only in development)
if (process.env.NODE_ENV === "development") {
  if (!process.env.AUTH_SECRET && !process.env.NEXTAUTH_SECRET) {
    console.warn("⚠️ AUTH_SECRET is missing! Please set it in .env.local file.");
  }
  if (!process.env.DISCORD_CLIENT_ID || !process.env.DISCORD_CLIENT_SECRET) {
    console.warn("⚠️ Discord OAuth credentials are missing! Please set them in .env.local file.");
  }
}
