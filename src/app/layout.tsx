import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
