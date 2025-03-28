import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    allowedDevOrigins: ["http://10.60.233.150"], // Add your IP here
  },
};
console.log("Next.js Config:", nextConfig);
export default nextConfig;
