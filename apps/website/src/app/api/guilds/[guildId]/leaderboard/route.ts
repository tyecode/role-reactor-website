import { NextRequest, NextResponse } from "next/server";
import { botFetch } from "@/lib/bot-fetch";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ guildId: string }> }
) {
  try {
    const { guildId } = await params;

    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit") || "50";

    const response = await botFetch(
      `/guilds/${guildId}/leaderboard?limit=${limit}`
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        {
          success: false,
          error: errorData.message || "Failed to fetch leaderboard",
          hint: errorData.hint,
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
