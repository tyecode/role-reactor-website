import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { botFetch } from "@/lib/bot-fetch";

export async function GET(_request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          error: { message: "Authentication required", code: 401 },
        },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    const botResponse = await botFetch("/payments/buymeacoffee/code-status", {
      method: "GET",
      userId,
    });

    const botData = await botResponse.json();

    if (!botResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: botData.message || "Failed to check status",
            code: botResponse.status,
          },
        },
        { status: botResponse.status }
      );
    }

    return NextResponse.json({ success: true, data: botData.data });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: { message: "Failed to check payment status", code: 500 },
      },
      { status: 500 }
    );
  }
}
