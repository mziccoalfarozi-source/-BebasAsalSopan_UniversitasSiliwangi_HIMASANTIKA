"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Mail, Phone, Clock } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate sending
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      
      // Reset success message after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1500);
  };

  return (
    <section id="kontak" className="relative py-20 sm:py-28 lg:py-32 bg-white overflow-hidden">
      {/* Decorative Backgrounds */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-900/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-widest uppercase mb-4 bg-amber-100 text-amber-700">
            Hubungi Kami
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Mari <span className="text-blue-600">Terhubung!</span>
          </h2>
          <p className="mt-4 text-slate-500 max-w-2xl mx-auto text-base sm:text-lg">
            Punya pertanyaan atau ingin berkolaborasi? Jangan ragu untuk mengirimkan pesan atau mengunjungi sekretariat kami.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Bagian Kiri: Info & Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <Mail size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Email</h3>
                <p className="text-slate-500 text-sm">himasantika@umc.ac.id</p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-4">
                  <Clock size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Jam Operasional</h3>
                <p className="text-slate-500 text-sm">Senin - Jumat, 08:00 - 16:00</p>
              </div>
            </div>

            {/* Form Box */}
            <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Kirim Pesan</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1.5">Nama Lengkap</label>
                  <input
                    type="text"
                    id="name"
                    required
                    placeholder="Masukkan nama Anda"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder="nama@email.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-1.5">Pesan</label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    placeholder="Tulis pesan atau pertanyaan Anda di sini..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none text-slate-900"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 mt-2 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center gap-2 hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : isSuccess ? (
                    <>Terkirim! <span className="text-xl">🎉</span></>
                  ) : (
                    <>Kirim Pesan <Send size={18} /></>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Bagian Kanan: Peta */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="h-full"
          >
            <div className="bg-slate-50 p-3 sm:p-4 rounded-3xl border border-slate-100 h-full min-h-[400px] flex flex-col">
              <div className="flex items-start gap-3 mb-4 px-2 pt-2">
                <MapPin size={24} className="text-amber-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900">Sekretariat HIMASANTIKA</h4>
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
                  title="Peta Lokasi Kampus UMC"
                ></iframe>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
