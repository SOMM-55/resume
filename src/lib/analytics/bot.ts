const KNOWN_BOTS: Array<{ name: string; pattern: RegExp }> = [
  { name: "Googlebot", pattern: /googlebot/i },
  { name: "Bingbot", pattern: /bingbot/i },
  { name: "Baiduspider", pattern: /baiduspider/i },
  { name: "YandexBot", pattern: /yandexbot/i },
  { name: "DuckDuckBot", pattern: /duckduckbot/i },
  { name: "Sogou", pattern: /sogou/i },
  { name: "Exabot", pattern: /exabot/i },
  { name: "facebookexternalhit", pattern: /facebookexternalhit/i },
  { name: "LinkedInBot", pattern: /linkedinbot/i },
  { name: "Twitterbot", pattern: /twitterbot/i },
  { name: "Slackbot", pattern: /slackbot/i },
  { name: "TelegramBot", pattern: /telegrambot/i },
  { name: "WhatsApp", pattern: /whatsapp/i },
  { name: "Discordbot", pattern: /discordbot/i },
  { name: "Applebot", pattern: /applebot/i },
  { name: "ClaudeBot", pattern: /claudebot|anthropic/i },
  { name: "GPTBot", pattern: /gptbot|chatgpt-user/i },
  { name: "Bytespider", pattern: /bytespider/i },
  { name: "AhrefsBot", pattern: /ahrefsbot/i },
  { name: "SemrushBot", pattern: /semrushbot/i },
  { name: "MJ12bot", pattern: /mj12bot/i },
  { name: "DotBot", pattern: /dotbot/i },
  { name: "UptimeRobot", pattern: /uptimerobot/i },
  { name: "HeadlessChrome", pattern: /headlesschrome/i },
  { name: "Lighthouse", pattern: /lighthouse|chrome-lighthouse/i },
  { name: "curl", pattern: /^curl\//i },
  { name: "Wget", pattern: /^wget\//i },
  { name: "python-requests", pattern: /python-requests/i },
  { name: "Go-http-client", pattern: /go-http-client/i },
  { name: "Postman", pattern: /postmanruntime/i },
  { name: "GenericBot", pattern: /bot|spider|crawl|scraper/i },
];

export function detectBot(userAgent: string | null | undefined): {
  isBot: boolean;
  botName?: string;
} {
  if (!userAgent || userAgent.trim().length === 0) {
    return { isBot: true, botName: "Empty-UA" };
  }
  for (const bot of KNOWN_BOTS) {
    if (bot.pattern.test(userAgent)) {
      return { isBot: true, botName: bot.name };
    }
  }
  return { isBot: false };
}

export function detectDevice(userAgent: string | null | undefined): "mobile" | "tablet" | "desktop" {
  if (!userAgent) return "desktop";
  if (/(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk)/i.test(userAgent)) {
    return "tablet";
  }
  if (/(mobi|ipod|phone|blackberry|opera mini|fennec|minimo)/i.test(userAgent)) {
    return "mobile";
  }
  return "desktop";
}

export function detectBrowser(userAgent: string | null | undefined): string {
  if (!userAgent) return "Unknown";
  if (/edg\//i.test(userAgent)) return "Edge";
  if (/chrome|crios/i.test(userAgent) && !/opr|opera/i.test(userAgent)) return "Chrome";
  if (/firefox|fxios/i.test(userAgent)) return "Firefox";
  if (/safari/i.test(userAgent) && !/chrome|crios/i.test(userAgent)) return "Safari";
  if (/opr|opera/i.test(userAgent)) return "Opera";
  return "Other";
}

export function detectOS(userAgent: string | null | undefined): string {
  if (!userAgent) return "Unknown";
  if (/macintosh|mac os x/i.test(userAgent)) return "macOS";
  if (/windows/i.test(userAgent)) return "Windows";
  if (/android/i.test(userAgent)) return "Android";
  if (/iphone|ipad|ipod/i.test(userAgent)) return "iOS";
  if (/linux/i.test(userAgent)) return "Linux";
  return "Other";
}
