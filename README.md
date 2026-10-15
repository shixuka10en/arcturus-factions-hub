# Arcturus Reborn — Website Source

Authoring repository for the official [Arcturus Reborn](https://www.arcturusmc.org) Minecraft Factions website.

## Architecture & Project Structure

- **Single Source of Truth**: This repository (`arcturus-factions-hub`) contains the real authored React components, CSS, and site configuration.
- **Deployment Repository**: Pre-rendered static output is deployed to [`lusterni`](https://github.com/Lusterni/lusterni) (which GitHub Pages serves at `www.arcturusmc.org`).
- **Hydration Parity**: Static export pre-renders the exact HTML and matching client bundles to prevent hydration mismatches, DOM flicker, or black screens.

### Key Files & Folders

- `src/config/site.ts` — **Edit site text here**: Server address, Minecraft versions, Discord URL, feature descriptions, and SEO metadata.
- `src/components/site/` — Human-readable, modular React components:
  - `home-page.tsx` — Full homepage sections (Hero, About, Features, World Gallery, Server Comparison).
  - `vote-page.tsx` — Dedicated voting guide with links to 7 server lists.
  - `site-header.tsx` — Sticky header with dead-center desktop navigation and mobile drawer.
  - `site-footer.tsx` — Clean footer with server IP and Discord link.
  - `copy-server-address.tsx` — Resilient clipboard copy component with visual feedback.
  - `site-structured-data.tsx` — Schema.org JSON-LD structured data for Google Search.
- `src/styles.css` — Modern design system using Tailwind v4, custom theme variables, and responsive layout.
- `public/` — Static assets (WebP images, multi-resolution favicons, `robots.txt`, `sitemap.xml`).
- `scripts/`
  - `static-export.mjs` — Pre-renders `/` and `/vote` into static HTML files in `.output/public`.
  - `deploy-to-lusterni.mjs` — Cleans and synchronizes production build files directly to the `lusterni` deployment directory.

## Development Workflow

### 1. Local Development

```bash
npm run dev
```

Starts the Vite development server with hot module replacement.

### 2. Making Content Changes

To change site copy, server information, or SEO tags, edit `src/config/site.ts`.

### 3. Build & Export

```bash
npm run build
```

Compiles client and SSR bundles, then executes static pre-rendering into `.output/public`.

### 4. Deploy to Lusterni

```bash
npm run deploy
```

Builds the latest static export and automatically synchronizes all production files to `lusterni`, while purging all stale hashed assets.
