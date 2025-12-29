import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type AuthorStatItem = {
  label: string;
  value: string;
  helper?: string;
  icon: LucideIcon;
};

export function AuthorStats({
  stats,
  className,
}: {
  stats: AuthorStatItem[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid gap-3 sm:grid-cols-2 lg:grid-cols-2",
        className
      )}
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 shadow-lg transition duration-200 hover:-translate-y-0.5 hover:border-amber-400/40 hover:bg-white/10"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-purple-500/5 opacity-60" />
          <div className="relative flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-lg bg-white/10 text-amber-200 ring-1 ring-white/20">
              <stat.icon className="size-5" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-gray-300">{stat.label}</div>
              {stat.helper ? (
                <div className="text-xs text-gray-500">{stat.helper}</div>
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
