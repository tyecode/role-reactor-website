"use client";

import Script from "next/script";

export function AdsenseScript() {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID;

  if (!publisherId) return null;

  return (
    <Script
      id="adsbygoogle-init"
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
      crossOrigin="anonymous"
    />
  );
}
