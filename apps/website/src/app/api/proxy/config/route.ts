import { NextResponse } from "next/server";

export async function GET() {
  const botApiUrl = process.env.BOT_API_URL || "http://localhost:3030";
  const internalKey = process.env.INTERNAL_API_KEY;

  if (!internalKey) {
    return NextResponse.json(
      { error: "Internal API key not configured" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(`${botApiUrl}/api/v1/config`, {
      headers: {
        Authorization: `Bearer ${internalKey}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Proxy Config] Failed:", response.status, errorText);
      return NextResponse.json(
        { error: `Bot API error: ${response.status}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("[Proxy Config] Network error:", error);
    return NextResponse.json(
      { error: "Failed to connect to bot API" },
      { status: 502 }
    );
  }
}
