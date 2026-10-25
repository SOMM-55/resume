"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  User,
  Briefcase,
  FolderGit2,
  Code2,
  GraduationCap,
  Mail,
  Printer,
  Moon,
  Sun,
  Github,
  Linkedin,
  Languages,
} from "lucide-react";
import type { ResumeContent } from "@/content";

export interface CommandPaletteData {
  locale: "en" | "fa";
  sections: {
    about: string;
    experience: string;
    projects: string;
    skills: string;
    education: string;
    contact: string;
  };
  ui: {
    commandPaletteHint: string;
    printResume: string;
    downloadPdf: string;
    toggleTheme: string;
  };
  contact: {
    githubHref: string;
    linkedinHref: string;
    email: string;
  };
}

interface CommandPaletteDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  content: CommandPaletteData;
}

export function CommandPaletteDialog({ open, setOpen, content }: CommandPaletteDialogProps) {
  const router = useRouter();
  const { setTheme, theme } = useTheme();

  const jumpTo = (sectionId: string) => {
    setOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handlePrint = () => {
    setOpen(false);
    if (typeof window !== "undefined" && (window as unknown as { trackEvent?: (name: string, data?: unknown) => void }).trackEvent) {
      (window as unknown as { trackEvent: (name: string, data?: unknown) => void }).trackEvent("pdf_download", {
        target: `resume-${content.locale}.pdf`,
        source: "command_palette",
      });
    }
    setTimeout(() => {
      window.print();
    }, 150);
  };

  const switchLanguage = (newLocale: "en" | "fa") => {
    setOpen(false);
    if (typeof window !== "undefined" && (window as unknown as { trackEvent?: (name: string, data?: unknown) => void }).trackEvent) {
      (window as unknown as { trackEvent: (name: string, data?: unknown) => void }).trackEvent("language_toggle", {
        locale: newLocale,
        source: "command_palette",
      });
    }
    router.push(`/${newLocale}`);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder={content.ui.commandPaletteHint} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading={content.sections.about}>
          <CommandItem onSelect={() => jumpTo("about")}>
            <User className="me-2 h-4 w-4 text-primary" />
            <span>{content.sections.about}</span>
          </CommandItem>
          <CommandItem onSelect={() => jumpTo("experience")}>
            <Briefcase className="me-2 h-4 w-4 text-primary" />
            <span>{content.sections.experience}</span>
          </CommandItem>
          <CommandItem onSelect={() => jumpTo("projects")}>
            <FolderGit2 className="me-2 h-4 w-4 text-primary" />
            <span>{content.sections.projects}</span>
          </CommandItem>
          <CommandItem onSelect={() => jumpTo("skills")}>
            <Code2 className="me-2 h-4 w-4 text-primary" />
            <span>{content.sections.skills}</span>
          </CommandItem>
          <CommandItem onSelect={() => jumpTo("education")}>
            <GraduationCap className="me-2 h-4 w-4 text-primary" />
            <span>{content.sections.education}</span>
          </CommandItem>
          <CommandItem onSelect={() => jumpTo("contact")}>
            <Mail className="me-2 h-4 w-4 text-primary" />
            <span>{content.sections.contact}</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          <CommandItem onSelect={handlePrint}>
            <Printer className="me-2 h-4 w-4" />
            <span>{content.ui.printResume} / {content.ui.downloadPdf}</span>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              switchLanguage(content.locale === "en" ? "fa" : "en");
            }}
          >
            <Languages className="me-2 h-4 w-4" />
            <span>
              {content.locale === "en" ? "تغییر زبان به فارسی (فارسی)" : "Switch to English"}
            </span>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              setTheme(theme === "dark" ? "light" : "dark");
              setOpen(false);
            }}
          >
            {theme === "dark" ? (
              <Sun className="me-2 h-4 w-4" />
            ) : (
              <Moon className="me-2 h-4 w-4" />
            )}
            <span>{content.ui.toggleTheme}</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Links">
          <CommandItem
            onSelect={() => {
              setOpen(false);
              window.open(content.contact.githubHref, "_blank", "noopener,noreferrer");
            }}
          >
            <Github className="me-2 h-4 w-4" />
            <span>GitHub (SOMM-55)</span>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              setOpen(false);
              window.open(content.contact.linkedinHref, "_blank", "noopener,noreferrer");
            }}
          >
            <Linkedin className="me-2 h-4 w-4" />
            <span>LinkedIn</span>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              setOpen(false);
              window.location.href = `mailto:${content.contact.email}`;
            }}
          >
            <Mail className="me-2 h-4 w-4" />
            <span>Email: {content.contact.email}</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>

      <div className="border-t border-border px-3 py-2 text-[10px] font-mono text-muted-foreground flex items-center justify-between">
        <span>{content.locale === "fa" ? "میانبرهای صفحه‌کلید (Keyboard Shortcuts):" : "Keyboard Shortcuts:"} ⌘K / ?</span>
        <span>Esc {content.locale === "fa" ? "بستن" : "to close"}</span>
      </div>
    </CommandDialog>
  );
}
