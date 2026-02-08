import { NextResponse } from "next/server";
import { botFetch } from "@/lib/bot-fetch";

/**
 * Get supporter leaderboard
 * Calls the bot's API to get supporter data
 */
export async function GET() {
  try {
    // Call bot API to get supporter leaderboard
    const response = await botFetch("/supporters/leaderboard", {
      method: "GET",
      // Cache for 5 minutes
      next: { revalidate: 300 },
    } as RequestInit & { next?: { revalidate?: number } });

    if (!response.ok) {
      throw new Error(`Bot API returned ${response.status}`);
    }

    const data = await response.json();

    // The bot returns data in format: { success: true, response: { data: {...} } }
    if (data.success && data.response?.data) {
      return NextResponse.json({
        success: true,
        data: data.response.data,
      });
    }

    // Fallback if format is different
    return NextResponse.json({
      success: true,
      data: data.data || {
        supporters: [],
        totalSupporters: 0,
        totalRaised: 0,
      },
    });
  } catch (error) {
    console.error("Error fetching supporters:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch supporters",
      },
      { status: 500 }
    );
  }
}
