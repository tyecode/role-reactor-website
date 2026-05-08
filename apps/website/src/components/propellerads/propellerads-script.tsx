"use client";

import Script from "next/script";

const ZONE_ID_REGEX = /^[a-zA-Z0-9_-]+$/;

export function PropellerAdsScript() {
  const zoneId = process.env.NEXT_PUBLIC_PROPELLERADS_ZONE_ID;

  if (!zoneId || !ZONE_ID_REGEX.test(zoneId)) {
    return null;
  }

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
