import { z } from "zod";

export const JobSchema = z.object({
  role: z.string(),
  company: z.string(),
  location: z.string(),
  period: z.string(),
  typeLabel: z.string(),
  modelLabel: z.string(),
  overview: z.string(),
  achievements: z.array(z.string()),
  tech: z.array(z.string()),
});

export const ProjectSchema = z.object({
  name: z.string(),
  tagline: z.string().optional(),
  problem: z.string(),
  approach: z.string(),
  outcome: z.string(),
  tech: z.array(z.string()),
  link: z.string().url().optional(),
  github: z.string().url().optional(),
});

export const SkillGroupSchema = z.object({
  label: z.string(),
  items: z.array(z.string()),
});

export const EducationSchema = z.object({
  degree: z.string(),
  institution: z.string(),
  location: z.string(),
  period: z.string(),
  grade: z.string(),
  thesis: z.string().optional(),
});

export const CertificateSchema = z.object({
  name: z.string(),
  issuer: z.string(),
  year: z.string().optional(),
});

export const LanguageKnownSchema = z.object({
  name: z.string(),
  level: z.string(),
});

export const ResumeContentSchema = z.object({
  locale: z.enum(["en", "fa"]),
  dir: z.enum(["ltr", "rtl"]),
  langName: z.string(),

  // Identity / Header
  name: z.string(),
  headline: z.string(),
  subheadline: z.string(),
  about: z.string(),

  // Relocation / availability note
  relocation: z.string(),

  // Sections labels (nav + headings)
  sections: z.object({
    about: z.string(),
    experience: z.string(),
    projects: z.string(),
    skills: z.string(),
    education: z.string(),
    certificates: z.string(),
    languages: z.string(),
    interests: z.string(),
    contact: z.string(),
  }),

  // UI labels
  ui: z.object({
    downloadPdf: z.string(),
    downloadingPdf: z.string(),
    printResume: z.string(),
    commandPalette: z.string(),
    commandPaletteHint: z.string(),
    toggleTheme: z.string(),
    toggleLanguage: z.string(),
    present: z.string(),
    technologies: z.string(),
    viewOnGithub: z.string(),
    viewLive: z.string(),
    awardLabel: z.string(),
    thesis: z.string(),
    problem: z.string(),
    approach: z.string(),
    outcome: z.string(),
    skipToContent: z.string(),
    copiedToClipboard: z.string(),
    copyLink: z.string(),
    privacyNotice: z.string(),
    privacyNoticeDetail: z.string(),
    contactCta: z.string(),
    contactDirectEmail: z.string(),
    contactFormName: z.string(),
    contactFormEmail: z.string(),
    contactFormMessage: z.string(),
    contactFormSend: z.string(),
    contactFormSending: z.string(),
    contactFormSuccess: z.string(),
    contactFormError: z.string(),
    visitorsOnline: z.string(),
  }),

  contact: z.object({
    email: z.string(),
    phone: z.string(),
    phoneHref: z.string(),
    location: z.string(),
    linkedin: z.string(),
    linkedinHref: z.string(),
    github: z.string(),
    githubHref: z.string(),
  }),

  jobs: z.array(JobSchema),
  projects: z.array(ProjectSchema),
  skills: z.array(SkillGroupSchema),
  education: z.array(EducationSchema),
  certificates: z.array(CertificateSchema),
  languagesKnown: z.array(LanguageKnownSchema),
  interests: z.array(z.string()),
  award: z.string(),
});

export type Job = z.infer<typeof JobSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type SkillGroup = z.infer<typeof SkillGroupSchema>;
export type Education = z.infer<typeof EducationSchema>;
export type Certificate = z.infer<typeof CertificateSchema>;
export type LanguageKnown = z.infer<typeof LanguageKnownSchema>;
export type ResumeContent = z.infer<typeof ResumeContentSchema>;
export type Locale = "en" | "fa";
