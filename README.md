# Resume — Sayyid Omid Mousavi Mehr

A self-contained, print-friendly, ATS-friendly, multilingual (8-language) resume.

## Quick Start (Local Development)

```bash
# Install dependencies
bun install

# Start dev server
bun run dev
# → http://localhost:3000

# Lint
bun run lint
```

## Build the Standalone HTML (for GitHub Pages)

```bash
node scripts/build-standalone.js
# → generates public/resume.html (self-contained, no server needed)
```

Copy `public/resume.html` to your GitHub Pages repo (e.g., as `index.html`).

## Project Structure

```
src/
  app/
    page.tsx          # Resume UI (client component)
    layout.tsx        # Root layout + metadata
    globals.css       # All resume CSS (light/dark/print)
    api/route.ts      # API route (if needed)
  lib/
    resume-data.ts    # All content — 8 languages (en/fa/de/zh/ja/es/ru/ar)
    utils.ts          # cn() helper
    db.ts             # Prisma client
  components/ui/      # shadcn/ui components (48)
scripts/
  build-standalone.js # Generates public/resume.html
public/
  resume.html         # Standalone HTML output (GitHub Pages ready)
  logo.svg
  robots.txt
prisma/
  schema.prisma       # Database schema (if needed)
```

## Features

- **8 languages** with RTL support (English, فارسی, Deutsch, 中文, 日本語, Español, Русский, العربية)
- **Dark mode** toggle (persisted to localStorage)
- **URL hash** deep links (`/#lang=fa` opens in Farsi)
- **Quick-jump nav** with scrollspy
- **Reading progress** bar
- **Print/PDF** with A4 page-break control + page numbers
- **Copy plain-text** resume for ATS web-forms
- **Download HTML** export
- **Keyboard shortcuts**: P (print), D (download), C (copy), ? (help), Esc (close)
- **ATS-ready**: semantic HTML, schema.org microdata, English content server-rendered

## Editing Content

All resume content is in `src/lib/resume-data.ts`. Edit the `content` object (8 language sections). After editing, regenerate the standalone:

```bash
node scripts/build-standalone.js
```

## Tech Stack

- Next.js 16 (App Router, Turbopack)
- TypeScript 5
- Tailwind CSS 4
- Lucide icons (inline SVG in standalone)

## License

Personal resume — all rights reserved.
