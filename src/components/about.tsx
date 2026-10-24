import * as React from "react";
import type { ResumeContent } from "@/content";
import { User, Terminal } from "lucide-react";

interface AboutProps {
  content: ResumeContent;
}

export function About({ content }: AboutProps) {
  return (
    <section id="about" className="py-12 border-b border-border/40 scroll-mt-20">
      <div className="flex items-center gap-2 mb-6">
        <span className="font-mono text-xs uppercase tracking-wider text-primary font-bold">
          [01]
        </span>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <User className="w-5 h-5 text-primary" />
          <span>{content.sections.about}</span>
        </h2>
      </div>

      <div className="space-y-4">
        <div className="relative ps-4 border-s-2 border-primary/70">
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {content.about}
          </p>
        </div>

        {/* Engineering Philosophy / Architecture Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 text-xs">
          <div className="p-3.5 rounded-lg bg-card border border-border/70 space-y-1">
            <div className="font-mono font-semibold text-primary">
              [SPEC-DRIVEN]
            </div>
            <div className="font-medium text-foreground">Harness Engineering</div>
            <div className="text-muted-foreground leading-normal">
              Writing formal specifications; delegating implementation to agent swarms with human-in-the-loop verification.
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-card border border-border/70 space-y-1">
            <div className="font-mono font-semibold text-primary">
              [PIPELINES]
            </div>
            <div className="font-medium text-foreground">Microkernel & gRPC</div>
            <div className="text-muted-foreground leading-normal">
              High-throughput data ingestion, transformation, and aggregate reporting at hundreds-of-GB scale.
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-card border border-border/70 space-y-1">
            <div className="font-mono font-semibold text-primary">
              [SYSTEMS]
            </div>
            <div className="font-medium text-foreground">Clean Architecture</div>
            <div className="text-muted-foreground leading-normal">
              Decoupled domain boundaries, robust RBAC, test-driven validation, and resilient operational pipelines.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
