import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HIMASANTIKA UMC | Himpunan Mahasiswa Teknik Informatika",
  description: "Wadah kolaborasi tanpa batas untuk mahasiswa Teknik Informatika Universitas Muhammadiyah Cirebon. Bersama menciptakan dampak nyata.",
  keywords: ["HIMASANTIKA", "UMC", "Teknik Informatika", "Universitas Muhammadiyah Cirebon", "Himpunan Mahasiswa"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${geistMono.variable} h-full antialiased overflow-x-hidden`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">{children}</body>
    </html>
  );
}
