import * as React from "react";
import type { ResumeContent } from "@/content";
import { Code2, Cpu, Database, Server, Workflow, Terminal } from "lucide-react";

interface SkillsProps {
  content: ResumeContent;
}

const CATEGORY_META: Record<string, { badge: string; icon: React.ComponentType<{ className?: string }> }> = {
  // English labels
  "Data Engineering": { badge: "CORE DOMAIN // ETL & STREAMING", icon: Database },
  "AI-Agent Engineering": { badge: "AGENTIC // SDD HARNESSES", icon: Cpu },
  "Programming Languages": { badge: "RUNTIMES & TYPES", icon: Terminal },
  "Frameworks & Libraries": { badge: "BACKEND & FRONTEND", icon: Server },
  "DevOps & Infrastructure": { badge: "OPERATIONS & CONTAINERIZATION", icon: Server },
  "Architecture & Methodologies": { badge: "DESIGN PATTERNS", icon: Workflow },

  // Persian labels
  "مهندسی داده": { badge: "دامنه اصلی // پردازش داده و استریم", icon: Database },
  "مهندسی ایجنت‌های هوش مصنوعی": { badge: "سیستم‌های ایجنت // هارنس SDD", icon: Cpu },
  "زبان‌های برنامه‌نویسی": { badge: "محیط‌های اجرا و تایپ‌ها", icon: Terminal },
  "فریم‌ورک‌ها و کتابخانه‌ها": { badge: "بک‌اند و فرانت‌اند", icon: Server },
  "DevOps و زیرساخت": { badge: "عملیات و کانتینرسازی", icon: Server },
  "معماری و متدولوژی‌ها": { badge: "الگوهای معماری نرم‌افزار", icon: Workflow },
};

const INDEX_META = [
  { badgeEn: "CORE DOMAIN // ETL & STREAMING", badgeFa: "دامنه اصلی // پردازش داده و استریم", icon: Database },
  { badgeEn: "AGENTIC // SDD HARNESSES", badgeFa: "سیستم‌های ایجنت // هارنس SDD", icon: Cpu },
  { badgeEn: "RUNTIMES & TYPES", badgeFa: "محیط‌های اجرا و تایپ‌ها", icon: Terminal },
  { badgeEn: "BACKEND & FRONTEND", badgeFa: "بک‌اند و فرانت‌اند", icon: Server },
  { badgeEn: "OPERATIONS & CONTAINERIZATION", badgeFa: "عملیات و کانتینرسازی", icon: Server },
  { badgeEn: "DESIGN PATTERNS", badgeFa: "الگوهای معماری نرم‌افزار", icon: Workflow },
];

export function Skills({ content }: SkillsProps) {
  const isFa = content.locale === "fa";

  return (
    <section id="skills" className="py-14 border-b border-border/50 scroll-mt-20 section-deferred">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-8">
        <div>
          <div className="font-mono text-xs text-primary font-bold">
            sys://stack/capability-matrix
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            {content.sections.skills}
          </h2>
        </div>
        <div className="font-mono text-[11px] text-muted-foreground">
          {isFa
            ? "مهارت‌های فنی تخصصی و ابزارهای مورد استفاده در محیط پروداکشن"
            : "Categorized technical competency & production tools"}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {content.skills.map((group, idx) => {
          const fallback = INDEX_META[idx % INDEX_META.length];
          const meta = CATEGORY_META[group.label] || {
            badge: isFa ? fallback.badgeFa : fallback.badgeEn,
            icon: fallback.icon || Code2,
          };
          const Icon = meta.icon;

          return (
            <div
              key={idx}
              className="p-5 rounded-xl bg-card border border-border/70 space-y-3 hover:border-primary/50 transition-colors"
            >
              <div className="space-y-1">
                <div className="font-mono text-[10px] text-primary font-semibold tracking-wider">
                  {meta.badge}
                </div>
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-primary" />
                  <h3 className="font-bold text-sm text-foreground">
                    {group.label}
                  </h3>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {group.items.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-secondary text-foreground/90 font-mono hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
