import { cn } from "@/lib/utils";
import { Audiowide } from "next/font/google";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

interface PageHeaderProps {
  category: string;
  categoryIcon: LucideIcon;
  title: string;
  description: string;
  badge?: {
    icon: LucideIcon;
    label: string;
    variant?: "default" | "cyan" | "yellow" | "emerald";
  };
  serverName?: string;
  className?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  category,
  categoryIcon: CategoryIcon,
  title,
  description,
  badge,
  serverName,
  className,
  children,
}: PageHeaderProps) {
  const badgeColors = {
    default: "bg-zinc-500/10 text-zinc-400 border-zinc-500/30",
    cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.2)]",
    yellow:
      "bg-yellow-500/10 text-yellow-500 border-yellow-500/30 shadow-[0_0_10px_rgba(234,179,8,0.2)]",
    emerald:
      "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]",
  };

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row md:items-end justify-between gap-6",
        className
      )}
    >
      <div className="space-y-2 flex-1">
        <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-widest">
          <CategoryIcon className="w-4 h-4" />
          {category}
        </div>
        <h1
          className={cn(
            "text-3xl md:text-5xl font-black text-white tracking-tight flex flex-wrap items-center gap-3 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]",
            audiowide.className
          )}
        >
          <span className="bg-gradient-to-r from-white via-white to-zinc-500 bg-clip-text text-transparent">
            {title}
          </span>
          {badge && (
            <Badge
              className={cn(
                "px-2 py-1 text-[10px] font-black items-center gap-1.5",
                badgeColors[badge.variant || "default"]
              )}
            >
              <badge.icon className="w-3 h-3" />
              {badge.label}
            </Badge>
          )}
        </h1>
        <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-400 font-medium">
          <p className="max-w-xl leading-relaxed text-xs md:text-sm text-zinc-500">
            {description}
            {serverName && (
              <>
                {" "}
                <span className="text-cyan-400 font-bold">{serverName}</span>.
              </>
            )}
          </p>
        </div>
      </div>
      {children}
    </div>
  );
}
