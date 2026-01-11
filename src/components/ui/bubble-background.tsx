"use client";

import * as React from "react";
import {
  motion,
  type SpringOptions,
  useMotionValue,
  useSpring,
} from "motion/react";
import { cn } from "@/lib/utils";

type BubbleBackgroundProps = React.ComponentProps<"div"> & {
  interactive?: boolean;
  transition?: SpringOptions;
  colors?: {
    first: string;
    second: string;
    third: string;
    fourth: string;
    fifth: string;
    sixth: string;
  };
};

function BubbleBackground(
  {
    className,
    children,
    interactive = false,
    transition = { stiffness: 50, damping: 30 },
    colors = {
      first: "99, 102, 241", // indigo-500
      second: "139, 92, 246", // purple-500
      third: "59, 130, 246", // blue-500
      fourth: "236, 72, 153", // pink-500
      fifth: "168, 85, 247", // purple-400
      sixth: "79, 70, 229", // indigo-600
    },
    ...props
  }: BubbleBackgroundProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>
) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  React.useImperativeHandle(
    forwardedRef,
    () => containerRef.current as HTMLDivElement
  );
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, transition);
  const springY = useSpring(mouseY, transition);

  React.useEffect(() => {
    if (!interactive) return;
    const currentContainer = containerRef.current;
    if (!currentContainer) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = currentContainer.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };

    currentContainer?.addEventListener("mousemove", handleMouseMove);
    return () =>
      currentContainer?.removeEventListener("mousemove", handleMouseMove);
  }, [interactive, mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      data-slot="bubble-background"
      className={cn("relative size-full overflow-hidden", className)}
      {...props}
    >
      <style>
        {`
          [data-slot="bubble-background"] {
            --first-color: ${colors.first};
            --second-color: ${colors.second};
            --third-color: ${colors.third};
            --fourth-color: ${colors.fourth};
            --fifth-color: ${colors.fifth};
            --sixth-color: ${colors.sixth};
            --bubble-opacity: 0.8;
          }
          [data-slot="bubble-background"] .bubble-blend {
            mix-blend-mode: hard-light;
          }
        `}
      </style>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0 w-0 h-0"
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div
        className="absolute inset-0"
        style={{ filter: "url(#goo) blur(40px)" }}
      >
        <motion.div
          className="absolute rounded-full size-[80%] top-[10%] left-[10%] bubble-blend bg-[radial-gradient(circle_at_center,rgba(var(--first-color),var(--bubble-opacity))_0%,rgba(var(--first-color),0)_50%)]"
          animate={{ y: [-50, 50, -50] }}
          transition={{
            duration: 40,
            ease: [0.4, 0, 0.6, 1],
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute inset-0 flex justify-center items-center origin-[calc(50%-400px)]"
          animate={{ rotate: 360 }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          <div className="rounded-full size-[80%] top-[10%] left-[10%] bubble-blend bg-[radial-gradient(circle_at_center,rgba(var(--second-color),var(--bubble-opacity))_0%,rgba(var(--second-color),0)_50%)]" />
        </motion.div>
        <motion.div
          className="absolute inset-0 flex justify-center items-center origin-[calc(50%+400px)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 50, ease: "linear", repeat: Infinity }}
        >
          <div className="absolute rounded-full size-[80%] bubble-blend bg-[radial-gradient(circle_at_center,rgba(var(--third-color),var(--bubble-opacity))_0%,rgba(var(--third-color),0)_50%)] top-[calc(50%+200px)] left-[calc(50%-500px)]" />
        </motion.div>
        <motion.div
          className="absolute rounded-full size-[80%] top-[10%] left-[10%] bubble-blend bg-[radial-gradient(circle_at_center,rgba(var(--fourth-color),var(--bubble-opacity))_0%,rgba(var(--fourth-color),0)_50%)] opacity-70"
          animate={{ x: [-50, 50, -50] }}
          transition={{
            duration: 50,
            ease: [0.4, 0, 0.6, 1],
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute inset-0 flex justify-center items-center origin-[calc(50%_-_800px)_calc(50%_+_200px)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 35, ease: "linear", repeat: Infinity }}
        >
          <div className="absolute rounded-full size-[160%] bubble-blend bg-[radial-gradient(circle_at_center,rgba(var(--fifth-color),var(--bubble-opacity))_0%,rgba(var(--fifth-color),0)_50%)] top-[calc(50%-80%)] left-[calc(50%-80%)]" />
        </motion.div>
        {interactive && (
          <motion.div
            className="absolute rounded-full size-full bubble-blend bg-[radial-gradient(circle_at_center,rgba(var(--sixth-color),var(--bubble-opacity))_0%,rgba(var(--sixth-color),0)_50%)] opacity-70"
            style={{
              x: springX,
              y: springY,
            }}
          />
        )}
      </div>
      {children}
    </div>
  );
}

export const BubbleBackgroundComponent = React.forwardRef<
  HTMLDivElement,
  BubbleBackgroundProps
>(BubbleBackground);

export { BubbleBackgroundComponent as BubbleBackground };
export type { BubbleBackgroundProps };
