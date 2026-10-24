import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent, isValidLocale, LOCALES } from "@/content";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Education } from "@/components/education";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const content = getContent(locale);

  return {
    title: `Print Preview — ${content.name} Resume`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function PrintResumePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  const content = getContent(locale);

  return (
    <div dir={content.dir} lang={content.locale} className="min-h-screen bg-background text-foreground print:bg-white print:text-black">
      {/* Locale-specific critical font preload */}
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

      <header className="no-print p-4 bg-secondary border-b border-border text-center text-xs space-y-2">
        <p className="font-medium text-foreground">
          Print Preview Mode. Press <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono font-bold">Ctrl+P</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono font-bold">⌘P</kbd> to print to PDF.
        </p>
      </header>

      <main id="main" className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 print:py-0 print:px-0">
        <Hero content={content} />
        <About content={content} />
        <Experience content={content} />
        <Projects content={content} />
        <Skills content={content} />
        <Education content={content} />
        <ContactSection content={content} />
        <Footer content={content} />
      </main>
    </div>
  );
}
