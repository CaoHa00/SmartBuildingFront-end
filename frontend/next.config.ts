import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    allowedDevOrigins: ["http://10.60.253.172"], // Add your IP here
  },
};
console.log("Next.js Config:", nextConfig);
export default nextConfig;
