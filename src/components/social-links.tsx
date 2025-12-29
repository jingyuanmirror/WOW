import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type SocialLinkItem = {
  platform: string;
  label: string;
  handle?: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  colorClass?: string;
};

export function SocialLinks({
  links,
  className,
}: {
  links: SocialLinkItem[];
  className?: string;
}) {
  return (
    <div className={cn("grid gap-3 sm:grid-cols-2", className)}>
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center gap-3 overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-amber-400/40 hover:bg-white/10"
        >
          <div
            className={cn(
              "flex size-11 items-center justify-center rounded-lg text-white ring-1 ring-white/20 transition duration-200 group-hover:scale-105",
              link.colorClass || "bg-gradient-to-br from-amber-500/80 to-orange-500/80"
            )}
          >
            <link.icon className="size-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <span>{link.label}</span>
              {link.badge ? (
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-amber-200">
                  {link.badge}
                </span>
              ) : null}
            </div>
            {link.handle ? (
              <div className="truncate text-base font-semibold text-white">
                {link.handle}
              </div>
            ) : null}
            <div className="truncate text-xs text-gray-500">{link.href}</div>
          </div>
        </a>
      ))}
    </div>
  );
}
