"use client";

import * as React from "react";
import { Database, Cpu, Bot, ArrowRight, Zap, CheckCircle2, Layers } from "lucide-react";

interface DagNode {
  id: string;
  label: string;
  sublabel: string;
  protocol: string;
  latency: string;
  details: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NODES: DagNode[] = [
  {
    id: "ingestion",
    label: "Ingestion Stream",
    sublabel: "gRPC & HTTP Multimodal",
    protocol: "HTTP/2 + Protobuf",
    latency: "< 12ms p99",
    details: "High-throughput data acquisition layer ingesting unstructured documents and transactional events at hundreds-of-GB scale.",
    icon: Zap,
  },
  {
    id: "microkernel",
    label: "Delta Engine",
    sublabel: "Microkernel Pattern",
    protocol: "Plug-and-Play Pipelines",
    latency: "Hundreds of GBs/day",
    details: "Decoupled core processing runtime with swappable ETL/ELT plugins communicating over asynchronous gRPC channels.",
    icon: Cpu,
  },
  {
    id: "sdd",
    label: "Agentic Harness",
    sublabel: "Spec-Driven Development",
    protocol: "Zod + Markdown Specs",
    latency: "10-Day MVP Cycle",
    details: "Automated agent swarms implementing formal engineering specifications with end-to-end human verification gates.",
    icon: Bot,
  },
  {
    id: "storage",
    label: "Storage & Query",
    sublabel: "Partitioned Stores",
    protocol: "Postgres + Redis + OS",
    latency: "Indexed Aggregates",
    details: "Hybrid storage layer combining PostgreSQL relations, Redis caches, and OpenSearch inverted indexes for real-time reporting.",
    icon: Database,
  },
];

export function PipelineDag({ isRtl = false }: { isRtl?: boolean }) {
  const [selectedId, setSelectedId] = React.useState<string>("sdd");
  const activeNode = NODES.find((n) => n.id === selectedId) || NODES[0];

  return (
    <div className="rounded-xl border border-border/80 bg-card/60 backdrop-blur-sm p-4 sm:p-5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/50 pb-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-primary" />
          <span className="font-mono text-xs uppercase font-bold tracking-wider text-foreground">
            Architecture Topology // Live Pipeline DAG
          </span>
        </div>
        <span className="font-mono text-[11px] text-muted-foreground">
          Click any node to inspect system specifications
        </span>
      </div>

      {/* DAG Node Flow */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-3">
        {NODES.map((node, i) => {
          const Icon = node.icon;
          const isSelected = node.id === selectedId;

          return (
            <button
              key={node.id}
              type="button"
              onClick={() => setSelectedId(node.id)}
              className={`p-3 rounded-lg border text-start transition-all relative group ${
                isSelected
                  ? "border-primary bg-primary/10 shadow-xs glow-border"
                  : "border-border/60 bg-secondary/30 hover:border-border hover:bg-secondary/60"
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-2">
                <div
                  className={`w-7 h-7 rounded-md flex items-center justify-center ${
                    isSelected
                      ? "bg-primary text-primary-foreground font-bold"
                      : "bg-secondary text-primary"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="font-mono text-[10px] text-muted-foreground">
                  0{i + 1}
                </span>
              </div>

              <div className="font-bold text-xs text-foreground truncate">
                {node.label}
              </div>
              <div className="font-mono text-[10px] text-muted-foreground truncate mt-0.5">
                {node.sublabel}
              </div>

              {isSelected && (
                <span className="absolute -top-1 -end-1 w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
              )}
            </button>
          );
        })}
      </div>

      {/* Node Inspector Drawer */}
      <div className="p-3.5 rounded-lg bg-secondary/40 border border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="space-y-1 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="font-bold text-foreground">{activeNode.label}</span>
            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-primary/15 text-primary font-semibold">
              {activeNode.protocol}
            </span>
          </div>
          <p className="text-muted-foreground text-xs leading-relaxed">
            {activeNode.details}
          </p>
        </div>

        <div className="flex-shrink-0 text-start sm:text-end font-mono">
          <div className="text-[10px] uppercase text-muted-foreground">Operating Spec</div>
          <div className="text-primary font-bold">{activeNode.latency}</div>
        </div>
      </div>
    </div>
  );
}
