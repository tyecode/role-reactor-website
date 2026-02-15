# Next.js Cache Components (PPR & use cache)

Next.js 15+ introduces Cache Components to combine static speed with dynamic flexibility.

## 1. Enabling Cache Components
This is an opt-in feature. Enable it in `next.config.ts`:

```ts
const nextConfig = {
  cacheComponents: true,
}
```

## 2. Partial Prerendering (PPR)
PPR generates a static HTML shell for parts of the page that are static or cached, and streams dynamic parts at request time.
- **Static Shell**: Immediate delivery to the browser.
- **Dynamic Chunks**: Injected as they resolve.
- **Suspense**: Used to define boundaries for streaming content.

## 3. The `use cache` Directive
Use `'use cache'` at the function or component level to cache results.
- **Automatic Prerendering**: Content within a `use cache` scope is included in the static shell if it doesn't depend on runtime data.
- **Cache Keys**: Arguments and closed-over variables are automatically factored into the cache key.
- **Serializability**: Like props passed to Client Components, return values must be serializable.

```tsx
async function CachedData() {
  'use cache'
  const data = await fetch('...')
  return data
}
```

## 4. Cache Control with `cacheLife`
Define the freshness and expiration of cached content.
- Use predefined profiles: `'seconds'`, `'minutes'`, `'hours'`, `'days'`, `'weeks'`, or `'max'`.
- Or custom objects with `stale`, `revalidate`, and `expire`.

```tsx
import { cacheLife } from 'next/cache'

async function DailyStats() {
  'use cache'
  cacheLife('days')
  // ...
}
```

## 5. Revalidation with Tags
Use `cacheTag` to group entries and `revalidateTag` or `updateTag` to invalidate them.
- **`updateTag`**: Immediate refresh within the same request.
- **`revalidateTag`**: Stale-while-revalidate invalidation.

```tsx
import { cacheTag, updateTag } from 'next/cache'

async function getCart() {
  'use cache'
  cacheTag('cart')
  // ...
}

// In a Server Action
async function addToCart() {
  'use server'
  // write to DB
  updateTag('cart')
}
```

## 6. Composition Rules
- **Runtime Data**: Cookies, headers, and searchParams cannot be used inside `use cache`. 
- **Pattern**: Read runtime data in a non-cached component and pass values as props to a cached component.
- **Deterministic vs Non-deterministic**: Operations like `Math.random()` run once during prerendering if inside `use cache`. If outside, they defer to request time (requiring `<Suspense>`).

```tsx
// Correct Composition
export default async function Page({ searchParams }) {
  const query = (await searchParams).q
  return (
    <Suspense fallback={<Loading />}>
      <SearchResults query={query} />
    </Suspense>
  )
}

async function SearchResults({ query }) {
  'use cache'
  // Query is part of the cache key
  return <div>...</div>
}
```
