import { z } from "zod";

/**
 * Environment Variable Validation Schema
 * Validates all required and optional environment variables at runtime
 */

const environmentSchema = z.object({
  // Discord OAuth Configuration (Required)
  DISCORD_CLIENT_ID: z
    .string()
    .min(1, "DISCORD_CLIENT_ID is required")
    .regex(/^\d+$/, "DISCORD_CLIENT_ID must be a valid Discord client ID"),
  DISCORD_CLIENT_SECRET: z
    .string()
    .min(1, "DISCORD_CLIENT_SECRET is required")
    .min(32, "DISCORD_CLIENT_SECRET must be at least 32 characters"),

  // Authentication Configuration (Required)
  AUTH_SECRET: z
    .string()
    .min(1, "AUTH_SECRET is required")
    .min(32, "AUTH_SECRET must be at least 32 characters"),

  // Base URLs (Optional with defaults)
  NEXT_PUBLIC_BASE_URL: z.string().url().default("http://localhost:8080"),

  // Bot API Configuration (Required)
  BOT_API_URL: z.string().url().min(1, "BOT_API_URL is required"),
  INTERNAL_API_KEY: z
    .string()
    .min(1, "INTERNAL_API_KEY is required")
    .min(32, "INTERNAL_API_KEY must be at least 32 characters"),

  // Optional: Developer IDs
  NEXT_PUBLIC_DEVELOPER_IDS: z.string().optional(),
  DISCORD_DEVELOPERS: z.string().optional(),
  NEXT_PUBLIC_DISCORD_DEVELOPERS: z.string().optional(),

  // Optional: Google Site Verification
  GOOGLE_SITE_VERIFICATION: z.string().optional(),

  // Optional: Vercel Analytics
  VERCEL_ANALYTICS_ID: z.string().optional(),
});

export type Environment = z.infer<typeof environmentSchema>;

/**
 * Validates and returns the environment configuration
 * @throws Error if validation fails
 */
export function validateEnvironment(): Environment {
  const result = environmentSchema.safeParse({
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
    AUTH_SECRET: process.env.AUTH_SECRET,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    BOT_API_URL: process.env.BOT_API_URL,
    INTERNAL_API_KEY: process.env.INTERNAL_API_KEY,
    NEXT_PUBLIC_DEVELOPER_IDS: process.env.NEXT_PUBLIC_DEVELOPER_IDS,
    DISCORD_DEVELOPERS: process.env.DISCORD_DEVELOPERS,
    NEXT_PUBLIC_DISCORD_DEVELOPERS: process.env.NEXT_PUBLIC_DISCORD_DEVELOPERS,
    GOOGLE_SITE_VERIFICATION: process.env.GOOGLE_SITE_VERIFICATION,
    VERCEL_ANALYTICS_ID: process.env.VERCEL_ANALYTICS_ID,
  });

  if (!result.success) {
    const formattedError = result.error.format();
    const errorMessages = Object.entries(formattedError)
      .filter(([key]) => key !== "_errors")
      .map(([key, value]) => {
        if (value && typeof value === "object" && "_errors" in value) {
          return `${key}: ${(value._errors as string[]).join(", ")}`;
        }
        return `${key}: Invalid value`;
      });

    throw new Error(
      `Environment variable validation failed:\n${errorMessages.join("\n")}`
    );
  }

  return result.data;
}

/**
 * Pre-validated environment object
 * Use this in your application code for type-safe access
 */
const isBuildPhase =
  process.env.NEXT_PHASE === "phase-production-build" ||
  process.env.NEXT_PHASE === "phase-production-build-serverless" ||
  process.env.NEXT_PHASE === "phase-pre-compile" ||
  process.env.NODE_ENV === "test";

export const env: Environment = isBuildPhase
  ? ({
      DISCORD_CLIENT_ID: "0",
      DISCORD_CLIENT_SECRET: "a".repeat(32),
      AUTH_SECRET: "a".repeat(32),
      NEXT_PUBLIC_BASE_URL: "http://localhost:8080",
      BOT_API_URL: "http://localhost:3030",
      INTERNAL_API_KEY: "a".repeat(32),
    } as Environment)
  : validateEnvironment();
