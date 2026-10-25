import * as React from "react";
import Link from "next/link";
import { Globe } from "lucide-react";
import type { ResumeContent } from "@/content";
import { CommandPalette } from "./command-palette";
import { ThemeToggle } from "./theme-toggle";
import { PdfDownloadButton } from "./pdf-download-button";

interface NavbarProps {
  content: ResumeContent;
}

export function Navbar({ content }: NavbarProps) {
  const otherLocale = content.locale === "en" ? "fa" : "en";
  const otherLocaleLabel = content.locale === "en" ? "فارسی" : "EN";

  const commandPaletteData = {
    locale: content.locale,
    sections: content.sections,
    ui: {
      commandPaletteHint: content.ui.commandPaletteHint,
      printResume: content.ui.printResume,
      downloadPdf: content.ui.downloadPdf,
      toggleTheme: content.ui.toggleTheme,
    },
    contact: {
      githubHref: content.contact.githubHref,
      linkedinHref: content.contact.linkedinHref,
      email: content.contact.email,
    },
  };

  return (
    <header className="no-print sticky top-0 z-40 w-full border-b border-border/50 bg-background/85 backdrop-blur-md">
      <a href="#main" className="skip-link">
        {content.ui.skipToContent}
      </a>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Brand / Name monogram */}
        <Link
          href={`/${content.locale}`}
          prefetch={false}
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
          <CommandPalette content={commandPaletteData} />

          {/* Language Switcher */}
          <Link
            href={`/${otherLocale}`}
            prefetch={false}
            className="inline-flex items-center justify-center gap-1 px-2.5 py-1.5 sm:py-1 min-h-[44px] sm:min-h-0 text-xs font-medium rounded-md border border-border/70 hover:border-primary/50 hover:bg-secondary/70 transition-all font-mono"
            title={`${content.ui.toggleLanguage} (${otherLocaleLabel})`}
          >
            <Globe className="w-3.5 h-3.5 text-muted-foreground" />
            <span>{otherLocaleLabel}</span>
          </Link>

          {/* Dark / Light Toggle */}
          <ThemeToggle label={content.ui.toggleTheme} />

          {/* Download PDF / Print */}
          <PdfDownloadButton label={content.ui.downloadPdf} locale={content.locale} />
        </div>
      </div>
    </header>
  );
}
