import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { env } from "./env";
import { prisma } from "./db";
import { hashIpForRateLimit } from "./analytics/salt";
import {
  createSessionToken as createToken,
  verifySessionToken as verifyToken,
  type SessionPayload,
} from "./auth-token";

export { type SessionPayload };
export const ADMIN_COOKIE_NAME = "admin_session";

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

export async function createSessionToken(username: string): Promise<string> {
  return createToken(username, env.AUTH_SECRET);
}

export async function verifySessionToken(
  token: string | null | undefined
): Promise<SessionPayload | null> {
  return verifyToken(token, env.AUTH_SECRET, env.ADMIN_USERNAME);
}

/**
 * Rate limit check for admin login.
 */
export async function checkLoginLockout(ip: string): Promise<{ locked: boolean; remainingMs?: number }> {
  const ipHash = hashIpForRateLimit(ip);
  const since = new Date(Date.now() - LOCKOUT_WINDOW_MS);

  const recentFailures = await prisma.loginAttempt.count({
    where: {
      identifier: env.ADMIN_USERNAME,
      ipHash,
      success: false,
      timestamp: { gte: since },
    },
  });

  if (recentFailures >= MAX_FAILED_ATTEMPTS) {
    return { locked: true, remainingMs: LOCKOUT_WINDOW_MS };
  }
  return { locked: false };
}

/**
 * Records a login attempt.
 */
export async function recordLoginAttempt(ip: string, success: boolean): Promise<void> {
  const ipHash = hashIpForRateLimit(ip);
  await prisma.loginAttempt.create({
    data: {
      identifier: env.ADMIN_USERNAME,
      success,
      ipHash,
    },
  });
}

/**
 * Validates login credentials against env vars.
 */
export async function authenticateAdmin(
  username: string,
  password: string,
  ip: string
): Promise<{ success: boolean; error?: string }> {
  const lockout = await checkLoginLockout(ip);
  if (lockout.locked) {
    return {
      success: false,
      error: "Too many failed attempts. Account locked for 15 minutes.",
    };
  }

  const usernameMatch = username.trim() === env.ADMIN_USERNAME;
  let passwordMatch = false;
  try {
    passwordMatch = await bcrypt.compare(password, env.ADMIN_PASSWORD_HASH);
  } catch {
    passwordMatch = false;
  }

  const ok = usernameMatch && passwordMatch;
  await recordLoginAttempt(ip, ok);

  if (!ok) {
    return { success: false, error: "Invalid username or password" };
  }

  return { success: true };
}

/**
 * Helper to check current admin session from server components/route handlers.
 */
export async function getCurrentAdmin(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}
