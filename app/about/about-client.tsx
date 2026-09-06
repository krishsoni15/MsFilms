"use client";

import { motion } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { AboutSection } from "@/components/sections/about";
import { AboutPhotographer } from "@/components/sections/photographer";
import { TrustStats } from "@/components/sections/trust-stats";
import { StoryChapters } from "@/components/sections/story-chapters";
import { Sparkles } from "lucide-react";

export function AboutClient() {
  return (
    <>
      <Navigation isParentLoaded={true} />

      <main className="min-h-screen w-full relative bg-background flex flex-col justify-between overflow-x-hidden pt-28">
        {/* Ambient background glow elements */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75vw] h-[75vw] rounded-full bg-gold/5 blur-[160px] pointer-events-none" />
        <div className="absolute top-2/3 right-10 w-96 h-96 rounded-full bg-amber-500/5 blur-[140px] pointer-events-none" />

        <div className="flex-grow">
          {/* Header */}
          <div className="relative z-10 text-center px-6 pt-12 pb-10 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 mb-4 shadow-sm"
            >
              <Sparkles size={13} className="text-gold animate-pulse" />
              <span className="font-sans text-[10px] tracking-[0.35em] text-gold font-bold uppercase">
                The Artisans Behind The Lens
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-serif text-4xl sm:text-6xl lg:text-7xl text-foreground font-normal uppercase tracking-tight mb-4"
            >
              About MS Films
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 0.7, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-sans text-xs sm:text-sm text-foreground/70 max-w-xl mx-auto leading-relaxed"
            >
              Crafting timeless visual narratives through editorial photography, 4K documentary filmmaking, and licensed aerial flight across Saskatoon, Saskatchewan, and Canada.
            </motion.p>
          </div>

          <AboutSection />
          <StoryChapters />
          <TrustStats />
          <AboutPhotographer />
        </div>

        <Footer />
      </main>
    </>
  );
}

