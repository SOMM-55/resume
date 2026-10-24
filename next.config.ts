import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  experimental: {
    optimizePackageImports: ["lucide-react", "date-fns", "cmdk"],
  },
  headers: async () => [
    {
      source: "/fonts/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
  ],
  allowedDevOrigins: [
    "127.0.0.1",
    "localhost",
    "*.space-z.ai",
    "*.chatglm.cn",
    "*.z.ai",
  ],
};

export default nextConfig;
