"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

// ============================================
// VARIAN ANIMASI REUSABLE
// ============================================
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

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
// KOMPONEN HERO SECTION
// ============================================
export default function HeroSection() {
  return (
    <section
      id="beranda"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50"
    >
      {/* ======================================== */}
      {/* BACKGROUND INFINITE MARQUEE (Light)      */}
      {/* ======================================== */}
      <div className="absolute inset-0 z-0 overflow-hidden flex flex-col gap-4 py-8 justify-center opacity-50">
        {/* Solid fade at Top & Bottom untuk menutupi ujung foto secara dinamis */}
        <div className="absolute top-0 left-0 right-0 h-32 md:h-48 bg-gradient-to-b from-slate-50 to-transparent z-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-32 md:h-48 bg-gradient-to-t from-slate-50 to-transparent z-20 pointer-events-none" />

        {/* Baris 1: Ke Kiri */}
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
          className="flex w-max gap-4"
        >
          {[...marqueeImagesRow1, ...marqueeImagesRow2, ...marqueeImagesRow1, ...marqueeImagesRow2].map((src, i) => (
            <div key={i} className="relative w-64 sm:w-80 md:w-96 aspect-video rounded-3xl overflow-hidden shrink-0 border border-slate-200">
              <Image src={src} alt="Gallery" fill priority={src.includes("PhotoshootStrukturHIMASANTIKA")} className="object-cover" sizes="33vw" />
            </div>
          ))}
        </motion.div>

        {/* Baris 2: Ke Kanan */}
        <motion.div
          animate={{ x: ["-50%", "0%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 50 }}
          className="flex w-max gap-4"
        >
          {[...marqueeImagesRow2, ...marqueeImagesRow1, ...marqueeImagesRow2, ...marqueeImagesRow1].map((src, i) => (
            <div key={i} className="relative w-64 sm:w-80 md:w-96 aspect-video rounded-3xl overflow-hidden shrink-0 border border-slate-200">
              <Image src={src} alt="Gallery" fill priority={src.includes("PhotoshootStrukturHIMASANTIKA")} className="object-cover" sizes="33vw" />
            </div>
          ))}
        </motion.div>

        {/* Baris 3: Ke Kiri (Layar tinggi) */}
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 45 }}
          className="flex w-max gap-4"
        >
          {[...marqueeImagesRow1, ...marqueeImagesRow2, ...marqueeImagesRow1, ...marqueeImagesRow2].reverse().map((src, i) => (
            <div key={i} className="relative w-64 sm:w-80 md:w-96 aspect-video rounded-3xl overflow-hidden shrink-0 border border-slate-200">
              <Image src={src} alt="Gallery" fill priority={src.includes("PhotoshootStrukturHIMASANTIKA")} className="object-cover" sizes="33vw" />
            </div>
          ))}
        </motion.div>

        {/* Baris 4: Ke Kanan (Khusus Mobile agar layar tinggi tertutup full) */}
        <motion.div
          animate={{ x: ["-50%", "0%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 55 }}
          className="flex lg:hidden w-max gap-4"
        >
          {[...marqueeImagesRow2, ...marqueeImagesRow1, ...marqueeImagesRow2, ...marqueeImagesRow1].map((src, i) => (
            <div key={i} className="relative w-64 sm:w-80 md:w-96 aspect-video rounded-3xl overflow-hidden shrink-0 border border-slate-200">
              <Image src={src} alt="Gallery" fill priority={src.includes("PhotoshootStrukturHIMASANTIKA")} className="object-cover" sizes="33vw" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Overlay terang agar teks terbaca */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-slate-50/30 via-slate-50/20 to-slate-50/30 pointer-events-none" />
      {/* Radial vignette terang di tengah */}
      <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,rgba(248,250,252,0.1)_0%,rgba(248,250,252,0.4)_100%)] pointer-events-none" />

      {/* Dekorasi glow berwarna */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-400/20 rounded-full blur-[100px] z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-400/20 rounded-full blur-[100px] z-10 pointer-events-none" />

      {/* ======================================== */}
      {/* KONTEN UTAMA (CENTERED, TANPA KOTAK)     */}
      {/* ======================================== */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 flex flex-col items-center justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative w-fit mx-auto max-w-[95vw] md:max-w-4xl flex flex-col items-center text-center bg-white/50 backdrop-blur-xl border border-white/60 px-6 py-10 sm:px-12 sm:py-14 rounded-[2rem] shadow-2xl"
        >
          {/* HEADLINE UTAMA (Typing Effect + Drop Shadow) */}
          <h1 className="z-10 text-4xl sm:text-6xl lg:text-[5rem] font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-6">
            {"Kreativitas, Solidaritas,".split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.04, duration: 0.3 }}
              >
                {char}
              </motion.span>
            ))}
            <br className="hidden sm:block" />
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + "Kreativitas, Solidaritas,".length * 0.04 + 0.3, duration: 0.8, type: "spring" }}
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 drop-shadow-[0_4px_12px_rgba(251,191,36,0.4)]"
            >
              & Inovasi.
            </motion.span>
          </h1>

          {/* SUB-HEADLINE */}
          <motion.p
            variants={itemVariants}
            className="z-10 text-sm sm:text-lg text-slate-700 leading-relaxed max-w-2xl font-medium mb-0"
          >
            Wadah kolaborasi tanpa batas untuk mahasiswa Teknik Informatika Universitas Muhammadiyah Cirebon. Bersama menciptakan dampak nyata.
          </motion.p>
        </motion.div>
      </div>

      {/* SCROLL INDICATOR (Removed) */}
      {/* Gradien Blending ke About Section (slate-50 ke white) */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-white z-10 pointer-events-none" />
    </section>
  );
}
