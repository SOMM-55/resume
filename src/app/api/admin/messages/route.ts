import { NextResponse, type NextRequest } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { z } from "zod";

export async function GET(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const filter = searchParams.get("filter") || "all"; // all, unread, archived

  const where: { read?: boolean; archived?: boolean } = {};
  if (filter === "unread") {
    where.read = false;
    where.archived = false;
  } else if (filter === "archived") {
    where.archived = true;
  } else {
    // "all" shows active messages (not archived) by default
    where.archived = false;
  }

  try {
    const [messages, unreadCount, totalCount] = await Promise.all([
      prisma.contactMessage.findMany({
        where,
        orderBy: { createdAt: "desc" },
      }),
      prisma.contactMessage.count({ where: { read: false, archived: false } }),
      prisma.contactMessage.count(),
    ]);

    return NextResponse.json({ messages, unreadCount, totalCount });
  } catch (err) {
    console.error("Messages API error:", err);
    return NextResponse.json({ error: "Failed to load messages" }, { status: 500 });
  }
}

const PatchMessageSchema = z.object({
  id: z.string(),
  read: z.boolean().optional(),
  archived: z.boolean().optional(),
});

export async function PATCH(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = PatchMessageSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const { id, read, archived } = parsed.data;
    const updated = await prisma.contactMessage.update({
      where: { id },
      data: {
        ...(typeof read === "boolean" ? { read } : {}),
        ...(typeof archived === "boolean" ? { archived } : {}),
      },
    });

    return NextResponse.json({ success: true, message: updated });
  } catch (err) {
    console.error("Message update error:", err);
    return NextResponse.json({ error: "Failed to update message" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing message ID" }, { status: 400 });
  }

  try {
    await prisma.contactMessage.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Message delete error:", err);
    return NextResponse.json({ error: "Failed to delete message" }, { status: 500 });
  }
}
