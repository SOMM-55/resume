import { describe, it, expect } from "vitest";
import { createSessionToken, verifySessionToken } from "@/lib/auth-token";

describe("Admin Auth Tokens", () => {
  const secret = "test_secret_at_least_32_characters_long_super_secret";

  it("creates and verifies a valid session token", async () => {
    const token = await createSessionToken("admin", secret, 3600 * 1000);
    expect(token).toBeTruthy();
    expect(token.includes(".")).toBe(true);

    const payload = await verifySessionToken(token, secret, "admin");
    expect(payload).not.toBeNull();
    expect(payload?.username).toBe("admin");
  });

  it("rejects token with invalid signature or wrong secret", async () => {
    const token = await createSessionToken("admin", secret, 3600 * 1000);
    const tampered = token.slice(0, -4) + "XXXX";

    const payloadTampered = await verifySessionToken(tampered, secret, "admin");
    expect(payloadTampered).toBeNull();

    const payloadWrongSecret = await verifySessionToken(token, "wrong_secret_32_characters_long_key", "admin");
    expect(payloadWrongSecret).toBeNull();
  });

  it("rejects expired tokens", async () => {
    const expiredToken = await createSessionToken("admin", secret, -1000); // expired 1s ago
    const payload = await verifySessionToken(expiredToken, secret, "admin");
    expect(payload).toBeNull();
  });
});
