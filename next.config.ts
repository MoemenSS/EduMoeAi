import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  devIndicators: false,
  outputFileTracingIncludes: { "/api/moeai": ["./lib/moeai/personality.md"] },
};

export default nextConfig;
