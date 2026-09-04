"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

// ============================================
// SPLASH SCREEN — Logo HIMASANTIKA Intro
// ============================================
// Urutan animasi:
// 0.0s — layar hitam → fade in
// 0.3s — lingkaran logo muncul (scale up)
// 0.7s — teks "HM" di dalam logo muncul
// 1.0s — garis bawah muncul
// 1.2s — "HIMASANTIKA" muncul huruf per huruf
// 1.8s — tagline muncul
// 2.4s — progress bar berjalan
// 3.0s — seluruh splash exit (wipe up)

const TITLE = "HIMASANTIKA";
const PRIMARY = "#101869";
const ACCENT = "#FFD700";

export default function SplashScreen({ onFinish }) {
  const [phase, setPhase] = useState("enter"); // "enter" | "exit"

  useEffect(() => {
    // Total durasi splash sebelum exit
    const timer = setTimeout(() => {
      setPhase("exit");
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onFinish}>
      {phase === "enter" && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{
            clipPath: "inset(0 0 100% 0)",
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ backgroundColor: PRIMARY }}
        >
          {/* ======== Background particle dots ======== */}
          <BackgroundDots />

          {/* ======== Glow di tengah ======== */}
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${ACCENT}18 0%, transparent 70%)`,
            }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* ======== Konten Utama ======== */}
          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Logo badge */}
            <LogoBadge />

            {/* Nama HIMASANTIKA */}
            <div className="flex flex-col items-center gap-3">
              <TitleLetters />

              {/* Garis divider */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.6, ease: "easeOut" }}
                className="h-px w-48"
                style={{ backgroundColor: `${ACCENT}60` }}
              />

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.9, duration: 0.6 }}
                className="text-sm tracking-[0.25em] uppercase font-medium"
                style={{ color: `${ACCENT}99` }}
              >
                Universitas Muhammadiyah Cirebon
              </motion.p>
            </div>

            {/* Progress bar */}
            <ProgressBar />
          </div>

          {/* ======== Sudut dekoratif ======== */}
          <CornerDecorations />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================
// SUB-KOMPONEN: Logo badge (lingkaran emas + "HM")
// ============================================
function LogoBadge() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, rotate: -20 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.7,
        ease: [0.34, 1.56, 0.64, 1], // spring-like overshoot
      }}
      className="relative"
    >
      {/* Ring luar berputar */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-dashed"
        style={{ borderColor: `${ACCENT}40`, margin: "-12px" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      {/* Ring tengah */}
      <motion.div
        className="absolute inset-0 rounded-full border border-solid"
        style={{ borderColor: `${ACCENT}25`, margin: "-6px" }}
        animate={{ rotate: -180 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Badge utama */}
      <motion.div
        className="relative w-28 h-28 rounded-full flex items-center justify-center shadow-2xl"
        style={{
          backgroundColor: ACCENT,
          boxShadow: `0 0 60px ${ACCENT}50, 0 0 120px ${ACCENT}20`,
        }}
        animate={{
          boxShadow: [
            `0 0 60px ${ACCENT}50, 0 0 120px ${ACCENT}20`,
            `0 0 80px ${ACCENT}70, 0 0 160px ${ACCENT}30`,
            `0 0 60px ${ACCENT}50, 0 0 120px ${ACCENT}20`,
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          className="relative w-20 h-20"
        >
          <Image 
            src="/assets/logos/LogoHIMASANTIKAUMC.png" 
            alt="Logo HIMASANTIKA" 
            fill 
            className="object-contain" 
            priority
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ============================================
// SUB-KOMPONEN: Teks muncul huruf per huruf
// ============================================
function TitleLetters() {
  return (
    <div className="flex items-center gap-0.5 sm:gap-1">
      {TITLE.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            delay: 1.1 + i * 0.06,
            duration: 0.4,
            ease: "easeOut",
          }}
          className="text-3xl sm:text-4xl md:text-5xl font-black tracking-widest text-white select-none"
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}

// ============================================
// SUB-KOMPONEN: Progress bar loading
// ============================================
function ProgressBar() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.2, duration: 0.4 }}
      className="w-48 sm:w-64"
    >
      <div
        className="h-0.5 rounded-full overflow-hidden"
        style={{ backgroundColor: `${ACCENT}20` }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: ACCENT }}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ delay: 2.3, duration: 0.8, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}

// ============================================
// SUB-KOMPONEN: Dots background
// ============================================
function BackgroundDots() {
  const dots = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: 1.5 + (i % 3),
    x: (i * 37) % 100,
    y: (i * 53) % 100,
    delay: (i * 0.23) % 2,
    duration: 2 + (i % 3),
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full"
          style={{
            width: dot.size,
            height: dot.size,
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            backgroundColor: ACCENT,
            opacity: 0.15,
          }}
          animate={{ opacity: [0.05, 0.3, 0.05], scale: [1, 1.5, 1] }}
          transition={{
            delay: dot.delay,
            duration: dot.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ============================================
// SUB-KOMPONEN: Dekorasi sudut
// ============================================
function CornerDecorations() {
  return (
    <>
      {/* Sudut kiri atas */}
      <motion.div
        initial={{ opacity: 0, x: -20, y: -20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="absolute top-8 left-8 w-16 h-16"
      >
        <div className="absolute top-0 left-0 w-full h-0.5" style={{ backgroundColor: `${ACCENT}40` }} />
        <div className="absolute top-0 left-0 h-full w-0.5" style={{ backgroundColor: `${ACCENT}40` }} />
      </motion.div>

      {/* Sudut kanan atas */}
      <motion.div
        initial={{ opacity: 0, x: 20, y: -20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="absolute top-8 right-8 w-16 h-16"
      >
        <div className="absolute top-0 right-0 w-full h-0.5" style={{ backgroundColor: `${ACCENT}40` }} />
        <div className="absolute top-0 right-0 h-full w-0.5" style={{ backgroundColor: `${ACCENT}40` }} />
      </motion.div>

      {/* Sudut kiri bawah */}
      <motion.div
        initial={{ opacity: 0, x: -20, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="absolute bottom-8 left-8 w-16 h-16"
      >
        <div className="absolute bottom-0 left-0 w-full h-0.5" style={{ backgroundColor: `${ACCENT}40` }} />
        <div className="absolute bottom-0 left-0 h-full w-0.5" style={{ backgroundColor: `${ACCENT}40` }} />
      </motion.div>

      {/* Sudut kanan bawah */}
      <motion.div
        initial={{ opacity: 0, x: 20, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="absolute bottom-8 right-8 w-16 h-16"
      >
        <div className="absolute bottom-0 right-0 w-full h-0.5" style={{ backgroundColor: `${ACCENT}40` }} />
        <div className="absolute bottom-0 right-0 h-full w-0.5" style={{ backgroundColor: `${ACCENT}40` }} />
      </motion.div>
    </>
  );
}
