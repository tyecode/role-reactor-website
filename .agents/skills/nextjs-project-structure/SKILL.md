---
name: Next.js Project Structure
description: Comprehensive guide to Next.js project structure, file conventions, and organization strategies.
---

# Next.js Project Structure and Organization

This skill outlines the standard conventions and best practices for organizing a Next.js App Router project.

## Folder and File Conventions

### Top-level Folders

These folders sit at the root of your application (or inside `src/` if used).

| Folder | Description |
| :--- | :--- |
| `app` | App Router directory. Primary location for routes and layouts. |
| `pages` | Pages Router directory (legacy or specific use-cases). |
| `public` | Static assets to be served directly (e.g., images, fonts). |
| `src` | Optional source folder wrapper for `app` or `pages` to keep root cleaner. |

### Top-level Files

Configuration and environment files located in the project root.

| File | Description |
| :--- | :--- |
| `next.config.js` | Configuration file for Next.js. |
| `package.json` | Project dependencies and scripts. |
| `instrumentation.ts` | OpenTelemetry and Instrumentation file. |
| `middleware.ts` | Next.js request middleware. |
| `.env` files | Environment variables (`.env`, `.env.local`, etc.). |
| `eslint.config.mjs` | Configuration file for ESLint. |
| `next-env.d.ts` | TypeScript declaration file for Next.js (auto-generated). |
| `tsconfig.json` | Configuration file for TypeScript. |

### Routing Files

Special files within the `app` directory that define routes and UI.

| File | Extensions | Description |
| :--- | :--- | :--- |
| `layout` | `.js` `.jsx` `.tsx` | Shared UI for a segment and its children. |
| `page` | `.js` `.jsx` `.tsx` | Unique UI of a route and makes the route publicly accessible. |
| `loading` | `.js` `.jsx` `.tsx` | Loading UI (React Suspense boundary). |
| `not-found` | `.js` `.jsx` `.tsx` | Not found UI. |
| `error` | `.js` `.jsx` `.tsx` | Error UI (React Error Boundary). |
| `global-error` | `.js` `.jsx` `.tsx` | Global error UI for root layout errors. |
| `route` | `.js` `.ts` | API endpoint (Server-side API route). |
| `template` | `.js` `.jsx` `.tsx` | Re-rendered layout (remounts on navigation). |
| `default` | `.js` `.jsx` `.tsx` | Parallel route fallback page. |

### Nested Routes

Folders define URL segments.

| Path | URL Pattern | Notes |
| :--- | :--- | :--- |
| `app/layout.tsx` | — | Root layout wrapping all routes. |
| `app/page.tsx` | `/` | Home page. |
| `app/blog/page.tsx` | `/blog` | Blog index. |
| `app/blog/layout.tsx` | — | Layout specific to /blog and its children. |

### Dynamic Routes

Use square brackets for dynamic segments.

| Path | URL Pattern | Example |
| :--- | :--- | :--- |
| `app/blog/[slug]/page.tsx` | `/blog/:slug` | `/blog/hello-world` |
| `app/shop/[...slug]/page.tsx` | `/shop/*` | `/shop/clothes/tops` (catch-all) |
| `app/docs/[[...slug]]/page.tsx` | `/docs/*` or `/docs` | Optional catch-all. |

### Route Groups and Private Folders

Use these to organize code without affecting the URL structure.

| Path | Description |
| :--- | :--- |
| `app/(marketing)/page.tsx` | Route Group. URL is `/`. The `(marketing)` folder is skipped in the URL path. Useful for different layouts. |
| `app/_components/button.tsx` | Private Folder. Start with `_`. The folder and its contents are excluded from routing. Useful for colocating components. |

### Parallel and Intercepted Routes

Advanced routing patterns for complex UIs.

| Syntax | Name | Use Case |
| :--- | :--- | :--- |
| `@slot` | Named Slot | Parallel Routes (e.g., Sidebar + Main Content in same layout). |
| `(.)folder` | Intercept Same Level | Modal routing (e.g., photo feed). |
| `(..)folder` | Intercept Parent | Modal routing. |
| `(...)folder` | Intercept Root | Modal routing. |

### Metadata File Conventions

Special files for SEO and metadata.

| File | Extensions | Description |
| :--- | :--- | :--- |
| `favicon`, `icon` | `.ico`, `.png`, `.svg` | App Icons. |
| `apple-icon` | `.png`, `.jpg` | Apple App Icon. |
| `opengraph-image` | `.jpg`, `.png` | Open Graph Image. |
| `twitter-image` | `.jpg`, `.png` | Twitter Image. |
| `sitemap` | `.xml`, `.js`, `.ts` | Sitemap. |
| `robots` | `.txt`, `.js`, `.ts` | Robots.txt. |

## Organization Strategies

### Component Hierarchy

Render hierarchy for special files in a segment:

1.  `layout.js`
2.  `template.js`
3.  `error.js` (Boundary)
4.  `loading.js` (Boundary)
5.  `not-found.js` (Boundary)
6.  `page.js` or nested `layout.js`

### Colocation

You can safely keep project files inside the `app` directory. Only `page.js` or `route.js` make a route public. Everything else is private by default unless exported from a public entry point.

**Recommendation:** Colocate components, styles, and tests with the routes they belong to if they are specific to that route.

### Strategy: Split by Feature

Store globally shared code in `src/components`, `src/lib`, etc., but keep feature-specific code inside the `app` route folder.

```
app/
  (shop)/
    account/
      page.tsx
      _components/        <-- Specific to account page
        profile-card.tsx
    cart/
      page.tsx
src/
  components/             <-- Shared UI components
    ui/
      button.tsx
  lib/                    <-- Shared utilities
    utils.ts
```

### Strategy: Route Groups for Layouts

Use `(group)` to opt specific segments into different root layouts or nested layouts without changing the URL structure.

Example:
- `app/(marketing)/layout.tsx` -> Marketing layout (header/footer A)
- `app/(dashboard)/layout.tsx` -> Dashboard layout (sidebar/header B)

### Src Directory

Using `src/` is recommended to separate application code from configuration files.
