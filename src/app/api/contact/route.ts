import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { hashIpForRateLimit } from "@/lib/analytics/salt";
import { env } from "@/lib/env";

const ContactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address").max(120),
  message: z.string().min(5, "Message must be at least 5 characters").max(3000),
  honeypot: z.string().max(100).optional(),
  locale: z.string().max(8).optional(),
});

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return req.headers.get("x-real-ip") || "127.0.0.1";
}

export async function POST(req: NextRequest) {
  try {
    const raw = await req.json().catch(() => null);
    if (!raw) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const parsed = ContactSchema.safeParse(raw);
    if (!parsed.success) {
      const errorMsg = parsed.error.issues[0]?.message || "Invalid input";
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    const data = parsed.data;

    // Honeypot spam trap: if bot filled hidden field, return fake success
    if (data.honeypot && data.honeypot.trim().length > 0) {
      return NextResponse.json({ success: true });
    }

    // Rate limiting: max 5 contact submissions per hour per IP hash
    const ip = getClientIp(req);
    const ipHash = hashIpForRateLimit(ip);
    const oneHourAgo = new Date(Date.now() - 3600 * 1000);

    const recentCount = await prisma.contactMessage.count({
      where: {
        createdAt: { gte: oneHourAgo },
        email: data.email,
      },
    });

    if (recentCount >= 5) {
      return NextResponse.json(
        { error: "Too many submissions. Please email directly." },
        { status: 429 }
      );
    }

    const country =
      req.headers.get("x-vercel-ip-country") ||
      req.headers.get("cf-ipcountry") ||
      null;

    // Persist to database
    const saved = await prisma.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        message: data.message,
        locale: data.locale || "en",
        country,
        read: false,
        archived: false,
      },
    });

    // Optional email notification forwarding via Resend
    if (env.RESEND_API_KEY && env.CONTACT_FORWARD_EMAIL) {
      try {
        fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "resume-contact@somm.dev",
            to: env.CONTACT_FORWARD_EMAIL,
            subject: `New Resume Message from ${data.name}`,
            text: `Name: ${data.name}\nEmail: ${data.email}\nLocale: ${data.locale}\nCountry: ${country}\n\nMessage:\n${data.message}`,
          }),
        }).catch((e) => console.error("Email forward failed:", e));
      } catch (e) {
        console.error("Resend dispatch error:", e);
      }
    }

    return NextResponse.json({ success: true, id: saved.id });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Failed to process message" },
      { status: 500 }
    );
  }
}
