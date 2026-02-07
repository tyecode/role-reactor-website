/**
 * Bot API Fetcher
 * Centralized utility to handle authorized requests from website to bot
 */

export async function botFetch(path: string, options: RequestInit = {}) {
  const botApiUrl = process.env.BOT_API_URL;
  const internalKey = process.env.INTERNAL_API_KEY;

  if (!botApiUrl) {
    throw new Error("BOT_API_URL not configured");
  }

  // Ensure path starts with /
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${botApiUrl}${cleanPath}`;

  const headers = {
    "Content-Type": "application/json",
    ...(internalKey && { Authorization: `Bearer ${internalKey}` }),
    ...(options.headers || {}),
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  return response;
}
