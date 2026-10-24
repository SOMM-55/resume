"use client";

import * as React from "react";
import type { ResumeContent } from "@/content";
import { FolderGit2, ExternalLink, Github, Zap, Shield, Sparkles, Filter } from "lucide-react";

interface ProjectsProps {
  content: ResumeContent;
}

type FilterCategory = "all" | "sdd" | "data" | "systems";

export function Projects({ content }: ProjectsProps) {
  const [filter, setFilter] = React.useState<FilterCategory>("all");

  const handleOutbound = (target: string) => {
    if (typeof window !== "undefined" && (window as unknown as { trackEvent?: (name: string, data?: unknown) => void }).trackEvent) {
      (window as unknown as { trackEvent: (name: string, data?: unknown) => void }).trackEvent("outbound_link", {
        target,
        source: "projects",
      });
    }
  };

  const flagship = content.projects[0]; // Mechanized Document Registration
  const otherProjects = content.projects.slice(1);

  const filteredOthers = otherProjects.filter((p) => {
    if (filter === "all") return true;
    if (filter === "sdd") return p.tech.includes("SDD") || p.name.includes("File-Sharing");
    if (filter === "data") return p.tech.includes("gRPC") || p.tech.includes("PostgreSQL");
    if (filter === "systems") return p.tech.includes("PHP") || p.tech.includes("MySQL");
    return true;
  });

  return (
    <section id="projects" className="py-14 border-b border-border/50 scroll-mt-20">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
        <div>
          <div className="font-mono text-xs text-primary font-bold">
            sys://artifacts/case-studies
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            {content.sections.projects}
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-secondary/50 border border-border text-xs font-mono">
          {(content.locale === "fa"
            ? [
                { key: "all", label: "همه" },
                { key: "sdd", label: "معماری SDD و ایجنت‌ها" },
                { key: "data", label: "داده و ETL" },
                { key: "systems", label: "سیستم‌های پایه" },
              ]
            : [
                { key: "all", label: "All" },
                { key: "sdd", label: "SDD & Agents" },
                { key: "data", label: "Data & ETL" },
                { key: "systems", label: "Core Systems" },
              ]
          ).map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setFilter(item.key as FilterCategory)}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                filter === item.key
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {/* Flagship Feature Card (Mechanized Document Registration) */}
        {(filter === "all" || filter === "sdd") && (
          <article className="p-6 sm:p-7 rounded-xl bg-card border-2 border-primary/30 hover:border-primary/60 transition-all shadow-xs relative overflow-hidden space-y-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-primary/15 text-primary border border-primary/30 uppercase tracking-wider">
                    {content.locale === "fa" ? "سیستم شاخص // استاندارد SDD" : "FLAGSHIP SYSTEM // SDD BENCHMARK"}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {content.locale === "fa" ? "تحویل تجاری در ۱۰ روز" : "10-Day Commercial Delivery"}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
                  {flagship.name}
                </h3>
                {flagship.tagline && (
                  <p className="text-xs sm:text-sm text-primary font-semibold">
                    {flagship.tagline}
                  </p>
                )}
              </div>

              {flagship.github && (
                <a
                  href={flagship.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleOutbound(flagship.github!)}
                  className="p-2 rounded-lg bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={`View ${flagship.name} repository on GitHub`}
                  title={`View ${flagship.name} on GitHub`}
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
            </div>

            {/* Architecture Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3.5 rounded-lg bg-secondary/30 border border-border/50 space-y-1">
                <div className="font-mono text-[10px] uppercase font-bold text-muted-foreground">
                  {content.ui.problem}
                </div>
                <p className="text-muted-foreground leading-relaxed">{flagship.problem}</p>
              </div>

              <div className="p-3.5 rounded-lg bg-secondary/30 border border-border/50 space-y-1">
                <div className="font-mono text-[10px] uppercase font-bold text-primary">
                  {content.ui.approach}
                </div>
                <p className="text-foreground/90 leading-relaxed">{flagship.approach}</p>
              </div>

              <div className="p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                <div className="font-mono text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-400">
                  {content.ui.outcome}
                </div>
                <p className="text-foreground font-semibold leading-relaxed">{flagship.outcome}</p>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/40 font-mono text-xs">
              {flagship.tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-0.5 rounded-md bg-secondary border border-border/70 text-foreground/80 font-medium text-[11px]"
                >
                  {t}
                </span>
              ))}
            </div>
          </article>
        )}

        {/* Secondary Systems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredOthers.map((p, idx) => (
            <article
              key={idx}
              className="p-5 rounded-xl bg-card border border-border/70 hover:border-primary/50 transition-colors flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-sm text-foreground">{p.name}</h3>
                    {p.tagline && (
                      <div className="text-[11px] text-primary font-medium mt-0.5">
                        {p.tagline}
                      </div>
                    )}
                  </div>

                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleOutbound(p.github!)}
                      className="p-1 rounded text-muted-foreground hover:text-foreground"
                      aria-label={`View ${p.name} repository on GitHub`}
                      title={`View ${p.name} on GitHub`}
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <div className="space-y-2 text-xs leading-relaxed text-muted-foreground">
                  <div>
                    <span className="font-mono text-[10px] font-bold text-primary block uppercase">
                      {content.ui.approach}:
                    </span>
                    <span>{p.approach}</span>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] font-bold text-emerald-700 dark:text-emerald-400 block uppercase">
                      {content.ui.outcome}:
                    </span>
                    <span className="text-foreground font-medium">{p.outcome}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 pt-2 border-t border-border/40 font-mono text-[10px]">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded bg-secondary text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
