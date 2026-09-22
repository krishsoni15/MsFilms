"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { heroData } from "@/lib/data";
import { VideoModal } from "@/components/video-modal";
import { ArrowRight, Play, MessageCircle } from "lucide-react";
import BorderGlow from "@/components/ui/border-glow";

/* ────────────────────────────────────────────────────────────
   Custom Brand SVGs for Social Links
   ──────────────────────────────────────────────────────────── */
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

/* ────────────────────────────────────────────────────────────
   Animated Category Image — crossfade with subtle zoom
   ──────────────────────────────────────────────────────────── */
interface CategoryImageProps {
  src: string;
  alt: string;
  objectPosition?: string;
  priority?: boolean;
}

function CrossfadeImage({ src, alt, objectPosition = "center", priority = false }: CategoryImageProps) {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-[inherit]">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={src}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full"
          style={{ willChange: "transform, opacity" }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            style={{ objectPosition }}
            sizes="(max-width: 768px) 80vw, 35vw"
            quality={75}
            priority={priority}
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
    label: "Wedding",
    eyebrow: "REAL MOMENTS. PURE EMOTIONS.",
    titleLine1: "Telling Stories",
    titleLine2: "Worth",
    titleHighlight: "Remembering",
    description:
      "We create cinematic wedding films and photographs that turn moments into memories you'll cherish forever.",
    bgImage: "/wedding/hero_wedding_bg_new.png",
    leftImage: "/wedding/1_2.png",
    rightImage: "/wedding/1_3.png",
    leftImagePosition: "center",
    rightImagePosition: "center",
    leftImageLabel: "MORE\nTHAN\nA DAY",
    rightImageLabel: "A\nSTORY\nOF\nTWO",
    bottomCards: [
      { num: "01", label: "WEDDINGS", image: "/wedding/1_4.png", imagePosition: "90% 20%" },
      { num: "02", label: "PRE-WEDDINGS", image: "/wedding/1_5.png", imagePosition: "center 20%" },
      { num: "03", label: "CINEMATIC FILMS", image: "/wedding/1_1.png", imagePosition: "center 20%" },
    ],
    videoUrl: heroData.videoSrc,
  },
  {
    id: "realestate",
    label: "Real Estate",
    eyebrow: "PREMIUM SPACES. ARCHITECTURAL BEAUTY.",
    titleLine1: "Showcasing Fine",
    titleLine2: "Properties &",
    titleHighlight: "Interiors",
    description:
      "Professional interior and exterior photography capturing the architectural detail and character of luxury estates.",
    bgImage: "/real-estate/img_2.jpg",
    leftImage: "/real-estate/img_1.jpg",
    rightImage: "/real-estate/img_3.jpg",
    leftImagePosition: "center",
    rightImagePosition: "center",
    leftImageLabel: "LUXURY\nLIVING",
    rightImageLabel: "FINE\nSPACES",
    bottomCards: [
      { num: "01", label: "INTERIORS", image: "/real-estate/img_4.jpg", imagePosition: "center 20%" },
      { num: "02", label: "EXTERIORS", image: "/real-estate/img_5.jpg", imagePosition: "center 20%" },
      { num: "03", label: "AERIAL VIEWS", image: "/drone/imgi_2_1.jpg", imagePosition: "center 20%" },
    ],
    videoUrl: heroData.videoSrc,
  },
  {
    id: "events",
    label: "Events",
    eyebrow: "UNFORGETTABLE MOMENTS. CANDID SHOTS.",
    titleLine1: "Preserving Every",
    titleLine2: "Special",
    titleHighlight: "Celebration",
    description:
      "Capturing the energy, emotion, and candid moments of your family events, ceremonies, and special celebrations.",
    bgImage: "/drone/imgi_11_6.jpg",
    leftImage: "/drone/imgi_2_1.jpg",
    rightImage: "/drone/imgi_12_9.jpg",
    leftImagePosition: "center",
    rightImagePosition: "center",
    leftImageLabel: "EVERY\nMOMENT\nMATTERS",
    rightImageLabel: "PURE\nJOY",
    bottomCards: [
      { num: "01", label: "CEREMONIES", image: "/drone/imgi_10_3.jpg", imagePosition: "center 20%" },
      { num: "02", label: "CELEBRATIONS", image: "/drone/imgi_4_7.jpg", imagePosition: "center 20%" },
      { num: "03", label: "GATHERINGS", image: "/drone/imgi_7_5.jpg", imagePosition: "center 20%" },
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
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 800], [1, 0.98]);
  const bgParallaxY = useTransform(scrollY, [0, 800], [0, 140]);
  const heroOpacity = useTransform(scrollY, [300, 850], [1, 0.35]);

  /* Multi-layered element parallax offsets */
  const leftCardY = useTransform(scrollY, [0, 600], [0, -35]);
  const rightCardY = useTransform(scrollY, [0, 600], [0, -50]);
  const centerTextY = useTransform(scrollY, [0, 600], [0, -20]);
  const bottomDeckY = useTransform(scrollY, [0, 600], [0, -60]);

  /* Trigger loaded state from parent (preloader) */
  useEffect(() => {
    if (isParentLoaded) setIsLoaded(true);
  }, [isParentLoaded]);

  /* Auto-cycle categories */
  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCategoryIndex((prev) => (prev + 1) % categories.length);
    }, 6500);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    timeoutRef.current = setTimeout(() => {
      setCategoryIndex(1);
      startAutoPlay();
    }, 8500);
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

  /* Staggered entrance animation helpers */
  const entrance = (delay: number) => ({
    initial: { opacity: 0, y: 30, filter: "blur(8px)" },
    animate: isLoaded
      ? { opacity: 1, y: 0, filter: "blur(0px)" }
      : { opacity: 0, y: 30, filter: "blur(8px)" },
    transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  });

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full overflow-hidden h-screen lg:h-svh flex flex-col z-0"
      style={{ backgroundColor: "var(--background)" }}
    >
      <motion.div
        style={{
          scale: heroScale,
          opacity: heroOpacity,
        }}
        className="relative w-full h-full flex flex-col overflow-hidden origin-center"
      >
        {/* ══════════════════════════════════════════════════════
            BACKGROUND LAYERS & SHADERS
            ══════════════════════════════════════════════════════ */}

        {/* Layer 0 & 1: Synchronized Background Image + Vibe Shader Overlay */}
        <motion.div style={{ y: bgParallaxY }} className="absolute inset-0 z-0">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={`bg-slide-${categoryIndex}`}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
              className="absolute inset-0"
            >
              {/* Background Image */}
              <Image
                src={currentCategory.bgImage}
                alt="Background"
                fill
                className="object-cover"
                style={{ filter: "blur(1px) brightness(0.8) contrast(1.1) sepia(0.12) saturate(1.05)", transform: "scale(1.06)" }}
                sizes="100vw"
                quality={75}
                priority={categoryIndex === 0}
              />

              {/* Synchronized Gold Light Leak Spotlight Shader */}
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background:
                    categoryIndex === 1
                      ? "radial-gradient(ellipse 70% 60% at 50% 38%, rgba(215,195,160,0.28) 0%, rgba(155,135,105,0.12) 40%, rgba(11,10,12,0.4) 75%, rgba(8,7,9,0.65) 100%), linear-gradient(180deg, rgba(8,7,9,0.3) 0%, transparent 45%, rgba(8,7,9,0.6) 100%)"
                      : categoryIndex === 2
                        ? "radial-gradient(ellipse 70% 60% at 50% 38%, rgba(230,175,135,0.28) 0%, rgba(170,120,110,0.12) 40%, rgba(12,8,10,0.4) 75%, rgba(8,5,7,0.65) 100%), linear-gradient(180deg, rgba(8,5,7,0.3) 0%, transparent 45%, rgba(8,5,7,0.6) 100%)"
                        : "radial-gradient(ellipse 70% 60% at 50% 38%, rgba(225,190,140,0.26) 0%, rgba(175,135,90,0.1) 40%, rgba(13,9,7,0.4) 75%, rgba(10,6,4,0.65) 100%), linear-gradient(180deg, rgba(10,6,4,0.3) 0%, transparent 45%, rgba(10,6,4,0.6) 100%)",
                }}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Layer 2: Soft Shimmering Vibe-Adaptive Gold Bloom Shader */}
        <div
          className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[580px] h-[340px] rounded-full blur-[100px] pointer-events-none z-[2] animate-pulse"
          style={{
            background:
              "radial-gradient(circle, var(--gold) 0%, var(--accent) 50%, transparent 100%)",
            opacity: 0.22,
            animationDuration: "6s",
          }}
        />

        {/* Layer 3: Subtle 35mm Film Grain Overlay (z-[40]) */}
        <div
          className="absolute inset-0 pointer-events-none z-[40]"
          style={{
            backgroundImage: `url('data:image/svg+xml,%3Csvg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="n"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23n)" opacity="0.03"/%3E%3C/svg%3E')`,
            backgroundRepeat: "repeat",
            opacity: 0.35,
          }}
        />

        {/* ══════════════════════════════════════════════════════
            LEFT SIDEBAR — Category Selectors + Vertical Text
            ══════════════════════════════════════════════════════ */}
        <motion.div
          {...entrance(1.0)}
          className="hidden lg:flex flex-col items-center gap-4 absolute left-4 xl:left-9 top-1/2 -translate-y-1/2 z-30"
        >
          {/* Top vertical accent line */}
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-gold/40 mb-1" />

          {/* Vertical label */}
          <span
            className="text-foreground/55 font-sans text-[8.5px] tracking-[0.48em] uppercase whitespace-nowrap font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] hover:text-gold transition-colors duration-300"
            style={{ writingMode: "vertical-rl" }}
          >
            CINEMATIC&emsp;·&emsp;TIMELESS&emsp;·&emsp;YOURS
          </span>

          {/* Vertical divider line */}
          <div className="w-px h-6 bg-gold/25 my-1" />

          {/* Category selectors */}
          <div className="flex flex-col items-center gap-4">
            {categories.map((cat, idx) => {
              const isActive = categoryIndex === idx;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(idx)}
                  className="flex flex-col items-center group focus:outline-none relative"
                >
                  {/* Floating label with clean tracking and position safety */}
                  <span
                    className={`absolute left-7.5 top-1/2 -translate-y-1/2 font-sans text-[7.5px] xl:text-[8px] tracking-[0.2em] uppercase whitespace-nowrap transition-all duration-500 z-20 ${isActive
                      ? "text-gold opacity-100 translate-x-0 font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
                      : "text-foreground/0 opacity-0 -translate-x-2 pointer-events-none group-hover:text-foreground/60 group-hover:opacity-100 group-hover:translate-x-0"
                      }`}
                  >
                    {cat.label}
                  </span>

                  {/* Numbered node */}
                  <div className="relative flex items-center justify-center w-5 h-5">
                    <span
                      className={`font-sans text-[9px] tracking-wider transition-colors duration-500 z-10 ${isActive ? "text-gold font-bold" : "text-foreground/40 group-hover:text-gold"
                        }`}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="activeCatRing"
                        className="absolute inset-0 rounded-full border border-gold/40 shadow-[0_0_8px_rgba(197,168,128,0.2)]"
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Scroll indicator */}
          <div className="flex flex-col items-center gap-2 mt-2 pt-3 border-t border-foreground/[0.08] w-8">
            <span className="text-foreground/40 font-sans text-[7px] tracking-[0.22em] uppercase font-semibold">
              Scroll
            </span>
            <div className="w-[16px] h-[26px] rounded-full border border-gold/20 flex justify-center p-1 relative overflow-hidden">
              <motion.div
                animate={{ y: [0, 6, 0], opacity: [0.3, 0.9, 0.3] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="w-[2px] h-[5px] rounded-full bg-gold"
              />
            </div>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════════
            RIGHT SIDEBAR — Location Text
            ══════════════════════════════════════════════════════ */}
        <motion.div
          {...entrance(1.1)}
          className="hidden lg:flex flex-col items-center absolute right-4 xl:right-9 top-1/2 -translate-y-1/2 z-30"
        >
          {/* Top vertical line */}
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-gold/40 mb-4" />
          <span
            className="text-foreground/55 font-sans text-[8.5px] tracking-[0.48em] uppercase whitespace-nowrap font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] hover:text-gold transition-colors duration-300"
            style={{ writingMode: "vertical-rl" }}
          >
            SASKATOON&emsp;·&emsp;CANADA
          </span>
          {/* Bottom vertical line */}
          <div className="w-px h-12 bg-gradient-to-t from-transparent to-gold/40 mt-4" />
        </motion.div>

        {/* ══════════════════════════════════════════════════════
            MAIN CONTENT
            ══════════════════════════════════════════════════════ */}
        <div className="relative flex-1 flex flex-col items-center justify-center z-10 px-4 lg:px-12 xl:px-32 pt-8 lg:pt-9 xl:pt-20 min-[1920px]:pt-24 min-h-0">
          <div className="relative w-full max-w-[1440px] min-[1920px]:max-w-[1800px] mx-auto flex-1 flex flex-col items-center justify-center">

            {/* ─── Left Tilted Image ─── */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotate: -12 }}
              animate={isLoaded ? { opacity: 1, y: 0, rotate: isMobile ? 0 : -7 } : {}}
              transition={{ duration: 1.3, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:block absolute left-[6%] lg:left-[7.5%] xl:left-[8%] 2xl:left-[8.5%] min-[1920px]:left-[8%] top-[14%] lg:top-[16%] xl:top-[14%] 2xl:top-[12%] min-[1920px]:top-[11%] w-[160px] lg:w-[175px] xl:w-[200px] 2xl:w-[240px] min-[1920px]:w-[310px] h-[250px] lg:h-[270px] xl:h-[310px] 2xl:h-[355px] min-[1920px]:h-[450px] z-20"
              style={{ transformOrigin: "center center", y: leftCardY }}
            >
              <div className="relative w-full h-full rounded-lg overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_35px_rgba(197,168,128,0.15)] ring-1 ring-gold/35">
                <CrossfadeImage
                  src={currentCategory.leftImage}
                  alt="Left feature"
                  objectPosition={currentCategory.leftImagePosition}
                  priority
                />
                {/* Dark gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none z-10" />
                {/* Gold inner frame */}
                <div className="absolute inset-[5px] border border-gold/35 pointer-events-none z-20 rounded-[3px]" />
                {/* Label text with underline line */}
                <div className="absolute bottom-4 left-4 z-30 flex flex-col items-start gap-1.5">
                  <span className="text-foreground font-sans text-[8.5px] xl:text-[9.5px] min-[1920px]:text-[11px] tracking-[0.35em] uppercase leading-[2.1] whitespace-pre-line font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                    {currentCategory.leftImageLabel}
                  </span>
                  <div className="w-6 min-[1920px]:w-9 h-[2px] bg-gold shadow-[0_1px_4px_rgba(0,0,0,0.8)]" />
                </div>
                {/* Warm tint overlay on image */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#8B6914]/[0.08] to-transparent pointer-events-none z-10 mix-blend-overlay" />
              </div>
            </motion.div>

            {/* ─── Right Tilted Image ─── */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotate: 12 }}
              animate={isLoaded ? { opacity: 1, y: 0, rotate: isMobile ? 0 : 7 } : {}}
              transition={{ duration: 1.3, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:block absolute right-[6%] lg:right-[7.5%] xl:right-[8%] 2xl:right-[8.5%] min-[1920px]:right-[8%] top-[11%] lg:top-[13%] xl:top-[11%] 2xl:top-[9%] min-[1920px]:top-[8%] w-[160px] lg:w-[175px] xl:w-[200px] 2xl:w-[240px] min-[1920px]:w-[310px] h-[265px] lg:h-[285px] xl:h-[325px] 2xl:h-[375px] min-[1920px]:h-[470px] z-20"
              style={{ transformOrigin: "center center", y: rightCardY }}
            >
              <div className="relative w-full h-full rounded-lg overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_35px_rgba(197,168,128,0.15)] ring-1 ring-gold/35">
                <CrossfadeImage
                  src={currentCategory.rightImage}
                  alt="Right feature"
                  objectPosition={currentCategory.rightImagePosition}
                />
                {/* Dark gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none z-10" />
                {/* Gold inner frame */}
                <div className="absolute inset-[5px] border border-gold/35 pointer-events-none z-20 rounded-[3px]" />
                {/* Label text with underline line */}
                <div className="absolute bottom-4 right-4 z-30 flex flex-col items-end gap-1.5 text-right">
                  <span className="text-foreground font-sans text-[8.5px] xl:text-[9.5px] min-[1920px]:text-[11px] tracking-[0.35em] uppercase leading-[2.1] whitespace-pre-line font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                    {currentCategory.rightImageLabel}
                  </span>
                  <div className="w-6 min-[1920px]:w-9 h-[2px] bg-gold shadow-[0_1px_4px_rgba(0,0,0,0.8)]" />
                </div>
                {/* Warm tint overlay on image */}
                <div className="absolute inset-0 bg-gradient-to-bl from-[#8B6914]/[0.08] to-transparent pointer-events-none z-10 mix-blend-overlay" />
              </div>
            </motion.div>

            {/* ─── Center Text Content ─── */}
            <motion.div
              {...entrance(0.2)}
              style={{ y: centerTextY }}
              className="relative z-30 text-center max-w-[560px] xl:max-w-[600px] 2xl:max-w-[660px] min-[1920px]:max-w-[820px] mx-auto flex flex-col items-center px-2"
            >
              {/* Eyebrow */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`eyebrow-${categoryIndex}`}
                  initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-1.5 lg:mb-3 min-[1920px]:mb-4 flex flex-col items-center gap-2"
                >
                  <p className="text-gold/90 font-sans text-[8.5px] lg:text-[9px] xl:text-[10px] min-[1920px]:text-[12px] tracking-[0.34em] lg:tracking-[0.38em] uppercase font-semibold drop-shadow-[0_1px_8px_rgba(197,168,128,0.3)]">
                    {currentCategory.eyebrow}
                  </p>
                  <div className="w-[38px] min-[1920px]:w-[50px] h-px bg-gold/60" />
                </motion.div>
              </AnimatePresence>

              {/* ─── Mobile Arched Top Feature Image (Inspired by the-awans.com) ─── */}
              <motion.div
                key={`mob-arch-${categoryIndex}`}
                initial={{ opacity: 0, scale: 0.92, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="lg:hidden relative w-[165px] sm:w-[210px] h-[200px] sm:h-[250px] my-2 sm:my-3 rounded-t-[100px] sm:rounded-t-[120px] rounded-b-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_30px_rgba(197,168,128,0.2)] ring-1 ring-gold/40 shrink-0 mx-auto"
              >
                <CrossfadeImage
                  src={currentCategory.leftImage}
                  alt={currentCategory.label}
                  objectPosition={currentCategory.leftImagePosition}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none z-10" />
                <div className="absolute inset-[4px] border border-gold/35 pointer-events-none z-20 rounded-t-[96px] sm:rounded-t-[116px] rounded-b-xl" />
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 text-center w-full px-2">
                  <span className="text-foreground font-sans text-[8.5px] sm:text-[9.5px] tracking-[0.3em] uppercase leading-[1.6] font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                    {currentCategory.leftImageLabel}
                  </span>
                  <div className="w-6 h-[1.5px] bg-gold" />
                </div>
              </motion.div>

              {/* Title — Strictly 2 Lines with 5% Increase in Weight & Contrast */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`title-${categoryIndex}`}
                  initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -15, filter: "blur(8px)" }}
                  transition={{ duration: 0.7, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-3 lg:mb-4 xl:mb-5 min-[1920px]:mb-7"
                >
                  <h1>
                    <span className="block font-laluxes-serif font-semibold tracking-[0.02em] text-[clamp(1.75rem,3.1vw,4.4rem)] lg:text-[clamp(1.85rem,3.2vw,4.6rem)] xl:text-[clamp(2.1rem,3.3vw,4.8rem)] leading-[1.12] text-[#ffffff] whitespace-nowrap drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)]">
                      {currentCategory.titleLine1}
                    </span>
                    <span className="block font-laluxes-serif font-semibold tracking-[0.02em] text-[clamp(1.75rem,3.1vw,4.4rem)] lg:text-[clamp(1.85rem,3.2vw,4.6rem)] xl:text-[clamp(2.1rem,3.3vw,4.8rem)] leading-[1.12] text-[#ffffff] whitespace-nowrap drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)]">
                      {currentCategory.titleLine2}{" "}
                      <span className="font-laluxes-script text-gold font-medium text-[1.25em] xl:text-[1.28em] normal-case drop-shadow-[0_2px_28px_var(--gold)] inline-block">
                        {currentCategory.titleHighlight}
                      </span>
                    </span>
                  </h1>
                </motion.div>
              </AnimatePresence>

              {/* Description — Enhanced Legibility & Font Size */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={`desc-${categoryIndex}`}
                  initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                  transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="text-foreground/85 font-sans font-medium text-[12.5px] lg:text-[13.5px] xl:text-[14px] min-[1920px]:text-[16.5px] leading-[1.75] xl:leading-[1.85] max-w-[390px] lg:max-w-[420px] min-[1920px]:max-w-[520px] mb-4 lg:mb-5 xl:mb-7 min-[1920px]:mb-9 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
                >
                  {currentCategory.description}
                </motion.p>
              </AnimatePresence>

              {/* CTA Buttons — Let's Connect Dark Luxury Pill Button + Gold Underlined Explore Work Link */}
              <motion.div
                {...entrance(0.55)}
                className="flex items-center justify-center gap-4 sm:gap-6 xl:gap-8 flex-wrap"
              >
                {/* Let's Connect — Styled matching navbar's BorderGlow shimmer button */}
                <BorderGlow
                  edgeSensitivity={25}
                  glowColor="35 85 75"
                  backgroundColor="transparent"
                  borderRadius={9999}
                  glowRadius={35}
                  glowIntensity={0.35}
                  coneSpread={30}
                  animated={true}
                  colors={["#ffffff", "#cba358", "#ffffff"]}
                  fillOpacity={0}
                  style={{ borderColor: "transparent" }}
                >
                  <a
                    href="#contact"
                    className="group relative cursor-pointer text-[10.5px] xl:text-[11px] min-[1920px]:text-[12.5px] tracking-[0.22em] uppercase font-sans font-semibold inline-flex items-center gap-3.5 rounded-full border border-white/20 hover:border-gold/60 text-foreground hover:text-gold transition-all duration-500 px-7 lg:px-8 min-[1920px]:px-10 py-3 min-[1920px]:py-4 shadow-[0_4px_25px_rgba(0,0,0,0.6)] backdrop-blur-md active:scale-[0.98]"
                    style={{
                      background:
                        "linear-gradient(to bottom, rgba(197, 168, 128, 0.14) 0%, rgba(197, 168, 128, 0.02) 100%)",
                    }}
                  >
                    <span className="relative z-10 font-sans font-medium">Let&apos;s Connect</span>
                    <div className="relative z-10 flex items-center justify-center w-[22px] h-[22px] min-[1920px]:w-[26px] min-[1920px]:h-[26px] rounded-full bg-gold/15 group-hover:bg-gold border border-gold/30 transition-all duration-300">
                      <ArrowRight size={11} className="text-gold group-hover:text-background group-hover:translate-x-0.5 transition-all duration-300 min-[1920px]:w-3.5 min-[1920px]:h-3.5" />
                    </div>
                  </a>
                </BorderGlow>

                {/* Explore Work — Gold Underlined Link like before */}
                <a
                  href="/work"
                  className="relative inline-flex items-center text-[11px] min-[1920px]:text-[12.5px] tracking-[0.22em] uppercase font-sans font-bold text-foreground hover:text-gold py-1.5 border-b-2 border-gold hover:border-gold-light transition-colors duration-300"
                >
                  Explore Work
                </a>
              </motion.div>

              {/* ─── Mobile Category Segment Controller Bar ─── */}
              <motion.div
                {...entrance(0.75)}
                className="lg:hidden mt-4 sm:mt-5 w-full max-w-[340px] sm:max-w-md mx-auto z-30 relative px-1"
              >
                <div className="flex items-center justify-between bg-black/50 backdrop-blur-xl border border-gold/30 rounded-full p-1 shadow-[0_8px_30px_rgba(0,0,0,0.7)]">
                  {categories.map((cat, idx) => {
                    const isActive = categoryIndex === idx;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryClick(idx)}
                        className={`relative flex-1 flex items-center justify-center gap-1.5 py-2 px-1.5 rounded-full text-[9px] sm:text-[10px] tracking-[0.16em] uppercase font-sans font-semibold transition-all duration-300 focus:outline-none ${isActive ? "text-background" : "text-foreground/60 hover:text-foreground"
                          }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeCatPillMobile"
                            className="absolute inset-0 bg-gold rounded-full shadow-[0_2px_12px_rgba(197,168,128,0.5)]"
                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                          />
                        )}
                        <span className={`relative z-10 font-bold ${isActive ? "text-background" : "text-gold/75"}`}>
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="relative z-10 truncate">{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>

              {/* ─── Mobile Staggered Overlapping Film Photo Cards (Inspired by the-awans.com) ─── */}
              <motion.div
                {...entrance(0.9)}
                className="lg:hidden mt-4 sm:mt-5 w-full max-w-[340px] sm:max-w-md mx-auto z-30 relative px-2 flex justify-center items-center pb-2"
              >
                <div className="relative w-[280px] sm:w-[320px] h-[115px] sm:h-[135px] flex items-center justify-center">
                  {/* Card 1: Polaroid Frame (Left/Top) */}
                  <motion.div
                    key={`mob-pol-${currentCategory.id}`}
                    initial={{ opacity: 0, x: -20, rotate: -6 }}
                    animate={{ opacity: 1, x: 0, rotate: -4 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="absolute left-2 sm:left-4 top-0 w-[145px] sm:w-[170px] h-[100px] sm:h-[118px] bg-white p-1.5 rounded-sm shadow-[0_15px_35px_rgba(0,0,0,0.85)] z-20 border border-white/80"
                  >
                    <div className="relative w-full h-[78px] sm:h-[94px] overflow-hidden rounded-[1px]">
                      <Image
                        src={currentCategory.bottomCards[0].image}
                        alt={currentCategory.bottomCards[0].label}
                        fill
                        className="object-cover"
                        sizes="170px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                      <span className="absolute bottom-1 left-1.5 text-white text-[7.5px] font-sans tracking-widest font-bold uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                        {currentCategory.bottomCards[0].label}
                      </span>
                    </div>
                    <div className="flex items-center justify-between px-1 pt-1">
                      <span className="text-background font-serif text-[7.5px] font-semibold tracking-wider">MS FILMS</span>
                      <span className="text-[#8b6914] font-sans text-[7px] font-bold">01</span>
                    </div>
                  </motion.div>

                  {/* Card 2: Film Shot (Right/Bottom Overlapping) */}
                  <motion.div
                    key={`mob-film-${currentCategory.id}`}
                    initial={{ opacity: 0, x: 20, rotate: 6 }}
                    animate={{ opacity: 1, x: 0, rotate: 5 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="absolute right-2 sm:right-4 bottom-0 w-[140px] sm:w-[165px] h-[95px] sm:h-[112px] rounded-lg overflow-hidden shadow-[0_20px_45px_rgba(0,0,0,0.9)] z-10 border border-gold/40 ring-1 ring-black/50"
                  >
                    <Image
                      src={currentCategory.bottomCards[1]?.image || currentCategory.rightImage}
                      alt={currentCategory.bottomCards[1]?.label || "Film"}
                      fill
                      className="object-cover"
                      sizes="165px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between z-10">
                      <span className="text-gold text-[8px] font-bold">02</span>
                      <span className="text-foreground text-[7.5px] tracking-wider uppercase font-semibold drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                        {currentCategory.bottomCards[1]?.label || "MOMENTS"}
                      </span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* ─── Bottom Category Strip (Desktop) ─── */}
          <motion.div
            {...entrance(0.75)}
            style={{ y: bottomDeckY }}
            className="hidden lg:flex items-end justify-center gap-3 xl:gap-6 w-full max-w-[820px] xl:max-w-[950px] min-[1920px]:max-w-[1200px] mx-auto pb-1 xl:pb-5 min-[1920px]:pb-8 z-30 relative mt-0 lg:mt-1 xl:-mt-3 min-[1920px]:-mt-4"
          >
            {currentCategory.bottomCards.map((card) => (
              <div
                key={`${currentCategory.id}-${card.num}`}
                className="group flex-1 max-w-[285px] xl:max-w-[310px] min-[1920px]:max-w-[380px]"
              >
                {/* Thumbnail card with label row INSIDE image */}
                <div className="relative w-full h-[105px] lg:h-[128px] xl:h-[136px] 2xl:h-[148px] min-[1920px]:h-[185px] rounded-md overflow-hidden border border-gold/25 group-hover:border-gold/60 transition-all duration-400 shadow-[0_12px_35px_rgba(0,0,0,0.7)]">
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={`card-${currentCategory.id}-${card.num}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.7 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={card.image}
                        alt={card.label}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        style={{ objectPosition: card.imagePosition || "center 20%" }}
                        sizes="310px"
                        quality={75}
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Dark gradient overlay for text readability inside image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none z-10" />

                  {/* Label row INSIDE the image container at bottom */}
                  <div className="absolute bottom-2.5 left-3 right-3 z-20 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-gold font-sans text-[10px] tracking-wider font-bold drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                        {card.num}
                      </span>
                      <div className="w-6 xl:w-10 h-px bg-gold/50 group-hover:bg-gold transition-colors duration-300" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-foreground font-sans text-[8.5px] xl:text-[9px] tracking-[0.22em] uppercase font-semibold drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] group-hover:text-gold transition-colors duration-300">
                        {card.label}
                      </span>
                      <ArrowRight size={10} className="text-gold group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════════════════
            BOTTOM BAR
            ══════════════════════════════════════════════════════ */}
        <div className="relative z-30 w-full flex items-end justify-center px-5 lg:px-8 pb-1 lg:pb-3 xl:pb-5">
          {/* Center Tagline with gold lines */}
          <motion.div
            {...entrance(1.2)}
            className="hidden lg:flex items-center gap-4"
          >
            <div className="w-14 xl:w-20 h-px bg-gradient-to-r from-transparent to-gold/40" />
            <span className="text-foreground/35 font-sans text-[8px] xl:text-[8.5px] tracking-[0.38em] uppercase whitespace-nowrap font-medium">
              Frames Today&emsp;·&emsp;Memories Forever
            </span>
            <div className="w-14 xl:w-20 h-px bg-gradient-to-l from-transparent to-gold/40" />
          </motion.div>

          {/* Social Icons — absolute bottom-right */}
          <motion.div
            {...entrance(1.3)}
            className="hidden lg:flex flex-col items-center gap-2.5 absolute right-5 xl:right-9 bottom-5"
          >
            <a
              href="https://www.instagram.com/msfilms._/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[24px] h-[24px] rounded-full border border-foreground/15 flex items-center justify-center text-foreground/40 hover:text-gold hover:border-gold/40 transition-all duration-300"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-2.5 h-2.5" />
            </a>
            <a
              href="#"
              className="w-[24px] h-[24px] rounded-full border border-foreground/15 flex items-center justify-center text-foreground/40 hover:text-gold hover:border-gold/40 transition-all duration-300"
              aria-label="YouTube"
            >
              <YouTubeIcon className="w-2.5 h-2.5" />
            </a>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[24px] h-[24px] rounded-full border border-foreground/15 flex items-center justify-center text-foreground/40 hover:text-gold hover:border-gold/40 transition-all duration-300"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon className="w-2.5 h-2.5" />
            </a>
          </motion.div>
        </div>

        {/* ── Seamless Bottom Gradient Feather into Next Section ── */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/40 to-transparent pointer-events-none z-30" />

        {/* ── Video Modal ── */}
        <VideoModal
          isOpen={isVideoOpen}
          onClose={() => setIsVideoOpen(false)}
          videoUrl={currentCategory.videoUrl}
          title={`${currentCategory.id.charAt(0).toUpperCase() + currentCategory.id.slice(1)} — Director's Reel`}
        />
      </motion.div>
    </section>
  );
}
