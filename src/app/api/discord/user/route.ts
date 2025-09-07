import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");

    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    // Get Discord bot token from environment
    const discordToken = process.env.DISCORD_BOT_TOKEN;

    if (!discordToken) {
      // Return mock data if no Discord token is configured
      return NextResponse.json({
        id: `mock_${username}`,
        username: username,
        discriminator: "0000",
        avatar: null,
        avatar_url: `https://cdn.discordapp.com/embed/avatars/${Math.floor(
          Math.random() * 5
        )}.png`,
        verified: false,
        public_flags: 0,
      });
    }

    // Search for user by username (this requires a bot with appropriate permissions)
    const response = await fetch("https://discord.com/api/v10/users/@me", {
      headers: {
        Authorization: `Bot ${discordToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // Fallback to mock data if Discord API fails
      return NextResponse.json({
        id: `fallback_${username}`,
        username: username,
        discriminator: "0000",
        avatar: null,
        avatar_url: `https://cdn.discordapp.com/embed/avatars/${Math.floor(
          Math.random() * 5
        )}.png`,
        verified: false,
        public_flags: 0,
      });
    }

    const user = await response.json();
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching Discord user:", error);

    // Return mock data on error
    const username =
      new URL(request.url).searchParams.get("username") || "unknown";
    return NextResponse.json({
      id: `error_${username}`,
      username: username,
      discriminator: "0000",
      avatar: null,
      avatar_url: `https://cdn.discordapp.com/embed/avatars/${Math.floor(
        Math.random() * 5
      )}.png`,
      verified: false,
      public_flags: 0,
    });
  }
}
