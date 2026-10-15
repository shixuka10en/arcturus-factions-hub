import { Server, UsersRound } from "lucide-react";

import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card px-5 py-8 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
        <div className="flex items-center gap-3">
          <img src="/assets/logo.png" alt="Arcturus Logo" className="size-9 object-contain" />
          <div>
            <p className="font-display uppercase">
              Arcturus Factions <span className="text-primary">& KitPvP</span>
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-bold uppercase text-muted-foreground">
          <a
            href={siteConfig.discordUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 transition-colors hover:text-primary"
          >
            <UsersRound size={15} aria-hidden="true" /> Discord
          </a>
          <div className="flex items-center gap-2">
            <Server size={15} aria-hidden="true" /> {siteConfig.serverAddress}
          </div>
        </div>
      </div>
    </footer>
  );
}
