"use client";
import { useState } from "react";

import { motion } from "framer-motion";
import { Handshake, Send, Building2, Calendar, Mail, FileText } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function PartnershipPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate sending data
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Reset success message after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000);
      
      // Optionally reset form here, but for now we just show success
      e.target.reset();
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-2xl mb-6 text-blue-600">
              <Handshake size={32} />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Pengajuan Media Partner
            </h1>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Mari berkolaborasi! Isi formulir di bawah ini untuk mengajukan permohonan kerja sama Media Partner (Medpart) dengan HIMASANTIKA UMC.
            </p>
          </motion.div>

          {/* FORM CONTAINER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden"
          >
            <div className="p-6 sm:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Organisasi & Acara (Grid 2 Kolom) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <Building2 size={16} className="text-blue-600" />
                      Nama Organisasi / Instansi
                    </label>
                    <input 
                      type="text" 
                      placeholder="Contoh: HIMA TI Univ X"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <Calendar size={16} className="text-blue-600" />
                      Nama Acara
                    </label>
                    <input 
                      type="text" 
                      placeholder="Contoh: IT Fest 2024"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Kontak & Tanggal */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <Mail size={16} className="text-blue-600" />
                      Email / WhatsApp Penanggung Jawab
                    </label>
                    <input 
                      type="text" 
                      placeholder="Email atau No WA aktif"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <Calendar size={16} className="text-blue-600" />
                      Tanggal Pelaksanaan Acara
                    </label>
                    <input 
                      type="date" 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-slate-700"
                      required
                    />
                  </div>
                </div>

                {/* Link Proposal */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <FileText size={16} className="text-blue-600" />
                    Link Proposal Kegiatan (Google Drive, dll)
                  </label>
                  <input 
                    type="url" 
                    placeholder="https://..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    required
                  />
                </div>

                {/* Pesan Tambahan */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Pesan / Deskripsi Singkat
                  </label>
                  <textarea 
                    rows={4}
                    placeholder="Ceritakan singkat tentang acara Anda dan bentuk kerja sama yang diharapkan..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-[#101869] hover:bg-[#0c1354] text-white px-6 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-900/20 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : isSuccess ? (
                      <>Terkirim!</>
                    ) : (
                      <><span>Kirim Pengajuan</span><Send size={20} /></>
                    )}
                  </button>
                </div>

              </form>
            </div>
            
            {/* Info Tambahan Bawah */}
            <div className="bg-slate-50 border-t border-slate-100 p-6 text-center">
              <p className="text-sm text-slate-500">
                Pengajuan akan diproses maksimal 2x24 jam. Jika *urgent*, silakan DM kami di Instagram <a href="https://instagram.com/himasantika_umc" className="text-blue-600 font-semibold hover:underline">@himasantika_umc</a>.
              </p>
            </div>
          </motion.div>

        </div>
      </main>
      <Footer />
    </>
  );
}
