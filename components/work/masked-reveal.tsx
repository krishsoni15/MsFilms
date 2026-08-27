"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WorkCategoryData } from "@/lib/work-data";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface MaskedRevealProps {
  data: WorkCategoryData;
}

export function MaskedReveal({ data }: MaskedRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const titleTextRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    const pin = pinRef.current;
    const mask = maskRef.current;
    if (!container || !pin || !mask) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=130%",
          pin: pin,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Animate the clipPath to expand
      tl.fromTo(
        mask,
        {
          clipPath: "inset(20% 25% 20% 25% round 16px)",
        },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          ease: "power2.inOut",
        },
        0
      );

      // Fade out the floating call-to-action text in the center
      tl.to(
        titleTextRef.current,
        {
          opacity: 0,
          scale: 0.9,
          ease: "power1.out",
        },
        0
      );

      // Parallax-scale the background image inside the mask slightly
      const img = mask.querySelector("img");
      if (img) {
        tl.fromTo(
          img,
          { scale: 1.15 },
          { scale: 1.0, ease: "power2.inOut" },
          0
        );
      }
    }, container);

    return () => ctx.revert();
  }, []);

  const featuredImage = data.images[0] || data.featuredImage;
  const gridImages = data.images.slice(1);

  return (
    <div ref={containerRef} className="relative w-full select-none">
      {/* Pinned Mask Section */}
      <div ref={pinRef} className="w-full h-screen relative overflow-hidden">
        
        {/* Full Viewport Mask Wrapper */}
        <div
          ref={maskRef}
          className="absolute inset-0 w-full h-full bg-[#030914] z-10 overflow-hidden"
          style={{ clipPath: "inset(20% 25% 20% 25% round 16px)" }}
        >
          {/* Main Architectural Image */}
          <Image
            src={featuredImage.url}
            alt={featuredImage.alt}
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
        </div>

        {/* Center overlay text (visible in the initial mask state, fades out on scroll) */}
        <div
          ref={titleTextRef}
          className="absolute inset-0 flex flex-col justify-center items-center text-center z-20 pointer-events-none"
        >
          <span className="font-sans text-[10px] sm:text-xs tracking-[0.4em] font-semibold text-white/95 uppercase mb-1">
            ENTER THE STRUCTURE
          </span>
          <span className="w-[1px] h-10 bg-white/40 mt-4 animate-bounce-slow" />
        </div>
      </div>

      {/* Grid of details, revealed as user continues scrolling below */}
      <div
        ref={gridRef}
        className="relative max-w-7xl mx-auto py-24 px-6 grid grid-cols-1 md:grid-cols-2 gap-12 z-20 bg-transparent"
      >
        {gridImages.map((img, idx) => {
          // Asymmetric column widths
          const isLarge = idx % 3 === 0;
          return (
            <div
              key={idx}
              className={`chroma-card group shadow-lg cursor-pointer aspect-[4/3] ${
                isLarge ? "md:col-span-2" : "col-span-1"
              }`}
            >
              <div className="chroma-card-inner w-full h-full relative">
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={img.url}
                    alt={img.alt}
                    fill
                    sizes={isLarge ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-20 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />
                </div>

                {/* Caption details */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 flex flex-col justify-end opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400 ease-out z-10 pointer-events-none">
                  <span className="text-[8px] tracking-[0.2em] text-[#c5a880] uppercase font-bold">
                    {img.title ? "DETAIL" : "ARCHITECTURAL"}
                  </span>
                  <h4 className="font-serif text-base sm:text-lg text-[#f4f1eb] font-normal leading-tight mt-0.5">
                    {img.title || "The Geometric"}
                  </h4>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
