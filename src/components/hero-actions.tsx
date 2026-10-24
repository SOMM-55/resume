"use client";

import * as React from "react";
import { Mail, Github, Linkedin, MapPin, FileDown } from "lucide-react";
import type { ResumeContent } from "@/content";

interface HeroActionsProps {
  content: ResumeContent;
}

export function HeroActions({ content }: HeroActionsProps) {
  const handlePrint = () => {
    if (typeof window !== "undefined" && (window as unknown as { trackEvent?: (name: string, data?: unknown) => void }).trackEvent) {
      (window as unknown as { trackEvent: (name: string, data?: unknown) => void }).trackEvent("pdf_download", {
        target: `resume-${content.locale}.pdf`,
        source: "hero_cta",
      });
    }
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const handleOutbound = (target: string) => {
    if (typeof window !== "undefined" && (window as unknown as { trackEvent?: (name: string, data?: unknown) => void }).trackEvent) {
      (window as unknown as { trackEvent: (name: string, data?: unknown) => void }).trackEvent("outbound_link", {
        target,
        source: "hero",
      });
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3 pt-1">
      <a
        href="#contact"
        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-xs glow-primary"
      >
        <Mail className="w-4 h-4" />
        <span>{content.ui.contactCta}</span>
      </a>

      <button
        type="button"
        onClick={handlePrint}
        className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-md border border-border/80 hover:bg-secondary/70 transition-all font-mono text-xs"
      >
        <FileDown className="w-4 h-4 text-primary" />
        <span>{content.ui.downloadPdf}</span>
      </button>

      <a
        href={content.contact.githubHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => handleOutbound(content.contact.githubHref)}
        className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-muted-foreground hover:text-foreground rounded-md hover:bg-secondary/50 transition-colors"
      >
        <Github className="w-4 h-4" />
        <span>github.com/SOMM-55</span>
      </a>

      <a
        href={content.contact.linkedinHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => handleOutbound(content.contact.linkedinHref)}
        className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-muted-foreground hover:text-foreground rounded-md hover:bg-secondary/50 transition-colors"
      >
        <Linkedin className="w-4 h-4" />
        <span>linkedin.com/in/sommehr</span>
      </a>

      <span className="hidden sm:inline-flex items-center gap-1 text-xs text-muted-foreground font-mono ms-auto">
        <MapPin className="w-3.5 h-3.5 text-primary" />
        <span>{content.contact.location}</span>
      </span>
    </div>
  );
}
