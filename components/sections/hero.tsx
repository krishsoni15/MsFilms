"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { siteData, heroData } from "@/lib/data";
import { VideoModal } from "@/components/video-modal";
import { Magnetic } from "@/components/ui/magnetic";
import { Aurora } from "@/components/ui/aurora";
import { ArrowRight, Play } from "lucide-react";
import BorderGlow from "@/components/ui/border-glow";

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
  const cat = categories[categoryIndex];
  const src = useBottomImages ? cat.bottomImages[imageIndex] : cat.images[imageIndex];

  return (
    <div className="relative w-full h-full overflow-hidden rounded-[inherit] bg-black/10">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={src}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{
            duration: 0.8,
            delay,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="absolute inset-0 w-full h-full"
          style={{ willChange: "transform, opacity" }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 80vw, 35vw"
            quality={75}
            priority
          />
        </motion.div>
      </AnimatePresence>
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
  {
    id: "events",
    eyebrow: "UNFORGETTABLE MOMENTS. CANDID SHOTS.",
    titleLine1: "Preserving Every",
    titleLine2: "Special",
    titleHighlight: "Celebration",
    description:
      "Capturing the energy, emotion, and candid moments of your family events, ceremonies, and special celebrations.",
    images: [
      "/drone/imgi_11_6.jpg",
      "/drone/imgi_2_1.jpg",
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      className="relative w-full bg-background overflow-hidden lg:min-h-svh lg:flex lg:flex-col"
    >
      {/* ── Aurora WebGL Background ── */}
      <div className="absolute inset-0 pointer-events-none opacity-95 z-0 select-none bg-[radial-gradient(circle_at_50%_20%,rgba(203,163,88,0.06)_0%,transparent_70%)] lg:bg-[radial-gradient(circle_at_15%_25%,rgba(203,163,88,0.1)_0%,transparent_60%),radial-gradient(circle_at_85%_35%,rgba(203,163,88,0.08)_0%,transparent_60%)]">
        <Aurora
          colorStops={["#081730", "#cba358", "#4e7bb0"]}
          blend={isMobile ? 0.9 : 0.65}
          amplitude={isMobile ? 0.65 : 1.3}
          speed={0.45}
        />
      </div>

      {/* ── Left Vertical Selectors & Scroll Indicator (Bottom Left Desktop) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1 }}
        className="hidden lg:flex flex-col items-start gap-6 absolute left-8 lg:left-12 bottom-24 z-30"
      >
        <div className="flex flex-col items-start gap-4">
          {categories.map((cat, idx) => {
            const isActive = categoryIndex === idx;
            const displayLabel =
              cat.id === "wedding"
                ? "Wedding"
                : cat.id === "realestate"
                  ? "Real Estate"
                  : "Events";

            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(idx)}
                className="flex items-center gap-3 group text-left focus:outline-none"
              >
                <div className="flex flex-col items-center">
                  <span className={`font-sans text-[12px] tracking-wider transition-colors duration-300 ${isActive ? "text-gold font-semibold" : "text-white/25 group-hover:text-white/55"
                    }`}>
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicatorDesktop"
                      className="w-4 h-[1px] bg-gold mt-1"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </div>

                <span className={`font-sans text-[9px] tracking-[0.25em] uppercase transition-all duration-300 ${isActive
                  ? "text-gold opacity-100 translate-x-0 w-auto font-medium"
                  : "text-white/0 opacity-0 -translate-x-2 w-0 overflow-hidden pointer-events-none group-hover:text-white/35 group-hover:opacity-100 group-hover:translate-x-0 group-hover:w-auto"
                  }`}>
                  {displayLabel}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col items-start gap-2 mt-2 pt-4 border-t border-foreground/10 w-16">
          <span className="text-foreground/25 font-sans text-[9px] tracking-[0.25em] uppercase">
            Scroll
          </span>
          <svg
            className="w-3.5 h-3.5 text-foreground/25 animate-bounce-slow ml-1"
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
      <div className="lg:flex-1 relative max-w-[1440px] mx-auto w-full px-5 lg:px-14 lg:px-20 xl:px-24 pt-20 lg:pt-24 lg:pt-[88px] pb-4 lg:pb-6 lg:flex lg:flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-[4.5fr_5.5fr] gap-4 lg:gap-6 lg:gap-8 lg:flex-1 relative">
          {/* ─── LEFT COLUMN: Text Content ─── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col justify-between order-2 lg:order-1 pt-1 pb-4 lg:py-6 lg:py-10 lg:h-full lg:transform lg:translate-x-[16%] lg:-translate-y-[10%]"
          >
            {/* Text Content */}
            <div className="flex flex-col justify-center flex-1 flex-shrink-0">
              <div className="relative w-full min-h-[250px] sm:min-h-[270px] lg:min-h-[310px] flex items-center">
                <motion.div
                  key={`content-${categoryIndex}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full flex flex-col justify-center"
                >
                  {/* Eyebrow */}
                  <div className="mb-4 lg:mb-5 flex flex-col gap-3">
                    <p className="text-gold/70 font-sans text-[10px] lg:text-[11px] tracking-[0.3em] uppercase">
                      {currentCategory.eyebrow}
                    </p>
                    <div className="gold-rule" />
                  </div>

                  {/* Title (staggered internally) */}
                  <div className="mb-4 lg:mb-5">
                    <h1>
                      <motion.span
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                        className="block font-laluxes-serif text-[clamp(2rem,4.8vw,3.5rem)] leading-[1.1] text-foreground lg:whitespace-nowrap"
                      >
                        {currentCategory.titleLine1}
                      </motion.span>

                      <motion.span
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                        className="block font-laluxes-serif text-[clamp(2rem,4.8vw,3.5rem)] leading-[1.1] text-foreground lg:whitespace-nowrap"
                      >
                        {currentCategory.titleLine2}{" "}
                        <span className="font-laluxes-script text-gold text-[1.15em] normal-case">
                          {currentCategory.titleHighlight}
                        </span>
                      </motion.span>
                    </h1>
                  </div>

                  {/* Description */}
                  <p className="text-foreground/45 font-sans text-[13px] lg:text-[14px] leading-[1.7] max-w-[380px]">
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
                className="flex flex-wrap items-center gap-5 lg:gap-7"
              >
                <div className="relative shrink-0">
                  <BorderGlow
                    edgeSensitivity={20}
                    glowColor="35 85 75"
                    backgroundColor="transparent"
                    borderRadius={9999}
                    glowRadius={30}
                    glowIntensity={1.5}
                    coneSpread={25}
                    animated={false}
                    colors={["#c5a880", "#e5d5be", "#ffffff"]}
                    fillOpacity={0}
                    style={{
                      borderColor: "transparent",
                    }}
                  >
                    <a
                      href="#contact"
                      className="relative text-[11px] tracking-[0.2em] uppercase flex items-center gap-2.5 rounded-full px-7 py-3.5 text-white/80 border border-white/10 hover:border-gold/30 hover:text-white transition-all duration-300 font-sans focus:outline-none"
                      style={{
                        background: "linear-gradient(to bottom, rgba(197, 168, 128, 0.12) 0%, rgba(197, 168, 128, 0.01) 100%)",
                      }}
                    >
                      <span
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-full"
                        style={{
                          background: "linear-gradient(to bottom, rgba(197, 168, 128, 0.2) 0%, rgba(197, 168, 128, 0.05) 100%)",
                        }}
                      />
                      <span className="relative z-10 flex items-center gap-2.5">
                        Let&apos;s Talk
                        <ArrowRight size={13} className="transform group-hover:translate-x-1 transition-transform duration-300 text-current" />
                      </span>
                    </a>
                  </BorderGlow>
                </div>
              </motion.div>

              {/* Mobile-Only Category Selectors */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isLoaded ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 1 }}
                className="lg:hidden mt-10 w-full"
              >
                <div className="flex items-center justify-start gap-6 border-t border-white/10 pt-6">
                  {categories.map((cat, idx) => {
                    const isActive = categoryIndex === idx;
                    const displayLabel =
                      cat.id === "wedding"
                        ? "Wedding"
                        : cat.id === "realestate"
                          ? "Real Estate"
                          : "Events";

                    return (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryClick(idx)}
                        className="flex flex-col items-start gap-1 group focus:outline-none"
                      >
                        <span className={`font-sans text-[10px] tracking-[0.25em] uppercase transition-colors duration-300 ${isActive ? "text-gold font-medium" : "text-white/40"
                          }`}>
                          {displayLabel}
                        </span>
                        <div className="h-[2px] w-full relative mt-0.5">
                          {isActive ? (
                            <motion.div
                              layoutId="activeIndicatorMobileLine"
                              className="absolute inset-0 bg-gold"
                              transition={{ type: "spring", stiffness: 380, damping: 30 }}
                            />
                          ) : (
                            <div className="absolute inset-0 bg-transparent group-hover:bg-white/10 transition-colors duration-300" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </div>
            {/* Bottom Spacer to match absolute Bottom-Left Image height */}
            <div className="hidden lg:block h-[17%] w-full flex-shrink-0" />
          </motion.div>

          {/* ─── RIGHT COLUMN: Image Collage ─── */}
          <div className="relative order-1 lg:order-2 min-h-[340px] sm:min-h-[400px] lg:h-full lg:min-h-[480px] xl:min-h-[540px]">
            {/* Arched Image (center-left of collage) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 1.2,
                delay: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute left-1/2 -translate-x-1/2 lg:left-[10%] lg:translate-x-0 bottom-0 md:top-0 w-[75%] lg:w-[48.7%] h-[95%] lg:h-[71%] rounded-t-full overflow-hidden z-10 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
              style={{ y: y1 }}
            >
              <CategoryImage
                categoryIndex={categoryIndex}
                imageIndex={0}
                alt={`${currentCategory.id} hero arched`}
                delay={0}
              />
              {/* Interactive BorderGlow overlay */}
              <BorderGlow
                borderRadius={0}
                backgroundColor="transparent"
                glowColor="35 85 75"
                glowRadius={45}
                glowIntensity={1.5}
                edgeSensitivity={20}
                coneSpread={25}
                colors={["#c5a880", "#e5d5be", "#ffffff"]}
                fillOpacity={0.08}
                className="absolute inset-0 w-full h-full z-10 pointer-events-auto"
                style={{
                  borderRadius: "9999px 9999px 0px 0px",
                  borderColor: "rgba(197, 168, 128, 0.3)",
                  boxShadow: "none",
                }}
              >
                <div className="w-full h-full" />
              </BorderGlow>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 1.2,
                delay: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="hidden lg:block absolute right-0 top-0 w-[39.3%] h-[68%] z-20 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] rounded-md"
              style={{ y: y2 }}
            >
              <CategoryImage
                categoryIndex={categoryIndex}
                imageIndex={1}
                alt={`${currentCategory.id} detail top`}
                delay={0.1}
              />
              {/* Interactive BorderGlow overlay */}
              <BorderGlow
                borderRadius={6}
                backgroundColor="transparent"
                glowColor="35 85 75"
                glowRadius={45}
                glowIntensity={1.5}
                edgeSensitivity={20}
                coneSpread={25}
                colors={["#c5a880", "#e5d5be", "#ffffff"]}
                fillOpacity={0.08}
                className="absolute inset-0 w-full h-full z-10 pointer-events-auto"
                style={{
                  borderRadius: "6px",
                  borderColor: "rgba(197, 168, 128, 0.2)",
                  boxShadow: "none",
                }}
              >
                <div className="w-full h-full" />
              </BorderGlow>
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
              className="hidden lg:block absolute right-0 bottom-0 w-[39.3%] h-[30%] z-10 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] rounded-md"
              style={{ y: y5 }}
            >
              <CategoryImage
                categoryIndex={categoryIndex}
                imageIndex={2}
                alt={`${currentCategory.id} detail bottom`}
                delay={0.4}
              />
              {/* Interactive BorderGlow overlay */}
              <BorderGlow
                borderRadius={6}
                backgroundColor="transparent"
                glowColor="35 85 75"
                glowRadius={45}
                glowIntensity={1.5}
                edgeSensitivity={20}
                coneSpread={25}
                colors={["#c5a880", "#e5d5be", "#ffffff"]}
                fillOpacity={0.08}
                className="absolute inset-0 w-full h-full z-10 pointer-events-auto"
                style={{
                  borderRadius: "6px",
                  borderColor: "rgba(197, 168, 128, 0.2)",
                  boxShadow: "none",
                }}
              >
                <div className="w-full h-full" />
              </BorderGlow>
            </motion.div>
          </div>

          {/* ─── BOTTOM IMAGES: Positioned with 1.0% gap and rounded corners ─── */}
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
            className="hidden lg:block absolute left-[19%] bottom-0 w-[24.3%] h-[27%] z-20 overflow-hidden rounded-md shadow-[0_12px_40px_rgba(0,0,0,0.5)] bg-black/10"
          >
            <CategoryImage
              categoryIndex={categoryIndex}
              imageIndex={0}
              alt={`${currentCategory.id} bottom detail left`}
              delay={0.2}
              useBottomImages={true}
            />
            {/* Interactive BorderGlow overlay */}
            <BorderGlow
              borderRadius={6}
              backgroundColor="transparent"
              glowColor="35 85 75"
              glowRadius={45}
              glowIntensity={1.5}
              edgeSensitivity={20}
              coneSpread={25}
              colors={["#c5a880", "#e5d5be", "#ffffff"]}
              fillOpacity={0.08}
              className="absolute inset-0 w-full h-full z-10 pointer-events-auto"
              style={{
                borderRadius: "6px",
                borderColor: "rgba(197, 168, 128, 0.2)",
                boxShadow: "none",
              }}
            >
              <div className="w-full h-full" />
            </BorderGlow>
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
            className="hidden lg:block absolute left-[44.3%] bottom-0 w-[33.8%] h-[27%] z-20 overflow-hidden rounded-md shadow-[0_12px_40px_rgba(0,0,0,0.5)] bg-black/10"
          >
            <CategoryImage
              categoryIndex={categoryIndex}
              imageIndex={1}
              alt={`${currentCategory.id} bottom detail right`}
              delay={0.3}
              useBottomImages={true}
            />
            {/* Interactive BorderGlow overlay */}
            <BorderGlow
              borderRadius={6}
              backgroundColor="transparent"
              glowColor="35 85 75"
              glowRadius={45}
              glowIntensity={1.5}
              edgeSensitivity={20}
              coneSpread={25}
              colors={["#c5a880", "#e5d5be", "#ffffff"]}
              fillOpacity={0.08}
              className="absolute inset-0 w-full h-full z-10 pointer-events-auto"
              style={{
                borderRadius: "6px",
                borderColor: "rgba(197, 168, 128, 0.2)",
                boxShadow: "none",
              }}
            >
              <div className="w-full h-full" />
            </BorderGlow>
          </motion.div>
        </div>
      </div>





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
