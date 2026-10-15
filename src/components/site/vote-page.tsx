import { ArrowUpRight, ExternalLink } from "lucide-react";

import { siteConfig, voteDestinations } from "@/config/site";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { SiteStructuredData } from "@/components/site/site-structured-data";

export function VotePage() {
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
            Support us!
          </p>
          <h1 className="mt-4 font-display text-4xl uppercase leading-[.95] sm:text-6xl lg:text-7xl">
            Vote for <span className="text-primary">Arcturus.</span>
          </h1>
          <div className="mt-4 max-w-2xl">
            <p className="text-base leading-relaxed text-foreground/80 sm:text-lg">
              Voting helps more people find the server.
              <br className="hidden sm:inline" /> Vote with your Minecraft username for in-game
              rewards!
            </p>
          </div>

          <section className="mt-10 sm:mt-14 w-full min-w-0" aria-labelledby="voting-sites-heading">
            <div className="vote-rewards-container mb-5 sm:mb-6">
              <h2 id="voting-sites-heading" className="vote-rewards-heading">
                More votes = More rewards:
              </h2>
            </div>

            <div className="grid gap-2.5 sm:gap-3 sm:grid-cols-2 w-full min-w-0">
              {voteDestinations.map((destination, index) => {
                const isLast = index === voteDestinations.length - 1;
                return (
                  <a
                    key={destination.url}
                    href={destination.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`vote-destination group ${
                      isLast
                        ? "sm:col-span-2 sm:w-full sm:max-w-[calc(50%-0.375rem)] sm:justify-self-center"
                        : ""
                    }`}
                  >
                    <span className="vote-destination-number">0{index + 1}</span>
                    <span className="min-w-0 flex-1 overflow-hidden">
                      <span className="block font-display text-[0.8rem] uppercase text-foreground transition-colors group-hover:text-primary sm:text-base lg:text-lg truncate">
                        {destination.label}
                      </span>
                    </span>
                    <ArrowUpRight
                      className="shrink-0 text-primary transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      size={18}
                      aria-hidden="true"
                    />
                  </a>
                );
              })}
            </div>
          </section>

          <div className="mt-12 flex flex-col items-center justify-between gap-3 rounded-sm border border-border bg-card/40 p-4 text-center sm:flex-row sm:p-5 sm:text-left">
            <p className="text-sm text-muted-foreground">
              Need a hand voting or have questions about rewards?
            </p>
            <a
              className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-primary underline-offset-4 hover:underline"
              href={siteConfig.discordUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Join the Discord <ExternalLink className="inline" size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </main>
      <SiteFooter />
      <SiteStructuredData />
    </>
  );
}
