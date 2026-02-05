import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

// Minimum payment amount
const MINIMUM_PAYMENT = 3;

export async function POST(request: NextRequest) {
  try {
    // Check authentication on website
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Authentication required",
            code: 401,
          },
        },
        { status: 401 },
      );
    }

    const userId = session.user.id;
    const userEmail = session.user.email;
    const username = session.user.name;

    // Parse request body
    const body = await request.json();
    const { amount, packageId } = body;

    // Validate amount
    if (!amount || typeof amount !== "number" || amount < MINIMUM_PAYMENT) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: `Amount must be at least $${MINIMUM_PAYMENT}`,
            code: 400,
          },
        },
        { status: 400 },
      );
    }

    // Get bot API URL (required for Plisio payments)
    const botApiUrl = process.env.BOT_API_URL;

    if (!botApiUrl) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Payment system not configured. BOT_API_URL is required.",
            code: 503,
          },
        },
        { status: 503 },
      );
    }

    // Get internal API key for service-to-service auth (optional but recommended)
    const internalApiKey = process.env.BOT_INTERNAL_API_KEY;

    // Build headers
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Add internal API key if configured
    if (internalApiKey) {
      headers["X-Internal-API-Key"] = internalApiKey;
    }

    // Create payment via bot API (Plisio)
    // Pass user info directly since we've already authenticated them on the website
    const botResponse = await fetch(`${botApiUrl}/api/payments/create`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        amount,
        packageId,
        // Pass authenticated user info from website session
        discordId: userId,
        email: userEmail,
        username: username,
      }),
    });

    if (!botResponse.ok) {
      const errorText = await botResponse.text();
      let errorData;

      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { message: errorText.substring(0, 200) };
      }

      if (process.env.NODE_ENV === "development") {
        console.error(
          `Bot API payment creation failed (${botResponse.status}):`,
          errorData,
        );
      }

      // Handle specific error codes from bot API
      const statusCode = botResponse.status;
      const errorMessage =
        errorData.error?.message ||
        errorData.message ||
        "Failed to create payment";

      return NextResponse.json(
        {
          success: false,
          error: {
            message: errorMessage,
            code: statusCode,
            details:
              process.env.NODE_ENV === "development" ? errorData : undefined,
          },
        },
        { status: statusCode },
      );
    }

    const botData = await botResponse.json();

    // Handle potential response structure variations
    // Some endpoints might return { success: true, response: { ... } } instead of data
    const responseData = botData.data || botData.response || botData;
    const invoiceUrl = responseData?.invoiceUrl || responseData?.paymentUrl;

    // Check for success using either 'success' boolean or 'status' string
    const isSuccess = botData.success === true || botData.status === "success";

    if (!isSuccess || !invoiceUrl) {
      console.error("Invalid bot response structure:", botData);
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Failed to create payment invoice",
            code: 500,
          },
        },
        { status: 500 },
      );
    }

    // Return successful response with Plisio invoice URL
    return NextResponse.json({
      success: true,
      data: {
        invoiceUrl: invoiceUrl,
        paymentUrl: invoiceUrl,
        orderId: responseData.orderId,
        amount: responseData.amount || amount,
        currency: responseData.currency || "USD",
        packageId: responseData.packageId || packageId,
        user: responseData.user || {
          discordId: userId,
          username: username,
          emailPrefilled: true,
        },
        message: responseData.message,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (process.env.NODE_ENV === "development") {
      console.error("Error creating payment:", error);
    }
    return NextResponse.json(
      {
        success: false,
        error: {
          message:
            process.env.NODE_ENV === "development"
              ? `Failed to create payment: ${errorMessage}`
              : "Failed to create payment",
          code: 500,
        },
      },
      { status: 500 },
    );
  }
}
