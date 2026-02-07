import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { API_PREFIX } from "@/lib/api-config";

export async function GET(
  request: NextRequest,
  { params }: { params: { guildId: string } }
) {
  try {
    const { guildId } = await params;
    const botApiUrl = process.env.BOT_API_URL;
    const apiKey = process.env.INTERNAL_API_KEY;

    if (!botApiUrl || !apiKey) {
      return NextResponse.json(
        { success: false, error: "Server configuration missing" },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit") || "50";

    const response = await fetch(
      `${botApiUrl}${API_PREFIX}/guilds/${guildId}/leaderboard?limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        {
          success: false,
          error: errorData.message || "Failed to fetch leaderboard",
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Guild leaderboard proxy error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
