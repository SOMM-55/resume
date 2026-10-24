"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Sun, Moon, Printer, FileDown, Globe } from "lucide-react";
import { CommandPalette } from "./command-palette";
import type { ResumeContent } from "@/content";

interface NavbarProps {
  content: ResumeContent;
}

export function Navbar({ content }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handlePrint = () => {
    if (typeof window !== "undefined" && (window as unknown as { trackEvent?: (name: string, data?: unknown) => void }).trackEvent) {
      (window as unknown as { trackEvent: (name: string, data?: unknown) => void }).trackEvent("pdf_download", {
        target: `resume-${content.locale}.pdf`,
        source: "navbar_button",
      });
    }
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const otherLocale = content.locale === "en" ? "fa" : "en";
  const otherLocaleLabel = content.locale === "en" ? "فارسی" : "EN";

  return (
    <header className="no-print sticky top-0 z-40 w-full border-b border-border/50 bg-background/85 backdrop-blur-md">
      <a href="#main" className="skip-link">
        {content.ui.skipToContent}
      </a>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Brand / Name monogram */}
        <Link
          href={`/${content.locale}`}
          className="flex items-center gap-2 text-sm font-semibold tracking-tight hover:text-primary transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Available for relocation" />
          <span className="font-mono text-xs text-muted-foreground hidden sm:inline">somm.dev/</span>
          <span className="truncate">{content.locale === "fa" ? "سید امید موسوی‌مهر" : "Sayyid Omid M."}</span>
        </Link>

        {/* Section Navigation (desktop) */}
        <nav className="hidden md:flex items-center gap-5 text-xs text-muted-foreground">
          <a href="#about" className="hover:text-foreground transition-colors">
            {content.sections.about}
          </a>
          <a href="#experience" className="hover:text-foreground transition-colors">
            {content.sections.experience}
          </a>
          <a href="#projects" className="hover:text-foreground transition-colors">
            {content.sections.projects}
          </a>
          <a href="#skills" className="hover:text-foreground transition-colors">
            {content.sections.skills}
          </a>
          <a href="#education" className="hover:text-foreground transition-colors">
            {content.sections.education}
          </a>
          <a href="#contact" className="hover:text-foreground transition-colors">
            {content.sections.contact}
          </a>
        </nav>

        {/* Actions Cluster */}
        <div className="flex items-center gap-2">
          {/* Command Palette */}
          <CommandPalette content={content} />

          {/* Language Switcher */}
          <Link
            href={`/${otherLocale}`}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md border border-border/70 hover:border-primary/50 hover:bg-secondary/70 transition-all font-mono"
            title={`${content.ui.toggleLanguage} (${otherLocaleLabel})`}
          >
            <Globe className="w-3.5 h-3.5 text-muted-foreground" />
            <span>{otherLocaleLabel}</span>
          </Link>

          {/* Dark / Light Toggle */}
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-1.5 rounded-md border border-border/70 hover:border-primary/50 hover:bg-secondary/70 text-muted-foreground hover:text-foreground transition-all"
            aria-label={content.ui.toggleTheme}
            title={content.ui.toggleTheme}
          >
            {mounted && theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          {/* Download PDF / Print */}
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-xs"
            aria-label={content.ui.downloadPdf}
            title={content.ui.downloadPdf}
          >
            <FileDown className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{content.ui.downloadPdf}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
