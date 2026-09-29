import type { NextConfig } from "next";
const githubPages = process.env.GITHUB_PAGES === "true";
const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  typescript: { tsconfigPath: "tsconfig.next.json" },
  images: { unoptimized: true },
  devIndicators: false,
  ...(githubPages ? { output: "export" as const, basePath: "/cynthia-life", trailingSlash: true } : {}),
};
export default nextConfig;
