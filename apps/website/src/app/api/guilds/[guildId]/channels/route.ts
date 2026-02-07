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

    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const response = await fetch(
      `${botApiUrl}${API_PREFIX}/guilds/${guildId}/channels`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        {
          success: false,
          error: errorData.message || "Failed to fetch channels from bot",
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Guild channels proxy error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
