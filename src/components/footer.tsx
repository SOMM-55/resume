import * as React from "react";
import Link from "next/link";
import type { ResumeContent } from "@/content";
import { ShieldCheck, Lock } from "lucide-react";

interface FooterProps {
  content: ResumeContent;
}

export function Footer({ content }: FooterProps) {
  return (
    <footer className="pt-10 pb-16 text-xs text-muted-foreground border-t border-border/40">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Privacy Note */}
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-primary flex-shrink-0" />
          <span>
            {content.ui.privacyNotice}: {content.ui.privacyNoticeDetail}
          </span>
        </div>

        {/* Admin Link & Copyright */}
        <div className="flex items-center gap-4">
          <span>© 2026 {content.name}</span>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
            title="Admin Dashboard"
            aria-label="Admin panel"
          >
            <Lock className="w-3 h-3" />
            <span className="font-mono text-[10px]">Admin</span>
          </Link>
        </div>
      </div>

      {/* Print-only running footer */}
      <div className="print-only hidden pt-4 mt-6 border-t border-slate-300 text-[9pt] text-slate-500 flex justify-between">
        <span>
          {content.name} — {content.headline}
        </span>
        <span>
          {content.contact.email} · {content.contact.phone} · somm.dev
        </span>
      </div>
    </footer>
  );
}
