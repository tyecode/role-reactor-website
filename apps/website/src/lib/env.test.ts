import { describe, it, expect } from "vitest";
import { env } from "@/lib/env";

describe("Environment Validation", () => {
  it("should have valid environment variables", () => {
    expect(env).toBeDefined();
    expect(env.DISCORD_CLIENT_ID).toBeDefined();
    expect(env.DISCORD_CLIENT_SECRET).toBeDefined();
    expect(env.AUTH_SECRET).toBeDefined();
    expect(env.BOT_API_URL).toBeDefined();
    expect(env.INTERNAL_API_KEY).toBeDefined();
  });

  it("should have valid URL formats", () => {
    expect(() => new URL(env.NEXT_PUBLIC_BASE_URL)).not.toThrow();
    expect(() => new URL(env.NEXT_PUBLIC_DASHBOARD_URL)).not.toThrow();
    expect(() => new URL(env.BOT_API_URL)).not.toThrow();
  });

  it("should have secure secret lengths", () => {
    expect(env.DISCORD_CLIENT_SECRET.length).toBeGreaterThanOrEqual(32);
    expect(env.AUTH_SECRET.length).toBeGreaterThanOrEqual(32);
    expect(env.INTERNAL_API_KEY.length).toBeGreaterThanOrEqual(32);
  });
});
