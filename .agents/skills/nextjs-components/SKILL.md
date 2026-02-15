# Next.js Server and Client Components

Next.js 15+ uses a dual-component model to optimize performance and bundle size.

## 1. Choosing the Component Type

| Feature | Server Component (Default) | Client Component (`"use client"`) |
| :--- | :---: | :---: |
| Data Fetching (DB/API) | ✅ | ❌ (Legacy/SWR only) |
| Access Backend Resources | ✅ | ❌ |
| Keep Secrets (Tokens/Keys) | ✅ | ❌ |
| Large Dependencies | ✅ | ❌ (Adds to bundle) |
| Interactivity (`onClick`, `onChange`) | ❌ | ✅ |
| State and Lifecycle (`useState`, `useEffect`) | ❌ | ✅ |
| Browser-only APIs (`window`, `localStorage`) | ❌ | ✅ |
| Custom Hooks depending on state/effects | ❌ | ✅ |

## 2. Best Practices for Composition

### Interleaving Components
Always aim to keep Client Components as "leaf" nodes (lower in the tree).
- **Correct**: Pass a Server Component as a `children` prop to a Client Component.
- **Why**: This allows the Server Component to be rendered on the server even if it is visually nested inside an interactive wrapper.

```tsx
// ClientWrapper.tsx
'use client'
export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return <div onClick={() => console.log('clicked')}>{children}</div>
}

// Page.tsx (Server Component)
import ClientWrapper from './ClientWrapper'
import ServerData from './ServerData'

export default function Page() {
  return (
    <ClientWrapper>
      <ServerData />
    </ClientWrapper>
  )
}
```

### Passing Props
- Only **serializable** props can be passed from Server to Client Components (e.g., strings, numbers, objects, arrays, but NOT functions or class instances).

### Sharing Data
- Use **`React.cache`** in Server Components to memoize data fetching across multiple components in the same request.
- Use **Context Providers** as Client Component wrappers to share state/data that downstream components (both Client and Server via children) need.

## 3. Environment Protection
- Use the **`server-only`** package to prevent accidental imports of server-side code (secrets, DB logic) into Client Components.
- Environment variables without the `NEXT_PUBLIC_` prefix are automatically stripped from the client bundle for security.

```bash
npm install server-only
```

```ts
import 'server-only'
export const SECRET_KEY = process.env.SECRET_KEY 
```

## 4. Hydration & Initial Load
- Client Components are **pre-rendered** into HTML on the server to show an initial static view.
- **Hydration** then attaches event handlers in the browser.
- Ensure Client Components handle empty/loading states gracefully to avoid hydration mismatches (especially when using `localStorage` or `window`).
