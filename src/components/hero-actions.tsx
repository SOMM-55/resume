import * as React from "react";
import { Mail, Github, Linkedin, MapPin } from "lucide-react";
import { PdfDownloadButton } from "./pdf-download-button";
import type { ResumeContent } from "@/content";

interface HeroActionsProps {
  locale?: string;
  contactCta?: string;
  downloadPdf?: string;
  contact?: {
    email: string;
    githubHref: string;
    linkedinHref: string;
    location: string;
  };
  content?: ResumeContent;
}

export function HeroActions({
  locale,
  contactCta,
  downloadPdf,
  contact,
  content,
}: HeroActionsProps) {
  const loc = locale ?? content?.locale ?? "en";
  const cta = contactCta ?? content?.ui.contactCta ?? "Contact";
  const dlPdf = downloadPdf ?? content?.ui.downloadPdf ?? "Download PDF";
  const contactInfo = contact ?? content?.contact ?? {
    email: "omid.mousavimehr@gmail.com",
    githubHref: "https://github.com/SOMM-55",
    linkedinHref: "https://linkedin.com/in/sommehr",
    location: "Mashhad, Iran",
  };

  return (
    <div className="flex flex-wrap items-center gap-3 pt-1">
      <a
        href="#contact"
        className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] text-sm font-semibold rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-xs glow-primary"
      >
        <Mail className="w-4 h-4" />
        <span>{cta}</span>
      </a>

      <PdfDownloadButton
        label={dlPdf}
        locale={loc}
        source="hero_cta"
        className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] text-sm font-semibold rounded-md border border-border/80 hover:bg-secondary/70 transition-all font-mono text-xs text-foreground cursor-pointer"
      />

      <a
        href={contactInfo.githubHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[44px] sm:min-h-0 text-xs font-mono text-muted-foreground hover:text-foreground rounded-md hover:bg-secondary/50 transition-colors"
      >
        <Github className="w-4 h-4" />
        <span>github.com/SOMM-55</span>
      </a>

      <a
        href={contactInfo.linkedinHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[44px] sm:min-h-0 text-xs font-mono text-muted-foreground hover:text-foreground rounded-md hover:bg-secondary/50 transition-colors"
      >
        <Linkedin className="w-4 h-4" />
        <span>linkedin.com/in/sommehr</span>
      </a>

      <span className="hidden sm:inline-flex items-center gap-1 text-xs text-muted-foreground font-mono ms-auto">
        <MapPin className="w-3.5 h-3.5 text-primary" />
        <span>{contactInfo.location}</span>
      </span>
    </div>
  );
}
