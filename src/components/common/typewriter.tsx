import { cn } from "fumadocs-ui/utils/cn";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, speed);
    let cursorInterval: NodeJS.Timeout | undefined;
    if (cursor) {
      cursorInterval = setInterval(() => {
        setShowCursor((prev) => !prev);
      }, 500);
    }
    return () => {
      clearInterval(interval);
      if (cursorInterval) clearInterval(cursorInterval);
    };
  }, [text, speed, cursor]);

  return (
    <p
      className={cn(
        className,
        "text-lg text-gray-700 dark:text-gray-300 max-w-lg mx-auto leading-relaxed min-h-[2.5em] relative"
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