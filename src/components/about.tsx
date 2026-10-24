"use client";

import * as React from "react";
import type { ResumeContent } from "@/content";
import { Terminal, CheckCircle2, ShieldCheck, Cpu } from "lucide-react";

interface AboutProps {
  content: ResumeContent;
}

export function About({ content }: AboutProps) {
  const [activeTab, setActiveTab] = React.useState<"sdd" | "delta" | "clean">("sdd");

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
        <div className="lg:col-span-5 rounded-xl border border-border/80 bg-card overflow-hidden shadow-xs">
          {/* Terminal Titlebar */}
          <div className="terminal-header px-4 py-2.5 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
              <span className="ms-2 text-muted-foreground text-[11px]">architecture.kernel</span>
            </div>
            <span className="text-[10px] text-primary font-semibold">v2.4-stable</span>
          </div>

          {/* Terminal Tabs */}
          <div className="flex border-b border-border/50 bg-secondary/30 text-[11px] font-mono">
            {[
              { key: "sdd", label: "01. Spec Harness" },
              { key: "delta", label: "02. Delta Engine" },
              { key: "clean", label: "03. Clean Arch" },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex-1 py-2 px-2 text-center transition-colors ${
                  activeTab === tab.key
                    ? "bg-card text-primary font-bold border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Terminal Body */}
          <div className="p-4 font-mono text-xs space-y-3 bg-card/90">
            {activeTab === "sdd" && (
              <div className="space-y-2">
                <div className="text-muted-foreground text-[11px]">
                  # Spec-Driven Development (SDD) Workflow
                </div>
                <div className="p-2.5 rounded bg-secondary/50 text-[11px] space-y-1 text-foreground/90">
                  <div className="text-emerald-500">$ spec-harness init --strict</div>
                  <div>1. Formal technical specification authoring</div>
                  <div>2. Multi-agent implementation swarm</div>
                  <div>3. Usability & security pre-release audits</div>
                  <div className="text-primary">Result: 10d commercial MVP launch</div>
                </div>
              </div>
            )}

            {activeTab === "delta" && (
              <div className="space-y-2">
                <div className="text-muted-foreground text-[11px]">
                  # Delta Microkernel Data Processing Engine
                </div>
                <div className="p-2.5 rounded bg-secondary/50 text-[11px] space-y-1 text-foreground/90">
                  <div className="text-emerald-500">$ delta-kernel --protocol=grpc</div>
                  <div>- Core: Lightweight acquisition & stream router</div>
                  <div>- Plugins: Dynamic parsers, aggregators, sinks</div>
                  <div>- Protocols: Asynchronous gRPC + HTTP/2</div>
                  <div className="text-primary">Scale: Hundreds of GBs reporting</div>
                </div>
              </div>
            )}

            {activeTab === "clean" && (
              <div className="space-y-2">
                <div className="text-muted-foreground text-[11px]">
                  # Domain Decoupling & Enterprise Reliability
                </div>
                <div className="p-2.5 rounded bg-secondary/50 text-[11px] space-y-1 text-foreground/90">
                  <div className="text-emerald-500">$ verify-arch --pattern=ports-adapters</div>
                  <div>- Isolated domain logic from DB/framework layers</div>
                  <div>- Granular RBAC (80+ permission groups)</div>
                  <div>- Comprehensive TDD coverage</div>
                  <div className="text-primary">Adoption: 80+ daily users across 8+ yrs</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
