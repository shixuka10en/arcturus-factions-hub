export const siteConfig = {
  brand: "Arcturus Reborn",
  siteUrl: "https://www.arcturusmc.org",
  serverAddress: "play.arcturusmc.org",
  storeUrl: "https://www.arcturusmc.org/store/",
  minecraftVersion: "Supports 1.8+ clients",
  access: "Cracked",
  discordUrl: "https://discord.gg/DTR6serkeM",
  ogImagePath: "/images/og-image.webp",
  description:
    "ArcturusMC is a cracked Minecraft Java+Bedrock server supporting 1.8–26.2 clients. We have monthly FactionsTop payouts, easy-to-learn custom enchants, and pet pvp.",
  images: {
    night: {
      src: "/images/arcturus-night.webp",
      width: 1672,
      height: 941,
      alt: "Moonlit Arcturus spawn with blue crystal towers",
    },
    factions: {
      src: "/images/arcturus-factions.webp",
      width: 1672,
      height: 941,
      alt: "Arcturus Factions village at sunset",
    },
    market: {
      src: "/images/arcturus-market.webp",
      width: 1672,
      height: 941,
      alt: "Arcturus custom chest marketplace",
    },
    wilds: {
      src: "/images/arcturus-wilds.webp",
      width: 1672,
      height: 941,
      alt: "Arcturus wilderness lake at sunset",
    },
  },
} as const;

export const pageMetadata = {
  home: {
    path: "/",
    title: "ArcturusMC Factions & KitPvP",
    description: siteConfig.description,
  },
  vote: {
    path: "/vote/",
    title: "Vote for ArcturusMC | Factions & KitPvP",
    description:
      "Support ArcturusMC by voting on the server lists that help new players discover our cracked Minecraft Factions & KitPvP server.",
  },
  notFound: {
    path: "/404",
    title: "Page not found | ArcturusMC",
    description:
      "This page isn't on Arcturus. Head home, vote for the server, or jump in on Discord.",
    robots: "noindex, follow",
  },
} as const;

export const homeContent = {
  hero: {
    eyebrow: `${siteConfig.minecraftVersion} · ${siteConfig.access}`,
    title: "Factions & KitPvP",
    tagline: [
      "We have 1.8 style Factions & Practice PvP.",
      "We also support cracked & bedrock clients.",
    ],
    addressLabel: "Server IP",
    addressValue: siteConfig.siteUrl.replace("https://www.", ""),
    discoverLabel: "Discover Arcturus",
  },
  about: {
    eyebrow: "Introducing Arcturus",
    title: "Freedom is the whole point.",
    body: "Arcturus is a Minecraft Factions server focused on no-staff mechanics. If staff control what you can and cannot do, what is the point of playing in that dystopian environment?",
    highlights: ["No moderation", "Never any staff", "Freedom forever"],
  },
  featuresIntro: {
    eyebrow: "Arcturus Factions is",
    title: ["Simple &", "Easy to learn"],
    // body: "Explore, raid, trade, and grind your way to the top. Your faction’s story is decided by players—not a staff panel.",
  },
  features: [
    {
      icon: "shield",
      title: "Gen Buckets",
      text: "Buy them from the shop to build bases easily.",
    },
    {
      icon: "globe",
      title: "Monthly Payouts",
      text: `We give $100 to the faction with the highest value every month. Join discord to learn more.`,
      accent: true,
    },
    {
      icon: "swords",
      title: "1.8 PvP",
      text: "Easy and enjoyable fights you're already used to.",
    },
    {
      icon: "sparkles",
      title: "Custom enchants",
      text: "Simple to understand and fun to play with. Preview what the enchants do with /enchanter.",
    },
    {
      icon: "gem",
      title: "Pet PvP",
      text: "Custom pets to help you PvP. See what they do by previewing the crates at spawn.",
    },
    {
      icon: "zap",
      title: "Custom Cannons",
      text: "Cannoning properly in new Minecraft versions is nearly impossible nowadays. We spent 200 hours to build our custom cannoning system.",
    },
  ],
  gallery: {
    eyebrow: "take a look at",
    title: "What we look like",
    images: [
      { key: "factions", caption: "Faction heartlands", detail: "Explore · Raid · Grind" },
      { key: "market", caption: "Custom rewards" },
      { key: "wilds", caption: "The wild frontier" },
    ],
  },
  comparison: {
    eyebrow: "Choose your server",
    title: "Stay controlled—or be free.",
    oldLabel: "The old way",
    newLabel: "Arcturus",
    rows: [
      ["Lag and unsupported setups", "Performance-first gameplay"],
      ["Outdated plugins", "Advanced custom systems"],
      ["Staff deciding your fate", "No staff — player freedom"],
      ["Rare yearly updates", "Regular updates"],
      ["Extreme pay-to-win", "Free marketplace"],
      ["Forced email authentication", "VPN-friendly access"],
      ["Nonexistent support", "Direct contact and Discord support"],
    ],
  },
  callToAction: {
    title: ["Chat with us", "on Discord!"],
    body: "",
  },
} as const;

export const voteDestinations = [
  { label: "MinecraftServers.org", url: "https://minecraftservers.org/vote/658245" },
  { label: "Minecraft-MP.com", url: "https://minecraft-mp.com/server/363987/vote/" },
  { label: "MineRank.com", url: "https://www.minerank.com/arcturusmc/vote" },
  {
    label: "Minecraft-Server-List.com",
    url: "https://minecraft-server-list.com/server/523369/vote/",
  },
  { label: "Planet Minecraft", url: "https://www.planetminecraft.com/server/arcturusmc/vote/" },
  { label: "Minecraft.Buzz", url: "https://minecraft.buzz/vote/arcturusmc" },
  { label: "CurseForge", url: "https://www.curseforge.com/servers/minecraft/game/arcturusmc/vote" },
] as const;

export type SitePage = keyof typeof pageMetadata;

export function absoluteUrl(path: string): string {
  return new URL(path, siteConfig.siteUrl).toString();
}

export function pageHead(page: SitePage) {
  const metadata = pageMetadata[page];
  const canonicalUrl = absoluteUrl(metadata.path);
  const imageUrl = absoluteUrl(siteConfig.ogImagePath);

  return {
    meta: [
      { title: metadata.title },
      { name: "description", content: metadata.description },
      { name: "author", content: siteConfig.brand },
      {
        name: "robots",
        content: "robots" in metadata ? metadata.robots : "index, follow, max-image-preview:large",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonicalUrl },
      { property: "og:site_name", content: siteConfig.brand },
      { property: "og:title", content: metadata.title },
      { property: "og:description", content: metadata.description },
      { property: "og:image", content: imageUrl },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: metadata.title },
      { name: "twitter:description", content: metadata.description },
      { name: "twitter:image", content: imageUrl },
    ],
    links: [{ rel: "canonical", href: canonicalUrl }],
  };
}
