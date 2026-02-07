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

    // TODO: Verify if user has permissions for this guild
    // For now, we trust the auth session exists

    const response = await fetch(
      `${botApiUrl}${API_PREFIX}/guilds/${guildId}/settings`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        {
          success: false,
          error: errorData.message || "Failed to fetch from bot",
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Guild settings proxy error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
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

    const body = await request.json();

    const response = await fetch(
      `${botApiUrl}${API_PREFIX}/guilds/${guildId}/settings`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        {
          success: false,
          error: errorData.message || "Failed to update bot settings",
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Guild settings patch proxy error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
