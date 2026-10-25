import * as React from "react";
import type { ResumeContent } from "@/content";
import { Briefcase, MapPin, Calendar, CheckCircle2, Terminal } from "lucide-react";

interface ExperienceProps {
  content: ResumeContent;
}

const ROLE_STATUS_TAGS: Record<number, { label: string; color: string }> = {
  0: { label: "ACTIVE PRODUCTION // SDD", color: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30" },
  1: { label: "HUNDREDS-OF-GB PIPELINES", color: "bg-primary/10 text-primary border-primary/30" },
  2: { label: "8+ YRS PRODUCTION ADOPTION", color: "bg-secondary text-muted-foreground border-border/80" },
};

export function Experience({ content }: ExperienceProps) {
  return (
    <section id="experience" className="py-14 border-b border-border/50 scroll-mt-20 section-deferred">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-10">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-primary font-bold">
            sys://experience/trace
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            {content.sections.experience}
          </h2>
        </div>
        <div className="font-mono text-[11px] text-muted-foreground">
          Reverse chronological career execution log
        </div>
      </div>

      <div className="pipeline-track space-y-12 ps-7 sm:ps-8">
        {content.jobs.map((job, idx) => {
          const statusTag = ROLE_STATUS_TAGS[idx] || {
            label: "VERIFIED DEPLOYMENT",
            color: "bg-secondary text-muted-foreground border-border/80",
          };

          return (
            <article key={idx} className="relative group space-y-4">
              {/* Timeline Node Marker */}
              <span
                className="absolute -start-7 sm:-start-8 top-1.5 w-4 h-4 rounded-full border-2 border-primary bg-background ring-4 ring-background transition-colors group-hover:bg-primary group-hover:glow-primary"
                aria-hidden="true"
              />

              {/* Job Header */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-foreground">
                      {job.role}
                    </h3>
                    <span className="text-primary font-bold">@ {job.company}</span>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono border font-semibold ${statusTag.color}`}>
                    {statusTag.label}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    <span>{job.period}</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{job.location}</span>
                  </span>
                  <span>·</span>
                  <span className="px-2 py-0.2 rounded bg-secondary font-sans text-[11px]">
                    {job.typeLabel} ({job.modelLabel})
                  </span>
                </div>
              </div>

              {/* Role Overview */}
              <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed bg-secondary/20 p-3 rounded-lg border border-border/40">
                {job.overview}
              </p>

              {/* Achievements with Data Context */}
              <ul className="space-y-2 text-xs sm:text-sm text-foreground/90">
                {job.achievements.map((item, aIdx) => (
                  <li key={aIdx} className="flex items-start gap-2.5">
                    <span className="text-primary font-mono text-xs mt-0.5 flex-shrink-0">▹</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Technology Stack Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {job.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[11px] px-2.5 py-0.5 rounded-md bg-secondary/80 border border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
