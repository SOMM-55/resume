import { NextResponse, type NextRequest } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const range = searchParams.get("range") || "30d";
  const includeBots = searchParams.get("bots") === "1";

  const now = new Date();
  let days = 30;
  if (range === "today") days = 1;
  else if (range === "7d") days = 7;
  else if (range === "90d") days = 90;

  const since = new Date(now.getTime() - days * 24 * 3600 * 1000);
  const prevSince = new Date(now.getTime() - 2 * days * 24 * 3600 * 1000);
  const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

  const baseWhere = {
    timestamp: { gte: since },
    ...(includeBots ? {} : { isBot: false }),
  };

  const prevWhere = {
    timestamp: { gte: prevSince, lt: since },
    ...(includeBots ? {} : { isBot: false }),
  };

  try {
    // 1. Real-time active visitors (last 5 minutes)
    const recentEvents = await prisma.visitorEvent.findMany({
      where: {
        timestamp: { gte: fiveMinutesAgo },
        ...(includeBots ? {} : { isBot: false }),
      },
      select: { sessionId: true },
    });
    const visitorsNow = new Set(recentEvents.map((e) => e.sessionId)).size;

    // 2. Current period events
    const currentEvents = await prisma.visitorEvent.findMany({
      where: baseWhere,
      select: {
        id: true,
        visitorId: true,
        sessionId: true,
        type: true,
        path: true,
        section: true,
        target: true,
        referrerHost: true,
        utmSource: true,
        utmMedium: true,
        utmCampaign: true,
        country: true,
        device: true,
        browser: true,
        os: true,
        locale: true,
        duration: true,
        scrollDepth: true,
        timestamp: true,
      },
    });

    // Previous period events (for percentage diff comparison)
    const prevEvents = await prisma.visitorEvent.findMany({
      where: prevWhere,
      select: {
        visitorId: true,
        sessionId: true,
        type: true,
      },
    });

    // Compute Overview stats
    const currentPv = currentEvents.filter((e) => e.type === "pageview").length;
    const currentVisitors = new Set(currentEvents.map((e) => e.visitorId)).size;
    const currentSessions = new Set(currentEvents.map((e) => e.sessionId)).size;

    const prevPv = prevEvents.filter((e) => e.type === "pageview").length;
    const prevVisitors = new Set(prevEvents.map((e) => e.visitorId)).size;
    const prevSessions = new Set(prevEvents.map((e) => e.sessionId)).size;

    // Session event count mapping for bounce rate
    const sessionCounts = new Map<string, number>();
    currentEvents.forEach((e) => {
      sessionCounts.set(e.sessionId, (sessionCounts.get(e.sessionId) || 0) + 1);
    });
    let singleEventSessions = 0;
    sessionCounts.forEach((count) => {
      if (count === 1) singleEventSessions++;
    });
    const bounceRate =
      currentSessions > 0 ? Math.round((singleEventSessions / currentSessions) * 100) : 0;

    // Average duration
    const durations = currentEvents
      .map((e) => e.duration)
      .filter((d): d is number => typeof d === "number" && d > 0);
    const avgDurationSec =
      durations.length > 0 ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length) : 0;

    // Average scroll depth
    const scrolls = currentEvents
      .map((e) => e.scrollDepth)
      .filter((s): s is number => typeof s === "number" && s > 0);
    const avgScrollDepth =
      scrolls.length > 0 ? Math.round(scrolls.reduce((a, b) => a + b, 0) / scrolls.length) : 0;

    // Timeseries daily grouping
    const dailyMap = new Map<string, { date: string; pageviews: number; visitors: Set<string>; pdfDownloads: number }>();
    for (let i = 0; i < days; i++) {
      const d = new Date(since.getTime() + i * 24 * 3600 * 1000);
      const ds = d.toISOString().slice(0, 10);
      dailyMap.set(ds, { date: ds, pageviews: 0, visitors: new Set(), pdfDownloads: 0 });
    }

    currentEvents.forEach((e) => {
      const ds = e.timestamp.toISOString().slice(0, 10);
      const entry = dailyMap.get(ds);
      if (entry) {
        if (e.type === "pageview") entry.pageviews++;
        if (e.type === "pdf_download") entry.pdfDownloads++;
        entry.visitors.add(e.visitorId);
      }
    });

    const timeseries = Array.from(dailyMap.values()).map((item) => ({
      date: item.date,
      pageviews: item.pageviews,
      visitors: item.visitors.size,
      pdfDownloads: item.pdfDownloads,
    }));

    // Acquisition aggregations
    const referrerCounts: Record<string, number> = {};
    const utmSourceCounts: Record<string, number> = {};
    const utmMediumCounts: Record<string, number> = {};
    const utmCampaignCounts: Record<string, number> = {};
    const channelSplit = { direct: 0, social: 0, search: 0, other: 0 };

    currentEvents.forEach((e) => {
      if (e.type === "pageview") {
        const ref = e.referrerHost || "Direct";
        referrerCounts[ref] = (referrerCounts[ref] || 0) + 1;

        if (ref === "Direct") {
          channelSplit.direct++;
        } else if (/linkedin|twitter|t\.co|facebook|instagram|reddit/i.test(ref)) {
          channelSplit.social++;
        } else if (/google|bing|yahoo|duckduckgo|yandex/i.test(ref)) {
          channelSplit.search++;
        } else {
          channelSplit.other++;
        }

        if (e.utmSource) {
          utmSourceCounts[e.utmSource] = (utmSourceCounts[e.utmSource] || 0) + 1;
        }
        if (e.utmMedium) {
          utmMediumCounts[e.utmMedium] = (utmMediumCounts[e.utmMedium] || 0) + 1;
        }
        if (e.utmCampaign) {
          utmCampaignCounts[e.utmCampaign] = (utmCampaignCounts[e.utmCampaign] || 0) + 1;
        }
      }
    });

    // Audience aggregations
    const countryCounts: Record<string, number> = {};
    const deviceCounts: Record<string, number> = {};
    const browserCounts: Record<string, number> = {};
    const osCounts: Record<string, number> = {};
    const localeCounts: Record<string, number> = {};

    currentEvents.forEach((e) => {
      if (e.type === "pageview") {
        if (e.country) countryCounts[e.country] = (countryCounts[e.country] || 0) + 1;
        if (e.device) deviceCounts[e.device] = (deviceCounts[e.device] || 0) + 1;
        if (e.browser) browserCounts[e.browser] = (browserCounts[e.browser] || 0) + 1;
        if (e.os) osCounts[e.os] = (osCounts[e.os] || 0) + 1;
        if (e.locale) localeCounts[e.locale] = (localeCounts[e.locale] || 0) + 1;
      }
    });

    // Engagement aggregations (Resume-specific)
    const sectionCounts: Record<string, number> = {};
    const outboundCounts: Record<string, number> = {};
    let pdfDownloads = 0;
    const experienceViewedSessions = new Set<string>();
    const convertedSessions = new Set<string>();

    currentEvents.forEach((e) => {
      if (e.type === "section_view" && e.section) {
        sectionCounts[e.section] = (sectionCounts[e.section] || 0) + 1;
        if (e.section === "experience") {
          experienceViewedSessions.add(e.sessionId);
        }
      }
      if (e.type === "pdf_download") {
        pdfDownloads++;
        convertedSessions.add(e.sessionId);
      }
      if (e.type === "contact_submit") {
        convertedSessions.add(e.sessionId);
      }
      if (e.type === "outbound_link" && e.target) {
        outboundCounts[e.target] = (outboundCounts[e.target] || 0) + 1;
      }
    });

    const funnel = {
      totalVisits: currentSessions,
      viewedExperience: experienceViewedSessions.size,
      converted: convertedSessions.size,
      experienceRate: currentSessions > 0 ? Math.round((experienceViewedSessions.size / currentSessions) * 100) : 0,
      conversionRate: currentSessions > 0 ? Math.round((convertedSessions.size / currentSessions) * 100) : 0,
    };

    return NextResponse.json({
      overview: {
        pageviews: currentPv,
        pageviewsDiff: prevPv > 0 ? Math.round(((currentPv - prevPv) / prevPv) * 100) : 0,
        visitors: currentVisitors,
        visitorsDiff: prevVisitors > 0 ? Math.round(((currentVisitors - prevVisitors) / prevVisitors) * 100) : 0,
        sessions: currentSessions,
        sessionsDiff: prevSessions > 0 ? Math.round(((currentSessions - prevSessions) / prevSessions) * 100) : 0,
        bounceRate,
        avgDurationSec,
        avgScrollDepth,
        visitorsNow,
        pdfDownloads,
      },
      timeseries,
      acquisition: {
        referrers: Object.entries(referrerCounts)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count),
        utmSources: Object.entries(utmSourceCounts)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count),
        utmMediums: Object.entries(utmMediumCounts)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count),
        utmCampaigns: Object.entries(utmCampaignCounts)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count),
        channelSplit,
      },
      audience: {
        countries: Object.entries(countryCounts)
          .map(([code, count]) => ({ code, count }))
          .sort((a, b) => b.count - a.count),
        devices: Object.entries(deviceCounts)
          .map(([type, count]) => ({ type, count }))
          .sort((a, b) => b.count - a.count),
        browsers: Object.entries(browserCounts)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count),
        os: Object.entries(osCounts)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count),
        locales: Object.entries(localeCounts)
          .map(([locale, count]) => ({ locale, count }))
          .sort((a, b) => b.count - a.count),
      },
      engagement: {
        sections: Object.entries(sectionCounts)
          .map(([section, count]) => ({ section, count }))
          .sort((a, b) => b.count - a.count),
        outboundLinks: Object.entries(outboundCounts)
          .map(([target, count]) => ({ target, count }))
          .sort((a, b) => b.count - a.count),
        funnel,
      },
    });
  } catch (err) {
    console.error("Admin stats API error:", err);
    return NextResponse.json({ error: "Failed to load stats" }, { status: 500 });
  }
}
