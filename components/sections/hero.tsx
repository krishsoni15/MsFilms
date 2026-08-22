"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { siteData, heroData } from "@/lib/data";
import { VideoModal } from "@/components/video-modal";
import { Magnetic } from "@/components/ui/magnetic";
import { Aurora } from "@/components/ui/aurora";
import { ArrowRight, Play, Camera, Heart, Users, Globe } from "lucide-react";

/* ────────────────────────────────────────────────────────────
   Animated Category Image — crossfade with subtle zoom
   ──────────────────────────────────────────────────────────── */
interface CategoryImageProps {
  categoryIndex: number;
  imageIndex: number;
  alt: string;
  delay?: number;
  useBottomImages?: boolean;
}

function CategoryImage({ 
  categoryIndex, 
  imageIndex, 
  alt, 
  delay = 0, 
  useBottomImages = false
}: CategoryImageProps) {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-[inherit] bg-black/10">
      {categories.map((cat, idx) => {
        const isCurrent = categoryIndex === idx;
        const src = useBottomImages ? cat.bottomImages[imageIndex] : cat.images[imageIndex];
        return (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{
              opacity: isCurrent ? 1 : 0,
              scale: isCurrent ? 1 : 0.96,
            }}
            transition={{
              duration: 1.2,
              delay: isCurrent ? delay : 0,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute inset-0 w-full h-full"
            style={{
              pointerEvents: isCurrent ? "auto" : "none",
              zIndex: isCurrent ? 10 : 0,
              willChange: "transform, opacity",
            }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 80vw, 35vw"
              quality={70}
              priority={idx === 0}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Category Data
   ──────────────────────────────────────────────────────────── */
const categories = [
  {
    id: "wedding",
    eyebrow: "REAL MOMENTS. PURE EMOTIONS.",
    titleLine1: "Telling Stories",
    titleLine2: "Worth",
    titleHighlight: "Remembering",
    description:
      "We capture timeless moments and turn them into memories you'll cherish forever.",
    images: [
      "/wedding/1 (1).png",
      "/wedding/1 (2).png",
      "/wedding/1 (3).png",
    ],
    bottomImages: [
      "/wedding/1 (4).png",
      "/wedding/1 (5).png",
    ],
    videoUrl: heroData.videoSrc,
  },
  {
    id: "drone",
    eyebrow: "ELEVATED PERSPECTIVES. STUNNING VIEWS.",
    titleLine1: "Elevating Every",
    titleLine2: "Unique",
    titleHighlight: "Perspective",
    description:
      "Aerial cinematography and photography revealing the world from extraordinary new vantage points.",
    images: [
      "/drone/imgi_2_1.jpg",
      "/drone/imgi_11_6.jpg",
      "/drone/imgi_12_9.jpg",
    ],
    bottomImages: [
      "/drone/imgi_10_3.jpg",
      "/drone/imgi_4_7.jpg",
    ],
    videoUrl: heroData.videoSrc,
  },
  {
    id: "landscape",
    eyebrow: "SILENT HORIZONS. TIMELESS BEAUTY.",
    titleLine1: "Capturing Earth's",
    titleLine2: "Silent",
    titleHighlight: "Majesty",
    description:
      "Fine art landscape photography preserving nature's most awe-inspiring panoramic moments.",
    images: [
      "/landscape/imgi_2_1 (1).jpg",
      "/landscape/imgi_8_8.jpg",
      "/landscape/imgi_7_4.jpg",
    ],
    bottomImages: [
      "/landscape/imgi_11_8.jpg",
      "/landscape/imgi_3_5.jpg",
    ],
    videoUrl: heroData.videoSrc,
  },
  {
    id: "realestate",
    eyebrow: "PREMIUM SPACES. ARCHITECTURAL BEAUTY.",
    titleLine1: "Showcasing Fine",
    titleLine2: "Properties &",
    titleHighlight: "Interiors",
    description:
      "Professional interior and exterior photography capturing the architectural detail and character of luxury estates.",
    images: [
      "/drone/imgi_6_2.jpg",
      "/drone/imgi_7_5.jpg",
      "/drone/imgi_13_12.jpg",
    ],
    bottomImages: [
      "/drone/imgi_9_11.jpg",
      "/drone/imgi_5_10.jpg",
    ],
    videoUrl: heroData.videoSrc,
  },
];

/* ────────────────────────────────────────────────────────────
   Stats Bar Data
   ──────────────────────────────────────────────────────────── */
const stats = [
  { icon: Camera, value: "100+", label: "WEDDINGS CAPTURED" },
  { icon: Heart, value: "STORY DRIVEN", label: "CINEMATIC APPROACH" },
  { icon: Users, value: "5.0 ★", label: "RATED BY COUPLES" },
  { icon: Globe, value: "AVAILABLE", label: "WORLDWIDE" },
];

/* ────────────────────────────────────────────────────────────
   Hero Component
   ──────────────────────────────────────────────────────────── */
export function Hero({
  isParentLoaded = true,
}: {
  isParentLoaded?: boolean;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>(undefined);
  const intervalRef = useRef<NodeJS.Timeout>(undefined);

  /* Parallax scroll transforms */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], ["0px", "-50px"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0px", "-80px"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0px", "-30px"]);
  const y4 = useTransform(scrollYProgress, [0, 1], ["0px", "-55px"]);
  const y5 = useTransform(scrollYProgress, [0, 1], ["0px", "-40px"]);

  /* Trigger loaded state from parent (preloader) */
  useEffect(() => {
    if (isParentLoaded) setIsLoaded(true);
  }, [isParentLoaded]);

  /* Auto-cycle categories */
  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCategoryIndex((prev) => (prev + 1) % categories.length);
    }, 5500);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    timeoutRef.current = setTimeout(() => {
      setCategoryIndex(1);
      startAutoPlay();
    }, 7500);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isLoaded, startAutoPlay]);

  const handleCategoryClick = useCallback(
    (idx: number) => {
      setCategoryIndex(idx);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      startAutoPlay();
    },
    [startAutoPlay]
  );

  const currentCategory = categories[categoryIndex];

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full bg-background overflow-hidden md:min-h-svh md:flex md:flex-col"
    >
      {/* ── Aurora WebGL Background ── */}
      <div className="absolute inset-0 pointer-events-none opacity-95 z-0 select-none bg-[radial-gradient(circle_at_15%_25%,rgba(203,163,88,0.1)_0%,transparent_60%),radial-gradient(circle_at_85%_35%,rgba(203,163,88,0.08)_0%,transparent_60%)]">
        <Aurora
          colorStops={["#081730", "#cba358", "#4e7bb0"]}
          blend={0.65}
          amplitude={1.3}
          speed={0.45}
        />
      </div>
      {/* ── Left Pagination (desktop) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1 }}
        className="hidden md:flex flex-col items-start gap-4 absolute left-6 lg:left-10 bottom-28 z-30"
      >
        {categories.map((cat, idx) => {
          const isActive = categoryIndex === idx;
          const displayLabel = 
            cat.id === "wedding" 
              ? "Wedding" 
              : cat.id === "drone" 
                ? "Drone" 
                : cat.id === "landscape" 
                  ? "Landscape" 
                  : "Real Estate";

          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(idx)}
              className="flex items-center gap-3 group text-left focus:outline-none"
            >
              <div className="flex flex-col items-center">
                <span className={`font-sans text-[12px] tracking-wider transition-colors duration-300 ${
                  isActive ? "text-gold font-semibold" : "text-white/25 group-hover:text-white/55"
                }`}>
                  {String(idx + 1).padStart(2, "0")}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="w-4 h-[1px] bg-gold mt-1"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </div>
              
              <span className={`font-sans text-[9px] tracking-[0.2em] uppercase transition-all duration-300 ${
                isActive 
                  ? "text-gold opacity-100 translate-x-0 w-auto font-medium" 
                  : "text-white/0 opacity-0 -translate-x-2 w-0 overflow-hidden pointer-events-none group-hover:text-white/35 group-hover:opacity-100 group-hover:translate-x-0 group-hover:w-auto"
              }`}>
                {displayLabel}
              </span>
            </button>
          );
        })}

        <div className="flex flex-col items-center gap-2 mt-6 pt-4 border-t border-foreground/10 self-center">
          <span className="text-foreground/25 font-sans text-[9px] tracking-[0.25em] uppercase">
            Scroll
          </span>
          <svg
            className="w-3 h-3 text-foreground/25 animate-bounce-slow"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M6 1v10M1 6l5 5 5-5" />
          </svg>
        </div>
      </motion.div>

      {/* ── Right Vertical Text (large desktop) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.2 }}
        className="hidden lg:flex absolute right-5 xl:right-8 top-1/2 -translate-y-1/2 z-30"
      >
        <span
          className="text-foreground/15 font-sans text-[9px] tracking-[0.4em] uppercase whitespace-nowrap"
          style={{ writingMode: "vertical-rl" }}
        >
          Capturing Love — Crafting Memories
        </span>
      </motion.div>

      {/* ── Main Content ── */}
      <div className="md:flex-1 relative max-w-[1440px] mx-auto w-full px-5 md:px-14 lg:px-20 xl:px-24 pt-20 md:pt-24 lg:pt-[88px] pb-4 md:pb-6 md:flex md:flex-col">
        <div className="grid grid-cols-1 md:grid-cols-[4.5fr_5.5fr] gap-8 md:gap-6 lg:gap-8 md:flex-1 relative">
          {/* ─── LEFT COLUMN: Text Content ─── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col justify-between order-2 md:order-1 py-4 md:py-6 lg:py-10 md:h-full md:transform md:translate-x-[16%] md:-translate-y-[10%]"
          >
            {/* Text Content */}
            <div className="flex flex-col justify-center flex-1 flex-shrink-0">
              <div className="relative w-full min-h-[250px] sm:min-h-[270px] md:min-h-[290px] lg:min-h-[310px] flex items-center mb-6 md:mb-8">
                <motion.div
                  key={`content-${categoryIndex}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full flex flex-col justify-center"
                >
                  {/* Eyebrow */}
                  <div className="mb-4 md:mb-5 flex flex-col gap-3">
                    <p className="text-gold/70 font-sans text-[10px] md:text-[11px] tracking-[0.3em] uppercase">
                      {currentCategory.eyebrow}
                    </p>
                    <div className="gold-rule" />
                  </div>

                  {/* Title (staggered internally) */}
                  <div className="mb-4 md:mb-5">
                    <h1>
                      <motion.span
                        initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                        className="block font-laluxes-serif text-[clamp(2rem,4.8vw,3.5rem)] leading-[1.1] text-foreground md:whitespace-nowrap"
                      >
                        {currentCategory.titleLine1}
                      </motion.span>

                      <motion.span
                        initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                        className="block font-laluxes-serif text-[clamp(2rem,4.8vw,3.5rem)] leading-[1.1] text-foreground md:whitespace-nowrap"
                      >
                        {currentCategory.titleLine2}{" "}
                        <span className="font-laluxes-script text-gold text-[1.15em] normal-case">
                          {currentCategory.titleHighlight}
                        </span>
                      </motion.span>
                    </h1>
                  </div>

                  {/* Description */}
                  <p className="text-foreground/45 font-sans text-[13px] md:text-[14px] leading-[1.7] max-w-[380px]">
                    {currentCategory.description}
                  </p>
                </motion.div>
              </div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-wrap items-center gap-5 md:gap-7"
              >
                <Magnetic strength={0.18}>
                  <a
                    href="#work"
                    className="group relative inline-flex items-center gap-3 px-6 py-3 bg-gold hover:bg-gold-light border border-transparent rounded-sm transition-colors duration-300 z-10"
                  >
                    <span className="relative z-10 font-sans text-[10px] tracking-[0.22em] uppercase font-semibold text-background transition-colors duration-300">
                      Explore Our Work
                    </span>
                    <ArrowRight className="relative z-10 w-3.5 h-3.5 text-background transition-colors duration-300" />
                  </a>
                </Magnetic>

                <button
                  onClick={() => setIsVideoOpen(true)}
                  className="group inline-flex items-center gap-3 hover:opacity-80 transition-opacity duration-300"
                >
                  <span className="flex items-center justify-center w-10 h-10 rounded-full border border-white/15 group-hover:border-white/40 transition-colors duration-300">
                    <Play className="w-3.5 h-3.5 text-foreground/70 fill-foreground/70 group-hover:text-white group-hover:fill-white transition-colors duration-300 ml-0.5" />
                  </span>
                  <span className="font-sans text-[11px] tracking-[0.18em] uppercase text-foreground/60 group-hover:text-foreground/80 transition-colors duration-300">
                    Watch Reel
                  </span>
                </button>
              </motion.div>
            </div>
            {/* Bottom Spacer to match absolute Bottom-Left Image height */}
            <div className="hidden md:block h-[27%] w-full flex-shrink-0" />
          </motion.div>

          {/* ─── RIGHT COLUMN: Image Collage ─── */}
          <div className="relative order-1 md:order-2 min-h-[340px] sm:min-h-[400px] md:h-full md:min-h-[420px] lg:min-h-[480px] xl:min-h-[540px]">
            {/* Arched Image (center-left of collage) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 1.2,
                delay: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute left-[10%] top-0 w-[48.7%] h-[71%] rounded-t-full overflow-hidden z-10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-gold/30"
              style={{ y: y1 }}
            >
              <CategoryImage
                categoryIndex={categoryIndex}
                imageIndex={0}
                alt={`${currentCategory.id} hero arched`}
                delay={0}
              />
              <div className="absolute inset-[10px] border border-gold/25 rounded-t-full pointer-events-none z-20" />
            </motion.div>

            {/* Top-Right Image (desktop only) */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 1.2,
                delay: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="hidden md:block absolute right-0 top-0 w-[39.3%] h-[68%] z-20 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-gold/20 rounded-md"
              style={{ y: y2 }}
            >
              <CategoryImage
                categoryIndex={categoryIndex}
                imageIndex={1}
                alt={`${currentCategory.id} detail top`}
                delay={0.1}
              />
              <div className="absolute inset-[10px] border border-gold/15 pointer-events-none z-20" />
            </motion.div>

            {/* Bottom-Right Image (desktop only) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 1.2,
                delay: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="hidden md:block absolute right-0 bottom-0 w-[39.3%] h-[30%] z-10 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-gold/20 rounded-md"
              style={{ y: y5 }}
            >
              <CategoryImage
                categoryIndex={categoryIndex}
                imageIndex={2}
                alt={`${currentCategory.id} detail bottom`}
                delay={0.4}
              />
              <div className="absolute inset-[10px] border border-gold/15 pointer-events-none z-20" />
            </motion.div>
          </div>

          {/* ─── BOTTOM IMAGES: Positioned relative to grid wrapper to touch seamlessly ─── */}
          {/* Bottom-Left Image (desktop only) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 1.2,
              delay: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ y: y5 }}
            className="hidden md:block absolute left-[10%] bottom-0 w-[29.3%] h-[27%] z-20 overflow-hidden rounded-l-md border border-gold/20 shadow-[0_12px_40px_rgba(0,0,0,0.5)] bg-black/10"
          >
            <CategoryImage
              categoryIndex={categoryIndex}
              imageIndex={0}
              alt={`${currentCategory.id} bottom detail left`}
              delay={0.2}
              useBottomImages={true}
            />
            <div className="absolute inset-[10px] border border-gold/15 rounded-l-[4px] pointer-events-none z-20" />
          </motion.div>

          {/* Bottom-Mid Image (desktop only) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 1.2,
              delay: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ y: y5 }}
            className="hidden md:block absolute left-[39.3%] bottom-0 w-[38.8%] h-[27%] z-20 overflow-hidden rounded-r-md border border-gold/20 shadow-[0_12px_40px_rgba(0,0,0,0.5)] bg-black/10"
          >
            <CategoryImage
              categoryIndex={categoryIndex}
              imageIndex={1}
              alt={`${currentCategory.id} bottom detail right`}
              delay={0.3}
              useBottomImages={true}
            />
            <div className="absolute inset-[10px] border border-gold/15 rounded-r-[4px] pointer-events-none z-20" />
          </motion.div>
        </div>
      </div>

      {/* ── Stats Bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 1 }}
        className="border-t border-white/[0.06]"
      >
        <div className="max-w-[1440px] mx-auto px-5 md:px-14 lg:px-20 xl:px-24 py-4 md:py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 md:gap-x-0">
            {stats.map((stat, idx) => (
              <div key={idx} className={`flex items-center gap-4 px-2 md:px-6 ${idx > 0 ? "md:border-l md:border-white/[0.08]" : ""
                }`}>
                <stat.icon className="w-5 h-5 text-gold shrink-0" />
                <div className="min-w-0">
                  <p className="text-foreground font-sans text-[12px] md:text-[13px] font-semibold tracking-wide leading-tight">
                    {stat.value}
                  </p>
                  <p className="text-foreground/35 font-sans text-[8px] md:text-[9px] tracking-[0.18em] uppercase leading-tight">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Video Modal ── */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoUrl={currentCategory.videoUrl}
        title={`${currentCategory.id.charAt(0).toUpperCase() + currentCategory.id.slice(1)} — Director's Reel`}
      />
    </section>
  );
}
