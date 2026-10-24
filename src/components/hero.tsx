import * as React from "react";
import dynamic from "next/dynamic";
import { Terminal, Clock } from "lucide-react";
import { HeroActions } from "./hero-actions";
import type { ResumeContent } from "@/content";

const PipelineDag = dynamic(
  () => import("./pipeline-dag").then((mod) => mod.PipelineDag)
);

interface HeroProps {
  content: ResumeContent;
}

export function Hero({ content }: HeroProps) {
  const isRtl = content.dir === "rtl";

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
      <HeroActions content={content} />

      {/* Interactive Architecture DAG Visualizer */}
      <PipelineDag isRtl={isRtl} />
    </section>
  );
}
