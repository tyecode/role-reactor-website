import { NextResponse } from "next/server";

/**
 * Proxy command usage statistics from the bot API
 * GET /api/stats/usage
 */
export async function GET() {
  try {
    const botApiUrl = process.env.BOT_API_URL;

    // Fetch from bot API
    const response = await fetch(`${botApiUrl}/api/commands/usage`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Cache for 1 minute to avoid hammering the bot API
      next: { revalidate: 60 },
    });

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
