"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// ============================================
// VARIAN ANIMASI
// ============================================
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

// Hanya 5 gambar per baris — CSS animation, tidak perlu duplikasi JS
const marqueeImagesRow1 = [
  "/assets/galeri/PhotoshootStrukturHIMASANTIKA.webp",
  "/assets/galeri/BukberdanFamilyGathering1.webp",
  "/assets/galeri/BukberdanFamilyGathering.webp",
  "/assets/galeri/FotoBersamaRamadhan.webp",
  "/assets/galeri/MengenalOrganisasiTeknikInformatika2025.webp",
];

const marqueeImagesRow2 = [
  "/assets/galeri/OpenRecruitmenHIMASANTIKA.webp",
  "/assets/galeri/KajianPublicSpeaking2025.webp",
  "/assets/galeri/StudiBanding1.webp",
  "/assets/galeri/StudiBanding2.webp",
  "/assets/galeri/StudiBanding3.webp",
];

// ============================================
// MARQUEE ROW — pure CSS keyframe (no JS per-frame)
// Duplikasi array 2× untuk seamless loop
// ============================================
function MarqueeRow({ images, reverse = false, duration = "40s" }) {
  const items = [...images, ...images];
  return (
    <div className="overflow-hidden w-full">
      <div
        className="flex gap-4 w-max"
        style={{
          animation: `marquee-${reverse ? "right" : "left"} ${duration} linear infinite`,
        }}
      >
        {items.map((src, i) => (
          <div
            key={i}
            className="relative w-64 sm:w-80 md:w-96 aspect-video rounded-3xl overflow-hidden shrink-0 border border-slate-200"
          >
            <Image
              src={src}
              alt="Gallery"
              fill
              // Hanya 2 gambar pertama baris pertama yang di-prioritas (above-fold)
              priority={i < 2 && !reverse}
              loading={i < 2 && !reverse ? undefined : "lazy"}
              className="object-cover"
              sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, 384px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// HERO SECTION
// ============================================
export default function HeroSection() {
  return (
    <section
      id="beranda"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50"
    >
      {/* CSS keyframes — GPU composited, zero JS overhead */}
      <style>{`
        @keyframes marquee-left  { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes marquee-right { from { transform: translateX(-50%) } to { transform: translateX(0) } }
      `}</style>

      {/* ======================================== */}
      {/* BACKGROUND INFINITE MARQUEE (CSS only)   */}
      {/* ======================================== */}
      <div className="absolute inset-0 z-0 overflow-hidden flex flex-col gap-4 py-8 justify-center opacity-50">
        {/* Fade edges */}
        <div className="absolute top-0 left-0 right-0 h-32 md:h-48 bg-gradient-to-b from-slate-50 to-transparent z-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-32 md:h-48 bg-gradient-to-t from-slate-50 to-transparent z-20 pointer-events-none" />

        {/* 4 baris marquee — komponen ringan, total 10×2 = 20 Image nodes */}
        <MarqueeRow images={marqueeImagesRow1} duration="40s" />
        <MarqueeRow images={marqueeImagesRow2} reverse duration="50s" />
        <MarqueeRow images={[...marqueeImagesRow1].reverse()} duration="45s" />
        <MarqueeRow images={marqueeImagesRow2} reverse duration="55s" />
      </div>

      {/* Overlay terang agar teks terbaca */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-slate-50/30 via-slate-50/20 to-slate-50/30 pointer-events-none" />
      <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,rgba(248,250,252,0.1)_0%,rgba(248,250,252,0.4)_100%)] pointer-events-none" />

      {/* Dekorasi glow */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-400/20 rounded-full blur-[100px] z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-400/20 rounded-full blur-[100px] z-10 pointer-events-none" />

      {/* ======================================== */}
      {/* KONTEN UTAMA                              */}
      {/* ======================================== */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 flex flex-col items-center justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative w-fit mx-auto max-w-[95vw] md:max-w-4xl flex flex-col items-center text-center bg-white/50 backdrop-blur-xl border border-white/60 px-6 py-10 sm:px-12 sm:py-14 rounded-[2rem] shadow-2xl"
        >
          {/* HEADLINE — word-level fade (bukan per-karakter) */}
          <motion.h1
            variants={itemVariants}
            className="z-10 text-4xl sm:text-6xl lg:text-[5rem] font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-6"
          >
            Kreativitas, Solidaritas,
            <br className="hidden sm:block" />
            <motion.span
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.7, type: "spring" }}
              className="inline-block text-[#C3503B] drop-shadow-[0_4px_12px_rgba(251,191,36,0.4)]"
            >
              &amp; Inovasi.
            </motion.span>
          </motion.h1>

          {/* SUB-HEADLINE */}
          <motion.p
            variants={itemVariants}
            className="z-10 text-sm sm:text-lg text-slate-700 leading-relaxed max-w-2xl font-medium mb-0"
          >
            Wadah kolaborasi tanpa batas untuk mahasiswa Teknik Informatika Universitas Muhammadiyah Cirebon. Bersama menciptakan dampak nyata.
          </motion.p>
        </motion.div>
      </div>

      {/* Gradien blending ke About Section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-white z-10 pointer-events-none" />
    </section>
  );
}
