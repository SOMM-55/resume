import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main id="main" className="min-h-screen bg-background text-foreground flex flex-col justify-center items-center px-4 text-center">
      <div className="max-w-md w-full space-y-6 p-8 rounded-2xl bg-card border border-border/80 shadow-xs">
        <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-700 dark:text-red-400 mx-auto flex items-center justify-center border border-red-500/20 font-mono font-bold text-lg">
          404
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Route Not Found</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The requested pipeline path or resource does not exist in this deployment.
          </p>
        </div>

        <div className="p-3 rounded-lg bg-secondary/50 font-mono text-xs text-muted-foreground text-start border border-border/60">
          <div className="text-red-700 dark:text-red-400 font-semibold">status: 404 Not Found</div>
          <div>path: route_not_found</div>
          <div>action: fallback_to_root</div>
        </div>

        <Link
          href="/en"
          className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-semibold rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Resume (/en)</span>
        </Link>
      </div>
    </main>
  );
}
