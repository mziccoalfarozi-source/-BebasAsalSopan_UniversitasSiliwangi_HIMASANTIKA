"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react"; // Pastikan sudah install lucide-react

// ============================================
// DATA NAVIGASI
// ============================================
const NAV_LINKS = [
  { label: "Beranda", href: "#beranda" },
  { label: "Tentang", href: "#tentang" },
  { label: "Divisi", href: "#divisi" },
  { label: "Kontak", href: "#kontak" },
];

// ============================================
// KOMPONEN NAVBAR
// ============================================
export default function Navbar() {
  // State untuk mendeteksi posisi scroll
  const [isScrolled, setIsScrolled] = useState(false);
  // State untuk toggle menu mobile
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ==========================================
  // RENDER
  // ==========================================
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: isScrolled ? 0 : -100 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <nav
        className={`
          transition-all duration-300 ease-in-out
          ${isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-lg py-3" // Mode solid saat scroll
            : "bg-transparent py-5" // Mode transparan di awal
          }
        `}
      >
        {/* Container: max-width + padding responsif */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* ================================== */}
            {/* LOGO HIMASANTIKA                   */}
            {/* ================================== */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                <Image
                  src="/assets/logos/LogoHIMASANTIKAUMC.png"
                  alt="Logo HIMASANTIKA"
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-110"
                  priority // Priority karena LCP (Largest Contentful Paint)
                />
              </div>
              <div className="flex flex-col">
                <span className={`
                  font-bold text-lg sm:text-xl tracking-tight transition-colors
                  ${isScrolled ? "text-slate-900" : "text-white"}
                `}>
                  HIMASANTIKA
                </span>
                <span className={`
                  text-[10px] sm:text-xs font-medium tracking-widest uppercase
                  ${isScrolled ? "text-slate-500" : "text-white/70"}
                `}>
                  UMC
                </span>
              </div>
            </Link>

            {/* ================================== */}
            {/* MENU DESKTOP (hidden di mobile)    */}
            {/* ================================== */}
            <ul className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    className={`
                      relative text-sm font-medium tracking-wide
                      transition-colors duration-200
                      group
                      ${isScrolled
                        ? "text-slate-700 hover:text-blue-600"
                        : "text-white/90 hover:text-white"
                      }
                    `}
                  >
                    {link.label}
                    {/* Underline animasi saat hover */}
                    <span className={`
                      absolute -bottom-1 left-0 h-0.5 w-0
                      transition-all duration-300 ease-out
                      group-hover:w-full
                      ${isScrolled ? "bg-blue-600" : "bg-white"}
                    `} />
                  </Link>
                </motion.li>
              ))}

              {/* CTA Button Desktop */}
              <motion.li
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.4 }}
              >
                <Link
                  href="#kontak"
                  className={`
                    px-5 py-2.5 rounded-full text-sm font-semibold
                    transition-all duration-300
                    ${isScrolled
                      ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/25"
                      : "bg-white text-blue-600 hover:bg-white/90 hover:scale-105"
                    }
                  `}
                >
                  Bergabung
                </Link>
              </motion.li>
            </ul>

            {/* ================================== */}
            {/* TOGGLE BUTTON MOBILE               */}
            {/* ================================== */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`
                md:hidden p-2 rounded-lg transition-colors
                ${isScrolled ? "text-slate-900 hover:bg-slate-100" : "text-white hover:bg-white/10"}
              `}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ======================================== */}
      {/* MENU MOBILE (AnimatePresence untuk exit) */}
      {/* ======================================== */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white border-t border-slate-100 shadow-xl overflow-hidden"
          >
            <div className="px-4 py-6 space-y-1">
              {NAV_LINKS.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg text-slate-700 font-medium hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* CTA Mobile */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
                className="pt-4"
              >
                <Link
                  href="#kontak"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center px-4 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
                >
                  Bergabung dengan Kami
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
