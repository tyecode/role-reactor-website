# Next.js Layouts and Pages

Follow these best practices for defining and organizing routes in Next.js 15+ App Router apps.

## 1. Page Definition
A **page** is the unique UI for a route.
- Create a `page.tsx` file inside a route directory.
- Must **default export** a React component.
- **Tip**: Favor Server Components for data fetching.

```tsx
// Example: src/app/dashboard/page.tsx
export default function DashboardPage() {
  return <h1>Dashboard Index</h1>;
}
```

## 2. Shared Layouts
A **layout** is UI shared between multiple pages.
- Create a `layout.tsx` file in a route segment.
- Must accept a `children` prop.
- Layouts **do not re-render** when navigating between their children.
- The **Root Layout** (`app/layout.tsx`) is required and must contain `<html>` and `<body>`.

```tsx
// Example: src/app/dashboard/layout.tsx
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <nav>Dashboard Nav</nav>
      <main>{children}</main>
    </section>
  );
}
```

## 3. Dynamic Routes
Use square brackets to create dynamic segments that map to data.
- Folder names like `[slug]` or `[id]`.
- Access the value via the `params` prop.
- **CRITICAL**: In Next.js 15, `params` and `searchParams` are **Asynchronous Promises**.

```tsx
// Example: src/app/blog/[slug]/page.tsx
export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <h1>Post: {slug}</h1>;
}
```

## 4. Search Parameters
Use `searchParams` for UI state controlled by the URL (filters, pagination).
- **Page Prop**: Available only in `page.tsx`. It is an async Promise.
- **Client Components**: Use the `useSearchParams()` hook.
- Using `searchParams` in a Server Component opts the page into **Dynamic Rendering**.

```tsx
// Example Page with Search Params
export default async function SearchPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ q: string }> 
}) {
  const query = (await searchParams).q;
  // ...
}
```

## 5. Navigation
- **Prefer `<Link>`**: Use `next/link` for client-side navigation and prefetching.
- **Relative Linking**: Ensure paths are correct when navigating from nested routes.
- **Active State**: Use `usePathname()` from `next/navigation` in Client Components to style active links.

## 6. Type Safety
Next.js provides global type helpers for props.
- Use `PageProps` for pages.
- Use `LayoutProps` for layouts.

```tsx
export default async function Page(props: PageProps<'/dashboard/[id]'>) {
  const { id } = await props.params;
  return <div>ID: {id}</div>;
}
```
