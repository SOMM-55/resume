import * as React from "react";
import type { ResumeContent } from "@/content";
import { GraduationCap, Award, ScrollText, Languages, Trophy } from "lucide-react";

interface EducationProps {
  content: ResumeContent;
}

export function Education({ content }: EducationProps) {
  return (
    <section id="education" className="py-12 border-b border-border/40 scroll-mt-20 section-deferred">
      <div className="flex items-center gap-2 mb-8">
        <span className="font-mono text-xs text-primary font-bold">
          sys://credentials/education
        </span>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-primary" />
          <span>{content.sections.education}</span>
        </h2>
      </div>

      <div className="space-y-8">
        {/* Degrees */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.education.map((edu, idx) => (
            <article
              key={idx}
              className="p-4 sm:p-5 rounded-lg bg-card border border-border/70 space-y-2"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <h3 className="text-sm sm:text-base font-bold text-foreground">
                  {edu.degree}
                </h3>
                <span className="font-mono text-xs text-muted-foreground">
                  {edu.period}
                </span>
              </div>

              <div className="text-xs sm:text-sm font-medium text-primary">
                {edu.institution} · {edu.location}
              </div>

              <div className="font-mono text-xs text-muted-foreground pt-1">
                {edu.grade}
              </div>

              {edu.thesis && (
                <div className="text-xs text-foreground/80 pt-1 italic">
                  <span className="font-semibold not-italic font-mono text-[11px] text-muted-foreground me-1">
                    {content.ui.thesis}:
                  </span>
                  {edu.thesis}
                </div>
              )}
            </article>
          ))}
        </div>

        {/* Award Highlight */}
        <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
          <Trophy className="w-5 h-5 text-amber-700 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-mono text-xs uppercase font-bold text-amber-800 dark:text-amber-300">
              {content.ui.awardLabel}
            </div>
            <div className="text-sm font-semibold text-foreground mt-0.5">
              {content.award}
            </div>
          </div>
        </div>

        {/* Certifications and Languages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Certifications */}
          <div className="p-4 rounded-lg bg-card border border-border/70 space-y-3">
            <h3 className="text-xs font-mono uppercase font-bold tracking-wider text-muted-foreground flex items-center gap-2">
              <ScrollText className="w-4 h-4 text-primary" />
              <span>{content.sections.certificates}</span>
            </h3>
            <ul className="space-y-2.5">
              {content.certificates.map((cert, idx) => (
                <li key={idx} className="text-xs">
                  <div className="font-medium text-foreground">{cert.name}</div>
                  <div className="font-mono text-[11px] text-muted-foreground mt-0.5">
                    {cert.issuer}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Languages & Interests */}
          <div className="p-4 rounded-lg bg-card border border-border/70 space-y-4">
            <div>
              <h3 className="text-xs font-mono uppercase font-bold tracking-wider text-muted-foreground flex items-center gap-2 mb-2">
                <Languages className="w-4 h-4 text-primary" />
                <span>{content.sections.languages}</span>
              </h3>
              <div className="space-y-1.5">
                {content.languagesKnown.map((lang, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-xs py-1 border-b border-border/40 last:border-0"
                  >
                    <span className="font-semibold text-foreground">{lang.name}</span>
                    <span className="font-mono text-muted-foreground">{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-border/40">
              <h4 className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-2">
                {content.sections.interests}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {content.interests.map((item, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
