import type { ReactNode } from "react";

import { Footer } from "@/components/layout/footer";

export default function PrivacyLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      {children}
      <Footer />
    </div>
  );
}
