"use client";

import Image from "next/image";
import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Images } from "lucide-react";

const galleryItems = [
  { id: 1, src: "/assets/galeri/PhotoshootStrukturHIMASANTIKA.webp", caption: "Photoshoot Struktur HIMASANTIKA", tag: "Organisasi" },
  { id: 2, src: "/assets/galeri/BukberdanFamilyGathering1.webp", caption: "Buka Bersama & Family Gathering", tag: "Sosial" },
  { id: 3, src: "/assets/galeri/BukberdanFamilyGathering.webp", caption: "Buka Bersama & Family Gathering", tag: "Sosial" },
  { id: 4, src: "/assets/galeri/FotoBersamaRamadhan.webp", caption: "Menyambut Bulan Suci Ramadhan", tag: "Sosial" },
  { id: 5, src: "/assets/galeri/MengenalOrganisasiTeknikInformatika2025.webp", caption: "Mengenal Organisasi TI 2025", tag: "Kaderisasi" },
  { id: 6, src: "/assets/galeri/OpenRecruitmenHIMASANTIKA.webp", caption: "Open Recruitment HIMASANTIKA", tag: "Kaderisasi" },
  { id: 7, src: "/assets/galeri/KajianPublicSpeaking2025.webp", caption: "Kajian Public Speaking 2025", tag: "Pendidikan" },
  { id: 8, src: "/assets/galeri/StudiBanding1.webp", caption: "Studi Banding x HIMA-TI UNIKU", tag: "Hubungan Eksternal" },
  { id: 9, src: "/assets/galeri/StudiBanding2.webp", caption: "Studi Banding x HIMA-TI UNIKU", tag: "Hubungan Eksternal" },
  { id: 10, src: "/assets/galeri/StudiBanding3.webp", caption: "Studi Banding x HIMA-TI UNIKU", tag: "Hubungan Eksternal" },
];

const COLORS = { primary: "#0033A0", accent: "#FFD700" };

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: (dir) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0, transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } }),
};

export default function GallerySection() {
  const [[current, direction], setCurrent] = useState([0, 0]);
  const total = galleryItems.length;
  const touchStartX = useRef(null);

  const handleDragEnd = (clientX) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - clientX;
    if (Math.abs(diff) > 40) paginate(diff > 0 ? 1 : -1);
    touchStartX.current = null;
  };

  const paginate = useCallback((newDir) => {
    setCurrent(([prev]) => [(prev + newDir + total) % total, newDir]);
  }, [total]);

  // Auto-play — diperpanjang ke 6 detik agar tidak terlalu sering re-render
  useEffect(() => {
    const timer = setInterval(() => paginate(1), 6000);
    return () => clearInterval(timer);
  }, [paginate]);

  const goTo = (index) => setCurrent(([prev]) => [index, index > prev ? 1 : -1]);
  const item = galleryItems[current];

  return (
    <section id="galeri" className="relative py-20 sm:py-28 lg:py-32 bg-slate-50 overflow-hidden">
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: `radial-gradient(ellipse at 30% 60%, ${COLORS.primary} 0%, transparent 55%), radial-gradient(ellipse at 70% 40%, ${COLORS.accent} 0%, transparent 55%)` }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-widest uppercase mb-4"
            style={{ backgroundColor: COLORS.accent, color: COLORS.primary }}>
            <Images size={14} />
            Galeri Kegiatan
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Momen &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Kenangan
            </span>
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-slate-600 text-sm sm:text-base">
            Dokumentasi perjalanan dan kegiatan HIMASANTIKA yang penuh semangat dan kebersamaan.
          </p>
        </motion.div>

        {/* ============================================
            FLOATING CARD — efek timbul via CSS only
            (lebih ringan dari framer-motion)
        ============================================ */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/*
            Efek timbul: gunakan CSS transition biasa,
            jauh lebih ringan dibanding motion spring.
            will-change: transform → hint browser siapkan GPU layer.
          */}
          <div
            className="relative group"
            style={{ willChange: "transform" }}
          >
            {/* Shadow layers belakang (diubah ke hitam transparan agar terlihat di bg putih) */}
            <div className="absolute inset-0 rounded-3xl translate-x-4 translate-y-4 transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2"
              style={{ backgroundColor: "rgba(0,30,80,0.03)" }} />
            <div className="absolute inset-0 rounded-3xl translate-x-2 translate-y-2 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
              style={{ backgroundColor: "rgba(0,30,80,0.06)" }} />

            {/* Card bezel — Glassmorphism untuk background terang */}
            <div
              className="relative rounded-3xl p-2 sm:p-3 transition-all duration-300 ease-out group-hover:-translate-y-2 group-hover:shadow-[0_40px_80px_rgba(0,30,80,0.12)] bg-white/70 backdrop-blur-xl border border-white"
              style={{
                boxShadow: "0 20px 40px rgba(0,30,80,0.05)",
              }}
            >
              {/* Slot foto 16:9 */}
              <div
                className="relative w-full rounded-2xl overflow-hidden bg-slate-800 cursor-grab active:cursor-grabbing"
                style={{ aspectRatio: "16/9" }}
                onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
                onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientX)}
                onMouseDown={(e) => { touchStartX.current = e.clientX; }}
                onMouseUp={(e) => handleDragEnd(e.clientX)}
                onMouseLeave={() => { touchStartX.current = null; }}
              >

                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.div
                    key={current}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0"
                    // GPU compositing — hindari layout reflow
                    style={{ willChange: "transform, opacity" }}
                  >
                    <Image
                      src={item.src}
                      alt={item.caption}
                      fill
                      priority={current === 0}
                      quality={80}
                      className="object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 1024px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    {/* Caption */}
                    <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 flex items-end justify-between">
                      <div>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold mb-2"
                          style={{ backgroundColor: COLORS.accent, color: COLORS.primary }}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                          {item.tag}
                        </span>
                        <p className="text-white font-semibold text-sm sm:text-base md:text-lg leading-tight drop-shadow-md">
                          {item.caption}
                        </p>
                      </div>
                      <span className="text-white/50 text-xs sm:text-sm font-mono shrink-0 ml-4">
                        {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>

              </div>
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {galleryItems.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? "28px" : "8px",
                  height: "8px",
                  backgroundColor: i === current ? COLORS.accent : "rgba(255,255,255,0.25)",
                }} />
            ))}
          </div>

          {/* Thumbnail strip — lazy load */}
          <div className="flex gap-2 sm:gap-3 mt-6 justify-center flex-wrap bg-white/30 backdrop-blur-md border border-white/40 shadow-lg p-3 rounded-2xl mx-auto max-w-fit">
            {galleryItems.map((g, i) => (
              <button key={g.id} onClick={() => goTo(i)}
                className="relative shrink-0 rounded-lg overflow-hidden transition-all duration-200"
                style={{
                  width: "64px", height: "40px",
                  opacity: i === current ? 1 : 0.4,
                  transform: i === current ? "scale(1.05)" : "scale(1)",
                  outline: i === current ? `2px solid ${COLORS.accent}` : "none",
                }}
                aria-label={g.caption}>
                <Image
                  src={g.src}
                  alt={g.caption}
                  fill
                  loading="lazy"   // ← lazy load thumbnail
                  quality={40}     // ← kualitas rendah untuk thumbnail
                  className="object-cover"
                  sizes="64px"
                />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
