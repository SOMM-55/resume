import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { hashVisitor } from "@/lib/analytics/salt";
import {
  detectBot,
  detectDevice,
  detectBrowser,
  detectOS,
} from "@/lib/analytics/bot";
import { incrementRollups } from "@/lib/analytics/rollups";

const CollectPayloadSchema = z.object({
  sessionId: z.string().max(64),
  type: z.string().max(32),
  path: z.string().max(256),
  section: z.string().max(64).optional().nullable(),
  target: z.string().max(512).optional().nullable(),
  referrer: z.string().max(512).optional().nullable(),
  utmSource: z.string().max(64).optional().nullable(),
  utmMedium: z.string().max(64).optional().nullable(),
  utmCampaign: z.string().max(64).optional().nullable(),
  locale: z.string().max(8).optional().nullable(),
  duration: z.number().int().min(0).max(86400).optional().nullable(),
  scrollDepth: z.number().int().min(0).max(100).optional().nullable(),
});

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return req.headers.get("x-real-ip") || "127.0.0.1";
}

function getReferrerHost(ref: string | null | undefined): string | null {
  if (!ref) return null;
  try {
    const url = new URL(ref);
    return url.hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    // Respect DNT / GPC headers at server level
    const dnt = req.headers.get("dnt");
    const gpc = req.headers.get("sec-gpc");
    if (dnt === "1" || gpc === "1") {
      return new NextResponse(null, { status: 204 });
    }

    const rawBody = await req.json().catch(() => null);
    if (!rawBody) {
      return new NextResponse(null, { status: 400 });
    }

    const parsed = CollectPayloadSchema.safeParse(rawBody);
    if (!parsed.success) {
      return new NextResponse(null, { status: 400 });
    }

    const data = parsed.data;
    const ip = getClientIp(req);
    const userAgent = req.headers.get("user-agent") || "";

    // Check exclusion settings (e.g. owner IPs or test UAs)
    const [excludedIpsSetting, excludedUasSetting] = await Promise.all([
      prisma.setting.findUnique({ where: { key: "excluded_ips" } }),
      prisma.setting.findUnique({ where: { key: "excluded_user_agents" } }),
    ]);

    if (excludedIpsSetting?.value) {
      const excludedList = excludedIpsSetting.value
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      if (excludedList.includes(ip)) {
        return new NextResponse(null, { status: 204 });
      }
    }

    if (excludedUasSetting?.value && userAgent) {
      const excludedUaList = excludedUasSetting.value
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean);
      const lowerUa = userAgent.toLowerCase();
      if (excludedUaList.some((pat) => lowerUa.includes(pat))) {
        return new NextResponse(null, { status: 204 });
      }
    }

    // Edge Geo header detection (Vercel, Cloudflare, standard)
    const country =
      req.headers.get("x-vercel-ip-country") ||
      req.headers.get("cf-ipcountry") ||
      req.headers.get("x-country-code") ||
      null;

    const { isBot } = detectBot(userAgent);
    const device = detectDevice(userAgent);
    const browser = detectBrowser(userAgent);
    const os = detectOS(userAgent);

    // Compute privacy-first daily visitor identifier
    // RAW IP AND USER AGENT ARE DISCARDED IMMEDIATELY
    const now = new Date();
    const visitorId = hashVisitor(ip, userAgent, now);
    const dateStr = now.toISOString().slice(0, 10);
    const referrerHost = getReferrerHost(data.referrer);

    // Persist event in Prisma
    await prisma.visitorEvent.create({
      data: {
        visitorId,
        sessionId: data.sessionId,
        type: data.type,
        path: data.path,
        section: data.section || null,
        target: data.target || null,
        referrer: data.referrer || null,
        referrerHost,
        utmSource: data.utmSource || null,
        utmMedium: data.utmMedium || null,
        utmCampaign: data.utmCampaign || null,
        country,
        device,
        browser,
        os,
        locale: data.locale || null,
        isBot,
        duration: data.duration ?? null,
        scrollDepth: data.scrollDepth ?? null,
        timestamp: now,
      },
    });

    // Fire-and-forget rollup counter increments
    if (!isBot) {
      const rollupsToIncrement: Array<{
        date: string;
        metric: string;
        dimension?: string;
      }> = [];
      if (data.type === "pageview") {
        rollupsToIncrement.push({ date: dateStr, metric: "pageviews" });
        if (country) {
          rollupsToIncrement.push({ date: dateStr, metric: "country", dimension: country });
        }
        if (device) {
          rollupsToIncrement.push({ date: dateStr, metric: "device", dimension: device });
        }
        if (referrerHost) {
          rollupsToIncrement.push({ date: dateStr, metric: "referrer", dimension: referrerHost });
        }
        if (data.utmSource) {
          rollupsToIncrement.push({ date: dateStr, metric: "utm_source", dimension: data.utmSource });
        }
      } else if (data.type === "pdf_download") {
        rollupsToIncrement.push({ date: dateStr, metric: "pdf_downloads" });
      } else if (data.type === "section_view" && data.section) {
        rollupsToIncrement.push({ date: dateStr, metric: "section", dimension: data.section });
      }

      if (rollupsToIncrement.length > 0) {
        incrementRollups(rollupsToIncrement).catch(() => {});
      }
    }

    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error("Analytics collect error:", err);
    return new NextResponse(null, { status: 500 });
  }
}
