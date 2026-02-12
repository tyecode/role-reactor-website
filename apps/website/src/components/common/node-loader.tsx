"use client";

import { motion } from "motion/react";

interface NodeLoaderProps {
  title?: string;
  subtitle?: string;
}

export function NodeLoader({
  title = "Loading Node",
  subtitle = "Establishing_Connection...",
}: NodeLoaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center min-h-[60vh] w-full"
    >
      <div className="flex flex-col items-center gap-4">
        {/* Cyberpunk-style loader */}
        <div className="relative">
          <motion.div
            className="size-12 border-2 border-purple-500/30 border-t-purple-500 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-0 size-12 border-2 border-purple-500/10 rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center gap-1"
        >
          <p className="text-sm text-purple-400 font-mono uppercase tracking-widest font-bold">
            {title}
          </p>
          <motion.p
            className="text-[10px] text-zinc-600 font-mono uppercase tracking-wider"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            {subtitle}
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}
