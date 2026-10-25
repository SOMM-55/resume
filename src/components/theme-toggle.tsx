"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  label: string;
}

export function ThemeToggle({ label }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="theme-toggle h-11 w-11 sm:h-8 sm:w-8 flex items-center justify-center rounded-md border border-border/70 hover:border-primary/50 hover:bg-secondary/70 text-muted-foreground hover:text-foreground transition-all"
      aria-label={label}
      title={label}
    >
      {mounted && theme === "dark" ? (
        <Sun className="w-4 h-4 text-amber-400" />
      ) : (
        <Moon className="w-4 h-4" />
      )}
    </button>
  );
}
