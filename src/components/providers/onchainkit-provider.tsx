"use client";

import type { ReactNode } from "react";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { base } from "wagmi/chains";

interface OnchainKitProviderWrapperProps {
  children: ReactNode;
}

export function OnchainKitProviderWrapper({
  children,
}: OnchainKitProviderWrapperProps) {
  const apiKey = process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY;

  // Only render OnchainKit if API key is provided
  if (!apiKey) {
    return <>{children}</>;
  }

  return (
    <OnchainKitProvider apiKey={apiKey} chain={base}>
      {children}
    </OnchainKitProvider>
  );
}

