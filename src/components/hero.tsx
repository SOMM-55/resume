"use client";

import * as React from "react";
import { Mail, Github, Linkedin, MapPin, ArrowDown, FileDown, CheckCircle2 } from "lucide-react";
import type { ResumeContent } from "@/content";

interface HeroProps {
  content: ResumeContent;
}

export function Hero({ content }: HeroProps) {
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
    <section className="pt-10 sm:pt-16 pb-12 sm:pb-16 border-b border-border/40">
      <div className="space-y-6">
        {/* Availability / Relocation Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>{content.relocation}</span>
        </div>

        {/* Monospace Eyebrow */}
        <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <span className="text-primary font-bold">●</span>
          <span>{content.locale === "fa" ? "۷+ سال سابقه · پایپ‌لاین‌های داده · سیستم‌های Agentic" : "7+ YRS · DATA PIPELINES · AGENTIC SYSTEMS · SPEC-DRIVEN DEVELOPMENT"}</span>
        </div>

        {/* Main Name & Headline */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
            {content.name}
          </h1>
          <p className="text-xl sm:text-2xl font-medium text-primary tracking-tight">
            {content.headline}
          </p>
        </div>

        {/* Supporting Subheadline */}
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
          {content.subheadline}
        </p>

        {/* Quick Data Metrics (Monospace Badges) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 font-mono text-xs">
          <div className="p-3 rounded-lg bg-secondary/50 border border-border/60">
            <div className="text-lg sm:text-xl font-bold text-foreground">7+</div>
            <div className="text-muted-foreground text-[11px] mt-0.5">Years In Data Eng.</div>
          </div>
          <div className="p-3 rounded-lg bg-secondary/50 border border-border/60">
            <div className="text-lg sm:text-xl font-bold text-foreground">10d</div>
            <div className="text-muted-foreground text-[11px] mt-0.5">SDD MVP Delivery</div>
          </div>
          <div className="p-3 rounded-lg bg-secondary/50 border border-border/60">
            <div className="text-lg sm:text-xl font-bold text-foreground">100s GB</div>
            <div className="text-muted-foreground text-[11px] mt-0.5">ETL Pipelines Scale</div>
          </div>
          <div className="p-3 rounded-lg bg-secondary/50 border border-border/60">
            <div className="text-lg sm:text-xl font-bold text-foreground">80+</div>
            <div className="text-muted-foreground text-[11px] mt-0.5">Daily ERP Users</div>
          </div>
        </div>

        {/* Actions & Contact Links */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-xs"
          >
            <Mail className="w-4 h-4" />
            <span>{content.ui.contactCta}</span>
          </a>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-md border border-border/80 hover:bg-secondary/70 transition-all"
          >
            <FileDown className="w-4 h-4 text-primary" />
            <span>{content.ui.downloadPdf}</span>
          </button>

          <a
            href={content.contact.githubHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleOutbound(content.contact.githubHref)}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-mono text-muted-foreground hover:text-foreground rounded-md hover:bg-secondary/50 transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>

          <a
            href={content.contact.linkedinHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleOutbound(content.contact.linkedinHref)}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-mono text-muted-foreground hover:text-foreground rounded-md hover:bg-secondary/50 transition-colors"
          >
            <Linkedin className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>

          <span className="hidden sm:inline-flex items-center gap-1 text-xs text-muted-foreground font-mono ms-auto">
            <MapPin className="w-3.5 h-3.5" />
            <span>{content.contact.location}</span>
          </span>
        </div>
      </div>
    </section>
  );
}
