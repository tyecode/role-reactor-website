# Cleanup Plan 🧹

## Issues to Fix

### 1. Remove Empty Package Directories ✅
```bash
rm -rf packages/config packages/tsconfig
```

### 2. Remove Checkout from Dashboard ✅
The checkout flow should stay in **website only** because:
- It's used by the public UserMenu component
- Marketing/landing page needs it
- Dashboard is for authenticated user actions only

```bash
# Remove duplicate checkout from dashboard
rm -rf apps/dashboard/src/app/checkout
rm -rf apps/dashboard/src/components/sponsor
rm -rf apps/dashboard/src/app/api/payments
rm -rf apps/dashboard/src/lib/sponsors.ts
rm -rf apps/dashboard/src/types/pricing.ts
```

### 3. Fix Unused Imports in Website
```bash
# apps/website/src/app/layout.config.tsx - remove Heart
# apps/website/src/app/(home)/components/hero.tsx - remove Zap, Badge
# apps/website/src/app/docs/[[...slug]]/page.tsx - remove createRelativeLink
```

## Final Structure

### Website (Marketing + Docs + Checkout)
```
apps/website/
├── app/
│   ├── (home)/           # Landing page
│   ├── docs/             # Documentation
│   ├── checkout/         # Public checkout ✅
│   ├── contact/          # Contact
│   ├── privacy/          # Privacy policy
│   └── terms/            # Terms
├── components/
│   ├── auth/             # UserMenu (uses PricingDialog)
│   └── sponsor/          # Pricing/payment components ✅
└── api/
    └── payments/         # Payment API ✅
```

### Dashboard (User Features)
```
apps/dashboard/
├── app/
│   ├── page.tsx          # Dashboard home
│   ├── generate/         # AI generation
│   ├── history/          # History
│   ├── settings/         # Settings
│   └── api/
│       ├── pricing/      # User pricing info
│       └── stats/        # User stats
├── components/
│   ├── auth/             # Auth components
│   └── dashboard/        # Dashboard UI
└── lib/
    └── mock-data.ts      # Mock data for dev
```

### Shared UI
```
packages/ui/
├── components/           # All Shadcn components
├── hooks/                # use-mobile
└── lib/                  # utils (cn)
```

## Execution Order

1. Remove empty packages
2. Remove checkout from dashboard
3. Fix unused imports
4. Rebuild both apps
5. Commit changes

