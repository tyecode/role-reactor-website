import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

// Donation rate: 10 Cores per $1
const DONATION_RATE = 10;
const MINIMUM_DONATION = 1;

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Not authenticated", code: 401 },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const userEmail = session.user.email;

    // Parse request body
    const body = await request.json();
    const { amount } = body;

    // Validate amount
    if (!amount || typeof amount !== "number" || amount < MINIMUM_DONATION) {
      return NextResponse.json(
        {
          error: `Amount must be at least $${MINIMUM_DONATION}`,
          code: 400,
        },
        { status: 400 }
      );
    }

    // Check if crypto payments are enabled
    if (
      !process.env.COINBASE_ENABLED ||
      process.env.COINBASE_ENABLED !== "true"
    ) {
      return NextResponse.json(
        {
          error: "Cryptocurrency payments not enabled",
          code: 503,
        },
        { status: 503 }
      );
    }

    const apiKey = process.env.COINBASE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error: "Payment system not configured",
          code: 500,
        },
        { status: 500 }
      );
    }

    // Calculate credits
    const credits = Math.floor(amount * DONATION_RATE);

    // Get base URL for redirects
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      process.env.NEXT_PUBLIC_VERCEL_URL ||
      "http://localhost:3000";

    // Create Coinbase Commerce charge
    const chargeData = {
      name: "Core Credits",
      description: "One-time Core credits purchase",
      pricing_type: "fixed_price",
      local_price: {
        amount: amount.toString(),
        currency: "USD",
      },
      metadata: {
        discord_user_id: userId,
        discord_email: userEmail || null,
        type: "donation",
      },
      redirects: {
        success_url: `${baseUrl}/sponsor?payment=success`,
        cancel_url: `${baseUrl}/sponsor?payment=cancelled`,
      },
    };

    const response = await fetch("https://api.commerce.coinbase.com/charges", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CC-Api-Key": apiKey,
        "X-CC-Version": "2018-03-22",
      },
      body: JSON.stringify(chargeData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      const contentType = response.headers.get("content-type") || "";

      // Check if response is HTML (Cloudflare error page, etc.)
      if (
        contentType.includes("text/html") ||
        errorText.trim().startsWith("<")
      ) {
        if (process.env.NODE_ENV === "development") {
          console.error(
            `Coinbase Commerce API returned HTML instead of JSON. Status: ${response.status}`
          );
          console.error("This usually means:");
          console.error("1. API endpoint is blocked by Cloudflare/firewall");
          console.error("2. API key is invalid or expired");
          console.error("3. Network connectivity issue");
        }

        return NextResponse.json(
          {
            error:
              process.env.NODE_ENV === "development"
                ? "Coinbase Commerce API returned an error page. Check server console for details. This may indicate an API key issue or network problem."
                : "Failed to create payment. Please check your API configuration.",
            code: 500,
            details:
              process.env.NODE_ENV === "development"
                ? {
                    status: response.status,
                    contentType,
                    hint: "Response was HTML instead of JSON - likely a Cloudflare block or invalid API key",
                  }
                : undefined,
          },
          { status: 500 }
        );
      }

      // Try to parse JSON error response
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { message: errorText.substring(0, 200) }; // Limit length
      }

      // Log error for debugging (server-side only)
      if (process.env.NODE_ENV === "development") {
        console.error(
          `Coinbase Commerce API error: ${response.status} - ${JSON.stringify(
            errorData
          )}`
        );
      }

      return NextResponse.json(
        {
          error:
            process.env.NODE_ENV === "development"
              ? `Failed to create payment: ${
                  errorData.error?.message ||
                  errorData.message ||
                  `HTTP ${response.status}`
                }`
              : "Failed to create payment",
          code: 500,
          details:
            process.env.NODE_ENV === "development" ? errorData : undefined,
        },
        { status: 500 }
      );
    }

    const charge = await response.json();
    const paymentUrl = charge.data?.hosted_url;

    if (!paymentUrl) {
      return NextResponse.json(
        {
          error: "Failed to create payment URL",
          code: 500,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        paymentUrl,
        chargeId: charge.data?.id,
        amount,
        credits,
        type: "donation",
      },
    });
  } catch (error) {
    // Log error for debugging (server-side only)
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (process.env.NODE_ENV === "development") {
      console.error("Error creating payment:", error);
    }
    return NextResponse.json(
      {
        error:
          process.env.NODE_ENV === "development"
            ? `Failed to create payment: ${errorMessage}`
            : "Failed to create payment",
        code: 500,
        details:
          process.env.NODE_ENV === "development"
            ? {
                message: errorMessage,
                stack: error instanceof Error ? error.stack : undefined,
              }
            : undefined,
      },
      { status: 500 }
    );
  }
}
