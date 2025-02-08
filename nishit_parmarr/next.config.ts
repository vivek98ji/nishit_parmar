import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    MONGO_URI: process.env.MONGO_URI,
  },
  /* config options here */
  reactStrictMode: true,
};

export default nextConfig;
