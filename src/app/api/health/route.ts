import { NextResponse } from "next/server";
import { execSync } from "node:child_process";

let cachedCommitSha: string | null = null;

function getCommitSha(): string {
  if (cachedCommitSha) return cachedCommitSha;
  try {
    cachedCommitSha =
      process.env.GIT_COMMIT_SHA ||
      process.env.VERCEL_GIT_COMMIT_SHA ||
      execSync("git rev-parse HEAD", { timeout: 1000 }).toString().trim();
  } catch {
    cachedCommitSha = "production-release";
  }
  return cachedCommitSha;
}

export async function GET() {
  return NextResponse.json(
    {
      status: "ok",
      timestamp: new Date().toISOString(),
      version: "0.1.0",
      commit: getCommitSha(),
      uptimeSeconds: Math.floor(process.uptime()),
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}
