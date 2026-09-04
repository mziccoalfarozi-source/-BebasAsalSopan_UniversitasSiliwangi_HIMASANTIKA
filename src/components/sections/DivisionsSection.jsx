"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, X, Target, Briefcase, Users } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";

const COLORS = { primary: "#0033A0", accent: "#FFD700" };

// ============================================
// DATA DIVISI — foto member bisa diisi nanti
// ============================================
const divisions = [
  {
    name: "BPH",
    fullName: "Badan Pengurus Harian",
    description:
      "Pimpinan tertinggi HIMASANTIKA yang terdiri dari Bupati, Wakil Bupati, Sekretaris, Bendahara, dan jajarannya. Bertanggung jawab atas arah gerak dan administrasi organisasi secara keseluruhan.",
    image: "/assets/logos/DepartemenPO.png",
    members: "6 Jabatan",
    color: "#0033A0",
    detail:
      "BPH merupakan inti dari kepengurusan HIMASANTIKA. Mereka yang menentukan visi, arah kebijakan, dan memastikan seluruh departemen bergerak sinergi menuju satu tujuan. Setiap keputusan strategis, dari program kerja besar hingga representasi himpunan ke luar, selalu melewati BPH.",
    proker: [
      { name: "Rapat Koordinasi Rutin", desc: "Pertemuan mingguan seluruh pengurus untuk evaluasi dan sinkronisasi program." },
      { name: "Audiensi dengan Kaprodi", desc: "Forum komunikasi antara himpunan dan pihak jurusan untuk kepentingan mahasiswa." },
      { name: "Sidang Pleno", desc: "Sidang resmi pertanggungjawaban dan penetapan kebijakan organisasi." },
    ],
    anggota: [
      { nama: "Media 1", jabatan: "", photo: "/assets/galeri/divisi/bph/1.mp4" },
      { nama: "Media 2", jabatan: "", photo: "/assets/galeri/divisi/bph/2.jpg" },
      { nama: "Media 3", jabatan: "", photo: "/assets/galeri/divisi/bph/3.jpg" },
      { nama: "Media 4", jabatan: "", photo: "/assets/galeri/divisi/bph/4.jpg" },
      { nama: "Media 5", jabatan: "", photo: "/assets/galeri/divisi/bph/5.jpg" },
      { nama: "Media 6", jabatan: "", photo: "/assets/galeri/divisi/bph/6.jpg" },
    ],
  },
  {
    name: "Lembaga Advokasi",
    fullName: "Lembaga Advokasi Mahasiswa",
    description:
      "Menampung dan menyalurkan aspirasi mahasiswa melalui forum internal, serta berkoordinasi dengan Kaprodi S1 Teknik Informatika untuk penindaklanjutan.",
    image: "/assets/logos/LembagaAdvokasi.png",
    members: "Koordinasi Rutin",
    color: "#1a56db",
    detail:
      "Lembaga Advokasi adalah suara mahasiswa Teknik Informatika UMC. Mereka hadir untuk memastikan setiap keluhan, masukan, dan aspirasi mahasiswa didengar dan ditindaklanjuti. Dari masalah kurikulum, dosen, hingga fasilitas kampus — semua bisa dibawa ke Advokasi.",
    proker: [
      { name: "Pengumpulan Aspirasi", desc: "Membuka kanal aspirasi digital dan tatap muka secara berkala untuk mahasiswa." },
      { name: "Forum Audiensi Kaprodi", desc: "Menyampaikan aspirasi mahasiswa langsung kepada Kaprodi S1 TI." },
      { name: "Advokasi Akademik", desc: "Pendampingan mahasiswa yang mengalami masalah akademik atau administrasi." },
    ],
    anggota: [
      { nama: "Media 1", jabatan: "", photo: "/assets/galeri/divisi/Advokesma/1.mp4" },
      { nama: "Media 2", jabatan: "", photo: "/assets/galeri/divisi/Advokesma/2.jpg" },
      { nama: "Media 3", jabatan: "", photo: "/assets/galeri/divisi/Advokesma/3.jpg" },
      { nama: "Media 4", jabatan: "", photo: "/assets/galeri/divisi/Advokesma/4.jpg" },
      { nama: "Media 5", jabatan: "", photo: "/assets/galeri/divisi/Advokesma/5.jpg" },
    ],
  },
  {
    name: "Lembaga Minat Bakat",
    fullName: "Lembaga Minat dan Bakat",
    description:
      "Mengembangkan minat dan bakat profesi jurusan, mendata mahasiswa berbakat di bidang teknologi, dan menyalurkannya ke berbagai perlombaan.",
    image: "/assets/logos/LembagaMinatBakat.png",
    members: "Porseni & Lomba",
    color: "#7e22ce",
    detail:
      "Lembaga Minat Bakat hadir untuk mewadahi talenta mahasiswa TI yang tak hanya cerdas akademik, tapi juga berprestasi di bidang lain. Dari lomba programming, UI/UX, hackathon, hingga olahraga dan seni — LMB memastikan setiap mahasiswa punya ruang untuk bersinar.",
    proker: [
      { name: "Pendataan Minat Bakat", desc: "Survey dan identifikasi potensi mahasiswa di berbagai bidang." },
      { name: "Delegasi Lomba", desc: "Mengkoordinir keikutsertaan mahasiswa pada perlombaan internal dan eksternal." },
      { name: "Porseni HIMASANTIKA", desc: "Festival olahraga dan seni tahunan untuk mempererat kebersamaan mahasiswa TI." },
    ],
    anggota: [
      { nama: "Media 1", jabatan: "", photo: "/assets/galeri/divisi/MinatBakat/1.mp4" },
      { nama: "Media 2", jabatan: "", photo: "/assets/galeri/divisi/MinatBakat/2.jpg" },
      { nama: "Media 3", jabatan: "", photo: "/assets/galeri/divisi/MinatBakat/3.jpg" },
      { nama: "Media 4", jabatan: "", photo: "/assets/galeri/divisi/MinatBakat/4.jpg" },
      { nama: "Media 5", jabatan: "", photo: "/assets/galeri/divisi/MinatBakat/5.jpg" },
    ],
  },
  {
    name: "Dept. Kaderisasi",
    fullName: "Departemen Kaderisasi",
    description:
      "Menyusun dan melaksanakan SOP kaderisasi HIMASANTIKA serta meningkatkan kualitas kaderisasi untuk mencetak pengurus yang berkompeten.",
    image: "/assets/logos/DepartemenKaderisasi.png",
    members: "SOP & Pelatihan",
    color: "#b45309",
    detail:
      "Kaderisasi adalah jantungnya regenerasi HIMASANTIKA. Tanpa kader yang kuat dan berkarakter, organisasi tidak akan berkelanjutan. Departemen ini memastikan bahwa setiap mahasiswa baru yang bergabung mendapatkan proses pembinaan yang terstruktur, humanis, dan berorientasi pada pengembangan diri.",
    proker: [
      { name: "PBAK", desc: "Orientasi resmi dan pengenalan organisasi untuk mahasiswa baru TI." },
      { name: "LDKO", desc: "Latihan Dasar Kepemimpinan Organisasi untuk calon pengurus HIMASANTIKA." },
      { name: "Follow-up Kaderisasi", desc: "Program pembinaan berkelanjutan pasca LDKO untuk memastikan kualitas kader." },
    ],
    anggota: [
      { nama: "Media 1", jabatan: "", photo: "/assets/galeri/divisi/Kaderisasi/1.mp4" },
      { nama: "Media 2", jabatan: "", photo: "/assets/galeri/divisi/Kaderisasi/2.jpg" },
      { nama: "Media 3", jabatan: "", photo: "/assets/galeri/divisi/Kaderisasi/3.jpg" },
      { nama: "Media 4", jabatan: "", photo: "/assets/galeri/divisi/Kaderisasi/4.jpg" },
      { nama: "Media 5", jabatan: "", photo: "/assets/galeri/divisi/Kaderisasi/5.jpg" },
    ],
  },
  {
    name: "Dept. DOKOMINFO",
    fullName: "Dokumentasi, Komunikasi & Informasi",
    description:
      "Pusat informasi dan komunikasi yang mengelola media sosial, meliput kegiatan, dan membuat KTP pengurus sebagai identitas resmi.",
    image: "/assets/logos/DepartemenDokominfo.png",
    members: "Media & Publikasi",
    color: "#0e7490",
    detail:
      "DOKOMINFO adalah wajah digital HIMASANTIKA. Mereka yang memastikan setiap kegiatan terdokumentasi, setiap informasi tersebar tepat waktu, dan brand HIMASANTIKA terjaga konsistensinya di media sosial. Dari konten kreatif, desain grafis, fotografi, hingga videografi — semua ada di tangan DOKOMINFO.",
    proker: [
      { name: "Manajemen Media Sosial", desc: "Pengelolaan Instagram, WhatsApp, dan platform lain sebagai sarana informasi resmi." },
      { name: "Peliputan Kegiatan", desc: "Dokumentasi foto dan video setiap program kerja HIMASANTIKA." },
      { name: "Pembuatan KTP Pengurus", desc: "Identitas resmi digital seluruh pengurus HIMASANTIKA periode berjalan." },
    ],
    anggota: [
      { nama: "Media 1", jabatan: "", photo: "/assets/galeri/divisi/dokominfo/1.mp4" },
      { nama: "Media 2", jabatan: "", photo: "/assets/galeri/divisi/dokominfo/2.jpg" },
      { nama: "Media 3", jabatan: "", photo: "/assets/galeri/divisi/dokominfo/3.jpg" },
      { nama: "Media 4", jabatan: "", photo: "/assets/galeri/divisi/dokominfo/4.jpg" },
      { nama: "Media 5", jabatan: "", photo: "/assets/galeri/divisi/dokominfo/5.jpg" },
    ],
  },
  {
    name: "Dept. PO",
    fullName: "Pengembangan Organisasi",
    description:
      "Mengadakan evaluasi per departemen, kajian AD/ART, dan merancang SOP organisasi sesuai dengan pedoman yang telah ditetapkan.",
    image: "/assets/logos/DepartemenPO.png",
    members: "Evaluasi & SOP",
    color: "#15803d",
    detail:
      "Departemen PO adalah think-tank-nya HIMASANTIKA. Mereka memastikan organisasi tidak stagnan — selalu ada evaluasi, pembaruan aturan, dan peningkatan sistem. Kajian AD/ART yang mereka lakukan menjadi landasan hukum organisasi, sementara SOP yang disusun menjadi panduan kerja seluruh departemen.",
    proker: [
      { name: "Kajian AD/ART", desc: "Review dan penyempurnaan Anggaran Dasar/Rumah Tangga HIMASANTIKA." },
      { name: "Penyusunan SOP Departemen", desc: "Pembuatan Standard Operating Procedure untuk tiap departemen." },
      { name: "Evaluasi Semester", desc: "Forum evaluasi kinerja seluruh departemen per semester." },
    ],
    anggota: [
      { nama: "Media 1", jabatan: "", photo: "/assets/galeri/divisi/PO/1.mp4" },
      { nama: "Media 2", jabatan: "", photo: "/assets/galeri/divisi/PO/2.jpg" },
      { nama: "Media 3", jabatan: "", photo: "/assets/galeri/divisi/PO/3.jpg" },
      { nama: "Media 4", jabatan: "", photo: "/assets/galeri/divisi/PO/4.jpg" },
      { nama: "Media 5", jabatan: "", photo: "/assets/galeri/divisi/PO/5.jpg" },
    ],
  },
  {
    name: "Dept. Dikmas",
    fullName: "Pendidikan Mahasiswa",
    description:
      "Berkoordinasi dengan Kaprodi mengenai akademik dan mengadakan workshop, seminar, serta bootcamp untuk mengembangkan profesi jurusan.",
    image: "/assets/logos/DepartemenDikmas.png",
    members: "Workshop & Seminar",
    color: "#be185d",
    detail:
      "Dikmas hadir untuk menjembatani dunia kampus dengan dunia industri teknologi. Di sinilah mahasiswa TI mendapatkan ilmu-ilmu praktikal — mulai dari web development, UI/UX design, machine learning, hingga soft skill seperti public speaking dan project management.",
    proker: [
      { name: "Workshop Teknis", desc: "Pelatihan skill teknis seperti coding, desain, atau tools industri terkini." },
      { name: "Seminar Nasional / Webinar", desc: "Menghadirkan pembicara dari industri untuk berbagi insight kepada mahasiswa." },
      { name: "Bootcamp Intensif", desc: "Program belajar intensif jangka pendek untuk skill spesifik yang sedang populer." },
    ],
    anggota: [
      { nama: "Media 1", jabatan: "", photo: "/assets/galeri/divisi/DIKMAS/1.mp4" },
      { nama: "Media 2", jabatan: "", photo: "/assets/galeri/divisi/DIKMAS/2.jpg" },
      { nama: "Media 3", jabatan: "", photo: "/assets/galeri/divisi/DIKMAS/3.jpg" },
      { nama: "Media 4", jabatan: "", photo: "/assets/galeri/divisi/DIKMAS/4.jpg" },
      { nama: "Media 5", jabatan: "", photo: "/assets/galeri/divisi/DIKMAS/5.jpg" },
    ],
  },
  {
    name: "Dept. HUBEKSOS",
    fullName: "Hubungan Eksternal & Sosial",
    description:
      "Mengabdikan diri kepada masyarakat, menjalin relasi dengan ormawa UMC, dan menjadi sumber informasi terkait PERMIKOMNAS.",
    image: "/assets/logos/DepartemenHubeksos.png",
    members: "Eksternal & Sosial",
    color: "#0f766e",
    detail:
      "HUBEKSOS adalah jembatan antara HIMASANTIKA dengan dunia luar. Mereka yang membangun dan merawat hubungan baik dengan organisasi mahasiswa lain, baik di lingkungan UMC maupun di tingkat nasional melalui PERMIKOMNAS.",
    proker: [
      { name: "Kunjungan Ormawa / Studi Banding", desc: "Silaturahmi ke himpunan mahasiswa TI dari kampus lain." },
      { name: "Bakti Sosial", desc: "Program pengabdian masyarakat seperti pelatihan teknologi untuk warga sekitar." },
      { name: "Koordinasi PERMIKOMNAS", desc: "Menjaga komunikasi aktif dengan Perhimpunan Mahasiswa Informatika Nasional." },
    ],
    anggota: [
      { nama: "Media 1", jabatan: "", photo: "/assets/galeri/divisi/hubeksos/1.mp4" },
      { nama: "Media 2", jabatan: "", photo: "/assets/galeri/divisi/hubeksos/2.jpg" },
      { nama: "Media 3", jabatan: "", photo: "/assets/galeri/divisi/hubeksos/3.jpg" },
      { nama: "Media 4", jabatan: "", photo: "/assets/galeri/divisi/hubeksos/4.jpg" },
      { nama: "Media 5", jabatan: "", photo: "/assets/galeri/divisi/hubeksos/5.jpg" },
    ],
  },
  {
    name: "Dept. BISMIT",
    fullName: "Bisnis dan Kemitraan",
    description:
      "Membangun relasi dengan mitra strategis, menjadi badan usaha milik himpunan, dan mencari dana halal untuk kemajuan HIMASANTIKA.",
    image: "/assets/logos/DepartemenBismit.png",
    members: "Kemitraan & Dana",
    color: "#92400e",
    detail:
      "BISMIT adalah departemen yang memastikan HIMASANTIKA tidak hanya bergantung pada dana kemahasiswaan. Mereka aktif mencari sponsor, membangun kemitraan strategis dengan perusahaan teknologi, dan mengelola usaha himpunan.",
    proker: [
      { name: "Pencarian Sponsor", desc: "Menjalin kerjasama dengan perusahaan atau brand yang relevan untuk mendukung kegiatan." },
      { name: "Usaha Himpunan", desc: "Mengelola merchandise atau jasa yang menjadi sumber pemasukan halal HIMASANTIKA." },
      { name: "Kemitraan Strategis", desc: "Membangun MoU jangka panjang dengan instansi untuk benefit mahasiswa TI." },
    ],
    anggota: [
      { nama: "Media 1", jabatan: "", photo: "/assets/galeri/divisi/Bismit/1.mp4" },
      { nama: "Media 2", jabatan: "", photo: "/assets/galeri/divisi/Bismit/2.jpg" },
      { nama: "Media 3", jabatan: "", photo: "/assets/galeri/divisi/Bismit/3.jpg" },
      { nama: "Media 4", jabatan: "", photo: "/assets/galeri/divisi/Bismit/4.jpg" },
      { nama: "Media 5", jabatan: "", photo: "/assets/galeri/divisi/Bismit/5.jpg" },
    ],
  },
];

// ============================================
// HELPER: avatar warna dari nama
// ============================================
function getAvatarBg(name) {
  const palette = ["#0033A0","#1a56db","#7e22ce","#be185d","#b45309","#15803d","#0e7490","#0f766e","#92400e","#dc2626"];
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return palette[Math.abs(h) % palette.length];
}
function getInitials(name) {
  return name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
}

// ============================================
// MEMBER PHOTO CAROUSEL (kolom kanan modal)
// ============================================
function MemberCarousel({ anggota, color }) {
  const [cur, setCur] = useState(0);
  const [dir, setDir] = useState(1);
  const touchX = useRef(null);

  const go = useCallback((idx, d) => { setDir(d); setCur(idx); }, []);
  const prev = () => go((cur - 1 + anggota.length) % anggota.length, -1);
  const next = () => go((cur + 1) % anggota.length, 1);

  const handleTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchX.current === null) return;
    const diff = touchX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    touchX.current = null;
  };

  const variants = {
    enter: (d) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit: (d) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0, transition: { duration: 0.3 } }),
  };

  const member = anggota[cur];

  return (
    <div className="relative w-full aspect-video flex flex-col" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      {/* Slide utama */}
      <div className="relative flex-1 rounded-2xl overflow-hidden bg-slate-900">
        <AnimatePresence custom={dir} initial={false} mode="popLayout">
          <motion.div
            key={cur}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            {member.photo ? (
              member.photo.endsWith('.mp4') ? (
                <video
                  src={member.photo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={member.photo}
                  alt={member.nama}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )
            ) : (
              <div
                className="w-full h-full flex flex-col items-center justify-center gap-4"
                style={{ background: `linear-gradient(135deg, ${getAvatarBg(member.nama)}cc, ${getAvatarBg(member.nama)}88)` }}
              >
                {/* Avatar besar */}
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-white/20 flex items-center justify-center text-white font-extrabold text-5xl sm:text-6xl border-4 border-white/30 shadow-2xl backdrop-blur-sm">
                  {getInitials(member.nama)}
                </div>
              </div>
            )}


          </motion.div>
        </AnimatePresence>

        {/* Arrow kiri */}
        {anggota.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm border border-white/20 transition-all hover:scale-110"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm border border-white/20 transition-all hover:scale-110"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Counter */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/50 text-white text-xs font-semibold backdrop-blur-sm">
          {cur + 1} / {anggota.length}
        </div>
      </div>

      {/* Dots */}
      {anggota.length > 1 && (
        <div className="flex justify-center gap-2 mt-3">
          {anggota.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i, i > cur ? 1 : -1)}
              className={`rounded-full transition-all duration-300 ${
                i === cur ? "w-6 h-2" : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
              }`}
              style={i === cur ? { backgroundColor: color } : {}}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================
// MODAL DETAIL DIVISI
// Mobile  : bottom-sheet, foto di atas konten (explicit height)
// Desktop : centered modal 2 kolom
// ============================================
function DivisionModal({ division, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="bd"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* ======== MOBILE: bottom-sheet ======== */}
      <motion.div
        key="mobile-panel"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 280 }}
        className="md:hidden fixed bottom-0 left-0 right-0 z-[201] max-h-[95dvh] flex flex-col rounded-t-3xl bg-white shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <div className="w-10 h-1 rounded-full bg-slate-300" />
        </div>

        {/* Header */}
        <div
          className="px-5 pt-2 pb-4 shrink-0"
          style={{ background: `linear-gradient(135deg, ${division.color}12 0%, transparent 100%)` }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white shadow border border-slate-100 flex items-center justify-center shrink-0">
              <Image src={division.image} alt={division.name} width={40} height={40} className="object-contain p-1" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-extrabold text-slate-900 leading-tight">{division.name}</h2>
              <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: division.color }}>
                {division.fullName}
              </p>
            </div>
            <button onClick={onClose} className="p-2 rounded-full bg-slate-100 shrink-0">
              <X size={18} className="text-slate-600" />
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto">
          {/* Foto Pengurus — tinggi explicit 220px agar tidak kolaps */}
          <div className="px-4 pt-2 pb-3">
            <div className="flex items-center gap-2 mb-2.5">
              <div className="p-1.5 rounded-lg" style={{ backgroundColor: `${division.color}15` }}>
                <Users size={13} style={{ color: division.color }} />
              </div>
              <span className="font-bold text-slate-900 text-sm">Pengurus Divisi</span>
            </div>
            <div className="w-full">
              <MemberCarousel anggota={division.anggota} color={division.color} />
            </div>
          </div>

          <div className="border-t border-slate-100 mx-4" />

          {/* Tentang + Proker */}
          <div className="px-4 pt-4 pb-10 space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-lg" style={{ backgroundColor: `${division.color}15` }}>
                  <Briefcase size={13} style={{ color: division.color }} />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Tentang Divisi</h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">{division.detail}</p>
            </div>

            <div className="border-t border-slate-100" />

            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-lg" style={{ backgroundColor: `${division.color}15` }}>
                  <Target size={13} style={{ color: division.color }} />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Program Kerja</h3>
              </div>
              <div className="space-y-2">
                {division.proker.map((pk, i) => (
                  <div key={i} className="flex gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0 mt-0.5"
                      style={{ backgroundColor: division.color }}
                    >
                      {i + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{pk.name}</p>
                      <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">{pk.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ======== DESKTOP: centered 1-kolom ======== */}
      <motion.div
        key="desktop-panel"
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
        className="hidden md:flex flex-col fixed inset-8 lg:inset-y-12 lg:inset-x-0 lg:w-full lg:max-w-3xl z-[201] bg-white rounded-3xl shadow-2xl overflow-hidden mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Fixed */}
        <div
          className="px-8 pt-6 pb-5 shrink-0"
          style={{ background: `linear-gradient(135deg, ${division.color}14 0%, transparent 100%)` }}
        >
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white shadow-md border border-slate-100 flex items-center justify-center shrink-0">
              <Image src={division.image} alt={division.name} width={52} height={52} className="object-contain p-1.5" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-extrabold text-slate-900 leading-tight">{division.name}</h2>
              <p className="text-xs font-bold uppercase tracking-widest mt-0.5" style={{ color: division.color }}>
                {division.fullName}
              </p>
              <span
                className="inline-block mt-2 px-3 py-0.5 rounded-full text-xs font-bold"
                style={{ backgroundColor: `${division.color}15`, color: division.color }}
              >
                {division.members}
              </span>
            </div>
            <button onClick={onClose} className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors shrink-0">
              <X size={20} className="text-slate-600" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-8 pb-10 space-y-8">
          
          {/* Foto Pengurus */}
          <div className="pt-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 rounded-lg" style={{ backgroundColor: `${division.color}20` }}>
                <Users size={14} style={{ color: division.color }} />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Pengurus Divisi</h3>
            </div>
            <MemberCarousel anggota={division.anggota} color={division.color} />
          </div>

          <div className="border-t border-slate-100" />

          {/* Tentang Divisi */}
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <div className="p-1.5 rounded-lg" style={{ backgroundColor: `${division.color}15` }}>
                <Briefcase size={14} style={{ color: division.color }} />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Tentang Divisi</h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">{division.detail}</p>
          </div>
          
          <div className="border-t border-slate-100" />

          {/* Program Kerja */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 rounded-lg" style={{ backgroundColor: `${division.color}15` }}>
                <Target size={14} style={{ color: division.color }} />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Program Kerja</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {division.proker.map((pk, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.07 * i }}
                  className="flex gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100"
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0 mt-0.5"
                    style={{ backgroundColor: division.color }}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{pk.name}</p>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">{pk.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ============================================
// CARD ANIMATION VARIANTS
// ============================================
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

// ============================================
// MAIN SECTION
// ============================================
export default function DivisionsSection() {
  const [selected, setSelected] = useState(null);
  const [expandedMobile, setExpandedMobile] = useState(null);
  const holdTimer = useRef(null);
  const isHolding = useRef(false);

  const handleTouchStart = (division) => {
    isHolding.current = false;
    holdTimer.current = setTimeout(() => {
      isHolding.current = true;
      setSelected(division);
    }, 500);
  };

  const handleTouchEnd = () => {
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
  };

  const handleTouchMove = () => {
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
  };

  const handleClick = (e, division) => {
    if (isHolding.current) {
      e.preventDefault();
      return;
    }
    
    if (typeof window !== 'undefined' && window.matchMedia("(hover: none)").matches) {
      e.preventDefault();
      setExpandedMobile(prev => prev === division.name ? null : division.name);
    } else {
      setSelected(division);
    }
  };

  return (
    <>
      <section id="divisi" className="relative py-20 sm:py-28 lg:py-32 bg-white overflow-hidden">
        <div className="absolute top-20 left-0 w-80 h-80 bg-blue-900/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-0 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-widest uppercase mb-4"
              style={{ backgroundColor: COLORS.primary, color: COLORS.accent }}
            >
              Struktur Organisasi
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Divisi &{" "}
              <span style={{ color: COLORS.primary }}>Lembaga</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-slate-500 text-sm sm:text-base">
              HIMASANTIKA terdiri dari berbagai divisi dan lembaga yang saling bersinergi.{" "}
              <span className="font-semibold text-slate-700">Klik kartu</span> untuk melihat detail & pengurus.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start"
          >
            {divisions.map((division) => (
              <motion.button
                key={division.name}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => handleClick(e, division)}
                onTouchStart={() => handleTouchStart(division)}
                onTouchEnd={handleTouchEnd}
                onTouchMove={handleTouchMove}
                className="group relative bg-white rounded-2xl border border-slate-200 overflow-hidden lg:hover:shadow-2xl transition-shadow duration-500 text-left w-full cursor-pointer touch-pan-y"
              >
                <div
                  className={`absolute top-0 left-0 right-0 h-1 transition-opacity duration-300 ${expandedMobile === division.name ? 'opacity-100' : 'opacity-0 lg:group-hover:opacity-100'}`}
                  style={{ backgroundColor: division.color }}
                />
                <div className="p-6 sm:p-8">
                  {/* Top part (Always visible) */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden shrink-0 group-hover:border-amber-400/50 transition-colors duration-300">
                        <Image
                          src={division.image}
                          alt={`Logo ${division.name}`}
                          width={64}
                          height={64}
                          className="object-contain p-2 transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">{division.name}</h3>
                        <span className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">{division.fullName}</span>
                      </div>
                    </div>
                    <div
                      className={`p-2 rounded-full transition-all duration-300 shrink-0 ${expandedMobile === division.name ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 lg:group-hover:opacity-100 lg:group-hover:translate-x-0'}`}
                      style={{ backgroundColor: `${division.color}18` }}
                    >
                      <ChevronRight size={18} style={{ color: division.color }} className={`transition-transform duration-300 ${expandedMobile === division.name ? 'rotate-90' : ''}`} />
                    </div>
                  </div>

                  {/* Expanding part (Visible on hover or mobile tap) */}
                  <div className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${expandedMobile === division.name ? 'grid-rows-[1fr]' : 'grid-rows-[0fr] lg:group-hover:grid-rows-[1fr]'}`}>
                    <div className="overflow-hidden">
                      <div className={`pt-5 transition-opacity duration-500 ${expandedMobile === division.name ? 'opacity-100 delay-100' : 'opacity-0 lg:group-hover:opacity-100 lg:group-hover:delay-100'}`}>
                        <p className="text-slate-500 text-sm leading-relaxed mb-5 line-clamp-3">{division.description}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                          <span
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                            style={{ backgroundColor: `${division.color}12`, color: division.color }}
                          >
                            {division.members}
                          </span>
                          <span className="text-xs text-slate-400 lg:group-hover:text-slate-600 transition-colors font-medium">
                            Lihat pengurus →
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selected && <DivisionModal division={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  );
}
