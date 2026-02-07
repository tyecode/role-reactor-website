import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

/**
 * Get Core credit packages and pricing from the bot API
 * Optional user_id param for personalized pricing info
 */
export async function GET(request: NextRequest) {
  try {
    // Get bot API URL from environment variable
    const botApiUrl = process.env.BOT_API_URL;

    if (!botApiUrl) {
      console.warn("BOT_API_URL not configured");
      return NextResponse.json(
        {
          success: false,
          error: "Pricing service configuration is missing.",
        },
        { status: 500 }
      );
    }

    // Check if user is authenticated to get personalized pricing
    const session = await auth();
    const userId = session?.user?.id;

    // Also check query params for user_id
    const searchParams = request.nextUrl.searchParams;
    const queryUserId = searchParams.get("user_id");
    const effectiveUserId = userId || queryUserId;

    // Build URL with optional user_id
    const url = new URL(`${botApiUrl}/api/pricing`);
    if (effectiveUserId) {
      url.searchParams.set("user_id", effectiveUserId);
    }

    // Call bot API to get pricing
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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
