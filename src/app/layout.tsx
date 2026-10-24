import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

// Self-hosted fonts with zero external Google Fonts network calls
const geistSans = localFont({
  src: "../fonts/Geist-Variable.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "optional",
  preload: true,
  fallback: ["ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
});

const geistMono = localFont({
  src: "../fonts/GeistMono-Variable.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "optional",
  preload: false,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
});

const vazirmatn = localFont({
  src: "../fonts/Vazirmatn-Variable.woff2",
  variable: "--font-vazirmatn",
  weight: "100 900",
  display: "optional",
  preload: false,
  fallback: ["system-ui", "tahoma", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: {
    default: "Sayyid Omid Mousavi Mehr — Senior Data Engineer · Agentic Systems",
    template: "%s | Sayyid Omid Mousavi Mehr",
  },
  description:
    "Senior Data Engineer · Agentic Systems. 7+ years in data engineering, system architecture, ETL/ELT pipelines, Node.js, TypeScript, Python, PostgreSQL, microservices, and AI-agent / Spec-Driven Development workflows.",
  keywords: [
    "Senior Data Engineer",
    "Agentic Systems",
    "Spec-Driven Development",
    "SDD",
    "ETL Pipelines",
    "ELT",
    "TypeScript",
    "Python",
    "Node.js",
    "PostgreSQL",
    "Microkernel",
    "Microservices",
    "Sayyid Omid Mousavi Mehr",
  ],
  authors: [{ name: "Sayyid Omid Mousavi Mehr", url: "https://github.com/SOMM-55" }],
  creator: "Sayyid Omid Mousavi Mehr",
  icons: {
    icon: "/favicon.ico",
  },
  other: {
    "build-version": "0.1.0",
    "commit-sha": process.env.GIT_COMMIT_SHA || "3651320",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${vazirmatn.variable} antialiased bg-background text-foreground min-h-screen selection:bg-teal-500/20 selection:text-teal-600 dark:selection:text-teal-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
