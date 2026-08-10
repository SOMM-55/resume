/**
 * Build script: generates a self-contained standalone resume.html
 * for GitHub Pages hosting. No server/build needed.
 *
 * Usage: node scripts/build-standalone.js
 *
 * Inputs:
 *   data/resume.ts — typed resume data (identity, languages, uiStrings, content)
 *   style.css      — the .rv-* CSS section used by the standalone page
 *
 * Output:
 *   public/resume.html — single self-contained HTML file
 */
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DATA_FILE = path.join(ROOT, "data/resume.ts");
const CSS_FILE = path.join(ROOT, "style.css");
const OUT_FILE = path.join(ROOT, "public/resume.html");

// ─── 1. Read CSS ───
const css = fs.readFileSync(CSS_FILE, "utf8");

// ─── 2. Extract & convert TypeScript data to plain JS ───
const tsRaw = fs.readFileSync(DATA_FILE, "utf8");

// Bracket-matching extractor: finds `export const NAME` and extracts the full
// value (object or array) by counting braces until balanced.
function extractConst(src, name) {
  // Match `export const NAME` optionally followed by `: Type`, then `=`
  const re = new RegExp("export\\s+const\\s+" + name + "\\s*(?::[^=]+)?=\\s*");
  const m = re.exec(src);
  if (!m) throw new Error("Could not find: " + name);
  let i = m.index + m[0].length;
  while (i < src.length && /\s/.test(src[i])) i++;
  const start = i;
  const open = src[i];
  const close = open === "{" ? "}" : open === "[" ? "]" : null;
  if (!close) throw new Error("Expected { or [ for " + name + ", got: " + open);
  let depth = 0;
  for (; i < src.length; i++) {
    const ch = src[i];
    if (ch === open) depth++;
    else if (ch === close) { depth--; if (depth === 0) { i++; break; } }
  }
  const raw = src.slice(start, i);
  // Strip inline type annotations: `: SomeType` and `as SomeType`
  return raw
    .replace(/:\s*[A-Za-z_][A-Za-z0-9_<>\[\]| ,]*?(?=[=,;}\]\n])/g, "")
    .replace(/\s+as\s+[A-Za-z_][A-Za-z0-9_<>\[\]]*/g, "");
}

const identitySrc = extractConst(tsRaw, "identity");
const languagesSrc = extractConst(tsRaw, "languages");
const uiStringsSrc = extractConst(tsRaw, "uiStrings");
const contentSrc = extractConst(tsRaw, "content");

const sandbox = {};
const fn = new Function(
  "const identity = " + identitySrc + ";\n" +
  "const languages = " + languagesSrc + ";\n" +
  "const uiStrings = " + uiStringsSrc + ";\n" +
  "const content = " + contentSrc + ";\n" +
  "return { identity, languages, uiStrings, content };"
);
const { identity, languages, uiStrings, content } = fn();

// ─── 3. Build the data object as a JS string ───
const dataStr = JSON.stringify({ identity, languages, uiStrings, content });

// ─── 4. Generate the standalone HTML ───
const html = `<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${identity.name} — Senior Data Engineer · Agentic Systems</title>
<meta name="description" content="Senior Data Engineer · Agentic Systems. 7+ years in data engineering, system architecture, ETL/ELT pipelines, Node.js, TypeScript, Python, PostgreSQL, and AI-agent / Spec-Driven Development workflows.">
<meta name="author" content="${identity.name}">
<meta name="keywords" content="Full-Stack Developer, Data Engineer, Node.js, TypeScript, Python, PostgreSQL, Microservices, ETL, SDD, Agentic Development, ${identity.name}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Vazirmatn:wght@400;500;600;700;800&family=Noto+Sans+SC:wght@400;500;700&family=Noto+Sans+JP:wght@400;500;700&family=Noto+Sans+KR:wght@400;500;700&display=swap" rel="stylesheet">
<style>
${css}

/* ───────── Font system ───────── */
:root {
  --rv-font-latin: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --rv-font-fa: "Vazirmatn", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --rv-font-zh: "Noto Sans SC", "Inter", -apple-system, sans-serif;
  --rv-font-ja: "Noto Sans JP", "Inter", -apple-system, sans-serif;
  --rv-font-mono: ui-monospace, "SF Mono", "Cascadia Code", "Roboto Mono", Consolas, monospace;
}
html, body {
  font-family: var(--rv-font-latin);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
/* Persian & Arabic → Vazirmatn */
html[lang="fa"], html[lang="ar"] { font-family: var(--rv-font-fa); }
html[lang="fa"] body, html[lang="ar"] body { font-family: var(--rv-font-fa); }
/* Chinese → Noto Sans SC */
html[lang="zh"] body { font-family: var(--rv-font-zh); }
/* Japanese → Noto Sans JP */
html[lang="ja"] body { font-family: var(--rv-font-ja); }
.rv-doc, .rv-docInner, .rv-toolbar, .rv-quicknav, .rv-helpDialog {
  font-family: inherit;
}
.rv-name, .rv-role, .rv-eduDeg, .rv-h, .rv-skillLabel {
  letter-spacing: -0.005em;
}
.rv-monogram { font-family: var(--rv-font-mono); }
.rv-kbd { font-family: var(--rv-font-mono); }

/* ───────── Reading progress bar ───────── */
.rv-progress {
  position: fixed; top: 0; left: 0; right: 0;
  height: 3px; background: transparent; z-index: 100;
}
.rv-progressFill {
  height: 100%;
  background: linear-gradient(90deg, var(--rv-accent), #2dd4bf);
  transition: width 0.1s ease;
  box-shadow: 0 0 8px rgba(15, 118, 110, 0.5);
}

/* ───────── Back to top button ───────── */
.rv-topBtn {
  position: fixed; bottom: 24px; inset-inline-end: 24px;
  width: 42px; height: 42px; border-radius: 50%;
  border: none; background: var(--rv-accent); color: #fff;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  box-shadow: 0 6px 18px -4px rgba(15, 118, 110, 0.5);
  opacity: 0; transform: translateY(10px); pointer-events: none;
  transition: all 0.2s ease; z-index: 90;
}
.rv-topBtn.rv-visible { opacity: 1; transform: translateY(0); pointer-events: auto; }
.rv-topBtn:hover { background: #0d5f58; transform: translateY(-2px); }

/* ───────── Help dialog ───────── */
.rv-helpOverlay {
  position: fixed; inset: 0; z-index: 110;
  background: rgba(15, 23, 42, 0.5); backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center; padding: 20px;
  animation: rv-fade 0.18s ease;
}
.rv-helpDialog {
  position: relative; background: #fff; border-radius: 14px;
  box-shadow: 0 30px 80px -20px rgba(15,23,42,.5);
  max-width: 420px; width: 100%; padding: 24px; color: var(--rv-body);
}
.rv-app.rv-dark .rv-helpDialog { background: #0f172a; }
.rv-helpTitle { font-size: 16px; font-weight: 700; color: var(--rv-ink); margin: 0 0 4px; display: flex; align-items: center; gap: 8px; }
.rv-helpSub { font-size: 12px; color: var(--rv-muted); margin-bottom: 16px; }
.rv-helpList { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
.rv-helpItem { display: flex; align-items: center; justify-content: space-between; gap: 12px; font-size: 13px; color: var(--rv-body); }
.rv-helpKeys { display: flex; gap: 4px; }
.rv-helpClose {
  position: absolute; top: 14px; inset-inline-end: 14px;
  width: 30px; height: 30px; border-radius: 8px;
  border: 1px solid var(--rv-line); background: #fff; color: var(--rv-ink);
  cursor: pointer; display: flex; align-items: center; justify-content: center;
}
.rv-app.rv-dark .rv-helpClose { background: #1e293b; border-color: #334155; color: #e2e8f0; }
.rv-helpClose:hover { border-color: var(--rv-accent); color: var(--rv-accent); }

@media print {
  .rv-progress, .rv-topBtn, .rv-helpOverlay, .rv-quicknav, .rv-helpBtn { display: none !important; }
}
</style>
</head>
<body>
<div class="rv-app" id="app">
  <div class="rv-progress" aria-hidden="true"><div class="rv-progressFill" id="progressFill" style="width:0%"></div></div>

  <div class="rv-toolbar" role="toolbar" aria-label="Resume controls">
    <div style="display:flex;align-items:center;gap:10px;min-width:0">
      <span class="rv-atsBadge" id="atsBadge"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg> <span id="atsBadgeText">ATS-READY</span></span>
      <button type="button" class="rv-iconBtn rv-helpBtn" id="helpBtn" title="Keyboard shortcuts"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg></button>
    </div>
    <div style="display:flex;align-items:center;gap:6px">
      <button type="button" class="rv-iconBtn" id="darkBtn" aria-pressed="false" title="Dark mode"><svg id="darkIcon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg></button>
      <button type="button" class="rv-iconBtn" id="copyBtn" title="Copy plain text"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg></button>
      <button type="button" class="rv-iconBtn" id="downloadBtn" title="Download HTML"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg></button>
      <span style="width:1px;height:22px;background:var(--rv-line);margin:0 4px"></span>
      <div style="position:relative" id="langWrap">
        <button type="button" class="rv-langBtn" id="langBtn" aria-haspopup="listbox" aria-expanded="false"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg> <span id="langLabel">English</span> <svg id="langChevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transition:transform .15s"><polyline points="6 9 12 15 18 9"/></svg></button>
        <ul role="listbox" class="rv-menu" id="langMenu" style="display:none;position:absolute;top:calc(100% + 6px);inset-inline-end:0;min-width:150px;list-style:none;margin:0;padding:6px;background:var(--rv-tint);border:1px solid var(--rv-line);border-radius:10px;box-shadow:0 16px 40px -16px rgba(15,23,42,.35);z-index:60"></ul>
      </div>
      <button type="button" class="rv-printBtn" id="printBtn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg> <span id="printText">Print / Save as PDF</span></button>
    </div>
  </div>

  <nav class="rv-quicknav" id="quicknav" aria-label="Jump to section"></nav>

  <article class="rv-doc" id="doc" dir="ltr" lang="en" itemscope itemtype="https://schema.org/Person">
    <div class="rv-docInner" id="docInner"></div>
  </article>

  <div class="rv-printRunning" aria-hidden="true"><span class="rv-pfLeft" id="pfLeft"></span><span class="rv-pfRight"></span></div>

  <button type="button" class="rv-topBtn" id="topBtn" title="Back to top"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg></button>

  <div class="rv-helpOverlay" id="helpOverlay" style="display:none">
    <div class="rv-helpDialog">
      <button type="button" class="rv-helpClose" id="helpClose"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
      <h2 class="rv-helpTitle"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="M6 8h.001"/><path d="M10 8h.001"/><path d="M14 8h.001"/><path d="M18 8h.001"/><path d="M8 12h.001"/><path d="M12 12h.001"/><path d="M16 12h.001"/><path d="M7 16h10"/></svg> <span id="helpTitleText">Keyboard Shortcuts</span></h2>
      <p class="rv-helpSub" id="helpSubText">Press a key to trigger an action. Escape closes this dialog.</p>
      <ul class="rv-helpList" id="helpList"></ul>
    </div>
  </div>
</div>

<script>
const DATA = ${dataStr};
const { identity, languages, uiStrings, content } = DATA;

let lang = "en";
let dark = false;
let menuOpen = false;
let activeSection = "";

(function init() {
  const m = location.hash.match(/lang=([a-z]{2})/i);
  if (m && content[m[1]]) lang = m[1];
  else { try { const s = localStorage.getItem("rv:lang"); if (s && content[s]) lang = s; } catch(e){} }
  try { dark = localStorage.getItem("rv:dark") === "1"; } catch(e){}
})();

const icons = {
  mail: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
  phone: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  pin: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
  linkedin: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>',
  github: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>',
  user: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  briefcase: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
  code: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
  folder: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/></svg>',
  grad: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>',
  langs: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>',
  heart: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
  scroll: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/></svg>',
};

function render() {
  const c = content[lang];
  const u = uiStrings[lang];
  document.documentElement.lang = lang;
  document.documentElement.dir = c.dir;
  document.title = identity.name + " — " + c.title;
  document.getElementById("app").className = "rv-app" + (dark ? " rv-dark" : "");
  const doc = document.getElementById("doc");
  doc.setAttribute("dir", c.dir);
  doc.setAttribute("lang", lang);

  document.getElementById("atsBadgeText").textContent = u.atsBadge;
  document.getElementById("atsBadge").title = u.atsBadgeTitle;
  document.getElementById("printText").textContent = c.ui.print;
  document.getElementById("langLabel").textContent = languages.find(l => l.code === lang).label;
  document.getElementById("pfLeft").textContent = identity.name;
  const darkBtn = document.getElementById("darkBtn");
  darkBtn.setAttribute("aria-pressed", dark);
  darkBtn.title = dark ? u.lightMode : u.darkMode;
  document.getElementById("darkIcon").outerHTML = dark
    ? '<svg id="darkIcon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>'
    : '<svg id="darkIcon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';

  const menu = document.getElementById("langMenu");
  menu.innerHTML = languages.map(l => {
    const active = l.code === lang;
    return '<li role="option" aria-selected="' + active + '"><button type="button" data-lang="' + l.code + '" style="width:100%;display:flex;align-items:center;justify-content:space-between;gap:8px;padding:7px 10px;border:none;background:' + (active ? "var(--rv-accent-soft)" : "transparent") + ';border-radius:7px;cursor:pointer;font-size:12.5px;font-weight:600;color:' + (active ? "#115e59" : "var(--rv-ink)") + ';text-align:' + (c.dir === "rtl" ? "right" : "left") + '"><span>' + l.label + '</span>' + (active ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' : "") + '</button></li>';
  }).join("");
  menu.querySelectorAll("button[data-lang]").forEach(btn => {
    btn.addEventListener("click", () => { setLang(btn.dataset.lang); closeMenu(); });
  });

  const navItems = [
    { id: "summary", icon: icons.user, label: c.sections.summary },
    { id: "experience", icon: icons.briefcase, label: c.sections.experience },
    { id: "projects", icon: icons.folder, label: c.sections.projects },
    { id: "skills", icon: icons.code, label: c.sections.skills },
    { id: "education", icon: icons.grad, label: c.sections.education },
    { id: "certificates", icon: icons.scroll, label: c.sections.certificates },
    { id: "languages", icon: icons.langs, label: c.sections.languages },
    { id: "interests", icon: icons.heart, label: c.sections.interests },
  ];
  document.getElementById("quicknav").innerHTML = navItems.map(item =>
    '<button type="button" class="rv-quickpill' + (activeSection === item.id ? " rv-quickpill-active" : "") + '" data-jump="' + item.id + '" title="' + item.label.replace(/"/g, "&quot;") + '">' + item.icon + '<span>' + item.label + '</span></button>'
  ).join("");
  document.querySelectorAll(".rv-quickpill[data-jump]").forEach(btn => {
    btn.addEventListener("click", () => jumpTo(btn.dataset.jump));
  });

  const inner = document.getElementById("docInner");
  inner.innerHTML = renderHeader(c) + renderSummary(c) + '<div class="rv-grid">' + renderMain(c) + renderSide(c) + '</div>' +
    '<div class="rv-printFooter" aria-hidden="true"><span class="rv-pfName">' + identity.name + '</span><span>' + identity.email + ' · ' + identity.phone + '</span></div>';

  document.getElementById("helpTitleText").textContent = u.keyboardHint.split(":")[0] || "Keyboard Shortcuts";
  document.getElementById("helpList").innerHTML = [
    { key: "P", label: c.ui.print },
    { key: "D", label: u.download },
    { key: "C", label: u.copyText },
    { key: "?", label: u.keyboardHint.split(":")[0] || "Help" },
    { key: "Esc", label: u.reset + " / Close" },
  ].map(item => '<li class="rv-helpItem"><span>' + item.label + '</span><span class="rv-helpKeys"><span class="rv-kbd">' + item.key + '</span></span></li>').join("");
}

function renderHeader(c) {
  return '<header class="rv-header"><div class="rv-headerText">' +
    '<h1 class="rv-name" itemprop="name">' + identity.name + '</h1>' +
    '<p class="rv-title" itemprop="jobTitle">' + c.title + '</p>' +
    '<p class="rv-eyebrow">' + c.eyebrow + '</p>' +
    '<div class="rv-contact">' +
    '<a href="mailto:' + identity.email + '" itemprop="email">' + icons.mail + ' ' + identity.email + '</a>' +
    '<a href="tel:' + identity.phoneHref + '" itemprop="telephone">' + icons.phone + ' ' + identity.phone + '</a>' +
    '<span itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">' + icons.pin + ' <span itemprop="addressLocality">' + identity.location + '</span></span>' +
    '<a href="' + identity.linkedinHref + '" target="_blank" rel="noopener noreferrer" itemprop="sameAs">' + icons.linkedin + ' ' + identity.linkedin + '</a>' +
    '<a href="' + identity.githubHref + '" target="_blank" rel="noopener noreferrer" itemprop="sameAs">' + icons.github + ' ' + identity.github + '</a>' +
    '</div></div></header>';
}

function renderSummary(c) {
  return '<section id="sec-summary" class="rv-section" aria-label="' + c.sections.summary + '"><h2 class="rv-h">' + icons.user + ' ' + c.sections.summary + '</h2><p class="rv-summary" dir="' + c.dir + '" itemprop="description">' + c.summary + '</p></section>';
}

function renderMain(c) {
  let html = '<div class="rv-main">';
  html += '<section id="sec-experience" class="rv-section" aria-label="' + c.sections.experience + '"><h2 class="rv-h">' + icons.briefcase + ' ' + c.sections.experience + '</h2><div class="rv-expList">';
  html += c.jobs.map(job =>
    '<article class="rv-job"><div class="rv-jobHead"><span class="rv-role">' + job.role + '</span><span class="rv-company">' + job.company + '</span></div>' +
    '<div class="rv-meta"><span>' + icons.pin.replace('width="13"', 'width="11"') + ' ' + job.location + '</span><span>·</span><span>' + job.period + '</span>' +
    '<span class="rv-pill">' + job.typeLabel + '</span><span class="rv-pill">' + job.modelLabel + '</span></div>' +
    '<p class="rv-overview">' + job.overview + '</p>' +
    '<ul class="rv-bullets">' + job.achievements.map(a => '<li>' + a + '</li>').join("") + '</ul>' +
    '<div class="rv-tech" aria-label="' + c.ui.techLabel + '">' + job.tech.map(t => '<span class="rv-tag">' + t + '</span>').join("") + '</div></article>'
  ).join("");
  html += '</div></section>';
  html += '<section id="sec-projects" class="rv-section" aria-label="' + c.sections.projects + '"><h2 class="rv-h">' + icons.folder + ' ' + c.sections.projects + '</h2>';
  html += c.projects.map(p => '<article class="rv-proj"><div class="rv-projName">' + p.name + '</div><div class="rv-projDesc">' + p.description + '</div><div class="rv-projTech">' + p.tech + '</div></article>').join("");
  html += '</section></div>';
  return html;
}

function renderSide(c) {
  let html = '<aside class="rv-side">';
  html += '<section id="sec-skills" class="rv-section" aria-label="' + c.sections.skills + '"><h2 class="rv-h">' + icons.code + ' ' + c.sections.skills + '</h2>';
  html += c.skills.map(g => '<div class="rv-skillGroup"><div class="rv-skillLabel">' + g.label + '</div><div class="rv-skillItems">' + g.items.map(s => '<span class="rv-skillItem">' + s + '</span>').join("") + '</div></div>').join("");
  html += '</section>';
  html += '<section id="sec-education" class="rv-section" aria-label="' + c.sections.education + '"><h2 class="rv-h">' + icons.grad + ' ' + c.sections.education + '</h2>';
  html += c.education.map(e => '<article class="rv-edu"><div class="rv-eduDeg">' + e.degree + '</div><div class="rv-eduInst">' + e.institution + '</div><div class="rv-eduMeta">' + e.location + ' · ' + e.period + '</div><div class="rv-eduGrade">' + e.grade + '</div>' + (e.thesis ? '<div class="rv-eduThesis">' + c.ui.thesis + ': ' + e.thesis + '</div>' : '') + '</article>').join("");
  html += '</section>';
  html += '<section id="sec-certificates" class="rv-section" aria-label="' + c.sections.certificates + '"><h2 class="rv-h">' + icons.scroll + ' ' + c.sections.certificates + '</h2>';
  html += c.certificates.map(cert => '<div class="rv-cert"><div class="rv-certName">' + cert.name + '</div><div class="rv-certIssuer">' + cert.issuer + '</div></div>').join("");
  html += '</section>';
  html += '<section id="sec-languages" class="rv-section" aria-label="' + c.sections.languages + '"><h2 class="rv-h">' + icons.langs + ' ' + c.sections.languages + '</h2>';
  html += c.languagesKnown.map(l => '<div class="rv-langRow"><span class="rv-langName">' + l.name + '</span><span class="rv-langLvl">' + l.level + '</span></div>').join("");
  html += '</section>';
  html += '<section id="sec-interests" class="rv-section" aria-label="' + c.sections.interests + '"><h2 class="rv-h">' + icons.heart + ' ' + c.sections.interests + '</h2><div class="rv-interestList">' + c.interests.map(it => '<span class="rv-interest">' + it + '</span>').join("") + '</div></section>';
  html += '</aside>';
  return html;
}

function setLang(code) {
  if (!content[code]) return;
  lang = code;
  try { localStorage.setItem("rv:lang", code); } catch(e){}
  history.replaceState(null, "", "#lang=" + code);
  render();
  setupScrollspy();
}

function toggleDark() {
  dark = !dark;
  try { localStorage.setItem("rv:dark", dark ? "1" : "0"); } catch(e){}
  render();
}

function toggleMenu() {
  menuOpen = !menuOpen;
  document.getElementById("langMenu").style.display = menuOpen ? "block" : "none";
  document.getElementById("langBtn").setAttribute("aria-expanded", menuOpen);
  document.getElementById("langChevron").style.transform = menuOpen ? "rotate(180deg)" : "none";
}
function closeMenu() {
  if (!menuOpen) return;
  menuOpen = false;
  document.getElementById("langMenu").style.display = "none";
  document.getElementById("langBtn").setAttribute("aria-expanded", "false");
  document.getElementById("langChevron").style.transform = "none";
}

function jumpTo(id) {
  const el = document.getElementById("sec-" + id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", "#lang=" + lang);
}

function handlePrint() { window.print(); }

function handleCopyText() {
  const c = content[lang];
  const lines = [identity.name, c.title, identity.email + " | " + identity.phone + " | " + identity.location, identity.linkedinHref + " | " + identity.githubHref, "", "========================================", c.sections.summary.toUpperCase(), "========================================", c.summary, "", "========================================", c.sections.experience.toUpperCase(), "========================================"];
  for (const job of c.jobs) { lines.push("", job.role + " — " + job.company, job.location + " | " + job.period + " | " + job.typeLabel + " | " + job.modelLabel, "", job.overview, ""); for (const a of job.achievements) lines.push("  - " + a); lines.push("", "Technologies: " + job.tech.join(", ")); }
  lines.push("", "========================================", c.sections.projects.toUpperCase(), "========================================");
  for (const p of c.projects) lines.push("", p.name, p.description, "Tech: " + p.tech);
  lines.push("", "========================================", c.sections.skills.toUpperCase(), "========================================");
  for (const g of c.skills) lines.push(g.label + ": " + g.items.join(", "));
  lines.push("", "========================================", c.sections.education.toUpperCase(), "========================================");
  for (const e of c.education) { lines.push("", e.degree + " — " + e.institution, e.location + " | " + e.period, e.grade, e.thesis ? c.ui.thesis + ": " + e.thesis : ""); }
  lines.push("", "========================================", c.sections.certificates.toUpperCase(), "========================================");
  for (const cert of c.certificates) lines.push("- " + cert.name + " (" + cert.issuer + ")");
  lines.push("", "========================================", c.sections.languages.toUpperCase(), "========================================");
  for (const l of c.languagesKnown) lines.push(l.name + ": " + l.level);
  lines.push("", "========================================", c.sections.interests.toUpperCase(), "========================================", c.interests.join(", "));
  const text = lines.join("\\n");
  if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).catch(()=>{});
  else { const ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta); }
}

function handleDownload() {
  const html = "<!DOCTYPE html>\\n" + document.documentElement.outerHTML;
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = identity.name.replace(/\\s+/g, "_") + "_Resume_" + lang + ".html";
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

let observer;
function setupScrollspy() {
  if (observer) observer.disconnect();
  const ids = ["summary","experience","projects","skills","education","certificates","languages","interests"];
  const sections = ids.map(id => document.getElementById("sec-" + id)).filter(Boolean);
  if (!sections.length) return;
  observer = new IntersectionObserver((entries) => {
    const visible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio);
    if (visible[0]) {
      const newActive = visible[0].target.id.replace(/^sec-/, "");
      if (newActive !== activeSection) {
        activeSection = newActive;
        document.querySelectorAll(".rv-quickpill").forEach(p => p.classList.toggle("rv-quickpill-active", p.dataset.jump === activeSection));
      }
    }
  }, { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] });
  sections.forEach(s => observer.observe(s));
}

function onScroll() {
  const st = window.scrollY;
  const dh = document.documentElement.scrollHeight - window.innerHeight;
  const pct = dh > 0 ? Math.min(100, Math.max(0, (st / dh) * 100)) : 0;
  document.getElementById("progressFill").style.width = pct + "%";
  document.getElementById("topBtn").classList.toggle("rv-visible", st > 400);
}

document.getElementById("darkBtn").addEventListener("click", toggleDark);
document.getElementById("copyBtn").addEventListener("click", handleCopyText);
document.getElementById("downloadBtn").addEventListener("click", handleDownload);
document.getElementById("printBtn").addEventListener("click", handlePrint);
document.getElementById("langBtn").addEventListener("click", toggleMenu);
document.getElementById("helpBtn").addEventListener("click", () => { document.getElementById("helpOverlay").style.display = "flex"; });
document.getElementById("helpClose").addEventListener("click", () => { document.getElementById("helpOverlay").style.display = "none"; });
document.getElementById("helpOverlay").addEventListener("click", (e) => { if (e.target.id === "helpOverlay") e.target.style.display = "none"; });
document.getElementById("topBtn").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
document.addEventListener("click", (e) => { if (menuOpen && !document.getElementById("langWrap").contains(e.target)) closeMenu(); });
window.addEventListener("hashchange", () => { const m = location.hash.match(/lang=([a-z]{2})/i); if (m && content[m[1]] && m[1] !== lang) setLang(m[1]); });
window.addEventListener("keydown", (e) => {
  const t = e.target;
  if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  const k = e.key.toLowerCase();
  if (k === "p") { e.preventDefault(); handlePrint(); }
  else if (k === "d") { e.preventDefault(); handleDownload(); }
  else if (k === "c") { e.preventDefault(); handleCopyText(); }
  else if (k === "?" || (e.shiftKey && k === "/")) { e.preventDefault(); document.getElementById("helpOverlay").style.display = "flex"; }
  else if (k === "escape") { document.getElementById("helpOverlay").style.display = "none"; closeMenu(); }
});
window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", onScroll);

render();
setupScrollspy();
onScroll();
</script>
</body>
</html>`;

fs.writeFileSync(OUT_FILE, html, "utf8");
const size = fs.statSync(OUT_FILE).size;
console.log(`✅ Generated ${OUT_FILE}`);
console.log(`   Size: ${(size / 1024).toFixed(1)} KB (${size} bytes)`);
console.log(`   Languages: ${languages.length}`);
console.log(`   Has CSS: ${html.includes(".rv-doc")}`);
console.log(`   Has print: ${html.includes("@media print")}`);
console.log(`   Has no award: ${!html.includes("rv-award")}`);
