import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: path.resolve(__dirname),
  },
  cacheComponents: true,
  partialPrefetching: true,
  allowedDevOrigins: ["192.168.56.1", "localhost", "127.0.0.1"],
};

export default nextConfig;
