"use client";

import { motion } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Contact } from "@/components/sections/contact";

export default function ContactPage() {
  return (
    <>
      <Navigation isParentLoaded={true} />

      <main className="min-h-screen w-full relative bg-background flex flex-col justify-between overflow-x-hidden pt-28">
        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full bg-gold/5 blur-[140px] pointer-events-none" />

        <div className="flex-grow">
          {/* Header */}
          <div className="relative z-10 text-center px-6 pt-12 pb-6 max-w-4xl mx-auto">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.8, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-sans text-[10px] md:text-[11px] tracking-[0.4em] text-gold font-bold uppercase mb-3 block"
            >
              Start A Conversation
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-serif text-4xl md:text-6xl lg:text-7xl text-foreground font-normal uppercase tracking-tight mb-4"
            >
              Contact Studio
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 0.5, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-sans text-xs md:text-sm text-foreground/60 max-w-lg mx-auto leading-relaxed"
            >
              Tell us about your story, upcoming date, or project vision. We respond to all inquiries within 24 hours.
            </motion.p>
          </div>

          <Contact />
        </div>

        <Footer />
      </main>
    </>
  );
}
