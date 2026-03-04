import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("Utility Functions", () => {
  describe("cn", () => {
    it("should merge class names correctly", () => {
      expect(cn("foo", "bar")).toBe("foo bar");
    });

    it("should filter out falsy values", () => {
      expect(cn("foo", false, null, undefined, "bar")).toBe("foo bar");
    });

    it("should handle conditional classes", () => {
      const isActive = true;
      expect(cn("base", isActive && "active")).toBe("base active");
    });

    it("should handle tailwind merge", () => {
      expect(cn("px-2", "px-4")).toBe("px-4");
    });

    it("should handle empty input", () => {
      expect(cn()).toBe("");
    });
  });
});
