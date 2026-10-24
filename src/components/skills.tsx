import * as React from "react";
import type { ResumeContent } from "@/content";
import { Code2, Terminal } from "lucide-react";

interface SkillsProps {
  content: ResumeContent;
}

export function Skills({ content }: SkillsProps) {
  return (
    <section id="skills" className="py-12 border-b border-border/40 scroll-mt-20">
      <div className="flex items-center gap-2 mb-8">
        <span className="font-mono text-xs uppercase tracking-wider text-primary font-bold">
          [04]
        </span>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <Code2 className="w-5 h-5 text-primary" />
          <span>{content.sections.skills}</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {content.skills.map((group, idx) => (
          <div
            key={idx}
            className="p-4 rounded-lg bg-card border border-border/70 space-y-3"
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-3 rounded-full bg-primary" />
              <h3 className="font-mono text-xs uppercase font-bold tracking-wider text-foreground">
                {group.label}
              </h3>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="font-mono text-xs px-2 py-0.5 rounded-md bg-secondary/80 border border-border/50 text-foreground/80 hover:border-primary/50 hover:text-primary transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
