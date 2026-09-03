import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "static.nike.com",
      },
      {
        protocol: "https",
        hostname: "assets.adidas.com",
      },
      {
        protocol: "https",
        hostname: "images.footlocker.com",
      },
    ],
  },
};

export default nextConfig;

