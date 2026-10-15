import { siteConfig } from "@/config/site";

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.brand,
    url: siteConfig.siteUrl,
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.brand,
    url: siteConfig.siteUrl,
    sameAs: [siteConfig.discordUrl],
  },
];

export function SiteStructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
