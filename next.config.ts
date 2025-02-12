import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    MONGO_URI: process.env.MONGO_URI,
  },
  images: {
    domains: ["cdn.zyrosite.com"], // You can specify the domain here instead of using remotePatterns
  },
  reactStrictMode: true,
};

export default nextConfig;
