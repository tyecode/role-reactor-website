import { botFetch } from "./bot-fetch";

export interface BotStatus {
  online: boolean;
  latency?: number;
}

/**
 * Check if the bot API is reachable.
 * Returns { online: false } on any error (network, timeout, non-2xx).
 */
export async function checkBotStatus(): Promise<BotStatus> {
  try {
    const response = await botFetch("/health", {
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      return { online: false };
    }

    return { online: true };
  } catch {
    return { online: false };
  }
}
