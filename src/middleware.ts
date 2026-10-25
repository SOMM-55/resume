import { NextResponse, type NextRequest } from "next/server";
import { verifySessionToken } from "./lib/auth-token";

const ADMIN_COOKIE_NAME = "admin_session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Content Security Policy
  const cspHeader = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; ");

  function applySecurityHeaders(res: NextResponse): NextResponse {
    res.headers.set("X-Content-Type-Options", "nosniff");
    res.headers.set("X-Frame-Options", "DENY");
    res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    res.headers.set(
      "Permissions-Policy",
      "camera=(), microphone=(), geolocation=(), browsing-topics=()"
    );
    res.headers.set(
      "Strict-Transport-Security",
      "max-age=63072000; includeSubDomains; preload"
    );
    res.headers.set("Content-Security-Policy", cspHeader);
    return res;
  }

  // 1. Root redirect: / -> /en or /fa based on accept-language
  if (pathname === "/") {
    const acceptLang = request.headers.get("accept-language") || "";
    const preferredLocale = acceptLang.toLowerCase().includes("fa") ? "fa" : "en";
    const redirectRes = NextResponse.redirect(new URL(`/${preferredLocale}`, request.url));
    return applySecurityHeaders(redirectRes);
  }

  // 2. Security headers for all responses
  const response = applySecurityHeaders(NextResponse.next());

  // 3. Admin routes gating and noindex protection
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive, nosnippet");

    const isLoginPage = pathname === "/admin/login" || pathname === "/api/admin/login";
    if (!isLoginPage) {
      const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
      const secret = process.env.AUTH_SECRET || "dev_secret_local_testing_at_least_32_characters_long_super_secret";
      const valid = await verifySessionToken(token, secret, process.env.ADMIN_USERNAME || "admin");

      if (!valid) {
        if (pathname.startsWith("/api/")) {
          return new NextResponse(
            JSON.stringify({ error: "Unauthorized" }),
            {
              status: 401,
              headers: {
                "Content-Type": "application/json",
                "X-Robots-Tag": "noindex, nofollow",
              },
            }
          );
        }
        const loginUrl = new URL("/admin/login", request.url);
        loginUrl.searchParams.set("from", pathname);
        const loginRedirect = NextResponse.redirect(loginUrl);
        loginRedirect.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive, nosnippet");
        return applySecurityHeaders(loginRedirect);
      }
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ttf|woff|woff2)).*)",
  ],
};
