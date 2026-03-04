# Role Reactor Website Docker Configuration
# Multi-stage build for optimized production image

# Stage 1: Dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Install pnpm
RUN corepack enable pnpm && corepack prepare pnpm@10.29.3 --activate

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/website/package.json ./apps/website/

# Install dependencies
RUN pnpm install --frozen-lockfile --filter=website...

# Stage 2: Builder
FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Install pnpm
RUN corepack enable pnpm && corepack prepare pnpm@10.29.3 --activate

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/website/node_modules ./apps/website/node_modules

# Copy source files
COPY . .

# Create .env.local from environment variables (will be provided at runtime)
WORKDIR /app/apps/website
RUN echo "# Environment variables provided at runtime" > .env.local

WORKDIR /app

# Build the application
ARG DISCORD_CLIENT_ID
ARG DISCORD_CLIENT_SECRET
ARG AUTH_SECRET
ARG BOT_API_URL
ARG INTERNAL_API_KEY
ARG NEXT_PUBLIC_BASE_URL

ENV DISCORD_CLIENT_ID=$DISCORD_CLIENT_ID \
    DISCORD_CLIENT_SECRET=$DISCORD_CLIENT_SECRET \
    AUTH_SECRET=$AUTH_SECRET \
    BOT_API_URL=$BOT_API_URL \
    INTERNAL_API_KEY=$INTERNAL_API_KEY \
    NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL

RUN pnpm build --filter=website

# Stage 3: Runner
FROM node:20-alpine AS runner
RUN apk add --no-cache curl

WORKDIR /app

# Install pnpm
RUN corepack enable pnpm && corepack prepare pnpm@10.29.3 --activate

# Set production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from builder
COPY --from=builder /app/apps/website/public ./apps/website/public
COPY --from=builder /app/apps/website/.next/standalone ./apps/website
COPY --from=builder /app/apps/website/.next/static ./apps/website/.next/static

# Set correct permissions
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:${PORT}/ || exit 1

CMD ["node", "apps/website/server.js"]
