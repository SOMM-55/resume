"use client";

import * as React from "react";
import dynamic from "next/dynamic";

const PipelineDag = dynamic(
  () => import("./pipeline-dag").then((mod) => mod.PipelineDag),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-44 rounded-xl bg-card/40 border border-border/50 animate-pulse flex items-center justify-center text-xs text-muted-foreground font-mono">
        <span className="inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
          Initializing architecture pipeline...
        </span>
      </div>
    ),
  }
);

interface PipelineDagWrapperProps {
  isRtl: boolean;
}

export function PipelineDagWrapper({ isRtl }: PipelineDagWrapperProps) {
  return (
    <div className="pipeline-dag-container no-print">
      <PipelineDag isRtl={isRtl} />
    </div>
  );
}
