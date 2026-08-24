"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import ShinyText from "@/components/ui/ShinyText";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    // Lock scrolling on documentElement when mounting
    document.documentElement.classList.add("preloader-active");
    
    // Automatically complete loading after a fixed duration (2.2s)
    const timer = setTimeout(() => {
      onComplete();
    }, 2200);

    return () => {
      clearTimeout(timer);
      // Remove class on unmount
      document.documentElement.classList.remove("preloader-active");
    };
  }, [onComplete]);

  return (
    <motion.div
      id="preloader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[99999] bg-[#000000] flex flex-col items-center justify-center select-none overflow-hidden"
    >
      {/* Shiny Logo - White/Silver base with White shine sweep */}
      <div className="relative z-10">
        <ShinyText
          imageSrc="/logo/logo.png"
          imageWidth={320}
          imageHeight={88}
          speed={2}
          color="#b5b5b5" // silver-white base logo
          shineColor="#ffffff" // pure white shine
          spread={120}
          alt="Msfilms Logo"
        />
      </div>
    </motion.div>
  );
}
