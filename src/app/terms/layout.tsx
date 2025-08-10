import type { ReactNode } from "react";

import { Footer } from "@/components/layout/footer";

export default function TermsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      {children}
      <Footer />
    </div>
  );
}
