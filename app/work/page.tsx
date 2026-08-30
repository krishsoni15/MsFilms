"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Preloader } from "@/components/preloader";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function WorkPage() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader key="preloader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <Navigation isParentLoaded={!isLoading} />

      <main className="min-h-screen w-full relative bg-background flex flex-col justify-between overflow-x-hidden pt-32">
        {/* Ambient background glows */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full bg-gold/5 blur-[120px] pointer-events-none dark:mix-blend-screen mix-blend-normal" />
        
        <div className="relative z-10 flex-grow flex flex-col items-center justify-center text-center px-6 py-20 max-w-4xl mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={!isLoading ? { opacity: 0.8, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-[10px] md:text-[11px] tracking-[0.4em] text-[#c5a880] font-bold uppercase mb-4 block"
          >
            OUR WORK
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={!isLoading ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-foreground font-normal uppercase tracking-tight mb-8"
          >
            COMING SOON
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={!isLoading ? { opacity: 0.5, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-sans text-xs md:text-sm text-foreground/70 max-w-md leading-relaxed mb-12"
          >
            We are currently curating our full portfolio of cinematic wedding films, engagement documentations, and commercial visual stories.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={!isLoading ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link
              href="/"
              className="group text-[11px] tracking-[0.2em] uppercase flex items-center gap-2.5 rounded-full px-8 py-4 text-foreground/70 border border-border hover:border-gold/30 hover:text-foreground transition-all duration-300 font-sans focus:outline-none"
              style={{
                background: "linear-gradient(to bottom, rgba(197, 168, 128, 0.12) 0%, rgba(197, 168, 128, 0.01) 100%)",
              }}
            >
              <ArrowLeft size={13} className="transform group-hover:-translate-x-0.5 transition-transform duration-300" />
              Back to Home
            </Link>
          </motion.div>
        </div>

        <Footer />
      </main>
    </>
  );
}
