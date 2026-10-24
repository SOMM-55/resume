export interface SessionPayload {
  username: string;
  exp: number;
}

/**
 * Edge- and Node-compatible HMAC-SHA256 signature using standard Web Crypto API.
 */
async function signWithWebCrypto(data: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(data));
  return Buffer.from(signature).toString("base64url");
}

export async function createSessionToken(
  username: string,
  secret: string,
  ttlMs = 7 * 24 * 60 * 60 * 1000
): Promise<string> {
  const exp = Date.now() + ttlMs;
  const payload: SessionPayload = { username, exp };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = await signWithWebCrypto(encoded, secret);
  return `${encoded}.${signature}`;
}

export async function verifySessionToken(
  token: string | null | undefined,
  secret: string,
  expectedUsername = "admin"
): Promise<SessionPayload | null> {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [encoded, signature] = parts;

  try {
    const expectedSignature = await signWithWebCrypto(encoded, secret);
    if (signature !== expectedSignature) {
      return null;
    }
    const decoded = JSON.parse(
      Buffer.from(encoded, "base64url").toString("utf-8")
    ) as SessionPayload;
    if (typeof decoded.exp !== "number" || Date.now() > decoded.exp) {
      return null;
    }
    if (expectedUsername && decoded.username !== expectedUsername) {
      return null;
    }
    return decoded;
  } catch {
    return null;
  }
}
