# Next.js Linking and Navigating

Follow these practices to ensure fast, responsive navigation in Next.js 15+ App Router applications.

## 1. Primary Navigation with `<Link>`
Always use the next/link `<Link>` component for internal navigation.
- **Prefetching**: Next.js automatically prefetches links in the viewport.
- **Client-Side Transitions**: It performs a soft navigation, preserving state and avoiding full page reloads.

```tsx
import Link from 'next/link'

<Link href="/dashboard">Go to Dashboard</Link>
```

## 2. Prefetching Strategies
- **Default**: Prefetches when the link enters the viewport.
- **Static Routes**: Full route is prefetched.
- **Dynamic Routes**: Prefetching is limited (only up to `loading.tsx`) to save resources.
- **Opt-out**: Use `prefetch={false}` for rare routes or infinite lists.

```tsx
<Link href="/heavy-page" prefetch={false}>Heavy Page</Link>
```

## 3. Streaming & Loading UI
Always add a `loading.tsx` file for dynamic routes.
- **Partial Prefetching**: Allows the shell (layout) and loading state to be shown instantly while the page renders.
- **User Experience**: Prevents the "stuck" feeling during server-side data fetching.

```tsx
// app/dashboard/loading.tsx
export default function Loading() {
  return <Skeleton />;
}
```

## 4. Programmatic Navigation
Use `useRouter` from `next/navigation` for logic-based navigation in Client Components.

```tsx
'use client'
import { useRouter } from 'next/navigation'

const router = useRouter();
router.push('/login');
```

## 5. History API Integration
Next.js supports native `window.history.pushState` and `replaceState`.
- **Use Case**: Update URLs (e.g., search filters) without full navigation or re-renders.
- **Syncing**: Integrates with `usePathname` and `useSearchParams`.

```tsx
// Update search params without re-rendering the whole page shell
const params = new URLSearchParams(window.location.search);
params.set('filter', 'new-value');
window.history.pushState(null, '', `?${params.toString()}`);
```

## 6. Performance Optimization
- **Generate Static Params**: Use `generateStaticParams` for dynamic routes that can be pre-rendered.
- **Bundle Analysis**: Keep client component bundles small to ensure fast hydration and link functionality.
- **Loading Indicators**: Use progress bars or `useLinkStatus` (if available in your version) to provide feedback on slow transitions.
