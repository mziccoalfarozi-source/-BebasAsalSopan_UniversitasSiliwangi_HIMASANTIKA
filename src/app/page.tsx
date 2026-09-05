"use client";

import { useState, useEffect, lazy, Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import SplashScreen from "@/components/ui/SplashScreen";

// Lazy load semua section below-fold
const AboutSection     = lazy(() => import("@/components/sections/AboutSection"));
const DivisionsSection = lazy(() => import("@/components/sections/DivisionsSection"));
const GallerySection   = lazy(() => import("@/components/sections/GallerySection"));
const ContactSection   = lazy(() => import("@/components/sections/ContactSection"));
const Footer           = lazy(() => import("@/components/layout/Footer"));

let isFirstLoad = true;

// Skeleton ringan — placeholder saat section belum di-render
function SectionSkeleton({ h = "h-64" }: { h?: string }) {
  return <div className={`w-full ${h} bg-slate-100 animate-pulse`} />;
}

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
            {/* HeroSection di-load langsung — above the fold */}
            <HeroSection />

            {/* Below-fold sections: lazy loaded, baru render saat browser idle */}
            <Suspense fallback={<SectionSkeleton h="h-96" />}>
              <AboutSection />
            </Suspense>
            <Suspense fallback={<SectionSkeleton h="h-screen" />}>
              <DivisionsSection />
            </Suspense>
            <Suspense fallback={<SectionSkeleton h="h-[600px]" />}>
              <GallerySection />
            </Suspense>
            <Suspense fallback={<SectionSkeleton h="h-64" />}>
              <ContactSection />
            </Suspense>
            <Suspense fallback={<SectionSkeleton h="h-48" />}>
              <Footer />
            </Suspense>
          </main>
        </>
      )}
    </>
  );
}
