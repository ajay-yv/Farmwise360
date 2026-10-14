import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: path.resolve(__dirname),
  },
  allowedDevOrigins: [
    "10.20.4.10",
    "10.20.4.10:3000",
    "10.20.4.10:3001",
    "192.168.56.1",
    "192.168.56.1:3000",
    "192.168.56.1:3001",
    "localhost:3000",
    "localhost:3001",
    "localhost",
    "127.0.0.1",
    "*.loca.lt",
  ],
};

export default nextConfig;
