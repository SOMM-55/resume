"use client";

import * as React from "react";
import { Mail, Github, Linkedin, MapPin, FileDown, Terminal, Clock, ShieldCheck } from "lucide-react";
import { PipelineDag } from "./pipeline-dag";
import type { ResumeContent } from "@/content";

interface HeroProps {
  content: ResumeContent;
}

export function Hero({ content }: HeroProps) {
  const isRtl = content.dir === "rtl";

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
    <section className="hero-ambient-glow pt-8 sm:pt-14 pb-12 sm:pb-16 border-b border-border/50 space-y-8">
      {/* Top Status HUD Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        {/* Availability Beacon */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold">{content.relocation}</span>
        </div>

        {/* Timezone / Latency indicator */}
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Clock className="w-3.5 h-3.5 text-primary" />
          <span>Mashhad (UTC+3:30) · High overlap with CET/EU</span>
        </div>
      </div>

      {/* Hero Typography */}
      <div className="space-y-4 max-w-3xl">
        <div className="font-mono text-xs uppercase tracking-wider text-primary font-bold flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5" />
          <span>sys://profile/sayyid-omid · Senior Data Engineer & Agentic Systems</span>
        </div>

        <h1 className="text-3xl sm:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
          {content.name}
        </h1>

        <p className="text-lg sm:text-2xl font-semibold text-primary tracking-tight">
          {content.headline}
        </p>

        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          {content.subheadline}
        </p>
      </div>

      {/* Integrated Telemetry HUD (Replacing Generic Stat Boxes) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 p-4 rounded-xl bg-card/70 border border-border/70 backdrop-blur-xs font-mono text-xs">
        <div className="space-y-1">
          <div className="text-[10px] uppercase text-muted-foreground tracking-wider">
            [DATA_SCALE]
          </div>
          <div className="text-base sm:text-lg font-bold text-foreground">Hundreds of GBs</div>
          <div className="text-[11px] text-muted-foreground">ETL / Reporting Pipelines</div>
        </div>

        <div className="space-y-1">
          <div className="text-[10px] uppercase text-muted-foreground tracking-wider">
            [CYCLE_VELOCITY]
          </div>
          <div className="text-base sm:text-lg font-bold text-primary">10-Day MVP</div>
          <div className="text-[11px] text-muted-foreground">Spec-Driven Architecture</div>
        </div>

        <div className="space-y-1">
          <div className="text-[10px] uppercase text-muted-foreground tracking-wider">
            [ENTERPRISE_ADOPTION]
          </div>
          <div className="text-base sm:text-lg font-bold text-foreground">80+ Daily Staff</div>
          <div className="text-[11px] text-muted-foreground">8+ Yrs Operational ERP</div>
        </div>

        <div className="space-y-1">
          <div className="text-[10px] uppercase text-muted-foreground tracking-wider">
            [ENGINEERING_TENURE]
          </div>
          <div className="text-base sm:text-lg font-bold text-foreground">7+ Years</div>
          <div className="text-[11px] text-muted-foreground">Full-Stack & Architecture</div>
        </div>
      </div>

      {/* Action Buttons & Outbound Channels */}
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

      {/* Interactive Architecture DAG Visualizer */}
      <PipelineDag isRtl={isRtl} />
    </section>
  );
}
