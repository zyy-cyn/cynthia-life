import type { NextConfig } from "next";
const nextConfig: NextConfig = { outputFileTracingRoot: process.cwd(), typescript: { tsconfigPath: "tsconfig.next.json" }, images: { unoptimized: true }, devIndicators: false };
export default nextConfig;
