import { NextResponse } from "next/server";

/**
 * Get supporter leaderboard
 * Calls the bot's API to get supporter data
 */
export async function GET() {
  try {
    // Get bot API URL from environment variable
    const botApiUrl = process.env.BOT_API_URL || process.env.NEXT_PUBLIC_BOT_API_URL;
    
    if (!botApiUrl) {
      console.warn("BOT_API_URL not configured, returning empty leaderboard");
      return NextResponse.json({
        success: true,
        data: {
          supporters: [],
          totalSupporters: 0,
          totalRaised: 0,
        },
      });
    }

    // Call bot API to get supporter leaderboard
    const response = await fetch(`${botApiUrl}/api/supporters/leaderboard`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Cache for 5 minutes
      next: { revalidate: 300 },
    });

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

