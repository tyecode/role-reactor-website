import { cn } from "@/lib/utils";
import { audiowide } from "@/lib/fonts";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <div className="relative group/stat rounded-xl border border-white/5 bg-zinc-950/60 backdrop-blur-sm p-4 hover:border-cyan-500/30 transition-all duration-300 overflow-hidden">
      <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover/stat:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="flex items-center gap-2 text-zinc-500 mb-2">
          <span className="text-cyan-400/60">{icon}</span>
          <span className="text-[10px] uppercase tracking-widest font-bold">
            {label}
          </span>
        </div>
        <p
          className={cn(
            "text-2xl font-black text-white tabular-nums",
            audiowide.className
          )}
        >
          {value}
        </p>
      </div>
    </div>
  );
}
