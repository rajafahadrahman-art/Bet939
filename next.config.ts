import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    formats: ["image/webp", "image/avif"],
  },
};

export default nextConfig;
