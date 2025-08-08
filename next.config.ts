// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ship even if ESLint finds problems
  eslint: { ignoreDuringBuilds: true },
  // (optional) if you have type errors you want to bypass too:
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
