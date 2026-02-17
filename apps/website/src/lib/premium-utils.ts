export interface SubscriptionProgress {
  progress: number;
  days: number;
  hours: number;
  minutes: number;
  isExpired: boolean;
  totalMs: number;
  remainingMs: number;
}

/**
 * Calculates the progress and remaining time for a subscription.
 * Handles legacy fallbacks if lastDeductionDate is missing.
 */
export function calculateSubscriptionProgress(
  expiresAt: string | Date | undefined,
  lastDeductionDate?: string | Date | null,
  defaultPeriodDays: number = 30
): SubscriptionProgress {
  if (!expiresAt) {
    return {
      progress: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      isExpired: true,
      totalMs: 0,
      remainingMs: 0,
    };
  }

  const expiryDate = new Date(expiresAt);
  const now = new Date();

  const expiryMs = expiryDate.getTime();
  const nowMs = now.getTime();
  const remainingMs = Math.max(0, expiryMs - nowMs);

  // Calculate start of cycle
  const startMs = lastDeductionDate
    ? new Date(lastDeductionDate).getTime()
    : expiryMs - defaultPeriodDays * 24 * 60 * 60 * 1000;

  const totalMs = expiryMs - startMs;

  // Progress is 0-100%
  const progress =
    totalMs > 0
      ? Math.min(100, Math.max(0, (remainingMs / totalMs) * 100))
      : 100;

  // Breakdown components
  const days = Math.floor(remainingMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (remainingMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));

  return {
    progress,
    days,
    hours,
    minutes,
    isExpired: nowMs > expiryMs,
    totalMs,
    remainingMs,
  };
}
