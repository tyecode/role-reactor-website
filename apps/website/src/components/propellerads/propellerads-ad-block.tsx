"use client";

import { useEffect, useRef } from "react";

interface PropellerAdBlockProps {
  zoneId: string;
  style?: React.CSSProperties;
  className?: string;
  hide?: boolean;
}

export function PropellerAdBlock({
  zoneId,
  style,
  className,
  hide,
}: PropellerAdBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hide || typeof window === "undefined" || !zoneId) return;

    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";

    const script = document.createElement("script");
    script.setAttribute("data-cfasync", "false");
    script.type = "text/javascript";
    script.src = `https://nap5k.com/pwa/${zoneId}`;
    script.async = true;

    script.onerror = () => {
      container.style.display = "none";
    };

    container.appendChild(script);
  }, [zoneId, hide]);

  if (hide) return null;

  return <div ref={containerRef} className={className} style={style} />;
}
