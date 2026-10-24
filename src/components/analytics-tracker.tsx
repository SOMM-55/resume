"use client";

import * as React from "react";
import Script from "next/script";

interface AnalyticsTrackerProps {
  locale: string;
}

export function AnalyticsTracker({ locale }: AnalyticsTrackerProps) {
  React.useEffect(() => {
    // Respect Do Not Track and Global Privacy Control
    if (typeof navigator !== "undefined") {
      const dnt = navigator.doNotTrack || (window as unknown as { doNotTrack?: string }).doNotTrack;
      const gpc = (navigator as unknown as { globalPrivacyControl?: boolean }).globalPrivacyControl;
      if (dnt === "1" || dnt === "yes" || gpc === true) {
        return;
      }
    }

    // Track Section Views via IntersectionObserver
    const trackedSections = new Set<string>();
    const sectionTimers = new Map<string, NodeJS.Timeout>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.id;
          if (!sectionId) return;

          if (entry.isIntersecting && !trackedSections.has(sectionId)) {
            // Must dwell on section for at least 1.5 seconds to count as read
            const timer = setTimeout(() => {
              trackedSections.add(sectionId);
              if (typeof window !== "undefined" && (window as unknown as { trackEvent?: (name: string, data?: unknown) => void }).trackEvent) {
                (window as unknown as { trackEvent: (name: string, data?: unknown) => void }).trackEvent("section_view", {
                  section: sectionId,
                  locale,
                });
              }
            }, 1500);
            sectionTimers.set(sectionId, timer);
          } else if (!entry.isIntersecting) {
            const existingTimer = sectionTimers.get(sectionId);
            if (existingTimer) {
              clearTimeout(existingTimer);
              sectionTimers.delete(sectionId);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((sec) => observer.observe(sec));

    // Scroll depth tracker
    let maxScroll = 0;
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const pct = Math.round((scrollTop / docHeight) * 100);
        if (pct > maxScroll) {
          maxScroll = Math.min(100, pct);
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Send engagement time and scroll depth on unload
    const sendEngagement = () => {
      if (maxScroll > 15) {
        if (typeof window !== "undefined" && (window as unknown as { trackEvent?: (name: string, data?: unknown) => void }).trackEvent) {
          (window as unknown as { trackEvent: (name: string, data?: unknown) => void }).trackEvent("engagement", {
            scrollDepth: maxScroll,
            locale,
          });
        }
      }
    };
    window.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        sendEngagement();
      }
    });

    return () => {
      observer.disconnect();
      sectionTimers.forEach((timer) => clearTimeout(timer));
      window.removeEventListener("scroll", handleScroll);
    };
  }, [locale]);

  return (
    <Script
      src="/analytics.js"
      strategy="afterInteractive"
      data-locale={locale}
    />
  );
}
