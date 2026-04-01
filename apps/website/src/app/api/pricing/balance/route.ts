import { NextRequest, NextResponse } from "next/server";
import { botFetch } from "@/lib/bot-fetch";

/**
 * Real-time Core balance for a user.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("user_id");

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Missing user_id" },
        { status: 400 }
      );
    }

    const response = await botFetch(`/pricing?user_id=${userId}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Bot API returned ${response.status}`);
    }

    const data = await response.json();

    if (data.success && data.data) {
      return NextResponse.json({ success: true, data: data.data });
    }

    if (data.status === "success") {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { status, timestamp, ...pricingInfo } = data;
      return NextResponse.json({ success: true, data: pricingInfo });
    }

    throw new Error("Invalid response format from Bot API");
  } catch (error) {
    console.error("Error fetching pricing balance:", error);
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

