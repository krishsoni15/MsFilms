"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Preloader } from "@/components/preloader";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { Films } from "@/components/sections/films";
import { WorkGallery } from "@/components/sections/work-gallery";
import { CircularGallerySection } from "@/components/sections/circular-gallery-section";
import { FeaturedWork } from "@/components/sections/featured-work";

export default function WorkPage() {
  return (
    <>
      <Navigation isParentLoaded={true} />

      <main className="min-h-screen w-full relative bg-background flex flex-col justify-between overflow-x-hidden pt-24">
        {/* Ambient background glows */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full bg-gold/5 blur-[120px] pointer-events-none dark:mix-blend-screen mix-blend-normal" />
        
        <div className="flex-grow">
          {/* Main Portfolio Header */}
          <div className="relative z-10 text-center px-6 pt-16 pb-8 max-w-4xl mx-auto">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.8, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-sans text-[10px] md:text-[11px] tracking-[0.4em] text-[#c5a880] font-bold uppercase mb-4 block"
            >
              Creative Portfolio
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-serif text-4xl md:text-6xl lg:text-7xl text-foreground font-normal uppercase tracking-tight mb-4"
            >
              Selected Stories
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 0.5, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-sans text-xs md:text-sm text-foreground/50 max-w-md mx-auto leading-relaxed mb-8"
            >
              A curated collection of cinematic films, landscape highlights, and fine art memories.
            </motion.p>

            {/* Category Filter Pills */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-2.5 max-w-2xl mx-auto"
            >
              <Link
                href="/work"
                className="px-4 py-2 rounded-full border border-gold/50 bg-gold/15 text-gold text-[10px] tracking-[0.2em] uppercase font-sans font-semibold transition-all shadow-sm"
              >
                All Collections
              </Link>
              <Link
                href="/work/wedding"
                className="px-4 py-2 rounded-full border border-white/10 hover:border-gold/50 bg-white/5 text-foreground/70 hover:text-gold text-[10px] tracking-[0.2em] uppercase font-sans font-medium transition-all"
              >
                Weddings
              </Link>
              <Link
                href="/work/real-estate"
                className="px-4 py-2 rounded-full border border-white/10 hover:border-gold/50 bg-white/5 text-foreground/70 hover:text-gold text-[10px] tracking-[0.2em] uppercase font-sans font-medium transition-all"
              >
                Real Estate
              </Link>
              <Link
                href="/work/drone"
                className="px-4 py-2 rounded-full border border-white/10 hover:border-gold/50 bg-white/5 text-foreground/70 hover:text-gold text-[10px] tracking-[0.2em] uppercase font-sans font-medium transition-all"
              >
                Aerial Drone
              </Link>
              <Link
                href="/work/events"
                className="px-4 py-2 rounded-full border border-white/10 hover:border-gold/50 bg-white/5 text-foreground/70 hover:text-gold text-[10px] tracking-[0.2em] uppercase font-sans font-medium transition-all"
              >
                Events
              </Link>
            </motion.div>
          </div>

          {/* Section 1: Cinematic Films */}
          <Films />

          {/* Section 2: Lookbook Gallery (Page Flip) */}
          <WorkGallery />

          {/* Section 3: Circular Showcase (React Bits Gallery) */}
          <CircularGallerySection />

          {/* Section 4: Landscape & Fine Art (Card Stack & Marquee) */}
          <FeaturedWork />
        </div>

        <Footer />
      </main>
    </>
  );
}
