"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import DomeGallery from "@/components/ui/DomeGallery";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const DOME_IMAGES = [
  "/wedding/DSC00085.JPG",
  "/wedding/imgi_7_3.jpg",
  "/wedding/imgi_6_4.jpg",
  "/wedding/8.jpg",
  "/wedding/imgi_3_5.png",
  "/landscape/imgi_9_3.jpg",
  "/landscape/imgi_10_6.jpg",
  "/landscape/imgi_7_4.jpg",
  "/real-estate/L_1.jpg",
  "/real-estate/L4_6.jpg",
  "/real-estate/img_1.jpg",
  "/drone/imgi_11_6.jpg",
  "/drone/imgi_10_3.jpg",
  "/drone/imgi_12_9.jpg",
];

export function WorkIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleLeftRef = useRef<HTMLSpanElement>(null);
  const titleRightRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const domeContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: 1,
          refreshPriority: 5,
        },
      });

      // Animate left/right parts of "THE WORK" moving apart
      tl.to(
        titleLeftRef.current,
        {
          xPercent: -45,
          opacity: 0.1,
          filter: "blur(8px)",
          ease: "none",
        },
        0
      );

      tl.to(
        titleRightRef.current,
        {
          xPercent: 45,
          opacity: 0.1,
          filter: "blur(8px)",
          ease: "none",
        },
        0
      );

      // Fade out the subtitles
      tl.to(
        [subtitleRef.current, categoriesRef.current, scrollIndicatorRef.current],
        {
          opacity: 0,
          y: -30,
          filter: "blur(4px)",
          ease: "none",
        },
        0
      );

      // Fade in the background image
      tl.to(
        bgImageRef.current,
        {
          opacity: 0.35,
          scale: 1.05,
          ease: "none",
        },
        0
      );

      // Scale down and fade out the 3D Dome Gallery background
      tl.to(
        domeContainerRef.current,
        {
          opacity: 0,
          scale: 0.76,
          filter: "blur(10px)",
          ease: "none",
        },
        0
      );
    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      id="work"
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center bg-[#020912]"
    >
      {/* 3D Dome Gallery Background */}
      <div
        ref={domeContainerRef}
        className="absolute inset-0 w-full h-full z-0 work-bg-dome"
        style={{ willChange: "transform, opacity" }}
      >
        <DomeGallery
          images={DOME_IMAGES}
          fit={0.65}
          fitBasis="auto"
          minRadius={550}
          maxRadius={1100}
          overlayBlurColor="#020912"
          grayscale={true}
          openedImageWidth="280px"
          openedImageHeight="385px"
          imageBorderRadius="12px"
          openedImageBorderRadius="16px"
        />
      </div>

      {/* Background Cinematic Image - gradually emerges on scroll */}
      <div
        ref={bgImageRef}
        className="absolute inset-0 w-full h-full opacity-0 scale-100 pointer-events-none select-none transition-transform duration-300"
        style={{ willChange: "transform, opacity" }}
      >
        <Image
          src="/wedding/DSC00085.JPG"
          alt="Cinematic intro wedding"
          fill
          className="object-cover object-center grayscale opacity-70"
          sizes="100vw"
          priority
        />
        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020912] via-[#020912]/40 to-[#020912]" />
      </div>

      {/* Editorial Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-6 max-w-5xl">
        {/* Supporting text */}
        <div
          ref={categoriesRef}
          className="text-[10px] sm:text-xs tracking-[0.3em] font-sans font-medium text-gold/80 mb-6 uppercase"
        >
          WEDDINGS / EVENTS / REAL ESTATE / DRONE
        </div>

        {/* Large Editorial Headline */}
        <h1 className="font-serif text-[11vw] sm:text-[9vw] leading-[0.95] text-[#f4f1eb] tracking-tight uppercase flex items-center justify-center gap-[4vw] overflow-visible select-none mb-6">
          <span ref={titleLeftRef} className="inline-block origin-right will-change-transform">
            OUR
          </span>
          <span ref={titleRightRef} className="inline-block origin-left will-change-transform">
            WORK
          </span>
        </h1>

        {/* Emotional Tagline */}
        <div
          ref={subtitleRef}
          className="font-laluxes-serif text-2xl sm:text-3xl lg:text-4xl text-white/90 italic tracking-wider font-light"
        >
          &ldquo;We capture what you felt.&rdquo;
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/35 z-20 font-sans text-[9px] tracking-[0.25em]"
      >
        <span className="uppercase">SCROLL TO ENTER</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-white/30 to-transparent relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-bounce-slow" />
        </div>
      </div>
    </div>
  );
}
