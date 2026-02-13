import "server-only";
import { getBotApiUrl } from "./api-config";

/**
 * Bot API Fetcher
 * Centralized utility to handle authorized requests from website to bot.
 * Returns the raw Response object.
 */
export async function botFetch(path: string, options: RequestInit = {}) {
  const botApiUrl = process.env.BOT_API_URL;
  const internalKey = process.env.INTERNAL_API_KEY;

  if (!botApiUrl) {
    throw new Error("BOT_API_URL is not defined in environment variables");
  }

  if (!internalKey && process.env.NODE_ENV === "development") {
    console.warn(
      `[botFetch Warning] INTERNAL_API_KEY is missing. Requests to ${path} might fail authorized checks on the bot.`
    );
  }

  // Ensure path is properly versioned (e.g., /guilds -> /api/v1/guilds)
  const versionedPath = getBotApiUrl(path);
  const url = `${botApiUrl}${versionedPath}`;

  const headers = {
    "Content-Type": "application/json",
    ...(internalKey && { Authorization: `Bearer ${internalKey}` }),
    ...(options.headers || {}),
  } as Record<string, string>;

  return fetch(url, {
    ...options,
    headers,
  });
}

/**
 * Strategic wrapper for botFetch that handles JSON parsing and error status automatically.
 * Useful for easy data fetching in Server Components or Background Tasks.
 *
 * @example
 * const settings = await botFetchJson<GuildSettings>(`/guilds/${id}/settings`);
 */
export async function botFetchJson<T>(
  path: string,
  options: RequestInit & { silent?: boolean } = {}
): Promise<T> {
  const { silent, ...fetchOptions } = options;
  const response = await botFetch(path, fetchOptions);

  if (!response.ok) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let errorData: any = {};
    try {
      errorData = await response.json();
    } catch {
      // Body might be empty or not JSON
    }

    const message =
      errorData.message ||
      errorData.error ||
      `Bot API returned ${response.status} for ${path}`;

    if (!silent && process.env.NODE_ENV !== "test") {
      console.error(`[botFetchJson Error] ${message}`, {
        status: response.status,
        path,
        errorData,
      });
    }

    throw new Error(message);
  }

  return response.json() as Promise<T>;
}
