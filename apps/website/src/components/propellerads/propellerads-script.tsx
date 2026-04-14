"use client";

import Script from "next/script";

export function PropellerAdsScript() {
  const zoneId = process.env.NEXT_PUBLIC_PROPELLERADS_ZONE_ID;

  if (!zoneId) return null;

  return (
    <Script
      id="propellerads-init"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{
        __html: `(function(s){s.dataset.zone='${zoneId}',s.src='https://nap5k.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')));`,
      }}
    />
  );
}
