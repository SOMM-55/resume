"use client";

import * as React from "react";
import type { ResumeContent } from "@/content";
import { FolderGit2, ExternalLink, Github } from "lucide-react";

interface ProjectsProps {
  content: ResumeContent;
}

export function Projects({ content }: ProjectsProps) {
  const handleOutbound = (target: string) => {
    if (typeof window !== "undefined" && (window as unknown as { trackEvent?: (name: string, data?: unknown) => void }).trackEvent) {
      (window as unknown as { trackEvent: (name: string, data?: unknown) => void }).trackEvent("outbound_link", {
        target,
        source: "projects",
      });
    }
  };

  return (
    <section id="projects" className="py-12 border-b border-border/40 scroll-mt-20">
      <div className="flex items-center gap-2 mb-8">
        <span className="font-mono text-xs uppercase tracking-wider text-primary font-bold">
          [03]
        </span>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <FolderGit2 className="w-5 h-5 text-primary" />
          <span>{content.sections.projects}</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {content.projects.map((p, idx) => (
          <article
            key={idx}
            className="flex flex-col justify-between p-4 sm:p-5 rounded-lg bg-card border border-border/70 hover:border-primary/50 transition-colors space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-foreground">
                    {p.name}
                  </h3>
                  {p.tagline && (
                    <div className="text-xs text-primary font-medium mt-0.5">
                      {p.tagline}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleOutbound(p.github!)}
                      className="p-1 rounded text-muted-foreground hover:text-foreground transition-colors"
                      title={content.ui.viewOnGithub}
                      aria-label={`${p.name} on GitHub`}
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleOutbound(p.link!)}
                      className="p-1 rounded text-muted-foreground hover:text-foreground transition-colors"
                      title={content.ui.viewLive}
                      aria-label={`${p.name} live`}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Problem → Approach → Outcome format */}
              <div className="space-y-2 text-xs leading-relaxed">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-[10px] uppercase font-bold text-muted-foreground flex-shrink-0 w-16">
                    {content.ui.problem}:
                  </span>
                  <span className="text-muted-foreground">{p.problem}</span>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-[10px] uppercase font-bold text-primary flex-shrink-0 w-16">
                    {content.ui.approach}:
                  </span>
                  <span className="text-foreground/90">{p.approach}</span>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 flex-shrink-0 w-16">
                    {content.ui.outcome}:
                  </span>
                  <span className="text-foreground/90 font-medium">{p.outcome}</span>
                </div>
              </div>
            </div>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-1 pt-2 border-t border-border/40">
              {p.tech.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[10px] px-2 py-0.5 rounded bg-secondary/80 text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
