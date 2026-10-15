import { Link } from "@tanstack/react-router";
import { useEffect } from "react";

import { pageMetadata, siteConfig } from "@/config/site";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

export function NotFoundPage() {
  useEffect(() => {
    document.title = pageMetadata.notFound.title;
  }, []);

  return (
    <>
      <SiteHeader />
      <main
        id="main-content"
        className="min-h-screen w-full max-w-full overflow-x-hidden bg-background px-3.5 pb-16 pt-28 text-foreground sm:px-6 sm:pb-24 sm:pt-40 lg:px-8"
      >
        <div className="mx-auto w-full max-w-4xl min-w-0">
          <p className="site-eyebrow">
            <span className="site-beacon" aria-hidden="true" />
            Lost signal
          </p>
          <p className="font-display text-6xl uppercase leading-none text-primary sm:text-8xl lg:text-9xl">
            404
          </p>
          <h1 className="mt-4 font-display text-4xl uppercase leading-[.95] sm:text-6xl lg:text-7xl">
            This page is <span className="text-primary">gone.</span>
          </h1>
          <div className="mt-4 max-w-2xl">
            <p className="text-base leading-relaxed text-foreground/80 sm:text-lg">
              That URL isn&apos;t on Arcturus. Head home, vote for the server, or jump in on
              Discord.
            </p>
          </div>

          <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Link
              to="/"
              className="site-button bg-primary text-primary-foreground hover:bg-primary/85"
            >
              Back home
            </Link>
            <Link to="/vote" className="site-button site-button-outline">
              Vote
            </Link>
            <a
              href={siteConfig.discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="site-button site-button-outline"
            >
              Discord
            </a>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
