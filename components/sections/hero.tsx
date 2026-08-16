"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { siteData } from "@/lib/data";

interface CategoryImageProps {
  src: string;
  alt: string;
  delay?: number;
}

function CategoryImage({ src, alt, delay = 0 }: CategoryImageProps) {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-[inherit] bg-black/10">
      <AnimatePresence mode="popLayout">
        <motion.img
          key={src}
          src={src}
          alt={alt}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 1.0, delay, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ willChange: "transform, opacity" }}
        />
      </AnimatePresence>
    </div>
  );
}

const categories = [
  {
    id: "wedding",
    subtitle: "Wedding Photography & Films",
    titleMain: "TELLING STORIES WORTH",
    titleHighlight: "Remembering.",
    images: [
      "/wedding/imgi_3_5.png",       // Arched (left)
      "/wedding/imgi_7_3.jpg",       // Toast/Top-Right
      "/wedding/imgi_6_4.jpg",       // Polaroid
      "/wedding/imgi_4_7.jpg",       // Celebration Crowd/Bottom-Center
      "/wedding/imgi_8_6.jpg",       // Walking Wedding Party/Bottom-Right
    ]
  },
  {
    id: "drone",
    subtitle: "Drone Photography & Films",
    titleMain: "ELEVATING EVERY UNIQUE",
    titleHighlight: "Perspective.",
    images: [
      "/drone/imgi_11_6.jpg",        // Arched (left)
      "/drone/imgi_10_3.jpg",        // Toast/Top-Right
      "/drone/imgi_2_1.jpg",         // Polaroid
      "/drone/imgi_7_5.jpg",         // Celebration Crowd/Bottom-Center
      "/drone/imgi_12_9.jpg",        // Walking Wedding Party/Bottom-Right
    ]
  },
  {
    id: "landscape",
    subtitle: "Landscape Scenery & Fine Art",
    titleMain: "CAPTURING EARTH'S SILENT",
    titleHighlight: "Majesty.",
    images: [
      "/landscape/imgi_2_1 (1).jpg",  // Arched (left)
      "/landscape/imgi_8_8.jpg",      // Toast/Top-Right
      "/landscape/imgi_7_4.jpg",      // Polaroid
      "/landscape/imgi_5_10 (1).jpg", // Celebration Crowd/Bottom-Center
      "/landscape/imgi_10_6.jpg",     // Walking Wedding Party/Bottom-Right
    ]
  }
];

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shift, setShift] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [categoryIndex, setCategoryIndex] = useState(0);

  // Preload all category images to prevent any transition lag or flicker
  useEffect(() => {
    categories.forEach((category) => {
      category.images.forEach((src) => {
        const img = new window.Image();
        img.src = src;
      });
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;
      setIsDesktop(width >= 768);
      setShift(width >= 1200 ? (width - 1200) / 2 : 0);
    };
    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    let intervalId: NodeJS.Timeout;

    // Hold the first slide (Wedding) for 7.5 seconds on initial load, then cycle every 5.5 seconds
    const timeoutId = setTimeout(() => {
      setCategoryIndex(1);
      intervalId = setInterval(() => {
        setCategoryIndex((prev) => (prev + 1) % categories.length);
      }, 5500);
    }, 7500);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [isLoaded]);

  const currentCategory = categories[categoryIndex];

  return (
    <section className="relative w-full bg-background overflow-hidden px-4 pt-[68px] pb-12 md:pt-[92px] md:pb-[96px] flex justify-center">
      {/* ── Loading Overlay (signature logo + blinds wipe) ── */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            className="fixed inset-0 z-[10000] pointer-events-none overflow-hidden"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 1.3 }}
          >
            {/* Ambient Blur Backdrops (behind shutters) */}
            <div className="absolute inset-0 z-10 bg-[#02070f]">
              {/* Floating Gold Orb */}
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  x: [-30, 30, -30],
                  y: [-30, 30, -30],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -left-1/4 -top-1/4 w-3/4 h-3/4 bg-gold/8 rounded-full blur-[140px]"
              />
              {/* Floating Blue-Grey Orb */}
              <motion.div
                animate={{
                  scale: [1.15, 1, 1.15],
                  x: [30, -30, 30],
                  y: [30, -30, 30],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -right-1/4 -bottom-1/4 w-3/4 h-3/4 bg-[#0a1626]/40 rounded-full blur-[140px]"
              />
              {/* Pulsing Center Gold Aura */}
              <motion.div
                animate={{
                  opacity: [0.2, 0.5, 0.2],
                  scale: [0.9, 1.1, 0.9],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ backgroundImage: "radial-gradient(circle, rgba(200,170,110,0.2) 0%, transparent 75%)" }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full blur-[60px]"
              />
            </div>

            {/* Top Shutter Panel */}
            <motion.div
              className="absolute top-0 left-0 w-full h-[50%] bg-[#02070f]/92 backdrop-blur-md z-20"
              initial={{ y: "0%" }}
              animate={{ y: "-100%" }}
              transition={{
                duration: 1.1,
                delay: 0.2,
                ease: [0.76, 0, 0.24, 1],
              }}
            >
              <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
            </motion.div>

            {/* Bottom Shutter Panel */}
            <motion.div
              className="absolute bottom-0 left-0 w-full h-[50%] bg-[#02070f]/92 backdrop-blur-md z-20"
              initial={{ y: "0%" }}
              animate={{ y: "100%" }}
              transition={{
                duration: 1.1,
                delay: 0.2,
                ease: [0.76, 0, 0.24, 1],
              }}
            >
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Collage Canvas ── */}
      <div className="relative w-full aspect-[320/611] md:w-full md:max-w-[1200px] md:aspect-[1200/881] @container">

        {/* 1. Logo Branding - centered above subtitle text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-1/2 -translate-x-1/2 top-[38%] md:top-[20%] w-[48%] h-[10%] md:w-[28%] md:h-[14%] z-[35] pointer-events-none select-none"
        >
          <Image
            src={siteData.logo}
            alt="Ms films"
            fill
            className="object-contain gold-filter drop-shadow-[0_2px_15px_rgba(0,0,0,0.6)]"
            priority
          />
        </motion.div>

        {/* 2. Arched Image (Center-Left) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-[18.75%] top-[2.62%] w-[62.5%] h-[42%] md:left-[21.5%] md:top-[12.03%] md:w-[26.33%] md:h-[56%] rounded-t-[129px] md:rounded-t-[165px] overflow-hidden z-10 shadow-[0_25px_60px_-15px_rgba(180,150,90,0.25)] border-2 border-gold/30"
          style={isDesktop ? { left: `calc(21.5% - ${shift}px)` } : {}}
        >
          <CategoryImage
            src={currentCategory.images[0]}
            alt={`${currentCategory.subtitle} arched photo`}
            delay={0.0}
          />
          <div className="absolute inset-3 border border-gold/20 rounded-t-[117px] md:rounded-t-[153px] pointer-events-none z-20" />
        </motion.div>

        {/* 3. Toast Couple champagne (Top-Right - Desktop only) */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:block absolute md:left-[65.08%] md:top-[-0.57%] md:w-[25.08%] md:h-[59.14%] z-20 overflow-hidden shadow-[0_25px_60px_-15px_rgba(180,150,90,0.25)] border-2 border-gold/35"
          style={isDesktop ? { left: `calc(65.08% + ${shift}px)` } : {}}
        >
          <CategoryImage
            src={currentCategory.images[1]}
            alt={`${currentCategory.subtitle} detailed photo`}
            delay={0.1}
          />
          <div className="absolute inset-3 border border-gold/20 pointer-events-none z-20" />
        </motion.div>

        {/* 4. Polaroid Photo Frame (Bottom-Left) */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-[2.18%] top-[70.54%] w-[51.25%] h-[21.76%] md:left-[0.83%] md:top-[46.31%] md:w-[25.42%] md:h-[28.49%] z-20 drop-shadow-[0_25px_45px_rgba(180,150,90,0.2)]"
          style={isDesktop ? { left: `calc(0.83% - ${shift}px)` } : {}}
        >
          <div className="absolute left-[1.3%] top-[4.4%] w-[97.4%] h-[91.2%] overflow-hidden">
            <CategoryImage
              src={currentCategory.images[2]}
              alt={`${currentCategory.subtitle} polaroid photo`}
              delay={0.2}
            />
          </div>
          <Image
            src="https://static.showit.co/400/1ywRPbZkQy6XIDjbr_VVsA/shared/3.png"
            alt="Polaroid Frame"
            fill
            className="object-fill z-10 pointer-events-none"
          />
        </motion.div>

        {/* 5. Celebration Crowd (Bottom-Center) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-[50.31%] top-[77.41%] w-[45%] h-[25.69%] md:left-[7.17%] md:top-[66.17%] md:w-[33.75%] md:h-[37.12%] z-20 overflow-hidden shadow-[0_25px_60px_-15px_rgba(180,150,90,0.25)] border-2 border-gold/30"
          style={isDesktop ? { left: `calc(7.17% + ${shift}px)` } : {}}
        >
          <CategoryImage
            src={currentCategory.images[3]}
            alt={`${currentCategory.subtitle} celebration`}
            delay={0.3}
          />
          <div className="absolute inset-3 border border-gold/20 pointer-events-none z-20" />
        </motion.div>

        {/* 6. Walking Wedding Party (Bottom-Right - Desktop only) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:block absolute md:left-[49.33%] md:top-[52.78%] md:w-[51.25%] md:h-[38.02%] z-10 overflow-hidden shadow-[0_25px_60px_-15px_rgba(180,150,90,0.25)] border-2 border-gold/30"
          style={isDesktop ? { left: `calc(49.33% + ${shift}px)` } : {}}
        >
          <CategoryImage
            src={currentCategory.images[4]}
            alt={`${currentCategory.subtitle} walking`}
            delay={0.4}
          />
          <div className="absolute inset-3 border border-gold/20 pointer-events-none z-20" />
        </motion.div>

        {/* 7. Text Subtitle - Smooth dynamic swap */}
        <div className="absolute left-[5%] top-[50.73%] w-[90.31%] h-[16px] md:left-[11.5%] md:top-[37.34%] md:w-[77%] md:h-[23px] z-30 select-none flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.8, delay: categoryIndex === 0 ? 1.0 : 0, ease: [0.16, 1, 0.3, 1] }}
              style={{ textShadow: "2px 2px 20px rgba(0,0,0,0.9)" }}
              className="text-gold font-sans text-[3cqw] md:text-[1.2cqw] tracking-[0.4em] md:tracking-[0.5em] uppercase text-center font-medium"
            >
              {currentCategory.subtitle}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 8. Text Title - Smooth dynamic swap */}
        <div className="absolute left-[5%] top-[56.08%] w-[90.31%] h-[60px] md:left-[11.5%] md:top-[43.7%] md:w-[77%] md:h-[118px] z-30 select-none flex items-center justify-center font-normal">
          <AnimatePresence mode="wait">
            <motion.h1
              key={categoryIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.8, delay: categoryIndex === 0 ? 1.15 : 0, ease: [0.16, 1, 0.3, 1] }}
              style={{ textShadow: "3px 3px 25px rgba(0,0,0,0.9)" }}
              className="text-foreground font-laluxes-serif text-[6.25cqw] md:text-[4.08cqw] text-center leading-[1.2] tracking-normal"
            >
              <span>
                {currentCategory.titleMain} {" "}
                <span className="text-gold font-laluxes-script normal-case ml-2 text-[1.25em] whitespace-nowrap">
                  {currentCategory.titleHighlight}
                </span>
              </span>
            </motion.h1>
          </AnimatePresence>
        </div>

      </div>

    </section>
  );
}
