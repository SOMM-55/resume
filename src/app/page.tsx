"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Printer,
  Globe,
  ChevronDown,
  Check,
  User,
  Briefcase,
  Code2,
  FolderGit2,
  GraduationCap,
  Languages as LanguagesIcon,
  Heart,
  ScrollText,
  Moon,
  Sun,
  Download,
  Copy,
  ClipboardCheck,
  ShieldCheck,
  ArrowUp,
  HelpCircle,
  X,
  Keyboard,
} from "lucide-react";
import { content, identity, languages, uiStrings, type LangCode } from "@/lib/resume-data";

export default function Home() {
  // Lazy-initialize language from URL hash (#lang=fa) first, then localStorage, then "en".
  const [lang, setLang] = useState<LangCode>(() => {
    if (typeof window === "undefined") return "en";
    try {
      const m = window.location.hash.match(/lang=([a-z]{2})/i);
      if (m && content[m[1] as LangCode]) return m[1] as LangCode;
      const s = localStorage.getItem("rv:lang") as LangCode | null;
      if (s && content[s]) return s;
    } catch { /* ignore */ }
    return "en";
  });
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try { return localStorage.getItem("rv:dark") === "1"; } catch { return false; }
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [printing, setPrinting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const c = content[lang];
  const u = uiStrings[lang];

  // Reading progress + back-to-top visibility
  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
      setScrollProgress(pct);
      setShowTop(scrollTop > 400);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Sync <html lang/dir> so the whole document (incl. print) is localized.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = c.dir;
    document.title = `${identity.name} — ${c.title}`;
  }, [lang, c.dir, c.title]);

  // Persist preferences + keep URL hash in sync (shareable per-language links)
  useEffect(() => {
    try { localStorage.setItem("rv:lang", lang); } catch { /* ignore */ }
    if (typeof window !== "undefined") {
      const newHash = `lang=${lang}`;
      if (window.location.hash !== `#${newHash}`) {
        window.history.replaceState(null, "", `#${newHash}`);
      }
    }
  }, [lang]);
  useEffect(() => {
    try { localStorage.setItem("rv:dark", dark ? "1" : "0"); } catch { /* ignore */ }
  }, [dark]);

  // Respond to browser back/forward (hashchange) to switch language
  useEffect(() => {
    function onHash() {
      const m = window.location.hash.match(/lang=([a-z]{2})/i);
      if (m && content[m[1] as LangCode]) setLang(m[1] as LangCode);
    }
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Scrollspy: highlight the quick-jump pill for the section currently in view
  useEffect(() => {
    const ids = ["summary", "experience", "projects", "skills", "education", "certificates", "languages", "interests"];
    const sections = ids
      .map((id) => document.getElementById(`sec-${id}`))
      .filter((el): el is HTMLElement => !!el);
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveSection(visible[0].target.id.replace(/^sec-/, ""));
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [lang]);

  // Close dropdown on outside click
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const activeLangLabel = useMemo(
    () => languages.find((l) => l.code === lang)?.label ?? "English",
    [lang]
  );

  const handlePrint = useCallback(() => {
    setPrinting(true);
    // give the overlay a tick to paint before the print dialog blocks
    setTimeout(() => {
      window.print();
      setPrinting(false);
    }, 120);
  }, []);

  // Download a self-contained HTML copy of the current resume
  const handleDownload = useCallback(() => {
    if (typeof document === "undefined") return;
    const node = document.querySelector<HTMLElement>(".rv-doc");
    if (!node) return;
    const clone = node.cloneNode(true) as HTMLElement;
    // ensure light styling in the exported file (ATS-safe default)
    clone.classList.remove("rv-dark");

    // Collect same-origin CSS rules relevant to the resume
    let css = "";
    for (const sheet of Array.from(document.styleSheets)) {
      try {
        const rules = sheet.cssRules || [];
        for (const rule of Array.from(rules)) {
          const txt = rule.cssText || "";
          if (
            txt.includes(".rv-") ||
            txt.includes(":root") ||
            rule.type === CSSRule.MEDIA_RULE ||
            txt.includes("html, body") ||
            txt.includes("body")
          ) {
            css += txt + "\n";
          }
        }
      } catch {
        /* cross-origin stylesheet — skip */
      }
    }

    const html = `<!DOCTYPE html>
<html lang="${lang}" dir="${c.dir}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${identity.name} — ${c.title}</title>
<meta name="description" content="${c.summary.slice(0, 160).replace(/"/g, "&quot;")}">
<style>
html,body{margin:0;padding:0;background:#fff;}
${css}
.rv-app{padding:24px 12px;display:block;}
.rv-toolbar,.rv-hintBar,.rv-printOverlay{display:none !important;}
@media print { .rv-app{padding:0;} }
</style>
</head>
<body>
<div class="rv-app">
${clone.outerHTML}
</div>
</body>
</html>`;

    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${identity.name.replace(/\s+/g, "_")}_Resume_${lang}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, [lang, c.dir, c.title, c.summary]);

  // Build a plain-text version of the resume for ATS web-form pasting.
  const buildPlainText = useCallback(() => {
    const L = content[lang];
    const lines: string[] = [];
    lines.push(identity.name);
    lines.push(L.title);
    lines.push(`${identity.email} | ${identity.phone} | ${identity.location}`);
    lines.push(`${identity.linkedinHref} | ${identity.githubHref}`);
    lines.push("");
    lines.push("========================================");
    lines.push(L.sections.summary.toUpperCase());
    lines.push("========================================");
    lines.push(L.summary);
    lines.push("");
    lines.push("========================================");
    lines.push(L.sections.experience.toUpperCase());
    lines.push("========================================");
    for (const job of L.jobs) {
      lines.push("");
      lines.push(`${job.role} — ${job.company}`);
      lines.push(`${job.location} | ${job.period} | ${job.typeLabel} | ${job.modelLabel}`);
      lines.push("");
      lines.push(job.overview);
      lines.push("");
      for (const a of job.achievements) lines.push(`  - ${a}`);
      lines.push("");
      lines.push(`Technologies: ${job.tech.join(", ")}`);
    }
    lines.push("");
    lines.push("========================================");
    lines.push(L.sections.projects.toUpperCase());
    lines.push("========================================");
    for (const p of L.projects) {
      lines.push("");
      lines.push(p.name);
      lines.push(p.description);
      lines.push(`Tech: ${p.tech}`);
    }
    lines.push("");
    lines.push("========================================");
    lines.push(L.sections.skills.toUpperCase());
    lines.push("========================================");
    for (const g of L.skills) {
      lines.push(`${g.label}: ${g.items.join(", ")}`);
    }
    lines.push("");
    lines.push("========================================");
    lines.push(L.sections.education.toUpperCase());
    lines.push("========================================");
    for (const e of L.education) {
      lines.push("");
      lines.push(`${e.degree} — ${e.institution}`);
      lines.push(`${e.location} | ${e.period}`);
      lines.push(e.grade);
      if (e.thesis) lines.push(`${L.ui.thesis}: ${e.thesis}`);
    }
    lines.push("");
    lines.push("========================================");
    lines.push(L.sections.certificates.toUpperCase());
    lines.push("========================================");
    for (const cert of L.certificates) {
      lines.push(`- ${cert.name} (${cert.issuer})`);
    }
    lines.push("");
    lines.push("========================================");
    lines.push(L.sections.languages.toUpperCase());
    lines.push("========================================");
    for (const l of L.languagesKnown) {
      lines.push(`${l.name}: ${l.level}`);
    }
    lines.push("");
    lines.push("========================================");
    lines.push(L.sections.interests.toUpperCase());
    lines.push("========================================");
    lines.push(L.interests.join(", "));
    return lines.join("\n");
  }, [lang]);

  const handleCopyText = useCallback(async () => {
    const text = buildPlainText();
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for non-secure contexts
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }, [buildPlainText]);

  // Keyboard shortcuts (P print, D download, C copy text, ? help, Escape close help)
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key.toLowerCase();
      if (k === "p") { e.preventDefault(); handlePrint(); }
      else if (k === "d") { e.preventDefault(); handleDownload(); }
      else if (k === "c") { e.preventDefault(); handleCopyText(); }
      else if (k === "?" || (e.shiftKey && k === "/")) { e.preventDefault(); setShowHelp((v) => !v); }
      else if (k === "escape") { setShowHelp(false); setMenuOpen(false); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handlePrint, handleDownload, handleCopyText]);

  // Back to top
  const scrollTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Smooth-scroll to a section, preserving the language hash in the URL
  const jumpTo = useCallback((id: string) => {
    const el = document.getElementById(`sec-${id}`);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    // keep #lang=xx (don't clobber it with a section anchor)
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#lang=${lang}`);
    }
  }, [lang]);

  // Quick-jump nav items (icon + label), derived from current language
  const navItems = useMemo(() => [
    { id: "summary", icon: <User size={13} />, label: c.sections.summary },
    { id: "experience", icon: <Briefcase size={13} />, label: c.sections.experience },
    { id: "projects", icon: <FolderGit2 size={13} />, label: c.sections.projects },
    { id: "skills", icon: <Code2 size={13} />, label: c.sections.skills },
    { id: "education", icon: <GraduationCap size={13} />, label: c.sections.education },
    { id: "certificates", icon: <ScrollText size={13} />, label: c.sections.certificates },
    { id: "languages", icon: <LanguagesIcon size={13} />, label: c.sections.languages },
    { id: "interests", icon: <Heart size={13} />, label: c.sections.interests },
  ], [c]);

  return (
    <div className={`rv-app${dark ? " rv-dark" : ""}`}>
      {/* ───────── Reading progress bar (fixed top, screen only) ───────── */}
      <div className="rv-progress" aria-hidden="true">
        <div className="rv-progressFill" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* ───────── Toolbar (hidden in print) ───────── */}
      <div className="rv-toolbar" role="toolbar" aria-label="Resume controls">
        {/* Left: ATS badge + help */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
          <span className="rv-atsBadge" title={u.atsBadgeTitle}>
            <ShieldCheck size={12} /> {u.atsBadge}
          </span>
          <button
            type="button"
            className="rv-iconBtn rv-helpBtn"
            onClick={() => setShowHelp(true)}
            aria-label={u.keyboardHint}
            title={u.keyboardHint}
          >
            <HelpCircle size={15} />
          </button>
        </div>

        {/* Right: controls cluster */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {/* Dark mode toggle */}
          <button
            type="button"
            className="rv-iconBtn"
            onClick={() => setDark((v) => !v)}
            aria-label={dark ? u.lightMode : u.darkMode}
            title={dark ? u.lightMode : u.darkMode}
            aria-pressed={dark}
          >
            {dark ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* Copy plain text */}
          <button
            type="button"
            className="rv-iconBtn"
            onClick={handleCopyText}
            aria-label={copied ? u.copied : u.copyText}
            title={u.copyTextTitle}
            aria-pressed={copied}
            style={copied ? { borderColor: "var(--rv-accent)", color: "var(--rv-accent)" } : undefined}
          >
            {copied ? <ClipboardCheck size={15} /> : <Copy size={15} />}
          </button>

          {/* Download HTML */}
          <button
            type="button"
            className="rv-iconBtn"
            onClick={handleDownload}
            aria-label={u.download}
            title={u.downloadTitle}
          >
            <Download size={15} />
          </button>

          <span style={{ width: 1, height: 22, background: "var(--rv-line)", margin: "0 4px" }} />

          {/* Language dropdown */}
          <div ref={menuRef} style={{ position: "relative" }}>
            <button
              type="button"
              className="rv-langBtn"
              onClick={() => setMenuOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={menuOpen}
            >
              <Globe size={14} />
              <span>{activeLangLabel}</span>
              <ChevronDown
                size={14}
                style={{
                  transition: "transform .15s",
                  transform: menuOpen ? "rotate(180deg)" : "none",
                }}
              />
            </button>
            {menuOpen && (
              <ul
                role="listbox"
                className="rv-menu"
                style={{
                  position: "absolute",
                  top: "calc(100% + 6px)",
                  insetInlineEnd: 0,
                  minWidth: 150,
                  listStyle: "none",
                  margin: 0,
                  padding: 6,
                  background: "var(--rv-tint)",
                  border: "1px solid var(--rv-line)",
                  borderRadius: 10,
                  boxShadow: "0 16px 40px -16px rgba(15,23,42,.35)",
                  zIndex: 60,
                }}
              >
                {languages.map((l) => {
                  const isActive = l.code === lang;
                  return (
                    <li key={l.code} role="option" aria-selected={isActive}>
                      <button
                        type="button"
                        onClick={() => {
                          setLang(l.code);
                          setMenuOpen(false);
                        }}
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 8,
                          padding: "7px 10px",
                          border: "none",
                          background: isActive ? "var(--rv-accent-soft)" : "transparent",
                          borderRadius: 7,
                          cursor: "pointer",
                          fontSize: 12.5,
                          fontWeight: 600,
                          color: isActive ? "#115e59" : "var(--rv-ink)",
                          textAlign: c.dir === "rtl" ? "right" : "left",
                        }}
                      >
                        <span>{l.label}</span>
                        {isActive && <Check size={14} />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Print button */}
          <button
            type="button"
            className="rv-printBtn"
            onClick={handlePrint}
            aria-label={c.ui.print}
          >
            <Printer size={14} />
            <span>{c.ui.print}</span>
          </button>
        </div>
      </div>

      {/* ───────── Quick-jump section nav (screen only, hidden in print) ───────── */}
      <nav className="rv-quicknav" aria-label={u.quickJump}>
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`rv-quickpill${activeSection === item.id ? " rv-quickpill-active" : ""}`}
            onClick={() => jumpTo(item.id)}
            aria-current={activeSection === item.id ? "true" : undefined}
            title={item.label}
          >
            {item.icon}
            <span className="rv-quickpill-label">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* ───────── Resume document ───────── */}
      <article
        className="rv-doc"
        dir={c.dir}
        lang={lang}
        itemScope
        itemType="https://schema.org/Person"
      >
        <div className="rv-docInner">
          {/* Header */}
          <header className="rv-header">
            <div className="rv-headerText">
              <h1 className="rv-name" itemProp="name">
                {identity.name}
              </h1>
              <p className="rv-title" itemProp="jobTitle">
                {c.title}
              </p>
              <p className="rv-eyebrow">{c.eyebrow}</p>
              <div className="rv-contact">
                <a href={`mailto:${identity.email}`} itemProp="email">
                  <Mail size={13} /> {identity.email}
                </a>
                <a href={`tel:${identity.phoneHref}`} itemProp="telephone">
                  <Phone size={13} /> {identity.phone}
                </a>
                <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                  <MapPin size={13} /> <span itemProp="addressLocality">{identity.location}</span>
                </span>
                <a href={identity.linkedinHref} target="_blank" rel="noopener noreferrer" itemProp="sameAs">
                  <Linkedin size={13} /> {identity.linkedin}
                </a>
                <a href={identity.githubHref} target="_blank" rel="noopener noreferrer" itemProp="sameAs">
                  <Github size={13} /> {identity.github}
                </a>
              </div>
            </div>
          </header>

          {/* Summary (full width) */}
          <section id="sec-summary" aria-label={c.sections.summary} className="rv-section">
            <h2 className="rv-h">
              <User size={14} /> {c.sections.summary}
            </h2>
            <p className="rv-summary" dir={c.dir} itemProp="description">
              {c.summary}
            </p>
          </section>

          {/* Two-column body */}
          <div className="rv-grid">
            {/* Main column: Experience + Projects */}
            <div className="rv-main">
              {/* Experience */}
              <section id="sec-experience" aria-label={c.sections.experience} className="rv-section">
                <h2 className="rv-h">
                  <Briefcase size={14} /> {c.sections.experience}
                </h2>
                <div className="rv-expList">
                  {c.jobs.map((job, i) => (
                    <article className="rv-job" key={i}>
                      <div className="rv-jobHead">
                        <span className="rv-role">{job.role}</span>
                        <span className="rv-company">{job.company}</span>
                      </div>
                      <div className="rv-meta">
                        <span>
                          <MapPin size={11} className="rv-flip" style={{ verticalAlign: -1 }} />{" "}
                          {job.location}
                        </span>
                        <span>·</span>
                        <span>{job.period}</span>
                        <span className="rv-pill">{job.typeLabel}</span>
                        <span className="rv-pill">{job.modelLabel}</span>
                      </div>
                      <p className="rv-overview">{job.overview}</p>
                      <ul className="rv-bullets">
                        {job.achievements.map((a, j) => (
                          <li key={j}>{a}</li>
                        ))}
                      </ul>
                      <div className="rv-tech" aria-label={c.ui.techLabel}>
                        {job.tech.map((t) => (
                          <span className="rv-tag" key={t}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              {/* Projects */}
              <section id="sec-projects" aria-label={c.sections.projects} className="rv-section">
                <h2 className="rv-h">
                  <FolderGit2 size={14} /> {c.sections.projects}
                </h2>
                {c.projects.map((p, i) => (
                  <article className="rv-proj" key={i}>
                    <div className="rv-projName">{p.name}</div>
                    <div className="rv-projDesc">{p.description}</div>
                    <div className="rv-projTech">{p.tech}</div>
                  </article>
                ))}
              </section>
            </div>

            {/* Sidebar column */}
            <aside className="rv-side">
              {/* Skills */}
              <section id="sec-skills" aria-label={c.sections.skills} className="rv-section">
                <h2 className="rv-h">
                  <Code2 size={14} /> {c.sections.skills}
                </h2>
                {c.skills.map((g, i) => (
                  <div className="rv-skillGroup" key={i}>
                    <div className="rv-skillLabel">{g.label}</div>
                    <div className="rv-skillItems">
                      {g.items.map((s) => (
                        <span className="rv-skillItem" key={s}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </section>

              {/* Education */}
              <section id="sec-education" aria-label={c.sections.education} className="rv-section">
                <h2 className="rv-h">
                  <GraduationCap size={14} /> {c.sections.education}
                </h2>
                {c.education.map((e, i) => (
                  <article className="rv-edu" key={i}>
                    <div className="rv-eduDeg">{e.degree}</div>
                    <div className="rv-eduInst">{e.institution}</div>
                    <div className="rv-eduMeta">
                      {e.location} · {e.period}
                    </div>
                    <div className="rv-eduGrade">{e.grade}</div>
                    {e.thesis && (
                      <div className="rv-eduThesis">
                        {c.ui.thesis}: {e.thesis}
                      </div>
                    )}
                  </article>
                ))}
              </section>

              {/* Certificates */}
              <section id="sec-certificates" aria-label={c.sections.certificates} className="rv-section">
                <h2 className="rv-h">
                  <ScrollText size={14} /> {c.sections.certificates}
                </h2>
                {c.certificates.map((cert, i) => (
                  <div className="rv-cert" key={i}>
                    <div className="rv-certName">{cert.name}</div>
                    <div className="rv-certIssuer">{cert.issuer}</div>
                  </div>
                ))}
              </section>

              {/* Languages */}
              <section id="sec-languages" aria-label={c.sections.languages} className="rv-section">
                <h2 className="rv-h">
                  <LanguagesIcon size={14} /> {c.sections.languages}
                </h2>
                {c.languagesKnown.map((l, i) => (
                  <div className="rv-langRow" key={i}>
                    <span className="rv-langName">{l.name}</span>
                    <span className="rv-langLvl">{l.level}</span>
                  </div>
                ))}
              </section>

              {/* Interests */}
              <section id="sec-interests" aria-label={c.sections.interests} className="rv-section">
                <h2 className="rv-h">
                  <Heart size={14} /> {c.sections.interests}
                </h2>
                <div className="rv-interestList">
                  {c.interests.map((it) => (
                    <span className="rv-interest" key={it}>
                      {it}
                    </span>
                  ))}
                </div>
              </section>
            </aside>
          </div>

          {/* Print-only footer with name + contact (appears once at end) */}
          <div className="rv-printFooter" aria-hidden="true">
            <span className="rv-pfName">{identity.name}</span>
            <span>{identity.email} · {identity.phone}</span>
          </div>
        </div>
      </article>

      {/* Print-only running footer — repeats on every printed page with page numbers */}
      <div className="rv-printRunning" aria-hidden="true">
        <span className="rv-pfLeft">{identity.name}</span>
        <span className="rv-pfRight" />
      </div>

      {/* Keyboard hint footer (screen only) */}
      <div className="rv-hintBar" role="note" style={{ maxWidth: 820, justifyContent: "center", textAlign: "center" }}>
        <span><span className="rv-kbd">P</span> {u.keyboardHint.includes("چاپ") ? "چاپ" : u.keyboardHint.includes("drucken") ? "Druck" : "print"}</span>
        <span><span className="rv-kbd">D</span> {u.keyboardHint.includes("دانلود") ? "دانلود" : u.keyboardHint.includes("herunter") ? "Download" : "download"}</span>
        <span><span className="rv-kbd">C</span> {u.copyText}</span>
      </div>

      {/* Print overlay */}
      {printing && (
        <div className="rv-printOverlay" role="status" aria-live="polite">
          <span className="rv-spinner" />
          <span>{u.preparing}</span>
        </div>
      )}
    </div>
  );
}
