import crypto from "node:crypto";
import { env } from "../env";

/**
 * Returns a cryptographically derived daily salt for the given date (UTC).
 * Uses ANALYTICS_SALT_SECRET as key to hash the YYYY-MM-DD string.
 */
export function getDailySalt(date: Date = new Date()): string {
  const dateStr = date.toISOString().slice(0, 10);
  return crypto
    .createHmac("sha256", env.ANALYTICS_SALT_SECRET)
    .update(dateStr)
    .digest("hex");
}

/**
 * Hashes (IP + UserAgent) with the daily salt.
 * Raw IP and UserAgent are discarded immediately after this computation.
 * Returns a 24-character hexadecimal identifier valid only for the current day.
 */
export function hashVisitor(
  ip: string,
  userAgent: string,
  date: Date = new Date()
): string {
  const salt = getDailySalt(date);
  const normalizedIp = ip.trim().toLowerCase();
  const normalizedUa = userAgent.trim().slice(0, 256);

  return crypto
    .createHmac("sha256", salt)
    .update(`${normalizedIp}::${normalizedUa}`)
    .digest("hex")
    .slice(0, 24);
}

/**
 * Hashes an IP address for short-term rate-limiting checks (1 hour window).
 * Raw IP is discarded.
 */
export function hashIpForRateLimit(ip: string): string {
  const hourBucket = Math.floor(Date.now() / (3600 * 1000));
  return crypto
    .createHmac("sha256", env.AUTH_SECRET)
    .update(`rl::${ip}::${hourBucket}`)
    .digest("hex")
    .slice(0, 20);
}
