import { describe, it, expect, vi, beforeEach } from "vitest";
import { botFetch, botFetchJson } from "../lib/bot-fetch";

describe("botFetch Security Tests", () => {
  beforeEach(() => {
    vi.stubEnv("BOT_API_URL", "https://api.rolereactor.app");
    vi.stubEnv("INTERNAL_API_KEY", "test-internal-key-32chars-long-here!");
  });

  it("should include internal API key in Authorization header", async () => {
    const mockResponse = {
      ok: true,
      json: () => Promise.resolve({ status: "success" }),
    };
    vi.spyOn(global, "fetch").mockResolvedValue(
      mockResponse as unknown as Response
    );

    await botFetch("/test", { method: "GET" });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("https://api.rolereactor.app/api/v1/test"),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer test-internal-key-32chars-long-here!",
        }),
      })
    );
  });

  it("should include X-User-ID header when userId is provided", async () => {
    const mockResponse = {
      ok: true,
      json: () => Promise.resolve({ status: "success" }),
    };
    vi.spyOn(global, "fetch").mockResolvedValue(
      mockResponse as unknown as Response
    );

    await botFetch("/user/123/balance", { method: "GET", userId: "123" });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        headers: expect.objectContaining({
          "X-User-ID": "123",
        }),
      })
    );
  });

  it("should not include X-User-ID header when userId is not provided", async () => {
    const mockResponse = {
      ok: true,
      json: () => Promise.resolve({ status: "success" }),
    };
    vi.spyOn(global, "fetch").mockResolvedValue(
      mockResponse as unknown as Response
    );

    await botFetch("/health", { method: "GET" });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        headers: expect.not.objectContaining({
          "X-User-ID": expect.anything(),
        }),
      })
    );
  });

  it("should throw error when BOT_API_URL is not defined", async () => {
    vi.stubEnv("BOT_API_URL", "");
    vi.stubEnv("NODE_ENV", "production");

    await expect(botFetch("/test")).rejects.toThrow(
      "BOT_API_URL is not defined"
    );
  });

  it("should include Content-Type header", async () => {
    const mockResponse = {
      ok: true,
      json: () => Promise.resolve({ status: "success" }),
    };
    vi.spyOn(global, "fetch").mockResolvedValue(
      mockResponse as unknown as Response
    );

    await botFetch("/test", { method: "POST" });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        headers: expect.objectContaining({
          "Content-Type": "application/json",
        }),
      })
    );
  });
});

describe("botFetchJson Error Handling", () => {
  beforeEach(() => {
    vi.stubEnv("BOT_API_URL", "https://api.rolereactor.app");
    vi.stubEnv("INTERNAL_API_KEY", "test-internal-key-32chars-long-here!");
  });

  it("should throw error when response is not ok", async () => {
    const mockResponse = {
      ok: false,
      status: 401,
      json: () => Promise.resolve({ message: "Unauthorized" }),
    };
    vi.spyOn(global, "fetch").mockResolvedValue(
      mockResponse as unknown as Response
    );

    await expect(botFetchJson("/test")).rejects.toThrow("Unauthorized");
  });

  it("should return parsed JSON on success", async () => {
    const mockData = { status: "success", data: "test" };
    const mockResponse = {
      ok: true,
      json: () => Promise.resolve(mockData),
    };
    vi.spyOn(global, "fetch").mockResolvedValue(
      mockResponse as unknown as Response
    );

    const result = await botFetchJson<typeof mockData>("/test");

    expect(result).toEqual(mockData);
  });
});
