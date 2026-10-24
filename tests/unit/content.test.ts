import { describe, it, expect } from "vitest";
import { getContent, LOCALES, ResumeContentSchema } from "@/content";
import { enContent } from "@/content/en";
import { faContent } from "@/content/fa";

describe("Content Layer", () => {
  it("validates English content schema strictly", () => {
    const parsed = ResumeContentSchema.safeParse(enContent);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.name).toBe("Sayyid Omid Mousavi Mehr");
      expect(parsed.data.dir).toBe("ltr");
      expect(parsed.data.jobs.length).toBeGreaterThanOrEqual(3);
      expect(parsed.data.projects.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("validates Persian content schema strictly with RTL", () => {
    const parsed = ResumeContentSchema.safeParse(faContent);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.name).toContain("امید موسوی‌مهر");
      expect(parsed.data.dir).toBe("rtl");
      expect(parsed.data.jobs.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("retrieves content reliably by locale or falls back to English", () => {
    const en = getContent("en");
    expect(en.locale).toBe("en");

    const fa = getContent("fa");
    expect(fa.locale).toBe("fa");

    const fallback = getContent("de" as any);
    expect(fallback.locale).toBe("en");
  });

  it("ensures all required sections exist for ATS compatibility", () => {
    for (const locale of LOCALES) {
      const c = getContent(locale);
      expect(c.sections.about).toBeTruthy();
      expect(c.sections.experience).toBeTruthy();
      expect(c.sections.projects).toBeTruthy();
      expect(c.sections.skills).toBeTruthy();
      expect(c.sections.education).toBeTruthy();
      expect(c.sections.contact).toBeTruthy();
      expect(c.contact.email).toBe("s.omid.m.mehr@gmail.com");
    }
  });
});
