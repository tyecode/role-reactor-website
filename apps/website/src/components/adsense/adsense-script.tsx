"use client";

import Script from "next/script";

interface AdSenseScriptProps {
  publisherId?: string;
}

export function AdSenseScript({ publisherId }: AdSenseScriptProps) {
  // Only render if publisher ID is provided
  if (!publisherId) {
    return null;
  }

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}

// Component for AdSense auto ads (after approval)
export function AdSenseAutoAds({ publisherId }: AdSenseScriptProps) {
  if (!publisherId) {
    return null;
  }

  return (
    <>
      <AdSenseScript publisherId={publisherId} />
      <Script
        id="adsense-auto-ads"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (adsbygoogle = window.adsbygoogle || []).push({
              google_ad_client: "${publisherId}",
              enable_page_level_ads: true
            });
          `,
        }}
      />
    </>
  );
}
