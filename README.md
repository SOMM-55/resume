# Resume — Sayyid Omid Mousavi Mehr

A self-contained, print-friendly, ATS-friendly, multilingual resume.

The final deliverable is a **single static HTML file** (`public/resume.html`)
with no build step, no server, no dependencies. Open it in any browser,
host it on GitHub Pages, or print it to PDF.

## Build the standalone HTML

```bash
node scripts/build-standalone.js
# → public/resume.html   (self-contained, 8 languages, dark/light/print)
```

That is the entire toolchain. No `npm install`, no bundler, no framework.

## Project structure

```
.
├── data/
│   └── resume.ts          # Typed resume data (identity, languages, uiStrings, content × 8)
├── scripts/
│   └── build-standalone.js  # Generates public/resume.html from data/style
├── style.css              # All resume CSS (light/dark/print, ~24 KB)
└── public/
    ├── resume.html        # Standalone output — the deliverable
    └── logo.svg
```

## Editing content

1. Open `data/resume.ts`
2. Edit any field — `identity`, `languages`, `uiStrings`, or the `content` map
   (8 language sections: `en`, `fa`, `de`, `zh`, `ja`, `es`, `ru`, `ar`)
3. Run `node scripts/build-standalone.js`
4. Open `public/resume.html` in a browser

## Editing style

CSS lives in `style.css` (the `.rv-*` namespace). The build script reads it
verbatim into the generated HTML's `<style>` block. All language-specific
font switching (Inter, Vazirmatn, Noto Sans SC/JP) is also embedded.

## Features

- **8 languages** with RTL support: English, فارسی, Deutsch, 中文, 日本語, Español, Русский, العربية
- **Dark mode** toggle (persisted to localStorage)
- **URL hash** deep links (`#lang=fa` opens in Farsi)
- **Quick-jump nav** with scrollspy
- **Reading progress** bar
- **Print/PDF** with A4 page-break control and page numbers
- **Copy plain-text** resume for ATS web-forms
- **Download HTML** export (saves the current language as a self-contained file)
- **Keyboard shortcuts**: P (print), D (download), C (copy), ? (help), Esc (close)
- **ATS-ready**: semantic HTML, schema.org/Person microdata, English content server-rendered

## License

Personal resume — all rights reserved.
