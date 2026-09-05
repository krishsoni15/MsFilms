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
    bgImage: "/wedding/bg1.png",
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
  const heroScale = useTransform(scrollY, [0, 600], [1, 0.93]);
  const heroRotateX = useTransform(scrollY, [0, 600], [0, -9]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);

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
      className="sticky top-0 w-full overflow-hidden h-screen lg:h-svh flex flex-col z-0"
      style={{ backgroundColor: "#0c0806" }}
    >
      <motion.div
        style={{
          scale: heroScale,
          rotateX: isMobile ? 0 : heroRotateX,
          transformPerspective: "1200px",
          opacity: heroOpacity,
        }}
        className="relative w-full h-full flex flex-col overflow-hidden origin-bottom"
      >
        {/* ══════════════════════════════════════════════════════
            BACKGROUND LAYERS
            ══════════════════════════════════════════════════════ */}

        {/* Layer 0: Background Image */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={`bg-${categoryIndex}`}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={currentCategory.bgImage}
                alt="Background"
                fill
                className="object-cover"
                style={{ filter: "blur(6px)", transform: "scale(1.08)" }}
                sizes="100vw"
                quality={70}
                priority={categoryIndex === 0}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Lightweight gradient for text readability without darkening background */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background: "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.4) 100%)",
          }}
        />

        {/* Layer 4: Static film grain (NO animation) */}
        <div
          className="absolute inset-0 pointer-events-none z-[4]"
          style={{
            backgroundImage: `url('data:image/svg+xml,%3Csvg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="n"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23n)" opacity="0.03"/%3E%3C/svg%3E')`,
            backgroundRepeat: "repeat",
            opacity: 0.55,
          }}
        />

        {/* ══════════════════════════════════════════════════════
            LEFT SIDEBAR — Category Selectors + Vertical Text
            ══════════════════════════════════════════════════════ */}
        <motion.div
          {...entrance(1.0)}
          className="hidden lg:flex flex-col items-center gap-6 absolute left-5 xl:left-9 top-1/2 -translate-y-1/2 z-30"
        >
          {/* Vertical label */}
          <span
            className="text-[#f4f1eb]/10 font-sans text-[8px] tracking-[0.45em] uppercase whitespace-nowrap font-light mb-4"
            style={{ writingMode: "vertical-rl" }}
          >
            CINEMATIC&emsp;TIMELESS&emsp;YOURS
          </span>

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
                  {/* Floating label */}
                  <span
                    className={`absolute left-7 top-1/2 -translate-y-1/2 font-sans text-[7px] tracking-[0.3em] uppercase whitespace-nowrap transition-all duration-500 ${isActive
                      ? "text-[#c5a880]/70 opacity-100 translate-x-0 font-semibold"
                      : "text-[#f4f1eb]/0 opacity-0 -translate-x-2 pointer-events-none group-hover:text-[#f4f1eb]/25 group-hover:opacity-80 group-hover:translate-x-0"
                      }`}
                  >
                    {cat.label}
                  </span>

                  {/* Numbered node */}
                  <div className="relative flex items-center justify-center w-5 h-5">
                    <span
                      className={`font-sans text-[9px] tracking-wider transition-colors duration-500 z-10 ${isActive ? "text-[#c5a880] font-bold" : "text-[#f4f1eb]/15 group-hover:text-[#f4f1eb]/30"
                        }`}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="activeCatRing"
                        className="absolute inset-0 rounded-full border border-[#c5a880]/20"
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Scroll indicator */}
          <div className="flex flex-col items-center gap-2 mt-4 pt-4 border-t border-[#f4f1eb]/[0.05] w-8">
            <span className="text-[#f4f1eb]/10 font-sans text-[7px] tracking-[0.2em] uppercase">
              Scroll
            </span>
            <div className="w-[16px] h-[26px] rounded-full border border-[#f4f1eb]/[0.07] flex justify-center p-1 relative overflow-hidden">
              <motion.div
                animate={{ y: [0, 6, 0], opacity: [0.2, 0.8, 0.2] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="w-[2px] h-[5px] rounded-full bg-[#c5a880]/50"
              />
            </div>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════════
            RIGHT SIDEBAR — Location Text
            ══════════════════════════════════════════════════════ */}
        <motion.div
          {...entrance(1.1)}
          className="hidden lg:flex flex-col items-center absolute right-5 xl:right-9 top-1/2 -translate-y-1/2 z-30"
        >
          <span
            className="text-[#f4f1eb]/10 font-sans text-[8px] tracking-[0.45em] uppercase whitespace-nowrap font-light"
            style={{ writingMode: "vertical-rl" }}
          >
            SASKATOON&emsp;·&emsp;CANADA
          </span>
        </motion.div>

        {/* ══════════════════════════════════════════════════════
            MAIN CONTENT
            ══════════════════════════════════════════════════════ */}
        <div className="relative flex-1 flex flex-col items-center justify-center z-10 px-5 lg:px-24 xl:px-32 pt-16 lg:pt-20">
          <div className="relative w-full max-w-[1440px] mx-auto flex-1 flex flex-col items-center justify-center">

            {/* ─── Left Tilted Image ─── */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotate: -12 }}
              animate={isLoaded ? { opacity: 1, y: 0, rotate: -8 } : {}}
              transition={{ duration: 1.3, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:block absolute left-[-2%] xl:left-[0.5%] top-[13%] w-[200px] xl:w-[242px] 2xl:w-[268px] h-[280px] xl:h-[336px] 2xl:h-[368px] z-20"
              style={{ transformOrigin: "center center" }}
            >
              <div className="relative w-full h-full rounded-lg overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.8)] ring-1 ring-[#c5a880]/[0.08]">
                <CrossfadeImage
                  src={currentCategory.leftImage}
                  alt="Left feature"
                  objectPosition={currentCategory.leftImagePosition}
                  priority
                />
                {/* Gold inner frame */}
                <div className="absolute inset-[5px] border border-[#c5a880]/20 pointer-events-none z-20 rounded-[3px]" />
                {/* Label text */}
                <div className="absolute bottom-3 left-3 z-30">
                  <span className="text-[#f4f1eb]/45 font-sans text-[7px] tracking-[0.4em] uppercase leading-[2.2] whitespace-pre-line font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                    {currentCategory.leftImageLabel}
                  </span>
                </div>
                {/* Warm tint overlay on image */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#8B6914]/[0.06] to-transparent pointer-events-none z-10 mix-blend-overlay" />
              </div>
            </motion.div>

            {/* ─── Right Tilted Image ─── */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotate: 12 }}
              animate={isLoaded ? { opacity: 1, y: 0, rotate: 8 } : {}}
              transition={{ duration: 1.3, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:block absolute right-[-2%] xl:right-[0.5%] top-[9%] w-[200px] xl:w-[242px] 2xl:w-[268px] h-[300px] xl:h-[358px] 2xl:h-[390px] z-20"
              style={{ transformOrigin: "center center" }}
            >
              <div className="relative w-full h-full rounded-lg overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.8)] ring-1 ring-[#c5a880]/[0.08]">
                <CrossfadeImage
                  src={currentCategory.rightImage}
                  alt="Right feature"
                  objectPosition={currentCategory.rightImagePosition}
                />
                {/* Gold inner frame */}
                <div className="absolute inset-[5px] border border-[#c5a880]/20 pointer-events-none z-20 rounded-[3px]" />
                {/* Label text */}
                <div className="absolute top-3 right-3 z-30 text-right">
                  <span className="text-[#f4f1eb]/45 font-sans text-[7px] tracking-[0.4em] uppercase leading-[2.2] whitespace-pre-line font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                    {currentCategory.rightImageLabel}
                  </span>
                </div>
                {/* Warm tint overlay on image */}
                <div className="absolute inset-0 bg-gradient-to-bl from-[#8B6914]/[0.06] to-transparent pointer-events-none z-10 mix-blend-overlay" />
              </div>
            </motion.div>

            {/* ─── Center Text Content ─── */}
            <div className="relative z-30 text-center max-w-[550px] mx-auto flex flex-col items-center">
              {/* Eyebrow */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`eyebrow-${categoryIndex}`}
                  initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-3 lg:mb-4 flex flex-col items-center gap-2.5"
                >
                  <p className="text-[#c5a880]/50 font-sans text-[9px] lg:text-[10px] tracking-[0.35em] uppercase font-medium">
                    {currentCategory.eyebrow}
                  </p>
                  <div className="w-[35px] h-px bg-[#c5a880]/35" />
                </motion.div>
              </AnimatePresence>

              {/* Title */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`title-${categoryIndex}`}
                  initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -15, filter: "blur(8px)" }}
                  transition={{ duration: 0.7, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-4 lg:mb-5"
                >
                  <h1>
                    <span className="block font-laluxes-serif font-medium tracking-[0.015em] text-[clamp(2.2rem,4.8vw,3.6rem)] leading-[1.12] text-[#f4f1eb]">
                      {currentCategory.titleLine1}
                    </span>
                    <span className="block font-laluxes-serif font-medium tracking-[0.015em] text-[clamp(2.2rem,4.8vw,3.6rem)] leading-[1.12] text-[#f4f1eb]">
                      {currentCategory.titleLine2}{" "}
                      <span className="font-laluxes-script text-[#c5a880] font-normal text-[1.15em] normal-case">
                        {currentCategory.titleHighlight}
                      </span>
                    </span>
                  </h1>
                </motion.div>
              </AnimatePresence>

              {/* Description */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={`desc-${categoryIndex}`}
                  initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                  transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[#f4f1eb]/55 font-sans font-normal text-[12px] lg:text-[13px] leading-[1.85] max-w-[390px] mb-6 lg:mb-7"
                >
                  {currentCategory.description}
                </motion.p>
              </AnimatePresence>

              {/* CTA Buttons — Let's Connect Gold BorderGlow Button + Gold Underlined Explore Work Link */}
              <motion.div
                {...entrance(0.55)}
                className="flex items-center justify-center gap-6 sm:gap-8 flex-wrap"
              >
                {/* Let's Connect — Gold Pill Button with BorderGlow */}
                <BorderGlow
                  edgeSensitivity={30}
                  glowColor="40 85 80"
                  backgroundColor="transparent"
                  borderRadius={9999}
                  glowRadius={35}
                  glowIntensity={0.4}
                  coneSpread={35}
                  animated={true}
                  colors={["#ffffff", "#cba358", "#ffffff"]}
                  fillOpacity={0}
                  style={{ borderColor: "transparent" }}
                >
                  <a
                    href="#contact"
                    className="group flex items-center gap-3 rounded-full pl-3.5 pr-6 py-2.5 sm:py-3 text-[11px] tracking-[0.18em] uppercase font-sans font-bold transition-all duration-300 text-black shadow-[0_6px_25px_rgba(197,168,128,0.3)] hover:shadow-[0_8px_35px_rgba(197,168,128,0.5)] hover:brightness-105 active:scale-[0.98]"
                    style={{
                      background: "linear-gradient(135deg, #e3c79a 0%, #c5a880 50%, #9e825a 100%)",
                    }}
                  >
                    <span className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-[#c5a880] shrink-0 group-hover:scale-105 transition-transform duration-300">
                      <MessageCircle size={11} className="text-[#c5a880]" />
                    </span>
                    Let&apos;s Connect
                  </a>
                </BorderGlow>

                {/* Explore Work — Gold Underlined Link */}
                <a
                  href="/work"
                  className="relative inline-flex items-center text-[11px] tracking-[0.22em] uppercase font-sans font-bold text-[#f4f1eb] hover:text-[#c5a880] py-1.5 border-b-2 border-[#c5a880] hover:border-[#e5d5be] transition-colors duration-300"
                >
                  Explore Work
                </a>
              </motion.div>
            </div>

            {/* ─── Mobile Category Selectors ─── */}
            <motion.div
              {...entrance(0.9)}
              className="lg:hidden mt-7 w-full max-w-sm mx-auto"
            >
              <div className="flex items-center justify-center gap-5 border-t border-[#f4f1eb]/[0.05] pt-4">
                {categories.map((cat, idx) => {
                  const isActive = categoryIndex === idx;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryClick(idx)}
                      className="flex flex-col items-center gap-1 group focus:outline-none"
                    >
                      <span
                        className={`font-sans text-[9px] tracking-[0.25em] uppercase transition-colors duration-300 ${isActive ? "text-[#c5a880] font-medium" : "text-[#f4f1eb]/25"
                          }`}
                      >
                        {cat.label}
                      </span>
                      <div className="h-[1.5px] w-full relative mt-0.5">
                        {isActive ? (
                          <motion.div
                            layoutId="activeIndicatorMobileLine"
                            className="absolute inset-0 bg-[#c5a880]"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        ) : (
                          <div className="absolute inset-0 bg-transparent group-hover:bg-[#f4f1eb]/10 transition-colors duration-300" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* ─── Bottom Category Strip (Desktop) ─── */}
          <motion.div
            {...entrance(0.75)}
            className="hidden lg:flex items-end justify-center gap-4 xl:gap-6 w-full max-w-[860px] xl:max-w-[950px] mx-auto pb-4 xl:pb-5 z-30 relative -mt-2 xl:-mt-3"
          >
            {currentCategory.bottomCards.map((card) => (
              <div
                key={`${currentCategory.id}-${card.num}`}
                className="group flex-1 max-w-[285px] xl:max-w-[310px]"
              >
                {/* Thumbnail */}
                <div className="relative w-full h-[118px] xl:h-[136px] 2xl:h-[148px] rounded-md overflow-hidden mb-2.5 border border-[#f4f1eb]/[0.06] group-hover:border-[#c5a880]/20 transition-all duration-400 shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
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
                  {/* Subtle dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
                </div>
                {/* Label row */}
                <div className="flex items-center gap-2">
                  <span className="text-[#c5a880]/45 font-sans text-[9.5px] tracking-wider font-semibold">
                    {card.num}
                  </span>
                  <div className="flex-1 h-px bg-[#f4f1eb]/[0.06]" />
                  <div className="flex items-center gap-1">
                    <span className="text-[#f4f1eb]/50 font-sans text-[8.5px] tracking-[0.2em] uppercase font-medium">
                      {card.label}
                    </span>
                    <ArrowRight size={9} className="text-[#f4f1eb]/25 group-hover:text-[#c5a880] group-hover:translate-x-0.5 transition-all duration-300" />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════════════════
            BOTTOM BAR
            ══════════════════════════════════════════════════════ */}
        <div className="relative z-30 w-full flex items-end justify-center px-5 lg:px-8 pb-4 lg:pb-5">
          {/* Center Tagline */}
          <motion.div
            {...entrance(1.2)}
            className="hidden lg:flex items-center gap-3"
          >
            <div className="w-7 h-px bg-[#c5a880]/20" />
            <span className="text-[#f4f1eb]/12 font-sans text-[8px] tracking-[0.35em] uppercase whitespace-nowrap font-medium">
              Frames Today&emsp;·&emsp;Memories Forever
            </span>
            <div className="w-7 h-px bg-[#c5a880]/20" />
          </motion.div>

          {/* Social Icons — absolute bottom-right */}
          <motion.div
            {...entrance(1.3)}
            className="hidden lg:flex flex-col items-center gap-2 absolute right-5 xl:right-9 bottom-5"
          >
            <a
              href="https://www.instagram.com/msfilms._/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[24px] h-[24px] rounded-full border border-[#f4f1eb]/[0.05] flex items-center justify-center text-[#f4f1eb]/25 hover:text-[#c5a880] hover:border-[#c5a880]/20 transition-all duration-300"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-2.5 h-2.5" />
            </a>
            <a
              href="#"
              className="w-[24px] h-[24px] rounded-full border border-[#f4f1eb]/[0.05] flex items-center justify-center text-[#f4f1eb]/25 hover:text-[#c5a880] hover:border-[#c5a880]/20 transition-all duration-300"
              aria-label="YouTube"
            >
              <YouTubeIcon className="w-2.5 h-2.5" />
            </a>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[24px] h-[24px] rounded-full border border-[#f4f1eb]/[0.05] flex items-center justify-center text-[#f4f1eb]/25 hover:text-[#c5a880] hover:border-[#c5a880]/20 transition-all duration-300"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon className="w-2.5 h-2.5" />
            </a>
          </motion.div>
        </div>

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
