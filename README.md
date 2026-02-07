# Role Reactor Website

The official website, documentation, and dashboard for the Role Reactor Discord bot.

## 🚀 Overview

This project is a Next.js application that includes:

- **Landing Page**: Marketing and feature showcase.
- **Documentation**: Powered by [Fumadocs](https://fumadocs.vercel.app).
- **Dashboard**: User dashboard for managing bot settings and AI generation.
- **Payments**: Integrated PayPal checkout flow.

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn UI (Radix UI + Tailwind)
- **Documentation**: Fumadocs MDX
- **State Management**: Zustand
- **Authentication**: NextAuth.js v5 (Discord OAuth)

## 📁 Project Structure

```
apps/website/
├── content/              # Documentation (MDX files)
├── src/
│   ├── app/
│   │   ├── (home)/       # Landing page routes
│   │   ├── dashboard/    # User dashboard
│   │   ├── docs/         # Documentation routes
│   │   └── api/          # API routes
│   ├── components/
│   │   ├── ui/           # Shadcn UI components
│   │   ├── dashboard/    # Dashboard-specific components
│   │   └── layout/       # Shared layout components
│   ├── lib/              # Utilities
│   └── store/            # Global state (Zustand)
```

## 🏃 Getting Started

### Prerequisites

- **Node.js** 18+
- **pnpm** 8+

### Installation

```bash
# Install dependencies
pnpm install
```

### Development

To start the development server:

```bash
# Start the website app
pnpm dev
```

The application will be available at `http://localhost:3000` (or the port specified in terminal).

### Build

To build the application for production:

```bash
pnpm build
```

## 🔧 Environment Variables

Create a `.env.local` file in `apps/website/` with the following variables:

```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here

# Discord OAuth
DISCORD_CLIENT_ID=your-client-id
DISCORD_CLIENT_SECRET=your-client-secret

# Database & API
DATABASE_URL=your-database-url
BOT_API_URL=http://localhost:8080

# Payments (PayPal)
PAYPAL_CLIENT_ID=your-paypal-client-id
PAYPAL_CLIENT_SECRET=your-paypal-secret
```

## 📄 License

MIT License - see LICENSE file for details.
