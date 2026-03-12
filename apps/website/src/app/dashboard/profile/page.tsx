"use client";

import { User } from "lucide-react";
import { PageHeader } from "@/app/dashboard/_components/page-header";
import { ProfileSection } from "@/components/account/profile-section";

export default function ProfilePage() {
  return (
    <div className="space-y-6 w-full">
      <PageHeader
        category="Account"
        categoryIcon={User}
        title="Profile"
        description="Manage your Discord account information and connected services"
      />

      <ProfileSection />
    </div>
  );
}
