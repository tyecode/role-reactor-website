import { NextResponse } from "next/server";

/**
 * Test endpoint to verify Coinbase Commerce configuration
 * Only available in development mode
 * GET /api/payments/test-config
 */
export async function GET() {
  // Only allow in development
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Not available in production" },
      { status: 403 }
    );
  }

  const apiKey = process.env.COINBASE_API_KEY;
  const enabled = process.env.COINBASE_ENABLED;

  // Test API key by making a simple request
  let apiKeyValid = false;
  let apiKeyError: string | null = null;

  if (apiKey) {
    try {
      const response = await fetch(
        "https://api.commerce.coinbase.com/charges",
        {
          method: "GET",
          headers: {
            "X-CC-Api-Key": apiKey,
            "X-CC-Version": "2018-03-22",
          },
        }
      );

      const contentType = response.headers.get("content-type") || "";

      if (response.status === 401) {
        apiKeyError = "Invalid API key (401 Unauthorized)";
      } else if (contentType.includes("text/html")) {
        apiKeyError =
          "API returned HTML instead of JSON - likely invalid key or Cloudflare block";
      } else if (response.ok || response.status === 400) {
        // 400 is OK - it means auth worked but we need POST data
        apiKeyValid = true;
      } else {
        apiKeyError = `Unexpected status: ${response.status}`;
      }
    } catch (error) {
      apiKeyError = error instanceof Error ? error.message : String(error);
    }
  }

  return NextResponse.json({
    config: {
      apiKeyExists: !!apiKey,
      apiKeyLength: apiKey?.length || 0,
      apiKeyPreview: apiKey
        ? `${apiKey.substring(0, 8)}...${apiKey.substring(apiKey.length - 4)}`
        : null,
      enabled: enabled === "true",
      nodeEnv: process.env.NODE_ENV,
    },
    test: {
      apiKeyValid,
      apiKeyError,
    },
    recommendations: {
      ...(!apiKey && {
        missingApiKey: "Add COINBASE_API_KEY to .env.local",
      }),
      ...(apiKey &&
        !apiKeyValid && {
          invalidApiKey:
            "API key appears to be invalid. Check Coinbase Commerce dashboard and regenerate if needed.",
        }),
      ...(enabled !== "true" && {
        notEnabled: "Set COINBASE_ENABLED=true in .env.local",
      }),
    },
  });
}
