"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Eye, BookOpen, Calendar, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";

// ============================================
// VARIAN ANIMASI: Fade In Up saat Scroll
// ============================================
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

// ============================================
// DATA SLIDE FOTO
// ============================================
const slides = [
  {
    src: "/assets/galeri/PhotoshootStrukturHIMASANTIKA.jpg",
    alt: "Photoshoot Struktur HIMASANTIKA",
    caption: "Struktur Pengurus HIMASANTIKA",
  },
  {
    src: "/assets/galeri/MengenalOrganisasiTeknikInformatika2025.jpg",
    alt: "Mengenal Organisasi Teknik Informatika 2025",
    caption: "Mengenal Organisasi TI 2025",
  },
  {
    src: "/assets/galeri/BukberdanFamilyGathering1.jpg",
    alt: "Buka Bersama dan Family Gathering HIMASANTIKA",
    caption: "Kebersamaan Anggota HIMASANTIKA",
  },
];

// ============================================
// KOMPONEN IMAGE SLIDER
// ============================================
function ImageSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const goTo = useCallback((index, dir) => {
    setDirection(dir);
    setCurrent(index);
  }, []);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length, 1);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length, -1);
  }, [current, goTo]);

  // Auto-slide setiap 4 detik
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(next, 4000);
    return () => clearInterval(timerRef.current);
  }, [next, isPaused]);

  // Touch/swipe support
  const touchStartX = useRef(null);
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    touchStartX.current = null;
  };

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit: (dir) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } }),
  };

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Frame dekoratif */}
      <div className="absolute -inset-4 bg-gradient-to-br from-blue-900 to-blue-700 rounded-2xl rotate-2 opacity-20 group-hover:rotate-3 transition-transform duration-500" />

      {/* Slider Container — rasio 16:9 agar foto tidak kepotong */}
      <div
        className="relative w-full rounded-2xl overflow-hidden shadow-2xl"
        style={{ aspectRatio: "16/9" }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slides */}
        <AnimatePresence custom={direction} initial={false} mode="popLayout">
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            <Image
              src={slides[current].src}
              alt={slides[current].alt}
              fill
              loading={current === 0 ? "eager" : "lazy"}
              priority={current === 0}
              quality={75}
              className="object-cover object-top"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlay gradient bawah */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent z-10" />

        {/* Caption */}
        <div className="absolute bottom-4 left-4 right-14 z-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs sm:text-sm font-medium"
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
              {slides[current].caption}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Arrow Buttons */}
        <button
          onClick={prev}
          aria-label="Slide sebelumnya"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/40 text-white backdrop-blur-sm border border-white/20 hover:bg-black/60 transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={next}
          aria-label="Slide berikutnya"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/40 text-white backdrop-blur-sm border border-white/20 hover:bg-black/60 transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Ke slide ${i + 1}`}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? "w-6 h-2 bg-blue-900"
                : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ============================================
// KOMPONEN ABOUT SECTION
// ============================================
export default function AboutSection() {
  return (
    <section
      id="tentang"
      className="relative py-20 sm:py-28 lg:py-32 bg-white overflow-hidden"
    >
      {/* Dekorasi Background Dihapus (Jadikan pure white) */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-900 text-amber-400 text-xs sm:text-sm font-bold tracking-widest uppercase mb-4">
            Tentang Kami
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Mengenal Lebih Dekat{" "}
            <span className="text-blue-900">HIMASANTIKA</span>
          </h2>
        </motion.div>

        {/* ======================================== */}
        {/* GRID: 2 Kolom (Teks Kiri | Slider Kanan) */}
        {/* ======================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          
          {/* ========== KOLOM KIRI: KONTEN TEKS ========== */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="order-2 lg:order-1 space-y-8"
          >
            {/* --- Profil Singkat --- */}
            <motion.div variants={fadeInUp} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-blue-900 text-amber-400">
                  <BookOpen size={20} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Profil Singkat
                </h3>
              </div>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                <span className="font-semibold text-blue-900">HIMASANTIKA</span>{" "}
                (Himpunan Mahasiswa Jurusan Teknik Informatika) adalah organisasi 
                kemahasiswaan tingkat jurusan di Universitas Muhammadiyah Cirebon 
                yang berfungsi sebagai sarana penyalur aspirasi mahasiswa serta 
                memainkan berbagai peranan strategis dalam mengembangkan kemampuan 
                akademis dan organisasi, sekaligus ikut berpartisipasi dalam 
                mengembangkan kampus Universitas Muhammadiyah Cirebon.
              </p>
              <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-blue-900" />
                  Didirikan 13 September 2012
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-blue-900" />
                  Kampus 1 UMC, Jl. Tujuh Pahlawan Revolusi No. 70
                </span>
              </div>
            </motion.div>

            {/* --- Visi --- */}
            <motion.div variants={fadeInUp} className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-blue-900 text-amber-400">
                  <Eye size={20} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Visi
                </h3>
              </div>
              <div className="pl-0 sm:pl-12">
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base italic border-l-4 border-amber-400 pl-4">
                  Terbinanya insan akademis, pencipta dan pengabdi sebagai 
                  perwujudan Catur Dharma Perguruan Tinggi serta sadar akan hak, 
                  kewajiban, dan tanggung jawabnya sebagai mahasiswa dan masyarakat 
                  Indonesia.
                </p>
              </div>
            </motion.div>

            {/* --- Misi --- */}
            <motion.div variants={fadeInUp} className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-blue-900 text-amber-400">
                  <Target size={20} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Misi
                </h3>
              </div>
              <ul className="space-y-2.5 pl-0 sm:pl-12">
                {[
                  "Menjadi wadah penyalur aspirasi mahasiswa Teknik Informatika secara aktif dan konstruktif.",
                  "Mengembangkan kemampuan akademis dan organisasi mahasiswa melalui program kerja yang berkualitas.",
                  "Mewujudkan peran strategis mahasiswa dalam pengembangan kampus dan kontribusi bagi masyarakat.",
                  "Membangun solidaritas dan kebersamaan antar mahasiswa dalam suasana kekeluargaan.",
                ].map((misi, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600 text-sm sm:text-base">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                    <span className="leading-relaxed">{misi}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* ========== KOLOM KANAN: IMAGE SLIDER + STATS ========== */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-1 lg:order-2 space-y-6"
          >
            <ImageSlider />

            {/* Stats mini di bawah gambar */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "100+", label: "Anggota Aktif" },
                { value: "15+", label: "Program Kerja" },
                { value: "2012", label: "Tahun Berdiri" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="text-center py-4 px-2 rounded-xl bg-white border border-slate-200 shadow-sm"
                >
                  <div className="text-xl sm:text-2xl font-extrabold text-blue-900">{s.value}</div>
                  <div className="text-[10px] sm:text-xs text-slate-500 mt-0.5 font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
