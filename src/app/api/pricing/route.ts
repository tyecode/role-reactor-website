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
      console.warn("BOT_API_URL not configured, returning default pricing");
      return NextResponse.json({
        success: true,
        data: getDefaultPricing(),
      });
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
      // Cache for 5 minutes
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error(`Bot API returned ${response.status}`);
    }

    const data = await response.json();

    // The bot returns data in format: { success: true, data: {...} }
    if (data.success && data.data) {
      return NextResponse.json({
        success: true,
        data: data.data,
      });
    }

    // Fallback to default pricing
    return NextResponse.json({
      success: true,
      data: getDefaultPricing(),
    });
  } catch (error) {
    console.error("Error fetching pricing:", error);
    // Return default pricing on error so page still works
    return NextResponse.json({
      success: true,
      data: getDefaultPricing(),
    });
  }
}

/**
 * Default pricing config when bot API is unavailable
 */
function getDefaultPricing() {
  return {
    packages: [
      {
        id: "$5",
        name: "Starter",
        price: 5,
        currency: "USD",
        baseCores: 75,
        bonusCores: 5,
        totalCores: 80,
        valuePerDollar: "16.0 Cores/$1",
        description: "Perfect for trying AI features",
        estimatedUsage: "~8,000 chat messages or 38 images",
        popular: false,
        features: [],
      },
      {
        id: "$10",
        name: "Basic",
        price: 10,
        currency: "USD",
        baseCores: 150,
        bonusCores: 15,
        totalCores: 165,
        valuePerDollar: "16.5 Cores/$1",
        description: "Most popular choice for regular users",
        estimatedUsage: "~16,500 chat messages or 78 images",
        popular: true,
        features: [],
      },
      {
        id: "$25",
        name: "Pro",
        price: 25,
        currency: "USD",
        baseCores: 375,
        bonusCores: 50,
        totalCores: 425,
        valuePerDollar: "17.0 Cores/$1",
        description: "Best value for power users",
        estimatedUsage: "~42,500 chat messages or 202 images",
        popular: false,
        features: [],
      },
      {
        id: "$50",
        name: "Ultimate",
        price: 50,
        currency: "USD",
        baseCores: 750,
        bonusCores: 125,
        totalCores: 875,
        valuePerDollar: "17.5 Cores/$1",
        description: "Maximum value for heavy usage",
        estimatedUsage: "~87,500 chat messages or 416 images",
        popular: false,
        features: ["Priority processing", "Dedicated support"],
      },
    ],
    minimumPayment: 3,
    currency: "USD",
    paymentMethods: {
      paypal: true,
      crypto: true,
    },
    promotions: [],
    referralSystem: {
      enabled: true,
      referrerBonus: "15%",
      refereeBonus: "10%",
      minimumPurchase: 10,
    },
  };
}
