import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { API_PREFIX } from "@/lib/api-config";
import { botFetch } from "@/lib/bot-fetch";

export async function GET(
  _request: NextRequest,
  { params }: { params: { guildId: string } }
) {
  try {
    const { guildId } = await params;

    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const response = await botFetch(`${API_PREFIX}/guilds/${guildId}/emojis`, {
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        {
          success: false,
          error: errorData.message || "Failed to fetch emojis from bot",
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log(
      `[Proxy] Fetched ${data.emojis?.length || 0} emojis for guild ${guildId}`
    );
    return NextResponse.json(data.emojis || []);
  } catch (error) {
    console.error("Guild emojis proxy error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
