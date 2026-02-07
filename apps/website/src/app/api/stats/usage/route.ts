import { NextResponse } from "next/server";
import { API_PREFIX } from "@/lib/api-config";
import { botFetch } from "@/lib/bot-fetch";

/**
 * Proxy command usage statistics from the bot API
 * GET /api/stats/usage
 */
export async function GET() {
  try {
    // Fetch from bot API
    const response = await botFetch(`${API_PREFIX}/commands/usage`, {
      method: "GET",
      // Cache for 1 minute to avoid hammering the bot API
      next: { revalidate: 60 },
    } as any);

    if (!response.ok) {
      throw new Error(`Bot API returned ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching command stats:", error);
    // Return mock-like data on error so UI doesn't break
    return NextResponse.json({
      status: "error",
      message: "Could not fetch stats",
      summary: {
        totalExecutions: 0,
        totalCommands: 0,
      },
    });
  }
}
