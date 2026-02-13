import { PageHeader } from "@/app/dashboard/_components/page-header";
import { Settings as SettingsIcon } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-700 w-full min-w-0 overflow-x-hidden">
      <PageHeader
        category="System Preferences"
        categoryIcon={SettingsIcon}
        title="Account Settings"
        description="Manage your personal preferences and dashboard configuration"
      />

      <div className="flex flex-col items-center justify-center min-h-[40vh] text-center border border-white/5 bg-zinc-950/20 rounded-3xl backdrop-blur-xl p-8">
        <div className="p-4 rounded-full bg-zinc-900 border border-white/5 mb-6">
          <SettingsIcon className="size-8 text-zinc-500 animate-spin-slow" />
        </div>
        <h2 className="text-xl font-black italic mb-2 uppercase tracking-tighter">
          Under Construction
        </h2>
        <p className="text-zinc-500 text-sm font-medium max-w-sm">
          The settings interface is currently being optimized for neural
          compatibility. Check back soon for advanced customization options.
        </p>
      </div>
    </div>
  );
}
