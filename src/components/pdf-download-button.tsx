"use client";

import * as React from "react";
import { FileDown } from "lucide-react";

interface PdfDownloadButtonProps {
  label: string;
  locale: string;
}

export function PdfDownloadButton({ label, locale }: PdfDownloadButtonProps) {
  const handlePrint = () => {
    if (typeof window !== "undefined" && (window as unknown as { trackEvent?: (name: string, data?: unknown) => void }).trackEvent) {
      (window as unknown as { trackEvent: (name: string, data?: unknown) => void }).trackEvent("pdf_download", {
        target: `resume-${locale}.pdf`,
        source: "navbar_button",
      });
    }
    setTimeout(() => {
      window.print();
    }, 100);
  };

  return (
    <button
      type="button"
      onClick={handlePrint}
      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 min-h-[44px] sm:min-h-0 text-xs font-semibold rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-xs"
      aria-label={label}
      title={label}
    >
      <FileDown className="w-3.5 h-3.5" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
