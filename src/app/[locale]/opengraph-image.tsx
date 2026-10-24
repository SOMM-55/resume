import { ImageResponse } from "next/og";
import { getContent, isValidLocale } from "@/content";

export const runtime = "edge";
export const alt = "Sayyid Omid Mousavi Mehr — Senior Data Engineer · Agentic Systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = getContent(isValidLocale(locale) ? locale : "en");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          background: "linear-gradient(135deg, #090d16 0%, #0d1526 100%)",
          color: "#f8fafc",
          fontFamily: "system-ui, sans-serif",
          direction: content.dir,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              background: "#10b981",
            }}
          />
          <div
            style={{
              fontSize: "18px",
              color: "#94a3b8",
              fontFamily: "monospace",
              letterSpacing: "2px",
            }}
          >
            DATA PIPELINES // AGENTIC SYSTEMS
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "56px",
              fontWeight: 800,
              letterSpacing: "-1px",
              color: "#ffffff",
            }}
          >
            {content.name}
          </div>
          <div
            style={{
              fontSize: "30px",
              fontWeight: 600,
              color: "#2dd4bf",
            }}
          >
            {content.headline}
          </div>
          <div
            style={{
              fontSize: "20px",
              color: "#94a3b8",
              maxWidth: "900px",
              lineHeight: 1.5,
            }}
          >
            7+ years in data engineering, system architecture, ETL/ELT pipelines, Node.js, TypeScript, Python, PostgreSQL, microservices, and AI-agent / SDD workflows.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: "24px",
            fontSize: "18px",
            color: "#64748b",
            fontFamily: "monospace",
          }}
        >
          <div>somm.dev · github.com/SOMM-55</div>
          <div>Mashhad, Iran · Open to Relocation</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
