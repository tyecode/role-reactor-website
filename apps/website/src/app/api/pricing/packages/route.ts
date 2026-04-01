import { NextResponse } from "next/server";
import { botFetch } from "@/lib/bot-fetch";

/**
 * Cached Core packages/pricing.
 * This endpoint intentionally does NOT include user balance.
 */
export async function GET() {
  try {
    const response = await botFetch("/pricing", {
      method: "GET",
      next: { revalidate: 300 },
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
    console.error("Error fetching pricing packages:", error);
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

