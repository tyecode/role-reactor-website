import { NextRequest, NextResponse } from "next/server";
import { API_PREFIX } from "@/lib/api-config";
import { botFetch } from "@/lib/bot-fetch";

/**
 * Get Core credit packages and pricing from the bot API
 * Optional user_id param for personalized pricing info
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("user_id");

    // Build path with optional user_id
    let path = `${API_PREFIX}/pricing`;
    if (userId) {
      path += `?user_id=${userId}`;
    }

    // Call bot API to get pricing
    const response = await botFetch(path, {
      method: "GET",
      // Disable cache to ensure real-time balance updates
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Bot API returned ${response.status}`);
    }

    const data = await response.json();

    // Handle bot's response format (either success: true with data envelope OR status: success with spread data)
    if (data.success && data.data) {
      return NextResponse.json({
        success: true,
        data: data.data,
      });
    }

    if (data.status === "success") {
      // The bot spreads data into the root object, so we extract the useful bits
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { status, timestamp, ...pricingInfo } = data;
      return NextResponse.json({
        success: true,
        data: pricingInfo,
      });
    }

    throw new Error("Invalid response format from Bot API");
  } catch (error) {
    console.error("Error fetching pricing:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          "Pricing service is currently unavailable. Please try again later.",
      },
      { status: 503 }
    );
  }
}
