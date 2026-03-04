import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock Next.js router
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
  useParams: () => ({}),
  redirect: vi.fn(),
  notFound: vi.fn(),
}));

// Mock next-auth
vi.mock("next-auth", () => ({
  default: vi.fn(),
  getServerSession: vi.fn(),
}));

// Mock server-only modules
vi.mock("server-only", () => ({}));

// Mock environment variables
vi.mock("@/lib/env", () => ({
  env: {
    DISCORD_CLIENT_ID: "123456789012345678",
    DISCORD_CLIENT_SECRET: "test_client_secret_at_least_32_characters_long",
    AUTH_SECRET: "test_auth_secret_at_least_32_characters_long",
    NEXT_PUBLIC_BASE_URL: "http://localhost:8080",
    NEXT_PUBLIC_DASHBOARD_URL: "http://localhost:8888",
    BOT_API_URL: "http://localhost:3030",
    INTERNAL_API_KEY: "test_internal_key_at_least_32_characters_long",
  },
  validateEnvironment: vi.fn(),
}));
