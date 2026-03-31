"use client";

import { useServerStore } from "@/store/use-server-store";
import { NodeLoader } from "@/components/common/node-loader";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { motion, AnimatePresence } from "motion/react";

export function GlobalStateLoader() {
  const { isLoading, error } = useServerStore();
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto trigger re-login logic centrally
  useEffect(() => {
    if (error === "re-login") {
      signIn("discord");
    }
  }, [error]);

  // Give a tiny delay before showing the loader so fast loads don't flicker
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isLoading || error === "re-login") {
      timeout = setTimeout(() => setShow(true), 150);
    } else {
      setShow(false);
    }
    return () => clearTimeout(timeout);
  }, [isLoading, error]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 z-50 flex items-center justify-center bg-background"
        >
          <NodeLoader
            title={
              error === "re-login"
                ? "Authorization Expired"
                : "Verifying Access"
            }
            subtitle={
              error === "re-login"
                ? "Redirecting to secure login..."
                : "Synchronizing server data..."
            }
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
