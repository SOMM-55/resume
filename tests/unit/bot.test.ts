import { describe, it, expect } from "vitest";
import {
  detectBot,
  detectDevice,
  detectBrowser,
  detectOS,
} from "@/lib/analytics/bot";

describe("Bot & Device Detection", () => {
  it("identifies search bots and scrapers correctly", () => {
    expect(detectBot("Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)").isBot).toBe(true);
    expect(detectBot("curl/7.81.0").isBot).toBe(true);
    expect(detectBot("Mozilla/5.0 HeadlessChrome/114.0.5735.133").isBot).toBe(true);
    expect(detectBot("PostmanRuntime/7.32.2").isBot).toBe(true);
    expect(detectBot("").isBot).toBe(true);
  });

  it("identifies normal human browsers as non-bot", () => {
    const chrome = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
    expect(detectBot(chrome).isBot).toBe(false);
  });

  it("classifies mobile, tablet, and desktop devices accurately", () => {
    const mobile = "Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1";
    expect(detectDevice(mobile)).toBe("mobile");

    const tablet = "Mozilla/5.0 (iPad; CPU OS 16_5 like Mac OS X) AppleWebKit/605.1.15";
    expect(detectDevice(tablet)).toBe("tablet");

    const desktop = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
    expect(detectDevice(desktop)).toBe("desktop");
  });

  it("detects OS and Browser types", () => {
    const macChrome = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
    expect(detectOS(macChrome)).toBe("macOS");
    expect(detectBrowser(macChrome)).toBe("Chrome");
  });
});
