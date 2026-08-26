"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import { Preloader } from "@/components/preloader";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/sections/hero";
import { FeaturedWork } from "@/components/sections/featured-work";
import { WorkGallery } from "@/components/sections/work-gallery";
import { AboutStudio } from "@/components/sections/about";
import { AboutPhotographer } from "@/components/sections/photographer";
import { Testimonials } from "@/components/sections/testimonials";
import { Contact } from "@/components/sections/contact";
import { LazySection } from "@/components/ui/LazySection";

// Lazy-load the 3 heaviest sections — their JS bundles + WebGL contexts
// won't even download until the user scrolls near them
const LenticularSlider = dynamic(
  () => import("@/components/sections/lenticular-slider"),
  { ssr: false }
);
const InteractiveDome = dynamic(
  () => import("@/components/sections/interactive-dome"),
  { ssr: false }
);
const InteractiveMenu = dynamic(
  () => import("@/components/sections/interactive-menu"),
  { ssr: false }
);
const GradientSlider = dynamic(
  () => import("@/components/sections/gradient-slider"),
  { ssr: false }
);
import { CircularShowcase } from "@/components/sections/circular-showcase";
import { DriftShowcase } from "@/components/sections/drift-showcase";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader key="preloader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <Navigation isParentLoaded={!isLoading} />
      <main className="overflow-x-clip w-full max-w-full relative bg-[#020912]">
        <Hero isParentLoaded={!isLoading} />
        <AboutStudio />
        <AboutPhotographer />
        <FeaturedWork />
        <WorkGallery />
        <LazySection rootMargin="400px" minHeight="600px">
          <LenticularSlider />
        </LazySection>
        <LazySection rootMargin="400px" minHeight="80vh">
          <InteractiveDome />
        </LazySection>
        <LazySection rootMargin="400px" minHeight="700px">
          <InteractiveMenu />
        </LazySection>
        <LazySection rootMargin="400px" minHeight="500px">
          <GradientSlider />
        </LazySection>
        <LazySection rootMargin="400px" minHeight="600px">
          <CircularShowcase />
        </LazySection>
        <LazySection rootMargin="400px" minHeight="600px">
          <DriftShowcase />
        </LazySection>
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </>
  );
}




