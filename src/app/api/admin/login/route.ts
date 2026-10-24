import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { authenticateAdmin, createSessionToken, ADMIN_COOKIE_NAME } from "@/lib/auth";

const LoginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
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
    const body = await req.json().catch(() => null);
    const parsed = LoginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Username and password required" }, { status: 400 });
    }

    const { username, password } = parsed.data;
    const ip = getClientIp(req);

    const result = await authenticateAdmin(username, password, ip);
    if (!result.success) {
      return NextResponse.json({ error: result.error || "Authentication failed" }, { status: 401 });
    }

    const token = await createSessionToken(username);

    const res = NextResponse.json({ success: true });
    res.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return res;
  } catch (err) {
    console.error("Admin login error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
