"use client";

import * as React from "react";
import type { ResumeContent } from "@/content";
import type { CommandPaletteData } from "./command-palette-dialog";

const CommandPaletteDialog = React.lazy(() =>
  import("./command-palette-dialog").then((mod) => ({
    default: mod.CommandPaletteDialog,
  }))
);

interface CommandPaletteProps {
  content: CommandPaletteData | ResumeContent;
}

export function CommandPalette({ content }: CommandPaletteProps) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // Don't trigger inside inputs or textareas unless it's Escape
      const target = e.target as HTMLElement | null;
      const isInput =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      if (
        (e.key === "k" && (e.metaKey || e.ctrlKey)) ||
        (!isInput && e.key === "?")
      ) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="command-palette-trigger hidden sm:inline-flex items-center gap-2 px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground bg-secondary/60 hover:bg-secondary rounded-md border border-border transition-colors font-mono"
        title={content.ui.commandPaletteHint}
      >
        <span>⌘K</span>
        <span className="text-[10px] text-muted-foreground/90 font-medium">
          {content.ui.commandPaletteHint}
        </span>
      </button>

      {open && (
        <React.Suspense fallback={null}>
          <CommandPaletteDialog open={open} setOpen={setOpen} content={content} />
        </React.Suspense>
      )}
    </>
  );
}
