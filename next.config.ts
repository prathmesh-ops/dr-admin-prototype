import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "onpointnexus.com",
      },
      {
        protocol: "https",
        hostname: "drbhagyeshkulkarni.com",
      },
    ],
  },
};

export default nextConfig;
