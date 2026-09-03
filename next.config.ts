import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    deviceSizes: [640, 828, 1080, 1200, 1920],
    imageSizes: [64, 128, 256, 384],
    minimumCacheTTL: 3600, // cache 1 jam
    formats: ["image/webp"],  // convert ke webp otomatis (lebih kecil)
  },
};

export default nextConfig;
