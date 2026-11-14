import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Workspace packages ship TypeScript source; Next compiles them.
  transpilePackages: ["@aag/engine", "@aag/gateway", "@aag/db"],
};

export default nextConfig;
