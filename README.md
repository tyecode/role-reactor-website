# Role Reactor Website - Monorepo

A Turborepo monorepo containing the Role Reactor landing page, documentation, and dashboard.

## 📁 Project Structure

```
role-reactor-website/
├── apps/
│   ├── website/              # Landing page + Documentation
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── (home)/  # Landing page
│   │   │   │   ├── docs/    # Documentation (Fumadocs)
│   │   │   │   ├── checkout/ # Payment/checkout flow
│   │   │   │   └── contact/
│   │   │   └── components/
│   │   │       ├── auth/    # Authentication
│   │   │       └── pricing/ # Pricing/payment components
│   │   └── package.json
│   │
│   └── dashboard/            # User Dashboard
│       ├── src/
│       │   ├── app/
│       │   │   ├── page.tsx          # Dashboard home
│       │   │   ├── generate/         # AI generation
│       │   │   ├── history/          # Generation history
│       │   │   └── settings/         # User settings
│       │   └── components/
│       │       ├── auth/             # Auth components
│       │       └── dashboard/        # Dashboard UI
│       └── package.json
│
└── packages/
    └── ui/                   # Shared UI Components
        ├── components/       # All Shadcn UI components
        ├── hooks/            # Shared hooks (use-mobile)
        └── lib/              # Utilities (cn)
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+
- **pnpm** 8+ (recommended package manager)

### Installation

```bash
# Install pnpm if you don't have it
npm install -g pnpm

# Install dependencies
pnpm install
```

## 🏃 Running the Project

### Development Mode

**Run all apps:**

```bash
pnpm dev
```

**Run specific app:**

```bash
# Website only (landing + docs)
pnpm dev --filter website

# Dashboard only
pnpm dev --filter dashboard
```

**Access the apps:**

- Website: http://localhost:3000
- Dashboard: http://localhost:3001 (or next available port)

### Build

**Build all apps:**

```bash
pnpm run build
```

**Build specific app:**

```bash
pnpm build --filter website
pnpm build --filter dashboard
```

### Production

**Start production server:**

```bash
# Build first
pnpm run build

# Start all apps
pnpm start

# Or specific app
pnpm start --filter website
pnpm start --filter dashboard
```

## 🧪 Other Commands

### Type Checking

```bash
# Check all packages
pnpm type-check

# Check specific app
pnpm type-check --filter website
```

### Linting

```bash
# Lint all packages
pnpm lint

# Lint specific app
pnpm lint --filter website
```

### Formatting

```bash
# Format all files with Prettier
pnpm format

# Check formatting without making changes
pnpm format:check
```

### Clean Build Artifacts

```bash
# Clean all build outputs
pnpm clean

# Or manually
rm -rf apps/*/. next apps/*/.turbo packages/*/.turbo
```

## 📦 Package Scripts

### Root (Monorepo)

- `pnpm dev` - Start all apps in development
- `pnpm build` - Build all apps
- `pnpm start` - Start all apps in production
- `pnpm lint` - Lint all packages
- `pnpm format` - Format all files with Prettier
- `pnpm format:check` - Check formatting without changes
- `pnpm type-check` - Type check all packages
- `pnpm clean` - Clean build artifacts

### Website App

- `pnpm dev` - Start dev server (port 3000)
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Run TypeScript compiler

### Dashboard App

- `pnpm dev` - Start dev server (port 3001)
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Run TypeScript compiler

### UI Package

- `pnpm type-check` - Type check the package

## 🔧 Environment Variables

Create `.env.local` files in each app directory:

### Website (`apps/website/.env.local`)

```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here

# Discord OAuth
DISCORD_CLIENT_ID=your-client-id
DISCORD_CLIENT_SECRET=your-client-secret

# Database
DATABASE_URL=your-database-url

# PayPal
PAYPAL_CLIENT_ID=your-paypal-client-id
PAYPAL_CLIENT_SECRET=your-paypal-secret

# Bot API (optional)
BOT_API_URL=http://localhost:8080
```

### Dashboard (`apps/dashboard/.env.local`)

```env
# NextAuth
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your-secret-here

# Discord OAuth
DISCORD_CLIENT_ID=your-client-id
DISCORD_CLIENT_SECRET=your-client-secret

# Database
DATABASE_URL=your-database-url
```

## 🏗️ Tech Stack

- **Framework**: Next.js 15.4.3
- **React**: 19.1.0
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn UI (in `packages/ui`)
- **Documentation**: Fumadocs (website only)
- **Authentication**: NextAuth v5
- **Monorepo**: Turborepo
- **Package Manager**: pnpm

## �� Key Features

### Website

- Landing page with hero, features, social proof
- Documentation powered by Fumadocs
- Pricing/checkout flow with PayPal
- Contact page
- Authentication with Discord OAuth

### Dashboard

- User dashboard home
- AI avatar generation
- Generation history
- User settings
- Core balance display

### Shared UI Package

- All Shadcn UI components
- Shared hooks (`use-mobile`)
- Utility functions (`cn`)
- Consistent theming across apps

## 🔥 Quick Tips

1. **Turborepo Caching**: Builds are cached for faster rebuilds
2. **Parallel Development**: Run both apps simultaneously with `pnpm dev`
3. **Shared Components**: Import from `@role-reactor/ui` in both apps
4. **Hot Reload**: Changes to UI package auto-reload in both apps

## 🐛 Troubleshooting

**Port already in use:**

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

**Build errors:**

```bash
# Clean and reinstall
pnpm clean
rm -rf node_modules
pnpm install
pnpm build
```

**Type errors:**

```bash
# Check types
pnpm type-check

# Fix common issues
rm -rf apps/*/.next
pnpm build
```

## 📝 Development Workflow

1. **Start development**: `pnpm dev`
2. **Make changes** in your app or UI package
3. **Test locally** - changes auto-reload
4. **Type check**: `pnpm type-check`
5. **Lint**: `pnpm lint`
6. **Build**: `pnpm build`
7. **Commit** your changes

## 🚢 Deployment

### Vercel (Recommended)

**Deploy Website:**

```bash
# Root directory: role-reactor-website
# Framework: Next.js
# Build command: cd apps/website && pnpm build
# Output directory: apps/website/.next
```

**Deploy Dashboard:**

```bash
# Root directory: role-reactor-website
# Framework: Next.js
# Build command: cd apps/dashboard && pnpm build
# Output directory: apps/dashboard/.next
```

### Manual Deployment

```bash
# Build all apps
pnpm build

# Deploy each app's .next directory
# Website: apps/website/.next
# Dashboard: apps/dashboard/.next
```

## 📖 Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [Turborepo Docs](https://turbo.build/repo/docs)
- [Fumadocs](https://fumadocs.vercel.app)
- [Shadcn UI](https://ui.shadcn.com)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly (`pnpm build`, `pnpm type-check`)
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details
