import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { botFetch } from "@/lib/bot-fetch";

// Minimum payment amount
const MINIMUM_PAYMENT = 1;

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
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const userEmail = session.user.email;
    const username = session.user.name;

    // Parse request body
    const body = await request.json();
    const { amount, packageId, currency } = body;

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
        { status: 400 }
      );
    }

    // Create payment via bot API (Plisio)
    // Pass user info directly since we've already authenticated them on the website
    const botResponse = await botFetch("/payments/create", {
      method: "POST",
      body: JSON.stringify({
        amount,
        packageId,
        currency, // Pass selected cryptocurrency
        // Pass authenticated user info from website session
        discordId: userId,
        email: userEmail,
        username: username,
      }),
    });

    if (!botResponse.ok) {
      const errorText = await botResponse.text();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let errorData: any;

      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { message: errorText.substring(0, 200) };
      }

      if (process.env.NODE_ENV === "development") {
        console.error(
          `Bot API payment creation failed (${botResponse.status}):`,
          errorData
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
        { status: statusCode }
      );
    }

    const botData = await botResponse.json();

    // Handle potential response structure variations
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
        { status: 500 }
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
      { status: 500 }
    );
  }
}
