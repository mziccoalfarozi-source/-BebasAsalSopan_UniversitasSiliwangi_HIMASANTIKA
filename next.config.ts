import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Prioritaskan AVIF (lebih kecil dari WebP), fallback ke WebP
    formats: ["image/avif", "image/webp"],
    // Cache gambar lebih lama di CDN (1 minggu)
    minimumCacheTTL: 604800,
    // Breakpoint gambar yang relevan saja
    deviceSizes: [640, 828, 1080, 1200, 1920],
    imageSizes: [64, 128, 256, 384],
    // Kualitas default sedikit diturunkan untuk performa
    qualities: [40, 60, 75, 85],
  },
  // Kompresi respons HTTP
  compress: true,
};

export default nextConfig;
