"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
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

function CategoryImage({ categoryIndex, imageIndex, alt, delay = 0, useBottomImages = false }: CategoryImageProps) {
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
    titleHighlight: "Remembering.",
    description:
      "We capture timeless moments and turn them into memories you'll cherish forever.",
    images: [
      "/wedding/imgi_3_5.png",
      "/wedding/imgi_7_3.jpg",
      "/wedding/imgi_8_6.jpg",
    ],
    bottomImages: [
      "/wedding/imgi_6_4.jpg",
      "/wedding/imgi_4_7.jpg",
    ],
    videoUrl: heroData.videoSrc,
  },
  {
    id: "portraits",
    eyebrow: "GENUINE CHARACTER. NATURAL LIGHT.",
    titleLine1: "Capturing Persona",
    titleLine2: "With",
    titleHighlight: "Authenticity.",
    description:
      "Professional portrait sessions capturing genuine character and personal expressions in studio and natural light settings.",
    images: [
      "/landscape/imgi_9_3.jpg",
      "/me/imgi_85_622505371_18140539135468400_2765037163092247242_n.jpg",
      "/landscape/imgi_10_6.jpg",
    ],
    bottomImages: [
      "/me/imgi_36_625043456_18087932393515848_4263036374454868947_n.jpg",
      "/me/jerry_patel.png",
    ],
    videoUrl: heroData.videoSrc,
  },
  {
    id: "landscape",
    eyebrow: "SILENT HORIZONS. TIMELESS BEAUTY.",
    titleLine1: "Capturing Earth's",
    titleLine2: "Silent",
    titleHighlight: "Majesty.",
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
    id: "drone",
    eyebrow: "ELEVATED PERSPECTIVES. STUNNING VIEWS.",
    titleLine1: "Elevating Every",
    titleLine2: "Unique",
    titleHighlight: "Perspective.",
    description:
      "Aerial cinematography that reveals the world from extraordinary new vantage points.",
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
      <div className="absolute inset-0 pointer-events-none opacity-85 z-0 select-none bg-[radial-gradient(circle_at_15%_25%,rgba(203,163,88,0.07)_0%,transparent_60%),radial-gradient(circle_at_85%_35%,rgba(203,163,88,0.06)_0%,transparent_60%)]">
        <Aurora
          colorStops={["#051126", "#cba358", "#ffffff"]}
          blend={0.6}
          amplitude={1.2}
          speed={0.45}
        />
      </div>
      {/* ── Left Pagination (desktop) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1 }}
        className="hidden md:flex flex-col items-center gap-3.5 absolute left-6 lg:left-10 bottom-28 z-30"
      >
        {categories.map((cat, idx) => (
          <div key={cat.id} className="flex flex-col items-center gap-1.5">
            <button
              onClick={() => handleCategoryClick(idx)}
              className={`font-sans text-[13px] tracking-wider transition-all duration-500 leading-none ${
                categoryIndex === idx
                  ? "text-gold font-semibold"
                  : "text-foreground/25 hover:text-foreground/50"
              }`}
            >
              {String(idx + 1).padStart(2, "0")}
            </button>
            {categoryIndex === idx && (
              <motion.div
                layoutId="activeIndicator"
                className="w-4 h-[1px] bg-gold"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </div>
        ))}

        <div className="flex flex-col items-center gap-2 mt-6 pt-4 border-t border-foreground/10">
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
      <div className="md:flex-1 relative max-w-[1440px] mx-auto w-full px-5 md:px-14 lg:px-20 xl:px-24 pt-24 md:pt-28 lg:pt-32 pb-8 md:pb-10 md:flex md:flex-col">
        <div className="grid grid-cols-1 md:grid-cols-[4.5fr_5.5fr] gap-8 md:gap-6 lg:gap-8 md:flex-1">
          {/* ─── LEFT COLUMN: Text + Bottom Images ─── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col justify-between order-2 md:order-1 py-4 md:py-6 lg:py-10"
          >
            {/* Text Content */}
            <div className="flex flex-col justify-center flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`content-${categoryIndex}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Eyebrow */}
                  <p className="text-gold/70 font-sans text-[10px] md:text-[11px] tracking-[0.3em] uppercase mb-5 md:mb-7">
                    {currentCategory.eyebrow}
                  </p>

                  {/* Title (staggered internally) */}
                  <div className="mb-5 md:mb-7">
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
                  <p className="text-foreground/45 font-sans text-[13px] md:text-[14px] leading-[1.7] max-w-[380px] mb-8 md:mb-10">
                    {currentCategory.description}
                  </p>
                </motion.div>
              </AnimatePresence>

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

            {/* Bottom Image Pair (desktop only) — Dynamic per category */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 1.2,
                delay: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ y: y3 }}
              className="hidden md:grid grid-cols-[3.5fr_6.5fr] gap-0 mt-8 lg:mt-10 aspect-[3.2/1] rounded-sm overflow-hidden border border-gold/12 shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
            >
              <div className="relative w-full h-full border-r border-gold/12 bg-black/10">
                <CategoryImage
                  categoryIndex={categoryIndex}
                  imageIndex={0}
                  alt={`${currentCategory.id} bottom detail left`}
                  delay={0.2}
                  useBottomImages={true}
                />
              </div>
              <div className="relative w-full h-full bg-black/10">
                <CategoryImage
                  categoryIndex={categoryIndex}
                  imageIndex={1}
                  alt={`${currentCategory.id} bottom detail right`}
                  delay={0.3}
                  useBottomImages={true}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* ─── RIGHT COLUMN: Image Collage ─── */}
          <div className="relative order-1 md:order-2 min-h-[380px] sm:min-h-[440px] md:min-h-0">
            {/* Arched Image (center of collage) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 1.2,
                delay: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute left-[10%] top-[3%] w-[75%] h-[90%] md:left-[3%] md:top-[0%] md:w-[54%] md:h-[55%] rounded-t-full overflow-hidden z-10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-gold/12"
              style={{ y: y1 }}
            >
              <CategoryImage
                categoryIndex={categoryIndex}
                imageIndex={0}
                alt={`${currentCategory.id} hero arched`}
                delay={0}
              />
              <div className="absolute inset-[5px] border border-gold/8 rounded-t-full pointer-events-none z-20" />
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
              className="hidden md:block absolute right-0 top-0 w-[40%] h-[55%] z-20 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-gold/12 rounded-sm"
              style={{ y: y2 }}
            >
              <CategoryImage
                categoryIndex={categoryIndex}
                imageIndex={1}
                alt={`${currentCategory.id} detail top`}
                delay={0.1}
              />
              <div className="absolute inset-[5px] border border-gold/8 pointer-events-none z-20" />
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
              className="hidden md:block absolute right-0 bottom-[2%] w-[40%] h-[38%] z-10 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-gold/12 rounded-sm"
              style={{ y: y5 }}
            >
              <CategoryImage
                categoryIndex={categoryIndex}
                imageIndex={2}
                alt={`${currentCategory.id} detail bottom`}
                delay={0.4}
              />
              <div className="absolute inset-[5px] border border-gold/8 pointer-events-none z-20" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Stats Bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 1 }}
        className="border-t border-white/[0.06]"
      >
        <div className="max-w-[1440px] mx-auto px-5 md:px-14 lg:px-20 xl:px-24 py-5 md:py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 md:gap-x-0">
            {stats.map((stat, idx) => (
              <div key={idx} className={`flex items-center gap-4 px-2 md:px-6 ${
                idx > 0 ? "md:border-l md:border-white/[0.08]" : ""
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
