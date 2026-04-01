import "server-only";
import { getBotApiUrl } from "./api-config";

interface BotFetchOptions extends RequestInit {
  silent?: boolean;
  userId?: string;
}

/**
 * Bot API Fetcher
 * Centralized utility to handle authorized requests from website to bot.
 * Returns the raw Response object.
 */
export async function botFetch(
  path: string,
  options: BotFetchOptions = {}
): Promise<Response> {
  const botApiUrl = process.env.BOT_API_URL;
  const internalKey = process.env.INTERNAL_API_KEY;
  const { userId, ...fetchOptions } = options;

  // Use fallback for local dev if env not set
  const apiUrl = botApiUrl || "http://localhost:3030";
  const apiKey = internalKey;

  if (!apiKey && process.env.NODE_ENV === "development") {
    console.warn(
      `[botFetch Warning] INTERNAL_API_KEY is missing. Requests to ${path} might fail authorized checks on the bot.`
    );
  }

  const versionedPath = getBotApiUrl(path);
  const url = `${apiUrl}${versionedPath}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(apiKey && { Authorization: `Bearer ${apiKey}` }),
    ...(userId && { "X-User-ID": userId }),
    ...(fetchOptions.headers as Record<string, string>),
  };

  return fetch(url, {
    ...fetchOptions,
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
  options: BotFetchOptions = {}
): Promise<T> {
  const { silent, ...fetchOptions } = options;
  const response = await botFetch(path, fetchOptions);

  if (!response.ok) {
    let errorData: Record<string, unknown> = {};
    try {
      errorData = await response.json();
    } catch {
      // Body might be empty or not JSON
    }

    const message =
      (errorData.message as string) ||
      (errorData.error as string) ||
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
