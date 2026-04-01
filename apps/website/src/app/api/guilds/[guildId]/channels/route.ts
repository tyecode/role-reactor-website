import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { botFetch } from "@/lib/bot-fetch";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ guildId: string }> }
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

    const userId = session.user?.id;
    const response = await botFetch(`/guilds/${guildId}/channels`, {
      cache: "no-store",
      userId,
    });

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
    return NextResponse.json(data.channels || []);
  } catch (error) {
    console.error("Guild channels proxy error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
