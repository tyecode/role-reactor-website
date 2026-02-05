"use client";

import { cn } from "fumadocs-ui/utils/cn";
import { useEffect, useState, useCallback, useMemo } from "react";

interface TypewriterProps {
  text: string;
  speed?: number; // ms per character
  className?: string;
  cursor?: boolean;
}

function Typewriter({
  text,
  speed = 36,
  className = "",
  cursor = true,
}: TypewriterProps) {
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  const memoizedText = useMemo(() => text, [text]);

  const animateText = useCallback(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(memoizedText.slice(0, i));
      i++;
      if (i > memoizedText.length) {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [memoizedText, speed]);

  const animateCursor = useCallback(() => {
    if (!cursor) return () => {};
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, [cursor]);

  useEffect(() => {
    const textCleanup = animateText();
    const cursorCleanup = animateCursor();

    return () => {
      textCleanup();
      cursorCleanup();
    };
  }, [animateText, animateCursor]);

  return (
    <p
      className={cn(
        className,
        "text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed min-h-[2.5em] relative"
      )}
    >
      {displayed}
      {cursor && (
        <span
          className={cn(
            "typewriter-cursor",
            showCursor ? "opacity-100" : "opacity-0"
          )}
        >
          |
        </span>
      )}
    </p>
  );
}

export { Typewriter };
export type { TypewriterProps };
