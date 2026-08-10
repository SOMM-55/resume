import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
