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
    optimizePackageImports: [
      "lucide-react",
      "date-fns",
      "cmdk",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-popover",
      "@radix-ui/react-select",
      "@radix-ui/react-separator",
      "@radix-ui/react-slot",
      "@radix-ui/react-switch",
      "@radix-ui/react-tabs",
      "@radix-ui/react-tooltip",
    ],
  },
  headers: async () => [
    {
      source: "/en",
      headers: [
        {
          key: "Link",
          value: "</fonts/Geist-Variable.woff2>; rel=preload; as=font; type=font/woff2; crossorigin=anonymous",
        },
      ],
    },
    {
      source: "/fa",
      headers: [
        {
          key: "Link",
          value: "</fonts/Vazirmatn-Variable.woff2>; rel=preload; as=font; type=font/woff2; crossorigin=anonymous",
        },
      ],
    },
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
