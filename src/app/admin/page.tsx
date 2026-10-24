"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  BarChart3,
  Compass,
  Users,
  Activity,
  ListFilter,
  Inbox,
  Settings as SettingsIcon,
  LogOut,
  Calendar,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  FileText,
  Mail,
  Trash2,
  Archive,
  CheckCircle,
  Eye,
  Clock,
  Globe,
  Smartphone,
  Laptop,
  Tablet,
  ExternalLink,
  Shield,
  Loader2,
  RefreshCw,
  Sun,
  Moon,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import { toast } from "sonner";

type TabKey =
  | "overview"
  | "acquisition"
  | "audience"
  | "engagement"
  | "requests"
  | "messages"
  | "settings";

type RangeKey = "today" | "7d" | "30d" | "90d";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const [activeTab, setActiveTab] = React.useState<TabKey>("overview");
  const [range, setRange] = React.useState<RangeKey>("30d");
  const [includeBots, setIncludeBots] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [stats, setStats] = React.useState<any>(null);
  const [showTableFallback, setShowTableFallback] = React.useState<boolean>(false);

  // Requests view state
  const [requestsPage, setRequestsPage] = React.useState<number>(1);
  const [requestsFilter, setRequestsFilter] = React.useState<string>("all");
  const [requestsData, setRequestsData] = React.useState<any>(null);
  const [requestsLoading, setRequestsLoading] = React.useState<boolean>(false);

  // Messages view state
  const [messagesFilter, setMessagesFilter] = React.useState<string>("all");
  const [messagesData, setMessagesData] = React.useState<any>(null);
  const [messagesLoading, setMessagesLoading] = React.useState<boolean>(false);

  // Settings view state
  const [settingsData, setSettingsData] = React.useState<Record<string, string>>({});
  const [savingSettings, setSavingSettings] = React.useState<boolean>(false);

  // Load Main Stats
  const loadStats = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/stats?range=${range}&bots=${includeBots ? "1" : "0"}`);
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      setStats(data);
    } catch {
      toast.error("Failed to load analytics");
    } finally {
      setLoading(false);
    }
  }, [range, includeBots, router]);

  // Load Requests Log
  const loadRequests = React.useCallback(async () => {
    setRequestsLoading(true);
    try {
      const res = await fetch(
        `/api/admin/requests?page=${requestsPage}&limit=20&filter=${requestsFilter}`
      );
      if (res.ok) {
        const data = await res.json();
        setRequestsData(data);
      }
    } catch {
      toast.error("Failed to load requests log");
    } finally {
      setRequestsLoading(false);
    }
  }, [requestsPage, requestsFilter]);

  // Load Messages
  const loadMessages = React.useCallback(async () => {
    setMessagesLoading(true);
    try {
      const res = await fetch(`/api/admin/messages?filter=${messagesFilter}`);
      if (res.ok) {
        const data = await res.json();
        setMessagesData(data);
      }
    } catch {
      toast.error("Failed to load messages");
    } finally {
      setMessagesLoading(false);
    }
  }, [messagesFilter]);

  // Load Settings
  const loadSettings = React.useCallback(async () => {
    try {
      const res = await fetch("/api/admin/settings");
      if (res.ok) {
        const data = await res.json();
        setSettingsData(data.settings || {});
      }
    } catch {
      toast.error("Failed to load settings");
    }
  }, []);

  React.useEffect(() => {
    loadStats();
  }, [loadStats]);

  React.useEffect(() => {
    if (activeTab === "requests") loadRequests();
    if (activeTab === "messages") loadMessages();
    if (activeTab === "settings") loadSettings();
  }, [activeTab, loadRequests, loadMessages, loadSettings]);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const handleMessageAction = async (id: string, action: "read" | "archive" | "delete", value?: boolean) => {
    try {
      if (action === "delete") {
        await fetch(`/api/admin/messages?id=${id}`, { method: "DELETE" });
        toast.success("Message deleted");
      } else {
        await fetch("/api/admin/messages", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id,
            ...(action === "read" ? { read: value } : { archived: value }),
          }),
        });
        toast.success(action === "read" ? "Status updated" : "Archive status updated");
      }
      loadMessages();
    } catch {
      toast.error("Action failed");
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settingsData),
      });
      if (res.ok) {
        toast.success("Settings saved successfully");
      } else {
        toast.error("Failed to save settings");
      }
    } catch {
      toast.error("Settings save error");
    } finally {
      setSavingSettings(false);
    }
  };

  const ov = stats?.overview;
  const ts = stats?.timeseries || [];
  const acq = stats?.acquisition;
  const aud = stats?.audience;
  const eng = stats?.engagement;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Top Bar Header */}
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/90 backdrop-blur-md px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-mono font-bold text-xs border border-primary/20">
            SOM
          </div>
          <span className="font-bold text-sm tracking-tight hidden sm:inline">
            Resume Analytics
          </span>
          <span className="text-xs text-muted-foreground font-mono">/admin</span>
        </div>

        {/* Real-time Indicator & Controls */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs">
          {/* Live indicator */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold">{ov?.visitorsNow ?? 0}</span>
            <span className="hidden md:inline">visitors live</span>
          </div>

          {/* Date range picker */}
          <div className="flex items-center rounded-lg border border-border p-0.5 bg-secondary/50 font-mono text-[11px]">
            {(["today", "7d", "30d", "90d"] as RangeKey[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRange(r)}
                className={`px-2 py-0.5 rounded-md transition-colors ${
                  range === r
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Bot filter toggle */}
          <button
            type="button"
            onClick={() => setIncludeBots(!includeBots)}
            className={`hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-md border text-xs font-mono transition-colors ${
              includeBots
                ? "border-amber-500/50 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                : "border-border bg-secondary/50 text-muted-foreground hover:text-foreground"
            }`}
            title="Toggle known bot traffic in metrics"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>{includeBots ? "Bots included" : "Bots filtered"}</span>
          </button>

          {/* Theme toggle */}
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-1.5 rounded-md border border-border hover:bg-secondary text-muted-foreground hover:text-foreground"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Refresh */}
          <button
            type="button"
            onClick={loadStats}
            className="p-1.5 rounded-md border border-border hover:bg-secondary text-muted-foreground hover:text-foreground"
            title="Refresh statistics"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="p-1.5 rounded-md border border-border hover:bg-destructive/10 hover:text-destructive text-muted-foreground"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Layout: Left Sidebar + Content Area */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-56 border-b md:border-b-0 md:border-r border-border/60 p-3 bg-card/40 flex md:flex-col gap-1 overflow-x-auto">
          {[
            { key: "overview", label: "Overview", icon: BarChart3 },
            { key: "acquisition", label: "Acquisition", icon: Compass },
            { key: "audience", label: "Audience", icon: Users },
            { key: "engagement", label: "Engagement", icon: Activity },
            { key: "requests", label: "Requests Log", icon: ListFilter },
            {
              key: "messages",
              label: "Messages",
              icon: Inbox,
              badge: messagesData?.unreadCount,
            },
            { key: "settings", label: "Settings", icon: SettingsIcon },
          ].map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setActiveTab(item.key as TabKey)}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                  active
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge ? (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                      active
                        ? "bg-primary-foreground text-primary font-bold"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}

          <div className="hidden md:block mt-auto pt-6 border-t border-border/40 text-[11px] text-muted-foreground font-mono px-3">
            <div>Privacy: HMAC-SHA256</div>
            <div>Rotating salt: 24h</div>
          </div>
        </aside>

        {/* Tab Content Panels */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto space-y-6">
          {loading && !stats ? (
            <div className="h-64 flex flex-col items-center justify-center gap-3 text-muted-foreground">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="text-xs font-mono">Aggregating telemetry...</span>
            </div>
          ) : null}

          {/* ================= TAB 1: OVERVIEW ================= */}
          {activeTab === "overview" && stats && (
            <div className="space-y-6">
              {/* 6 KPI Cards with % Comparison Badges */}
              <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
                <div className="p-4 rounded-xl bg-card border border-border/70 space-y-1">
                  <div className="text-xs text-muted-foreground">Page Views</div>
                  <div className="text-2xl font-bold font-mono">{ov?.pageviews}</div>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-500">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>{ov?.pageviewsDiff > 0 ? `+${ov.pageviewsDiff}%` : `${ov.pageviewsDiff}%`}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-card border border-border/70 space-y-1">
                  <div className="text-xs text-muted-foreground">Unique Visitors</div>
                  <div className="text-2xl font-bold font-mono">{ov?.visitors}</div>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-500">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>{ov?.visitorsDiff > 0 ? `+${ov.visitorsDiff}%` : `${ov.visitorsDiff}%`}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-card border border-border/70 space-y-1">
                  <div className="text-xs text-muted-foreground">Sessions</div>
                  <div className="text-2xl font-bold font-mono">{ov?.sessions}</div>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-500">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>{ov?.sessionsDiff > 0 ? `+${ov.sessionsDiff}%` : `${ov.sessionsDiff}%`}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-card border border-border/70 space-y-1">
                  <div className="text-xs text-muted-foreground">Bounce Rate</div>
                  <div className="text-2xl font-bold font-mono">{ov?.bounceRate}%</div>
                  <div className="text-[11px] text-muted-foreground font-mono">1-event visits</div>
                </div>

                <div className="p-4 rounded-xl bg-card border border-border/70 space-y-1">
                  <div className="text-xs text-muted-foreground">Avg Duration</div>
                  <div className="text-2xl font-bold font-mono">{ov?.avgDurationSec}s</div>
                  <div className="text-[11px] text-muted-foreground font-mono">engaged time</div>
                </div>

                <div className="p-4 rounded-xl bg-card border border-border/70 space-y-1">
                  <div className="text-xs text-muted-foreground">PDF Downloads</div>
                  <div className="text-2xl font-bold font-mono text-primary">{ov?.pdfDownloads}</div>
                  <div className="text-[11px] text-muted-foreground font-mono">resume prints</div>
                </div>
              </div>

              {/* Timeseries Chart Card */}
              <div className="p-5 rounded-xl bg-card border border-border/70 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-sm">Traffic & Downloads Over Time</h3>
                    <p className="text-xs text-muted-foreground">Daily pageviews and unique visitors</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowTableFallback(!showTableFallback)}
                    className="text-xs font-mono text-primary underline"
                  >
                    {showTableFallback ? "Show chart" : "Table fallback"}
                  </button>
                </div>

                {!showTableFallback ? (
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={ts}>
                        <defs>
                          <linearGradient id="pvGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                        <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <RechartsTooltip contentStyle={{ background: "var(--card)", borderRadius: "8px", border: "1px solid var(--border)", fontSize: "12px" }} />
                        <Area type="monotone" dataKey="pageviews" stroke="var(--primary)" strokeWidth={2} fillOpacity={1} fill="url(#pvGrad)" name="Pageviews" />
                        <Area type="monotone" dataKey="visitors" stroke="#10b981" strokeWidth={1.5} fill="none" name="Visitors" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead>
                        <tr className="border-b border-border/70 text-muted-foreground">
                          <th className="py-2">Date</th>
                          <th>Pageviews</th>
                          <th>Visitors</th>
                          <th>PDF Downloads</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ts.map((row: any) => (
                          <tr key={row.date} className="border-b border-border/30 hover:bg-secondary/40">
                            <td className="py-1.5">{row.date}</td>
                            <td>{row.pageviews}</td>
                            <td>{row.visitors}</td>
                            <td>{row.pdfDownloads}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================= TAB 2: ACQUISITION ================= */}
          {activeTab === "acquisition" && acq && (
            <div className="space-y-6">
              {/* Channel Split Summary */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-xl bg-card border border-border/70 space-y-1">
                  <div className="text-xs text-muted-foreground">Direct Traffic</div>
                  <div className="text-xl font-bold font-mono">{acq.channelSplit.direct}</div>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border/70 space-y-1">
                  <div className="text-xs text-muted-foreground">Social (LinkedIn, X)</div>
                  <div className="text-xl font-bold font-mono text-primary">{acq.channelSplit.social}</div>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border/70 space-y-1">
                  <div className="text-xs text-muted-foreground">Search Engines</div>
                  <div className="text-xl font-bold font-mono">{acq.channelSplit.search}</div>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border/70 space-y-1">
                  <div className="text-xs text-muted-foreground">Other Referrals</div>
                  <div className="text-xl font-bold font-mono">{acq.channelSplit.other}</div>
                </div>
              </div>

              {/* Referrers & UTM Tables */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Top Referrers */}
                <div className="p-5 rounded-xl bg-card border border-border/70 space-y-3">
                  <h3 className="font-semibold text-sm">Top Referrers</h3>
                  <div className="space-y-2">
                    {acq.referrers.slice(0, 8).map((r: any) => (
                      <div key={r.name} className="flex items-center justify-between text-xs py-1.5 border-b border-border/30">
                        <span className="font-mono text-foreground">{r.name}</span>
                        <span className="font-mono text-muted-foreground">{r.count}</span>
                      </div>
                    ))}
                    {acq.referrers.length === 0 && <p className="text-xs text-muted-foreground">No referrers yet.</p>}
                  </div>
                </div>

                {/* UTM Campaigns */}
                <div className="p-5 rounded-xl bg-card border border-border/70 space-y-3">
                  <h3 className="font-semibold text-sm">UTM Campaigns & Sources</h3>
                  <div className="space-y-2">
                    {acq.utmSources.slice(0, 8).map((u: any) => (
                      <div key={u.name} className="flex items-center justify-between text-xs py-1.5 border-b border-border/30">
                        <span className="font-mono text-foreground">utm_source={u.name}</span>
                        <span className="font-mono text-primary font-bold">{u.count}</span>
                      </div>
                    ))}
                    {acq.utmSources.length === 0 && (
                      <p className="text-xs text-muted-foreground">No tagged UTM parameters yet.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 3: AUDIENCE ================= */}
          {activeTab === "audience" && aud && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Countries */}
              <div className="p-5 rounded-xl bg-card border border-border/70 space-y-3">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <Globe className="w-4 h-4 text-primary" />
                  <span>Countries</span>
                </h3>
                <div className="space-y-2">
                  {aud.countries.slice(0, 10).map((c: any) => (
                    <div key={c.code} className="flex items-center justify-between text-xs py-1.5 border-b border-border/30">
                      <span className="font-mono font-semibold">{c.code}</span>
                      <span className="font-mono text-muted-foreground">{c.count} views</span>
                    </div>
                  ))}
                  {aud.countries.length === 0 && <p className="text-xs text-muted-foreground">No geo data.</p>}
                </div>
              </div>

              {/* Devices */}
              <div className="p-5 rounded-xl bg-card border border-border/70 space-y-3">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <Laptop className="w-4 h-4 text-primary" />
                  <span>Devices</span>
                </h3>
                <div className="space-y-2">
                  {aud.devices.map((d: any) => (
                    <div key={d.type} className="flex items-center justify-between text-xs py-1.5 border-b border-border/30 capitalize">
                      <span>{d.type}</span>
                      <span className="font-mono font-bold">{d.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Browsers */}
              <div className="p-5 rounded-xl bg-card border border-border/70 space-y-3">
                <h3 className="font-semibold text-sm">Browsers</h3>
                <div className="space-y-2">
                  {aud.browsers.map((b: any) => (
                    <div key={b.name} className="flex items-center justify-between text-xs py-1.5 border-b border-border/30">
                      <span>{b.name}</span>
                      <span className="font-mono text-muted-foreground">{b.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Operating Systems */}
              <div className="p-5 rounded-xl bg-card border border-border/70 space-y-3">
                <h3 className="font-semibold text-sm">Operating Systems</h3>
                <div className="space-y-2">
                  {aud.os.map((o: any) => (
                    <div key={o.name} className="flex items-center justify-between text-xs py-1.5 border-b border-border/30">
                      <span>{o.name}</span>
                      <span className="font-mono text-muted-foreground">{o.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages (Locales) */}
              <div className="p-5 rounded-xl bg-card border border-border/70 space-y-3">
                <h3 className="font-semibold text-sm">Language Distribution</h3>
                <div className="space-y-2">
                  {aud.locales.map((l: any) => (
                    <div key={l.locale} className="flex items-center justify-between text-xs py-1.5 border-b border-border/30 font-mono">
                      <span>{l.locale === "en" ? "English (en)" : "Persian (fa)"}</span>
                      <span className="font-bold text-primary">{l.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 4: ENGAGEMENT (RESUME-SPECIFIC) ================= */}
          {activeTab === "engagement" && eng && (
            <div className="space-y-6">
              {/* Funnel Card */}
              <div className="p-5 rounded-xl bg-card border border-border/70 space-y-4">
                <h3 className="font-semibold text-sm">Recruiter Engagement Funnel</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-secondary/50 border border-border/60">
                    <div className="text-xs text-muted-foreground">1. Total Visits</div>
                    <div className="text-2xl font-bold font-mono mt-1">{eng.funnel.totalVisits}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">100% of traffic</div>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/50 border border-border/60">
                    <div className="text-xs text-muted-foreground">2. Viewed Experience</div>
                    <div className="text-2xl font-bold font-mono mt-1 text-primary">{eng.funnel.viewedExperience}</div>
                    <div className="text-[11px] font-mono text-primary mt-0.5">{eng.funnel.experienceRate}% reach rate</div>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/50 border border-border/60">
                    <div className="text-xs text-muted-foreground">3. Downloaded / Contacted</div>
                    <div className="text-2xl font-bold font-mono mt-1 text-emerald-500">{eng.funnel.converted}</div>
                    <div className="text-[11px] font-mono text-emerald-500 mt-0.5">{eng.funnel.conversionRate}% conversion</div>
                  </div>
                </div>
              </div>

              {/* Section Read Rates & Outbound Clicks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl bg-card border border-border/70 space-y-3">
                  <h3 className="font-semibold text-sm">Section Read Rates (IntersectionObserver)</h3>
                  <div className="space-y-2">
                    {eng.sections.map((s: any) => (
                      <div key={s.section} className="flex items-center justify-between text-xs py-1.5 border-b border-border/30">
                        <span className="font-mono capitalize">{s.section}</span>
                        <span className="font-mono font-bold text-primary">{s.count} dwells</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-card border border-border/70 space-y-3">
                  <h3 className="font-semibold text-sm">Outbound Link Clicks</h3>
                  <div className="space-y-2">
                    {eng.outboundLinks.map((l: any) => (
                      <div key={l.target} className="flex items-center justify-between text-xs py-1.5 border-b border-border/30 truncate">
                        <span className="font-mono truncate max-w-xs">{l.target}</span>
                        <span className="font-mono font-bold ms-2">{l.count}</span>
                      </div>
                    ))}
                    {eng.outboundLinks.length === 0 && <p className="text-xs text-muted-foreground">No outbound clicks yet.</p>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 5: REQUESTS LOG ================= */}
          {activeTab === "requests" && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-xs font-mono">
                  {["all", "humans", "bots", "errors"].map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => {
                        setRequestsFilter(f);
                        setRequestsPage(1);
                      }}
                      className={`px-3 py-1 rounded-md capitalize transition-colors ${
                        requestsFilter === f
                          ? "bg-primary text-primary-foreground font-semibold"
                          : "bg-secondary text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                  <span>Humans: {requestsData?.stats?.humanCount ?? 0}</span>
                  <span>·</span>
                  <span>Bots: {requestsData?.stats?.botCount ?? 0}</span>
                  <span>·</span>
                  <span>Errors: {requestsData?.stats?.errorCount ?? 0}</span>
                </div>
              </div>

              {/* Table */}
              <div className="rounded-xl border border-border/70 bg-card overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-border/70 text-muted-foreground bg-secondary/30">
                      <th className="py-2.5 px-4">Time</th>
                      <th className="px-4">Status</th>
                      <th className="px-4">Method</th>
                      <th className="px-4">Path</th>
                      <th className="px-4">Duration</th>
                      <th className="px-4">Country</th>
                      <th className="px-4">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requestsData?.logs?.map((log: any) => (
                      <tr key={log.id} className="border-b border-border/30 hover:bg-secondary/40">
                        <td className="py-2 px-4 text-muted-foreground whitespace-nowrap">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </td>
                        <td className="px-4">
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              log.status < 400
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                : "bg-destructive/10 text-destructive"
                            }`}
                          >
                            {log.status}
                          </span>
                        </td>
                        <td className="px-4 font-bold">{log.method}</td>
                        <td className="px-4 truncate max-w-xs">{log.path}</td>
                        <td className="px-4 text-muted-foreground">{log.durationMs}ms</td>
                        <td className="px-4">{log.country || "—"}</td>
                        <td className="px-4">
                          {log.isBot ? (
                            <span className="text-amber-500 font-semibold">Bot</span>
                          ) : (
                            <span className="text-foreground">Human</span>
                          )}
                        </td>
                      </tr>
                    ))}
                    {requestsData?.logs?.length === 0 && (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-muted-foreground">
                          No matching request logs found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {requestsData && requestsData.totalPages > 1 && (
                <div className="flex items-center justify-between text-xs font-mono pt-2">
                  <span>
                    Page {requestsData.page} of {requestsData.totalPages}
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={requestsPage <= 1}
                      onClick={() => setRequestsPage((p) => Math.max(1, p - 1))}
                      className="px-3 py-1 rounded bg-secondary disabled:opacity-40"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      disabled={requestsPage >= requestsData.totalPages}
                      onClick={() => setRequestsPage((p) => p + 1)}
                      className="px-3 py-1 rounded bg-secondary disabled:opacity-40"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= TAB 6: MESSAGES INBOX ================= */}
          {activeTab === "messages" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono">
                {["all", "unread", "archived"].map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setMessagesFilter(f)}
                    className={`px-3 py-1 rounded-md capitalize transition-colors ${
                      messagesFilter === f
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                {messagesData?.messages?.map((msg: any) => (
                  <div
                    key={msg.id}
                    className={`p-4 rounded-xl border transition-colors space-y-3 ${
                      msg.read
                        ? "bg-card border-border/70"
                        : "bg-primary/5 border-primary/40"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-foreground">{msg.name}</span>
                        <span className="font-mono text-muted-foreground">({msg.email})</span>
                        {msg.country && (
                          <span className="px-1.5 py-0.2 rounded bg-secondary text-[10px] font-mono">
                            {msg.country}
                          </span>
                        )}
                      </div>
                      <div className="text-muted-foreground font-mono text-[11px]">
                        {new Date(msg.createdAt).toLocaleString()}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">
                      {msg.message}
                    </p>

                    <div className="flex items-center gap-2 pt-2 border-t border-border/40 text-xs">
                      <a
                        href={`mailto:${msg.email}?subject=${encodeURIComponent("Re: Resume Inquiry")}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-primary text-primary-foreground font-semibold text-[11px]"
                      >
                        <Mail className="w-3 h-3" />
                        <span>Reply by Email</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => handleMessageAction(msg.id, "read", !msg.read)}
                        className="px-2.5 py-1 rounded bg-secondary hover:bg-secondary/80 text-[11px]"
                      >
                        {msg.read ? "Mark Unread" : "Mark Read"}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleMessageAction(msg.id, "archive", !msg.archived)}
                        className="px-2.5 py-1 rounded bg-secondary hover:bg-secondary/80 text-[11px]"
                      >
                        {msg.archived ? "Unarchive" : "Archive"}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleMessageAction(msg.id, "delete")}
                        className="p-1 rounded text-destructive hover:bg-destructive/10 ms-auto"
                        title="Delete message"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}

                {messagesData?.messages?.length === 0 && (
                  <div className="p-8 text-center text-xs text-muted-foreground border border-dashed rounded-xl">
                    No messages in this filter.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================= TAB 7: SETTINGS ================= */}
          {activeTab === "settings" && (
            <div className="max-w-xl space-y-6">
              <form onSubmit={handleSaveSettings} className="p-6 rounded-xl bg-card border border-border/70 space-y-5">
                <h3 className="font-semibold text-sm">Telemetry & Privacy Configuration</h3>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold">Data Retention (Months)</label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={settingsData.data_retention_months || "13"}
                    onChange={(e) =>
                      setSettingsData({ ...settingsData, data_retention_months: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs rounded-md bg-secondary/50 border border-border font-mono"
                  />
                  <p className="text-[11px] text-muted-foreground">Default 13 months for raw events; daily rollups kept indefinitely.</p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold">Excluded IP Addresses</label>
                  <input
                    type="text"
                    value={settingsData.excluded_ips || ""}
                    onChange={(e) =>
                      setSettingsData({ ...settingsData, excluded_ips: e.target.value })
                    }
                    placeholder="127.0.0.1, 192.168.1.50"
                    className="w-full px-3 py-2 text-xs rounded-md bg-secondary/50 border border-border font-mono"
                  />
                  <p className="text-[11px] text-muted-foreground">Comma-separated IPs to ignore so your personal visits do not pollute stats.</p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold">Excluded User-Agents</label>
                  <input
                    type="text"
                    value={settingsData.excluded_user_agents || ""}
                    onChange={(e) =>
                      setSettingsData({ ...settingsData, excluded_user_agents: e.target.value })
                    }
                    placeholder="curl, PostmanRuntime, UptimeRobot"
                    className="w-full px-3 py-2 text-xs rounded-md bg-secondary/50 border border-border font-mono"
                  />
                </div>

                <button
                  type="submit"
                  disabled={savingSettings}
                  className="px-4 py-2 text-xs font-semibold rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
                >
                  {savingSettings ? "Saving..." : "Save Settings"}
                </button>
              </form>

              {/* Data Export Box */}
              <div className="p-6 rounded-xl bg-card border border-border/70 space-y-3">
                <h3 className="font-semibold text-sm">Export Telemetry</h3>
                <p className="text-xs text-muted-foreground">
                  Download raw visitor events and engagement data for external analysis in CSV or JSON format.
                </p>
                <div className="flex gap-3 pt-2">
                  <a
                    href="/api/admin/export?format=csv"
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-semibold rounded-md border border-border hover:bg-secondary transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </a>
                  <a
                    href="/api/admin/export?format=json"
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-semibold rounded-md border border-border hover:bg-secondary transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export JSON</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
