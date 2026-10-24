import { describe, it, expect } from "vitest";
import { getDailySalt, hashVisitor, hashIpForRateLimit } from "@/lib/analytics/salt";

describe("Privacy & Salt Hashing", () => {
  it("produces identical visitor hashes on the same day", () => {
    const now = new Date("2026-10-24T12:00:00Z");
    const hash1 = hashVisitor("192.168.1.100", "Mozilla/5.0 Chrome", now);
    const hash2 = hashVisitor("192.168.1.100", "Mozilla/5.0 Chrome", now);
    expect(hash1).toBe(hash2);
    expect(hash1.length).toBe(24);
  });

  it("produces different visitor hashes on different days (daily salt rotation)", () => {
    const day1 = new Date("2026-10-24T12:00:00Z");
    const day2 = new Date("2026-10-25T12:00:00Z");

    const hashDay1 = hashVisitor("192.168.1.100", "Mozilla/5.0 Chrome", day1);
    const hashDay2 = hashVisitor("192.168.1.100", "Mozilla/5.0 Chrome", day2);

    expect(hashDay1).not.toBe(hashDay2);
  });

  it("generates deterministic rate limit hash per hour bucket", () => {
    const rl1 = hashIpForRateLimit("192.168.1.50");
    const rl2 = hashIpForRateLimit("192.168.1.50");
    expect(rl1).toBe(rl2);
    expect(rl1.length).toBe(20);
  });
});
