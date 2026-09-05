"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Handshake } from "lucide-react"; 

// ============================================
// DATA NAVIGASI
// ============================================
const NAV_LINKS = [
  { label: "Beranda", href: "/#beranda" },
  { label: "Tentang", href: "/#tentang" },
  { label: "Divisi", href: "/#divisi" },
  { label: "Kontak", href: "/#kontak" },
];

// ============================================
// KOMPONEN NAVBAR
// ============================================
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Asumsikan kita berada di beranda (index 0 aktif) untuk simulasi
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4"
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: isScrolled ? 0 : -120,
        opacity: isScrolled ? 1 : 0
      }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <nav
        className={`
          transition-all duration-300 ease-in-out
          w-full max-w-5xl rounded-full flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3
          ${isScrolled
            ? "bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/50"
            : "bg-white shadow-sm border border-slate-100"
          }
        `}
      >
        {/* ================================== */}
        {/* LOGO HIMASANTIKA                   */}
        {/* ================================== */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
          <div className="relative w-8 h-8 sm:w-10 sm:h-10">
            <Image
              src="/assets/logos/LogoHIMASANTIKAUMC.webp"
              alt="Logo HIMASANTIKA"
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-110"
              priority 
            />
          </div>
          <span className="font-bold text-sm sm:text-base tracking-tight text-slate-900 hidden sm:block">
            HIMASANTIKA
          </span>
        </Link>

        {/* ================================== */}
        {/* MENU DESKTOP                       */}
        {/* ================================== */}
        <ul className="hidden md:flex items-center gap-2">
          {NAV_LINKS.map((link, index) => {
            const isActive = index === activeIndex;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setActiveIndex(index)}
                  className={`
                    block px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300
                    ${isActive 
                      ? "bg-blue-100/80 text-[#0033A0]" 
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                    }
                  `}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ================================== */}
        {/* KANAN: PARTNERSHIP & TOGGLE        */}
        {/* ================================== */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/partnership"
            className="hidden sm:flex items-center gap-2 bg-[#4285F4] hover:bg-[#3367d6] text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors shadow-md shadow-blue-500/20"
          >
            <Handshake size={16} />
            <span>Partnership</span>
          </Link>

          {/* Toggle Button Mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* ======================================== */}
      {/* MENU MOBILE (AnimatePresence)          */}
      {/* ======================================== */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[calc(100%+10px)] left-4 right-4 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden md:hidden"
          >
            <div className="px-3 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link, index) => {
                const isActive = index === activeIndex;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => {
                      setActiveIndex(index);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`
                      block px-4 py-3 rounded-2xl text-sm font-semibold transition-colors
                      ${isActive 
                        ? "bg-blue-50 text-[#0033A0]" 
                        : "text-slate-600 hover:bg-slate-50"
                      }
                    `}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/partnership"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 bg-[#4285F4] text-white px-4 py-3 rounded-2xl text-sm font-semibold"
              >
                <Handshake size={16} />
                <span>Partnership</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
