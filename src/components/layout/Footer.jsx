import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer id="kontak" className="w-full bg-slate-900 text-slate-300 border-t-4 border-amber-400 px-6 pt-12 pb-24 md:px-12 md:pt-16 md:pb-16">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-16">

          {/* Kolom 1: Tentang */}
          <div className="flex flex-col gap-5">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2.5 mb-3">
                <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                HIMASANTIKA
              </h3>
              <p className="text-sm leading-relaxed text-slate-400 mb-5">
                Himpunan Mahasiswa Jurusan Teknik Informatika Universitas Muhammadiyah Cirebon. Wadah pengembangan akademik, minat bakat, dan solidaritas mahasiswa.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16">
                <Image
                  src="/assets/logos/LogoHIMASANTIKAUMC.png"
                  alt="Logo HIMASANTIKA"
                  fill
                  className="object-contain drop-shadow-lg"
                />
              </div>
              <div className="relative w-16 h-16">
                <Image
                  src="/assets/logos/LogoPERMIKOMNAS.png"
                  alt="Logo PERMIKOMNAS"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain drop-shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Kolom 2: Tautan Cepat */}
          <div className="flex flex-col gap-5">
            <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
              Tautan Kampus
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="https://umc.ac.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-amber-400 transition-colors flex items-center gap-3"
                >
                  <ArrowRightIcon /> Universitas Muhammadiyah Cirebon
                </a>
              </li>
              <li>
                <a
                  href="https://ft.umc.ac.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-amber-400 transition-colors flex items-center gap-3"
                >
                  <ArrowRightIcon /> Fakultas Teknik UMC
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Kontak & Sosial Media */}
          <div className="flex flex-col gap-5">
            <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
              Hubungi Kami
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3 text-sm">
                <MapPin size={18} className="text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Kampus 2 UMC, Jl. Fatahillah, Watubelah, Cirebon, Jawa Barat
                </span>
              </div>
              <div className="flex gap-4 pt-2">
                <a
                  href="https://www.instagram.com/himasantika_umc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-slate-800 hover:bg-amber-400 hover:text-slate-900 rounded-full transition-all flex items-center justify-center"
                  aria-label="Instagram"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/@himasantika_umc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-slate-800 hover:bg-amber-400 hover:text-slate-900 rounded-full transition-all flex items-center justify-center"
                  aria-label="TikTok"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 pb-24 md:pb-0 border-t border-slate-800 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} HIMASANTIKA UMC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function ArrowRightIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
    </svg>
  );
}
