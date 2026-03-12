"use client";

import { Zap } from "lucide-react";
import { PageHeader } from "@/app/dashboard/_components/page-header";
import { BillingSection } from "@/components/account/billing-section";

export default function BillingPage() {
  return (
    <div className="space-y-6 w-full">
      <PageHeader
        category="Account"
        categoryIcon={Zap}
        title="Core Energy"
        description="Manage your global core balance and redeem codes"
      />

      <BillingSection />
    </div>
  );
}
