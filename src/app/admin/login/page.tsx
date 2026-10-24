"use client";

import * as React from "react";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/admin";

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      router.push(from);
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 rounded-xl bg-card border border-border/80 shadow-xs space-y-4">
      {error && (
        <div className="p-3 rounded-lg text-xs font-medium bg-destructive/10 text-destructive border border-destructive/20">
          {error}
        </div>
      )}

      <div className="space-y-1.5">
        <label htmlFor="admin-username" className="text-xs font-semibold">
          Username
        </label>
        <input
          id="admin-username"
          type="text"
          required
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 text-sm rounded-md bg-secondary/50 border border-border focus:border-primary focus:outline-hidden focus:ring-1 focus:ring-primary transition-all font-mono"
          placeholder="admin"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="admin-password" className="text-xs font-semibold">
          Password
        </label>
        <input
          id="admin-password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 text-sm rounded-md bg-secondary/50 border border-border focus:border-primary focus:outline-hidden focus:ring-1 focus:ring-primary transition-all font-mono"
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-all shadow-xs"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Authenticating…</span>
          </>
        ) : (
          <>
            <span>Sign in</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center px-4 bg-background text-foreground">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary mx-auto flex items-center justify-center border border-primary/20">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Portal</h1>
          <p className="text-xs text-muted-foreground">
            Sign in to access resume analytics and message inbox
          </p>
        </div>

        <Suspense fallback={<div className="h-48 flex items-center justify-center text-xs font-mono">Loading form…</div>}>
          <LoginForm />
        </Suspense>

        <div className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-primary" />
          <span>Single-admin credentials verified via bcrypt</span>
          <span>·</span>
          <Link href="/en" className="underline hover:text-foreground">
            Return to site
          </Link>
        </div>
      </div>
    </main>
  );
}
