import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { getContent, isValidLocale, LOCALES, type Locale } from "@/content";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { Skills } from "@/components/skills";
import { Education } from "@/components/education";
import { Footer } from "@/components/footer";
import { AnalyticsTracker } from "@/components/analytics-tracker";
import { Projects } from "@/components/projects";
import { ThemeProvider } from "@/components/theme-provider";

const ContactSection = dynamic(() =>
  import("@/components/contact-section").then((mod) => mod.ContactSection)
);

interface PageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const content = getContent(locale);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return {
    title: `${content.name} — ${content.headline}`,
    description: content.about,
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        en: `${baseUrl}/en`,
        fa: `${baseUrl}/fa`,
      },
    },
    openGraph: {
      title: `${content.name} — ${content.headline}`,
      description: content.subheadline,
      url: `${baseUrl}/${locale}`,
      siteName: `${content.name} Resume`,
      locale: locale === "fa" ? "fa_IR" : "en_US",
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: `${content.name} — ${content.headline}`,
      description: content.subheadline,
    },
  };
}

export default async function ResumePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  const content = getContent(locale);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // Schema.org Person JSON-LD for rich snippets and ATS parsing
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: content.name,
    jobTitle: content.headline,
    description: content.about,
    url: `${baseUrl}/${locale}`,
    email: `mailto:${content.contact.email}`,
    telephone: content.contact.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: content.contact.location,
    },
    sameAs: [content.contact.githubHref, content.contact.linkedinHref],
    alumniOf: content.education.map((edu) => ({
      "@type": "EducationalOrganization",
      name: edu.institution,
    })),
    knowsAbout: content.skills.flatMap((s) => s.items),
  };

  return (
    <div dir={content.dir} lang={content.locale} className="min-h-screen flex flex-col bg-background print:bg-white print:text-black">
      {/* Locale-specific critical font preload with high priority */}
      {content.locale === "fa" ? (
        <link
          rel="preload"
          href="/fonts/Vazirmatn-Variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          fetchPriority="high"
        />
      ) : (
        <link
          rel="preload"
          href="/fonts/Geist-Variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          fetchPriority="high"
        />
      )}

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Navbar content={content} />
      </ThemeProvider>

      <main id="main" className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6">
        <Hero content={content} />
        <About content={content} />
        <Experience content={content} />
        <Projects
          projects={content.projects}
          sectionTitle={content.sections.projects}
          locale={content.locale}
          ui={{
            problem: content.ui.problem,
            approach: content.ui.approach,
            outcome: content.ui.outcome,
          }}
        />
        <Skills content={content} />
        <Education content={content} />
        <ContactSection
          sectionTitle={content.sections.contact}
          locale={content.locale}
          contact={content.contact}
          ui={{
            copiedToClipboard: content.ui.copiedToClipboard,
            contactFormSuccess: content.ui.contactFormSuccess,
            contactFormError: content.ui.contactFormError,
            contactFormName: content.ui.contactFormName,
            contactFormEmail: content.ui.contactFormEmail,
            contactFormMessage: content.ui.contactFormMessage,
            contactFormSending: content.ui.contactFormSending,
            contactFormSend: content.ui.contactFormSend,
          }}
        />
        <Footer content={content} />
      </main>

      <AnalyticsTracker locale={content.locale} />
    </div>
  );
}
