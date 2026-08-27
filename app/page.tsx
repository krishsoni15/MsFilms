"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import { Preloader } from "@/components/preloader";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/sections/hero";
import { FeaturedWork } from "@/components/sections/featured-work";
import { AboutStudio } from "@/components/sections/about";
import { AboutPhotographer } from "@/components/sections/photographer";
import { Contact } from "@/components/sections/contact";
import { LazySection } from "@/components/ui/LazySection";
import { TrustStats } from "@/components/sections/trust-stats";

// Lazy-load the heaviest sections — their JS bundles + WebGL contexts
// won't even download until the user scrolls near them
const InteractiveMenu = dynamic(
  () => import("@/components/sections/interactive-menu"),
  { ssr: false }
);
import { CircularShowcase } from "@/components/sections/circular-showcase";

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
        <TrustStats />
        <AboutStudio />
        <AboutPhotographer />
        <FeaturedWork />
        <LazySection rootMargin="400px" minHeight="600px">
          <CircularShowcase />
        </LazySection>
        <LazySection rootMargin="400px" minHeight="700px">
          <InteractiveMenu />
        </LazySection>
        <Contact />
        <Footer />
      </main>
    </>
  );
}




