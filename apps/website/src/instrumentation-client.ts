import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Add optional integrations for additional features
  integrations: [
    Sentry.replayIntegration(),
    Sentry.feedbackIntegration({
      // Additional SDK configuration goes here
      colorScheme: "dark",
    }),
  ],

  // Define how likely traces are sampled
  tracesSampleRate: 0.1,

  // Define how likely Replay events are sampled
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  // Define how likely feedback events are sampled
  _experiments: {
    feedbackSampleRate: 1.0,
  },

  // Set environment
  environment: process.env.NODE_ENV,

  // Don't send errors in development
  enabled: process.env.NODE_ENV === "production",
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
