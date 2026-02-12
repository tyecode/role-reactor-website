import { NextResponse } from "next/server";
import { botFetch } from "@/lib/bot-fetch";

export const dynamic = "force-dynamic";

/**
 * Proxy endpoint for bot health metrics
 * @route GET /api/proxy/health
 */
export async function GET() {
  try {
    const response = await botFetch("/health");

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Bot API health error:", response.status, errorText);
      return NextResponse.json(
        { error: "Failed to fetch health data from bot API" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Health proxy error:", error);
    return NextResponse.json(
      { error: "Internal server error while fetching health data" },
      { status: 500 }
    );
  }
}
