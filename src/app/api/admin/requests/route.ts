import { NextResponse, type NextRequest } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.min(100, Math.max(10, parseInt(searchParams.get("limit") || "25", 10)));
  const filter = searchParams.get("filter") || "all"; // all, humans, bots, errors

  const where: { isBot?: boolean; status?: { gte: number } } = {};
  if (filter === "humans") where.isBot = false;
  else if (filter === "bots") where.isBot = true;
  else if (filter === "errors") where.status = { gte: 400 };

  try {
    const [logs, total, humanCount, botCount, errorCount, slowestLogs] = await Promise.all([
      prisma.requestLog.findMany({
        where,
        orderBy: { timestamp: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.requestLog.count({ where }),
      prisma.requestLog.count({ where: { isBot: false } }),
      prisma.requestLog.count({ where: { isBot: true } }),
      prisma.requestLog.count({ where: { status: { gte: 400 } } }),
      prisma.requestLog.findMany({
        orderBy: { durationMs: "desc" },
        take: 5,
        select: { path: true, durationMs: true, status: true, timestamp: true },
      }),
    ]);

    return NextResponse.json({
      logs,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      stats: {
        humanCount,
        botCount,
        errorCount,
        slowestRoutes: slowestLogs,
      },
    });
  } catch (err) {
    console.error("Requests log API error:", err);
    return NextResponse.json({ error: "Failed to load requests" }, { status: 500 });
  }
}
