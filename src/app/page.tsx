"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import DivisionsSection from "@/components/sections/DivisionsSection";
import GallerySection from "@/components/sections/GallerySection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";
import SplashScreen from "@/components/ui/SplashScreen";

let isFirstLoad = true;

export default function Home() {
  const [showSplash, setShowSplash] = useState(isFirstLoad);

  useEffect(() => {
    if (!isFirstLoad) {
      setShowSplash(false);
    }
  }, []);

  const handleSplashFinish = () => {
    isFirstLoad = false;
    setShowSplash(false);
  };

  return (
    <>
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
      
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
