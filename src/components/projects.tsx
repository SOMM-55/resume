import * as React from "react";
import type { ResumeContent, Project, Locale } from "@/content";
import { Github } from "lucide-react";
import { ProjectFilter, type FilterCategory } from "./project-filter";

interface ProjectsProps {
  projects?: Project[];
  sectionTitle?: string;
  locale?: Locale;
  ui?: {
    problem: string;
    approach: string;
    outcome: string;
  };
  content?: ResumeContent;
}

function getProjectCategory(p: Project): string {
  const cats: string[] = [];
  if (p.tech.includes("SDD") || p.name.includes("File-Sharing") || p.name.includes("Document Registration")) {
    cats.push("sdd");
  }
  if (p.tech.includes("gRPC") || p.tech.includes("PostgreSQL") || p.tech.includes("ETL") || p.tech.includes("Kafka")) {
    cats.push("data");
  }
  if (p.tech.includes("PHP") || p.tech.includes("MySQL") || p.tech.includes("Microservices")) {
    cats.push("systems");
  }
  return cats.length > 0 ? cats.join(" ") : "systems";
}

export function Projects({
  projects,
  sectionTitle,
  locale,
  ui,
  content,
}: ProjectsProps) {
  const projectList = projects ?? content?.projects ?? [];
  const title = sectionTitle ?? content?.sections.projects ?? "Projects";
  const loc = locale ?? content?.locale ?? "en";
  const uiLabels = ui ?? {
    problem: content?.ui.problem ?? "Problem",
    approach: content?.ui.approach ?? "Approach",
    outcome: content?.ui.outcome ?? "Outcome",
  };

  const flagship = projectList[0];
  const otherProjects = projectList.slice(1);

  const categories: Array<{ key: FilterCategory; label: string }> =
    loc === "fa"
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
        ];

  return (
    <section
      id="projects"
      data-active-filter="all"
      className="py-14 border-b border-border/50 scroll-mt-20 section-deferred"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
        <div>
          <div className="font-mono text-xs text-primary font-bold">
            sys://artifacts/case-studies
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            {title}
          </h2>
        </div>

        {/* Filter Pills */}
        <ProjectFilter categories={categories} defaultCategory="all" />
      </div>

      <div className="space-y-6">
        {/* Flagship Feature Card (Mechanized Document Registration) */}
        {flagship && (
          <article
            data-category="sdd"
            className="p-6 sm:p-7 rounded-xl bg-card border-2 border-primary/30 hover:border-primary/60 transition-all shadow-xs relative overflow-hidden space-y-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-primary/15 text-primary border border-primary/30 uppercase tracking-wider">
                    {loc === "fa" ? "سیستم شاخص // استاندارد SDD" : "FLAGSHIP SYSTEM // SDD BENCHMARK"}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {loc === "fa" ? "تحویل تجاری در ۱۰ روز" : "10-Day Commercial Delivery"}
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
                  {uiLabels.problem}
                </div>
                <p className="text-muted-foreground leading-relaxed">{flagship.problem}</p>
              </div>

              <div className="p-3.5 rounded-lg bg-secondary/30 border border-border/50 space-y-1">
                <div className="font-mono text-[10px] uppercase font-bold text-primary">
                  {uiLabels.approach}
                </div>
                <p className="text-foreground/90 leading-relaxed">{flagship.approach}</p>
              </div>

              <div className="p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                <div className="font-mono text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-400">
                  {uiLabels.outcome}
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
          {otherProjects.map((p, idx) => (
            <article
              key={idx}
              data-category={getProjectCategory(p)}
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
                      {uiLabels.approach}:
                    </span>
                    <span>{p.approach}</span>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] font-bold text-emerald-700 dark:text-emerald-400 block uppercase">
                      {uiLabels.outcome}:
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
