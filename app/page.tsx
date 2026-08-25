"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Preloader } from "@/components/preloader";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/sections/hero";
import { FeaturedWork } from "@/components/sections/featured-work";
import { WorkGallery } from "@/components/sections/work-gallery";
import { InteractiveDome } from "@/components/sections/interactive-dome";
import { InteractiveMenu } from "@/components/sections/interactive-menu";
import { AboutStudio } from "@/components/sections/about";
import { AboutPhotographer } from "@/components/sections/photographer";
import { Testimonials } from "@/components/sections/testimonials";
import { Contact } from "@/components/sections/contact";

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
        <InteractiveDome />
        <InteractiveMenu />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </>
  );
}




