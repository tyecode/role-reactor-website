/**
 * Rate Limiting Utility
 * Simple in-memory rate limiter for API routes
 * For production, consider using @upstash/ratelimit with Redis
 */

interface RateLimitConfig {
  interval: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per interval
}

interface RateLimitData {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private store = new Map<string, RateLimitData>();
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = config;
  }

  /**
   * Check if request is allowed
   * @param identifier - Unique identifier (e.g., IP, user ID)
   * @returns Object with allowed status and remaining requests
   */
  check(identifier: string): {
    allowed: boolean;
    remaining: number;
    resetTime: number;
    limit: number;
  } {
    const now = Date.now();
    const data = this.store.get(identifier);

    if (!data || now > data.resetTime) {
      // Reset or create new entry
      this.store.set(identifier, {
        count: 1,
        resetTime: now + this.config.interval,
      });
      return {
        allowed: true,
        remaining: this.config.maxRequests - 1,
        resetTime: now + this.config.interval,
        limit: this.config.maxRequests,
      };
    }

    if (data.count >= this.config.maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: data.resetTime,
        limit: this.config.maxRequests,
      };
    }

    // Increment count
    data.count++;
    this.store.set(identifier, data);

    return {
      allowed: true,
      remaining: this.config.maxRequests - data.count,
      resetTime: data.resetTime,
      limit: this.config.maxRequests,
    };
  }

  /**
   * Clean up expired entries (call periodically)
   */
  cleanup(): void {
    const now = Date.now();
    for (const [key, data] of this.store.entries()) {
      if (now > data.resetTime) {
        this.store.delete(key);
      }
    }
  }
}

/**
 * Create a rate limiter middleware for Next.js API routes
 */
export function createRateLimiter(config: RateLimitConfig) {
  const limiter = new RateLimiter(config);

  // Clean up every 5 minutes
  setInterval(() => limiter.cleanup(), 5 * 60 * 1000);

  return {
    /**
     * Middleware function for API routes
     */
    middleware(identifier: string) {
      const result = limiter.check(identifier);

      return {
        allowed: result.allowed,
        headers: {
          "X-RateLimit-Limit": result.limit.toString(),
          "X-RateLimit-Remaining": result.remaining.toString(),
          "X-RateLimit-Reset": result.resetTime.toString(),
        },
        retryAfter: result.allowed
          ? null
          : Math.ceil((result.resetTime - Date.now()) / 1000),
      };
    },

    /**
     * Get current usage for an identifier
     */
    getUsage(identifier: string): RateLimitData | undefined {
      return limiter.check(identifier) as unknown as RateLimitData;
    },
  };
}

/**
 * Pre-configured rate limiters for common use cases
 */
export const rateLimiters = {
  // API routes: 100 requests per minute
  api: createRateLimiter({ interval: 60 * 1000, maxRequests: 100 }),

  // Auth routes: 5 requests per minute (strict)
  auth: createRateLimiter({ interval: 60 * 1000, maxRequests: 5 }),

  // Payment routes: 10 requests per minute
  payments: createRateLimiter({ interval: 60 * 1000, maxRequests: 10 }),

  // General: 1000 requests per hour
  general: createRateLimiter({ interval: 60 * 60 * 1000, maxRequests: 1000 }),
};

/**
 * Helper to get client IP from request
 */
export function getClientIP(request: Request): string {
  const headers = request.headers;
  return (
    headers.get("x-forwarded-for")?.split(",")[0] ??
    headers.get("x-real-ip") ??
    "unknown"
  );
}
