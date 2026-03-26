This version of the documentation is tailored for a **Next.js** project, specifically using the modern **App Router**. I have included designated placeholders where you should insert your screenshots to make the guide visually intuitive for your team or users.

---

# Implementing Google Analytics 4 (GA4) in Next.js

This guide covers the integration of GA4 into a Next.js application using the official `@next/third-parties` library for optimal performance.

## 1. Google Analytics Admin Setup

Before writing any code, you must retrieve your **Measurement ID** from the Google Analytics dashboard.

1. Go to [Analytics Admin](https://analytics.google.com/).
2. Navigate to **Data Streams** > **Web**.
3. Select your stream to view the **Stream Details**.

> **[INSERT SCREENSHOT: Google Analytics dashboard highlighting the "Measurement ID" (G-XXXXXXXXXX) in the Stream Details view]**

---

## 2. Project Configuration

To keep your tracking secure across different environments (Development vs. Production), store your ID in an environment variable.

### Create `.env.local`

Add the following line to your root directory:

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

```

---

## 3. Installation & Integration

We use the `@next/third-parties` package, which automatically optimizes script loading using the `afterInteractive` strategy.

### Step 1: Install the library

```bash
npm install @next/third-parties

```

### Step 2: Add to Root Layout

Open `app/layout.js` (or `.tsx`) and wrap your application with the `GoogleAnalytics` component.

```javascript
import { GoogleAnalytics } from "@next/third-parties/google";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* This renders the GA script on every page */}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      </body>
    </html>
  );
}
```

---

## 4. Tracking Custom Events

For specific interactions like "Buy Now" clicks or "Form Submissions," use the `sendGAEvent` helper in your Client Components.

```javascript
"use client";
import { sendGAEvent } from "@next/third-parties/google";

export function SignUpButton() {
  return (
    <button
      onClick={() => sendGAEvent({ event: "sign_up", value: "newsletter" })}
    >
      Join the Community
    </button>
  );
}
```

---

## 5. Verification & Debugging

After deploying or running `npm run dev`, verify that data is flowing correctly.

### Check the Realtime Report

Open your GA4 Property and click on **Reports** > **Realtime**. You should see your current session appearing on the map.

> **[INSERT SCREENSHOT: The GA4 Realtime Report interface showing an active user hit]**

### Use Browser DevTools

1. Open your site and press `F12`.
2. Go to the **Network** tab.
3. Filter by the word `collect`.
4. Look for a `204` status code sending data to `google-analytics.com`.

> **[INSERT SCREENSHOT: Browser DevTools Network tab filtered by "collect" showing successful GA4 requests]**
