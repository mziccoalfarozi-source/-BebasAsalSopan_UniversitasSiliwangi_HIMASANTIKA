"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import DivisionsSection from "@/components/sections/DivisionsSection";
import GallerySection from "@/components/sections/GallerySection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";
import SplashScreen from "@/components/ui/SplashScreen";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      
      {!showSplash && (
        <>
          <Navbar />
          <main className="flex min-h-screen flex-col">
            <HeroSection />
            <AboutSection />
            <DivisionsSection />
            <GallerySection />
            <ContactSection />
            <Footer />
          </main>
        </>
      )}
    </>
  );
}
