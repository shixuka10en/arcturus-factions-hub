import {
  Check,
  ChevronDown,
  ExternalLink,
  Flame,
  Gem,
  Globe2,
  ShieldOff,
  Sparkles,
  Swords,
  UsersRound,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { homeContent, siteConfig } from "@/config/site";
import { CopyServerAddressButton } from "@/components/site/copy-server-address";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { SiteStructuredData } from "@/components/site/site-structured-data";

const featureIcons: Record<(typeof homeContent.features)[number]["icon"], LucideIcon> = {
  shield: ShieldOff,
  swords: Swords,
  sparkles: Sparkles,
  globe: Globe2,
  gem: Gem,
  zap: Zap,
};

function HeroSection() {
  return (
    <section id="top" className="site-hero">
      <img
        src={siteConfig.images.night.src}
        alt={siteConfig.images.night.alt}
        width={siteConfig.images.night.width}
        height={siteConfig.images.night.height}
        fetchPriority="high"
        decoding="async"
        className="site-hero-image"
      />
      <div className="site-hero-overlay" />
      <div className="site-scanline" aria-hidden="true" />
      <div className="site-hero-content">
        <div className="site-hero-copy">
          <p className="site-eyebrow">
            <span className="site-beacon" aria-hidden="true" />
            {homeContent.hero.eyebrow}
          </p>
          <h1 className="font-display text-5xl uppercase leading-[.92] sm:text-7xl lg:text-8xl">
            Factions
            <br />
            <span className="text-primary">& KitPvP</span>
          </h1>
          <p className="site-hero-tagline">
            <span className="block whitespace-nowrap">{homeContent.hero.tagline[0]}</span>
            <span className="block whitespace-nowrap">{homeContent.hero.tagline[1]}</span>
          </p>
          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
            <CopyServerAddressButton />
            <a
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-sm border text-sm font-bold uppercase tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 border-border bg-background/70 text-foreground backdrop-blur-sm hover:border-primary hover:text-primary h-14 px-7 cursor-pointer sm:w-auto"
              href={siteConfig.discordUrl}
              target="_blank"
              rel="noreferrer"
            >
              <UsersRound size={19} aria-hidden="true" /> Join Discord
            </a>
            <a
              href="#about"
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-sm border text-sm font-bold uppercase tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 border-transparent text-muted-foreground hover:text-foreground h-14 px-7 cursor-pointer sm:w-auto sm:justify-start"
            >
              {homeContent.hero.discoverLabel} <ChevronDown size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
      <div className="site-address-card">
        <p>{homeContent.hero.addressLabel}</p>
        <span>{homeContent.hero.addressValue}</span>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="grid-texture border-b border-border py-14 sm:py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:gap-14 sm:px-8 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <p className="mb-3 text-sm font-bold uppercase text-primary sm:mb-4">
            {homeContent.about.eyebrow}
          </p>
          <h2 className="font-display text-3xl uppercase leading-tight sm:text-5xl lg:text-6xl">
            Factions <span className="text-accent">& KitPvP</span>
          </h2>
        </div>
        <div className="border-t border-border pt-6 sm:border-t-0 sm:pt-0 lg:border-l lg:pl-14">
          <p className="text-lg leading-relaxed text-foreground/80 sm:text-xl lg:text-2xl">
            Arcturus is a peaceful Minecraft factions server.
            <strong className="text-foreground"> You can make friends here.</strong>
          </p>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="border-b border-border py-14 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:mb-14 sm:flex-row sm:items-end sm:gap-6">
          <div>
            <p className="mb-3 text-sm font-bold uppercase text-primary sm:mb-4">
              {homeContent.featuresIntro.eyebrow}
            </p>
            <h2 className="font-display text-3xl uppercase sm:text-5xl lg:text-6xl">
              {homeContent.featuresIntro.title[0]}
              <br />
              {homeContent.featuresIntro.title[1]}
            </h2>
          </div>
          {(homeContent.featuresIntro as { body?: string }).body && (
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              {(homeContent.featuresIntro as { body?: string }).body}
            </p>
          )}
        </div>
        <div className="grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">
          {homeContent.features.map((feature, index) => {
            const Icon = featureIcons[feature.icon];
            const isAccent =
              Boolean((feature as { accent?: boolean }).accent) ||
              feature.title.toLowerCase().includes("monthly payouts");
            return (
              <article
                key={feature.title}
                className={`group min-h-[11rem] border-b border-r border-border bg-card/40 p-5 transition-colors hover:bg-card sm:min-h-64 sm:p-7 lg:p-9 ${
                  isAccent ? "order-first sm:order-none" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <Icon
                    className={isAccent ? "text-accent" : "text-primary"}
                    size={28}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <span className="text-xs text-muted-foreground font-mono">
                    <span className="sm:hidden">
                      {isAccent ? "01" : index === 0 ? "02" : `0${index + 1}`}
                    </span>
                    <span className="hidden sm:inline">0{index + 1}</span>
                  </span>
                </div>
                <h3
                  className={`mt-6 font-display text-lg uppercase sm:mt-10 sm:text-xl lg:mt-12 ${
                    isAccent ? "text-accent" : ""
                  }`}
                >
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:mt-3 sm:text-base">
                  {feature.text}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  const mainImage = {
    ...siteConfig.images.factions,
    caption: "Our Spawn",
    detail: "",
  };
  const marketImage = {
    ...siteConfig.images.market,
    caption: "Non-p2w loot system",
  };
  const wildsImage = {
    ...siteConfig.images.wilds,
    caption: "PvP Arena",
  };

  return (
    <section id="gallery" className="border-b border-border bg-card py-14 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="mb-8 sm:mb-12">
          <p className="mb-3 text-sm font-bold uppercase text-primary sm:mb-4">
            {homeContent.gallery.eyebrow}
          </p>
          <h2 className="font-display text-3xl uppercase sm:text-5xl lg:text-6xl">
            {homeContent.gallery.title}
          </h2>
        </div>
        <div className="grid gap-3 sm:gap-4 md:grid-cols-12 md:grid-rows-2">
          <figure className="group relative aspect-[16/10] overflow-hidden border border-border sm:aspect-[16/9] md:col-span-7 md:row-span-2 md:aspect-auto md:min-h-[550px] lg:min-h-[650px]">
            <img
              src={mainImage.src}
              alt={mainImage.alt}
              width={mainImage.width}
              height={mainImage.height}
              loading="lazy"
              decoding="async"
              className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-background/85 p-3.5 backdrop-blur-md sm:p-5">
              <span className="font-display text-sm uppercase sm:text-base">
                {mainImage.caption}
              </span>
              {mainImage.detail && (
                <span className="ml-3 text-xs text-muted-foreground sm:text-sm">
                  {mainImage.detail}
                </span>
              )}
            </figcaption>
          </figure>
          <figure className="group relative aspect-[16/10] overflow-hidden border border-border sm:aspect-[16/9] md:col-span-5 md:aspect-auto md:min-h-64">
            <img
              src={marketImage.src}
              alt={marketImage.alt}
              width={marketImage.width}
              height={marketImage.height}
              loading="lazy"
              decoding="async"
              className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-background/85 p-3 font-display text-sm uppercase backdrop-blur-md sm:p-4 sm:text-base">
              {marketImage.caption}
            </figcaption>
          </figure>
          <figure className="group relative aspect-[16/10] overflow-hidden border border-border sm:aspect-[16/9] md:col-span-5 md:aspect-auto md:min-h-64">
            <img
              src={wildsImage.src}
              alt={wildsImage.alt}
              width={wildsImage.width}
              height={wildsImage.height}
              loading="lazy"
              decoding="async"
              className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-background/85 p-3 font-display text-sm uppercase backdrop-blur-md sm:p-4 sm:text-base">
              {wildsImage.caption}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

function CallToActionSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24 lg:py-36">
      <img
        src={siteConfig.images.wilds.src}
        alt=""
        width={siteConfig.images.wilds.width}
        height={siteConfig.images.wilds.height}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 size-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-background/80" />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-8">
        <Flame className="mx-auto mb-5 text-accent sm:mb-7" size={36} aria-hidden="true" />
        <h2 className="font-display text-3xl uppercase sm:text-6xl lg:text-7xl">
          {homeContent.callToAction.title[0]}
          <br />
          <span className="text-primary">{homeContent.callToAction.title[1]}</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:mt-6 sm:text-lg">
          {homeContent.callToAction.body}
        </p>
        <div className="mx-auto mt-8 flex justify-center">
          <a
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-sm border text-sm font-bold uppercase tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 border-border bg-background/70 text-foreground backdrop-blur-sm hover:border-primary hover:text-primary active:scale-95 h-14 px-8 cursor-pointer sm:w-auto"
            href={siteConfig.discordUrl}
            target="_blank"
            rel="noreferrer"
          >
            <UsersRound size={19} aria-hidden="true" /> Join Discord
          </a>
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="bg-background text-foreground">
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <GallerySection />
        {/* <ComparisonSection /> */}
        <CallToActionSection />
      </main>
      <SiteFooter />
      <SiteStructuredData />
    </>
  );
}
