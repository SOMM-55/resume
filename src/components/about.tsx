import * as React from "react";
import type { ResumeContent } from "@/content";
import { ArchitectureTerminal } from "./architecture-terminal";

interface AboutProps {
  content: ResumeContent;
}

export function About({ content }: AboutProps) {
  return (
    <section id="about" className="py-14 border-b border-border/50 scroll-mt-20">
      <div className="flex items-center gap-2 mb-8">
        <span className="font-mono text-xs text-primary font-bold">
          sys://dossier/about
        </span>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          {content.sections.about}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Authoritative Executive Statement */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-xl bg-card/60 border border-border/70 backdrop-blur-xs relative overflow-hidden">
            <div className="absolute top-0 inset-inline-start-0 w-1.5 h-full bg-primary" />
            <p className="text-sm sm:text-base text-foreground/90 leading-relaxed ps-2">
              {content.about}
            </p>
          </div>

          {/* Core Strengths Callouts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono text-xs">
            <div className="p-3.5 rounded-lg bg-secondary/30 border border-border/50 space-y-1">
              <div className="text-primary font-bold">● High-Throughput ETL/ELT</div>
              <div className="text-muted-foreground text-[11px] leading-normal font-sans">
                Designing modular microkernel engines handling hundreds of gigabytes across database and backend layers.
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-secondary/30 border border-border/50 space-y-1">
              <div className="text-primary font-bold">● Spec-Driven Agentic Swarms</div>
              <div className="text-muted-foreground text-[11px] leading-normal font-sans">
                Authoring rigorous technical specifications and delegating implementation to agent harnesses with human verification.
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive System Architecture Terminal */}
        <ArchitectureTerminal />
      </div>
    </section>
  );
}
