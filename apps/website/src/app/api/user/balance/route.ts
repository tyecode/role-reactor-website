import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { botFetch } from "@/lib/bot-fetch";
import { rateLimiters, getClientIP } from "@/lib/rate-limit";

/**
 * Proxy user balance requests to the bot API
 */
export async function GET(request: Request) {
  const ip = getClientIP(request);
  const { allowed, headers } = rateLimiters.api.middleware(ip);

  if (!allowed) {
    return NextResponse.json(
      { success: false, error: "Rate limit exceeded" },
      { status: 429, headers }
    );
  }

  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ success: true, balance: 0 }, { status: 200 });
    }

    const response = await botFetch(`/user/${userId}/balance`, {
      method: "GET",
      cache: "no-store",
      userId,
    });

    if (!response.ok) {
      return NextResponse.json({
        success: true,
        balance: 0,
      });
    }

    const data = await response.json();

    if (data.success && data.data?.user?.currentCredits !== undefined) {
      const rawBalance = data.data.user.currentCredits;
      const fixedBalance = Number(Number(rawBalance).toFixed(2));
      return NextResponse.json({
        success: true,
        balance: fixedBalance,
      });
    }

    if (data.status === "success" && data.credits !== undefined) {
      const rawBalance = data.credits;
      const fixedBalance = Number(Number(rawBalance).toFixed(2));
      return NextResponse.json({
        success: true,
        balance: fixedBalance,
      });
    }

    return NextResponse.json({
      success: true,
      balance: 0,
    });
  } catch {
    return NextResponse.json({
      success: true,
      balance: 0,
    });
  }
}
