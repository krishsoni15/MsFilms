"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Preloader } from "@/components/preloader";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/sections/hero";
import { AboutStudio } from "@/components/sections/about";
import { AboutPhotographer } from "@/components/sections/photographer";
import { Contact } from "@/components/sections/contact";
import { TrustStats } from "@/components/sections/trust-stats";
import { WorkIntro } from "@/components/work/work-intro";
import { WorkGallery } from "@/components/sections/work-gallery";
import { CircularGallerySection } from "@/components/sections/circular-gallery-section";
import { Services } from "@/components/sections/services";
import { Blog } from "@/components/sections/blog";
import { Testimonials } from "@/components/sections/testimonials";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      // Refresh ScrollTrigger once preloader ends to ensure layout dimensions are fully calculated
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 750);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader key="preloader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <Navigation isParentLoaded={!isLoading} />
      <main className="overflow-x-clip w-full max-w-full relative bg-background">
        <Hero isParentLoaded={!isLoading} />
        <TrustStats />
        <AboutStudio />
        <AboutPhotographer />
        <WorkIntro />
        <WorkGallery />
        <CircularGallerySection />
        <Services />
        <Blog />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </>
  );
}




