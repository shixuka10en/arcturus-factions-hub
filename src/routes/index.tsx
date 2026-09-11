import { createFileRoute } from "@tanstack/react-router";
import {
  Check,
  ChevronDown,
  Copy,
  Crosshair,
  ExternalLink,
  Flame,
  Gem,
  Globe2,
  MailWarning,
  Server,
  ShieldOff,
  Sparkles,
  Swords,
  UsersRound,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import factionsAsset from "@/assets/arcturus-factions.png.asset.json";
import marketAsset from "@/assets/arcturus-market.png.asset.json";
import nightAsset from "@/assets/arcturus-night.png.asset.json";
import wildsAsset from "@/assets/arcturus-wilds.png.asset.json";
import { cn } from "@/lib/utils";

const SERVER_IP = "play.arcturusmc.org";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Arcturus Reborn | No-Staff Minecraft Factions" },
      {
        name: "description",
        content:
          "Join Arcturus Reborn, a no-staff Java Factions server for Minecraft 1.8–1.20 with classic PvP, custom enchants, and true freedom.",
      },
      { property: "og:title", content: "Arcturus Reborn | Freedom Forever" },
      {
        property: "og:description",
        content: "No moderation. No staff. Java Factions for versions 1.8–1.20.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ArcturusPage,
});

function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          element.classList.add("is-visible");
          observer.unobserve(element);
        }
      },
      { threshold: 0.14 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("reveal", className)}>
      {children}
    </div>
  );
}

function CopyIpButton({ variant = "default" }: { variant?: "default" | "outline" }) {
  const [copied, setCopied] = useState(false);

  async function copyIp() {
    await navigator.clipboard.writeText(SERVER_IP);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <Button variant={variant} size="lg" onClick={copyIp} aria-label="Copy server IP">
      {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
      {copied ? "IP Copied" : SERVER_IP}
    </Button>
  );
}

const features = [
  { icon: ShieldOff, title: "No staff", text: "No moderators controlling how you play. The world belongs to its players." },
  { icon: Swords, title: "Classic combat", text: "Fast, skill-first 1.8 style PvP built for raids, rivalries, and faction warfare." },
  { icon: Sparkles, title: "Custom enchants", text: "Deep progression and powerful combinations inspired by Herobrine Factions." },
  { icon: Globe2, title: "Wide support", text: "Java cracked access across Minecraft versions 1.8 through 1.20." },
  { icon: Gem, title: "Free marketplace", text: "A player-powered economy without a paywall deciding who gets to compete." },
  { icon: Zap, title: "Performance first", text: "Advanced plugins and a server experience designed to keep the action moving." },
];

const comparison = [
  ["Lag and unsupported setups", "Performance-first gameplay"],
  ["Outdated plugins", "Advanced custom systems"],
  ["Staff deciding your fate", "No staff — player freedom"],
  ["Rare yearly updates", "Regular updates"],
  ["Extreme pay-to-win", "Free marketplace"],
  ["Forced email authentication", "VPN-friendly access"],
  ["Nonexistent support", "Direct contact and Discord support"],
];

function ArcturusPage() {
  return (
    <main className="bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <a href="#top" className="group flex items-center gap-3" aria-label="Arcturus Reborn home">
            <span className="grid size-9 place-items-center border border-primary/60 bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <Crosshair size={19} aria-hidden="true" />
            </span>
            <span className="font-display text-base uppercase sm:text-lg">Arcturus <span className="text-primary">Reborn</span></span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-semibold uppercase text-muted-foreground lg:flex" aria-label="Main navigation">
            <a className="transition-colors hover:text-primary" href="#about">About</a>
            <a className="transition-colors hover:text-primary" href="#features">Features</a>
            <a className="transition-colors hover:text-primary" href="#gallery">World</a>
            <a className="transition-colors hover:text-primary" href="#compare">Compare</a>
          </nav>
          <CopyIpButton variant="outline" />
        </div>
      </header>

      <section id="top" className="relative flex min-h-[94svh] items-end overflow-hidden border-b border-border">
        <img src={nightAsset.url} alt="Moonlit Arcturus spawn with blue crystal towers" className="absolute inset-0 size-full object-cover object-center" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--background)_0%,color-mix(in_oklab,var(--background)_72%,transparent)_42%,color-mix(in_oklab,var(--background)_18%,transparent)_75%),linear-gradient(0deg,var(--background)_0%,transparent_50%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px animate-[scanline_8s_linear_infinite] bg-primary/40 shadow-[0_0_18px_var(--primary)]" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-20 pt-36 sm:px-8 sm:pb-24">
          <div className="max-w-3xl animate-fade-in">
            <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase text-primary sm:text-sm">
              <span className="size-2 animate-[beacon_1.8s_ease-in-out_infinite] bg-primary" />
              Java Factions · 1.8—1.20 · Cracked
            </p>
            <h1 className="font-display text-5xl leading-[.95] uppercase sm:text-7xl lg:text-8xl">
              Arcturus<br /><span className="text-primary">Reborn</span>
            </h1>
            <p className="mt-6 max-w-xl border-l-2 border-accent pl-5 text-lg font-medium leading-relaxed text-foreground/85 sm:text-xl">
              No moderation. No staff. No limits.<br />Build your faction. Write your own rules.
            </p>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <CopyIpButton />
              <Button variant="ghost" size="lg" asChild>
                <a href="#about">Discover Arcturus <ChevronDown size={18} aria-hidden="true" /></a>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 hidden border-l border-t border-border bg-background/75 px-6 py-4 backdrop-blur-md md:block">
          <p className="text-[10px] font-bold uppercase text-muted-foreground">Server address</p>
          <p className="mt-1 font-semibold text-primary">arcturusmc.org</p>
        </div>
      </section>

      <section id="about" className="grid-texture border-b border-border py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr]">
          <Reveal>
            <p className="mb-4 text-sm font-bold uppercase text-primary">Introducing Arcturus</p>
            <h2 className="font-display text-4xl uppercase leading-tight sm:text-6xl">Freedom is the <span className="text-accent">whole point.</span></h2>
          </Reveal>
          <Reveal className="lg:border-l lg:border-border lg:pl-14">
            <p className="text-xl leading-relaxed text-foreground/80 sm:text-2xl">
              Arcturus is a Minecraft Factions server focused on <strong className="text-foreground">no-staff mechanics.</strong> If staff control what you can and can’t do, what’s the point of playing in that dystopian environment?
            </p>
            <div className="mt-9 grid grid-cols-1 gap-px bg-border sm:grid-cols-3">
              {["No moderation", "Never any staff", "Freedom forever"].map((label) => (
                <div key={label} className="bg-card px-5 py-6 text-center font-display text-sm uppercase text-primary">{label}</div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="features" className="border-b border-border py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="mb-4 text-sm font-bold uppercase text-primary">Built differently</p>
              <h2 className="font-display text-4xl uppercase sm:text-6xl">Faction warfare,<br />without the cage.</h2>
            </div>
            <p className="max-w-md text-muted-foreground">Explore, raid, trade, and grind your way to the top. Your faction’s story is decided by players—not a staff panel.</p>
          </Reveal>
          <div className="grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, text }, index) => (
              <Reveal key={title} className="h-full" >
                <article className="group h-full min-h-64 border-b border-r border-border bg-card/40 p-7 transition-colors hover:bg-card sm:p-9">
                  <div className="flex items-start justify-between">
                    <Icon className="text-primary" size={30} strokeWidth={1.5} aria-hidden="true" />
                    <span className="text-xs text-muted-foreground">0{index + 1}</span>
                  </div>
                  <h3 className="mt-12 font-display text-xl uppercase">{title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="border-b border-border bg-card py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="mb-12">
            <p className="mb-4 text-sm font-bold uppercase text-primary">Inside the server</p>
            <h2 className="font-display text-4xl uppercase sm:text-6xl">A world worth fighting for.</h2>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-12 md:grid-rows-2">
            <Reveal className="md:col-span-7 md:row-span-2">
              <figure className="group relative h-full min-h-[420px] overflow-hidden border border-border md:min-h-[700px]">
                <img src={factionsAsset.url} alt="Arcturus Factions village at sunset" loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.025]" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-background/85 p-5 backdrop-blur-md"><span className="font-display uppercase">Faction heartlands</span><span className="ml-3 text-sm text-muted-foreground">Explore · Raid · Grind</span></figcaption>
              </figure>
            </Reveal>
            <Reveal className="md:col-span-5">
              <figure className="group relative h-full min-h-72 overflow-hidden border border-border">
                <img src={marketAsset.url} alt="Arcturus custom chest marketplace" loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-background/85 p-4 font-display uppercase backdrop-blur-md">Custom rewards</figcaption>
              </figure>
            </Reveal>
            <Reveal className="md:col-span-5">
              <figure className="group relative h-full min-h-72 overflow-hidden border border-border">
                <img src={wildsAsset.url} alt="Arcturus wilderness lake at sunset" loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-background/85 p-4 font-display uppercase backdrop-blur-md">The wild frontier</figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="compare" className="grid-texture border-b border-border py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal className="mb-12 text-center">
            <p className="mb-4 text-sm font-bold uppercase text-primary">Choose your server</p>
            <h2 className="font-display text-4xl uppercase sm:text-6xl">Stay controlled—or <span className="text-primary">be free.</span></h2>
          </Reveal>
          <Reveal>
            <div className="overflow-hidden border border-border bg-card">
              <div className="grid grid-cols-2 border-b border-border">
                <div className="bg-muted p-5 sm:p-7"><p className="font-display text-sm uppercase text-muted-foreground sm:text-xl">The old way</p></div>
                <div className="bg-primary p-5 text-primary-foreground sm:p-7"><p className="font-display text-sm uppercase sm:text-xl">Arcturus</p></div>
              </div>
              {comparison.map(([bad, good]) => (
                <div key={bad} className="grid grid-cols-2 border-b border-border last:border-b-0">
                  <div className="flex items-center gap-3 p-4 text-sm text-muted-foreground sm:p-5 sm:text-base"><X className="shrink-0 text-destructive" size={18} aria-hidden="true" />{bad}</div>
                  <div className="flex items-center gap-3 border-l border-border p-4 text-sm font-semibold sm:p-5 sm:text-base"><Check className="shrink-0 text-primary" size={18} aria-hidden="true" />{good}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden py-24 sm:py-36">
        <img src={wildsAsset.url} alt="" className="absolute inset-0 size-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-background/80" />
        <Reveal className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
          <Flame className="mx-auto mb-7 text-accent" size={38} aria-hidden="true" />
          <h2 className="font-display text-4xl uppercase sm:text-7xl">Your faction.<br /><span className="text-primary">Your rules.</span></h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">Launch Minecraft Java Edition, add the server, and step into Arcturus Reborn.</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CopyIpButton />
            <Button variant="outline" size="lg" disabled title="Discord link coming soon">
              <UsersRound size={19} aria-hidden="true" /> Discord coming soon
            </Button>
          </div>
        </Reveal>
      </section>

      <footer className="border-t border-border bg-card px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
          <div><p className="font-display uppercase">Arcturus <span className="text-primary">Reborn</span></p><p className="mt-1 text-xs text-muted-foreground">Independent Minecraft server. Not affiliated with Mojang or Microsoft.</p></div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase text-muted-foreground"><Server size={15} aria-hidden="true" /> play.arcturusmc.org <ExternalLink size={14} aria-hidden="true" /></div>
        </div>
      </footer>
    </main>
  );
}