"use client";

import Script from "next/script";

export function PropellerAdsScript() {
  const zoneId = process.env.NEXT_PUBLIC_PROPELLERADS_ZONE_ID;

  if (!zoneId) return null;

  return (
    <>
      <Script
        id="propellerads-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(d,z){
              var s=d.createElement("script");
              s.src=z+"/js/inpage-push/16.js";
              s.async=true;
              s.onload=function(){
                (window.PA===undefined?setTimeout(function(){InPagePush({"zone":${zoneId}})},2000):InPagePush({"zone":${zoneId}}));
              };
              document.body.appendChild(s);
            })(document,"https://5gvci.com");
          `,
        }}
      />
    </>
  );
}
