import { NextResponse, type NextRequest } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const format = searchParams.get("format") || "json"; // json or csv

  try {
    const events = await prisma.visitorEvent.findMany({
      orderBy: { timestamp: "desc" },
      take: 5000,
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
        country: true,
        device: true,
        browser: true,
        os: true,
        locale: true,
        isBot: true,
        duration: true,
        scrollDepth: true,
        timestamp: true,
      },
    });

    if (format === "csv") {
      const headers = [
        "id",
        "timestamp",
        "type",
        "path",
        "section",
        "target",
        "referrerHost",
        "utmSource",
        "country",
        "device",
        "browser",
        "os",
        "locale",
        "isBot",
        "duration",
        "scrollDepth",
      ];
      const rows = events.map((e) => [
        e.id,
        e.timestamp.toISOString(),
        e.type,
        e.path,
        e.section || "",
        `"${(e.target || "").replace(/"/g, '""')}"`,
        e.referrerHost || "",
        e.utmSource || "",
        e.country || "",
        e.device || "",
        e.browser || "",
        e.os || "",
        e.locale || "",
        e.isBot ? "true" : "false",
        e.duration ?? "",
        e.scrollDepth ?? "",
      ]);

      const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
      return new NextResponse(csvContent, {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="analytics-export-${new Date().toISOString().slice(0, 10)}.csv"`,
        },
      });
    }

    return new NextResponse(JSON.stringify(events, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Disposition": `attachment; filename="analytics-export-${new Date().toISOString().slice(0, 10)}.json"`,
      },
    });
  } catch (err) {
    console.error("Export error:", err);
    return NextResponse.json({ error: "Export failed" }, { status: 500 });
  }
}
