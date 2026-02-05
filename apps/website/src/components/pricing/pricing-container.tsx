import { ReactNode } from "react";
import { BubbleBackground } from "@role-reactor/ui/components/bubble-background";

interface PricingContainerProps {
  children: ReactNode;
}

export function PricingContainer({ children }: PricingContainerProps) {
  return (
    <>
      {/* Fixed background that extends behind navbar */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Main gradient background - matching pricing page */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-blue-900 pointer-events-none" />

        {/* Bubble Background with gooey metaball effect */}
        <BubbleBackground
          interactive={true}
          className="absolute inset-0"
          transition={{ stiffness: 50, damping: 30 }}
          colors={{
            first: "99, 102, 241", // indigo-500
            second: "139, 92, 246", // purple-500
            third: "59, 130, 246", // blue-500
            fourth: "236, 72, 153", // pink-500
            fifth: "168, 85, 247", // purple-400
            sixth: "79, 70, 229", // indigo-600
          }}
        />

        {/* Dark overlay to reduce brightness */}
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      </div>

      {/* Content container */}
      <div className="relative min-h-screen z-10">{children}</div>
    </>
  );
}
