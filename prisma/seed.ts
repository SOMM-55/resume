import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Settings
  const settings = [
    { key: "data_retention_months", value: "13" },
    { key: "filter_bots", value: "true" },
    { key: "excluded_ips", value: "" },
    { key: "excluded_user_agents", value: "curl,PostmanRuntime" },
  ];
  for (const s of settings) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    });
  }

  // 2. Sample contact messages
  const sampleMessages = [
    {
      name: "Anna Lindqvist",
      email: "anna.l@nordic-ai.se",
      message:
        "Hi Sayyid Omid, we came across your work in agentic systems and data pipelines. We are expanding our AI platform team in Stockholm and offer full visa sponsorship. Would you be open to an introductory call next week?",
      locale: "en",
      country: "SE",
      read: false,
      archived: false,
      createdAt: new Date(Date.now() - 2 * 3600 * 1000), // 2 hours ago
    },
    {
      name: "Marcus Weber",
      email: "marcus.weber@berlin-data.de",
      message:
        "Impressive background with microkernel architectures and the SDD workflow. We have an open Senior Data Engineer role in Berlin. Let me know if you are interested.",
      locale: "en",
      country: "DE",
      read: true,
      archived: false,
      createdAt: new Date(Date.now() - 2 * 24 * 3600 * 1000), // 2 days ago
    },
    {
      name: "رضا کریمی",
      email: "r.karimi@tech-iran.ir",
      message:
        "سلام مهندس موسوی‌مهر، ارائه شما درباره الگوی میکروکرنل دلتا بسیار مفید بود. آیا برای مشاوره فنی امکان ارتباط وجود دارد؟",
      locale: "fa",
      country: "IR",
      read: true,
      archived: true,
      createdAt: new Date(Date.now() - 7 * 24 * 3600 * 1000), // 7 days ago
    },
  ];

  for (const msg of sampleMessages) {
    const existing = await prisma.contactMessage.findFirst({
      where: { email: msg.email },
    });
    if (!existing) {
      await prisma.contactMessage.create({ data: msg });
    }
  }

  // 3. Check if analytics events already exist; if not, generate 30 days of data
  const existingEventsCount = await prisma.visitorEvent.count();
  if (existingEventsCount === 0) {
    console.log("Generating sample analytics events for the past 30 days...");
    const countries = ["DE", "NL", "SE", "US", "IR", "GB", "CH", "CA"];
    const devices = ["desktop", "desktop", "desktop", "mobile", "tablet"];
    const browsers = ["Chrome", "Firefox", "Safari", "Edge"];
    const osList = ["macOS", "Windows", "Linux", "iOS", "Android"];
    const referrers = [
      { host: "linkedin.com", ref: "https://www.linkedin.com/in/sommehr" },
      { host: "github.com", ref: "https://github.com/SOMM-55" },
      { host: "t.co", ref: "https://t.co/somm" },
      { host: "news.ycombinator.com", ref: "https://news.ycombinator.com/" },
      { host: null, ref: null }, // direct
    ];
    const utms = [
      { source: "linkedin", medium: "profile", campaign: "header-link" },
      { source: "linkedin", medium: "message", campaign: "recruiter-outreach" },
      { source: "email", medium: "signature", campaign: "application" },
      { source: null, medium: null, campaign: null },
    ];
    const sections = [
      "about",
      "experience",
      "projects",
      "skills",
      "education",
      "contact",
    ];

    const now = Date.now();
    const dayMs = 24 * 3600 * 1000;

    // Generate ~400 events spread over 30 days
    for (let dayOffset = 29; dayOffset >= 0; dayOffset--) {
      const dayDate = new Date(now - dayOffset * dayMs);
      const dateStr = dayDate.toISOString().slice(0, 10);
      const visitorsToday = Math.floor(8 + Math.random() * 14);

      let dailyPageviews = 0;
      let dailyPdfDownloads = 0;
      let dailyDurationSum = 0;

      for (let v = 0; v < visitorsToday; v++) {
        const visitorId = `seed_v_${dateStr}_${v}`;
        const sessionId = `seed_s_${dateStr}_${v}`;
        const country = countries[Math.floor(Math.random() * countries.length)];
        const device = devices[Math.floor(Math.random() * devices.length)];
        const browser = browsers[Math.floor(Math.random() * browsers.length)];
        const os = osList[Math.floor(Math.random() * osList.length)];
        const refObj = referrers[Math.floor(Math.random() * referrers.length)];
        const utmObj = utms[Math.floor(Math.random() * utms.length)];
        const locale = Math.random() > 0.3 ? "en" : "fa";
        const isBot = Math.random() < 0.08;
        const duration = isBot ? 1 : Math.floor(25 + Math.random() * 180);
        const scrollDepth = isBot ? 10 : Math.floor(40 + Math.random() * 60);

        const timeOffset = Math.floor(Math.random() * dayMs);
        const eventTime = new Date(dayDate.getTime() + timeOffset);

        // Pageview
        await prisma.visitorEvent.create({
          data: {
            visitorId,
            sessionId,
            type: "pageview",
            path: `/${locale}`,
            referrer: refObj.ref,
            referrerHost: refObj.host,
            utmSource: utmObj.source,
            utmMedium: utmObj.medium,
            utmCampaign: utmObj.campaign,
            country,
            device,
            browser,
            os,
            locale,
            isBot,
            duration,
            scrollDepth,
            timestamp: eventTime,
          },
        });
        dailyPageviews++;
        dailyDurationSum += duration;

        // Section views (human visitors view 2-4 sections)
        if (!isBot) {
          const viewedSections = sections.slice(0, 2 + Math.floor(Math.random() * 4));
          for (const s of viewedSections) {
            await prisma.visitorEvent.create({
              data: {
                visitorId,
                sessionId,
                type: "section_view",
                path: `/${locale}`,
                section: s,
                country,
                device,
                browser,
                os,
                locale,
                isBot: false,
                timestamp: new Date(eventTime.getTime() + 15000),
              },
            });
          }

          // Some download PDF (~20% of visitors)
          if (Math.random() < 0.22) {
            await prisma.visitorEvent.create({
              data: {
                visitorId,
                sessionId,
                type: "pdf_download",
                path: `/${locale}`,
                target: `sayyid-omid-mousavi-mehr-resume-${locale}.pdf`,
                country,
                device,
                browser,
                os,
                locale,
                isBot: false,
                timestamp: new Date(eventTime.getTime() + 45000),
              },
            });
            dailyPdfDownloads++;
          }

          // Outbound clicks
          if (Math.random() < 0.35) {
            const outTarget =
              Math.random() > 0.5
                ? "https://github.com/SOMM-55"
                : "https://linkedin.com/in/sommehr";
            await prisma.visitorEvent.create({
              data: {
                visitorId,
                sessionId,
                type: "outbound_link",
                path: `/${locale}`,
                target: outTarget,
                country,
                device,
                browser,
                os,
                locale,
                isBot: false,
                timestamp: new Date(eventTime.getTime() + 30000),
              },
            });
          }
        }
      }

      // Upsert DailyRollup
      await prisma.dailyRollup.upsert({
        where: {
          date_metric_dimension: {
            date: dateStr,
            metric: "pageviews",
            dimension: "",
          },
        },
        update: { count: dailyPageviews },
        create: {
          date: dateStr,
          metric: "pageviews",
          dimension: "",
          count: dailyPageviews,
        },
      });

      await prisma.dailyRollup.upsert({
        where: {
          date_metric_dimension: {
            date: dateStr,
            metric: "visitors",
            dimension: "",
          },
        },
        update: { count: visitorsToday },
        create: {
          date: dateStr,
          metric: "visitors",
          dimension: "",
          count: visitorsToday,
        },
      });

      await prisma.dailyRollup.upsert({
        where: {
          date_metric_dimension: {
            date: dateStr,
            metric: "pdf_downloads",
            dimension: "",
          },
        },
        update: { count: dailyPdfDownloads },
        create: {
          date: dateStr,
          metric: "pdf_downloads",
          dimension: "",
          count: dailyPdfDownloads,
        },
      });

      // Sample request logs for this day
      for (let r = 0; r < 12; r++) {
        await prisma.requestLog.create({
          data: {
            path: Math.random() > 0.5 ? "/en" : "/fa",
            method: "GET",
            status: 200,
            durationMs: Math.floor(18 + Math.random() * 65),
            country: countries[Math.floor(Math.random() * countries.length)],
            device: devices[Math.floor(Math.random() * devices.length)],
            isBot: Math.random() < 0.1,
            timestamp: new Date(dayDate.getTime() + r * 3600 * 1000),
          },
        });
      }
    }
    console.log("Analytics seed completed successfully.");
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
