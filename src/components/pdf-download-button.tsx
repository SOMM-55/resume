"use client";

import * as React from "react";
import { FileDown } from "lucide-react";

interface PdfDownloadButtonProps {
  label: string;
  locale: string;
  className?: string;
  source?: string;
}

export function PdfDownloadButton({
  label,
  locale,
  className,
  source = "navbar_button",
}: PdfDownloadButtonProps) {
  const handlePrint = () => {
    if (typeof window !== "undefined" && (window as unknown as { trackEvent?: (name: string, data?: unknown) => void }).trackEvent) {
      (window as unknown as { trackEvent: (name: string, data?: unknown) => void }).trackEvent("pdf_download", {
        target: `resume-${locale}.pdf`,
        source,
      });
    }
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const defaultClasses = "inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 min-h-[44px] sm:min-h-0 text-xs font-semibold rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-xs";

  return (
    <button
      type="button"
      onClick={handlePrint}
      className={className || defaultClasses}
      aria-label={label}
      title={label}
    >
      <FileDown className={className ? "w-4 h-4 text-primary" : "w-3.5 h-3.5"} />
      <span className={className ? "" : "hidden sm:inline"}>{label}</span>
    </button>
  );
}
