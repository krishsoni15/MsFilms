"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
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
          initial={{ opacity: 0, scale: 1.08, filter: "blur(4px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.96, filter: "blur(4px)" }}
          transition={{
            duration: 1.35,
            delay,
            ease: [0.16, 1, 0.3, 1] // Premium cinematic deceleration curve
          }}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ willChange: "transform, opacity, filter" }}
        />
      </AnimatePresence>
    </div>
  );
}

// React Bits style staggered text blur-in component
interface BlurInWordsProps {
  text: string;
  className?: string;
  delay?: number;
  highlightText?: string;
  highlightClassName?: string;
  textShadowStyle?: React.CSSProperties;
  as?: "h1" | "div";
}

function BlurInWords({
  text,
  className = "",
  delay = 0,
  highlightText = "",
  highlightClassName = "",
  textShadowStyle = {},
  as = "div"
}: BlurInWordsProps) {
  const words = useMemo(() => text.split(" "), [text]);
  const Component = as === "h1" ? motion.h1 : motion.div;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
        delayChildren: delay,
      }
    },
    exit: {
      transition: {
        staggerChildren: 0.02,
        staggerDirection: -1 as any,
      }
    }
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 8, 
      filter: "blur(4px)" 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
      }
    },
    exit: { 
      opacity: 0, 
      y: -8, 
      filter: "blur(4px)",
      transition: {
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
      }
    }
  };

  return (
    <Component
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={textShadowStyle}
      className={className}
    >
      {words.map((word, index) => (
        <span key={index} className="inline-block whitespace-nowrap mr-[0.25em]">
          <motion.span variants={wordVariants} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
      {highlightText && (
        <span className="inline-block whitespace-nowrap">
          <motion.span 
            variants={wordVariants} 
            className={`inline-block ${highlightClassName}`}
          >
            {highlightText}
          </motion.span>
        </span>
      )}
    </Component>
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

export function Hero({ isParentLoaded = true }: { isParentLoaded?: boolean }) {
  console.log("[Debug Hero] Rendered. isParentLoaded prop:", isParentLoaded);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shift, setShift] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [categoryIndex, setCategoryIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Unique parallax shifts for each image slot in the collage
  const y1 = useTransform(scrollYProgress, [0, 1], ["0px", "-45px"]); // Left Arched Frame
  const y2 = useTransform(scrollYProgress, [0, 1], ["0px", "-85px"]); // Top-Right Detailed Frame
  const y3 = useTransform(scrollYProgress, [0, 1], ["0px", "-25px"]); // Bottom-Left Collage Frame
  const y4 = useTransform(scrollYProgress, [0, 1], ["0px", "-65px"]); // Bottom-Center Frame
  const y5 = useTransform(scrollYProgress, [0, 1], ["0px", "-40px"]); // Bottom-Right Frame

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
    console.log("[Debug Hero] useEffect triggered. isParentLoaded prop:", isParentLoaded);
    if (isParentLoaded) {
      console.log("[Debug Hero] setting isLoaded state to true.");
      setIsLoaded(true);
    }
  }, [isParentLoaded]);

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
    <section 
      id="home" 
      ref={containerRef}
      className="relative w-full bg-background overflow-hidden px-4 pt-[48px] pb-8 md:pt-[64px] md:pb-[80px] flex justify-center"
    >

      {/* ── Collage Canvas ── */}
      <div className="relative w-full aspect-[320/611] md:w-full md:max-w-[1200px] md:aspect-[1200/881] @container">

        {/* Ambient Dark Navy Scrim (Ensures crisp text readability over overlapping white photo highlights) */}
        <div 
          className="absolute left-1/2 top-[52%] md:top-[42%] -translate-x-1/2 -translate-y-1/2 w-[85%] h-[38%] md:h-[48%] pointer-events-none z-[25] blur-[80px] md:blur-[100px] rounded-full opacity-[0.85] md:opacity-[0.90]"
          style={{
            background: "radial-gradient(circle, rgba(3, 17, 29, 0.99) 0%, rgba(3, 17, 29, 0.6) 60%, transparent 80%)"
          }}
        />

        {/* Ambient Gold Backlight Glow (provides a subtle luxury halo behind the scrim without washing out contrast) */}
        <div 
          className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 w-[70%] h-[35%] pointer-events-none z-[24] blur-[100px] rounded-full opacity-[0.12]"
          style={{
            background: "radial-gradient(circle, #cba358 0%, transparent 70%)"
          }}
        />

        {/* 1. Logo Branding - centered above subtitle text (10% smaller) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-1/2 -translate-x-1/2 top-[48%] md:top-[14%] w-[43%] h-[9%] md:w-[25%] md:h-[12.6%] z-[35] pointer-events-none select-none"
        >
          <Image
            src={siteData.logo}
            alt="Ms films"
            fill
            className="object-contain gold-filter drop-shadow-[0_2px_15px_rgba(0,0,0,0.6)]"
            priority
          />
        </motion.div>

        {/* 2. Arched Image (Center-Left - Thin gold outline) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-[10%] top-[2.62%] w-[80%] h-[42%] md:left-[21.5%] md:top-[6.0%] md:w-[26.33%] md:h-[56%] rounded-t-[129px] md:rounded-t-[165px] overflow-hidden z-10 shadow-[0_20px_50px_rgba(0,0,0,0.55)] border border-gold/15"
          style={{
            y: y1,
            ...(isDesktop ? { left: `calc(21.5% - ${shift}px)` } : {})
          }}
        >
          <CategoryImage
            src={currentCategory.images[0]}
            alt={`${currentCategory.subtitle} arched photo`}
            delay={0.0}
          />
          <div className="absolute inset-2 border border-gold/10 rounded-t-[121px] md:rounded-t-[157px] pointer-events-none z-20" />
        </motion.div>

        {/* 3. Detailed Frame (Top-Right - Desktop only - Thin gold outline) */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:block absolute md:left-[65.08%] md:top-[1.0%] md:w-[23%] md:h-[52%] z-20 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.55)] border border-gold/15 rounded-sm"
          style={{
            y: y2,
            ...(isDesktop ? { left: `calc(65.08% + ${shift}px)` } : {})
          }}
        >
          <CategoryImage
            src={currentCategory.images[1]}
            alt={`${currentCategory.subtitle} detailed photo`}
            delay={0.1}
          />
          <div className="absolute inset-2 border border-gold/10 pointer-events-none z-20" />
        </motion.div>

        {/* 4. Bottom-Left Collage Frame (Standard gold outline - replaced polaroid) */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-[2%] top-[76.0%] w-[50%] h-[22%] md:left-[0.83%] md:top-[40.31%] md:w-[25.42%] md:h-[28.49%] z-20 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.55)] border border-gold/15 rounded-sm"
          style={{
            y: y3,
            ...(isDesktop ? { left: `calc(0.83% - ${shift}px)` } : {})
          }}
        >
          <CategoryImage
            src={currentCategory.images[2]}
            alt={`${currentCategory.subtitle} collage photo`}
            delay={0.2}
          />
          <div className="absolute inset-2 border border-gold/10 pointer-events-none z-20" />
        </motion.div>

        {/* 5. Celebration Crowd (Bottom-Center - Thin gold outline) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-[48%] top-[80.0%] w-[50%] h-[22%] md:left-[7.17%] md:top-[63.17%] md:w-[33.75%] md:h-[37.12%] z-20 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.55)] border border-gold/15 rounded-sm"
          style={{
            y: y4,
            ...(isDesktop ? { left: `calc(7.17% + ${shift}px)` } : {})
          }}
        >
          <CategoryImage
            src={currentCategory.images[3]}
            alt={`${currentCategory.subtitle} celebration`}
            delay={0.3}
          />
          <div className="absolute inset-2 border border-gold/10 pointer-events-none z-20" />
        </motion.div>

        {/* 6. Walking Wedding Party (Bottom-Right - Desktop only - Thin gold outline) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:block absolute md:left-[49.33%] md:top-[46.78%] md:w-[51.25%] md:h-[38.02%] z-10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.55)] border border-gold/15 rounded-sm"
          style={{
            y: y5,
            ...(isDesktop ? { left: `calc(49.33% + ${shift}px)` } : {})
          }}
        >
          <CategoryImage
            src={currentCategory.images[4]}
            alt={`${currentCategory.subtitle} walking`}
            delay={0.4}
          />
          <div className="absolute inset-2 border border-gold/10 pointer-events-none z-20" />
        </motion.div>

        {/* 7. Text Subtitle - Smooth dynamic swap with staggered word blur-in */}
        <div className="absolute left-[5%] top-[59.0%] w-[90.31%] h-[16px] md:left-[11.5%] md:top-[31.5%] md:w-[77%] md:h-[23px] z-30 select-none flex items-center justify-center">
          <AnimatePresence>
            <BlurInWords
              key={categoryIndex}
              as="div"
              text={currentCategory.subtitle}
              delay={categoryIndex === 0 ? 0.3 : 0}
              textShadowStyle={{ textShadow: "0 2px 10px rgba(3,17,29,0.99), 0 4px 24px rgba(3,17,29,0.95), 0 0 4px rgba(3,17,29,0.99)" }}
              className="absolute w-full text-center text-gold font-laluxes-serif text-[3.6cqw] md:text-[1.3cqw] tracking-[0.3em] md:tracking-[0.4em] uppercase font-normal"
            />
          </AnimatePresence>
        </div>

        {/* 8. Text Title - Smooth dynamic swap with staggered word blur-in */}
        <div className="absolute left-[5%] top-[65.0%] w-[90.31%] h-[60px] md:left-[11.5%] md:top-[38.0%] md:w-[77%] md:h-[118px] z-30 select-none flex items-center justify-center font-normal">
          <AnimatePresence>
            <BlurInWords
              key={categoryIndex}
              as="h1"
              text={currentCategory.titleMain}
              highlightText={currentCategory.titleHighlight}
              highlightClassName="text-gold font-laluxes-script normal-case ml-2 text-[1.25em] whitespace-nowrap"
              delay={categoryIndex === 0 ? 0.4 : 0}
              textShadowStyle={{ textShadow: "0 4px 16px rgba(3,17,29,0.99), 0 8px 32px rgba(3,17,29,0.95), 0 0 6px rgba(3,17,29,0.99)" }}
              className="absolute w-full text-center text-foreground font-laluxes-serif text-[6.25cqw] md:text-[4.08cqw] leading-[1.2] tracking-normal"
            />
          </AnimatePresence>
        </div>

      </div>

    </section>
  );
}
