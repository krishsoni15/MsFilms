"use client";

import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import { motion, useMotionValue, useSpring, useTransform, animate, MotionValue } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./LenticularCarousel.css";

export interface LenticularItem {
  id: string | number;
  image: string;      // The main image
  imageA?: string;    // Optional fallback/separate image A
  imageB?: string;    // Optional fallback/separate image B
  title: string;
  subtitle: string;
  description?: string;
}

export interface LenticularCarouselProps {
  items: LenticularItem[];
  cardWidth?: number;  // in px
  cardHeight?: number; // in px
  slicesCount?: number;
  lenticularAngle?: number; // in degrees, tilt angle of slices
  tiltMax?: number;         // max 3D tilt of the card container
  maxParallaxShift?: number; // max horizontal image shift for depth
  mode?: "hologram" | "flip" | "3d-only";
  autoplay?: boolean;
  autoplayInterval?: number;
  className?: string;
}

/* ────────────────────────────────────────────────────────────
   Individual Slice Component — avoids useTransform inside .map()
   ──────────────────────────────────────────────────────────── */
interface SliceProps {
  index: number;
  slicesCount: number;
  width: number;
  height: number;
  imgA: string;
  imgB: string;
  currentAngle: MotionValue<number>;
  finalLeftOpacity: MotionValue<number>;
  finalRightOpacity: MotionValue<number>;
  parallaxOffset: MotionValue<string>;
}

const LenticularSlice = memo(function LenticularSlice({
  index,
  slicesCount,
  width,
  height,
  imgA,
  imgB,
  currentAngle,
  finalLeftOpacity,
  finalRightOpacity,
  parallaxOffset,
}: SliceProps) {
  const sliceWidth = width / slicesCount;
  const colLeft = index * sliceWidth;

  // Each slice gets its own useTransform — called at component top level (legal!)
  const negatedAngle = useTransform(currentAngle, (val: number) => -val);

  // Compute background positions dynamically via Framer Motion to bypass CSS variables
  const backgroundPositionA = useTransform(parallaxOffset, (offset) => `calc(-${colLeft}px - ${offset}) 0px`);
  const backgroundPositionB = useTransform(parallaxOffset, (offset) => `calc(-${colLeft + sliceWidth / 2}px - ${offset}) 0px`);

  return (
    <div
      className="lenticular-column"
      style={{
        left: `${(index * 100) / slicesCount}%`,
        width: `${100 / slicesCount}%`,
      }}
    >
      {/* Image A (Left Face) */}
      <motion.div
        className="lenticular-face lenticular-face-left"
        style={{
          backgroundImage: `url(${imgA})`,
          backgroundPosition: backgroundPositionA,
          backgroundSize: `${width}px ${height}px`,
          rotateY: negatedAngle,
          scaleX: 1.02,
          opacity: finalLeftOpacity,
        }}
      />
      {/* Image B (Right Face) */}
      <motion.div
        className="lenticular-face lenticular-face-right"
        style={{
          backgroundImage: `url(${imgB})`,
          backgroundPosition: backgroundPositionB,
          backgroundSize: `${width}px ${height}px`,
          rotateY: currentAngle,
          scaleX: 1.02,
          opacity: finalRightOpacity,
        }}
      />
    </div>
  );
});

/* ────────────────────────────────────────────────────────────
   Lenticular Card Component (Handles 3D slices & tilt)
   ──────────────────────────────────────────────────────────── */
interface LenticularCardProps {
  item: LenticularItem;
  width: number;
  height: number;
  slicesCount: number;
  lenticularAngle: number;
  tiltMax: number;
  maxParallaxShift: number;
  mode: "hologram" | "flip" | "3d-only";
  isActive: boolean;
  onClick: () => void;
}

const LenticularCard = memo(function LenticularCard({
  item,
  width,
  height,
  slicesCount,
  lenticularAngle,
  tiltMax,
  maxParallaxShift,
  mode,
  isActive,
  onClick,
}: LenticularCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tilt tracking
  const mouseX = useMotionValue(0.5); // 0 to 1
  const mouseY = useMotionValue(0.5); // 0 to 1

  const springConfig = { damping: 22, stiffness: 110, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Map mouse positions to 3D rotation of the card container
  const rotateX = useTransform(smoothY, [0, 1], [tiltMax, -tiltMax]);
  const rotateY = useTransform(smoothX, [0, 1], [-tiltMax, tiltMax]);

  // Glare position vars
  const glareX = useTransform(smoothX, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(smoothY, [0, 1], ["0%", "100%"]);

  // Holographic position vars
  const holoX = useTransform(smoothX, [0, 1], ["0%", "100%"]);
  const holoY = useTransform(smoothY, [0, 1], ["0%", "100%"]);

  // Hover progress: 0 (not hovered) to 1 (fully hovered)
  const hoverProgress = useMotionValue(0);

  useEffect(() => {
    const controls = animate(hoverProgress, isHovered ? 1 : 0, {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo
    });
    return () => controls.stop();
  }, [isHovered, hoverProgress]);

  // Dynamic slice rotation angle: transitions from 0 (flat) to lenticularAngle (zig-zag)
  const currentAngle = useTransform(hoverProgress, [0, 1], [0, lenticularAngle]);

  // Parallax offset shift var: scaled by hoverProgress so it stays centered at 0 when not hovered
  const parallaxOffset = useTransform([smoothX, hoverProgress], (arr) => {
    const sX = arr[0] as number;
    const prog = arr[1] as number;
    const baseShift = (sX - 0.5) * 2 * maxParallaxShift;
    return `${baseShift * prog}px`;
  });

  // Opacity interpolations for separate Image A and Image B support (if provided)
  const leftOpacity = useTransform(
    smoothX,
    mode === "flip" ? [0, 0.46, 0.54, 1] : [0, 1],
    mode === "flip" ? [1, 1, 0, 0] : [1, 0]
  );
  
  const rightOpacity = useTransform(
    smoothX,
    mode === "flip" ? [0, 0.46, 0.54, 1] : [0, 1],
    mode === "flip" ? [0, 0, 1, 1] : [0, 1]
  );

  const hasTwoImages = !!(item.imageA && item.imageB);
  
  // Interpolated opacities that fade into the mouse-driven opacity as hoverProgress moves to 1
  const finalLeftOpacity = useTransform([leftOpacity, hoverProgress], (arr) => {
    const lOp = arr[0] as number;
    const prog = arr[1] as number;
    if (!hasTwoImages) return 1;
    if (mode === "3d-only") return 1;
    return (1 - prog) + lOp * prog;
  });

  const finalRightOpacity = useTransform([rightOpacity, hoverProgress], (arr) => {
    const rOp = arr[0] as number;
    const prog = arr[1] as number;
    if (!hasTwoImages) return 1;
    if (mode === "3d-only") return 1;
    return (1 - prog) + rOp * prog;
  });

  // Flat overlay opacity: fades from 1 (flat) to 0 (tilted)
  const flatOverlayOpacity = useTransform(hoverProgress, [0, 1], [1, 0]);

  // Pre-compute slice indices array once
  const sliceIndices = Array.from({ length: slicesCount }, (_, i) => i);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isActive) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
    if (!isHovered) setIsHovered(true);
  };

  const handleMouseEnter = () => {
    if (isActive) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  // Image source resolution
  const imgA = item.imageA || item.image;
  const imgB = item.imageB || item.image;

  return (
    <motion.div
      ref={cardRef}
      className={`lenticular-card`}
      style={{
        width,
        height,
        rotateX: isActive ? rotateX : 0,
        rotateY: isActive ? rotateY : 0,
        // @ts-ignore
        "--glare-x": glareX,
        "--glare-y": glareY,
        "--holo-x": holoX,
        "--holo-y": holoY,
        "--parallax-offset": parallaxOffset,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Flat Image Overlay (active when NOT hovered, ensuring clean image rendering) */}
      <motion.div
        className="absolute inset-0 w-full h-full bg-cover bg-no-repeat bg-center rounded-[inherit] pointer-events-none"
        style={{
          backgroundImage: `url(${imgA})`,
          opacity: flatOverlayOpacity,
          zIndex: 3,
        }}
      />

      {/* 3D Slices Layer — only render for active card, static image for inactive */}
      {isActive ? (
        <div className="lenticular-slices-container" style={{ zIndex: 2 }}>
          {sliceIndices.map((j) => (
            <LenticularSlice
              key={j}
              index={j}
              slicesCount={slicesCount}
              width={width}
              height={height}
              imgA={imgA}
              imgB={imgB}
              currentAngle={currentAngle}
              finalLeftOpacity={finalLeftOpacity}
              finalRightOpacity={finalRightOpacity}
              parallaxOffset={parallaxOffset}
            />
          ))}
        </div>
      ) : (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-no-repeat bg-center rounded-[inherit]"
          style={{
            backgroundImage: `url(${imgA})`,
            zIndex: 2,
          }}
        />
      )}

      {/* Holographic Prism Rainbow Overlay */}
      <div 
        className="lenticular-holo"
        style={{
          backgroundPosition: `var(--holo-x, 50%) var(--holo-y, 50%)`,
        }}
      />

      {/* Realistic Plastic Ridges / Lens sheet overlay */}
      <div className="lenticular-sheen" />

      {/* Glossy sheen glare reflection overlay */}
      <div className="lenticular-glare" />

      {/* Card Caption (Inside Card) */}
      <div className="lenticular-card-content">
        <span className="text-[9px] tracking-[0.25em] text-white/50 font-sans uppercase">
          {item.subtitle}
        </span>
        <h4 className="text-sm md:text-base font-display text-white font-medium">
          {item.title}
        </h4>
      </div>
    </motion.div>
  );
});

/* ────────────────────────────────────────────────────────────
   Main Carousel Component
   ──────────────────────────────────────────────────────────── */
export default function LenticularCarousel({
  items,
  cardWidth = 285,
  cardHeight = 420,
  slicesCount = 28,
  lenticularAngle = 16,
  tiltMax = 15,
  maxParallaxShift = 8,
  mode = "hologram",
  autoplay = false,
  autoplayInterval = 5000,
  className = "",
}: LenticularCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragOffset = useRef(0);
  const threshold = 50;

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  // Autoplay hook
  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(handleNext, autoplayInterval);
    return () => clearInterval(interval);
  }, [autoplay, autoplayInterval, handleNext]);

  // Drag Gesture Events
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragOffset.current = 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    dragOffset.current = e.clientX - dragStartX.current;
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset.current > threshold) {
      handlePrev();
    } else if (dragOffset.current < -threshold) {
      handleNext();
    }
  };

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <div className={`lenticular-carousel-wrapper ${className}`}>
      {/* 3D Scene Viewport */}
      <div 
        className="lenticular-scene"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="lenticular-track">
          {items.map((item, index) => {
            const offset = index - activeIndex;
            const isActive = index === activeIndex;

            // Coverflow perspective mathematical calculations
            const xTranslation = offset * (cardWidth * 0.7); 
            const zTranslation = isActive ? 0 : -150 - Math.abs(offset) * 80;
            const scale = isActive ? 1.08 : 0.82;
            const rotateYVal = offset * -28; 
            const opacity = isActive ? 1 : Math.max(0.25, 0.6 - Math.abs(offset) * 0.2);

            return (
              <motion.div
                key={item.id}
                className={`lenticular-card-container ${isActive ? "active" : ""}`}
                style={{
                  zIndex: 100 - Math.abs(offset),
                }}
                animate={{
                  x: xTranslation,
                  z: zTranslation,
                  scale,
                  rotateY: rotateYVal,
                  opacity,
                }}
                transition={{
                  duration: 0.65,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <LenticularCard
                  item={item}
                  width={cardWidth}
                  height={cardHeight}
                  slicesCount={slicesCount}
                  lenticularAngle={lenticularAngle}
                  tiltMax={tiltMax}
                  maxParallaxShift={maxParallaxShift}
                  mode={isActive ? mode : "3d-only"}
                  isActive={isActive}
                  onClick={() => setActiveIndex(index)}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Navigation Slide Indicator (Matching React Bits custom dashboard style) */}
      <div className="flex items-center gap-4 mt-16 z-20">
        <button
          onClick={handlePrev}
          aria-label="Previous slide"
          className="text-white/40 hover:text-white transition-colors p-2"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex items-center gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-[3px] rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-8 bg-white"
                  : "w-4 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          aria-label="Next slide"
          className="text-white/40 hover:text-white transition-colors p-2"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
