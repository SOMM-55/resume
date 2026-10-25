import * as React from "react";
import { PipelineDag } from "./pipeline-dag";

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
