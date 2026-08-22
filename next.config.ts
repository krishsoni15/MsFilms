import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "static.showit.co",
      },
    ],
    qualities: [70, 75, 85],
  },
};

export default nextConfig;
