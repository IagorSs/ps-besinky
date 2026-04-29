import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    BACKEND_HOST: process.env.BACKEND_HOST,
  },
};

export default nextConfig;
