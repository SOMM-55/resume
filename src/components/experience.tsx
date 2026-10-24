import * as React from "react";
import type { ResumeContent } from "@/content";
import { Briefcase, MapPin, Calendar, CheckCircle2 } from "lucide-react";

interface ExperienceProps {
  content: ResumeContent;
}

export function Experience({ content }: ExperienceProps) {
  return (
    <section id="experience" className="py-12 border-b border-border/40 scroll-mt-20">
      <div className="flex items-center gap-2 mb-8">
        <span className="font-mono text-xs uppercase tracking-wider text-primary font-bold">
          [02]
        </span>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-primary" />
          <span>{content.sections.experience}</span>
        </h2>
      </div>

      <div className="pipeline-rail space-y-10 ps-7">
        {content.jobs.map((job, idx) => (
          <article key={idx} className="relative group">
            {/* Timeline node marker */}
            <span
              className="absolute -start-7 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-primary bg-background ring-4 ring-background transition-colors group-hover:bg-primary"
              aria-hidden="true"
            />

            <div className="space-y-3">
              {/* Header: Role, Company, Period, Badges */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-foreground">
                    {job.role}
                  </h3>
                  <div className="text-sm font-semibold text-primary">
                    {job.company}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{job.period}</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{job.location}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-secondary text-[11px] font-sans">
                    {job.typeLabel}
                  </span>
                </div>
              </div>

              {/* Role Overview */}
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {job.overview}
              </p>

              {/* Key Achievements */}
              <ul className="space-y-2 text-xs sm:text-sm text-foreground/90">
                {job.achievements.map((item, aIdx) => (
                  <li key={aIdx} className="flex items-start gap-2">
                    <span className="text-primary mt-1 flex-shrink-0 text-xs">▹</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {job.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[11px] px-2 py-0.5 rounded-md bg-secondary/70 border border-border/60 text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
