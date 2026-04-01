import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { botFetch } from "@/lib/bot-fetch";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ guildId: string; commandId: string }> }
) {
  try {
    const { guildId, commandId } = await params;

    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { targetGuildId } = body;

    if (!targetGuildId) {
      return NextResponse.json(
        { success: false, error: "Target guild ID is required" },
        { status: 400 }
      );
    }

    const userId = session.user?.id;
    const response = await botFetch(
      `/guilds/${guildId}/custom-commands/${commandId}/duplicate`,
      {
        method: "POST",
        body: JSON.stringify({
          targetGuildId,
          createdBy: session.user?.id,
        }),
        userId,
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        {
          success: false,
          error: errorData.message || "Failed to duplicate custom command",
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Custom commands duplicate proxy error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
