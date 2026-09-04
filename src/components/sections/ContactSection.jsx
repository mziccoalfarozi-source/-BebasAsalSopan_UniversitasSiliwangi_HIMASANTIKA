"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Clock, Handshake } from "lucide-react";
import Link from "next/link";

export default function ContactSection() {
  return (
    <section id="kontak" className="relative py-20 sm:py-28 lg:py-32 bg-white overflow-hidden">
      {/* Decorative Backgrounds */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-900/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Bagian Kiri: Info Kontak & CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-8"
          >
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-widest uppercase mb-4 bg-amber-100 text-amber-700">
                Hubungi Kami
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
                Mari <span className="text-blue-600">Terhubung!</span>
              </h2>
              <p className="mt-4 text-slate-500 max-w-lg text-base sm:text-lg">
                Punya pertanyaan atau ingin mengunjungi sekretariat kami? Jangan ragu untuk menghubungi kontak di bawah ini.
              </p>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 transition-colors hover:bg-white hover:shadow-md">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <Mail size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Email</h3>
                <p className="text-slate-500 text-sm">himasantika@umc.ac.id</p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 transition-colors hover:bg-white hover:shadow-md">
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-4">
                  <Clock size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Jam Operasional</h3>
                <p className="text-slate-500 text-sm">Senin - Jumat, 08:00 - 16:00</p>
              </div>
            </div>

            {/* CTA Partnership */}
            <div className="bg-blue-600 p-6 sm:p-8 rounded-3xl text-white shadow-xl shadow-blue-600/20 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
              <div className="text-center sm:text-left">
                <h3 className="text-xl font-bold mb-2">Kerja Sama Media Partner</h3>
                <p className="text-blue-100 text-sm max-w-sm">
                  Ingin HIMASANTIKA menjadi Media Partner acara kamu? Ajukan proposalmu sekarang.
                </p>
              </div>
              <Link 
                href="/partnership"
                className="shrink-0 inline-flex items-center gap-2 bg-white text-blue-600 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors"
              >
                <Handshake size={18} />
                Ajukan Medpart
              </Link>
            </div>
          </motion.div>

          {/* Bagian Kanan: Peta */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-full min-h-[500px]"
          >
            <div className="bg-slate-50 p-3 sm:p-4 rounded-3xl border border-slate-100 h-full flex flex-col">
              <div className="flex items-start gap-3 mb-4 px-2 pt-2">
                <MapPin size={24} className="text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900">Lokasi HIMASANTIKA</h4>
                  <p className="text-sm text-slate-500 mt-1">Kampus 2 UMC, Jl. Fatahillah, Watubelah, Cirebon, Jawa Barat</p>
                </div>
              </div>
              <div className="relative w-full flex-1 rounded-2xl overflow-hidden bg-slate-200">
                <iframe
                  src="https://maps.google.com/maps?q=Universitas%20Muhammadiyah%20Cirebon%20Kampus%202&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 grayscale-[20%] contrast-[1.1]"
                  title="Peta Lokasi Sekretariat HIMASANTIKA UMC Kampus 2"
                ></iframe>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
