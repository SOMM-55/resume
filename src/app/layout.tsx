import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

// Geist served locally from /public/fonts to avoid Google Fonts network dependency.
// Variable TTF covers weights 100..900 in a single file.
const geistSans = localFont({
  src: "../../public/fonts/Geist-Variable.ttf",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "../../public/fonts/GeistMono-Variable.ttf",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sayyid Omid Mousavi Mehr — Senior Data Engineer · Agentic Systems",
  description:
    "Full-Stack Developer | Data Engineer with 7+ years of experience in data engineering, system architecture, Node.js, TypeScript, Python, PostgreSQL, microservices, ETL, and agentic / Spec-Driven Development.",
  keywords: [
    "Full-Stack Developer",
    "Data Engineer",
    "Node.js",
    "TypeScript",
    "Python",
    "PostgreSQL",
    "Microservices",
    "ETL",
    "Spec-Driven Development",
    "SDD",
    "Agentic Development",
    "Sayyid Omid Mousavi Mehr",
  ],
  authors: [{ name: "Sayyid Omid Mousavi Mehr" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Sayyid Omid Mousavi Mehr — Full-Stack Developer",
    description:
      "Full-Stack Developer | Data Engineering & System Architecture | 7 years experience",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sayyid Omid Mousavi Mehr — Full-Stack Developer",
    description:
      "Full-Stack Developer | Data Engineering & System Architecture | 7 years experience",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
