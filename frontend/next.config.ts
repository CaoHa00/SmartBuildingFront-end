import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    allowedDevOrigins: ["http://192.168.0.6"], // Add your IP here
  },
};
console.log("Next.js Config:", nextConfig);
export default nextConfig;
