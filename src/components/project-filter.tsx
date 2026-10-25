"use client";

import * as React from "react";

export type FilterCategory = "all" | "sdd" | "data" | "systems";

interface ProjectFilterProps {
  categories: Array<{ key: FilterCategory; label: string }>;
  defaultCategory?: FilterCategory;
}

export function ProjectFilter({
  categories,
  defaultCategory = "all",
}: ProjectFilterProps) {
  const [active, setActive] = React.useState<FilterCategory>(defaultCategory);

  const handleClick = (key: FilterCategory) => {
    setActive(key);
    const container = document.getElementById("projects");
    if (container) {
      container.setAttribute("data-active-filter", key);
    }
  };

  return (
    <div className="flex items-center gap-1 p-1 rounded-lg bg-secondary/50 border border-border text-xs font-mono">
      {categories.map((item) => (
        <button
          key={item.key}
          type="button"
          onClick={() => handleClick(item.key)}
          className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
            active === item.key
              ? "bg-primary text-primary-foreground font-semibold"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
