"use client";

import * as React from "react";
import { Database, Cpu, Bot, Zap, Layers, ArrowRight, ArrowLeft } from "lucide-react";

interface DagNode {
  id: string;
  labelEn: string;
  labelFa: string;
  sublabelEn: string;
  sublabelFa: string;
  protocolEn: string;
  protocolFa: string;
  latencyEn: string;
  latencyFa: string;
  detailsEn: string;
  detailsFa: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NODES: DagNode[] = [
  {
    id: "ingestion",
    labelEn: "Ingestion Stream",
    labelFa: "جریان ورودی داده",
    sublabelEn: "gRPC & HTTP Multimodal",
    sublabelFa: "gRPC و HTTP مالتی‌مدال",
    protocolEn: "HTTP/2 + Protobuf",
    protocolFa: "HTTP/2 + Protobuf",
    latencyEn: "< 12ms p99",
    latencyFa: "< 12ms p99",
    detailsEn: "High-throughput data acquisition layer ingesting unstructured documents and transactional events at hundreds-of-GB scale.",
    detailsFa: "لایه دریافت پرسرعت داده برای اسناد و تراکنش‌های مقیاس صدها گیگابایت با تضمین یکپارچگی داده.",
    icon: Zap,
  },
  {
    id: "microkernel",
    labelEn: "Delta Engine",
    labelFa: "میکروکرنل دلتا",
    sublabelEn: "Microkernel Pattern",
    sublabelFa: "الگوی میکروکرنل ماژولار",
    protocolEn: "Plug-and-Play Pipelines",
    protocolFa: "پایپ‌لاین‌های ماژولار",
    latencyEn: "Hundreds of GBs/day",
    latencyFa: "صدها گیگابایت روزانه",
    detailsEn: "Decoupled core processing runtime with swappable ETL/ELT plugins communicating over asynchronous gRPC channels.",
    detailsFa: "موتور پردازش هسته با افزونه‌های قابل تعویض ETL/ELT و کانال‌های ناهمگام gRPC جهت بالاترین تاب‌آوری.",
    icon: Cpu,
  },
  {
    id: "sdd",
    labelEn: "Agentic Harness",
    labelFa: "هارنس ایجنت‌ها",
    sublabelEn: "Spec-Driven Development",
    sublabelFa: "توسعه مشخصه‌محور (SDD)",
    protocolEn: "Zod + Markdown Specs",
    protocolFa: "مشخصات Zod + Markdown",
    latencyEn: "10-Day MVP Cycle",
    latencyFa: "چرخه MVP در ۱۰ روز",
    detailsEn: "Automated agent swarms implementing formal engineering specifications with end-to-end human verification gates.",
    detailsFa: "سوآرم ایجنت‌های مستقل مجری مشخصات فنی دقیق با گیت‌های تایید و صحه‌گذاری انسانی دوطرفه.",
    icon: Bot,
  },
  {
    id: "storage",
    labelEn: "Storage & Query",
    labelFa: "ذخیره‌سازی و کوئری",
    sublabelEn: "Partitioned Stores",
    sublabelFa: "داده‌های پارتیشن‌بندی",
    protocolEn: "Postgres + Redis + OS",
    protocolFa: "Postgres + Redis + OS",
    latencyEn: "Indexed Aggregates",
    latencyFa: "اندیس‌های تجمیعی بلادرنگ",
    detailsEn: "Hybrid storage layer combining PostgreSQL relations, Redis caches, and OpenSearch inverted indexes for real-time reporting.",
    detailsFa: "لایه ذخیره‌سازی هیبرید ترکیبی از روابط PostgreSQL، کش Redis و اندیس‌های OpenSearch برای گزارش‌گیری سریع.",
    icon: Database,
  },
];

export function PipelineDag({ isRtl = false }: { isRtl?: boolean }) {
  const [selectedId, setSelectedId] = React.useState<string>("sdd");
  const activeNode = NODES.find((n) => n.id === selectedId) || NODES[0];

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div className="pipeline-dag-container rounded-xl border border-border/80 bg-card/60 backdrop-blur-sm p-4 sm:p-5 space-y-4 print:hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/50 pb-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-primary" />
          <span className="font-mono text-xs uppercase font-bold tracking-wider text-foreground">
            {isRtl ? "توپولوژی معماری // پایپ‌لاین تعاملی DAG" : "Architecture Topology // Live Pipeline DAG"}
          </span>
        </div>
        <span className="font-mono text-[11px] text-muted-foreground">
          {isRtl ? "برای مشاهده مشخصات سیستم روی هر گره کلیک کنید" : "Click any node to inspect system specifications"}
        </span>
      </div>

      {/* DAG Node Flow with 2x2 Mobile & 4-col Desktop Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 relative">
        {NODES.map((node, i) => {
          const Icon = node.icon;
          const isSelected = node.id === selectedId;
          const label = isRtl ? node.labelFa : node.labelEn;
          const sublabel = isRtl ? node.sublabelFa : node.sublabelEn;

          return (
            <div key={node.id} className="relative flex items-center">
              <button
                type="button"
                onClick={() => setSelectedId(node.id)}
                className={`w-full p-3 rounded-lg border text-start transition-all relative group ${
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
                  {label}
                </div>
                <div className="font-mono text-[10px] text-muted-foreground truncate mt-0.5">
                  {sublabel}
                </div>

                {isSelected && (
                  <span className="absolute -top-1 -end-1 w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
                )}
              </button>

              {/* Connecting arrow rail between nodes on desktop */}
              {i < NODES.length - 1 && (
                <div className="hidden sm:flex absolute -end-2 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                  <span className="p-0.5 rounded-full bg-background border border-border/80 text-muted-foreground/80 shadow-2xs">
                    <ArrowIcon className="w-2.5 h-2.5 text-primary" />
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Node Inspector Drawer */}
      <div className="p-3.5 rounded-lg bg-secondary/40 border border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="space-y-1 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="font-bold text-foreground">
              {isRtl ? activeNode.labelFa : activeNode.labelEn}
            </span>
            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-primary/15 text-primary font-semibold">
              {isRtl ? activeNode.protocolFa : activeNode.protocolEn}
            </span>
          </div>
          <p className="text-muted-foreground text-xs leading-relaxed">
            {isRtl ? activeNode.detailsFa : activeNode.detailsEn}
          </p>
        </div>

        <div className="flex-shrink-0 text-start sm:text-end font-mono">
          <div className="text-[10px] uppercase text-muted-foreground">
            {isRtl ? "مشخصات عملیاتی" : "Operating Spec"}
          </div>
          <div className="text-primary font-bold">
            {isRtl ? activeNode.latencyFa : activeNode.latencyEn}
          </div>
        </div>
      </div>
    </div>
  );
}
