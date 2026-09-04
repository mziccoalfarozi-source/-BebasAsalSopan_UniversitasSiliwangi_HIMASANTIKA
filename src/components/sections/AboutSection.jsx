"use client";

import { motion } from "framer-motion";
import { GraduationCap, Lightbulb, Scale, Users, ShieldCheck } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="tentang" className="relative bg-white text-slate-900 py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* KOLOM KIRI */}
          <div className="space-y-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-100 bg-blue-50 mb-6">
                <Users size={14} className="text-blue-600" />
                <span className="text-xs font-bold tracking-widest text-blue-900">PROFIL HIMASANTIKA</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.2] tracking-tight mb-6">
                Organisasi Kemahasiswaan Tingkat Jurusan Teknik Informatika
              </h2>
              
              <p className="text-lg text-slate-600 leading-relaxed max-w-xl font-light">
                Berfungsi sebagai sarana penyalur aspirasi mahasiswa serta memainkan berbagai peranan strategis dalam mengembangkan kemampuan akademis dan organisasi di lingkungan Universitas Muhammadiyah Cirebon.
              </p>
            </motion.div>

            {/* Dekorasi Mockup Window di background */}
            <div className="absolute -left-12 -bottom-24 w-64 h-64 bg-slate-50 border border-slate-200 rounded-2xl -z-10 rotate-[-12deg] blur-[1px] hidden md:block">
              <div className="h-8 border-b border-slate-200 flex items-center px-3 gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
            </div>
          </div>

          {/* KOLOM KANAN */}
          <div className="space-y-10 relative z-10">
            {/* INSAN AKADEMIS */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex gap-5"
            >
              <div className="shrink-0 w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                <GraduationCap size={24} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Insan Akademis</h3>
                <p className="text-slate-600 leading-relaxed font-light text-sm sm:text-base">
                  Membina mahasiswa untuk menjadi insan akademis yang unggul dan berkompeten di bidang Teknik Informatika.
                </p>
              </div>
            </motion.div>

            {/* PENCIPTA & PENGABDI */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex gap-5"
            >
              <div className="shrink-0 w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                <Lightbulb size={24} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Pencipta & Pengabdi</h3>
                <p className="text-slate-600 leading-relaxed font-light text-sm sm:text-base">
                  Mewujudkan tridharma perguruan tinggi dengan menciptakan karya teknologi yang bermanfaat dan mengabdi kepada masyarakat.
                </p>
              </div>
            </motion.div>

            {/* TANGGUNG JAWAB */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex gap-5"
            >
              <div className="shrink-0 w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                <ShieldCheck size={24} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Sadar Tanggung Jawab</h3>
                <p className="text-slate-600 leading-relaxed font-light text-sm sm:text-base">
                  Membangun karakter mahasiswa yang sadar akan hak, kewajiban, dan tanggung jawabnya di masyarakat Indonesia.
                </p>
              </div>
            </motion.div>

            {/* Dekorasi Mockup Window di background */}
            <div className="absolute -right-8 -bottom-16 w-56 h-56 bg-slate-50 border border-slate-200 rounded-2xl -z-10 rotate-[8deg] hidden md:block">
              <div className="h-8 border-b border-slate-200 flex items-center px-3 gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
