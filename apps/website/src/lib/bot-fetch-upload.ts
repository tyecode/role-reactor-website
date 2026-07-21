import "server-only";
import { getBotApiUrl } from "./api-config";

interface BotFetchUploadOptions {
  silent?: boolean;
  userId?: string;
}

/**
 * Bot API Fetcher for file uploads (FormData)
 * Unlike botFetch, this does NOT set Content-Type — the browser
 * sets it automatically with the multipart boundary.
 */
export async function botFetchUpload(
  path: string,
  formData: FormData,
  options: BotFetchUploadOptions = {}
): Promise<Response> {
  const botApiUrl = process.env.BOT_API_URL;
  const internalKey = process.env.INTERNAL_API_KEY;
  const { userId } = options;

  if (!botApiUrl) {
    throw new Error("BOT_API_URL is not defined");
  }

  const apiKey = internalKey;
  const versionedPath = getBotApiUrl(path);
  const url = `${botApiUrl}${versionedPath}`;

  const headers: Record<string, string> = {
    ...(apiKey && { Authorization: `Bearer ${apiKey}` }),
    ...(userId && { "X-User-ID": userId }),
  };

  return fetch(url, {
    method: "POST",
    headers,
    body: formData,
  });
}
