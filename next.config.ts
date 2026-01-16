import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";
import { readFileSync } from "fs";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const packageJson = JSON.parse(readFileSync("package.json", "utf8"));

const createConfig = () => {
  const assetPrefix = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  // set build as default to not crash the app if the env var is not set
  const distDir = process.env.NEXT_PUBLIC_DIST_DIR || "build";

  /**
   * @type {import('next').NextConfig}
   */
  const nextBundledConfig = withBundleAnalyzer({
    assetPrefix,
    basePath,
    compiler: {
      styledComponents: {
        displayName: true,
        ssr: true,
      },
    },
    distDir,
    env: {
      NEXT_PUBLIC_APP_NAME: packageJson.name || "APP_NAME-ENV-not-found",
      NEXT_PUBLIC_APP_VERSION: packageJson.version || "unknown",
      NEXT_PUBLIC_BASE_PATH: basePath,
      NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
      NEXT_PRIVATE_MOVIES_TOKEN: process.env.NEXT_PRIVATE_MOVIES_TOKEN || "",
    },
    images: {
      unoptimized: true,
    },
    poweredByHeader: false,
    reactStrictMode: false,
    trailingSlash: true,
  });

  return nextBundledConfig;
};

const nextConfig: NextConfig = createConfig();

export default nextConfig;
